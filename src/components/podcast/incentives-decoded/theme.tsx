import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";
import { Bricolage_Grotesque, Space_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon, SkipIcon, useCopy } from "@/components/podcast/common";
import { ShareIcon, type ShareControl, type ShareTheme } from "@/components/podcast/share";
import { fmt, type Player } from "@/components/podcast/use-player";
import type { Show } from "@/lib/podcasts";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--id-display", display: "swap" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--id-mono", display: "swap" });

export const INK = "#0E0D12";
export const PAPER = "#F6F4EE";
export const VIOLET = "#5B3DF5";
export const LIME = "#D4FF3A";
export const PINK = "#FF5CA8";
export const ORANGE = "#FF8A3D";
export const CYAN = "#4FE0E8";
export const POP = [LIME, PINK, CYAN, ORANGE];
export const SPRING = { type: "spring", stiffness: 420, damping: 22 } as const;

export const ID_ROOT = `${display.variable} ${mono.variable} min-h-screen overflow-x-clip bg-[#F6F4EE] text-[#0E0D12] [font-family:var(--id-display),system-ui,sans-serif] selection:bg-[#D4FF3A] selection:text-[#0E0D12]`;
export const monoLabel = "[font-family:var(--id-mono),ui-monospace,monospace] text-[11px] font-bold uppercase tracking-[0.18em]";
/** Chunky outlined control with a hard offset shadow that "presses" on click. */
export const chunky = "border-[2.5px] border-[#0E0D12] shadow-[4px_4px_0_#0E0D12] transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#0E0D12] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0_#0E0D12]";
export const dotGrid = { backgroundImage: "radial-gradient(rgba(255,255,255,0.16) 1.2px, transparent 1.2px)", backgroundSize: "22px 22px" };

export const SHARE_THEME: ShareTheme = {
  fontClass: `${display.variable} ${mono.variable}`,
  headingFont: "var(--id-display)",
  bodyFont: "var(--id-display), system-ui, sans-serif",
  panel: "#FFFDF7",
  text: INK,
  muted: "#0E0D12A6",
  border: INK,
  accent: VIOLET,
  onAccent: "#FFFFFF",
  tile: "#F1EEFF",
};

export const pad = (n: number) => String(n).padStart(2, "0");

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789$%#+?";

/** Text that scrambles through random glyphs and resolves left to right: the show's "decoding" signature. */
export function DecodeText({ text, delay = 0, duration = 900, className = "" }: { text: string; delay?: number; duration?: number; className?: string }) {
  const [shown, setShown] = useState(text);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return setShown(text);
    let raf = 0;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const p = Math.max(0, Math.min(1, (now - start) / duration));
      const solved = Math.floor(p * text.length);
      setShown(
        text
          .split("")
          .map((ch, i) => (i < solved || ch === " " || ch === "," ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join("")
      );
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, delay, duration, reduce]);
  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{shown}</span>
    </span>
  );
}

/** Endless ticker strip; pauses on hover so the words can be read. */
export function Marquee({ items, className = "", speed = 60 }: { items: string[]; className?: string; speed?: number }) {
  const x = useMotionValue(0);
  const track = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const reduce = useReducedMotion();
  useAnimationFrame((_, delta) => {
    if (reduce || paused.current || !track.current) return;
    const half = track.current.scrollWidth / 2;
    let next = x.get() - (speed * delta) / 1000;
    if (-next >= half) next += half;
    x.set(next);
  });
  const row = items.map((item, i) => (
    <span key={i} className="flex shrink-0 items-center gap-6 pr-6">
      {item}
      <Spark className="h-4 w-4" />
    </span>
  ));
  return (
    <div className={`overflow-hidden ${className}`} onPointerEnter={() => (paused.current = true)} onPointerLeave={() => (paused.current = false)} aria-hidden>
      <motion.div ref={track} style={{ x }} className="flex w-max whitespace-nowrap">
        {row}
        {row}
      </motion.div>
    </div>
  );
}

export const Spark = ({ className = "", color = "currentColor" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12C7 11 11 7 12 0Z" fill={color} />
  </svg>
);

/** Game-piece stickers: the payoff coin, a die, a pawn and a cursor. */
export function Sticker({ kind, className = "" }: { kind: "coin" | "die" | "pawn" | "cursor" | "star"; className?: string }) {
  const stroke = { stroke: INK, strokeWidth: 5, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      {kind === "coin" && (
        <>
          <circle cx="64" cy="64" r="48" fill={INK} />
          <circle cx="58" cy="58" r="48" fill={LIME} {...stroke} />
          <circle cx="58" cy="58" r="34" fill="none" {...stroke} strokeWidth={3} strokeDasharray="6 7" />
          <text x="58" y="74" textAnchor="middle" fontSize="44" fontWeight="800" fill={INK} fontFamily="var(--id-display), sans-serif">
            +1
          </text>
        </>
      )}
      {kind === "die" && (
        <>
          <rect x="20" y="20" width="88" height="88" rx="20" fill={INK} />
          <rect x="12" y="12" width="88" height="88" rx="20" fill={PINK} {...stroke} />
          {[
            [36, 36],
            [76, 36],
            [56, 56],
            [36, 76],
            [76, 76],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="8" fill={INK} />
          ))}
        </>
      )}
      {kind === "pawn" && (
        <>
          <path d="M66 14a20 20 0 0 1 12 36l8 30h10a6 6 0 0 1 6 6v14H34v-14a6 6 0 0 1 6-6h10l8-30a20 20 0 0 1 8-36Z" fill={INK} transform="translate(6 6)" />
          <path d="M60 14a20 20 0 0 1 12 36l8 30h10a6 6 0 0 1 6 6v14H28v-14a6 6 0 0 1 6-6h10l8-30a20 20 0 0 1 8-36Z" fill={CYAN} {...stroke} />
        </>
      )}
      {kind === "cursor" && (
        <>
          <path d="M28 14l66 40-30 6 18 34-14 7-18-34-22 22Z" fill={INK} transform="translate(5 5)" />
          <path d="M28 14l66 40-30 6 18 34-14 7-18-34-22 22Z" fill="#FFFFFF" {...stroke} />
        </>
      )}
      {kind === "star" && (
        <>
          <path d="M60 8l14 32 34 4-26 23 8 34-30-18-30 18 8-34-26-23 34-4Z" fill={INK} transform="translate(5 5)" />
          <path d="M60 8l14 32 34 4-26 23 8 34-30-18-30 18 8-34-26-23 34-4Z" fill={ORANGE} {...stroke} />
        </>
      )}
    </svg>
  );
}

/** A sticker you can fling around; springs back toward where it was dropped and bobs while idle. */
export function DragSticker({ kind, className, bounds, delay = 0, rotate = 0 }: { kind: Parameters<typeof Sticker>[0]["kind"]; className: string; bounds: React.RefObject<HTMLElement | null>; delay?: number; rotate?: number }) {
  return (
    <motion.div
      drag
      dragConstraints={bounds}
      dragElastic={0.35}
      whileDrag={{ scale: 1.15, rotate: rotate + 12, cursor: "grabbing" }}
      whileHover={{ scale: 1.06 }}
      initial={{ opacity: 0, scale: 0.3, rotate: rotate - 40 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ ...SPRING, delay }}
      className={`absolute z-20 cursor-grab touch-none select-none ${className}`}
    >
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut" }}>
        <Sticker kind={kind} className="h-full w-full drop-shadow-none" />
      </motion.div>
    </motion.div>
  );
}

export function Nav({ onShare, crumbs }: { onShare: () => void; crumbs: React.ReactNode }) {
  return (
    <div className="relative z-30 mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 pt-5 md:px-8">
      {crumbs}
      <div className="flex items-center gap-2">
        <button onClick={onShare} aria-label="Share" className={`inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0E0D12] ${chunky}`}>
          <ShareIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Share</span>
        </button>
        <a href="#follow" className={`rounded-full bg-[#D4FF3A] px-4 py-2 text-sm font-bold text-[#0E0D12] no-underline hover:no-underline ${chunky}`}>
          Follow
        </a>
      </div>
    </div>
  );
}

export function Follow({ show }: { show: Show }) {
  const { copied, copy } = useCopy(show.feedUrl);
  return (
    <section id="follow" className="relative overflow-hidden border-y-[2.5px] border-[#0E0D12] bg-[#D4FF3A] px-4 py-24 md:px-8">
      <Sticker kind="coin" className="absolute -left-6 top-10 hidden h-28 w-28 -rotate-12 md:block" />
      <Sticker kind="star" className="absolute -right-4 bottom-8 hidden h-24 w-24 rotate-12 md:block" />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className={monoLabel}>Don&apos;t miss a level</p>
        <h2 className="!py-0 text-[#0E0D12] mt-4 text-5xl font-extrabold leading-[0.95] tracking-[-0.04em] md:text-7xl">Put it in your queue.</h2>
        <p className="mx-auto mt-5 max-w-lg text-lg font-medium text-[#0E0D12]/75">Add the feed to any podcast app (Apple Podcasts, Overcast, Pocket Casts) and every chapter lands where you already listen.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <button onClick={copy} className={`inline-flex items-center gap-3 rounded-2xl bg-[#0E0D12] px-7 py-4 text-lg font-bold text-[#D4FF3A] ${chunky} shadow-[4px_4px_0_#5B3DF5] hover:shadow-[6px_6px_0_#5B3DF5]`}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={copied ? "y" : "n"} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: 0.18 }}>
                {copied ? "Copied! Paste it in your app ✓" : "Copy the RSS feed"}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
        <p className={`${monoLabel} mt-6 break-all !normal-case !tracking-normal text-[#0E0D12]/60`}>{show.feedUrl}</p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#0E0D12] px-4 pt-12 pb-36 text-center text-[#F6F4EE]/60">
      <p className="text-sm">
        Incentives, Decoded is produced by{" "}
        <Link href="/" className="font-bold text-[#D4FF3A] no-underline hover:underline">
          The Joy Digi
        </Link>
        .
      </p>
    </footer>
  );
}

export function StickyPlayer({ show, player, share }: { show: Show; player: Player; share: ShareControl }) {
  const ep = player.current;
  const pct = player.duration ? (player.time / player.duration) * 100 : 0;
  return (
    <AnimatePresence>
      {ep && (
        <motion.div
          initial={{ y: 140, rotate: 2 }}
          animate={{ y: 0, rotate: 0 }}
          exit={{ y: 140 }}
          transition={SPRING}
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-[22px] border-[2.5px] border-[#0E0D12] bg-white p-3 text-[#0E0D12] shadow-[6px_6px_0_#0E0D12] md:p-3.5"
          role="region"
          aria-label="Audio player"
        >
          <div className="flex items-center gap-3">
            <Image src={show.cover} alt="" width={96} height={96} className="h-12 w-12 shrink-0 rounded-xl border-2 border-[#0E0D12]" />
            <div className="min-w-0 flex-1">
              <p className={`${monoLabel} !text-[10px] text-[#5B3DF5]`}>Level {pad(ep.number)}</p>
              <p className="truncate text-base font-extrabold tracking-[-0.01em]">{ep.shortTitle}</p>
            </div>
            <button onClick={() => player.skip(-15)} aria-label="Back 15 seconds" className="hidden h-10 w-10 place-items-center hover:text-[#5B3DF5] sm:grid">
              <SkipIcon seconds={15} back className="h-6 w-6" />
            </button>
            <motion.button whileTap={{ scale: 0.88 }} onClick={player.toggle} aria-label={player.playing ? "Pause" : "Play"} className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-[2.5px] border-[#0E0D12] bg-[#D4FF3A]">
              {player.playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="ml-0.5 h-5 w-5" />}
            </motion.button>
            <button onClick={() => player.skip(30)} aria-label="Forward 30 seconds" className="hidden h-10 w-10 place-items-center hover:text-[#5B3DF5] sm:grid">
              <SkipIcon seconds={30} className="h-6 w-6" />
            </button>
            <button onClick={() => share.open({ show, episode: ep, time: player.time })} aria-label="Share this chapter" className="grid h-10 w-10 shrink-0 place-items-center hover:text-[#5B3DF5]">
              <ShareIcon className="h-5 w-5" />
            </button>
            <button onClick={player.cycleRate} aria-label="Playback speed" className="w-12 rounded-full border-2 border-[#0E0D12] py-1 text-xs font-bold tabular-nums">
              {player.rate}×
            </button>
          </div>
          <div className="mt-2.5 flex items-center gap-3 text-[11px] font-bold tabular-nums [font-family:var(--id-mono),monospace]">
            <span className="w-10 text-right">{fmt(player.time)}</span>
            <div className="relative h-3 flex-1 overflow-hidden rounded-full border-2 border-[#0E0D12] bg-[#F1EEFF]">
              <div className="absolute inset-y-0 left-0 bg-[#5B3DF5]" style={{ width: `${pct}%` }} />
              <input type="range" min={0} max={player.duration || ep.seconds} step={1} value={player.time} onChange={(e) => player.seek(Number(e.target.value))} aria-label="Seek" className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
            </div>
            <span className="w-10">{fmt(player.duration || ep.seconds)}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** One chapter as a "level" tile: links to its page, with an inline play button. */
export function LevelTile({ show, index, player, current = false, className = "" }: { show: Show; index: number; player: Player; current?: boolean; className?: string }) {
  const ep = show.episodes[index];
  const active = player.index === index;
  const { time, done } = player.progress(index);
  const color = current ? "#FFFFFF" : POP[(index + Math.floor(index / 4)) % POP.length];
  return (
    <Link
      href={`/podcasts/${show.slug}/${ep.number}`}
      aria-current={current ? "page" : undefined}
      className={`group relative flex h-full flex-col rounded-[18px] border-[2.5px] border-[#0E0D12] p-4 text-[#0E0D12] no-underline shadow-[5px_5px_0_#5B3DF5] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:-rotate-1 hover:no-underline hover:shadow-[8px_9px_0_#5B3DF5] ${current ? "ring-4 ring-[#D4FF3A] ring-offset-4 ring-offset-[#0E0D12]" : ""} ${className}`}
      style={{ background: color }}
    >
      <span className="flex items-start justify-between gap-2">
        <span className="leading-none">
          <span className={`${monoLabel} block !text-[10px] opacity-70`}>Level</span>
          <span className="text-5xl font-extrabold tracking-[-0.05em]">{pad(ep.number)}</span>
        </span>
        {current ? (
          <span className={`${monoLabel} rounded-full bg-[#5B3DF5] px-2 py-1 !text-[9px] text-white`}>You are here</span>
        ) : done ? (
          <span className={`${monoLabel} rounded-full bg-[#0E0D12] px-2 py-1 !text-[9px] text-[#D4FF3A]`}>✓ Cleared</span>
        ) : time > 5 ? (
          <span className={`${monoLabel} rounded-full border-2 border-[#0E0D12] bg-white px-2 py-0.5 !text-[9px]`}>{Math.max(1, Math.round((ep.seconds - time) / 60))}m left</span>
        ) : null}
      </span>
      <span className="mt-6 text-lg font-extrabold leading-[1.1] tracking-[-0.02em]">{ep.shortTitle}</span>
      <span className="mt-auto flex items-center justify-between pt-4">
        <span className={`${monoLabel} !text-[10px] opacity-70`}>{ep.duration}</span>
        <motion.button
          type="button"
          whileTap={{ scale: 0.85 }}
          aria-label={active && player.playing ? `Pause ${ep.shortTitle}` : `Play ${ep.shortTitle}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            player.playIndex(index);
          }}
          className="grid h-10 w-10 place-items-center rounded-full bg-[#0E0D12] text-[#D4FF3A] transition-transform group-hover:scale-110"
        >
          {active && player.playing ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="ml-0.5 h-4 w-4" />}
        </motion.button>
      </span>
    </Link>
  );
}
