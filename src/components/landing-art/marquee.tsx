import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import React, { useRef } from "react";
import { SpectrumWaves } from "./op-art";
import { ORANGE, PINK, RippleMark, SKY, SUN } from "./primitives";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/** Ripple rings in spectrum order, offset per item so neighbours never repeat. */
const RINGS = [PINK, ORANGE, SUN, SKY];

function Ring({ index }: { index: number }) {
  const at = (k: number) => RINGS[(index + k) % RINGS.length];
  return <RippleMark colors={[at(0), at(1), at(2)]} className="inline-block w-6 h-6 md:w-8 md:h-8 mx-5 md:mx-8 align-middle" />;
}

export function Track({
  words,
  baseVelocity,
  className,
}: {
  words: string[];
  baseVelocity: number;
  className: string;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 1.5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    baseX.set(baseX.get() + move);
  });

  const row = (
    <span className="flex shrink-0 items-center">
      {words.map((w, i) => (
        <React.Fragment key={w}>
          <span>{w}</span>
          <Ring index={i} />
        </React.Fragment>
      ))}
    </span>
  );

  return (
    <div className={`overflow-hidden whitespace-nowrap flex ${className}`}>
      <motion.div className="flex" style={{ x }}>
        {row}
        {row}
        {row}
        {row}
      </motion.div>
    </div>
  );
}

export default function Marquee({ words }: { words: string[] }) {
  return (
    <div aria-label="Now shipping" className="relative overflow-hidden bg-[#0B0B0C]">
      <div className="border-y border-[#FDF6EC]/10 py-4 md:py-5">
        <Track words={words} baseVelocity={-1.4} className="font-bungee text-lg uppercase tracking-[0.02em] text-[#FDF6EC] md:text-2xl" />
      </div>
      <SpectrumWaves from="#0B0B0C" to="#FDF6EC" />
    </div>
  );
}
