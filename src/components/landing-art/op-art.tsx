import { useReducedMotion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { MedallionShader } from "./shaders";

/** Ring hues of the dark P7 medallion, outside in; keep in sync with public/brand/logo-stacked-dark.svg. */
export const MEDALLION = ["#FF2E88", "#FF7A1A", "#FFC94A", "#3FE04A", "#19B8D6", "#7B3FE4"];
const NIGHT = "#0B0B0C";
const RIM = "#FDF6EC";

type Props = {
  /** Number of coloured bands; each is followed by a night band. */
  rings?: number;
  /** Lobes on each ring, like the medallion's wavy edge. */
  lobes?: number;
  /** Ring wobble as a fraction of radius. */
  wobble?: number;
  /** Phase twist added per ring, which turns the ripples into a swirl. */
  twist?: number;
  speed?: number;
  /** Fraction of the canvas' shorter side used by the outer rim. */
  size?: number;
  /** Lean the swirl toward the pointer. */
  follow?: boolean;
  rim?: boolean;
  /** Shader only: feather the outer rings into the background instead of a hard edge. */
  feather?: boolean;
  className?: string;
};

/** Canvas 2D medallion; the fallback when WebGL2 is unavailable. */
function OpArtCanvas({ rings = 15, lobes = 9, wobble = 0.045, twist = 0.32, speed = 0.35, size = 0.86, follow = false, rim = true, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let t = 0;
    let last = performance.now();
    const target = { x: 0, y: 0 };
    const lean = { x: 0, y: 0 };
    const STEPS = 180;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      // Cap the backing store: iOS Safari blanks canvases over ~16.7M px, and huge swirls cost frames.
      const dpr = Math.min(window.devicePixelRatio || 1, 2, 2048 / Math.max(r.width, r.height, 1));
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ring = (R: number, phase: number, amp: number, cx: number, cy: number) => {
      ctx.beginPath();
      for (let s = 0; s <= STEPS; s++) {
        const a = (s / STEPS) * Math.PI * 2;
        const rr = R * (1 + amp * Math.sin(lobes * a + phase) + amp * 0.45 * Math.sin((lobes - 3) * a - phase * 1.3));
        const x = cx + Math.cos(a) * rr;
        const y = cy + Math.sin(a) * rr;
        if (s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      lean.x += (target.x - lean.x) * 0.06;
      lean.y += (target.y - lean.y) * 0.06;
      const outer = (Math.min(w, h) / 2) * size;
      const bands = rings * 2;
      if (rim) {
        ctx.fillStyle = RIM;
        ring(outer * 1.035, t * 0.7, wobble, w / 2, h / 2);
      }
      for (let i = 0; i < bands; i++) {
        const k = 1 - i / bands;
        const R = outer * k;
        if (R < 2) break;
        // Inner rings lean further toward the pointer, so the centre of the swirl drifts like the logo's lens on JOY.
        const cx = w / 2 + lean.x * outer * 0.12 * (1 - k);
        const cy = h / 2 + lean.y * outer * 0.12 * (1 - k);
        ctx.fillStyle = i % 2 ? NIGHT : MEDALLION[(i / 2) % MEDALLION.length];
        ring(R, t * (1 + (1 - k) * 0.6) + i * twist, wobble * (0.6 + 0.8 * k), cx, cy);
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt * speed;
      draw();
      if (visible && !reduce) raf = requestAnimationFrame(frame);
    };

    resize();
    draw();

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
      target.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
      target.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
    };
    if (follow) window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      if (follow) window.removeEventListener("pointermove", onMove);
    };
  }, [rings, lobes, wobble, twist, speed, size, follow, rim, reduce]);

  return <canvas ref={canvasRef} aria-hidden className={`block h-full w-full ${className}`} />;
}

/** Live P7 medallion: a WebGL2 shader (ribbon shading, pointer lens, chromatic split) with a canvas 2D fallback. */
export function OpArtField(props: Props) {
  const [fallback, setFallback] = useState(false);
  return fallback ? <OpArtCanvas {...props} rim={props.feather ? false : props.rim} /> : <MedallionShader {...props} onFail={() => setFallback(true)} />;
}

const BANDS = ["#FF2E88", "#FF7A1A", "#FFC94A", "#3FE04A", "#19B8D6", "#7B3FE4"];

/** Stacked wavy spectrum bands that drift sideways; paints `from` above and `to` below. */
export function SpectrumWaves({ from, to, flip = false, className = "" }: { from: string; to: string; flip?: boolean; className?: string }) {
  // Two identical periods side by side so a -50% translate loops seamlessly.
  const wave = (y: number, amp: number) => {
    let d = `M0,${y}`;
    for (let x = 0; x < 2880; x += 360) d += ` q90,${-amp} 180,0 t180,0`;
    return d;
  };
  const band = 9;
  const gap = 4;
  const top = 26;
  return (
    <div aria-hidden className={`relative h-[118px] overflow-hidden md:h-[150px] ${className}`} style={{ background: from, transform: flip ? "scaleY(-1)" : undefined }}>
      <svg viewBox="0 0 2880 150" preserveAspectRatio="none" className="absolute inset-0 h-full w-[200%] animate-[spectrum-drift_28s_linear_infinite] motion-reduce:animate-none">
        <path d={`${wave(top + BANDS.length * (band + gap), 18)} L2880,150 L0,150 Z`} fill={to} />
        {BANDS.map((c, i) => (
          <path key={c} d={wave(top + i * (band + gap) + band / 2, 18)} fill="none" stroke={c} strokeWidth={band} strokeLinecap="butt" />
        ))}
      </svg>
    </div>
  );
}
