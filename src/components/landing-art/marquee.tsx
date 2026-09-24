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
import { CORAL, SKY, SUN } from "./primitives";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

function Star({ color }: { color: string }) {
  return (
    <svg viewBox="-10 -10 20 20" className="inline-block w-6 h-6 md:w-9 md:h-9 mx-5 md:mx-8 align-middle" aria-hidden>
      <path d="M0,-10 Q0,0 10,0 Q0,0 0,10 Q0,0 -10,0 Q0,0 0,-10Z" fill={color} />
    </svg>
  );
}

function Track({
  words,
  baseVelocity,
  className,
  starColors,
}: {
  words: string[];
  baseVelocity: number;
  className: string;
  starColors: string[];
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
          <Star color={starColors[i % starColors.length]} />
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

export default function Marquee() {
  return (
    <div aria-hidden className="relative py-8 md:py-10 overflow-hidden bg-[#FDF6EC]">
      <div className="bg-[#003B49] py-4 md:py-5">
        <Track
          words={["Websites", "Mobile Apps", "Strategy", "SEO", "Branding", "Joy"]}
          baseVelocity={-1.6}
          starColors={[SUN, CORAL, SKY]}
          className="font-display text-2xl md:text-4xl italic text-[#FDF6EC]"
        />
      </div>
    </div>
  );
}
