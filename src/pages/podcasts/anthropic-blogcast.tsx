import { AnimatePresence, motion } from "framer-motion";
import { GetStaticProps } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Equalizer, PauseIcon, PlayIcon, PodcastSeo, SkipIcon, useCopy } from "@/components/podcast/common";
import { ShareIcon, ShareSheet, useShare, type ShareControl, type ShareTheme } from "@/components/podcast/share";
import { fmt, usePlayer, type Player } from "@/components/podcast/use-player";
import { getShow, type Show } from "@/lib/podcasts";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"], variable: "--ab-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--ab-body", display: "swap" });

const INK = "#101418";
const INK2 = "#1A2029";
const PAPER = "#F4EFE6";
const CORAL = "#E2725B";
const AMBER = "#E9B44C";
const MUTED = "rgba(244,239,230,0.65)";
const EASE = [0.22, 1, 0.36, 1] as const;

// Filled in once the show is submitted to Spotify / YouTube.
const SPOTIFY_URL = "https://open.spotify.com/show/0U5pyPMawaksXnC5PD821m";
const YOUTUBE_URL = "https://www.youtube.com/playlist?list=PLTqAN17_fo_U";

const SHARE_THEME: ShareTheme = {
  fontClass: `${display.variable} ${body.variable}`,
  headingFont: "var(--ab-display)",
  bodyFont: "var(--ab-body), system-ui, sans-serif",
  panel: INK2,
  text: PAPER,
  muted: MUTED,
  border: "rgba(226,114,91,0.35)",
  accent: CORAL,
  onAccent: INK,
  tile: "rgba(226,114,91,0.12)",
};

const font = "font-[family-name:var(--ab-display)]";
const card = "rounded-[1.75rem] border border-white/10 bg-white/[0.04]";

function Signal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx="24" cy="24" r="5" fill={CORAL} />
      <path d="M14 14a14 14 0 0 1 20 0" fill="none" stroke={CORAL} strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
      <path d="M8.5 8.5a22 22 0 0 1 31 0" fill="none" stroke={CORAL} strokeWidth="3.5" strokeLinecap="round" opacity="0.45" />
      <path d="M19.5 19.5a6.5 6.5 0 0 1 9 0" fill="none" stroke={AMBER} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Hero({ show, player, share }: { show: Show; player: Player; share: ShareControl }) {
  const latest = show.episodes.length - 1;
  const ep = show.episodes[latest];
  const isLatestPlaying = player.index === latest && player.playing;
  const { copied, copy } = useCopy(show.feedUrl);
  return (
    <section className="relative overflow-hidden" style={{ background: INK }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(ellipse 70% 50% at 75% 15%, rgba(226,114,91,0.22), transparent 65%), radial-gradient(ellipse 50% 40% at 10% 90%, rgba(233,180,76,0.10), transparent 60%)` }}
      />
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 pt-6 md:px-8">
        <Link href="/" className="font-bold text-white/60 no-underline hover:text-white hover:no-underline">
          ← The Joy Digi
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => share.open({ show })}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            <ShareIcon className="h-4 w-4" strokeWidth={2.5} />
            Share
          </button>
          <button
            onClick={copy}
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            {copied ? "Feed copied ✓" : "Copy RSS"}
          </button>
        </div>
      </nav>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pt-12 pb-16 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:pt-16">
        <div className="text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-bold uppercase tracking-widest"
            style={{ color: AMBER }}
          >
            <Signal className="h-4 w-4" />
            New episode when Anthropic publishes
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className={`!py-0 mt-8 ${font} text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl`}
            style={{ color: PAPER }}
          >
            Anthropic
            <br />
            <span style={{ color: CORAL }}>Blogcast</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed lg:mx-0"
            style={{ color: MUTED }}
          >
            Every Anthropic announcement — model launches, research, policy — turned into a
            conversation. Follow the Anthropic blog without reading it. Hosted by Alex &amp; Jordan.
          </motion.p>
          {ep && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
              className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <button
                onClick={() => player.playIndex(latest)}
                className={`inline-flex items-center gap-3 rounded-full px-7 py-4 text-lg font-bold transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0`}
                style={{ background: CORAL, color: INK }}
              >
                {isLatestPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
                Play Episode {ep.number}
              </button>
              <span className="text-sm font-semibold" style={{ color: MUTED }}>
                {ep.duration} · {ep.dateLabel}
              </span>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.15 }}
          className="relative mx-auto w-full max-w-[460px]"
        >
          <div
            aria-hidden
            className="absolute inset-[-8%] rounded-[2.5rem] blur-3xl"
            style={{ background: "rgba(226,114,91,0.28)" }}
          />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl">
            <Image src={show.cover} alt="Anthropic Blogcast cover art" width={920} height={920} priority sizes="(min-width: 1024px) 460px, 88vw" className="block h-auto w-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Latest({ show, player, share }: { show: Show; player: Player; share: ShareControl }) {
  const i = show.episodes.length - 1;
  const ep = show.episodes[i];
  if (!ep) return null;
  const active = player.index === i;
  return (
    <section className="px-5 py-20 md:px-8" style={{ background: INK }}>
      <div className="mx-auto max-w-4xl">
        <p className={`mb-6 ${font} text-sm font-bold uppercase tracking-[0.25em]`} style={{ color: AMBER }}>
          Latest episode
        </p>
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className={`${card} p-6 md:p-10`}
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: CORAL }}>
            Episode {ep.number} · {ep.dateLabel} · {ep.duration}
          </p>
          <h2 className={`!py-0 mt-3 ${font} text-4xl font-bold leading-tight md:text-5xl`} style={{ color: PAPER }}>
            {ep.shortTitle}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed" style={{ color: MUTED }}>
            {ep.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => player.playIndex(i)}
              className="inline-flex items-center gap-3 rounded-full px-7 py-4 text-lg font-bold transition-transform hover:-translate-y-0.5"
              style={{ background: CORAL, color: INK }}
            >
              {active && player.playing ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
              {active && player.playing ? "Pause" : "Listen now"}
              {active && <Equalizer color={INK} active={player.playing} />}
            </button>
            <button
              onClick={() => share.open({ show, episode: ep, time: active ? player.time : undefined })}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-4 text-lg font-bold transition-colors hover:bg-white/10"
              style={{ color: PAPER }}
            >
              <ShareIcon className="h-5 w-5" strokeWidth={2.5} />
              Send to a friend
            </button>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

function Episodes({ show, player, share }: { show: Show; player: Player; share: ShareControl }) {
  const list = [...show.episodes].reverse();
  return (
    <section className="px-5 pb-24 md:px-8" style={{ background: INK }}>
      <div className="mx-auto max-w-4xl">
        <h2 className={`!py-0 mb-8 ${font} text-4xl font-bold`} style={{ color: PAPER }}>
          All episodes
        </h2>
        <ol className="space-y-4">
          {list.map((ep) => {
            const i = show.episodes.indexOf(ep);
            const active = player.index === i;
            return (
              <li key={ep.audio} className="relative">
                <button
                  onClick={() => player.playIndex(i)}
                  className={`group flex w-full items-stretch overflow-hidden ${card} text-left transition-transform hover:-translate-y-0.5`}
                >
                  <span
                    className="grid w-24 shrink-0 place-items-center border-r border-white/10 md:w-28"
                    style={{ background: "rgba(226,114,91,0.14)" }}
                  >
                    <span className="text-center">
                      <span className="block text-[10px] font-extrabold uppercase tracking-[0.2em]" style={{ color: MUTED }}>Ep</span>
                      <span className={`block ${font} text-4xl font-bold`} style={{ color: PAPER }}>{String(ep.number).padStart(2, "0")}</span>
                    </span>
                  </span>
                  <span className="flex flex-1 items-center gap-4 p-5 pr-20 md:p-6 md:pr-24">
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-3">
                        <span className={`${font} text-xl font-bold`} style={{ color: PAPER }}>{ep.shortTitle}</span>
                        {active && <Equalizer color={CORAL} active={player.playing} />}
                      </span>
                      <span className="mt-1 block text-sm font-semibold" style={{ color: MUTED }}>
                        {ep.dateLabel} · {ep.duration}
                      </span>
                    </span>
                    <span
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-full transition-colors"
                      style={{ background: active ? CORAL : "rgba(255,255,255,0.1)", color: active ? INK : PAPER }}
                    >
                      {active && player.playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="ml-0.5 h-5 w-5" />}
                    </span>
                  </span>
                </button>
                <button
                  onClick={() => share.open({ show, episode: ep, time: active ? player.time : undefined })}
                  aria-label={`Share ${ep.shortTitle}`}
                  className="absolute right-5 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 text-white/70 transition-colors hover:bg-white/10 hover:text-white md:right-6"
                >
                  <ShareIcon className="h-[18px] w-[18px]" strokeWidth={2.5} />
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Subscribe({ show }: { show: Show }) {
  const { copied, copy } = useCopy(show.feedUrl);
  return (
    <section className="px-5 pb-28 md:px-8" style={{ background: INK }}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className={`!py-0 ${font} text-4xl font-bold md:text-5xl`} style={{ color: PAPER }}>
          Never miss a launch
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg" style={{ color: MUTED }}>
          Episodes drop whenever Anthropic publishes — follow on Spotify, watch on YouTube, or grab the feed in your favorite app.
        </p>
        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center gap-4 sm:flex-row">
          {SPOTIFY_URL ? (
            <a
              href={SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#1DB954] px-7 py-4 text-lg font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              <PlayIcon className="h-5 w-5" />
              Listen on Spotify
            </a>
          ) : null}
          {YOUTUBE_URL ? (
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF0000] px-7 py-4 text-lg font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              <PlayIcon className="h-5 w-5" />
              Watch on YouTube
            </a>
          ) : null}
          <button
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-lg font-bold transition-colors hover:bg-white/10"
            style={{ color: PAPER }}
          >
            {copied ? "Feed copied ✓" : "Copy RSS feed"}
          </button>
        </div>
        <p className="mx-auto mt-4 max-w-xl text-sm font-semibold" style={{ color: MUTED }}>
          The RSS feed works in Apple Podcasts, Overcast, Pocket Casts, and any podcast app.
          {SPOTIFY_URL ? "" : " Spotify and YouTube listings are on the way."}
        </p>
        <p className="mt-12 text-sm font-bold" style={{ color: MUTED }}>
          A production of <Link href="/" className="underline decoration-2 underline-offset-4" style={{ color: PAPER }}>The Joy Digi</Link>
        </p>
      </div>
    </section>
  );
}

function StickyPlayer({ show, player, share }: { show: Show; player: Player; share: ShareControl }) {
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
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-[1.75rem] border border-white/15 p-3 text-white md:p-4"
          style={{ background: "rgba(26,32,41,0.92)", backdropFilter: "blur(12px)" }}
          role="region"
          aria-label="Audio player"
        >
          <div className="flex items-center gap-3">
            <Image src={show.cover} alt="" width={96} height={96} className="h-12 w-12 shrink-0 rounded-xl" />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em]" style={{ color: CORAL }}>Episode {ep.number}</p>
              <p className={`truncate ${font} text-lg font-bold`} style={{ color: PAPER }}>{ep.shortTitle}</p>
            </div>
            <button onClick={() => player.skip(-15)} aria-label="Back 15 seconds" className="hidden h-10 w-10 place-items-center text-white/70 hover:text-white sm:grid">
              <SkipIcon seconds={15} back className="h-6 w-6" />
            </button>
            <button
              onClick={player.toggle}
              aria-label={player.playing ? "Pause" : "Play"}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full"
              style={{ background: CORAL, color: INK }}
            >
              {player.playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="ml-0.5 h-5 w-5" />}
            </button>
            <button onClick={() => player.skip(30)} aria-label="Forward 30 seconds" className="hidden h-10 w-10 place-items-center text-white/70 hover:text-white sm:grid">
              <SkipIcon seconds={30} className="h-6 w-6" />
            </button>
            <button onClick={() => share.open({ show, episode: ep, time: player.time })} aria-label="Share this episode" className="grid h-10 w-10 shrink-0 place-items-center text-white/70 hover:text-white">
              <ShareIcon className="h-5 w-5" strokeWidth={2.5} />
            </button>
            <button onClick={player.cycleRate} aria-label="Playback speed" className="w-12 rounded-full border border-white/25 py-1 text-xs font-extrabold tabular-nums text-white/80">
              {player.rate}×
            </button>
          </div>
          <div className="mt-2.5 flex items-center gap-3 text-[11px] font-bold tabular-nums text-white/60">
            <span className="w-10 text-right">{fmt(player.time)}</span>
            <div className="relative h-2.5 flex-1 rounded-full bg-white/15">
              <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${pct}%`, background: CORAL }} />
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

export default function AnthropicBlogcast({ show, episode }: { show: Show; episode?: number }) {
  const player = usePlayer(show, episode);
  const share = useShare();
  return (
    <div
      className={`${display.variable} ${body.variable} min-h-screen overflow-x-clip [font-family:var(--ab-body),system-ui,sans-serif]`}
      style={{ background: INK, color: PAPER, ["--ab-selection" as string]: CORAL }}
    >
      <PodcastSeo
        show={show}
        title="Anthropic Blogcast — every Anthropic announcement, as a conversation"
        description={show.description}
        episode={episode}
      />
      <Hero show={show} player={player} share={share} />
      <Latest show={show} player={player} share={share} />
      <Episodes show={show} player={player} share={share} />
      <Subscribe show={show} />
      <StickyPlayer show={show} player={player} share={share} />
      <ShareSheet share={share} theme={SHARE_THEME} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => ({ props: { show: getShow("anthropic-blogcast") } });
