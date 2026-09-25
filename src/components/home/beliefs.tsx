import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import React, { useRef } from "react";

const BELIEFS = [
  { text: "The best software feels like a friend.", accent: ["friend."] },
  { text: "AI turns one curious builder into a whole studio.", accent: ["whole", "studio."] },
  { text: "Joy isn't a nice-to-have. It's the whole point.", accent: ["whole", "point."] },
];

function Word({ word, progress, range, accent }: { word: string; progress: MotionValue<number>; range: [number, number]; accent: boolean }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? "italic text-[#FFC94A]" : undefined}>
      {word}{" "}
    </motion.span>
  );
}

function Statement({ belief, index, progress }: { belief: (typeof BELIEFS)[number]; index: number; progress: MotionValue<number> }) {
  const span = 1 / BELIEFS.length;
  const start = index * span;
  const end = start + span;
  const opacity = useTransform(progress, [start - 0.04, start + 0.02, end - 0.06, end], index === BELIEFS.length - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0]);
  const y = useTransform(progress, [start - 0.04, start + 0.04], [30, 0]);
  const words = belief.text.split(" ");
  const fillStart = start + 0.02;
  const fillEnd = end - 0.1;
  return (
    <motion.p
      style={{ opacity, y }}
      className="mx-auto w-full max-w-5xl px-4 text-center font-display text-[2.6rem] font-[430] leading-[1.02] tracking-[-0.03em] text-[#FDF6EC] sm:text-6xl lg:text-[5.4rem]"
    >
      {words.map((w, i) => {
        const a = fillStart + ((fillEnd - fillStart) * i) / words.length;
        const b = fillStart + ((fillEnd - fillStart) * (i + 1)) / words.length;
        return <Word key={i} word={w} progress={progress} range={[a, b]} accent={belief.accent.includes(w)} />;
      })}
    </motion.p>
  );
}

export default function Beliefs() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const counter = useTransform(scrollYProgress, (v) => `0${Math.min(BELIEFS.length, Math.floor(v * BELIEFS.length) + 1)}`);
  return (
    <section ref={ref} aria-label="What I believe" className="relative h-[300vh] bg-[#003B49]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(255,201,74,0.22),transparent_60%),radial-gradient(ellipse_at_10%_0%,rgba(74,190,255,0.18),transparent_50%)]" />
        <p className="absolute left-1/2 top-24 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.3em] text-[#FFC94A]">
          What I believe · <motion.span>{counter}</motion.span> / 03
        </p>
        <div className="relative h-[60vh] w-full">
          {BELIEFS.map((b, i) => (
            <div key={b.text} className="absolute inset-0 flex items-center">
              <Statement belief={b} index={i} progress={scrollYProgress} />
            </div>
          ))}
        </div>
        <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm text-[#FDF6EC]/40">keep scrolling</p>
      </div>
      <noscript>
        <div className="px-4 py-24 text-center font-display text-4xl text-[#FDF6EC]">{BELIEFS.map((b) => b.text).join(" ")}</div>
      </noscript>
    </section>
  );
}
