import { motion, MotionConfig, useScroll, useSpring } from "framer-motion";
import React from "react";
import s from "./landing-art/art.module.css";
import Contact from "./landing-art/contact";
import Hero from "./landing-art/hero";
import Marquee from "./landing-art/marquee";
import { CREAM, INK, WaveDivider } from "./landing-art/primitives";
import Process from "./landing-art/process";
import { About, Booking, Portfolio, Values } from "./landing-art/sections";
import Services from "./landing-art/services";

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

export default function Landing() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="overflow-x-clip">
        <ScrollProgress />
        <div aria-hidden className={s.grain} />
        <Hero />
        <Marquee />
        <Services />
        <Process />
        <WaveDivider from={CREAM} to="#fff" />
        <About />
        <WaveDivider from="#fff" to={INK} flip />
        <Portfolio />
        <WaveDivider from={INK} to={CREAM} />
        <Values />
        <Booking />
        <Contact />
      </div>
    </MotionConfig>
  );
}
