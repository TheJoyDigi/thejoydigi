import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useShader } from "@/components/landing-art/shaders";

const SRC = "/brand/logo-horizontal-dark.svg";
const WORDMARK = "/brand/logo-horizontal-wordmark.svg";
const W = 2400;
const H = 879;
const FIELD_W = 1200;
const FIELD_H = Math.round((FIELD_W * H) / W);
const RINGS = 30;

const FRAG = `#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D uField;
uniform vec2 uRes, uMouse, uTex;
uniform float uTime, uLens, uReveal;

const vec3 NIGHT = vec3(0.043, 0.043, 0.047);
const vec3 RIM = vec3(0.992, 0.965, 0.925);
vec3 hue(float i) {
  i = mod(i, 6.0);
  return i < 1.0 ? vec3(1.0, 0.180, 0.533) : i < 2.0 ? vec3(1.0, 0.478, 0.102) : i < 3.0 ? vec3(1.0, 0.788, 0.290)
       : i < 4.0 ? vec3(0.247, 0.878, 0.290) : i < 5.0 ? vec3(0.098, 0.722, 0.839) : vec3(0.482, 0.247, 0.894);
}
// Odd bands carry the six hues in logo order; even bands are the night gaps.
vec3 band(float n) { return mod(n, 2.0) > 0.5 ? hue(floor((n - 1.0) * 0.5)) : NIGHT; }
float ring(vec2 uv) { return texture(uField, uv).r * 255.0 / 8.0; }

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 asp = vec2(uRes.x / uRes.y, 1.0);

  // Op-art lens: the stripes bulge under the cursor.
  vec2 m = 0.5 + uMouse * 0.5 * min(uRes.x, uRes.y) / uRes;
  vec2 d = (uv - m) * asp;
  uv = m + (uv - m) * (1.0 - uLens * 0.32 * exp(-dot(d, d) / 0.05));

  vec4 c = texture(uField, uv);
  if (c.a < 0.004) { o = vec4(0.0); return; }
  float hard = floor(c.r * 255.0 / 8.0 + 0.5);

  // Blur the stepped ring index into a continuous field so bands can glide between rings.
  vec2 px = 1.0 / uTex;
  float s = 0.0, wsum = 0.0;
  for (int y = -2; y <= 2; y++) for (int x = -2; x <= 2; x++) {
    vec2 o2 = vec2(float(x), float(y));
    float w = exp(-dot(o2, o2) * 0.35);
    s += ring(uv + o2 * px * 2.4) * w;
    wsum += w;
  }
  s /= wsum;

  // Rings flow outward from JOY.
  float p = s + uTime * 0.35;
  float n = floor(p), f = fract(p);
  float e = min(fwidth(p) * 0.8, 0.45);
  vec3 col = mix(band(n), band(n + 1.0), smoothstep(0.5 - e, 0.5 + e, f));
  if (hard > ${RINGS}.0 - 0.5) col = NIGHT;

  // Wake-up pulse: a wave of light runs from the centre to the rim on load.
  float front = mix(${RINGS}.0 + 2.0, -3.0, uReveal);
  float pulse = exp(-pow((s - front) * 0.7, 2.0)) * (1.0 - uReveal * uReveal);
  col += (col + 0.25) * pulse * 0.9;

  // A slow sheen sweeps across every so often.
  float sweep = uv.x * asp.x + uv.y * 0.8 - (mod(uTime * 0.18, 5.0) * 2.2 - 1.5);
  col += exp(-sweep * sweep * 40.0) * 0.28;

  col = hard < 0.5 ? RIM + exp(-sweep * sweep * 40.0) * 0.05 : col;
  o = vec4(min(col, 1.0) * c.a, c.a);
}`;

let fieldPromise: Promise<HTMLCanvasElement> | null = null;

/** Rasterises the logo's ring paths into an index map (ring i painted as grey i*8), straight from the shipped SVG. */
function loadField() {
  fieldPromise ??= fetch(SRC)
    .then((r) => r.text())
    .then((txt) => {
      const g = new DOMParser().parseFromString(txt, "image/svg+xml").querySelector("svg > g");
      const [tx, ty, sc] = (g?.getAttribute("transform")?.match(/-?[\d.]+/g) ?? []).map(Number);
      const rings = Array.from(g?.children ?? []).filter((el) => el.tagName === "path" && el.getAttribute("stroke") !== "#0B0B0C");
      if (!rings.length || !sc) throw new Error("logo");
      const canvas = document.createElement("canvas");
      canvas.width = FIELD_W;
      canvas.height = FIELD_H;
      const ctx = canvas.getContext("2d")!;
      const k = FIELD_W / W;
      ctx.setTransform(k * sc, 0, 0, k * sc, k * tx, k * ty);
      rings.forEach((el, i) => {
        const path = new Path2D(el.getAttribute("d") ?? "");
        const v = Math.min(255, i * 8);
        ctx.fillStyle = ctx.strokeStyle = `rgb(${v},${v},${v})`;
        ctx.fill(path);
        if (el.getAttribute("stroke-width")) {
          ctx.lineWidth = Number(el.getAttribute("stroke-width"));
          ctx.lineJoin = "round";
          ctx.stroke(path);
        }
      });
      return canvas;
    });
  fieldPromise.catch(() => (fieldPromise = null));
  return fieldPromise;
}

function LogoCanvas({ field, hover, onFail }: { field: HTMLCanvasElement; hover: boolean; onFail: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useShader(ref, FRAG, { uTex: [FIELD_W, FIELD_H], uSpeed: hover ? 4 : 1 }, {
    maxPixels: 4e5,
    follow: true,
    hoverRect: true,
    onFail,
    intro: { delay: 0.1, duration: 1.8 },
    textures: { uField: field },
    startTime: 0,
  });
  return <canvas ref={ref} aria-hidden style={{ opacity: 0 }} className="pointer-events-none absolute inset-0 block h-full w-full" />;
}

/** The horizontal logo with a live medallion: the exact ring geometry from the SVG, re-coloured by a shader that flows outward, bulges under the cursor and pulses on load. */
export function LiveLogo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  const [field, setField] = useState<HTMLCanvasElement | null>(null);
  const [failed, setFailed] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    let on = true;
    const wordmark = new window.Image();
    wordmark.src = WORDMARK;
    Promise.all([loadField(), wordmark.decode()])
      .then(([f]) => on && setField(f))
      .catch(() => {});
    return () => {
      on = false;
    };
  }, []);

  return (
    <span className={`relative inline-block aspect-[2400/879] ${className}`} onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}>
      <Image src={SRC} width={W} height={H} alt="" priority={priority} unoptimized className="block h-full w-auto" />
      {field && !failed && (
        <>
          <LogoCanvas field={field} hover={hover} onFail={() => setFailed(true)} />
          <Image src={WORDMARK} alt="" fill unoptimized className="pointer-events-none" />
        </>
      )}
    </span>
  );
}
