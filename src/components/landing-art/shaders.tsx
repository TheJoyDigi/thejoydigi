import { useReducedMotion } from "framer-motion";
import React, { useEffect, useRef } from "react";

const VERT = `#version 300 es
in vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

/** Medallion hues outside in, as linear-ish sRGB; mirror of MEDALLION in op-art.tsx. */
const PALETTE = `
const vec3 C0 = vec3(1.000, 0.180, 0.533);
const vec3 C1 = vec3(1.000, 0.478, 0.102);
const vec3 C2 = vec3(1.000, 0.788, 0.290);
const vec3 C3 = vec3(0.247, 0.878, 0.290);
const vec3 C4 = vec3(0.098, 0.722, 0.839);
const vec3 C5 = vec3(0.482, 0.247, 0.894);
const vec3 NIGHT = vec3(0.043, 0.043, 0.047);
const vec3 RIM = vec3(0.992, 0.965, 0.925);
vec3 hue(float i) {
  i = mod(i, 6.0);
  return i < 1.0 ? C0 : i < 2.0 ? C1 : i < 3.0 ? C2 : i < 4.0 ? C3 : i < 5.0 ? C4 : C5;
}
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }`;

const MEDALLION_FRAG = `#version 300 es
precision highp float;
out vec4 o;
uniform vec2 uRes;
uniform float uTime, uRings, uLobes, uWobble, uTwist, uSize, uRim, uDpr, uFeather, uReveal;
uniform vec2 uMouse;
uniform float uLens;
${PALETTE}

// Ribbon field at point q (medallion units, rim at 1): returns colour, band coverage and the warped radius.
vec4 field(vec2 q, out float rr) {
  // Lens bulge under the pointer, like the P7 lens on JOY.
  vec2 d = q - uMouse;
  q -= d * uLens * 0.35 * exp(-dot(d, d) * 7.0);
  float r = length(q);
  float a = atan(q.y, q.x);
  float t = uTime;
  float k = clamp(1.0 - r, 0.0, 1.0);
  float ph = t * (1.0 + k * 0.6) + uTwist * uRings * 2.0 * min(r, 1.0) + (1.0 - uReveal) * (1.0 - uReveal) * 6.0;
  float wob = uWobble * (0.6 + 0.8 * r);
  rr = r / (1.0 + wob * sin(uLobes * a + ph) + wob * 0.45 * sin((uLobes - 3.0) * a - ph * 1.3));
  float f = (1.0 - rr) * uRings;
  float band = floor(f);
  float s = fract(f);
  float aa = fwidth(f) * 1.2;
  float cover = smoothstep(0.0, aa, s) * (1.0 - smoothstep(0.56 - aa, 0.56, s));
  // Tube shading across each band reads as glossy vinyl ribbon.
  float u = clamp(s / 0.56, 0.0, 1.0);
  float tube = sin(u * 3.14159);
  vec3 c = hue(band) * (0.72 + 0.4 * tube) + pow(tube, 22.0) * 0.4 * vec3(1.0, 0.97, 0.92);
  return vec4(c, cover);
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  float m = min(uRes.x, uRes.y);
  vec2 q = (frag - 0.5 * uRes) / (0.5 * m * uSize);
  q.y = -q.y;

  // Chromatic split grows toward the rim.
  float rr, rrG, rrB;
  float spread = 0.0025 + 0.006 * length(q);
  vec4 g = field(q, rrG);
  vec4 rC = field(q * (1.0 + spread), rr);
  vec4 bC = field(q * (1.0 - spread), rrB);
  vec3 col = vec3(mix(NIGHT.r, rC.r, rC.a), mix(NIGHT.g, g.g, g.a), mix(NIGHT.b, bC.b, bC.a));

  float aa = fwidth(rrG) * 1.5;
  // Feathered edge melts the outer rings into the night instead of ending on a hard rim.
  float inside = 1.0 - smoothstep(1.0 - max(aa, 0.22 * uFeather), 1.0, rrG);
  float rimOuter = 1.0 + 0.035 * uRim;
  float rimA = (1.0 - smoothstep(rimOuter - aa, rimOuter, rrG)) * (1.0 - inside) * uRim;
  // Dim the core so the portrait or text in front stays legible.
  float core = smoothstep(0.0, 0.42, length(q));
  col *= mix(0.45, 1.0, core);
  col += (hash(frag + fract(uTime) * 91.0) - 0.5) * 0.035;

  // Soft spectrum glow just outside the rim.
  float outside = max(rrG - rimOuter, 0.0);
  float edge = 1.0 / uSize;
  float glow = exp(-outside * 9.0) * (1.0 - inside) * 0.5 * (1.0 - uFeather * 0.7) * (1.0 - smoothstep(edge * 0.8, edge * 0.97, length(q)));
  vec3 glowC = mix(C0, C5, 0.5 + 0.5 * sin(atan(q.y, q.x) * 2.0 + uTime));

  // Birth: rings are born at the centre and ripple outward behind a bright gold wavefront.
  float front = uReveal * 1.25;
  float born = 1.0 - smoothstep(front - 0.12, front, rrG);
  inside *= born;
  rimA *= born;
  glow *= born;
  float wave = exp(-pow((rrG - front) / 0.035, 2.0)) * (1.0 - smoothstep(0.6, 1.0, uReveal)) * step(0.001, uReveal);
  float alpha = inside + rimA;
  // Wavefront is pure additive spectrum light (alpha 0), so it glows over the night and never lightens it to a pale haze.
  vec3 waveC = hue(floor(mod(atan(q.y, q.x) / 6.28318 * 6.0 + uTime * 0.5, 6.0)));
  vec3 outC = col * inside + RIM * rimA + waveC * wave * 0.55;
  // Premultiplied: medallion body plus additive-ish glow.
  o = vec4(outC + glowC * glow * 0.6 * (1.0 - alpha), clamp(alpha, 0.0, 1.0));
}`;

const AURORA_FRAG = `#version 300 es
precision highp float;
out vec4 o;
uniform vec2 uRes;
uniform float uTime, uIntensity, uReveal;
uniform vec2 uMouse;
${PALETTE}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.02 + vec2(1.7, 9.2); a *= 0.5; }
  return v;
}
void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.06;
  // Domain warp gives the slow liquid drift.
  vec2 w = vec2(fbm(p * 1.4 + t), fbm(p * 1.4 - t + 4.0));
  float n = fbm(p * 1.8 + w * 1.6 + vec2(t * 2.0, -t));
  float idx = n * 9.0 + uTime * 0.05;
  vec3 c = mix(hue(floor(idx)), hue(floor(idx) + 1.0), smoothstep(0.2, 0.8, fract(idx)));
  // Thin bright contour lines on top echo the medallion's banding.
  float lines = smoothstep(0.92, 1.0, abs(sin(n * 38.0)));
  float shape = smoothstep(0.35, 0.95, n) * (0.55 + 0.45 * smoothstep(1.2, 0.0, distance(uv, uMouse * 0.5 + 0.5)));
  vec3 col = NIGHT + c * (shape * 0.32 + lines * shape * 0.18) * uIntensity * uReveal;
  col += (hash(gl_FragCoord.xy + fract(uTime) * 77.0) - 0.5) * 0.03;
  o = vec4(col, 1.0);
}`;

type Uniforms = Record<string, number | [number, number]>;

/** Runs a fragment shader on a canvas: resize, off-screen pause, pointer, reduced motion. Returns false if WebGL2 is missing. */
function useShader(
  ref: React.RefObject<HTMLCanvasElement | null>,
  frag: string,
  uniforms: Uniforms,
  { maxPixels = 2.2e6, follow = false, onFail, intro }: { maxPixels?: number; follow?: boolean; onFail?: () => void; intro?: { delay: number; duration: number } }
) {
  const reduce = useReducedMotion();
  const live = useRef(uniforms);
  live.current = uniforms;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl) {
      onFail?.();
      return;
    }
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || "shader");
      return s;
    };
    let prog: WebGLProgram;
    try {
      prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
      gl.bindAttribLocation(prog, 0, "p");
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) || "link");
    } catch {
      onFail?.();
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    const loc = (n: string) => gl.getUniformLocation(prog, n);

    let raf = 0;
    let visible = true;
    let t = Math.random() * 20;
    let last = performance.now();
    let dpr = 1;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0, lens: 0, tlens: 0 };
    const born = performance.now();
    const reveal = () => {
      if (!intro || reduce) return 1;
      const k = Math.min(1, Math.max(0, ((performance.now() - born) / 1000 - intro.delay) / intro.duration));
      return 1 - Math.pow(1 - k, 3);
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(maxPixels / Math.max(1, r.width * r.height)));
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const draw = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      mouse.lens += (mouse.tlens - mouse.lens) * 0.06;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(loc("uRes"), canvas.width, canvas.height);
      gl.uniform1f(loc("uTime"), t);
      gl.uniform1f(loc("uDpr"), dpr);
      gl.uniform2f(loc("uMouse"), mouse.x, mouse.y);
      gl.uniform1f(loc("uLens"), mouse.lens);
      gl.uniform1f(loc("uReveal"), reveal());
      for (const [k, v] of Object.entries(live.current)) {
        if (Array.isArray(v)) gl.uniform2f(loc(k), v[0], v[1]);
        else gl.uniform1f(loc(k), v);
      }
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt * Number(live.current.uSpeed ?? 1);
      draw();
      if (visible && !reduce) raf = requestAnimationFrame(frame);
    };

    resize();
    draw();
    // Reveal only after a real frame exists, so there is no blank or stretched first paint.
    requestAnimationFrame(() => {
      canvas.style.transition = intro ? "opacity 0.2s linear" : "opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1)";
      canvas.style.opacity = "1";
    });
    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduce) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(canvas);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = canvas.getBoundingClientRect();
      const size = Number(live.current.uSize ?? 1);
      const m = Math.min(r.width, r.height) * 0.5 * size;
      mouse.tx = (e.clientX - (r.left + r.width / 2)) / m;
      mouse.ty = -(e.clientY - (r.top + r.height / 2)) / m;
      mouse.tlens = Math.hypot(mouse.tx, mouse.ty) < 1.3 ? 1 : 0;
    };
    const onLeave = () => {
      mouse.tlens = 0;
    };
    if (follow) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      if (follow) {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerleave", onLeave);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frag, reduce, follow, maxPixels, intro?.delay, intro?.duration]);
}

export function MedallionShader({
  rings = 15,
  lobes = 9,
  wobble = 0.045,
  twist = 0.32,
  speed = 0.35,
  size = 0.86,
  rim = true,
  feather = false,
  follow = false,
  intro,
  onFail,
  className = "",
}: {
  rings?: number;
  lobes?: number;
  wobble?: number;
  twist?: number;
  speed?: number;
  size?: number;
  rim?: boolean;
  feather?: boolean;
  follow?: boolean;
  /** Seconds: ripple the rings out from the centre on mount. */
  intro?: { delay: number; duration: number };
  onFail?: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useShader(
    ref,
    MEDALLION_FRAG,
    { uRings: rings, uLobes: lobes, uWobble: wobble, uTwist: twist, uSize: size, uRim: rim ? 1 : 0, uFeather: feather ? 1 : 0, uSpeed: speed },
    { follow, onFail, intro }
  );
  return <canvas ref={ref} aria-hidden style={{ opacity: 0 }} className={`block h-full w-full ${className}`} />;
}

/** Slow domain-warped spectrum light drifting over the night ground. */
export function NightAurora({ intensity = 1, intro, className = "" }: { intensity?: number; intro?: { delay: number; duration: number }; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useShader(ref, AURORA_FRAG, { uIntensity: intensity, uSpeed: 1 }, { maxPixels: 9e5, follow: true, intro });
  return <canvas ref={ref} aria-hidden style={{ opacity: 0 }} className={`block h-full w-full ${className}`} />;
}
