import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import type { HomeData } from "@/lib/home";
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
  Visual: React.FC<{ data: HomeData }>;
};

function BlueSockVisual() {
  return (
    <div className="relative h-full w-full bg-[radial-gradient(ellipse_at_20%_10%,#FFD6E7,transparent_55%),radial-gradient(ellipse_at_90%_90%,#CFE3FF,transparent_55%)] bg-[#FFF3E6] p-[7%]">
      <div className="relative h-full w-full -rotate-[2deg] overflow-hidden rounded-2xl border border-[#003B49]/10 bg-white shadow-[0_40px_80px_-30px_rgba(0,59,73,0.5)]">
        <div className="flex items-center gap-1.5 border-b border-[#003B49]/10 bg-[#F6F1E8] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B6B]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFC94A]/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#7EE0C3]" />
          <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 text-[11px] font-medium text-[#003B49]/55">thebluesock.com</span>
        </div>
        <div className="relative h-full">
          <Image src="/case-studies/bluesock-hero.webp" alt="The Blue Sock homepage" fill sizes="(min-width: 1024px) 640px, 92vw" className="object-cover object-top" />
        </div>
      </div>
    </div>
  );
}

function MoneyVisual({ data }: { data: HomeData }) {
  return (
    <div className="relative flex h-full w-full items-center gap-[6%] overflow-hidden bg-[#060E1A] bg-[radial-gradient(ellipse_at_80%_20%,rgba(217,181,106,0.35),transparent_60%)] p-[7%]">
      <Image src="/podcasts/money-mastered/art/panorama.webp" alt="" fill sizes="(min-width: 1024px) 700px, 92vw" className="object-cover object-bottom opacity-40" />
      <div className="relative w-[42%] shrink-0 rotate-[-3deg] rounded-md border border-[#D9B56A]/60 p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
        <Image src="/podcasts/money-mastered/cover.jpg" alt="Money, Mastered cover" width={500} height={500} className="block h-auto w-full rounded-sm" />
      </div>
      <div className="relative flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D9B56A] md:text-xs">The Ledger</p>
        <p className="mt-2 font-display text-2xl leading-tight text-[#F3DE9E] md:text-4xl">
          {data.mm.released} of {data.mm.total} chapters
        </p>
        <p className="mt-1 text-xs text-[#EFE6D2]/60 md:text-sm">out now — the rest are on the way</p>
        <div className="mt-4 grid grid-cols-9 gap-1 md:gap-1.5">
          {Array.from({ length: data.mm.total }, (_, i) => (
            <span
              key={i}
              className="aspect-square rounded-full"
              style={
                i < data.mm.released
                  ? { background: "radial-gradient(circle at 35% 30%, #FFF1C4, #D9B56A 45%, #8C6A2E 100%)" }
                  : { border: "1px dashed rgba(217,181,106,0.35)" }
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function OcVisual() {
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden bg-[#FDE3A7]">
      <div aria-hidden className="absolute aspect-square w-[88%] rounded-full bg-[repeating-conic-gradient(#FC7F46_0deg_9deg,#FF6F61_9deg_18deg)] opacity-90" />
      <div className="relative w-[58%] overflow-hidden rounded-full border-[5px] border-[#6B3410] shadow-[10px_10px_0_0_#6B3410]">
        <Image src="/podcasts/oc-pack/cover.jpg" alt="The OC Pack cover" width={600} height={600} className="block h-auto w-full scale-[1.12]" />
      </div>
      <span className="absolute bottom-[10%] right-[8%] rotate-[6deg] rounded-2xl border-[3px] border-[#6B3410] bg-[#FFF4DA] px-4 py-2 text-sm font-extrabold text-[#6B3410] shadow-[4px_4px_0_0_#6B3410] md:text-base">
        New every Thursday
      </span>
    </div>
  );
}

function QrVisual() {
  return (
    <div className="relative grid h-full w-full place-items-center bg-[#DDF1FF] bg-[radial-gradient(ellipse_at_20%_80%,rgba(126,224,195,0.5),transparent_55%)] p-[8%]">
      <div className="relative w-[62%] rotate-[3deg] overflow-hidden rounded-2xl border border-[#003B49]/10 bg-white p-2 shadow-[0_40px_80px_-30px_rgba(0,59,73,0.5)]">
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
    id: "money-mastered",
    title: "Money, Mastered",
    kind: "Audiobook podcast",
    line: "A 36-chapter journey from zero to mastery in macroeconomics, money, investing, trading, and Bitcoin — with its own gilded listening room.",
    tags: ["Audiobook", "Podcast feed", "Web player"],
    href: "/podcasts/money-mastered",
    cta: "Press play",
    accent: "#D9B56A",
    Visual: MoneyVisual,
  },
  {
    id: "oc-pack",
    title: "The OC Pack",
    kind: "Weekly podcast",
    line: "The podcast for Orange County pet parents: dog-friendly beaches and trails, vet-bill savings, training tips, and local intel. New episode every Thursday.",
    tags: ["Weekly show", "Local", "Pets"],
    href: "/podcasts/oc-pack",
    cta: "Listen in",
    accent: "#FC7F46",
    Visual: OcVisual,
  },
  {
    id: "qrganiz",
    title: "QRganiz",
    kind: "Mobile app · Product",
    line: "A smart QR-code item tracker that helps people organize their belongings — product design, a React Native app, the website, and an Amazon launch.",
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
        <span className="font-display text-5xl font-semibold leading-none md:text-7xl" style={{ color: p.accent, WebkitTextStroke: "1.5px #003B49" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#003B49]/55">{p.kind}</span>
      </div>
      <h3 className={`font-display !py-0 mt-4 font-[460] tracking-[-0.03em] text-[#003B49] ${compact ? "text-4xl" : "text-5xl xl:text-6xl"}`}>{p.title}</h3>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-[#003B49]/75">{p.line}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span key={t} className="rounded-full border border-[#003B49]/15 bg-white px-3 py-1 text-sm text-[#003B49]/80">
            {t}
          </span>
        ))}
      </div>
      <Link
        href={p.href}
        className="group mt-7 inline-flex items-center gap-3 rounded-full bg-[#003B49] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[#0B5566] no-underline hover:no-underline"
      >
        {p.cta}
        <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
}

function Panel({ p, index, data, onActive }: { p: Project; index: number; data: HomeData; onActive: (i: number) => void }) {
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
        <motion.div style={{ scale, rotate }} className="aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-[0_50px_100px_-50px_rgba(0,59,73,0.6)] md:rounded-[2.5rem]">
          <p.Visual data={data} />
        </motion.div>
        <div className="mt-8 lg:hidden">
          <Info p={p} index={index} compact />
        </div>
      </div>
    </div>
  );
}

export default function Work({ data }: { data: HomeData }) {
  const [active, setActive] = useState(0);
  const p = PROJECTS[active];
  return (
    <section id="work" className="relative scroll-mt-16 bg-[#FDF6EC] py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-14 max-w-3xl md:mb-8">
          <SectionKicker>Selected work</SectionKicker>
          <h2 className="font-display !py-0 mt-4 text-5xl font-[460] leading-[0.98] tracking-[-0.03em] text-[#003B49] md:text-7xl">
            <RevealWords text="Things I've" /> <RevealWords text="shipped." delay={0.12} wordClassName="italic text-[#4ABEFF]" />
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
                      style={{ width: i === active ? 48 : 18, background: i === active ? proj.accent : "rgba(0,59,73,0.15)" }}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="space-y-20 lg:space-y-0">
            {PROJECTS.map((proj, i) => (
              <Panel key={proj.id} p={proj} index={i} data={data} onActive={setActive} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
