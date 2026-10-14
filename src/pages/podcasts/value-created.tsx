import { motion, useScroll, useTransform } from "framer-motion";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { episodePath, Equalizer, fmtLeft, ListenProgress, PauseIcon, PlatformLinks, PlayIcon, playOnPlainClick, PodcastSeo } from "@/components/podcast/common";
import { ShareIcon, ShareSheet, useShare, type ShareControl } from "@/components/podcast/share";
import { usePlayer, type Player } from "@/components/podcast/use-player";
import { EASE, Footer, GOLD_LIGHT, GoldMotes, goldText, Mark, PARTS, roman, SHARE_THEME, SPOTIFY_URL, StickyPlayer, Subscribe, totalChapters, VC_ROOT, YOUTUBE_URL } from "@/components/podcast/value-created/theme";
import { getShow, type Show } from "@/lib/podcasts";

function Hero({ show, player, total, share }: { show: Show; player: Player; total: number; share: ShareControl }) {
  const latest = show.episodes[show.episodes.length - 1];
  const resumeEp = player.resume ? show.episodes[player.resume.index] : null;
  const start = player.resume?.index ?? 0;
  const { scrollY } = useScroll();
  const yMark = useTransform(scrollY, [0, 700], [0, 90]);
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <motion.div aria-hidden style={{ y: yMark }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_15%,rgba(242,168,29,0.16),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_85%,rgba(87,182,217,0.10),transparent_55%)]" />
        <Mark className="absolute -right-10 top-24 h-[420px] w-auto opacity-[0.14] md:right-16 md:h-[560px]" />
      </motion.div>
      <GoldMotes />

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 pt-6 md:px-8">
        <Link href="/" className="text-sm tracking-[0.2em] text-[#F4EEDD]/70 uppercase no-underline hover:text-[#FFD47E] hover:no-underline">
          ← The Joy Digi
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => share.open({ show })}
            aria-label="Share this podcast"
            className="inline-flex items-center gap-2 rounded-full border border-[#F2A81D]/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#FFD47E] hover:border-[#F2A81D]"
          >
            <ShareIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
          <a href="#subscribe" className="rounded-full border border-[#F2A81D]/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#FFD47E] no-underline hover:border-[#F2A81D] hover:no-underline">
            Subscribe
          </a>
        </div>
      </nav>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pt-10 pb-40 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:pt-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="mb-6 font-[family-name:var(--vc-display)] text-xs md:text-sm tracking-[0.35em] text-[#F2A81D]"
          >
            An audiobook in {total} chapters
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
            className="!py-0 font-[family-name:var(--vc-display)] text-[3.3rem] leading-[0.95] font-semibold sm:text-7xl lg:text-[6.2rem]"
            style={goldText}
          >
            Value,
            <br />
            Created
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.5 }}
            className="mt-8 max-w-xl font-[family-name:var(--vc-serif)] text-2xl md:text-[1.75rem] leading-snug italic text-[#F4EEDD]/90"
          >
            The secret of value creation — what value is, how it is made, captured, and scaled.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-4 text-sm tracking-wide text-[#F4EEDD]/55"
          >
            Produced by {show.author} · Voiced by Alex &amp; Jordan
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.8 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <button
              onClick={() => player.playIndex(start)}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-b from-[#FFD47E] to-[#D1941F] px-7 py-4 font-semibold text-[#0C1130] shadow-[0_0_40px_-6px_rgba(242,168,29,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {player.index === start && player.playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
              {resumeEp ? `Continue Chapter ${roman(resumeEp.number)}` : "Begin Chapter I"}
              {resumeEp && player.resume!.time > 0 && <span className="text-sm font-medium opacity-70">· {fmtLeft(resumeEp.seconds - (player.index === start ? player.time : player.resume!.time))}</span>}
            </button>
            {latest && latest.number !== (resumeEp?.number ?? 1) && (
              <button
                onClick={() => player.playIndex(show.episodes.length - 1)}
                className="inline-flex items-center justify-center gap-3 rounded-full border border-[#F2A81D]/50 px-7 py-4 font-semibold text-[#FFD47E] transition-colors hover:border-[#F2A81D] hover:bg-[#F2A81D]/10"
              >
                Latest · Chapter {roman(latest.number)}
              </button>
            )}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }} className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#F4EEDD]/60">Also on</span>
            <PlatformLinks spotify={SPOTIFY_URL} youtube={YOUTUBE_URL} linkClassName="rounded-full border border-[#F2A81D]/35 bg-[#070B22]/50 px-4 py-2 text-sm font-semibold text-[#F4EEDD] backdrop-blur transition-colors hover:border-[#F2A81D]" />
            <Link
              href="/books/value-created"
              className="rounded-full border border-[#F2A81D]/35 bg-[#070B22]/50 px-4 py-2 text-sm font-semibold text-[#FFD47E] no-underline backdrop-blur transition-colors hover:border-[#F2A81D] hover:no-underline"
            >
              Read the book
            </Link>
            <a
              href="https://www.amazon.com/dp/B0HMFV4457"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-b from-[#FFD47E] to-[#D1941F] px-4 py-2 text-sm font-semibold text-[#0C1130] no-underline transition-transform hover:-translate-y-0.5 hover:no-underline"
            >
              Paperback on Amazon
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[460px]"
        >
          <div aria-hidden className="absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,rgba(242,168,29,0.30),transparent)] blur-2xl" />
          <div className="relative rotate-[1.5deg] rounded-[6px] border border-[#F2A81D]/60 p-2.5 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)]">
            <div className="rounded-[3px] border border-[#F2A81D]/30 p-1.5">
              <Image src={show.cover} alt="Value, Created cover art: a gold diamond above a water drop" width={920} height={920} priority sizes="(min-width: 1024px) 440px, 88vw" className="block h-auto w-full rounded-[2px]" />
            </div>
          </div>
          <p className="mt-6 text-center">
            <span className="inline-block rounded-full border border-[#F2A81D]/30 bg-[#070B22]/70 px-5 py-2 font-[family-name:var(--vc-display)] text-xs tracking-[0.3em] text-[#FFD47E] backdrop-blur">
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
    <section className="relative border-t border-[#F2A81D]/15 px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 font-[family-name:var(--vc-display)] text-xs tracking-[0.35em] text-[#F2A81D]">The Ledger</p>
            <h2 className="!py-0 font-[family-name:var(--vc-serif)] text-4xl md:text-6xl font-medium leading-none text-[#F4EEDD]">
              {released} of {total} chapters <em className="text-[#FFD47E]">minted.</em>
            </h2>
          </div>
          <p className="max-w-sm text-[#F4EEDD]/60">Each coin is a chapter. Gold ones are ready to play — tap one to start there.</p>
        </div>
        <div className="grid grid-cols-6 gap-3 sm:grid-cols-8 md:grid-cols-8 md:gap-4">
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
                className={`relative grid aspect-square place-items-center rounded-full font-[family-name:var(--vc-display)] text-sm font-semibold text-[#3A2A0E] transition-transform duration-300 hover:-translate-y-1 ${
                  active ? "ring-2 ring-[#FFD47E] ring-offset-4 ring-offset-[#0C1130]" : ""
                }`}
                style={{
                  background: "radial-gradient(circle at 35% 30%, #FFE9B8, #F2A81D 45%, #8C6A2E 100%)",
                  boxShadow: "inset 0 0 0 3px rgba(140,106,46,0.55), 0 10px 25px -10px rgba(242,168,29,0.6)",
                }}
              >
                {roman(i + 1)}
              </motion.button>
            ) : (
              <span
                key={i}
                aria-hidden
                className="grid aspect-square place-items-center rounded-full border border-dashed border-[#F2A81D]/30 font-[family-name:var(--vc-display)] text-[11px] text-[#F2A81D]/45"
              >
                {roman(i + 1)}
              </span>
            );
          })}
        </div>
        <div className="mt-10 h-px w-full bg-[#F2A81D]/15">
          <motion.div
            className="h-px bg-gradient-to-r from-[#FFD47E] to-[#F2A81D]"
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

function Contents({ show, player, share }: { show: Show; player: Player; share: ShareControl }) {
  const latest = show.episodes.length - 1;
  return (
    <section className="relative px-5 py-24 md:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-center font-[family-name:var(--vc-display)] text-xs tracking-[0.35em] text-[#F2A81D]">Contents</p>
        <h2 className="!py-0 mb-16 text-center font-[family-name:var(--vc-serif)] text-4xl md:text-6xl font-medium text-[#F4EEDD]">
          Read the table. <em className="text-[#FFD47E]">Press play.</em>
        </h2>
        <ol className="border-t border-[#F2A81D]/20">
          {show.episodes.map((ep, i) => {
            const active = player.index === i;
            return (
              <motion.li
                key={ep.audio}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px 0px" }}
                transition={{ duration: 0.8, ease: EASE }}
                className={`flex items-center border-b border-[#F2A81D]/20 transition-colors ${active ? "bg-[#F2A81D]/[0.07]" : "hover:bg-[#F2A81D]/[0.04]"}`}
              >
                <div
                  onClick={() => player.playIndex(i)}
                  className={`group grid min-w-0 flex-1 grid-cols-[3.2rem_1fr_auto] items-center gap-4 px-2 py-7 text-left transition-colors md:grid-cols-[5rem_1fr_auto_auto] md:gap-8 md:px-4 cursor-pointer`}
                >
                  <span className="font-[family-name:var(--vc-display)] text-2xl md:text-4xl font-semibold" style={goldText}>
                    {roman(ep.number)}
                  </span>
                  <span>
                    <span className="flex flex-wrap items-center gap-3">
                      <a href={episodePath(show, ep)} onClick={(e) => playOnPlainClick(e, () => player.playIndex(i))} className="font-[family-name:var(--vc-serif)] text-2xl md:text-3xl font-medium text-[#F4EEDD] group-hover:text-[#FFD47E] transition-colors no-underline hover:no-underline">
                        {ep.shortTitle}
                      </a>
                      {i === latest && (
                        <span className="rounded-full border border-[#F2A81D]/50 px-2.5 py-0.5 font-[family-name:var(--vc-display)] text-[10px] tracking-[0.25em] text-[#FFD47E]">
                          New
                        </span>
                      )}
                      {active && <Equalizer color={GOLD_LIGHT} active={player.playing} />}
                    </span>
                    <span className="mt-2 block font-[family-name:var(--vc-serif)] text-lg italic leading-snug text-[#F4EEDD]/60">{ep.description}</span>
                    <ListenProgress {...player.progress(i)} seconds={ep.seconds} color={GOLD_LIGHT} track="rgba(242,168,29,0.2)" className="mt-2 text-[#F4EEDD]/55" />
                    {ep.hasTranscript && (
                      <a
                        href={`${episodePath(show, ep)}#transcript`}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-2 inline-block text-sm font-semibold underline decoration-1 underline-offset-4 text-[#FFD47E]/80 hover:text-[#FFD47E]"
                      >
                        Read transcript
                      </a>
                    )}
                  </span>
                  <span className="hidden text-sm tabular-nums text-[#F4EEDD]/50 md:block">{ep.duration}</span>
                  <button
                    type="button"
                    aria-label={active && player.playing ? `Pause ${ep.shortTitle}` : `Play ${ep.shortTitle}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      player.playIndex(i);
                    }}
                    className={`grid h-12 w-12 place-items-center rounded-full border transition-all duration-300 ${
                      active ? "border-[#FFD47E] bg-[#FFD47E] text-[#0C1130]" : "border-[#F2A81D]/50 text-[#FFD47E] group-hover:border-[#FFD47E] group-hover:bg-[#FFD47E] group-hover:text-[#0C1130]"
                    }`}
                  >
                    {active && player.playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="ml-0.5 h-5 w-5" />}
                  </button>
                </div>
                <button
                  onClick={() => share.open({ show, episode: ep, time: active ? player.time : undefined })}
                  aria-label={`Share ${ep.shortTitle}`}
                  className="mr-1 grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#F4EEDD]/50 transition-colors hover:bg-[#F2A81D]/10 hover:text-[#FFD47E] md:mr-3"
                >
                  <ShareIcon className="h-[18px] w-[18px]" />
                </button>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Parts() {
  return (
    <section className="relative overflow-hidden border-y border-[#F2A81D]/15 bg-[#080E28] px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 font-[family-name:var(--vc-display)] text-xs tracking-[0.35em] text-[#F2A81D]">The Arc</p>
        <h2 className="!py-0 mb-16 max-w-3xl font-[family-name:var(--vc-serif)] text-4xl md:text-6xl font-medium leading-[1.05] text-[#F4EEDD]">
          Five parts, <em className="text-[#FFD47E]">one secret</em> — from seeing value to mastering it.
        </h2>
        <ol className="relative grid gap-5 md:grid-cols-5">
          <div aria-hidden className="absolute left-0 right-0 top-[2.1rem] hidden h-px bg-gradient-to-r from-transparent via-[#F2A81D]/50 to-transparent md:block" />
          {PARTS.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.12 }}
              className="relative flex items-center gap-4 md:flex-col md:items-start md:gap-6"
            >
              <span className="relative grid h-[4.2rem] w-[4.2rem] shrink-0 place-items-center rounded-full border border-[#F2A81D]/60 bg-[#0C1130] font-[family-name:var(--vc-display)] text-lg text-[#FFD47E]">
                {roman(i + 1)}
              </span>
              <span className="font-[family-name:var(--vc-serif)] text-2xl md:text-[1.7rem] leading-tight text-[#F4EEDD]">{s}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function ValueCreated({ show }: { show: Show }) {
  const player = usePlayer(show);
  const share = useShare();
  const total = totalChapters(show);
  return (
    <div className={VC_ROOT}>
      <PodcastSeo show={show} title="Value, Created — an audiobook on the secret of value creation" description={show.description} />
      <Hero show={show} player={player} total={total} share={share} />
      <Ledger show={show} player={player} total={total} />
      <Contents show={show} player={player} share={share} />
      <Parts />
      <Subscribe show={show} />
      <Footer />
      <StickyPlayer show={show} player={player} share={share} />
      <ShareSheet share={share} theme={SHARE_THEME} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => ({ props: { show: getShow("value-created") } });
