import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand, PageHero, Reveal, Section } from "@/components/marketing/kit";
import { getShow } from "@/lib/podcasts";
import MainLayout from "../_layouts";

type ShowCard = { slug: string; title: string; description: string; cover: string; count: number; latest: string };

const SKINS: Record<string, { bg: string; text: string; sub: string; cta: string; label: string; unit: string }> = {
  "money-mastered": {
    bg: "bg-[#060E1A] bg-[radial-gradient(ellipse_at_80%_20%,rgba(217,181,106,0.25),transparent_60%)]",
    text: "text-[#F3DE9E]",
    sub: "text-[#EFE6D2]/70",
    cta: "border border-[#D9B56A]/60 text-[#F3DE9E] group-hover:bg-[#F3DE9E] group-hover:text-[#060E1A]",
    label: "Audiobook series",
    unit: "chapters",
  },
  "oc-pack": {
    bg: "bg-[#FDE3A7] bg-[radial-gradient(circle_at_85%_25%,rgba(252,127,70,0.45),transparent_55%)]",
    text: "text-[#6B3410]",
    sub: "text-[#6B3410]/75",
    cta: "border-[3px] border-[#6B3410] bg-[#FC7F46] text-[#FFF4DA] group-hover:-translate-y-0.5",
    label: "Weekly show",
    unit: "episodes",
  },
};

export default function Podcasts({ shows }: { shows: ShowCard[] }) {
  return (
    <MainLayout
      title="Podcasts | The Joy Digi"
      description="Podcasts produced by The Joy Digi: Money, Mastered — an audiobook on money and investing — and The OC Pack, the weekly show for Orange County pet parents."
    >
      <PageHero
        kicker="Podcasts"
        title="Shows we"
        accent="produce."
        lead="Original audio series, written, produced, and published by The Joy Digi."
      />
      <Section tone="white">
        <div className="grid gap-8 lg:grid-cols-2">
          {shows.map((show, i) => {
            const skin = SKINS[show.slug];
            return (
              <Reveal key={show.slug} delay={i * 0.1}>
                <Link
                  href={`/podcasts/${show.slug}`}
                  className={`group grid h-full gap-6 overflow-hidden rounded-[2rem] p-6 md:grid-cols-[180px_1fr] md:p-8 ${skin.bg} shadow-[0_40px_80px_-40px_rgba(0,59,73,0.6)] transition-transform duration-300 hover:-translate-y-1 no-underline hover:no-underline`}
                >
                  <Image src={show.cover} alt={`${show.title} cover art`} width={360} height={360} className="h-auto w-40 rounded-2xl shadow-xl md:w-full" />
                  <div className="flex flex-col">
                    <p className={`text-xs font-bold uppercase tracking-[0.25em] ${skin.sub}`}>
                      {skin.label} · {show.count} {show.count === 1 ? skin.unit.slice(0, -1) : skin.unit}
                    </p>
                    <h2 className={`!py-0 mt-3 font-display text-3xl md:text-4xl font-[460] leading-tight ${skin.text}`}>{show.title}</h2>
                    <p className={`mt-3 line-clamp-3 ${skin.sub}`}>{show.description}</p>
                    <p className={`mt-3 text-sm font-semibold ${skin.sub}`}>Latest: {show.latest}</p>
                    <span className={`mt-6 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ${skin.cta}`}>
                      Listen now →
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>
      <CtaBand />
    </MainLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const shows = ["money-mastered", "oc-pack"].map((slug) => {
    const s = getShow(slug);
    return {
      slug,
      title: s.title,
      description: s.description,
      cover: s.cover,
      count: s.episodes.length,
      latest: s.episodes[s.episodes.length - 1]?.shortTitle ?? "",
    };
  });
  return { props: { shows } };
};
