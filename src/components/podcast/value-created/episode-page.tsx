import { AnimatePresence, motion, MotionConfig, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, type PointerEvent } from "react";
import { episodePath, Equalizer, fmtLeft, ListenProgress, PauseIcon, PlatformLinks, PlayIcon, PodcastSeo } from "@/components/podcast/common";
import { EmailSignupForm } from "@/components/podcast/email-signup-form";
import { EpisodeTranscript } from "@/components/podcast/episode-transcript";
import { ShareIcon, ShareSheet, useShare, type ShareControl } from "@/components/podcast/share";
import { fmt, usePlayer, type Player } from "@/components/podcast/use-player";
import type { Episode, Show } from "@/lib/podcasts";
import { EASE, Footer, GOLD_LIGHT, GoldMotes, goldText, Mark, PARTS, partOf, roman, SHARE_THEME, SPOTIFY_URL, StickyPlayer, Subscribe, totalChapters, VC_ROOT, YOUTUBE_URL } from "./theme";

const SHOW_PATH = "/podcasts/value-created";
const eyebrow = "font-[family-name:var(--vc-display)] text-xs tracking-[0.35em] text-[#F2A81D]";
const ghostButton =
  "inline-flex items-center justify-center gap-2 rounded-full border border-[#F2A81D]/45 px-6 py-3.5 font-semibold text-[#FFD47E] no-underline transition-colors hover:border-[#F2A81D] hover:bg-[#F2A81D]/10 hover:no-underline";
const coin = {
  background: "radial-gradient(circle at 35% 30%, #FFE9B8, #F2A81D 45%, #8C6A2E 100%)",
  boxShadow: "inset 0 0 0 3px rgba(140,106,46,0.55), 0 18px 40px -12px rgba(242,168,29,0.7)",
};

type Props = { show: Show; index: number; player: Player };

function ChapterNav({ show, ep, share }: { show: Show; ep: Episode; share: ShareControl }) {
  return (
    <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 pt-6 md:px-8">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#F4EEDD]/60">
          <li className="hidden sm:block">
            <Link href="/" className="text-inherit no-underline hover:text-[#FFD47E] hover:no-underline">
              The Joy Digi
            </Link>
          </li>
          <li aria-hidden className="hidden text-[#F2A81D]/50 sm:block">
            /
          </li>
          <li>
            <Link href={SHOW_PATH} className="text-inherit no-underline hover:text-[#FFD47E] hover:no-underline">
              <span className="sm:hidden">← </span>Value, Created
            </Link>
          </li>
          <li aria-hidden className="hidden text-[#F2A81D]/50 sm:block">
            /
          </li>
          <li className="hidden text-[#FFD47E] sm:block" aria-current="page">
            Chapter {roman(ep.number)}
          </li>
        </ol>
      </nav>
      <div className="flex items-center gap-2">
        <button
          onClick={() => share.open({ show, episode: ep })}
          aria-label="Share this chapter"
          className="inline-flex items-center gap-2 rounded-full border border-[#F2A81D]/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#FFD47E] hover:border-[#F2A81D]"
        >
          <ShareIcon className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Share</span>
        </button>
        <a href="#subscribe" className="rounded-full border border-[#F2A81D]/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#FFD47E] no-underline hover:border-[#F2A81D] hover:no-underline">
          Subscribe
        </a>
      </div>
    </div>
  );
}

/** The hero's primary action: a gold orb whose ring fills as the chapter plays. */
function PlayOrb({ show, index, player }: Props) {
  const ep = show.episodes[index];
  const playing = player.index === index && player.playing;
  const { time, done } = player.progress(index);
  const started = time > 5 && !done;
  const pct = Math.min(1, time / ep.seconds);
  const label = playing ? "Pause" : started ? "Resume chapter" : done ? "Play again" : "Play chapter";
  const sub = playing ? `${fmt(time)} / ${ep.duration}` : started ? fmtLeft(ep.seconds - time) : `${ep.duration} listen`;
  return (
    <button onClick={() => player.playIndex(index)} className="group flex items-center gap-5 text-left" aria-label={`${label}: ${ep.shortTitle}`}>
      <span className="relative grid h-[84px] w-[84px] shrink-0 place-items-center">
        {!playing &&
          [0, 1.2].map((delay) => (
            <motion.span
              key={delay}
              aria-hidden
              className="absolute inset-[10px] rounded-full border border-[#FFD47E]"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 1.75], opacity: [0.55, 0] }}
              transition={{ duration: 2.4, delay, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
        <svg viewBox="0 0 84 84" className="absolute inset-0 -rotate-90" aria-hidden>
          <circle cx="42" cy="42" r="40" fill="none" stroke="rgba(242,168,29,0.2)" strokeWidth="2" />
          <motion.circle
            cx="42"
            cy="42"
            r="40"
            fill="none"
            stroke={GOLD_LIGHT}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: pct, opacity: pct > 0 ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "linear" }}
          />
        </svg>
        <span className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-b from-[#FFD47E] to-[#D1941F] text-[#0C1130] shadow-[0_0_50px_-6px_rgba(242,168,29,0.8)] transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={playing ? "pause" : "play"}
              initial={{ scale: 0.4, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.4, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              {playing ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="ml-1 h-6 w-6" />}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
      <span>
        <span className="flex items-center gap-3 text-xl font-semibold text-[#F4EEDD] transition-colors group-hover:text-[#FFD47E]">
          {label}
          {playing && <Equalizer color={GOLD_LIGHT} active />}
        </span>
        <span className="mt-0.5 block text-sm tabular-nums text-[#F4EEDD]/55">{sub}</span>
      </span>
    </button>
  );
}

/** Cover that tilts toward the pointer, with the chapter coin floating in front. */
function TiltCover({ show, ep }: { show: Show; ep: Episode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 140, damping: 18 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [9, -9]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-11, 11]), spring);
  const glare = useTransform([x, y] as MotionValue<number>[], ([gx, gy]: number[]) => `radial-gradient(circle at ${(gx + 0.5) * 100}% ${(gy + 0.5) * 100}%, rgba(255,233,184,0.28), transparent 55%)`);
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.5, ease: EASE, delay: 0.3 }}
      className="relative mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[400px]"
      style={{ perspective: 1100 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <div aria-hidden className="absolute -inset-12 rounded-full bg-[radial-gradient(closest-side,rgba(242,168,29,0.32),transparent)] blur-2xl" />
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">
        <div className="relative rounded-[6px] border border-[#F2A81D]/60 p-2.5 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)]">
          <div className="relative overflow-hidden rounded-[3px] border border-[#F2A81D]/30 p-1.5">
            <Image src={show.cover} alt="Value, Created cover art: a gold diamond above a water drop" width={920} height={920} priority sizes="(min-width: 1024px) 400px, 300px" className="block h-auto w-full rounded-[2px]" />
            <motion.div aria-hidden style={{ backgroundImage: glare }} className="pointer-events-none absolute inset-0 mix-blend-screen" />
          </div>
        </div>
        <motion.div
          initial={{ rotateY: 180, opacity: 0, scale: 0.6 }}
          animate={{ rotateY: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 1 }}
          style={{ ...coin, transform: "translateZ(60px)" }}
          className="absolute -bottom-7 -left-5 grid h-24 w-24 place-items-center rounded-full font-[family-name:var(--vc-display)] text-2xl font-semibold text-[#3A2A0E] sm:h-28 sm:w-28 sm:text-3xl"
          aria-hidden
        >
          {roman(ep.number)}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/** Every chapter as a segment, grouped by part: where you are, what you've played, what's ahead. */
function JourneyBar({ show, index, player, total }: Props & { total: number }) {
  const played = show.episodes.filter((_, i) => player.progress(i).done).length;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.1 }}>
      <div className="mb-4 flex items-end justify-between gap-4 text-[11px] uppercase tracking-[0.25em] text-[#F4EEDD]/55">
        <span>Your path through the book</span>
        <span className="tabular-nums">
          {played > 0 ? `${played} of ${total} played` : `${roman(show.episodes[index].number)} of ${roman(total)}`}
        </span>
      </div>
      <div className="flex h-10 items-end">
        {Array.from({ length: total }, (_, i) => {
          const ep = show.episodes[i];
          const current = i === index;
          const newPart = i > 0 && partOf(i + 1) !== partOf(i);
          const { time, done } = ep ? player.progress(i) : { time: 0, done: false };
          const fill = done ? 1 : ep ? Math.min(1, time / ep.seconds) : 0;
          const bar = (
            <motion.span
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              whileHover={ep ? { scaleY: 1.6 } : undefined}
              transition={{ duration: 0.6, ease: EASE, delay: 1.2 + i * 0.025 }}
              className={`relative block w-full origin-bottom overflow-hidden rounded-full ${current ? "h-3 bg-[#F2A81D]/35 shadow-[0_0_18px_rgba(255,212,126,0.7)]" : "h-1.5"} ${
                ep ? (current ? "" : "bg-[#F2A81D]/20") : "border border-dashed border-[#F2A81D]/25 bg-transparent"
              }`}
            >
              {fill > 0 && <span className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#D1941F] to-[#FFD47E]" style={{ width: `${fill * 100}%` }} />}
            </motion.span>
          );
          return (
            <span key={i} className={`relative flex flex-1 flex-col items-center justify-end ${newPart ? "ml-2.5 sm:ml-4" : "ml-[3px] sm:ml-1.5"} first:ml-0`}>
              {current && (
                <motion.svg
                  viewBox="0 0 10 10"
                  className="absolute -top-0.5 h-2.5 w-2.5"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden
                >
                  <path d="M5 0 L10 5 L5 10 L0 5 Z" fill={GOLD_LIGHT} />
                </motion.svg>
              )}
              {ep && !current ? (
                <Link href={episodePath(show, ep)} aria-label={`Chapter ${ep.number}: ${ep.shortTitle}`} title={`${roman(ep.number)} · ${ep.shortTitle}`} className="flex h-6 w-full items-end">
                  {bar}
                </Link>
              ) : (
                <span className="flex h-6 w-full items-end" title={ep ? undefined : `Chapter ${roman(i + 1)} · coming soon`}>
                  {bar}
                </span>
              )}
            </span>
          );
        })}
      </div>
      <div className="mt-3 hidden text-[10px] uppercase tracking-[0.25em] text-[#F4EEDD]/40 md:flex">
        {PARTS.map((part, p) => {
          const span = Array.from({ length: total }, (_, i) => partOf(i + 1)).filter((x) => x === p).length;
          return (
            <span key={part} style={{ flex: span }} className={`truncate pr-3 ${p === partOf(show.episodes[index].number) ? "text-[#FFD47E]" : ""}`}>
              {roman(p + 1)} · {part}
            </span>
          );
        })}
      </div>
    </motion.div>
  );
}

function Hero({ show, index, player, total, share }: Props & { total: number; share: ShareControl }) {
  const ep = show.episodes[index];
  const part = partOf(ep.number);
  const words = ep.shortTitle.split(" ");
  const { scrollY } = useScroll();
  const yNumeral = useTransform(scrollY, [0, 800], [0, 160]);
  const yMark = useTransform(scrollY, [0, 800], [0, 80]);
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(242,168,29,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_90%,rgba(87,182,217,0.10),transparent_55%)]" />
        <motion.div style={{ y: yMark }} className="absolute -left-24 bottom-0 opacity-[0.06]">
          <Mark className="h-[520px] w-auto" />
        </motion.div>
        <motion.div
          style={{ y: yNumeral, WebkitTextStroke: "1.5px rgba(242,168,29,0.28)" }}
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.2, ease: EASE }}
          className="absolute -right-6 -top-10 select-none font-[family-name:var(--vc-display)] text-[13rem] font-semibold leading-none text-transparent sm:text-[20rem] lg:-top-20 lg:text-[30rem]"
        >
          {roman(ep.number)}
        </motion.div>
      </div>
      <GoldMotes />
      <ChapterNav show={show} ep={ep} share={share} />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-5 pt-10 pb-14 sm:pt-14 md:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:pt-20 lg:pb-20">
        <div>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className={`${eyebrow} flex flex-wrap items-center gap-x-4 gap-y-2`}>
            <span>
              Chapter {roman(ep.number)} of {roman(total)}
            </span>
            <motion.span aria-hidden initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, ease: EASE, delay: 0.4 }} className="h-px w-10 origin-left bg-[#F2A81D]/60" />
            <span className="text-[#F4EEDD]/60">
              Part {roman(part + 1)} · {PARTS[part]}
            </span>
          </motion.p>
          <h1 aria-label={ep.shortTitle} className="!py-0 mt-6 font-[family-name:var(--vc-display)] text-[2.6rem] leading-[1.02] font-semibold sm:text-6xl lg:text-[4.6rem]">
            {words.map((word, i) => (
              <span key={i} aria-hidden className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0">
                <motion.span
                  className="inline-block"
                  style={goldText}
                  initial={{ y: "110%", rotate: 6, filter: "blur(6px)" }}
                  animate={{ y: "0%", rotate: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.2 + i * 0.08 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.5 + words.length * 0.06 }}
            className="mt-6 line-clamp-3 max-w-2xl font-[family-name:var(--vc-serif)] text-xl leading-snug italic text-[#F4EEDD]/90 sm:mt-7 sm:line-clamp-none sm:text-2xl md:text-[1.7rem]"
          >
            {ep.description}
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="mt-4 text-sm tracking-wide text-[#F4EEDD]/50">
            {ep.duration} · {ep.dateLabel} · Voiced by Alex &amp; Jordan
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.9 }} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-6 sm:mt-10">
            <PlayOrb show={show} index={index} player={player} />
            {ep.hasTranscript && (
              <a href="#transcript" className={ghostButton}>
                Read along
              </a>
            )}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.1 }} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            {ep.number > 1 && (
              <Link href={episodePath(show, show.episodes[0])} className="font-semibold text-[#FFD47E] no-underline hover:underline">
                New to the book? Start at Chapter I →
              </Link>
            )}
            <span className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.25em] text-[#F4EEDD]/50">Also on</span>
              <PlatformLinks spotify={SPOTIFY_URL} youtube={YOUTUBE_URL} linkClassName="rounded-full border border-[#F2A81D]/30 bg-[#070B22]/50 px-3.5 py-1.5 text-sm font-semibold text-[#F4EEDD] backdrop-blur transition-colors hover:border-[#F2A81D]" />
            </span>
          </motion.div>
        </div>
        <TiltCover show={show} ep={ep} />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <JourneyBar show={show} index={index} player={player} total={total} />
      </div>
    </section>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

/** The chapter's first line, revealed word by word as you scroll: a taste before the full transcript. */
function ColdOpen({ show, index, player }: Props) {
  const ep = show.episodes[index];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const opening = useMemo(() => {
    const m = ep.transcript?.match(/^\*\*([^*:]+):\*\*\s*(.+)$/m);
    if (!m) return null;
    // Whole sentences, stopping once the hook is long enough to land but short enough to read in one breath.
    const words: string[] = [];
    for (const sentence of m[2].trim().match(/[^.!?]+[.!?]+["”']?|\S[^.!?]*$/g) ?? []) {
      const next = sentence.trim().split(/\s+/);
      if (words.length >= 35 || (words.length > 0 && words.length + next.length > 55)) break;
      words.push(...next);
    }
    return { speaker: m[1].trim(), words };
  }, [ep.transcript]);
  if (!opening) return null;
  const n = opening.words.length;
  return (
    <section className="relative border-t border-[#F2A81D]/15 px-5 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-4xl">
        <p className={eyebrow}>The cold open</p>
        <div ref={ref} className="relative mt-8">
          <span aria-hidden className="pointer-events-none absolute -top-16 -left-2 font-[family-name:var(--vc-serif)] text-[10rem] leading-none text-[#F2A81D]/25 md:-left-14">
            “
          </span>
          <blockquote className="relative font-[family-name:var(--vc-serif)] text-[1.9rem] leading-[1.3] font-medium md:text-5xl md:leading-[1.22]">
            {opening.words.map((word, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / n, Math.min(1, (i + 3) / n)]}>
                {word}
              </Word>
            ))}
          </blockquote>
        </div>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: EASE }} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <p className="font-[family-name:var(--vc-display)] text-xs tracking-[0.3em] text-[#F4EEDD]/55">— {opening.speaker}, Chapter {roman(ep.number)}</p>
          <button onClick={() => player.playIndex(index)} className="inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-[#FFD47E] to-[#D1941F] px-6 py-3.5 font-semibold text-[#0C1130] shadow-[0_0_40px_-8px_rgba(242,168,29,0.7)] transition-transform hover:-translate-y-0.5">
            {player.index === index && player.playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
            Hear it in their voices
          </button>
          <a href="#transcript" className="font-semibold text-[#FFD47E] no-underline hover:underline">
            Keep reading ↓
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function NextCard({ show, index, player }: Props) {
  const next = show.episodes[index + 1];
  const part = partOf(next.number);
  const newPart = part !== partOf(show.episodes[index].number);
  const active = player.index === index + 1;
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px 0px" }} transition={{ duration: 1, ease: EASE }} className="group relative overflow-hidden rounded-[28px] p-px">
      <div aria-hidden className="absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2">
        <div className="h-full w-full animate-[spin_9s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,212,126,0.95)_50deg,transparent_110deg,transparent_200deg,rgba(242,168,29,0.6)_250deg,transparent_310deg)] motion-reduce:animate-none" />
      </div>
      <div className="relative grid items-center gap-6 rounded-[27px] bg-[#0B1330] p-7 md:grid-cols-[auto_1fr] md:gap-12 md:p-12">
        <div aria-hidden className="absolute inset-0 rounded-[27px] bg-[radial-gradient(ellipse_at_0%_50%,rgba(242,168,29,0.14),transparent_60%)]" />
        <span className="relative font-[family-name:var(--vc-display)] text-7xl font-semibold leading-none transition-transform duration-700 group-hover:scale-105 md:text-[9rem]" style={goldText}>
          {roman(next.number)}
        </span>
        <div className="relative">
          <p className="font-[family-name:var(--vc-display)] text-[11px] tracking-[0.3em] text-[#F4EEDD]/55">
            Chapter {roman(next.number)} · {newPart ? <span className="text-[#FFD47E]">Begins Part {roman(part + 1)} — {PARTS[part]}</span> : `Part ${roman(part + 1)}`}
          </p>
          <h3 className="!py-0 mt-3 font-[family-name:var(--vc-serif)] text-3xl font-medium leading-tight text-[#F4EEDD] md:text-5xl">
            <Link href={episodePath(show, next)} className="text-inherit no-underline hover:text-[#FFD47E] hover:no-underline">
              {next.shortTitle}
            </Link>
          </h3>
          <p className="mt-3 max-w-xl font-[family-name:var(--vc-serif)] text-lg italic leading-snug text-[#F4EEDD]/65 md:text-xl">{next.description}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={() => player.playIndex(index + 1)}
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-[#FFD47E] to-[#D1941F] px-6 py-3.5 font-semibold text-[#0C1130] shadow-[0_0_40px_-8px_rgba(242,168,29,0.7)] transition-transform hover:-translate-y-0.5"
            >
              {active && player.playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
              {active ? (player.playing ? "Playing" : "Resume") : "Play next"}
              {active && player.playing && <Equalizer color="#0C1130" active />}
            </button>
            <Link href={episodePath(show, next)} className={ghostButton}>
              Open chapter →
            </Link>
            <span className="text-sm tabular-nums text-[#F4EEDD]/50">{next.duration}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function UpNext({ show, index, player, total, share }: Props & { total: number; share: ShareControl }) {
  const prev = show.episodes[index - 1];
  const hasNext = index < show.episodes.length - 1;
  const comingSoon = !hasNext && show.episodes.length < total;
  return (
    <section className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-5xl">
        <p className={`${eyebrow} mb-8`}>{hasNext ? "Up next" : comingSoon ? "Coming soon" : "The final page"}</p>
        {hasNext ? (
          <NextCard show={show} index={index} player={player} />
        ) : comingSoon ? (
          <div className="rounded-[28px] border border-[#F2A81D]/30 bg-[#0B1330] p-7 md:p-12">
            <h3 className="!py-0 font-[family-name:var(--vc-serif)] text-3xl font-medium text-[#F4EEDD] md:text-5xl">
              Chapter {roman(index + 2)} is <em className="text-[#FFD47E]">being written.</em>
            </h3>
            <p className="mt-3 text-[#F4EEDD]/60">Get it in your inbox the day it&apos;s released.</p>
            <div className="mt-6 max-w-xl">
              <EmailSignupForm interest="value-created" tone="dark" buttonLabel="Keep me posted" successMessage="You're on the list! Watch your inbox for a welcome email." />
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-[28px] border border-[#F2A81D]/30 bg-[#0B1330] p-7 text-center md:p-14">
            <Mark className="mx-auto h-20 w-auto" />
            <h3 className="!py-0 mt-6 font-[family-name:var(--vc-serif)] text-3xl font-medium text-[#F4EEDD] md:text-5xl">
              You&apos;ve reached <em className="text-[#FFD47E]">the end of the book.</em>
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-[#F4EEDD]/60">The last leverage is teaching it. Pass the book to someone who&apos;s building something.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button onClick={() => share.open({ show })} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#FFD47E] to-[#D1941F] px-6 py-3.5 font-semibold text-[#0C1130]">
                <ShareIcon className="h-4 w-4" /> Share the book
              </button>
              <Link href={episodePath(show, show.episodes[0])} className={ghostButton}>
                Back to Chapter I
              </Link>
            </div>
            <div className="mx-auto mt-10 max-w-xl border-t border-[#F2A81D]/20 pt-8 text-left">
              <h4 className="!py-0 text-center font-[family-name:var(--vc-serif)] text-2xl font-medium text-[#FFD47E] md:text-3xl">The book is complete.</h4>
              <p className="mb-5 mt-2 text-center text-[#F4EEDD]/60">Get the next one first. New books and shows from The Joy Digi, before anyone else.</p>
              <EmailSignupForm interest="value-created" tone="dark" buttonLabel="Notify me" successMessage="You're on the list! You'll be first to hear about the next book." />
            </div>
          </div>
        )}
        {prev && (
          <Link href={episodePath(show, prev)} className="group mt-8 inline-flex items-center gap-3 text-[#F4EEDD]/60 no-underline hover:text-[#FFD47E] hover:no-underline">
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span className="font-[family-name:var(--vc-display)] text-xs tracking-[0.25em]">Chapter {roman(prev.number)}</span>
            <span className="font-[family-name:var(--vc-serif)] text-lg italic">{prev.shortTitle}</span>
          </Link>
        )}
      </div>
    </section>
  );
}

/** Horizontal rail of every chapter, opened on the current one. */
function BookRail({ show, index, player, total }: Props & { total: number }) {
  const rail = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = rail.current;
    const card = el?.querySelector<HTMLElement>(`[data-index="${index}"]`);
    if (el && card) el.scrollLeft = card.offsetLeft - (el.clientWidth - card.clientWidth) / 2;
  }, [index]);
  const scroll = (dir: number) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <section className="relative overflow-hidden border-y border-[#F2A81D]/15 bg-[#080E28] py-24">
      <div className="mx-auto mb-12 flex max-w-6xl flex-col justify-between gap-6 px-5 md:flex-row md:items-end md:px-8">
        <div>
          <p className={`${eyebrow} mb-4`}>The whole book</p>
          <h2 className="!py-0 font-[family-name:var(--vc-serif)] text-4xl font-medium leading-none text-[#F4EEDD] md:text-6xl">
            {total} chapters. <em className="text-[#FFD47E]">One secret.</em>
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <Link href={SHOW_PATH} className="mr-2 font-semibold text-[#FFD47E] no-underline hover:underline">
            Open the full book →
          </Link>
          {[-1, 1].map((dir) => (
            <button
              key={dir}
              onClick={() => scroll(dir)}
              aria-label={dir < 0 ? "Previous chapters" : "More chapters"}
              className="hidden h-11 w-11 place-items-center rounded-full border border-[#F2A81D]/40 text-[#FFD47E] transition-colors hover:border-[#F2A81D] hover:bg-[#F2A81D]/10 md:grid"
            >
              {dir < 0 ? "←" : "→"}
            </button>
          ))}
        </div>
      </div>
      <div ref={rail} className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:px-[max(2rem,calc((100vw-72rem)/2))] [&::-webkit-scrollbar]:hidden">
        {show.episodes.map((ep, i) => {
          const current = i === index;
          const part = partOf(ep.number);
          return (
            <motion.div
              key={ep.number}
              data-index={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px -40px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="shrink-0 snap-center"
            >
              <Link
                href={episodePath(show, ep)}
                aria-current={current ? "page" : undefined}
                className={`group flex h-full w-[16.5rem] flex-col rounded-2xl border p-6 no-underline transition-all duration-500 hover:-translate-y-1.5 hover:no-underline ${
                  current ? "border-[#FFD47E] bg-[#F2A81D]/[0.09] shadow-[0_0_50px_-15px_rgba(242,168,29,0.6)]" : "border-[#F2A81D]/20 bg-[#0B1330]/60 hover:border-[#F2A81D]/60"
                }`}
              >
                <span className="flex items-start justify-between">
                  <span className="font-[family-name:var(--vc-display)] text-4xl font-semibold leading-none" style={goldText}>
                    {roman(ep.number)}
                  </span>
                  {current ? (
                    <span className="rounded-full border border-[#FFD47E]/60 px-2.5 py-1 font-[family-name:var(--vc-display)] text-[9px] tracking-[0.2em] text-[#FFD47E]">You are here</span>
                  ) : (
                    player.index === i && <Equalizer color={GOLD_LIGHT} active={player.playing} />
                  )}
                </span>
                <span className="mt-5 font-[family-name:var(--vc-display)] text-[10px] tracking-[0.25em] text-[#F4EEDD]/45">
                  Part {roman(part + 1)} · {PARTS[part]}
                </span>
                <span className="mt-2 line-clamp-2 font-[family-name:var(--vc-serif)] text-2xl font-medium leading-tight text-[#F4EEDD] transition-colors group-hover:text-[#FFD47E]">{ep.shortTitle}</span>
                <span className="mt-auto flex items-center justify-between gap-3 pt-5 text-xs tabular-nums text-[#F4EEDD]/50">
                  <span>{ep.duration}</span>
                  <ListenProgress {...player.progress(i)} seconds={ep.seconds} color={GOLD_LIGHT} track="rgba(242,168,29,0.2)" className="text-[#F4EEDD]/55" />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export function ValueCreatedEpisode({ show, episode }: { show: Show; episode: number }) {
  const player = usePlayer(show, episode);
  const share = useShare();
  const total = totalChapters(show);
  const ep = show.episodes[episode];
  const props = { show, index: episode, player };
  return (
    <MotionConfig reducedMotion="user">
      <div className={VC_ROOT}>
        <PodcastSeo show={show} title={show.title} description={show.description} episode={episode} />
        <div key={ep.number}>
          <Hero {...props} total={total} share={share} />
          <ColdOpen {...props} />
          <EpisodeTranscript episode={ep} />
          <UpNext {...props} total={total} share={share} />
        </div>
        <BookRail {...props} total={total} />
        <Subscribe show={show} />
        <Footer />
        <StickyPlayer show={show} player={player} share={share} total={total} />
        <ShareSheet share={share} theme={SHARE_THEME} />
      </div>
    </MotionConfig>
  );
}
