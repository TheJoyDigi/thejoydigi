import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { RevealWords, SectionKicker } from "../landing-art/primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

type Project = {
  id: string;
  title: string;
  kind: string;
  line: string;
  tags: string[];
  href: string;
  cta: string;
  accent: string;
  Visual: React.FC;
};

function BlueSockVisual() {
  return (
    <div className="relative h-full w-full bg-[radial-gradient(ellipse_at_20%_10%,#FFD6E7,transparent_55%),radial-gradient(ellipse_at_90%_90%,#CFE3FF,transparent_55%)] bg-[#FFF3E6] p-[7%]">
      <div className="relative h-full w-full -rotate-[2deg] overflow-hidden rounded-2xl border border-[#1B140D]/10 bg-white shadow-[0_40px_80px_-30px_rgba(27,20,13,0.5)]">
        <div className="flex items-center gap-1.5 border-b border-[#1B140D]/10 bg-[#F6F1E8] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF2E88]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFC94A]/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#14A03A]/80" />
          <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 text-[11px] font-medium text-[#6B5D4F]">thebluesock.com</span>
        </div>
        <div className="relative h-full">
          <Image src="/case-studies/bluesock-hero.webp" alt="The Blue Sock homepage" fill sizes="(min-width: 1024px) 640px, 92vw" className="object-cover object-top" />
        </div>
      </div>
    </div>
  );
}

function QrVisual() {
  return (
    <div className="relative grid h-full w-full place-items-center bg-[#DDF1FF] bg-[radial-gradient(ellipse_at_20%_80%,rgba(126,224,195,0.5),transparent_55%)] p-[8%]">
      <div className="relative w-[62%] rotate-[3deg] overflow-hidden rounded-2xl border border-[#1B140D]/10 bg-white p-2 shadow-[0_40px_80px_-30px_rgba(27,20,13,0.5)]">
        <Image src="/case-studies/qrganiz-hero.webp" alt="QRganiz product and app" width={679} height={679} className="block h-auto w-full rounded-xl" />
      </div>
    </div>
  );
}

const PROJECTS: Project[] = [
  {
    id: "blue-sock",
    title: "The Blue Sock",
    kind: "Marketplace · Brand · Web app",
    line: "Boutique dog sitting for Irvine & Orange County. It started as one retreat and grew into a curated marketplace of Badge-Rated sitters, with portals and payments for both sides.",
    tags: ["Brand evolution", "Marketplace", "Portals", "Stripe"],
    href: "/case-studies/the-blue-sock",
    cta: "Read the story",
    accent: "#FF3D8B",
    Visual: BlueSockVisual,
  },
  {
    id: "qrganiz",
    title: "QRganiz",
    kind: "Mobile app · Product",
    line: "A smart QR-code item tracker that helps people organize their belongings: product design, a React Native app, the website, and an Amazon launch.",
    tags: ["React Native", "Product launch", "SEO"],
    href: "/case-studies/qrganiz",
    cta: "See how it works",
    accent: "#4ABEFF",
    Visual: QrVisual,
  },
];

function Info({ p, index, compact = false }: { p: Project; index: number; compact?: boolean }) {
  return (
    <div>
      <div className="flex items-baseline gap-4">
        <span className="font-bungee text-5xl leading-none md:text-7xl" style={{ color: p.accent, WebkitTextStroke: "2px #1B140D", paintOrder: "stroke fill", textShadow: "0.06em 0.06em 0 #1B140D" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B5D4F]">{p.kind}</span>
      </div>
      <h3 className={`font-bungee !py-0 !font-normal mt-4 tracking-[-0.005em] text-[#1B140D] ${compact ? "text-3xl" : "text-4xl xl:text-5xl"}`}>{p.title}</h3>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-[#1B140D]/75">{p.line}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span key={t} className="rounded-full border border-[#1B140D]/15 bg-white px-3 py-1 text-sm text-[#1B140D]/80">
            {t}
          </span>
        ))}
      </div>
      <Link
        href={p.href}
        className="group mt-7 inline-flex items-center gap-3 rounded-full bg-[#FFC94A] px-6 py-3.5 font-semibold text-[#0B0B0C] transition-colors hover:bg-[#F2B731] no-underline hover:no-underline"
      >
        {p.cta}
        <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
}

function Panel({ p, index, onActive }: { p: Project; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.55 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.9, 1, 1, 0.94]);
  const rotate = useTransform(scrollYProgress, [0, 0.4, 1], [index % 2 ? 2 : -2, 0, index % 2 ? -1 : 1]);
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} id={`work-${p.id}`} className="scroll-mt-24 lg:flex lg:min-h-[88vh] lg:items-center">
      <div className="w-full">
        <motion.div style={{ scale, rotate }} className="aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-[0_50px_100px_-50px_rgba(27,20,13,0.6)] md:rounded-[2.5rem]">
          <p.Visual />
        </motion.div>
        <div className="mt-8 lg:hidden">
          <Info p={p} index={index} compact />
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const [active, setActive] = useState(0);
  const p = PROJECTS[active];
  return (
    <section id="work" className="relative scroll-mt-16 bg-[#FDF6EC] py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-14 max-w-3xl md:mb-8">
          <SectionKicker>Selected work</SectionKicker>
          <h2 className="font-bungee !py-0 !font-normal mt-4 text-[2.4rem] leading-[1.04] tracking-[-0.005em] text-[#1B140D] sm:text-5xl md:text-6xl">
            <RevealWords text="Products I have" /> <RevealWords text="shipped." delay={0.12} wordClassName="joy-accent" />
          </h2>
        </div>

        <div className="grid gap-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="hidden lg:block">
            <div className="sticky top-24 flex h-[calc(100vh-8rem)] flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <Info p={p} index={active} />
                </motion.div>
              </AnimatePresence>
              <ol className="mt-12 flex gap-3" aria-label="Projects">
                {PROJECTS.map((proj, i) => (
                  <li key={proj.id}>
                    <a
                      href={`#work-${proj.id}`}
                      aria-label={proj.title}
                      className="block h-1.5 rounded-full transition-all duration-500"
                      style={{ width: i === active ? 48 : 18, background: i === active ? proj.accent : "rgba(27,20,13,0.15)" }}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="space-y-20 lg:space-y-0">
            {PROJECTS.map((proj, i) => (
              <Panel key={proj.id} p={proj} index={i} onActive={setActive} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
