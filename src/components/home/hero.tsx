import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";
import type { HomeData } from "@/lib/home";
import { EMAIL } from "../marketing/site-chrome";
import { CORAL, INK, RevealWords } from "../landing-art/primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

const CHIPS = [
  { label: "The Blue Sock", kind: "Marketplace", img: "/case-studies/bluesock-hero.webp", href: "#work-blue-sock", pos: "left-[-4%] top-[16%]", depth: 18, delay: 0.9 },
  { label: "Money, Mastered", kind: "Audiobook", img: "/podcasts/money-mastered/cover.jpg", href: "#work-money-mastered", pos: "right-[-6%] top-[8%]", depth: -14, delay: 1.0 },
  { label: "The OC Pack", kind: "Podcast", img: "/podcasts/oc-pack/cover.jpg", href: "#work-oc-pack", pos: "right-[-8%] top-[52%]", depth: 22, delay: 1.1 },
  { label: "QRganiz", kind: "App", img: "/case-studies/qrganiz-hero.webp", href: "#work-qrganiz", pos: "left-[-8%] top-[60%]", depth: -20, delay: 1.2 },
];

function Chip({ chip, mx, my }: { chip: (typeof CHIPS)[number]; mx: MotionValue<number>; my: MotionValue<number> }) {
  const x = useTransform(mx, (v) => v * chip.depth);
  const y = useTransform(my, (v) => v * chip.depth);
  return (
    <motion.a
      href={chip.href}
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 180, damping: 16, delay: chip.delay }}
      className={`absolute ${chip.pos} z-20 hidden items-center gap-2.5 rounded-full border border-[#003B49]/10 bg-white/90 py-1.5 pl-1.5 pr-4 shadow-[0_18px_40px_-18px_rgba(0,59,73,0.55)] backdrop-blur transition-transform duration-300 hover:scale-105 sm:flex no-underline hover:no-underline`}
    >
      <span className="relative h-9 w-9 overflow-hidden rounded-full border border-[#003B49]/10">
        <Image src={chip.img} alt="" fill sizes="36px" className="object-cover object-top" />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-semibold text-[#003B49]">{chip.label}</span>
        <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-[#003B49]/50">{chip.kind}</span>
      </span>
    </motion.a>
  );
}

function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useSpring(rx, { stiffness: 50, damping: 18 });
  const my = useSpring(ry, { stiffness: 50, damping: 18 });
  const px = useTransform(mx, (v) => v * -8);
  const py = useTransform(my, (v) => v * -6);

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
      className="relative mx-auto aspect-[4/5] w-full max-w-[540px]"
    >
      <div aria-hidden className="absolute inset-[6%] rounded-full bg-[radial-gradient(closest-side,rgba(255,201,74,0.55),rgba(255,107,107,0.28)_55%,transparent)]" />
      <svg aria-hidden viewBox="0 0 400 400" className="absolute inset-[2%] h-[96%] w-[96%] opacity-60">
        <circle cx="200" cy="200" r="188" fill="none" stroke={INK} strokeOpacity="0.14" strokeDasharray="2 10" />
        <circle cx="200" cy="200" r="150" fill="none" stroke={CORAL} strokeOpacity="0.25" strokeDasharray="1 8" />
      </svg>
      <motion.div
        style={{ x: px, y: py }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
        className="absolute inset-0"
      >
        <Image
          src="/me/long-3d-hero.webp"
          alt="3D illustrated portrait of Long La holding a glowing spark"
          fill
          priority
          sizes="(min-width: 1024px) 540px, 92vw"
          className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_78%,transparent)]"
        />
        <span aria-hidden className="home-spark absolute left-[46%] top-[63%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,236,190,0.95),rgba(255,140,120,0.45)_45%,transparent)] mix-blend-screen" />
      </motion.div>
      {CHIPS.map((c) => (
        <Chip key={c.label} chip={c} mx={mx} my={my} />
      ))}
      <style jsx>{`
        .home-spark {
          animation: home-spark 3.6s ease-in-out infinite;
        }
        @keyframes home-spark {
          0%,
          100% {
            opacity: 0.55;
            transform: translate(-50%, -50%) scale(0.9);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.15);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .home-spark {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

export default function Hero({ data }: { data: HomeData }) {
  return (
    <section id="home" className="relative overflow-hidden bg-[#FDF6EC]">
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_at_70%_45%,black,transparent_70%)]">
        <defs>
          <pattern id="home-grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M64 0 H0 V64" fill="none" stroke={INK} strokeOpacity="0.07" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#home-grid)" />
      </svg>

      <div className="container relative mx-auto grid min-h-[calc(100svh-72px)] items-center gap-6 px-4 pt-10 pb-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-10">
        <div className="order-2 max-w-2xl lg:order-1">
          <motion.a
            href="#work-money-mastered"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#003B49]/10 bg-white/70 px-4 py-2 text-sm font-medium text-[#003B49]/80 shadow-sm backdrop-blur no-underline hover:no-underline hover:text-[#003B49]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7EE0C3] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2FBF8F]" />
            </span>
            Just shipped: <span className="font-semibold text-[#003B49]">Money, Mastered · Ch. {data.mm.latestNumber}</span>
          </motion.a>

          <h1 className="font-display !py-0 text-[3.2rem] leading-[0.98] tracking-[-0.035em] text-[#003B49] sm:text-7xl lg:text-[5.6rem] [font-variation-settings:'opsz'_144] font-[430]">
            <RevealWords text="I build joyful things" delay={0.1} />{" "}
            <RevealWords text="with code" delay={0.25} />{" "}
            <span className="relative inline-block text-[#FF6B6B]">
              <RevealWords text="and AI." delay={0.35} wordClassName="italic [font-variation-settings:'opsz'_144,'SOFT'_100]" />
              <svg viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-[0.04em] left-0 h-[0.15em] w-full overflow-visible" aria-hidden>
                <motion.path
                  d="M3 14 C 80 5, 170 4, 297 11"
                  fill="none"
                  stroke={CORAL}
                  strokeOpacity={0.5}
                  strokeWidth={4}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 1 }}
                />
              </svg>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-[#003B49]/75 md:text-xl"
          >
            I&apos;m Long — a software engineer of 10+ years. These days I ship products, podcasts, and AI experiments
            under The Joy Digi, and I&apos;ve never been more excited about what one curious builder can make.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.62 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#work"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#003B49] px-7 py-4 font-semibold text-white shadow-[0_14px_30px_-12px_rgba(0,59,73,0.7)] transition-colors hover:bg-[#0B5566] no-underline hover:no-underline"
            >
              See the work
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center rounded-full border border-[#003B49]/25 px-7 py-4 font-semibold text-[#003B49] transition-colors hover:border-[#003B49] hover:bg-white no-underline hover:no-underline"
            >
              Say hi 👋
            </a>
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <Portrait />
        </div>
      </div>
    </section>
  );
}
