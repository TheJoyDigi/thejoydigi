import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { EMAIL } from "../marketing/site-chrome";
import { RevealWords, SectionKicker } from "../landing-art/primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hello() {
  return (
    <section id="about" className="relative scroll-mt-16 overflow-hidden bg-[#FDF6EC] pt-20 md:pt-28">
      <div className="container mx-auto grid items-end gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 1, ease: EASE }}
          className="relative order-2 mx-auto w-full max-w-[520px] lg:order-1"
        >
          <div aria-hidden className="absolute inset-x-[8%] bottom-0 top-[12%] rounded-t-full bg-[radial-gradient(closest-side,rgba(255,201,74,0.4),rgba(255,46,136,0.12)_60%,transparent)]" />
          <Image
            src="/me/long-3d-wave.webp"
            alt="3D illustrated portrait of Long La waving hello"
            width={1000}
            height={1089}
            sizes="(min-width: 1024px) 520px, 90vw"
            className="relative block h-auto w-full [mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
          />
        </motion.div>

        <div className="order-1 pb-4 lg:order-2 lg:pb-24">
          <SectionKicker>About</SectionKicker>
          <h2 className="font-display !py-0 mt-4 text-5xl font-[460] leading-[0.98] tracking-[-0.03em] text-[#1B140D] md:text-7xl">
            <RevealWords text="Hi, I'm" /> <RevealWords text="Long." delay={0.12} wordClassName="italic text-[#8F6300]" />
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-[#1B140D]/80"
          >
            <p>
              I&apos;ve spent over 10 years as a software engineer across big tech, startups, and consulting firms —
              building everything from polished apps to robust internal systems.
            </p>
            <p>
              The Joy Digi is where I build joyful things: products people love to use, podcasts worth pressing play on,
              and SI experiments that make a little more possible every week.
            </p>
            <p>I think the next few years will be the most creative in software&apos;s history. I want to spend them building — and sharing what I learn.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="mt-10"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6B5D4F]">Say hi — I read everything</p>
            <a
              href={`mailto:${EMAIL}`}
              className="group mt-3 inline-flex items-center gap-4 font-display text-3xl text-[#1B140D] no-underline hover:no-underline md:text-5xl"
            >
              <span className="bg-[linear-gradient(#FFC94A,#FFC94A)] bg-[length:0%_3px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_3px]">
                {EMAIL}
              </span>
              <span aria-hidden className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#FFC94A] text-xl text-[#0B0B0C] transition-transform duration-300 group-hover:rotate-[-45deg] md:h-14 md:w-14">
                →
              </span>
            </a>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
              {[
                { href: "/podcasts", label: "🎧 Podcasts" },
                { href: "/case-studies", label: "🛠 Projects" },
                { href: "/#lab", label: "🧪 The Lab" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="rounded-full border border-[#1B140D]/15 bg-white px-4 py-2 text-[#1B140D] transition-colors hover:border-[#1B140D] no-underline hover:no-underline">
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
