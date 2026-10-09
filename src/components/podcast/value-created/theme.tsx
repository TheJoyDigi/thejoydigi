import { AnimatePresence, motion } from "framer-motion";
import { Cinzel, Cormorant_Garamond, DM_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { PauseIcon, PlayIcon, SkipIcon, useCopy } from "@/components/podcast/common";
import { EmailSignupForm } from "@/components/podcast/email-signup-form";
import { ShareIcon, type ShareControl, type ShareTheme } from "@/components/podcast/share";
import { fmt, type Player } from "@/components/podcast/use-player";
import type { Show } from "@/lib/podcasts";

const cinzel = Cinzel({ subsets: ["latin"], variable: "--vc-display", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--vc-serif",
  display: "swap",
});
const sans = DM_Sans({ subsets: ["latin"], variable: "--vc-sans", display: "swap" });

export const VC_ROOT = `${cinzel.variable} ${cormorant.variable} ${sans.variable} min-h-screen bg-[#0C1130] text-[#F4EEDD] [font-family:var(--vc-sans),system-ui,sans-serif] selection:bg-[#F2A81D] selection:text-[#0C1130]`;

export const SHARE_THEME: ShareTheme = {
  fontClass: `${cormorant.variable} ${sans.variable}`,
  headingFont: "var(--vc-serif)",
  bodyFont: "var(--vc-sans), system-ui, sans-serif",
  panel: "#0B1330",
  text: "#F4EEDD",
  muted: "#F4EEDD99",
  border: "rgba(242,168,29,0.3)",
  accent: "#FFD47E",
  onAccent: "#0C1130",
  tile: "rgba(242,168,29,0.1)",
};

export const GOLD = "#F2A81D";
export const GOLD_LIGHT = "#FFD47E";
export const GOLD_DEEP = "#9A6B1E";
const DROP = "#57B6D9";
export const EASE = [0.22, 1, 0.36, 1] as const;
export const PARTS = ["Seeing Value", "Creating Value", "Capturing Value", "Exchanging and Scaling", "Mastery"];
// First chapter of each part, from podcast/shows/value-created/curriculum.md.
const PART_STARTS = [1, 6, 15, 21, 28];

export const partOf = (chapter: number) => PART_STARTS.filter((start) => chapter >= start).length - 1;

export const SPOTIFY_URL = "https://open.spotify.com/show/3ZKCjfSrrsJ1W3kJRn9qXk";
export const YOUTUBE_URL = "https://www.youtube.com/playlist?list=PLN6TtRixtU8E";

export const totalChapters = (show: Show) => Number(show.description.match(/(\d+)-chapter/)?.[1] ?? show.episodes.length);

export const roman = (n: number) => {
  let out = "";
  for (const [v, sym] of [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]] as [number, string][]) {
    while (n >= v) {
      out += sym;
      n -= v;
    }
  }
  return out;
};

export const goldText = {
  backgroundImage: `linear-gradient(180deg, ${GOLD_LIGHT} 0%, ${GOLD} 55%, ${GOLD_DEEP} 100%)`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;

export function GoldMotes() {
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

/** Diamond-over-drop motif echoing the show cover: the paradox that opens the book. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 260" className={className} aria-hidden>
      <path d="M100 8 L172 84 L100 160 L28 84 Z" fill={GOLD} />
      <path
        d="M100 172 C100 172 58 218 58 244 a42 42 0 0 0 84 0 C142 218 100 172 100 172 Z"
        fill={DROP}
        opacity="0.9"
      />
    </svg>
  );
}

export function Subscribe({ show }: { show: Show }) {
  const { copied, copy } = useCopy(show.feedUrl);
  return (
    <section id="subscribe" className="relative px-5 py-28 md:px-8">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(242,168,29,0.18),transparent_60%)]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-4 font-[family-name:var(--vc-display)] text-xs tracking-[0.35em] text-[#F2A81D]">Listen anywhere</p>
        <h2 className="!py-0 font-[family-name:var(--vc-serif)] text-4xl md:text-6xl font-medium text-[#F4EEDD]">
          Take the book <em className="text-[#FFD47E]">on the go.</em>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[#F4EEDD]/60">
          New chapters on the way — follow on Spotify, watch on YouTube, or add the feed to any podcast app.
        </p>
        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center gap-3 sm:flex-row">
          {SPOTIFY_URL ? (
            <a
              href={SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-b from-[#FFD47E] to-[#D1941F] px-7 py-4 font-semibold text-[#0C1130] shadow-[0_0_40px_-6px_rgba(242,168,29,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <PlayIcon className="h-5 w-5" />
              Listen on Spotify
            </a>
          ) : (
            <span className="inline-flex items-center justify-center gap-3 rounded-full border border-[#F2A81D]/40 px-7 py-4 font-semibold text-[#FFD47E]/70">
              Coming soon to Spotify
            </span>
          )}
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#FF0000] px-7 py-4 font-semibold text-white shadow-[0_0_40px_-6px_rgba(255,0,0,0.55)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <PlayIcon className="h-5 w-5" />
            Watch on YouTube
          </a>
          <button
            onClick={copy}
            className="inline-flex items-center justify-center gap-3 rounded-full border border-[#F2A81D]/50 px-7 py-4 font-semibold text-[#FFD47E] transition-colors hover:border-[#F2A81D] hover:bg-[#F2A81D]/10"
          >
            {copied ? "Copied ✓" : "Copy RSS feed"}
          </button>
        </div>
        <p className="mx-auto mt-4 max-w-xl text-sm text-[#F4EEDD]/45">
          The RSS feed also works in Apple Podcasts, Overcast, Pocket Casts, and any podcast app.
        </p>

        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-[#F2A81D]/30 bg-[#0B1330]/70 p-6 text-left md:p-8">
          <h3 className="!py-0 font-[family-name:var(--vc-serif)] text-2xl md:text-3xl font-medium text-[#FFD47E]">
            The book is complete. Get the next one first.
          </h3>
          <p className="mt-2 text-[#F4EEDD]/60">All 32 chapters are live. Join The Joy Digi list to hear first about new books and shows. Unsubscribe anytime.</p>
          <div className="mt-5">
            <EmailSignupForm interest="value-created" tone="dark" buttonLabel="Get the next one first" successMessage="You're on the list! You'll be first to hear about the next book." />
          </div>
        </div>
      </div>
    </section>
  );
}

export function StickyPlayer({ show, player, share, total }: { show: Show; player: Player; share: ShareControl; total?: number }) {
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
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-4xl rounded-2xl border border-[#F2A81D]/35 bg-[#0B1330]/85 p-3 text-[#F4EEDD] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl md:p-4"
          role="region"
          aria-label="Audio player"
        >
          <div className="flex items-center gap-3 md:gap-4">
            <Image src={show.cover} alt="" width={96} height={96} className="h-12 w-12 shrink-0 rounded-md border border-[#F2A81D]/40" />
            <div className="min-w-0 flex-1">
              <p className="font-[family-name:var(--vc-display)] text-[10px] tracking-[0.3em] text-[#F2A81D]">
                Chapter {roman(ep.number)}
                {total ? ` of ${roman(total)}` : ""}
              </p>
              <p className="truncate font-[family-name:var(--vc-serif)] text-lg">{ep.shortTitle}</p>
            </div>
            <button onClick={() => player.skip(-15)} aria-label="Back 15 seconds" className="hidden h-10 w-10 place-items-center text-[#F4EEDD]/70 hover:text-[#FFD47E] sm:grid">
              <SkipIcon seconds={15} back className="h-6 w-6" />
            </button>
            <button
              onClick={player.toggle}
              aria-label={player.playing ? "Pause" : "Play"}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#FFD47E] to-[#D1941F] text-[#0C1130]"
            >
              {player.playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="ml-0.5 h-5 w-5" />}
            </button>
            <button onClick={() => player.skip(30)} aria-label="Forward 30 seconds" className="hidden h-10 w-10 place-items-center text-[#F4EEDD]/70 hover:text-[#FFD47E] sm:grid">
              <SkipIcon seconds={30} className="h-6 w-6" />
            </button>
            <button
              onClick={() => share.open({ show, episode: ep, time: player.time })}
              aria-label="Share this episode"
              className="grid h-10 w-10 shrink-0 place-items-center text-[#F4EEDD]/70 hover:text-[#FFD47E]"
            >
              <ShareIcon className="h-5 w-5" />
            </button>
            <button onClick={player.cycleRate} aria-label="Playback speed" className="w-12 rounded-full border border-[#F2A81D]/40 py-1.5 text-xs font-semibold tabular-nums text-[#FFD47E]">
              {player.rate}×
            </button>
          </div>
          <div className="mt-3 flex items-center gap-3 text-[11px] tabular-nums text-[#F4EEDD]/55">
            <span className="w-10 text-right">{fmt(player.time)}</span>
            <div className="relative h-1.5 flex-1 rounded-full bg-[#F2A81D]/15">
              <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#D1941F] to-[#FFD47E]" style={{ width: `${pct}%` }} />
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

export function Footer() {
  return (
    <footer className="border-t border-[#F2A81D]/15 px-5 pt-10 pb-32 text-center text-sm text-[#F4EEDD]/45">
      A production of{" "}
      <Link href="/" className="text-[#FFD47E] no-underline hover:underline">
        The Joy Digi
      </Link>
    </footer>
  );
}
