import { motion, MotionConfig, useScroll, useSpring } from "framer-motion";
import React from "react";
import type { HomeData } from "@/lib/home";
import Beliefs from "./home/beliefs";
import Books from "./home/books";
import Hello from "./home/hello";
import Hero from "./home/hero";
import Inbox from "./home/inbox";
import Shows from "./home/shows";
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
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-[#FFC94A]"
    />
  );
}

export default function Landing({ data }: { data: HomeData }) {
  const count = (slug: string) => data.shows.find((sh) => sh.slug === slug)?.count ?? 0;
  const now = [
    `Value, Created: all ${count("value-created")} chapters free to listen`,
    `Money, Mastered: Chapter ${data.mm.latestNumber} of ${data.mm.total} is out`,
    "The OC Pack: new episode every Thursday",
    `Incentives, Decoded: ${count("incentives-decoded")} chapters on why people do what they do`,
    "Anthropic Blogcast: new episodes whenever Anthropic publishes",
    "The Blue Sock: live in Orange County",
  ];
  return (
    <MotionConfig reducedMotion="user">
      <div className="overflow-x-clip">
        <ScrollProgress />
        <div aria-hidden className={s.grain} />
        <Hero data={data} />
        <Marquee words={now} />
        <Shows data={data} />
        <Books />
        <Inbox />
        <Work />
        <Beliefs />
        <Hello />
      </div>
    </MotionConfig>
  );
}
