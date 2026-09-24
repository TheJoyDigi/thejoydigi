import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { CORAL, INK, RevealWords } from "./primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

function useParallax(v: MotionValue<number>, px: number) {
  return useTransform(v, (n) => n * px);
}

function Annotation({
  children,
  className,
  arrow,
  delay,
}: {
  children: React.ReactNode;
  className: string;
  arrow: string;
  delay: number;
}) {
  return (
    <motion.div {...rise(delay)} className={`absolute z-20 flex items-center gap-2 ${className}`}>
      <span className="whitespace-nowrap rounded-full border border-[#003B49]/15 bg-white/90 px-3.5 py-1.5 text-xs md:text-sm font-semibold text-[#003B49] shadow-sm backdrop-blur">
        {children}
      </span>
      <svg viewBox="0 0 60 40" className="hidden md:block h-8 w-12 overflow-visible" aria-hidden>
        <motion.path
          d={arrow}
          fill="none"
          stroke={INK}
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: delay + 0.3 }}
        />
      </svg>
    </motion.div>
  );
}

function WorkStack() {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useSpring(rx, { stiffness: 50, damping: 20 });
  const my = useSpring(ry, { stiffness: 50, damping: 20 });
  const backX = useParallax(mx, -6);
  const backY = useParallax(my, -6);
  const frontX = useParallax(mx, 10);
  const frontY = useParallax(my, 10);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const b = ref.current?.getBoundingClientRect();
        if (!b || e.pointerType !== "mouse") return;
        rx.set(((e.clientX - b.left) / b.width) * 2 - 1);
        ry.set(((e.clientY - b.top) / b.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      className="relative mx-auto w-full max-w-[640px] aspect-[6/5]"
    >
      <div aria-hidden className="absolute inset-[-12%] rounded-full bg-[radial-gradient(closest-side,rgba(74,190,255,0.28),transparent)]" />
      <div aria-hidden className="absolute -bottom-[10%] -left-[10%] h-2/3 w-2/3 rounded-full bg-[radial-gradient(closest-side,rgba(255,107,107,0.18),transparent)]" />

      <motion.div style={{ x: backX, y: backY }} className="absolute right-0 top-[4%] w-[90%]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
        >
          <Link
            href="/case-studies/the-blue-sock"
            aria-label="The Blue Sock case study"
            className="group block -rotate-[1.5deg] overflow-hidden rounded-2xl border border-[#003B49]/10 bg-white shadow-[0_40px_80px_-30px_rgba(0,59,73,0.45)] transition-transform duration-500 ease-out hover:-translate-y-1.5 hover:rotate-0"
          >
            <div className="flex items-center gap-1.5 border-b border-[#003B49]/10 bg-[#F6F1E8] px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B6B]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFC94A]/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#7EE0C3]" />
              <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-[11px] font-medium text-[#003B49]/55">
                thebluesock.com — boutique dog sitting
              </span>
            </div>
            <Image
              src="/case-studies/bluesock-hero.webp"
              alt="The Blue Sock dog-sitting marketplace designed and built by The Joy Digi"
              width={1440}
              height={810}
              priority
              sizes="(min-width: 1024px) 560px, 90vw"
              className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div style={{ x: frontX, y: frontY }} className="absolute bottom-0 left-0 w-[44%]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.55 }}
        >
          <Link
            href="/case-studies/qrganiz"
            aria-label="QRganiz case study"
            className="group block rotate-[3deg] overflow-hidden rounded-2xl border border-[#003B49]/10 bg-white p-1.5 shadow-[0_40px_70px_-25px_rgba(0,59,73,0.5)] transition-transform duration-500 ease-out hover:-translate-y-1.5 hover:rotate-0"
          >
            <div className="relative aspect-[8/5] overflow-hidden rounded-xl">
              <Image
                src="/case-studies/qrganiz-hero.webp"
                alt="QRganiz product and app by The Joy Digi"
                fill
                priority
                sizes="(min-width: 1024px) 280px, 44vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </Link>
        </motion.div>
      </motion.div>

      <Annotation className="right-[2%] -top-[3%] flex-row-reverse" arrow="M4 6 C 20 4, 34 12, 40 30 M34 24 L40 31 L44 23" delay={1.1}>
        Marketplace + Brand + Web App
      </Annotation>
      <Annotation className="left-[44%] bottom-[6%] ml-4" arrow="M56 20 C 40 22, 22 18, 8 10 M14 6 L7 10 L13 15" delay={1.3}>
        Mobile App + Website
      </Annotation>
    </div>
  );
}

const proof = [
  { big: "10+", small: "years building software" },
  { big: "Big tech", small: "& startup background" },
  { big: "End-to-end", small: "design · build · grow" },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#FDF6EC]">
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_75%)]">
        <defs>
          <pattern id="hero-grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M64 0 H0 V64" fill="none" stroke={INK} strokeOpacity="0.07" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      <div className="container relative mx-auto grid min-h-[calc(100svh-72px)] items-center gap-14 px-4 py-12 lg:grid-cols-[1.02fr_1fr] lg:gap-10 lg:py-16">
        <div className="max-w-2xl">
          <motion.div {...rise(0.05)} className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="flex items-center gap-3">
              <span className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white shadow">
                <Image src="/about-image.webp" alt="" fill sizes="40px" className="object-cover object-top" />
              </span>
              <span className="text-sm leading-tight text-[#003B49]/70">
                <span className="block font-semibold text-[#003B49]">Long La</span>
                Founder, The Joy Digi
              </span>
            </span>
            <span className="hidden sm:block h-6 w-px bg-[#003B49]/15" />
            <span className="inline-flex items-center gap-2 text-sm font-medium text-[#003B49]/70">
              <span className="h-2 w-2 rounded-full bg-[#2FBF8F] shadow-[0_0_0_4px_rgba(47,191,143,0.18)]" />
              Booking new projects
            </span>
          </motion.div>

          <h1 className="font-display !py-0 mb-7 text-[3.1rem] leading-[1] tracking-[-0.03em] text-[#003B49] sm:text-6xl lg:text-[4.6rem] xl:text-[5.4rem] [font-variation-settings:'opsz'_144] font-[440]">
            <RevealWords text="A digital studio for" delay={0.1} />{" "}
            <span className="relative inline-block">
              <RevealWords text="visionary" delay={0.26} wordClassName="italic text-[#FF6B6B] [font-variation-settings:'opsz'_144,'SOFT'_100]" />
              <svg viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-[0.06em] left-[2%] h-[0.16em] w-[96%] overflow-visible" aria-hidden>
                <motion.path
                  d="M3 14 C 70 6, 150 4, 297 10"
                  fill="none"
                  stroke={CORAL}
                  strokeOpacity={0.55}
                  strokeWidth={4}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
                />
              </svg>
            </span>{" "}
            <RevealWords text="brands." delay={0.32} />
          </h1>

          <motion.p {...rise(0.45)} className="mb-10 max-w-xl text-lg md:text-xl leading-relaxed text-[#003B49]/75">
            Helping businesses grow with joyful experiences, purposeful design,
            custom tech, and clear strategy.
          </motion.p>

          <motion.div {...rise(0.55)} className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#booking"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#003B49] px-7 py-4 font-semibold text-white shadow-[0_14px_30px_-12px_rgba(0,59,73,0.7)] transition-colors duration-300 hover:bg-[#0B5566] no-underline hover:no-underline"
            >
              Schedule Your Free Consultation
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-[#003B49]/25 px-7 py-4 font-semibold text-[#003B49] transition-colors duration-300 hover:border-[#003B49] hover:bg-white no-underline hover:no-underline"
            >
              Get Started
            </a>
          </motion.div>

          <motion.dl {...rise(0.7)} className="mt-12 grid max-w-xl grid-cols-3 border-t border-[#003B49]/10 pt-6">
            {proof.map((p, i) => (
              <div key={p.big} className={i ? "border-l border-[#003B49]/10 pl-4 md:pl-6" : "pr-4"}>
                <dt className="font-display whitespace-nowrap text-lg sm:text-xl md:text-2xl font-medium text-[#003B49]">{p.big}</dt>
                <dd className="mt-1 text-xs md:text-sm leading-snug text-[#003B49]/60">{p.small}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <WorkStack />
      </div>
    </section>
  );
}
