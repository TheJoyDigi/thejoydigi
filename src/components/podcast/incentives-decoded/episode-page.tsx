import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef } from "react";
import { episodePath, Equalizer, fmtLeft, PauseIcon, PlayIcon, PodcastSeo } from "@/components/podcast/common";
import { EpisodeTranscript } from "@/components/podcast/episode-transcript";
import { ShareIcon, ShareSheet, useShare, type ShareControl } from "@/components/podcast/share";
import { fmt, usePlayer, type Player } from "@/components/podcast/use-player";
import type { Show } from "@/lib/podcasts";
import { chunky, DecodeText, dotGrid, DragSticker, Follow, Footer, ID_ROOT, LevelTile, monoLabel, Nav, pad, SHARE_THEME, SPRING, Sticker, StickyPlayer } from "./theme";

type Props = { show: Show; index: number; player: Player };

/** Big round start button; its ring fills as the level plays. */
function StartButton({ show, index, player }: Props) {
  const ep = show.episodes[index];
  const playing = player.index === index && player.playing;
  const { time, done } = player.progress(index);
  const started = time > 5 && !done;
  const pct = Math.min(1, time / ep.seconds);
  const label = playing ? "Pause" : started ? "Resume level" : done ? "Replay level" : "Play level";
  const sub = playing ? `${fmt(time)} / ${ep.duration}` : started ? fmtLeft(ep.seconds - time) : `${ep.duration} · press start`;
  return (
    <button onClick={() => player.playIndex(index)} className="group flex items-center gap-5 text-left" aria-label={`${label}: ${ep.shortTitle}`}>
      <span className="relative grid h-[96px] w-[96px] shrink-0 place-items-center">
        <svg viewBox="0 0 96 96" className="absolute inset-0 -rotate-90" aria-hidden>
          <circle cx="48" cy="48" r="44" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="6" />
          <motion.circle cx="48" cy="48" r="44" fill="none" stroke="#D4FF3A" strokeWidth="6" strokeLinecap="round" initial={false} animate={{ pathLength: pct, opacity: pct > 0 ? 1 : 0 }} transition={{ duration: 0.4, ease: "linear" }} />
        </svg>
        <motion.span
          animate={playing ? { scale: [1, 1.04, 1] } : { scale: 1 }}
          transition={playing ? { duration: 0.9, repeat: Infinity } : SPRING}
          whileTap={{ scale: 0.88 }}
          className="grid h-[70px] w-[70px] place-items-center rounded-full border-[3px] border-[#0E0D12] bg-[#D4FF3A] text-[#0E0D12] shadow-[4px_4px_0_#0E0D12] transition-shadow group-hover:shadow-[6px_6px_0_#0E0D12]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={playing ? "pause" : "play"} initial={{ scale: 0, rotate: -120 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 120 }} transition={{ duration: 0.2 }}>
              {playing ? <PauseIcon className="h-7 w-7" /> : <PlayIcon className="ml-1 h-7 w-7" />}
            </motion.span>
          </AnimatePresence>
        </motion.span>
      </span>
      <span>
        <span className="flex items-center gap-3 text-2xl font-extrabold tracking-[-0.02em]">
          {label}
          {playing && <Equalizer color="#D4FF3A" active />}
        </span>
        <span className={`${monoLabel} mt-1 block !normal-case !tracking-normal text-white/90`}>{sub}</span>
      </span>
    </button>
  );
}

/** All levels as chunky XP blocks: cleared, current and ahead. */
function XpBar({ show, index, player }: Props) {
  const cleared = show.episodes.filter((_, i) => player.progress(i).done).length;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: 0.9 }} className="rounded-[20px] border-[2.5px] border-[#0E0D12] bg-[#0E0D12] p-4 md:p-5">
      <div className={`${monoLabel} mb-3 flex justify-between gap-4 text-white/90`}>
        <span>Your run</span>
        <span className="tabular-nums text-[#D4FF3A]">
          {cleared > 0 ? `${cleared}/${show.episodes.length} cleared` : `Level ${pad(show.episodes[index].number)} of ${show.episodes.length}`}
        </span>
      </div>
      <div className="grid grid-cols-[repeat(16,minmax(0,1fr))] gap-1 md:grid-cols-[repeat(32,minmax(0,1fr))] md:gap-1.5">
        {show.episodes.map((ep, i) => {
          const current = i === index;
          const { time, done } = player.progress(i);
          const block = (
            <motion.span
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ ...SPRING, delay: 1 + i * 0.015 }}
              className={`block h-5 origin-bottom rounded-[4px] md:h-7 ${current ? "bg-[#FF5CA8] shadow-[0_0_0_2px_#FFFFFF]" : done ? "bg-[#D4FF3A]" : time > 5 ? "bg-[#4FE0E8]" : "bg-white/15 group-hover:bg-white/40"}`}
            />
          );
          return current ? (
            <motion.span key={ep.number} animate={{ y: [0, -3, 0] }} transition={{ duration: 1.4, repeat: Infinity }} title={`Level ${ep.number}: ${ep.shortTitle}`}>
              {block}
            </motion.span>
          ) : (
            <Link key={ep.number} href={episodePath(show, ep)} className="group" aria-label={`Level ${ep.number}: ${ep.shortTitle}`} title={`${pad(ep.number)} · ${ep.shortTitle}`}>
              {block}
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

function Hero({ show, index, player, share }: Props & { share: ShareControl }) {
  const ep = show.episodes[index];
  const bounds = useRef<HTMLElement>(null);
  const words = ep.shortTitle.split(" ");
  return (
    <section ref={bounds} className="relative isolate overflow-hidden border-b-[2.5px] border-[#0E0D12] bg-[#5B3DF5] text-white" style={dotGrid}>
      <Nav
        onShare={() => share.open({ show, episode: ep })}
        crumbs={
          <nav aria-label="Breadcrumb">
            <ol className={`${monoLabel} flex items-center gap-2 text-white/90`}>
              <li className="hidden sm:block">
                <Link href="/podcasts" className="text-inherit no-underline hover:text-[#D4FF3A] hover:no-underline">
                  Podcasts
                </Link>
              </li>
              <li aria-hidden className="hidden sm:block">/</li>
              <li>
                <Link href={`/podcasts/${show.slug}`} className="text-inherit no-underline hover:text-[#D4FF3A] hover:no-underline">
                  <span className="sm:hidden">← </span>Incentives, Decoded
                </Link>
              </li>
              <li aria-hidden className="hidden sm:block">/</li>
              <li aria-current="page" className="hidden text-[#D4FF3A] sm:block">
                Level {pad(ep.number)}
              </li>
            </ol>
          </nav>
        }
      />
      <DragSticker kind="coin" bounds={bounds} className="right-[4%] top-[58%] hidden h-24 w-24 lg:block" rotate={-10} delay={0.8} />
      <DragSticker kind="cursor" bounds={bounds} className="left-[48%] top-24 hidden h-16 w-16 md:block" rotate={-6} delay={1} />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 pt-10 pb-10 md:px-8 lg:grid-cols-[1.3fr_0.7fr] lg:pt-16">
        <div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="flex flex-wrap gap-2">
            <span className={`${monoLabel} rounded-full border-2 border-[#0E0D12] bg-[#D4FF3A] px-3 py-1.5 text-[#0E0D12]`}>
              <DecodeText text={`Level ${pad(ep.number)} / ${show.episodes.length}`} duration={700} />
            </span>
            <span className={`${monoLabel} rounded-full border-2 border-[#0E0D12] bg-white px-3 py-1.5 text-[#0E0D12]`}>{ep.duration}</span>
            <span className={`${monoLabel} hidden rounded-full border-2 border-[#0E0D12] bg-white px-3 py-1.5 text-[#0E0D12] sm:inline`}>Alex × Jordan</span>
          </motion.div>
          <h1 aria-label={ep.shortTitle} className="!py-0 mt-6 text-[3rem] font-extrabold text-white leading-[0.92] tracking-[-0.05em] sm:text-7xl lg:text-[5.6rem]">
            {words.map((word, i) => (
              <motion.span
                key={i}
                aria-hidden
                initial={{ opacity: 0, scale: 0.3, rotate: i % 2 ? 14 : -14, y: 30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                transition={{ ...SPRING, delay: 0.15 + i * 0.07 }}
                className="mr-[0.22em] inline-block [paint-order:stroke_fill] [-webkit-text-stroke:4px_#0E0D12] [text-shadow:5px_5px_0_#0E0D12] last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, delay: 0.4 + words.length * 0.05 }}
            className="mt-6 line-clamp-3 max-w-2xl text-lg font-medium leading-snug text-white/90 sm:line-clamp-none md:text-xl"
          >
            {ep.description}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: 0.6 }} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
            <StartButton show={show} index={index} player={player} />
            {ep.hasTranscript && (
              <a href="#transcript" className={`rounded-full bg-white px-5 py-3 font-extrabold text-[#0E0D12] no-underline hover:no-underline ${chunky}`}>
                Read along
              </a>
            )}
          </motion.div>
          {ep.number > 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-6">
              <Link href={episodePath(show, show.episodes[0])} className="font-bold text-[#D4FF3A] no-underline hover:underline">
                New here? Start at Level 01 →
              </Link>
            </motion.div>
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, rotate: 16, y: 50 }}
          animate={{ opacity: 1, rotate: 5, y: 0 }}
          whileHover={{ rotate: 0, scale: 1.03 }}
          transition={{ ...SPRING, delay: 0.3 }}
          className="relative mx-auto hidden w-full max-w-[340px] sm:block"
        >
          <div className="overflow-hidden rounded-[26px] border-[3px] border-[#0E0D12] shadow-[10px_10px_0_#0E0D12]">
            <Image src={show.cover} alt="Incentives, Decoded cover art" width={680} height={680} priority sizes="340px" className="block h-auto w-full" />
          </div>
          <motion.span
            initial={{ scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: -10 }}
            transition={{ ...SPRING, delay: 0.9 }}
            className="absolute -bottom-7 -left-7 grid h-28 w-28 place-items-center rounded-full border-[3px] border-[#0E0D12] bg-[#FF5CA8] text-center text-[#0E0D12] shadow-[5px_5px_0_#0E0D12]"
            aria-hidden
          >
            <span className="leading-none">
              <span className={`${monoLabel} block !text-[10px]`}>Level</span>
              <span className="text-5xl font-extrabold tracking-[-0.05em]">{pad(ep.number)}</span>
            </span>
          </motion.span>
        </motion.div>
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-14 md:px-8">
        <XpBar show={show} index={index} player={player} />
      </div>
    </section>
  );
}

const unescape = (s: string) => s.replace(/\\([\\`*_{}[\]<>])/g, "$1");

/** The opening lines, replayed as a group chat. */
function ColdOpen({ show, index, player }: Props) {
  const ep = show.episodes[index];
  const turns = useMemo(
    () =>
      (ep.transcript ?? "")
        .split(/\n{2,}/)
        .map((p) => p.match(/^\*\*([^*:]+):\*\*\s*([\s\S]+)$/))
        .filter((m): m is RegExpMatchArray => !!m)
        .slice(0, 4)
        .map((m) => ({ speaker: m[1].trim(), text: unescape(m[2].trim()) })),
    [ep.transcript]
  );
  if (turns.length < 2) return null;
  const first = turns[0].speaker;
  const playing = player.index === index && player.playing;
  return (
    <section className="relative overflow-hidden px-4 py-24 md:px-8 md:py-28">
      <Sticker kind="die" className="absolute -left-8 top-16 hidden h-28 w-28 -rotate-12 md:block" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className={`${monoLabel} text-[#5B3DF5]`}>The cold open</p>
          <h2 className="!py-0 text-[#0E0D12] mt-3 text-5xl font-extrabold leading-[0.95] tracking-[-0.045em] md:text-6xl">
            Here&apos;s how it <span className="rounded-xl bg-[#D4FF3A] px-2">starts.</span>
          </h2>
          <p className="mt-4 max-w-sm text-lg font-medium text-[#0E0D12]/70">The opening lines of Level {pad(ep.number)}, straight from Alex and Jordan.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => player.playIndex(index)} className={`inline-flex items-center gap-2 rounded-2xl bg-[#5B3DF5] px-6 py-3.5 text-lg font-extrabold text-white ${chunky}`}>
              {playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
              {playing ? "Playing" : "Hear the rest"}
            </button>
            <a href="#transcript" className={`rounded-2xl bg-white px-6 py-3.5 text-lg font-extrabold text-[#0E0D12] no-underline hover:no-underline ${chunky}`}>
              Read it all ↓
            </a>
          </div>
        </div>
        <div className="rounded-[28px] border-[2.5px] border-[#0E0D12] bg-white shadow-[8px_8px_0_#0E0D12]">
          <div className="flex items-center gap-3 border-b-[2.5px] border-[#0E0D12] px-5 py-3.5">
            <span className="flex -space-x-2">
              {["A", "J"].map((a, i) => (
                <span key={a} className={`grid h-9 w-9 place-items-center rounded-full border-2 border-[#0E0D12] text-sm font-extrabold ${i ? "bg-[#4FE0E8]" : "bg-[#FF5CA8]"}`}>
                  {a}
                </span>
              ))}
            </span>
            <span className="min-w-0">
              <span className="block font-extrabold leading-tight">Alex, Jordan</span>
              <span className={`${monoLabel} block !text-[10px] text-[#0E0D12]/75`}>Level {pad(ep.number)} · {ep.shortTitle}</span>
            </span>
          </div>
          <ul className="space-y-3 p-4 md:p-6">
            {turns.map((t, i) => {
              const left = t.speaker === first;
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 24, scale: 0.85, x: left ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px 0px" }}
                  transition={{ ...SPRING, delay: i * 0.55 }}
                  className={`flex ${left ? "justify-start" : "justify-end"}`}
                >
                  <div className={`max-w-[85%] rounded-[20px] border-2 border-[#0E0D12] px-4 py-3 ${left ? "rounded-bl-[6px] bg-[#F1EEFF]" : "rounded-br-[6px] bg-[#D4FF3A]"}`}>
                    <p className={`${monoLabel} !text-[10px] text-[#0E0D12]/75`}>{t.speaker}</p>
                    <p className="mt-1 text-[17px] font-medium leading-snug">{t.text}</p>
                  </div>
                </motion.li>
              );
            })}
            <motion.li initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: turns.length * 0.55 + 0.3 }} className="flex justify-start">
              <span className="flex items-center gap-1.5 rounded-full border-2 border-[#0E0D12] bg-[#F1EEFF] px-4 py-3" aria-label={`${first} is typing`}>
                {[0, 1, 2].map((d) => (
                  <motion.span key={d} className="h-2 w-2 rounded-full bg-[#0E0D12]" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }} />
                ))}
              </span>
            </motion.li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function NextLevel({ show, index, player, share }: Props & { share: ShareControl }) {
  const next = show.episodes[index + 1];
  const prev = show.episodes[index - 1];
  const active = next && player.index === index + 1;
  return (
    <section className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-5xl">
        {next ? (
          <motion.div
            initial={{ opacity: 0, y: 50, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1 }}
            whileHover={{ rotate: 0 }}
            viewport={{ once: true, margin: "-60px 0px" }}
            transition={SPRING}
            className="relative grid gap-6 rounded-[30px] border-[3px] border-[#0E0D12] bg-[#FF5CA8] p-7 shadow-[10px_10px_0_#0E0D12] md:grid-cols-[auto_1fr] md:items-center md:gap-10 md:p-11"
          >
            <Sticker kind="star" className="absolute -right-5 -top-7 h-20 w-20 rotate-12" />
            <span className="leading-none">
              <span className={`${monoLabel} block`}>Next level</span>
              <span className="text-8xl font-extrabold tracking-[-0.06em] md:text-[9rem]">{pad(next.number)}</span>
            </span>
            <div>
              <h3 className="!py-0 text-[#0E0D12] text-4xl font-extrabold leading-[0.98] tracking-[-0.04em] md:text-5xl">
                <Link href={episodePath(show, next)} className="text-inherit no-underline hover:underline">
                  {next.shortTitle}
                </Link>
              </h3>
              <p className="mt-3 max-w-xl text-lg font-medium leading-snug text-[#0E0D12]/80">{next.description}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button onClick={() => player.playIndex(index + 1)} className={`inline-flex items-center gap-2 rounded-2xl bg-[#D4FF3A] px-6 py-3.5 text-lg font-extrabold text-[#0E0D12] ${chunky}`}>
                  {active && player.playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
                  {active ? (player.playing ? "Playing" : "Resume") : "Play next"}
                </button>
                <Link href={episodePath(show, next)} className={`rounded-2xl bg-white px-6 py-3.5 text-lg font-extrabold text-[#0E0D12] no-underline hover:no-underline ${chunky}`}>
                  Open level →
                </Link>
                <span className={`${monoLabel} text-[#0E0D12]/70`}>{next.duration}</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={SPRING} className="relative rounded-[30px] border-[3px] border-[#0E0D12] bg-[#D4FF3A] p-8 text-center shadow-[10px_10px_0_#0E0D12] md:p-14">
            <Sticker kind="star" className="mx-auto h-24 w-24" />
            <p className={`${monoLabel} mt-4`}>Game complete</p>
            <h3 className="!py-0 text-[#0E0D12] mt-2 text-5xl font-extrabold tracking-[-0.045em] md:text-6xl">You decoded all {show.episodes.length} levels.</h3>
            <p className="mx-auto mt-3 max-w-md text-lg font-medium text-[#0E0D12]/75">Now teach the game: send it to someone who keeps asking &ldquo;why are people like this?&rdquo;</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button onClick={() => share.open({ show })} className={`inline-flex items-center gap-2 rounded-2xl bg-[#0E0D12] px-6 py-3.5 text-lg font-extrabold text-[#D4FF3A] ${chunky}`}>
                <ShareIcon className="h-5 w-5" /> Share the series
              </button>
              <Link href={episodePath(show, show.episodes[0])} className={`rounded-2xl bg-white px-6 py-3.5 text-lg font-extrabold text-[#0E0D12] no-underline hover:no-underline ${chunky}`}>
                Back to Level 01
              </Link>
            </div>
          </motion.div>
        )}
        {prev && (
          <Link href={episodePath(show, prev)} className="group mt-10 inline-flex items-center gap-3 font-bold text-[#0E0D12]/70 no-underline hover:text-[#5B3DF5] hover:no-underline">
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span className={monoLabel}>Level {pad(prev.number)}</span>
            <span>{prev.shortTitle}</span>
          </Link>
        )}
      </div>
    </section>
  );
}

/** Every level in a swipeable rail, opened on the current one. */
function LevelRail({ show, index, player }: Props) {
  const rail = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const el = rail.current;
    const card = el?.children[index] as HTMLElement | undefined;
    if (el && card) el.scrollLeft = card.offsetLeft - (el.clientWidth - card.clientWidth) / 2;
  }, [index]);
  const scroll = (dir: number) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <section className="border-y-[2.5px] border-[#0E0D12] bg-[#0E0D12] py-20 text-white">
      <div className="mx-auto mb-10 flex max-w-7xl flex-col justify-between gap-5 px-4 md:flex-row md:items-end md:px-8">
        <div>
          <p className={`${monoLabel} text-[#D4FF3A]`}>Level select</p>
          <h2 className="!py-0 mt-3 text-5xl font-extrabold leading-[0.95] tracking-[-0.045em] text-white md:text-6xl">{show.episodes.length} levels. One game.</h2>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/podcasts/${show.slug}`} className="mr-1 font-bold text-[#D4FF3A] no-underline hover:underline">
            See the whole board →
          </Link>
          {[-1, 1].map((dir) => (
            <button key={dir} onClick={() => scroll(dir)} aria-label={dir < 0 ? "Previous levels" : "More levels"} className="hidden h-11 w-11 place-items-center rounded-full border-[2.5px] border-white bg-transparent text-xl font-bold text-white transition-colors hover:bg-white hover:text-[#0E0D12] md:grid">
              {dir < 0 ? "←" : "→"}
            </button>
          ))}
        </div>
      </div>
      <ol ref={rail} className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-2 pb-6 [scrollbar-width:none] md:px-[max(2rem,calc((100vw-80rem)/2+2rem))] [&::-webkit-scrollbar]:hidden">
        {show.episodes.map((ep, i) => (
          <li key={ep.number} className="w-[13.5rem] shrink-0 snap-center">
            <LevelTile show={show} index={i} player={player} current={i === index} />
          </li>
        ))}
      </ol>
    </section>
  );
}

export function IncentivesEpisode({ show, episode }: { show: Show; episode: number }) {
  const player = usePlayer(show, episode);
  const share = useShare();
  const ep = show.episodes[episode];
  const props = { show, index: episode, player };
  return (
    <MotionConfig reducedMotion="user">
      <div className={ID_ROOT}>
        <PodcastSeo show={show} title={show.title} description={show.description} episode={episode} />
        <div key={ep.number}>
          <Hero {...props} share={share} />
          <ColdOpen {...props} />
          <EpisodeTranscript episode={ep} variant="arcade" />
          <NextLevel {...props} share={share} />
        </div>
        <LevelRail {...props} />
        <Follow show={show} />
        <Footer />
        <StickyPlayer show={show} player={player} share={share} />
        <ShareSheet share={share} theme={SHARE_THEME} />
      </div>
    </MotionConfig>
  );
}
