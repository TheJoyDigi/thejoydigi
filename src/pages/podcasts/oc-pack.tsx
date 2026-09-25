import { AnimatePresence, motion } from "framer-motion";
import { GetStaticProps } from "next";
import { Nunito, Titan_One } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Equalizer, PauseIcon, PlayIcon, PodcastSeo, SkipIcon, useCopy } from "@/components/podcast/common";
import { OcPackEmailForm } from "@/components/podcast/oc-pack-email-form";
import { fmt, usePlayer, type Player } from "@/components/podcast/use-player";
import { getShow, type Show } from "@/lib/podcasts";

const titan = Titan_One({ subsets: ["latin"], weight: "400", variable: "--oc-display", display: "swap" });
const nunito = Nunito({ subsets: ["latin"], variable: "--oc-body", display: "swap" });

const SAND = "#FDE3A7";
const CREAM = "#FFF4DA";
const SUNSET = "#FC7F46";
const CORAL = "#FF6F61";
const GOLD = "#FEBB55";
const TEAL = "#2E9CA6";
const PALM = "#1F6B5C";
const BROWN = "#6B3410";
const EASE = [0.22, 1, 0.36, 1] as const;

const SPOTIFY_URL = "https://open.spotify.com/show/1vEadmFS7Bq1i3K9HfAzXO";

const display = "font-[family-name:var(--oc-display)]";
const sticker = "border-[3px] border-[#6B3410] shadow-[5px_5px_0_0_#6B3410]";

function Sunburst({ className = "" }: { className?: string }) {
  const rays = 20;
  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden>
      <defs>
        <clipPath id="oc-sun-clip">
          <circle r="100" />
        </clipPath>
      </defs>
      <g clipPath="url(#oc-sun-clip)">
        <circle r="100" fill={CORAL} />
        <g className="oc-rays">
          {Array.from({ length: rays }, (_, i) => {
            const a0 = (i / rays) * Math.PI * 2;
            const a1 = ((i + 0.5) / rays) * Math.PI * 2;
            const p = (a: number) => `${Math.round(Math.cos(a) * 1500) / 10},${Math.round(Math.sin(a) * 1500) / 10}`;
            return <path key={i} d={`M0,0 L${p(a0)} L${p(a1)} Z`} fill={SUNSET} />;
          })}
        </g>
      </g>
      <style jsx>{`
        .oc-rays {
          transform-origin: 0 0;
          animation: oc-spin 120s linear infinite;
        }
        @keyframes oc-spin {
          to {
            transform: rotate(360deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .oc-rays {
            animation: none;
          }
        }
      `}</style>
    </svg>
  );
}

function Waves({ top = SAND }: { top?: string }) {
  return (
    <div aria-hidden className="relative -mb-px h-24 md:h-32" style={{ background: top }}>
      <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M0,70 C180,30 360,110 540,70 C720,30 900,110 1080,70 C1260,30 1350,60 1440,50 L1440,140 L0,140 Z" fill="#7CC8C8" />
        <path d="M0,95 C200,60 400,125 600,92 C800,60 1000,125 1200,92 C1320,72 1380,85 1440,80 L1440,140 L0,140 Z" fill={TEAL} />
        <path d="M0,95 C200,60 400,125 600,92 C800,60 1000,125 1200,92 C1320,72 1380,85 1440,80" fill="none" stroke={CREAM} strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" />
      </svg>
    </div>
  );
}

const PawShape = ({ fill = BROWN }: { fill?: string }) => (
  <g fill={fill} stroke="none">
    <ellipse cx="0" cy="4" rx="6.5" ry="5.5" />
    <circle cx="-6.5" cy="-4" r="2.6" />
    <circle cx="-2.2" cy="-8" r="2.6" />
    <circle cx="2.2" cy="-8" r="2.6" />
    <circle cx="6.5" cy="-4" r="2.6" />
  </g>
);

const Paw = ({ className = "", fill = BROWN }: { className?: string; fill?: string }) => (
  <svg viewBox="-12 -12 24 24" className={className} aria-hidden>
    <PawShape fill={fill} />
  </svg>
);

function Hero({ show, player }: { show: Show; player: Player }) {
  const latest = show.episodes.length - 1;
  const ep = show.episodes[latest];
  const isLatestPlaying = player.index === latest && player.playing;
  const { copied, copy } = useCopy(show.feedUrl);
  return (
    <section className="relative overflow-hidden" style={{ background: SAND }}>
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 pt-6 md:px-8">
        <Link href="/" className="font-bold text-[#6B3410]/80 no-underline hover:text-[#6B3410] hover:no-underline">
          ← The Joy Digi
        </Link>
        <button onClick={copy} className={`rounded-full bg-[#FFF4DA] px-4 py-2 text-sm font-extrabold text-[#6B3410] ${sticker} !shadow-[3px_3px_0_0_#6B3410] transition-transform hover:-translate-y-0.5`}>
          {copied ? "Feed copied ✓" : "Copy RSS"}
        </button>
      </nav>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pt-10 pb-10 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:pt-14">
        <div className="text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
            className={`inline-flex items-center gap-2 rounded-full bg-[#FEBB55] px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-[#6B3410] ${sticker} !shadow-[3px_3px_0_0_#6B3410]`}
          >
            <Paw className="h-4 w-4" /> New episode every Thursday
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className={`!py-0 mt-8 ${display} text-[4.2rem] leading-[0.9] text-[#FFF4DA] sm:text-8xl lg:text-[8.5rem]`}
            style={{
              WebkitTextStroke: `3px ${BROWN}`,
              paintOrder: "stroke fill",
              textShadow: `6px 6px 0 ${SUNSET}, 9px 9px 0 ${BROWN}`,
            }}
          >
            The OC
            <br />
            Pack
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className={`mt-7 ${display} text-xl md:text-2xl text-[#1F6B5C]`}
          >
            Orange County Dog &amp; Pet Parents
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
            className="mx-auto mt-4 max-w-xl text-lg font-semibold leading-relaxed text-[#6B3410]/85 lg:mx-0"
          >
            Dog-friendly beaches, trails and patios, vet-bill saving strategies, training and health tips — and the
            local intel that makes life with your pet happier and more affordable. Hosted by Alex &amp; Jordan.
          </motion.p>
          {ep && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
              className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <button
                onClick={() => player.playIndex(latest)}
                className={`inline-flex items-center gap-3 rounded-full bg-[#FC7F46] px-7 py-4 text-lg font-extrabold text-[#FFF4DA] ${sticker} transition-transform duration-200 hover:-translate-y-1 active:translate-y-0.5 active:shadow-[2px_2px_0_0_#6B3410]`}
              >
                {isLatestPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
                Play Episode {ep.number}
              </button>
              <span className="text-sm font-bold text-[#6B3410]/70">
                {ep.duration} · {ep.dateLabel}
              </span>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.15 }}
          className="relative mx-auto w-full max-w-[520px]"
        >
          <Sunburst className="absolute inset-[-6%] h-[112%] w-[112%]" />
          <div className="relative overflow-hidden rounded-full border-[5px] border-[#6B3410] shadow-[10px_10px_0_0_#6B3410]">
            <Image src={show.cover} alt="The OC Pack cover art: a golden retriever and an orange cat at a beach sunset" width={1040} height={1040} priority sizes="(min-width: 1024px) 500px, 88vw" className="block h-auto w-full scale-[1.12]" />
          </div>
          <span className={`absolute -right-2 bottom-6 rotate-[8deg] rounded-2xl bg-[#FFF4DA] px-4 py-2 ${display} text-lg text-[#6B3410] ${sticker} md:-right-6`}>
            Orange County, CA
          </span>
        </motion.div>
      </div>
      <Waves />
    </section>
  );
}

function Postcard({ show, player }: { show: Show; player: Player }) {
  const i = show.episodes.length - 1;
  const ep = show.episodes[i];
  if (!ep) return null;
  const active = player.index === i;
  return (
    <section className="px-5 pt-4 pb-24 md:px-8" style={{ background: TEAL }}>
      <div className="mx-auto max-w-6xl">
        <p className={`mb-6 text-center ${display} text-2xl text-[#FFF4DA] md:text-3xl`}>On this week&apos;s walk</p>
        <motion.article
          initial={{ opacity: 0, y: 40, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: -0.8 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className={`relative rounded-[1.75rem] bg-[#FFF4DA] p-4 md:p-6 ${sticker} !shadow-[10px_10px_0_0_#6B3410]`}
        >
          <div className="grid gap-6 rounded-[1.2rem] border-[3px] border-dashed border-[#6B3410]/35 p-5 md:grid-cols-[260px_1fr] md:gap-10 md:p-8">
            <div className="relative mx-auto w-full max-w-[260px]">
              <div className="rotate-[-3deg] bg-white p-2 pb-8 shadow-[0_14px_30px_-12px_rgba(107,52,16,0.5)]">
                <Image src={show.cover} alt="" width={520} height={520} className="block h-auto w-full" />
                <p className={`mt-2 text-center ${display} text-sm text-[#6B3410]`}>Episode {String(ep.number).padStart(2, "0")}</p>
              </div>
            </div>
            <div className="relative">
              <div aria-hidden className="absolute -top-2 right-0 hidden md:block">
                <svg viewBox="0 0 120 120" className="absolute -left-20 top-10 h-24 w-24 -rotate-12 opacity-60">
                  <circle cx="60" cy="60" r="44" fill="none" stroke={BROWN} strokeWidth="3" />
                  <circle cx="60" cy="60" r="34" fill="none" stroke={BROWN} strokeWidth="1.5" />
                  <text x="60" y="57" textAnchor="middle" fontSize="8.5" fontWeight="800" letterSpacing="0.5" fill={BROWN}>
                    ORANGE CO.
                  </text>
                  <text x="60" y="70" textAnchor="middle" fontSize="8.5" fontWeight="800" letterSpacing="0.5" fill={BROWN}>
                    CALIFORNIA
                  </text>
                </svg>
                <div className="relative rotate-[8deg] border-[3px] border-dotted border-[#6B3410]/50 bg-[#FFF4DA] p-1.5">
                  <div className="grid h-24 w-20 place-items-center border-2 border-[#FFF4DA] bg-[#FC7F46] outline outline-2 outline-[#6B3410]">
                    <Paw className="h-10 w-10" fill={CREAM} />
                  </div>
                </div>
              </div>
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#FC7F46]">
                Episode {ep.number} · {ep.dateLabel} · {ep.duration}
              </p>
              <h2 className={`!py-0 mt-3 max-w-lg ${display} text-4xl leading-[1.05] text-[#6B3410] md:text-5xl`}>{ep.shortTitle}</h2>
              <p className="mt-5 max-w-xl text-lg font-semibold leading-relaxed text-[#6B3410]/80">{ep.description}</p>
              <button
                onClick={() => player.playIndex(i)}
                className={`mt-8 inline-flex items-center gap-3 rounded-full bg-[#FF6F61] px-7 py-4 text-lg font-extrabold text-[#FFF4DA] ${sticker} transition-transform hover:-translate-y-1`}
              >
                {active && player.playing ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
                {active && player.playing ? "Pause" : "Listen now"}
                {active && <Equalizer color={CREAM} active={player.playing} />}
              </button>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

const TOPICS = [
  { title: "Beaches, trails & patios", text: "Where your dog is actually welcome — sand, dirt, and brunch.", bg: GOLD, art: "beach", alt: "Golden retriever trotting along the beach" },
  { title: "Vet-bill savings", text: "Real strategies that keep care great and costs sane.", bg: "#FFB3A7", art: "vet", alt: "Orange tabby cat beside a piggy bank with a stethoscope" },
  { title: "Training & health", text: "Quick, practical tips for happier, healthier pets.", bg: "#9ED9C6", art: "training", alt: "Golden retriever sitting and watching a tennis ball" },
  { title: "Local intel & events", text: "Adoption days, meetups, and what's happening around OC.", bg: "#FFD08A", art: "local", alt: "Coastal town map with a pin and a paw-print trail" },
];

function Topics() {
  return (
    <section className="px-5 py-24 md:px-8" style={{ background: CREAM }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-[#FC7F46]">Every Thursday</p>
          <h2 className={`!py-0 mt-3 ${display} text-5xl text-[#6B3410] md:text-6xl`}>What we sniff out</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TOPICS.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              className="h-full"
            >
              <div
                className={`group h-full rounded-[1.75rem] p-5 ${sticker} transition-transform duration-300 hover:-translate-y-1 hover:rotate-0`}
                style={{ background: t.bg, rotate: `${[-2, 1.5, -1, 2][i]}deg` }}
              >
                <div className="mb-5 overflow-hidden rounded-2xl border-[3px] border-[#6B3410] bg-[#FFF4DA]">
                  <Image src={`/podcasts/oc-pack/art/${t.art}.webp`} alt={t.alt} width={720} height={720} sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 90vw" className="block h-auto w-full transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className={`!py-0 ${display} text-2xl leading-tight text-[#6B3410]`}>{t.title}</h3>
                <p className="mt-2 font-semibold text-[#6B3410]/80">{t.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function nextThursday() {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  const d = new Date(now);
  d.setDate(now.getDate() + ((4 - now.getDay() + 7) % 7 || 7));
  return d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
}

function Episodes({ show, player }: { show: Show; player: Player }) {
  const [next, setNext] = useState<string | null>(null);
  useEffect(() => setNext(nextThursday()), []);
  const list = [...show.episodes].reverse();
  return (
    <section className="px-5 pb-24 md:px-8" style={{ background: CREAM }}>
      <div className="mx-auto max-w-4xl">
        <h2 className={`!py-0 mb-8 ${display} text-4xl text-[#6B3410]`}>All episodes</h2>
        <ol className="space-y-5">
          {list.map((ep) => {
            const i = show.episodes.indexOf(ep);
            const active = player.index === i;
            return (
              <li key={ep.audio}>
                <button
                  onClick={() => player.playIndex(i)}
                  className={`group flex w-full items-stretch overflow-hidden rounded-[1.5rem] bg-white text-left ${sticker} transition-transform hover:-translate-y-0.5`}
                >
                  <span className="relative grid w-24 shrink-0 place-items-center border-r-[3px] border-dashed border-[#6B3410]/40 bg-[#FEBB55] md:w-32">
                    <span className="text-center">
                      <span className="block text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#6B3410]/70">Ep</span>
                      <span className={`block ${display} text-4xl text-[#6B3410] md:text-5xl`}>{String(ep.number).padStart(2, "0")}</span>
                    </span>
                  </span>
                  <span className="flex flex-1 items-center gap-4 p-5 md:p-6">
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-3">
                        <span className={`${display} text-xl text-[#6B3410] md:text-2xl`}>{ep.shortTitle}</span>
                        {active && <Equalizer color={SUNSET} active={player.playing} />}
                      </span>
                      <span className="mt-1 block text-sm font-bold text-[#6B3410]/55">
                        {ep.dateLabel} · {ep.duration}
                      </span>
                    </span>
                    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border-[3px] border-[#6B3410] ${active ? "bg-[#FC7F46] text-[#FFF4DA]" : "bg-[#FFF4DA] text-[#6B3410] group-hover:bg-[#FC7F46] group-hover:text-[#FFF4DA]"} transition-colors`}>
                      {active && player.playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="ml-0.5 h-5 w-5" />}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
          <li aria-hidden className="flex items-center gap-4 rounded-[1.5rem] border-[3px] border-dashed border-[#6B3410]/35 p-5 md:p-6">
            <Paw className="h-8 w-8 opacity-40" />
            <span className="font-bold text-[#6B3410]/60">
              Next walk drops {next ?? "Thursday"} — subscribe so you don&apos;t miss it.
            </span>
          </li>
        </ol>
      </div>
    </section>
  );
}

function JoinThePack({ show }: { show: Show }) {
  const { copied, copy } = useCopy(show.feedUrl);
  return (
    <section style={{ background: CREAM }}>
      <Waves top={CREAM} />
      <div className="px-5 pb-32 pt-10 text-center md:px-8" style={{ background: TEAL }}>
        <h2 className={`!py-0 ${display} text-5xl text-[#FFF4DA] md:text-7xl`} style={{ textShadow: `4px 4px 0 ${PALM}` }}>
          Join the pack
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg font-semibold text-[#FFF4DA]/90">
          New episodes land every Thursday — pick your favorite way to listen.
        </p>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={SPOTIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-full bg-[#1DB954] px-7 py-4 text-lg font-extrabold text-white ${sticker} transition-transform hover:-translate-y-1`}
          >
            <PlayIcon className="h-5 w-5" />
            Listen on Spotify
          </a>
          <button
            onClick={copy}
            className={`inline-flex items-center gap-2 rounded-full bg-[#FFF4DA] px-7 py-4 text-lg font-extrabold text-[#6B3410] ${sticker} transition-transform hover:-translate-y-1`}
          >
            {copied ? "Feed copied ✓" : "Copy RSS feed"}
          </button>
        </div>
        <p className="mx-auto mt-4 max-w-xl text-sm font-semibold text-[#FFF4DA]/70">
          The RSS feed also works in Apple Podcasts, Overcast, Pocket Casts, and any podcast app.
        </p>

        <div className={`mx-auto mt-12 max-w-2xl rounded-[1.5rem] bg-[#FFF4DA] p-6 text-left md:p-8 ${sticker}`}>
          <h3 className={`!py-0 ${display} text-2xl text-[#6B3410] md:text-3xl`}>Get Thursday&apos;s episode by email 🐶</h3>
          <p className="mt-2 font-semibold text-[#6B3410]/75">One short email per week. Unsubscribe anytime.</p>
          <div className="mt-5">
            <OcPackEmailForm />
          </div>
        </div>

        <p className="mx-auto mt-14 max-w-xl text-base font-bold text-[#FFF4DA]/90">
          Rescue, vet, or pet business in OC?{" "}
          <a href="mailto:hello@thejoydigi.com" className="text-[#FFF4DA] underline decoration-2 underline-offset-4">
            Partner with the pack →
          </a>
        </p>
        <p className="mt-6 text-sm font-bold text-[#FFF4DA]/70">
          A production of{" "}
          <Link href="/" className="text-[#FFF4DA] underline decoration-2 underline-offset-4">
            The Joy Digi
          </Link>
        </p>
      </div>
    </section>
  );
}

function StickyPlayer({ show, player }: { show: Show; player: Player }) {
  const ep = player.current;
  const pct = player.duration ? (player.time / player.duration) * 100 : 0;
  return (
    <AnimatePresence>
      {ep && (
        <motion.div
          initial={{ y: 140 }}
          animate={{ y: 0 }}
          exit={{ y: 140 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className={`fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-[1.75rem] bg-gradient-to-r from-[#FC7F46] via-[#FF6F61] to-[#FC7F46] p-3 text-[#FFF4DA] ${sticker} md:p-4`}
          role="region"
          aria-label="Audio player"
        >
          <div className="flex items-center gap-3">
            <Image src={show.cover} alt="" width={96} height={96} className="h-12 w-12 shrink-0 rounded-full border-[3px] border-[#6B3410]" />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#6B3410]">Episode {ep.number}</p>
              <p className={`truncate ${display} text-lg`}>{ep.shortTitle}</p>
            </div>
            <button onClick={() => player.skip(-15)} aria-label="Back 15 seconds" className="hidden h-10 w-10 place-items-center sm:grid">
              <SkipIcon seconds={15} back className="h-6 w-6" />
            </button>
            <button
              onClick={player.toggle}
              aria-label={player.playing ? "Pause" : "Play"}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-[3px] border-[#6B3410] bg-[#FFF4DA] text-[#6B3410]"
            >
              {player.playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="ml-0.5 h-5 w-5" />}
            </button>
            <button onClick={() => player.skip(30)} aria-label="Forward 30 seconds" className="hidden h-10 w-10 place-items-center sm:grid">
              <SkipIcon seconds={30} className="h-6 w-6" />
            </button>
            <button onClick={player.cycleRate} aria-label="Playback speed" className="w-12 rounded-full border-2 border-[#6B3410] bg-[#FFF4DA]/20 py-1 text-xs font-extrabold tabular-nums">
              {player.rate}×
            </button>
          </div>
          <div className="mt-2.5 flex items-center gap-3 text-[11px] font-bold tabular-nums">
            <span className="w-10 text-right">{fmt(player.time)}</span>
            <div className="relative h-2.5 flex-1 rounded-full border-2 border-[#6B3410] bg-[#FFF4DA]/40">
              <div className="absolute inset-y-0 left-0 rounded-full bg-[#FFF4DA]" style={{ width: `${pct}%` }} />
              <input
                type="range"
                min={0}
                max={player.duration || ep.seconds}
                step={1}
                value={player.time}
                onChange={(e) => player.seek(Number(e.target.value))}
                aria-label="Seek"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </div>
            <span className="w-10">{fmt(player.duration || ep.seconds)}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function OcPack({ show }: { show: Show }) {
  const player = usePlayer(show);
  return (
    <div
      className={`${titan.variable} ${nunito.variable} min-h-screen overflow-x-clip text-[#6B3410] [font-family:var(--oc-body),system-ui,sans-serif] selection:bg-[#FC7F46] selection:text-[#FFF4DA]`}
      style={{ background: SAND }}
    >
      <PodcastSeo
        show={show}
        title="The OC Pack — the podcast for Orange County dog & pet parents"
        description={show.description}
      />
      <Hero show={show} player={player} />
      <Postcard show={show} player={player} />
      <Topics />
      <Episodes show={show} player={player} />
      <JoinThePack show={show} />
      <StickyPlayer show={show} player={player} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => ({ props: { show: getShow("oc-pack") } });
