import Image from "next/image";
import Link from "next/link";
import { CtaBand, PageHero, Reveal, Section } from "@/components/marketing/kit";
import MainLayout from "../_layouts";

type Book = {
  title: string;
  blurb: string;
  cover: string;
  href: string;
  cta: string;
  bg: string;
  text: string;
  sub: string;
  button: string;
};

const BOOKS: Book[] = [
  {
    title: "Value, Created",
    blurb: "The secret of value creation, in 32 chapters with an infographic for every one. Read it on Kindle or listen free.",
    cover: "/books/value-created/cover.jpg",
    href: "/books/value-created",
    cta: "See the book",
    bg: "bg-[#0C1130] bg-[radial-gradient(circle_at_85%_25%,rgba(242,168,29,0.35),transparent_55%)]",
    text: "text-[#FFD47E]",
    sub: "text-[#F4EEDD]/75",
    button: "border border-[#F2A81D]/60 text-[#FFD47E] group-hover:bg-[#FFD47E] group-hover:text-[#0C1130]",
  },
  {
    title: "Money, Mastered",
    blurb: "An audiobook on money and investing, one clear chapter at a time.",
    cover: "/podcasts/money-mastered/cover.jpg",
    href: "/podcasts/money-mastered",
    cta: "Listen now",
    bg: "bg-[#060E1A] bg-[radial-gradient(ellipse_at_80%_20%,rgba(217,181,106,0.25),transparent_60%)]",
    text: "text-[#F3DE9E]",
    sub: "text-[#EFE6D2]/75",
    button: "border border-[#D9B56A]/60 text-[#F3DE9E] group-hover:bg-[#F3DE9E] group-hover:text-[#060E1A]",
  },
  {
    title: "Incentives, Decoded",
    blurb: "A 32-chapter series on the hidden payoffs behind how people act.",
    cover: "/podcasts/incentives-decoded/cover.jpg",
    href: "/podcasts/incentives-decoded",
    cta: "Listen now",
    bg: "bg-[#5B3DF5] bg-[radial-gradient(rgba(255,255,255,0.16)_1.2px,transparent_1.2px)] [background-size:22px_22px]",
    text: "text-white",
    sub: "text-white/90",
    button: "border-[2.5px] border-[#0E0D12] bg-[#D4FF3A] text-[#0E0D12] shadow-[4px_4px_0_#0E0D12] group-hover:-translate-y-0.5",
  },
];

export default function Books() {
  return (
    <MainLayout
      title="Books | The Joy Digi"
      description="Books produced by The Joy Digi: Value, Created, Money, Mastered, and Incentives, Decoded. Read, or listen free."
    >
      <PageHero
        kicker="Books"
        title="Ideas worth"
        accent="finishing."
        lead="Three books on value, money, and why people do what they do. Each one is also a free audiobook."
      />
      <Section tone="white">
        <div className="grid gap-8 lg:grid-cols-3">
          {BOOKS.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.1} className="h-full">
              <Link
                href={b.href}
                className={`group flex h-full flex-col gap-6 overflow-hidden rounded-[2rem] p-6 md:p-8 ${b.bg} shadow-[0_40px_80px_-40px_rgba(0,59,73,0.6)] transition-transform duration-300 hover:-translate-y-1 no-underline hover:no-underline`}
              >
                <Image src={b.cover} alt={`${b.title} cover`} width={360} height={360} className="h-auto w-40 rounded-2xl shadow-xl" />
                <h2 className={`!py-0 font-display text-3xl font-[460] leading-tight ${b.text}`}>{b.title}</h2>
                <p className={b.sub}>{b.blurb}</p>
                <span className={`mt-auto inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ${b.button}`}>
                  {b.cta} →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <CtaBand />
    </MainLayout>
  );
}
