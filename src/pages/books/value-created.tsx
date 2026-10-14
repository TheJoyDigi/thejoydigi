import fs from "node:fs";
import path from "node:path";
import { motion } from "framer-motion";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { EASE, Footer, GoldMotes, goldText, Mark, roman, VC_ROOT } from "@/components/podcast/value-created/theme";

// Amazon listings: paperback (ASIN B0HMFV4457, ISBN 9798160611600) and Kindle (ASIN B0HMFPCCHK).
const PAPERBACK_URL = "https://www.amazon.com/dp/B0HMFV4457";
const KINDLE_URL = "https://www.amazon.com/dp/B0HMFPCCHK";

const PAGE_URL = "https://www.thejoydigi.com/books/value-created";
const COVER = "/books/value-created/cover.jpg";
const SAMPLES = ["01", "02", "13", "19", "24", "00"];

type Part = { title: string; intro: string; chapters: { n: number; title: string }[] };
type Props = { title: string; subtitle: string; description: string; parts: Part[]; words: number; samples: { id: string; title: string; label: string }[] };

function BuyButtons({ big = false }: { big?: boolean }) {
  const size = big ? "px-8 py-4 text-base" : "px-7 py-3.5 text-sm";
  return (
    <>
      <a
        href={PAPERBACK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-b from-[#FFD47E] to-[#D1941F] ${size} font-semibold text-[#0C1130] no-underline shadow-[0_0_40px_-6px_rgba(242,168,29,0.7)] transition-transform duration-300 hover:-translate-y-0.5 hover:no-underline`}
      >
        Get the paperback
      </a>
      <a
        href={KINDLE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-3 rounded-full border border-[#F2A81D]/60 bg-[#F2A81D]/10 ${size} font-semibold text-[#FFD47E] no-underline transition-colors hover:border-[#F2A81D] hover:bg-[#F2A81D]/20 hover:no-underline`}
      >
        Kindle edition
      </a>
    </>
  );
}

function Hero({ title, subtitle, description }: Pick<Props, "title" | "subtitle" | "description">) {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_15%,rgba(242,168,29,0.16),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_85%,rgba(87,182,217,0.10),transparent_55%)]" />
        <Mark className="absolute -right-10 top-24 h-[420px] w-auto opacity-[0.12] md:right-16 md:h-[560px]" />
      </div>
      <GoldMotes />

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 pt-6 md:px-8">
        <Link href="/" className="text-sm tracking-[0.2em] text-[#F4EEDD]/70 uppercase no-underline hover:text-[#FFD47E] hover:no-underline">
          ← The Joy Digi
        </Link>
        <Link
          href="/podcasts/value-created"
          className="rounded-full border border-[#F2A81D]/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#FFD47E] no-underline hover:border-[#F2A81D] hover:no-underline"
        >
          Listen free
        </Link>
      </nav>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-5 pt-10 pb-24 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:pt-16">
        <div>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }} className="mb-6 font-[family-name:var(--vc-display)] text-xs md:text-sm tracking-[0.35em] text-[#F2A81D]">
            The book · Paperback & Kindle
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
            className="!py-0 font-[family-name:var(--vc-display)] text-[3.3rem] leading-[0.95] font-semibold sm:text-7xl lg:text-[6.2rem]"
            style={goldText}
          >
            {title.split(", ")[0]},
            <br />
            {title.split(", ")[1]}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.5 }} className="mt-8 max-w-xl font-[family-name:var(--vc-serif)] text-2xl md:text-[1.75rem] leading-snug italic text-[#F4EEDD]/90">
            {subtitle}
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }} className="mt-6 max-w-xl text-base leading-relaxed text-[#F4EEDD]/75">
            {description}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.8 }} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BuyButtons big />
            <Link
              href="/podcasts/value-created"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-[#F2A81D]/40 px-7 py-4 font-semibold text-[#F4EEDD] no-underline transition-colors hover:border-[#F2A81D] hover:bg-[#F2A81D]/10 hover:no-underline"
            >
              Or listen free
            </Link>
          </motion.div>
          <p className="mt-5 text-sm tracking-wide text-[#F4EEDD]/50">Produced by The Joy Digi</p>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.94, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.6, ease: EASE, delay: 0.2 }} className="relative mx-auto w-full max-w-[380px]">
          <div aria-hidden className="absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,rgba(242,168,29,0.28),transparent)] blur-2xl" />
          <div className="relative rotate-[1.5deg] overflow-hidden rounded-[4px] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(242,168,29,0.35)]">
            <Image src={COVER} alt={`${title} book cover: a gold diamond above a water drop`} width={1000} height={1600} priority sizes="(min-width: 1024px) 380px, 80vw" className="block h-auto w-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Facts({ parts, words }: Pick<Props, "parts" | "words">) {
  const chapters = parts.reduce((n, p) => n + p.chapters.length, 0);
  const facts = [
    [String(chapters), "chapters"],
    [String(parts.length), "parts"],
    [String(chapters + 1), "infographics"],
    [`${Math.round(words / 1000)}k`, "words"],
  ];
  return (
    <section className="border-y border-[#F2A81D]/15 bg-[#080E28] px-5 py-10 md:px-8" aria-label="About the book">
      <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-8 text-center md:grid-cols-4">
        {facts.map(([n, label]) => (
          <div key={label}>
            <dt className="sr-only">{label}</dt>
            <dd className="font-[family-name:var(--vc-display)] text-4xl text-[#FFD47E] md:text-5xl">{n}</dd>
            <dd className="mt-2 text-xs uppercase tracking-[0.3em] text-[#F4EEDD]/60">{label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Gallery({ samples }: Pick<Props, "samples">) {
  return (
    <section className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 font-[family-name:var(--vc-display)] text-xs tracking-[0.35em] text-[#F2A81D]">A picture in every chapter</p>
        <h2 className="!py-0 mb-4 max-w-3xl font-[family-name:var(--vc-serif)] text-4xl md:text-6xl font-medium leading-[1.05] text-[#F4EEDD]">
          Each chapter ends with <em className="text-[#FFD47E]">one page</em> that holds the whole idea.
        </h2>
        <p className="mb-14 max-w-2xl text-[#F4EEDD]/70">Plus three takeaways and a small exercise to try this week. Here are a few of the infographics.</p>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {samples.map((s, i) => (
            <motion.li key={s.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, ease: EASE, delay: (i % 3) * 0.1 }}>
              <a href={`/books/value-created/infographic-${s.id}.png`} target="_blank" rel="noopener noreferrer" className="group block no-underline hover:no-underline">
                <div className="overflow-hidden rounded-[6px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] ring-1 ring-[#F2A81D]/25 transition-transform duration-500 group-hover:-translate-y-1">
                  <Image src={`/books/value-created/infographic-${s.id}.png`} alt={`Infographic from ${s.label}: ${s.title}`} width={1600} height={2000} sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw" className="block h-auto w-full" />
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.25em] text-[#F2A81D]">{s.label}</p>
                <p className="mt-1 font-[family-name:var(--vc-serif)] text-xl text-[#F4EEDD]">{s.title}</p>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contents({ parts }: Pick<Props, "parts">) {
  return (
    <section className="border-t border-[#F2A81D]/15 bg-[#080E28] px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 font-[family-name:var(--vc-display)] text-xs tracking-[0.35em] text-[#F2A81D]">Contents</p>
        <h2 className="!py-0 mb-16 max-w-3xl font-[family-name:var(--vc-serif)] text-4xl md:text-6xl font-medium leading-[1.05] text-[#F4EEDD]">
          Five parts, from <em className="text-[#FFD47E]">seeing</em> value to <em className="text-[#FFD47E]">teaching</em> it.
        </h2>
        <ol className="grid gap-x-12 gap-y-14 md:grid-cols-2">
          {parts.map((p, i) => (
            <li key={p.title}>
              <p className="font-[family-name:var(--vc-display)] text-sm tracking-[0.3em] text-[#FFD47E]">Part {roman(i + 1)}</p>
              <h3 className="!py-0 mt-2 font-[family-name:var(--vc-serif)] text-3xl text-[#F4EEDD]">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#F4EEDD]/65">{p.intro}</p>
              <ol className="mt-5 space-y-2 border-l border-[#F2A81D]/25 pl-5">
                {p.chapters.map((c) => (
                  <li key={c.n} className="flex gap-3 text-[#F4EEDD]/85">
                    <span className="w-7 shrink-0 text-right font-[family-name:var(--vc-display)] text-sm text-[#F2A81D]/80">{c.n}</span>
                    <span>{c.title}</span>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function OneSentence() {
  return (
    <section className="relative overflow-hidden px-5 py-28 text-center md:px-8">
      <GoldMotes />
      <p className="mb-6 font-[family-name:var(--vc-display)] text-xs tracking-[0.35em] text-[#F2A81D]">The book in one sentence</p>
      <blockquote className="mx-auto max-w-4xl font-[family-name:var(--vc-serif)] text-3xl italic leading-snug text-[#F4EEDD] md:text-5xl">
        Find a real problem. Solve it well. <span className="text-[#FFD47E]">Charge less than the pain it caused.</span>
      </blockquote>
      <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <BuyButtons />
        <Link href="/podcasts/value-created" className="text-sm font-semibold text-[#FFD47E] underline-offset-4 hover:underline">
          Listen to the audiobook free
        </Link>
      </div>
    </section>
  );
}

export default function ValueCreatedBook(props: Props) {
  const { title, subtitle, description, parts, words, samples } = props;
  const fullTitle = `${title}: ${subtitle}`;
  const image = `https://www.thejoydigi.com${COVER}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: title,
    alternativeHeadline: subtitle,
    description,
    url: PAGE_URL,
    image,
    inLanguage: "en",
    workExample: [
      { "@type": "Book", bookFormat: "https://schema.org/Paperback", isbn: "9798160611600", url: PAPERBACK_URL },
      { "@type": "Book", bookFormat: "https://schema.org/EBook", url: KINDLE_URL },
    ],
    author: { "@type": "Organization", name: "The Joy Digi", url: "https://www.thejoydigi.com" },
    publisher: { "@type": "Organization", name: "The Joy Digi", url: "https://www.thejoydigi.com" },
    sameAs: [PAPERBACK_URL, KINDLE_URL],
  };
  return (
    <div className={VC_ROOT}>
      <NextSeo
        title={`${fullTitle} | Paperback & Kindle book by The Joy Digi`}
        description={description}
        canonical={PAGE_URL}
        openGraph={{ type: "book", url: PAGE_URL, title: fullTitle, description, siteName: "The Joy Digi", images: [{ url: image, width: 1000, height: 1600, alt: `${title} book cover` }] }}
        twitter={{ cardType: "summary_large_image" }}
      />
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <Hero title={title} subtitle={subtitle} description={description} />
      <Facts parts={parts} words={words} />
      <Gallery samples={samples} />
      <Contents parts={parts} />
      <OneSentence />
      <Footer />
    </div>
  );
}

// Reads the book's own source (book/value-created) so the page always matches the manuscript.
export const getStaticProps: GetStaticProps<Props> = async () => {
  const dir = path.join(process.cwd(), "book/value-created");
  const book = JSON.parse(fs.readFileSync(path.join(dir, "book.json"), "utf8"));
  const pad = (n: number) => String(n).padStart(2, "0");
  const titleOf = (n: number) => fs.readFileSync(path.join(dir, "manuscript", `${pad(n)}.md`), "utf8").match(/^# (.+)$/m)![1];
  const parts: Part[] = book.parts.map((p: { title: string; intro: string; chapters: number[] }) => ({ title: p.title, intro: p.intro, chapters: p.chapters.map((n) => ({ n, title: titleOf(n) })) }));
  const words = parts.flatMap((p) => p.chapters).reduce((sum, c) => sum + fs.readFileSync(path.join(dir, "manuscript", `${pad(c.n)}.md`), "utf8").split(/\s+/).filter(Boolean).length, 0);
  const samples = SAMPLES.map((id) => {
    const spec = JSON.parse(fs.readFileSync(path.join(dir, "infographics", `${id}.json`), "utf8"));
    return { id, title: spec.title as string, label: id === "00" ? "The whole book" : `Chapter ${Number(id)}` };
  });
  return { props: { title: book.title, subtitle: book.subtitle, description: book.description, parts, words, samples } };
};
