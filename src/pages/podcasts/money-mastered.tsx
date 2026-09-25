import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { GetStaticProps } from "next";
import { Cinzel, Cormorant_Garamond, DM_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Equalizer, PauseIcon, PlayIcon, PodcastSeo, SkipIcon, useCopy } from "@/components/podcast/common";
import { fmt, usePlayer, type Player } from "@/components/podcast/use-player";
import { getShow, type Show } from "@/lib/podcasts";

const cinzel = Cinzel({ subsets: ["latin"], variable: "--mm-display", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--mm-serif",
  display: "swap",
});
const sans = DM_Sans({ subsets: ["latin"], variable: "--mm-sans", display: "swap" });

const GOLD = "#D9B56A";
const GOLD_LIGHT = "#F3DE9E";
const NIGHT = "#060E1A";
const EASE = [0.22, 1, 0.36, 1] as const;
const SUBJECTS = ["Macroeconomics", "Money", "Investing", "Trading", "Bitcoin"];

const roman = (n: number) => {
  let out = "";
  for (const [v, sym] of [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]] as [number, string][]) {
    while (n >= v) {
      out += sym;
      n -= v;
    }
  }
  return out;
};

const goldText = {
  backgroundImage: `linear-gradient(180deg, ${GOLD_LIGHT} 0%, ${GOLD} 55%, #9F7A3A 100%)`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;

function GoldDust() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const motes = Array.from({ length: Math.round(Math.min(70, w / 18)) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.4,
      vy: -(Math.random() * 0.22 + 0.06),
      vx: (Math.random() - 0.5) * 0.1,
      a: Math.random() * 0.55 + 0.2,
      t: Math.random() * Math.PI * 2,
    }));
    let raf = 0;
    let visible = true;
    const tick = () => {
      raf = 0;
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = GOLD_LIGHT;
      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;
        m.t += 0.02;
        if (m.y < -4) {
          m.y = h + 4;
          m.x = Math.random() * w;
        }
        ctx.globalAlpha = m.a * (0.6 + 0.4 * Math.sin(m.t));
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);
  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}

function Panorama() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 120]);
  return (
    <motion.div aria-hidden style={{ y }} className="absolute inset-0 -z-10">
      <Image src="/podcasts/money-mastered/art/panorama.webp" alt="" fill priority sizes="100vw" className="object-cover object-[center_78%]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,14,26,0.55)_0%,rgba(6,14,26,0.1)_45%,rgba(6,14,26,0)_70%,#060E1A_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,14,26,0.8)_0%,rgba(6,14,26,0.35)_45%,transparent_75%)]" />
    </motion.div>
  );
}

function Hero({ show, player, total }: { show: Show; player: Player; total: number }) {
  const latest = show.episodes[show.episodes.length - 1];
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <Panorama />
      <GoldDust />

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 pt-6 md:px-8">
        <Link href="/" className="text-sm tracking-[0.2em] text-[#EFE6D2]/70 uppercase no-underline hover:text-[#F3DE9E] hover:no-underline">
          ← The Joy Digi
        </Link>
        <a href="#subscribe" className="rounded-full border border-[#D9B56A]/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#F3DE9E] no-underline hover:border-[#D9B56A] hover:no-underline">
          Subscribe
        </a>
      </nav>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pt-10 pb-40 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:pt-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="mb-6 font-[family-name:var(--mm-display)] text-xs md:text-sm tracking-[0.35em] text-[#D9B56A]"
          >
            An audiobook in {total} chapters
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
            className="!py-0 font-[family-name:var(--mm-display)] text-[3.3rem] leading-[0.95] font-semibold sm:text-7xl lg:text-[6.2rem]"
            style={goldText}
          >
            Money,
            <br />
            Mastered
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.5 }}
            className="mt-8 max-w-xl font-[family-name:var(--mm-serif)] text-2xl md:text-[1.75rem] leading-snug italic text-[#EFE6D2]/90"
          >
            From zero to mastery in macroeconomics, money, investing, trading, and Bitcoin.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-4 text-sm tracking-wide text-[#EFE6D2]/55"
          >
            Written by {show.author} · Voiced by Alex &amp; Jordan
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.8 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <button
              onClick={() => player.playIndex(0)}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-b from-[#F3DE9E] to-[#C9A45C] px-7 py-4 font-semibold text-[#060E1A] shadow-[0_0_40px_-6px_rgba(217,181,106,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {player.index === 0 && player.playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
              Begin Chapter I
            </button>
            {latest && latest.number !== 1 && (
              <button
                onClick={() => player.playIndex(show.episodes.length - 1)}
                className="inline-flex items-center justify-center gap-3 rounded-full border border-[#D9B56A]/50 px-7 py-4 font-semibold text-[#F3DE9E] transition-colors hover:border-[#D9B56A] hover:bg-[#D9B56A]/10"
              >
                Latest · Chapter {roman(latest.number)}
              </button>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[460px]"
        >
          <div aria-hidden className="absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,rgba(217,181,106,0.35),transparent)] blur-2xl" />
          <div className="relative rotate-[1.5deg] rounded-[6px] border border-[#D9B56A]/60 p-2.5 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)]">
            <div className="rounded-[3px] border border-[#D9B56A]/30 p-1.5">
              <Image src={show.cover} alt="Money, Mastered cover art" width={920} height={920} priority sizes="(min-width: 1024px) 440px, 88vw" className="block h-auto w-full rounded-[2px]" />
            </div>
          </div>
          <p className="mt-6 text-center">
            <span className="inline-block rounded-full border border-[#D9B56A]/30 bg-[#060E1A]/70 px-5 py-2 font-[family-name:var(--mm-display)] text-xs tracking-[0.3em] text-[#F3DE9E] backdrop-blur">
              Chapter {roman(show.episodes.length)} of {roman(total)} now available
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Ledger({ show, player, total }: { show: Show; player: Player; total: number }) {
  const released = show.episodes.length;
  return (
    <section className="relative border-t border-[#D9B56A]/15 px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 font-[family-name:var(--mm-display)] text-xs tracking-[0.35em] text-[#D9B56A]">The Ledger</p>
            <h2 className="!py-0 font-[family-name:var(--mm-serif)] text-4xl md:text-6xl font-medium leading-none text-[#EFE6D2]">
              {released} of {total} chapters <em className="text-[#F3DE9E]">minted.</em>
            </h2>
          </div>
          <p className="max-w-sm text-[#EFE6D2]/60">Each coin is a chapter. Gold ones are ready to play — tap one to start there.</p>
        </div>
        <div className="grid grid-cols-6 gap-3 sm:grid-cols-9 md:grid-cols-12 md:gap-4">
          {Array.from({ length: total }, (_, i) => {
            const ep = show.episodes[i];
            const active = player.index === i;
            return ep ? (
              <motion.button
                key={i}
                onClick={() => player.playIndex(i)}
                title={ep.title}
                aria-label={`Play ${ep.title}`}
                initial={{ opacity: 0, rotateY: 90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.06 }}
                className={`relative grid aspect-square place-items-center rounded-full font-[family-name:var(--mm-display)] text-sm font-semibold text-[#3A2A0E] transition-transform duration-300 hover:-translate-y-1 ${
                  active ? "ring-2 ring-[#F3DE9E] ring-offset-4 ring-offset-[#060E1A]" : ""
                }`}
                style={{
                  background: "radial-gradient(circle at 35% 30%, #FFF1C4, #D9B56A 45%, #8C6A2E 100%)",
                  boxShadow: "inset 0 0 0 3px rgba(140,106,46,0.55), 0 10px 25px -10px rgba(217,181,106,0.6)",
                }}
              >
                {roman(i + 1)}
              </motion.button>
            ) : (
              <span
                key={i}
                aria-hidden
                className="grid aspect-square place-items-center rounded-full border border-dashed border-[#D9B56A]/30 font-[family-name:var(--mm-display)] text-[11px] text-[#D9B56A]/45"
              >
                {roman(i + 1)}
              </span>
            );
          })}
        </div>
        <div className="mt-10 h-px w-full bg-[#D9B56A]/15">
          <motion.div
            className="h-px bg-gradient-to-r from-[#F3DE9E] to-[#D9B56A]"
            initial={{ width: 0 }}
            whileInView={{ width: `${(released / total) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: EASE }}
          />
        </div>
      </div>
    </section>
  );
}

function Contents({ show, player }: { show: Show; player: Player }) {
  const latest = show.episodes.length - 1;
  return (
    <section className="relative px-5 py-24 md:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-center font-[family-name:var(--mm-display)] text-xs tracking-[0.35em] text-[#D9B56A]">Contents</p>
        <h2 className="!py-0 mb-16 text-center font-[family-name:var(--mm-serif)] text-4xl md:text-6xl font-medium text-[#EFE6D2]">
          Read the table. <em className="text-[#F3DE9E]">Press play.</em>
        </h2>
        <ol className="border-t border-[#D9B56A]/20">
          {show.episodes.map((ep, i) => {
            const active = player.index === i;
            return (
              <motion.li
                key={ep.audio}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, ease: EASE }}
                className="border-b border-[#D9B56A]/20"
              >
                <button
                  onClick={() => player.playIndex(i)}
                  className={`group grid w-full grid-cols-[3.2rem_1fr_auto] items-center gap-4 px-2 py-7 text-left transition-colors md:grid-cols-[5rem_1fr_auto_auto] md:gap-8 md:px-4 ${
                    active ? "bg-[#D9B56A]/[0.07]" : "hover:bg-[#D9B56A]/[0.04]"
                  }`}
                >
                  <span className="font-[family-name:var(--mm-display)] text-2xl md:text-4xl font-semibold" style={goldText}>
                    {roman(ep.number)}
                  </span>
                  <span>
                    <span className="flex flex-wrap items-center gap-3">
                      <span className="font-[family-name:var(--mm-serif)] text-2xl md:text-3xl font-medium text-[#EFE6D2] group-hover:text-[#F3DE9E] transition-colors">
                        {ep.shortTitle}
                      </span>
                      {i === latest && (
                        <span className="rounded-full border border-[#D9B56A]/50 px-2.5 py-0.5 font-[family-name:var(--mm-display)] text-[10px] tracking-[0.25em] text-[#F3DE9E]">
                          New
                        </span>
                      )}
                      {active && <Equalizer color={GOLD_LIGHT} active={player.playing} />}
                    </span>
                    <span className="mt-2 block font-[family-name:var(--mm-serif)] text-lg italic leading-snug text-[#EFE6D2]/60">{ep.description}</span>
                  </span>
                  <span className="hidden text-sm tabular-nums text-[#EFE6D2]/50 md:block">{ep.duration}</span>
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-full border transition-all duration-300 ${
                      active ? "border-[#F3DE9E] bg-[#F3DE9E] text-[#060E1A]" : "border-[#D9B56A]/50 text-[#F3DE9E] group-hover:border-[#F3DE9E] group-hover:bg-[#F3DE9E] group-hover:text-[#060E1A]"
                    }`}
                  >
                    {active && player.playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="ml-0.5 h-5 w-5" />}
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Path() {
  return (
    <section className="relative overflow-hidden border-y border-[#D9B56A]/15 bg-[#081424] px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 font-[family-name:var(--mm-display)] text-xs tracking-[0.35em] text-[#D9B56A]">The Path</p>
        <h2 className="!py-0 mb-16 max-w-3xl font-[family-name:var(--mm-serif)] text-4xl md:text-6xl font-medium leading-[1.05] text-[#EFE6D2]">
          Five disciplines, <em className="text-[#F3DE9E]">one arc</em> — from zero to mastery.
        </h2>
        <ol className="relative grid gap-5 md:grid-cols-5">
          <div aria-hidden className="absolute left-0 right-0 top-[2.1rem] hidden h-px bg-gradient-to-r from-transparent via-[#D9B56A]/50 to-transparent md:block" />
          {SUBJECTS.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.12 }}
              className="relative flex items-center gap-4 md:flex-col md:items-start md:gap-6"
            >
              <span className="relative grid h-[4.2rem] w-[4.2rem] shrink-0 place-items-center rounded-full border border-[#D9B56A]/60 bg-[#060E1A] font-[family-name:var(--mm-display)] text-lg text-[#F3DE9E]">
                {roman(i + 1)}
              </span>
              <span className="font-[family-name:var(--mm-serif)] text-3xl text-[#EFE6D2]">{s}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Subscribe({ show }: { show: Show }) {
  const { copied, copy } = useCopy(show.feedUrl);
  return (
    <section id="subscribe" className="relative px-5 py-28 md:px-8">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(217,181,106,0.18),transparent_60%)]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-4 font-[family-name:var(--mm-display)] text-xs tracking-[0.35em] text-[#D9B56A]">Listen anywhere</p>
        <h2 className="!py-0 font-[family-name:var(--mm-serif)] text-4xl md:text-6xl font-medium text-[#EFE6D2]">
          Take the course <em className="text-[#F3DE9E]">on the go.</em>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[#EFE6D2]/60">
          Add the feed to Apple Podcasts, Overcast, Pocket Casts, or any podcast app — new chapters arrive automatically.
        </p>
        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-stretch gap-3 rounded-2xl border border-[#D9B56A]/30 bg-[#0B1B2E]/70 p-2 sm:flex-row sm:items-center">
          <code className="flex-1 truncate px-4 py-3 text-left text-sm text-[#EFE6D2]/80">{show.feedUrl}</code>
          <button
            onClick={copy}
            className="rounded-xl bg-gradient-to-b from-[#F3DE9E] to-[#C9A45C] px-6 py-3 text-sm font-semibold text-[#060E1A]"
          >
            {copied ? "Copied ✓" : "Copy RSS feed"}
          </button>
        </div>
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
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-4xl rounded-2xl border border-[#D9B56A]/35 bg-[#0B1B2E]/85 p-3 text-[#EFE6D2] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl md:p-4"
          role="region"
          aria-label="Audio player"
        >
          <div className="flex items-center gap-3 md:gap-4">
            <Image src={show.cover} alt="" width={96} height={96} className="h-12 w-12 shrink-0 rounded-md border border-[#D9B56A]/40" />
            <div className="min-w-0 flex-1">
              <p className="font-[family-name:var(--mm-display)] text-[10px] tracking-[0.3em] text-[#D9B56A]">Chapter {roman(ep.number)}</p>
              <p className="truncate font-[family-name:var(--mm-serif)] text-lg">{ep.shortTitle}</p>
            </div>
            <button onClick={() => player.skip(-15)} aria-label="Back 15 seconds" className="hidden h-10 w-10 place-items-center text-[#EFE6D2]/70 hover:text-[#F3DE9E] sm:grid">
              <SkipIcon seconds={15} back className="h-6 w-6" />
            </button>
            <button
              onClick={player.toggle}
              aria-label={player.playing ? "Pause" : "Play"}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#F3DE9E] to-[#C9A45C] text-[#060E1A]"
            >
              {player.playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="ml-0.5 h-5 w-5" />}
            </button>
            <button onClick={() => player.skip(30)} aria-label="Forward 30 seconds" className="hidden h-10 w-10 place-items-center text-[#EFE6D2]/70 hover:text-[#F3DE9E] sm:grid">
              <SkipIcon seconds={30} className="h-6 w-6" />
            </button>
            <button onClick={player.cycleRate} aria-label="Playback speed" className="w-12 rounded-full border border-[#D9B56A]/40 py-1.5 text-xs font-semibold tabular-nums text-[#F3DE9E]">
              {player.rate}×
            </button>
          </div>
          <div className="mt-3 flex items-center gap-3 text-[11px] tabular-nums text-[#EFE6D2]/55">
            <span className="w-10 text-right">{fmt(player.time)}</span>
            <div className="relative h-1.5 flex-1 rounded-full bg-[#D9B56A]/15">
              <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#C9A45C] to-[#F3DE9E]" style={{ width: `${pct}%` }} />
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

export default function MoneyMastered({ show }: { show: Show }) {
  const player = usePlayer(show);
  const total = Number(show.description.match(/(\d+)-chapter/)?.[1] ?? show.episodes.length);
  return (
    <div
      className={`${cinzel.variable} ${cormorant.variable} ${sans.variable} min-h-screen bg-[#060E1A] text-[#EFE6D2] [font-family:var(--mm-sans),system-ui,sans-serif] selection:bg-[#D9B56A] selection:text-[#060E1A]`}
    >
      <PodcastSeo
        show={show}
        title="Money, Mastered — an audiobook podcast on money, investing & Bitcoin"
        description={show.description}
      />
      <Hero show={show} player={player} total={total} />
      <Ledger show={show} player={player} total={total} />
      <Contents show={show} player={player} />
      <Path />
      <Subscribe show={show} />
      <footer className="border-t border-[#D9B56A]/15 px-5 pt-10 pb-32 text-center text-sm text-[#EFE6D2]/45">
        A production of{" "}
        <Link href="/" className="text-[#F3DE9E] no-underline hover:underline">
          The Joy Digi
        </Link>
      </footer>
      <StickyPlayer show={show} player={player} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => ({ props: { show: getShow("money-mastered") } });
