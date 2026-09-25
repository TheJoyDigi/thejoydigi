import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const BEATS = [
  { kicker: "The Joy Engine", line: "Every idea starts as a swirl.", accent: "swirl." },
  { kicker: "01 · Spark", line: "Then it becomes a spark worth holding.", accent: "holding." },
  { kicker: "02 · Build", line: "I build it — with an AI pair at my side.", accent: "AI pair" },
  { kicker: "03 · Ship", line: "And I ship it, and say hi.", accent: "say hi." },
];

const FALLBACK = ["/me/long-3d-hero.webp", "/me/long-3d-hero.webp", "/me/long-3d-desk.webp", "/me/long-3d-wave.webp"];

const VERT = /* glsl */ `
uniform float uStage;
uniform float uTime;
uniform vec3 uMouse;
uniform float uSize;
attribute vec3 aP0;
attribute vec3 aP1;
attribute vec3 aP2;
attribute vec3 aC0;
attribute vec3 aC1;
attribute vec3 aC2;
attribute vec4 aRand;
varying vec3 vColor;
varying float vGlow;

float ease(float t) { return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0; }

vec3 galaxy() {
  float arm = floor(aRand.x * 3.0) * 2.0944;
  float r = pow(aRand.y, 0.55) * 1.45;
  float a = arm + r * 2.6 + uTime * 0.18 + aRand.z * 0.6;
  return vec3(cos(a) * r, sin(a) * r * 0.62 + 0.05, (aRand.w - 0.5) * 0.5 + sin(a * 3.0) * 0.05);
}

vec3 galaxyColor() {
  return mix(vec3(1.0, 0.42, 0.42), vec3(1.0, 0.79, 0.29), aRand.y) + aRand.w * 0.15;
}

void main() {
  float s = clamp(uStage, 0.0, 3.0);
  float seg = floor(min(s, 2.999));
  float t = clamp((s - seg - 0.18) / 0.64, 0.0, 1.0);
  float st = ease(clamp(t * 1.35 - aRand.x * 0.35, 0.0, 1.0));

  vec3 A; vec3 B; vec3 CA; vec3 CB;
  if (seg < 0.5) { A = galaxy(); B = aP0; CA = galaxyColor(); CB = aC0; }
  else if (seg < 1.5) { A = aP0; B = aP1; CA = aC0; CB = aC1; }
  else { A = aP1; B = aP2; CA = aC1; CB = aC2; }

  vec3 pos = mix(A, B, st);
  vec3 col = mix(CA, CB, st);

  float b = sin(st * 3.14159);
  if (seg > 0.5) {
    vec3 dir = normalize(aRand.xyz - 0.5 + 1e-4);
    pos += dir * b * (0.16 + aRand.w * 0.32);
    pos.xy += vec2(-pos.y, pos.x) * b * 0.18;
    col = mix(col, galaxyColor(), b * 0.45);
  }

  pos += vec3(sin(uTime * 1.3 + aRand.x * 20.0), cos(uTime * 1.1 + aRand.y * 20.0), sin(uTime + aRand.z * 20.0)) * 0.004;

  vec2 dm = pos.xy - uMouse.xy;
  float push = smoothstep(0.32, 0.0, length(dm)) * uMouse.z;
  float wave = sin(length(dm) * 28.0 - uTime * 6.0) * 0.5 + 0.5;
  pos.z += push * wave * 0.03;

  vGlow = b * 0.5 + push * (0.6 + wave * 0.9);
  vColor = col;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (1.0 + aRand.w * 0.5 + b * 0.35 + push * (0.4 + wave * 0.6)) / -mv.z;
}
`;

const FRAG = /* glsl */ `
varying vec3 vColor;
varying float vGlow;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  gl_FragColor = vec4(vColor + vGlow * 0.22, smoothstep(0.5, 0.25, d));
}
`;

async function loadPose(name: string, count: number) {
  const buf = await (await fetch(`/me/points/${name}.bin`)).arrayBuffer();
  const pos16 = new Int16Array(buf, 0, count * 3);
  const col = new Uint8Array(buf, count * 6, count * 3);
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < pos.length; i++) pos[i] = pos16[i] / 10000;
  return { pos, col };
}

function Caption({ beat }: { beat: number }) {
  const b = BEATS[beat];
  const [before, after] = b.line.split(b.accent);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={beat}
        initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#FFC94A]">{b.kicker}</p>
        <p className="font-display mt-4 text-[2.4rem] leading-[1.02] tracking-[-0.03em] text-[#FDF6EC] sm:text-5xl lg:text-[4.2rem]">
          {before}
          <em className="text-[#FFC94A]">{b.accent}</em>
          {after}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}

export default function JoyEngine() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [beat, setBeat] = useState(0);
  const [mode, setModeState] = useState<"loading" | "webgl" | "fallback">("loading");
  const modeRef = useRef(mode);
  const setMode = (m: typeof mode) => {
    modeRef.current = m;
    setModeState(m);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const progress = () => {
      const r = section.getBoundingClientRect();
      return Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
    };
    const onScroll = () => {
      if (modeRef.current === "fallback") setBeat(Math.min(3, Math.round(progress() * 3)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const probe = document.createElement("canvas");
    if (reduce || !(probe.getContext("webgl2") || probe.getContext("webgl"))) {
      setMode("fallback");
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }

    let disposed = false;
    let cleanup = () => {};

    const start = async () => {
      const THREE = await import("three");
      const meta: { count: number; poses: string[] } = await (await fetch("/me/points/meta.json")).json();
      const poses = await Promise.all(meta.poses.map((p) => loadPose(p, meta.count)));
      if (disposed) return;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "high-performance" });
      const small = window.innerWidth < 768;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2));
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
      camera.position.set(0, 0, 5.2);

      const n = meta.count;
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(poses[0].pos, 3));
      poses.forEach((p, i) => {
        geo.setAttribute(`aP${i}`, new THREE.BufferAttribute(p.pos, 3));
        geo.setAttribute(`aC${i}`, new THREE.BufferAttribute(p.col, 3, true));
      });
      const rand = new Float32Array(n * 4);
      for (let i = 0; i < rand.length; i++) rand[i] = Math.random();
      geo.setAttribute("aRand", new THREE.BufferAttribute(rand, 4));
      geo.setDrawRange(0, small ? Math.floor(n * 0.6) : n);

      const uniforms = {
        uStage: { value: 0 },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector3(9, 9, 0) },
        uSize: { value: 16 },
      };
      const material = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms,
        transparent: true,
        depthWrite: false,
      });
      const points = new THREE.Points(geo, material);
      points.frustumCulled = false;
      const group = new THREE.Group();
      group.add(points);
      scene.add(group);

      const resize = () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        const wide = w >= 1024;
        group.position.set(wide ? Math.min(1.45, camera.aspect * 0.8) : 0, wide ? 0 : -0.5, 0);
        group.scale.setScalar(wide ? 1 : Math.min(1, camera.aspect * 1.9));
        uniforms.uSize.value = 27 * renderer.getPixelRatio() * (h / 900);
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);

      const pointer = { x: 0, y: 0, active: 0 };
      const ndc = new THREE.Vector3();
      const onMove = (e: PointerEvent) => {
        const r = canvas.getBoundingClientRect();
        pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1;
        pointer.active = 1;
      };
      const onLeave = () => (pointer.active = 0);
      section.addEventListener("pointermove", onMove);
      section.addEventListener("pointerleave", onLeave);

      let visible = true;
      const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
      io.observe(section);

      const clock = new THREE.Clock();
      let stage = progress() * 3;
      let rotY = 0;
      let rotX = 0;
      let mouseStrength = 0;
      let lastBeat = -1;
      let raf = 0;

      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!visible) return;
        const dt = Math.min(clock.getDelta(), 0.05);
        const time = clock.elapsedTime;
        stage += (progress() * 3 - stage) * Math.min(1, dt * 4);
        uniforms.uStage.value = stage;
        uniforms.uTime.value = time;

        rotY += ((pointer.active ? pointer.x * 0.45 : 0) + Math.sin(time * 0.3) * 0.12 - rotY) * Math.min(1, dt * 3);
        rotX += ((pointer.active ? -pointer.y * 0.18 : 0) - rotX) * Math.min(1, dt * 3);
        group.rotation.set(rotX, rotY, 0);

        mouseStrength += (pointer.active - mouseStrength) * Math.min(1, dt * 5);
        ndc.set(pointer.x, pointer.y, 0.5).unproject(camera).sub(camera.position).normalize();
        const hit = camera.position.clone().add(ndc.multiplyScalar(-camera.position.z / ndc.z));
        group.worldToLocal(hit);
        uniforms.uMouse.value.set(hit.x, hit.y, mouseStrength);

        const nextBeat = Math.min(3, Math.round(stage));
        if (nextBeat !== lastBeat) {
          lastBeat = nextBeat;
          setBeat(nextBeat);
        }
        renderer.render(scene, camera);
      };
      tick();
      setMode("webgl");

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        section.removeEventListener("pointermove", onMove);
        section.removeEventListener("pointerleave", onLeave);
        geo.dispose();
        material.dispose();
        renderer.dispose();
      };
    };

    const lazy = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        lazy.disconnect();
        start().catch(() => {
          setMode("fallback");
          onScroll();
        });
      },
      { rootMargin: "1200px 0px" }
    );
    lazy.observe(section);

    return () => {
      disposed = true;
      lazy.disconnect();
      window.removeEventListener("scroll", onScroll);
      cleanup();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section ref={sectionRef} id="engine" aria-label="The Joy Engine" className="relative h-[380vh] bg-[#07131F]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_50%,rgba(255,107,107,0.16),transparent_55%),radial-gradient(ellipse_at_20%_20%,rgba(74,190,255,0.12),transparent_50%)]" />
        <canvas ref={canvasRef} aria-hidden className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${mode === "webgl" ? "opacity-100" : "opacity-0"}`} />

        {mode === "fallback" && (
          <div className="absolute inset-y-0 right-0 flex w-full items-end justify-center lg:w-[55%] lg:items-center">
            <AnimatePresence mode="wait">
              <motion.div key={FALLBACK[beat]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative h-[55vh] w-[80vw] max-w-[560px] lg:h-[80vh]">
                <Image src={FALLBACK[beat]} alt="" fill sizes="560px" className="object-contain" />
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        <div className="container relative mx-auto flex h-full flex-col justify-start px-4 pt-28 lg:justify-center lg:pt-0">
          <div className="max-w-xl">
            <Caption beat={beat} />
          </div>
          <ol className="mt-10 flex gap-3" aria-hidden>
            {BEATS.map((b, i) => (
              <li
                key={b.kicker}
                className="h-1.5 rounded-full transition-all duration-500"
                style={{ width: i === beat ? 44 : 16, background: i === beat ? "#FFC94A" : "rgba(253,246,236,0.2)" }}
              />
            ))}
          </ol>
        </div>

        <p className="pointer-events-none absolute inset-x-4 bottom-8 text-center text-xs text-[#FDF6EC]/45 md:text-sm">
          {mode === "webgl" ? (
            <>
              <span className="hidden md:inline">Move your cursor — </span>I&apos;m made of 42,000 points of light. Keep scrolling.
            </>
          ) : (
            "Keep scrolling"
          )}
        </p>
      </div>
    </section>
  );
}
