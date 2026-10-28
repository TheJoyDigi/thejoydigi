import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { HomeData, ShowSlug } from "@/lib/home";
import { RevealWords, SectionKicker } from "../landing-art/primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

const LINES: Record<ShowSlug, { line: string; note?: string }> = {
  "value-created": { line: "How value gets created, priced, and kept, one chapter at a time." },
  "money-mastered": { line: "Personal finance without the fog, one money system per chapter." },
  "incentives-decoded": { line: "Why people do what they do, one incentive at a time." },
  "oc-pack": { line: "Life with dogs in Orange County: beaches, vets, trails, and the people who love them." },
  "anthropic-blogcast": {
    line: "Anthropic's newest writing, read aloud as a podcast.",
    note: "Independent, not affiliated with Anthropic.",
  },
};

export default function Shows({ data }: { data: HomeData }) {
  return (
    <section id="shows" className="relative scroll-mt-16 bg-[#FDF6EC] px-4 pt-20 pb-12 md:pt-28 md:pb-16">
      <div className="container mx-auto">
        <div className="mb-14 grid gap-6 md:mb-16 md:grid-cols-2 md:items-end">
          <div>
            <SectionKicker>THE SHOWS</SectionKicker>
            <h2 className="font-bungee !py-0 !font-normal mt-4 text-[2.4rem] leading-[1.04] tracking-[-0.005em] text-[#1B140D] sm:text-5xl md:text-6xl">
              <RevealWords text="Five shows." /> <RevealWords text="One studio." delay={0.12} wordClassName="joy-accent" />
            </h2>
          </div>
          <p className="max-w-md text-lg text-[#1B140D]/70 md:justify-self-end">
            Every show is hosted by Long, and every episode is free to listen.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {data.shows.map((show, i) => {
            const copy = LINES[show.slug];
            return (
              <motion.article
                key={show.slug}
                id={`show-${show.slug}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px 0px" }}
                transition={{ duration: 0.7, ease: EASE, delay: (i % 3) * 0.1 }}
                className="card-joy group relative flex w-full scroll-mt-24 flex-col overflow-hidden rounded-[2rem] border border-[#1B140D]/10 bg-white p-7 sm:w-[calc(50%-12px)] lg:w-[calc((100%-48px)/3)]"
              >
                <div className="relative mx-auto mb-6 aspect-square w-full transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:rotate-[-2deg]">
                  <Image
                    src={show.cover}
                    alt={`${show.title} cover`}
                    fill
                    sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw"
                    className="rounded-2xl object-cover shadow-[0_18px_40px_-18px_rgba(27,20,13,0.45)]"
                  />
                </div>
                <h3 className="font-ui !py-0 font-bold tracking-[-0.02em] text-2xl text-[#1B140D]">
                  <Link href={show.pageUrl} className="text-[#1B140D] no-underline after:absolute after:inset-0 hover:text-[#1B140D] hover:no-underline">
                    {show.title}
                  </Link>
                </h3>
                <p className="mt-3 text-[#1B140D]/75">{copy.line}</p>
                {copy.note && <p className="mt-2 text-sm text-[#1B140D]/50">{copy.note}</p>}
                <div className="mt-auto pt-6">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#1B140D]/10 bg-[#FDF6EC] px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-[#1B140D]/70">
                    <span className="h-2 w-2 rounded-full bg-[#FFC94A]" />
                    {show.count} {show.count === 1 ? "episode" : "episodes"}
                  </span>
                  {show.latestShortTitle && (
                    <p className="mt-3 text-sm text-[#1B140D]/65">
                      <span className="font-semibold text-[#1B140D]">Latest:</span> {show.latestShortTitle}
                    </p>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
