import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import React, { useRef } from "react";
import { OpArtField } from "../landing-art/op-art";
import { NightAurora } from "../landing-art/shaders";

const BELIEFS = [
  { text: "The best software feels like a friend.", accent: ["friend."] },
  { text: "SI turns one curious builder into a whole studio.", accent: ["whole", "studio."] },
  { text: "Joy isn't a nice-to-have. It's the whole point.", accent: ["whole", "point."] },
];

function Word({ word, progress, range, accent }: { word: string; progress: MotionValue<number>; range: [number, number]; accent: boolean }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? "joy-accent-night" : undefined}>
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
      className="mx-auto w-full max-w-5xl px-4 text-center font-bungee text-[2.1rem] leading-[1.08] tracking-[-0.005em] text-[#FDF6EC] sm:text-5xl lg:text-[4.2rem]"
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
    <section ref={ref} aria-label="What I believe" className="relative h-[300vh] bg-[#0B0B0C]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div aria-hidden className="absolute inset-0">
          <NightAurora intensity={1.3} />
        </div>
        <div aria-hidden className="absolute left-1/2 top-1/2 aspect-square w-[150vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.38]">
          <OpArtField rings={26} lobes={11} wobble={0.03} twist={0.22} speed={0.18} rim={false} size={1} />
        </div>
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(11,11,12,0.92)_25%,rgba(11,11,12,0.55)_60%,rgba(11,11,12,0.2))]" />
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
        <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm text-[#FDF6EC]/55">keep scrolling</p>
      </div>
      <noscript>
        <div className="px-4 py-24 text-center font-bungee text-3xl text-[#FDF6EC]">{BELIEFS.map((b) => b.text).join(" ")}</div>
      </noscript>
    </section>
  );
}
