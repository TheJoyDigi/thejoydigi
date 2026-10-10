import { NextSeo } from "next-seo";
import Link from "next/link";
import React from "react";
import { OC_BRAND, OC_CLASS, OC_FONT, ocBrandVars } from "@/components/podcast/oc-pack-brand";
import { OcPackEmailForm } from "@/components/podcast/oc-pack-email-form";

const PAGE_URL = "https://www.thejoydigi.com/oc-pack-weekend";
const TITLE = "OC Pack Weekend: 5 Dog Things in Orange County, Every Friday";
const DESCRIPTION =
  "Every Friday: 5 dog things to do in Orange County this weekend. Events, trails, and beach days for OC dog parents. Free, in your inbox.";
const CARD = "https://www.thejoydigi.com/og/podcasts/oc-pack/show.png";

const { display, sticker, stickerSm, stickerLg, card, text, muted, linkText, bgCream, bgGold, dashed } = OC_CLASS;

const BULLETS = [
  { icon: "5", text: "5 dog-friendly events, trails, and beach days across Orange County" },
  { icon: "paw", text: "Trail guides with parking, shade, and leash rules spelled out" },
  { icon: "$", text: "The Vet Bill Playbook: what things cost and what to ask" },
];

const Paw = ({ className = "", fill = OC_BRAND.brown }: { className?: string; fill?: string }) => (
  <svg viewBox="-12 -12 24 24" className={className} aria-hidden>
    <g fill={fill}>
      <ellipse cx="0" cy="4" rx="6.5" ry="5.5" />
      <circle cx="-6.5" cy="-4" r="2.6" />
      <circle cx="-2.2" cy="-8" r="2.6" />
      <circle cx="2.2" cy="-8" r="2.6" />
      <circle cx="6.5" cy="-4" r="2.6" />
    </g>
  </svg>
);

function Waves() {
  return (
    <svg aria-hidden viewBox="0 0 1440 140" preserveAspectRatio="none" className="block h-16 w-full">
      <path d="M0,70 C180,30 360,110 540,70 C720,30 900,110 1080,70 C1260,30 1350,60 1440,50 L1440,140 L0,140 Z" fill={OC_BRAND.teal} opacity="0.55" />
      <path d="M0,95 C200,60 400,125 600,92 C800,60 1000,125 1200,92 C1320,72 1380,85 1440,80 L1440,140 L0,140 Z" fill={OC_BRAND.teal} />
    </svg>
  );
}

export default function OcPackWeekend() {
  return (
    <div className={`${OC_FONT.vars} flex min-h-screen flex-col overflow-x-clip ${OC_CLASS.selection}`} style={ocBrandVars}>
      <NextSeo
        title={TITLE}
        description={DESCRIPTION}
        canonical={PAGE_URL}
        openGraph={{
          type: "website",
          url: PAGE_URL,
          title: TITLE,
          description: DESCRIPTION,
          siteName: "The Joy Digi",
          images: [{ url: CARD, width: 1200, height: 630, alt: "The OC Pack" }],
        }}
        twitter={{ cardType: "summary_large_image", site: "@thejoydigi" }}
      />

      <main className="mx-auto w-full max-w-xl flex-1 px-5 pb-14 pt-8">
        <span className={`inline-flex -rotate-3 items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold uppercase tracking-wide ${bgGold} ${text} ${stickerSm}`}>
          <Paw className="h-4 w-4" /> The OC Pack
        </span>

        <h1 className={`!py-0 mt-6 ${display} text-[2.35rem] leading-[1.08] ${text} sm:text-5xl`}>
          Every Friday:{" "}
          <span className="whitespace-nowrap bg-[linear-gradient(transparent_58%,var(--oc-gold)_58%)] px-1">5 dog things</span> to do in
          Orange County this weekend.
        </h1>
        <p className={`mt-4 text-lg font-semibold leading-relaxed ${muted}`}>
          One free email for OC dog parents. Events, trails, and beach days, picked fresh every week.
        </p>

        <div className={`mt-7 ${card} ${bgCream} p-5 ${stickerLg}`}>
          <OcPackEmailForm />
          <p className={`mt-3 text-center text-sm font-bold ${muted}`}>Free. Every Friday. Unsubscribe anytime.</p>
        </div>

        <h2 className={`!py-0 mt-12 ${display} text-2xl ${text}`}>In every Friday email</h2>
        <ul className="mt-5 space-y-4">
          {BULLETS.map((b) => (
            <li key={b.text} className={`flex items-center gap-4 ${card} ${bgCream} p-4 ${sticker}`}>
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${bgGold} ${display} text-xl ${text} ${stickerSm} !shadow-none`}>
                {b.icon === "paw" ? <Paw className="h-6 w-6" /> : b.icon}
              </span>
              <span className={`text-base font-bold leading-snug ${text}`}>{b.text}</span>
            </li>
          ))}
        </ul>

        <div className={`mt-10 ${card} ${dashed} p-5 text-center`}>
          <p className={`font-bold ${text}`}>3 episodes live. New episodes every Thursday.</p>
          <Link
            href="/podcasts/oc-pack"
            className={`mt-1 inline-flex min-h-11 items-center gap-2 font-extrabold underline decoration-2 underline-offset-4 ${linkText}`}
          >
            <Paw className="h-4 w-4" fill={OC_BRAND.link} /> Listen to The OC Pack podcast
          </Link>
        </div>
      </main>

      <footer>
        <Waves />
        <div className="bg-[color:var(--oc-teal)] px-5 pb-10 pt-2 text-center">
          <p className="text-sm font-bold text-[color:var(--oc-cream)]">
            A production of{" "}
            <Link href="/" className="inline-flex min-h-11 items-center text-[color:var(--oc-cream)] underline decoration-2 underline-offset-4">
              The Joy Digi
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
