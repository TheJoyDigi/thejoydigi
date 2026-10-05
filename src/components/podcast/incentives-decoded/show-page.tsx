import { motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { Equalizer, fmtLeft, PauseIcon, PlayIcon, PodcastSeo } from "@/components/podcast/common";
import { ShareSheet, useShare, type ShareControl } from "@/components/podcast/share";
import { usePlayer, type Player } from "@/components/podcast/use-player";
import type { Show } from "@/lib/podcasts";
import { chunky, DecodeText, dotGrid, DragSticker, Follow, Footer, ID_ROOT, LevelTile, Marquee, monoLabel, Nav, pad, SHARE_THEME, SPRING, Sticker, StickyPlayer } from "./theme";

const TAGLINE = "Find the payoff, predict the person.";
const STEPS = [
  { n: "01", title: "Spot the game", copy: "Every level opens on a story where people act weird. Then we zoom out to the board they're actually playing on.", color: "#FF5CA8", sticker: "star" as const },
  { n: "02", title: "Find the payoff", copy: "Who gets rewarded? Who gets punished? Once you see the payoff, the weird behavior suddenly makes total sense.", color: "#4FE0E8", sticker: "coin" as const },
  { n: "03", title: "Make your move", copy: "Each level ends with one move to try today: on your boss, your feed, your group chat, or yourself.", color: "#FF8A3D", sticker: "pawn" as const },
];

const totalTime = (show: Show) => {
  const m = Math.round(show.episodes.reduce((s, ep) => s + ep.seconds, 0) / 60);
  return `${Math.floor(m / 60)}h ${m % 60}m`;
};

function Hero({ show, player, share }: { show: Show; player: Player; share: ShareControl }) {
  const bounds = useRef<HTMLElement>(null);
  const resume = player.resume;
  const start = resume?.index ?? 0;
  const startEp = show.episodes[start];
  const playing = player.index === start && player.playing;
  return (
    <section ref={bounds} className="relative isolate overflow-hidden border-b-[2.5px] border-[#0E0D12] bg-[#5B3DF5] text-white" style={dotGrid}>
      <Nav
        onShare={() => share.open({ show })}
        crumbs={
          <Link href="/podcasts" className={`${monoLabel} text-white/80 no-underline hover:text-[#D4FF3A] hover:no-underline`}>
            ← The Joy Digi
          </Link>
        }
      />
      <DragSticker kind="coin" bounds={bounds} className="right-[6%] top-24 h-24 w-24 md:h-36 md:w-36" rotate={12} delay={0.5} />
      <DragSticker kind="die" bounds={bounds} className="bottom-[16%] left-[46%] hidden h-24 w-24 lg:block" rotate={-14} delay={0.7} />
      <DragSticker kind="cursor" bounds={bounds} className="bottom-10 right-[40%] h-16 w-16 md:h-20 md:w-20" rotate={-8} delay={0.9} />
      <DragSticker kind="star" bounds={bounds} className="left-[52%] top-20 hidden h-16 w-16 md:block" rotate={10} delay={1.1} />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 pt-12 pb-20 md:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:pt-16 lg:pb-28">
        <div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="flex flex-wrap gap-2">
            {["New series", `${show.episodes.length} levels`, "~5 min each", "Alex × Jordan"].map((chip, i) => (
              <span key={chip} className={`${monoLabel} rounded-full border-2 border-[#0E0D12] px-3 py-1.5 ${i === 0 ? "bg-[#D4FF3A] text-[#0E0D12]" : "bg-white text-[#0E0D12]"}`}>
                {chip}
              </span>
            ))}
          </motion.div>
          <h1 className="!py-0 mt-7 font-extrabold leading-[0.86] tracking-[-0.055em]">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.1 }}
              className="block text-[3.6rem] text-white [paint-order:stroke_fill] [-webkit-text-stroke:5px_#0E0D12] [text-shadow:6px_6px_0_#0E0D12] sm:text-8xl lg:text-[8.2rem]"
            >
              Incentives,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={{ ...SPRING, delay: 0.35 }}
              className="mt-3 inline-block rounded-[22px] border-[3px] border-[#0E0D12] bg-[#D4FF3A] px-4 pt-1 pb-3 text-[3.9rem] text-[#0E0D12] shadow-[8px_8px_0_#0E0D12] sm:text-[6.5rem] lg:text-[9rem]"
            >
              <DecodeText text="Decoded" delay={500} duration={1100} />
            </motion.span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: 0.6 }} className="mt-8 max-w-xl text-2xl font-bold leading-tight tracking-[-0.02em] md:text-3xl">
            {TAGLINE}
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }} className="mt-3 max-w-xl text-lg text-white/80">
            {show.description.replace(/\s*Produced by The Joy Digi\.?$/, "")}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: 0.85 }} className="mt-9 flex flex-wrap items-center gap-4">
            <button onClick={() => player.playIndex(start)} className={`inline-flex items-center gap-3 rounded-2xl bg-[#D4FF3A] px-7 py-4 text-lg font-extrabold text-[#0E0D12] ${chunky}`}>
              {playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
              {resume ? `Continue Level ${pad(startEp.number)}` : "Press start: Level 01"}
              {resume && resume.time > 0 && <span className="text-sm font-bold opacity-60">· {fmtLeft(startEp.seconds - (player.index === start ? player.time : resume.time))}</span>}
            </button>
            <a href="#levels" className={`rounded-2xl bg-white px-6 py-4 text-lg font-extrabold text-[#0E0D12] no-underline hover:no-underline ${chunky}`}>
              Level select ↓
            </a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, rotate: 14, y: 60 }} animate={{ opacity: 1, rotate: 4, y: 0 }} transition={{ ...SPRING, delay: 0.25 }} whileHover={{ rotate: 0, scale: 1.02 }} className="relative mx-auto w-full max-w-[340px] lg:max-w-[420px]">
          <div className="overflow-hidden rounded-[28px] border-[3px] border-[#0E0D12] shadow-[12px_12px_0_#0E0D12]">
            <Image src={show.cover} alt="Incentives, Decoded cover art: the title on a sticker over violet, with a coin, a die and a game pawn" width={840} height={840} priority sizes="(min-width: 1024px) 420px, 340px" className="block h-auto w-full" />
          </div>
          <span className={`${monoLabel} absolute -bottom-5 -left-4 -rotate-6 rounded-full border-2 border-[#0E0D12] bg-[#FF5CA8] px-4 py-2 text-[#0E0D12] shadow-[4px_4px_0_#0E0D12]`}>{totalTime(show)} of hidden games</span>
        </motion.div>
      </div>
    </section>
  );
}

function HowToPlay() {
  return (
    <section className="relative px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className={`${monoLabel} text-[#5B3DF5]`}>How to play</p>
        <h2 className="!py-0 text-[#0E0D12] mt-3 max-w-3xl text-5xl font-extrabold leading-[0.95] tracking-[-0.045em] md:text-7xl">
          Every level is one <span className="rounded-xl bg-[#D4FF3A] px-2">hidden game</span>, decoded.
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 50, rotate: i % 2 ? 4 : -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: i === 1 ? 1.5 : -1.5 }}
              whileHover={{ rotate: 0, y: -6 }}
              viewport={{ once: true, margin: "-60px 0px" }}
              transition={{ ...SPRING, delay: i * 0.12 }}
              className="relative rounded-[24px] border-[2.5px] border-[#0E0D12] p-7 shadow-[7px_7px_0_#0E0D12]"
              style={{ background: step.color }}
            >
              <Sticker kind={step.sticker} className="absolute -right-4 -top-6 h-20 w-20" />
              <span className={`${monoLabel} rounded-full bg-[#0E0D12] px-3 py-1 text-white`}>Step {step.n}</span>
              <h3 className="!py-0 text-[#0E0D12] mt-6 text-3xl font-extrabold tracking-[-0.03em]">{step.title}</h3>
              <p className="mt-3 text-lg font-medium leading-snug text-[#0E0D12]/80">{step.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Levels({ show, player }: { show: Show; player: Player }) {
  const cleared = show.episodes.filter((_, i) => player.progress(i).done).length;
  return (
    <section id="levels" className="relative border-y-[2.5px] border-[#0E0D12] bg-[#0E0D12] px-4 py-24 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className={`${monoLabel} text-[#D4FF3A]`}>Level select</p>
            <h2 className="!py-0 mt-3 text-5xl font-extrabold leading-[0.95] tracking-[-0.045em] text-white md:text-7xl">Pick a level. Any level.</h2>
          </div>
          <div className="w-full max-w-xs">
            <div className={`${monoLabel} flex justify-between text-white/70`}>
              <span>XP</span>
              <span className="tabular-nums">
                {cleared}/{show.episodes.length} cleared
              </span>
            </div>
            <div className="mt-2 h-4 overflow-hidden rounded-full border-2 border-white/80 bg-white/10">
              <motion.div className="h-full bg-[#D4FF3A]" initial={{ width: 0 }} whileInView={{ width: `${(cleared / show.episodes.length) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} />
            </div>
            {player.current && (
              <p className={`${monoLabel} mt-3 flex items-center gap-2 text-[#D4FF3A]`}>
                <Equalizer color="#D4FF3A" active={player.playing} /> Now playing level {pad(player.current.number)}
              </p>
            )}
          </div>
        </div>
        <ol className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {show.episodes.map((ep, i) => (
            <motion.li
              key={ep.number}
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-30px 0px" }}
              transition={{ ...SPRING, delay: (i % 4) * 0.06 }}
            >
              <LevelTile show={show} index={i} player={player} />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function IncentivesShow({ show }: { show: Show }) {
  const player = usePlayer(show);
  const share = useShare();
  return (
    <MotionConfig reducedMotion="user">
      <div className={ID_ROOT}>
        <PodcastSeo show={show} title="Incentives, Decoded: find the payoff, predict the person" description={show.description} />
        <Hero show={show} player={player} share={share} />
        <Marquee
          className="border-b-[2.5px] border-[#0E0D12] bg-[#D4FF3A] py-3 text-xl font-extrabold uppercase tracking-[-0.01em] text-[#0E0D12] md:text-2xl"
          items={["Show me the incentive", "I'll show you the outcome", "Find the payoff", "Read the room", "Choose your games", "Play beautiful games"]}
        />
        <HowToPlay />
        <Levels show={show} player={player} />
        <Follow show={show} />
        <Footer />
        <StickyPlayer show={show} player={player} share={share} />
        <ShareSheet share={share} theme={SHARE_THEME} />
      </div>
    </MotionConfig>
  );
}
