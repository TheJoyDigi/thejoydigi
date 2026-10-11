import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { OC_BRAND, OC_CLASS, OC_FONT, ocBrandVars } from "@/components/podcast/oc-pack-brand";
import { OcPackEmailForm } from "@/components/podcast/oc-pack-email-form";

const PAGE_URL = "https://www.thejoydigi.com/oc-pack-weekend";
const TITLE = "OC Pack Weekend: 5 Dog Things in Orange County, Every Friday";
const DESCRIPTION =
  "Every Friday: 5 dog things to do in Orange County this weekend. Events, trails, and beach days for OC dog parents. Free, in your inbox.";
const CARD = "https://www.thejoydigi.com/podcasts/oc-pack/cover-v2.jpg";

const { display, kicker, label, stickerSm, stickerLg, frame, card, text, muted, linkText, bgCream, bgGold } = OC_CLASS;

const BULLETS = [
  { icon: "5", text: "5 dog-friendly events, trails, and beach days across Orange County" },
  { icon: "paw", text: "Trail guides with parking, shade, and leash rules spelled out" },
  { icon: "$", text: "The Vet Bill Playbook: what things cost and what to ask" },
];

/** OC Monogram mark, from the approved series cover. Reads down to avatar size. */
function MonogramMark({ size, title }: { size: number; title?: string }) {
  return (
    <Image
      src="/podcasts/oc-pack/cover-v2.jpg"
      alt={title ?? "The OC Pack logo: a golden retriever and an orange tabby peeking over big orange OC letters"}
      width={size * 2}
      height={size * 2}
      className="rounded-full border-[3px] border-[color:var(--oc-brown)] shadow-[3px_3px_0_0_var(--oc-brown)]"
      style={{ width: size, height: size }}
    />
  );
}

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
      <path d="M0,70 C180,30 360,110 540,70 C720,30 900,110 1080,70 C1260,30 1350,60 1440,50 L1440,140 L0,140 Z" fill={OC_BRAND.lagoon} />
      <path d="M0,95 C200,60 400,125 600,92 C800,60 1000,125 1200,92 C1320,72 1380,85 1440,80 L1440,140 L0,140 Z" fill={OC_BRAND.teal} />
      <path d="M0,95 C200,60 400,125 600,92 C800,60 1000,125 1200,92 C1320,72 1380,85 1440,80" fill="none" stroke={OC_BRAND.cream} strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" />
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
          images: [{ url: CARD, width: 3000, height: 3000, alt: "The OC Pack" }],
        }}
        twitter={{ cardType: "summary_large_image", site: "@thejoydigi" }}
      />

      <header className="mx-auto flex w-full max-w-xl items-center justify-between gap-3 px-5 pt-3">
        <Link href="/podcasts/oc-pack" className={`flex min-h-11 items-center gap-2.5 ${text}`}>
          <MonogramMark size={40} title="The OC Pack" />
          <span className={`${display} text-xl leading-none`}>The OC Pack</span>
        </Link>
        {/* Palm, not teal: dark accent text on Sand. */}
        <span className={`${label} text-[0.7rem] text-[color:var(--oc-palm)]`}>Free every Friday</span>
      </header>

      <main className="mx-auto w-full max-w-xl flex-1 px-5 pb-14 pt-6">
        <span className={kicker}>
          <span aria-hidden className="mr-2 inline-block h-2 w-2 rounded-full bg-[color:var(--oc-coral)]" />
          This weekend
        </span>

        <h1 className={`!py-0 mt-4 ${display} text-[2.15rem] leading-[1.08] ${text} sm:text-5xl`}>
          Every Friday:{" "}
          <span className="whitespace-nowrap bg-[linear-gradient(transparent_60%,var(--oc-sunset)_60%)] px-1">5 dog things</span> to do in
          Orange County this weekend.
        </h1>

        <div className="mt-5 flex items-center gap-8">
          <p className={`flex-1 text-[1.05rem] leading-relaxed ${muted}`}>
            One free email for OC dog parents. Events, trails, and beach days, picked fresh every week.
          </p>
          <MonogramMark size={104} title="The OC Pack" />
        </div>

        <div className={`mt-6 ${card} ${bgCream} p-4 ${stickerLg}`}>
          <OcPackEmailForm />
          <p className={`mt-3 text-center text-sm ${muted}`}>Free. Every Friday. Unsubscribe anytime.</p>
        </div>

        <h2 className={`!py-0 mt-12 ${display} text-2xl ${text}`}>In every Friday email</h2>
        <ul className="mt-5 space-y-3">
          {BULLETS.map((b) => (
            <li key={b.text} className={`flex items-center gap-4 ${card} ${bgCream} p-4 ${frame}`}>
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${bgGold} ${display} text-xl ${text} ${stickerSm}`}>
                {b.icon === "paw" ? <Paw className="h-6 w-6" /> : b.icon}
              </span>
              <span className={`text-base leading-snug ${text}`}>{b.text}</span>
            </li>
          ))}
        </ul>

        <div className={`mt-10 ${card} ${bgCream} ${frame} p-5 text-center`}>
          <span className={kicker}>The podcast</span>
          <p className={`mt-3 ${text}`}>3 episodes live. New episodes every Thursday.</p>
          <Link
            href="/podcasts/oc-pack"
            className={`mt-1 inline-flex min-h-11 items-center gap-2 font-extrabold underline decoration-2 underline-offset-4 ${linkText}`}
          >
            <Paw className="h-4 w-4" fill={OC_BRAND.teal} /> Listen to The OC Pack podcast
          </Link>
        </div>
      </main>

      <footer>
        <Waves />
        <div className="bg-[color:var(--oc-teal)] px-5 pb-10 pt-2 text-center">
          <p className="text-sm text-[color:var(--oc-cream)]">
            A production of{" "}
            <Link
              href="/"
              className="inline-flex min-h-11 items-center font-extrabold text-[color:var(--oc-cream)] underline decoration-[color:var(--oc-lagoon)] decoration-2 underline-offset-4"
            >
              The Joy Digi
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
