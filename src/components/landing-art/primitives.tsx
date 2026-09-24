import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import s from "./art.module.css";

export const INK = "#003B49";
export const SKY = "#4ABEFF";
export const CORAL = "#FF6B6B";
export const CREAM = "#FDF6EC";
export const SUN = "#FFC94A";
export const MINT = "#7EE0C3";

export function rng(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 1000) / 1000;

/** Closed Catmull-Rom blob; same `points` count keeps shapes morphable into each other. */
export function blobPath(
  seed: number,
  { points = 8, r = 100, variance = 0.22, cx = 0, cy = 0 } = {}
) {
  const rand = rng(seed);
  const pts = Array.from({ length: points }, (_, i) => {
    const a = (i / points) * Math.PI * 2;
    const rr = r * (1 - variance + rand() * variance * 2);
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
  });
  const at = (i: number) => pts[(i + points) % points];
  let d = `M${r1(pts[0][0])},${r1(pts[0][1])}`;
  for (let i = 0; i < points; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    d += `C${r1(p1[0] + (p2[0] - p0[0]) / 6)},${r1(p1[1] + (p2[1] - p0[1]) / 6)} ${r1(
      p2[0] - (p3[0] - p1[0]) / 6
    )},${r1(p2[1] - (p3[1] - p1[1]) / 6)} ${r1(p2[0])},${r1(p2[1])}`;
  }
  return d + "Z";
}

/** Pauses CSS loops of everything inside while the scene is off-screen. */
export function Scene({
  as: Tag = "section",
  className = "",
  children,
  ...rest
}: React.HTMLAttributes<HTMLElement> & { as?: "section" | "div" }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "200px 0px" });
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      data-paused={!inView}
      className={`${s.scene} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function RevealWords({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.04,
  highlight,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  highlight?: Record<string, string>;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] px-[0.08em] -mx-[0.08em] align-bottom">
            <motion.span
              className={`inline-block ${highlight?.[w] ?? ""} ${wordClassName}`}
              initial={{ y: "105%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + i * stagger,
              }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </span>
  );
}

export function Sparkle({
  x,
  y,
  size = 16,
  color = SUN,
  delay = 0,
}: {
  x: number;
  y: number;
  size?: number;
  color?: string;
  delay?: number;
}) {
  const k = size / 2;
  return (
    <path
      className={s.twinkle}
      style={{ animationDelay: `${delay}s` }}
      d={`M${x},${y - k} Q${x},${y} ${x + k},${y} Q${x},${y} ${x},${y + k} Q${x},${y} ${x - k},${y} Q${x},${y} ${x},${y - k}Z`}
      fill={color}
    />
  );
}

const WAVE = "M0,60 C240,20 480,20 720,50 C960,80 1200,80 1440,40 L1440,100 L0,100 Z";

/** Wave divider; `from` paints behind, `to` is the next section's colour. */
export function WaveDivider({
  from,
  to,
  flip = false,
}: {
  from: string;
  to: string;
  flip?: boolean;
}) {
  return (
    <div
      aria-hidden
      className="relative h-16 md:h-24 -mb-px"
      style={{ background: from, transform: flip ? "scaleX(-1)" : undefined }}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <path d={WAVE} fill={to} />
      </svg>
    </div>
  );
}

export function SectionKicker({
  children,
  color = CORAL,
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-[0.25em]"
      style={{ color }}
    >
      <svg width="14" height="14" viewBox="-8 -8 16 16" aria-hidden>
        <path
          d="M0,-8 Q0,0 8,0 Q0,0 0,8 Q0,0 -8,0 Q0,0 0,-8Z"
          fill={color}
        />
      </svg>
      {children}
    </motion.span>
  );
}
