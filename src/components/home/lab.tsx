import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { RevealWords, SectionKicker } from "../landing-art/primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

const EXPERIMENTS = [
  {
    title: "Daily AI Brief",
    status: "In the lab",
    statusColor: "#FFC94A",
    text: "A pipeline that gathers fresh AI and business-idea news, drafts a three-minute script, voices it with text-to-speech, and publishes it as a podcast and a video — every morning, on a schedule.",
    img: "/lab/daily-ai-brief.webp",
    tint: "from-[#E3F6F2] to-[#FDF6EC]",
  },
  {
    title: "The Universe Whisper",
    status: "Experiment",
    statusColor: "#C9B6FF",
    text: "A small TikTok app for sharing inspiring, thought-provoking video content straight to a connected account.",
    img: "/lab/universe-whisper.webp",
    tint: "from-[#EEE8FF] to-[#FDF6EC]",
  },
];

const PORTRAITS = ["/me/long-3d-hero.webp", "/me/long-3d-desk.webp", "/me/long-3d-wave.webp"];

export default function Lab() {
  return (
    <section id="lab" className="relative scroll-mt-16 bg-white py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-14 grid gap-6 md:mb-16 md:grid-cols-2 md:items-end">
          <div>
            <SectionKicker color="#2FBF8F">The Lab</SectionKicker>
            <h2 className="font-display !py-0 mt-4 text-5xl font-[460] leading-[0.98] tracking-[-0.03em] text-[#003B49] md:text-7xl">
              <RevealWords text="Experiments at the" /> <RevealWords text="edge." delay={0.15} wordClassName="italic text-[#2FBF8F]" />
            </h2>
          </div>
          <p className="max-w-md text-lg text-[#003B49]/70 md:justify-self-end">
            Not everything here is finished. That&apos;s the point — the lab is where I poke at what AI makes newly possible.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {EXPERIMENTS.map((e, i) => (
            <motion.article
              key={e.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px 0px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
              className={`group relative flex flex-col overflow-hidden rounded-[2rem] border border-[#003B49]/10 bg-gradient-to-b ${e.tint} p-7`}
            >
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#003B49]/10 bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-[#003B49]/70">
                <span className="h-2 w-2 rounded-full" style={{ background: e.statusColor }} />
                {e.status}
              </span>
              <div className="relative mx-auto my-4 aspect-square w-[78%] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:rotate-[-2deg]">
                <Image src={e.img} alt="" fill sizes="(min-width: 1024px) 300px, 70vw" className="object-contain [mask-image:radial-gradient(closest-side,black_80%,transparent)]" />
              </div>
              <h3 className="font-display !py-0 text-3xl font-[460] text-[#003B49]">{e.title}</h3>
              <p className="mt-3 text-[#003B49]/75">{e.text}</p>
            </motion.article>
          ))}

          <motion.article
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-[#003B49] p-7 text-[#FDF6EC]"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#FDF6EC]/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-[#FDF6EC]/80">
              <span className="h-2 w-2 rounded-full bg-[#7EE0C3]" />
              Live — you&apos;re on it
            </span>
            <div className="relative my-6 flex h-[15.5rem] items-end justify-center">
              {PORTRAITS.map((src, i) => (
                <div
                  key={src}
                  className="absolute bottom-0 aspect-[4/5] w-[46%] overflow-hidden rounded-2xl border-2 border-[#FDF6EC]/80 bg-[#FDF6EC] shadow-xl transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(${(i - 1) * 62}%) rotate(${(i - 1) * 8}deg)`,
                    zIndex: i === 1 ? 2 : 1,
                  }}
                >
                  <Image src={src} alt="" fill sizes="160px" className="object-cover object-top" />
                </div>
              ))}
            </div>
            <h3 className="font-display !py-0 text-3xl font-[460]">This website</h3>
            <p className="mt-3 text-[#FDF6EC]/75">
              Designed and built with an AI pair — including my 3D self, generated from a single photo. Next.js, Framer
              Motion, and a lot of joy.
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
