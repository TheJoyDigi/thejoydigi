import { motion, MotionConfig, useScroll, useSpring } from "framer-motion";
import React from "react";
import type { HomeData } from "@/lib/home";
import Beliefs from "./home/beliefs";
import Hello from "./home/hello";
import Hero from "./home/hero";
import How from "./home/how";
import Lab from "./home/lab";
import Work from "./home/work";
import s from "./landing-art/art.module.css";
import Marquee from "./landing-art/marquee";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-[#4ABEFF] via-[#FFC94A] to-[#FF6B6B]"
    />
  );
}

export default function Landing({ data }: { data: HomeData }) {
  const now = [
    `Money, Mastered — Chapter ${data.mm.latestNumber} of ${data.mm.total} is out`,
    "The OC Pack — new episode every Thursday",
    "The Blue Sock — live in Orange County",
    "Daily AI Brief — cooking in the lab",
    "QRganiz — shipped",
  ];
  return (
    <MotionConfig reducedMotion="user">
      <div className="overflow-x-clip">
        <ScrollProgress />
        <div aria-hidden className={s.grain} />
        <Hero data={data} />
        <Marquee words={now} />
        <Work data={data} />
        <Lab />
        <How />
        <Beliefs />
        <Hello />
      </div>
    </MotionConfig>
  );
}
