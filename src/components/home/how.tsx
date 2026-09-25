import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { RevealWords, SectionKicker } from "../landing-art/primitives";

const STEPS = [
  { title: "Imagine", text: "Start with a person and a feeling, not a feature list. Who should smile when this works?", color: "#FFC94A" },
  { title: "Prototype with AI", text: "Pair with AI to go from idea to a working thing in hours — then throw it away and try again.", color: "#4ABEFF" },
  { title: "Ship it for real", text: "Real people, real feedback, as early as possible. Momentum beats perfect.", color: "#FF6B6B" },
  { title: "Delight & repeat", text: "Polish the small details that make people grin — then run the loop again.", color: "#7EE0C3" },
];

export default function How() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  const [lit, setLit] = useState(-1);
  useMotionValueEvent(progress, "change", (v) => {
    const next = Math.min(STEPS.length - 1, Math.floor(v * STEPS.length + 0.15)) - (v < 0.02 ? 1 : 0);
    if (next !== lit) setLit(next);
  });

  return (
    <section id="how" className="relative scroll-mt-16 bg-[#FDF6EC] py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-14 max-w-3xl md:mb-20">
          <SectionKicker>How I build</SectionKicker>
          <h2 className="font-display !py-0 mt-4 text-5xl font-[460] leading-[0.98] tracking-[-0.03em] text-[#003B49] md:text-7xl">
            <RevealWords text="One human," /> <RevealWords text="one AI pair," delay={0.1} wordClassName="italic text-[#FF6B6B]" />{" "}
            <RevealWords text="a tight loop." delay={0.2} />
          </h2>
        </div>

        <div ref={ref} className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#FDF5EA] shadow-[0_50px_100px_-60px_rgba(0,59,73,0.6)]">
              <Image
                src="/me/long-3d-desk.webp"
                alt="3D illustration of Long building on a laptop with holographic screens and a small robot helper"
                width={1536}
                height={1024}
                sizes="(min-width: 1024px) 640px, 92vw"
                className="block h-auto w-full"
              />
            </div>
            <p className="mt-4 text-center text-sm text-[#003B49]/50">Me and my co-pilot, mid-loop.</p>
          </div>

          <ol className="relative pl-10 md:pl-14">
            <div aria-hidden className="absolute left-[11px] top-2 bottom-2 w-[3px] rounded-full bg-[#003B49]/10 md:left-[15px]">
              <motion.div className="h-full w-full origin-top rounded-full bg-gradient-to-b from-[#FFC94A] via-[#FF6B6B] to-[#7EE0C3]" style={{ scaleY: progress }} />
            </div>
            {STEPS.map((s, i) => {
              const on = i <= lit;
              return (
                <li key={s.title} className="relative pb-16 last:pb-0 md:pb-24">
                  <span
                    className="absolute -left-10 top-1 grid h-[26px] w-[26px] place-items-center rounded-full border-2 text-[11px] font-bold transition-all duration-500 md:-left-14 md:h-[34px] md:w-[34px] md:text-sm"
                    style={{
                      borderColor: on ? "#003B49" : "rgba(0,59,73,0.2)",
                      background: on ? s.color : "#FDF6EC",
                      color: "#003B49",
                      transform: on ? "scale(1.08)" : "scale(1)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <div className={`transition-all duration-500 ${on ? "opacity-100" : "opacity-35"}`}>
                    <h3 className="font-display !py-0 text-3xl font-[460] text-[#003B49] md:text-4xl">{s.title}</h3>
                    <p className="mt-3 max-w-md text-lg text-[#003B49]/75">{s.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
