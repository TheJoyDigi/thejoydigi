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

const { display, kicker, label, stickerSm, stickerLg, frame, card, text, muted, linkText, bgShell, bgSun } = OC_CLASS;

const BULLETS = [
  { icon: "5", text: "5 dog-friendly events, trails, and beach days across Orange County" },
  { icon: "paw", text: "Trail guides with parking, shade, and leash rules spelled out" },
  { icon: "$", text: "The Vet Bill Playbook: what things cost and what to ask" },
];

/**
 * The shared email form hardcodes the old palette and takes no className/style props,
 * so it is restyled here from a scoped wrapper. Every selector beats the form's single
 * Tailwind class on specificity (wrapper class + element), so no !important is needed.
 */
const FORM_CSS = `
.oc-form input {
  border-width: var(--oc-border);
  border-color: var(--oc-saddle-brown);
  color: var(--oc-saddle-brown);
  font-family: var(--oc-body), system-ui, sans-serif;
  font-weight: 600;
}
.oc-form input::placeholder { color: var(--oc-saddle-brown); opacity: 0.45; }
.oc-form input:focus { --tw-ring-color: var(--oc-pacific-teal); }
.oc-form button[type="submit"] {
  border-width: var(--oc-border);
  border-color: var(--oc-saddle-brown);
  background: var(--oc-pacific-teal);
  color: var(--oc-shell);
  box-shadow: 3px 3px 0 0 var(--oc-saddle-brown);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}
.oc-form button[type="submit"]:hover { background: var(--oc-deep-water); }
.oc-form button[type="submit"]:focus-visible { outline: 3px solid var(--oc-golden-hour); outline-offset: 2px; }
.oc-form > p {
  border-width: var(--oc-border);
  border-color: var(--oc-pacific-teal);
  background: var(--oc-shell);
  color: var(--oc-deep-water);
}
.oc-form p[role="alert"] { color: var(--oc-saddle-brown); }
.oc-form p[role="alert"]::before {
  content: "";
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  margin-right: 0.4rem;
  border-radius: 9999px;
  background: var(--oc-sunset-coral);
}
`;

/** Sundog mark (FINAL), inlined from mark.svg. Pure shapes, no font dependency.
 *  `id` keeps the clip/mask ids unique when the mark appears more than once. */
function SundogMark({ id, className = "", title }: { id: string; className?: string; title?: string }) {
  const clip = `${id}-clip-arch`;
  const sun = `${id}-sun-arch`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="170 70 660 870"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <defs>
        <clipPath id={clip}>
          <path d="M206,904 L206,400 A294,294 0 0 1 794,400 L794,904 Z" />
        </clipPath>
      </defs>
      <path d="M170,940 L170,400 A330,330 0 0 1 830,400 L830,940 Z" fill="#4B2102" />
      <g clipPath={`url(#${clip})`}>
        <rect width="1000" height="1000" fill="#FFE7B6" />
        <mask id={sun}>
          <rect width="1000" height="1000" fill="#fff" />
          <g fill="#000">
            <rect x="0" y="464.0" width="1000" height="9.0" />
            <rect x="0" y="495.0" width="1000" height="15.0" />
            <rect x="0" y="532.0" width="1000" height="21.0" />
          </g>
        </mask>
        <g mask={`url(#${sun})`}>
          <circle cx="500" cy="596" r="275" fill="#FDB42B" />
          <circle cx="500" cy="596" r="176.0" fill="#FEC23E" />
        </g>
        <rect x="0" y="596" width="1000" height="404" fill="#05758B" />
        <g stroke="#57B9BC" strokeLinecap="round">
          <path d="M578,620.0 L764,620.0" strokeWidth="7.0" />
          <path d="M578,650.0 L764,650.0" strokeWidth="7.8" />
          <path d="M578,684.5 L764,684.5" strokeWidth="8.8" />
          <path d="M639,732.0 L764,732.0" strokeWidth="9.8" />
          <path d="M666,777.6 L764,777.6" strokeWidth="11.0" />
        </g>
        <path
          d="M190,920 L190,740 C220,729 270,724 330,724 L577,724 C603,724 619,740 633,768 C653,810 677,856 727,892 C753,910 777,920 807,928 L807,920 Z"
          fill="#8A4314"
        />
        <path
          transform="translate(272,358.0) scale(1.22)"
          d="M240,39 C248,39 253,45 253,53 C253,62 248,69 240,70 C232,71 222,72 214,74 C208,76 205,82 200,86 C194,90 186,92 183,98 C181,104 182,110 184,118 C188,132 198,140 207,152 C216,168 214,184 211,196 L209,284 C221,285 231,291 231,300 L188,300 L189,218 C189,208 180,203 173,209 C160,222 150,248 152,279 C163,281 172,289 172,300 L60,300 C46,300 34,296 28,288 C14,295 -8,297 -24,291 C-34,287 -36,276 -28,275 C-22,281 -12,284 2,282 C12,281 20,276 24,268 C16,242 22,210 40,186 C54,166 72,150 88,136 C100,126 108,114 112,102 C114,96 116,90 117,84 C113,90 105,92 101,86 C95,76 97,52 107,34 C117,18 140,8 162,10 C180,12 190,20 198,27 C208,34 224,38 240,39 Z"
          fill="#4B2102"
        />
      </g>
      <path d="M206,904 L206,400 A294,294 0 0 1 794,400 L794,904 Z" fill="none" stroke="#FFE7B6" strokeWidth="10" />
    </svg>
  );
}

const Paw = ({ className = "", fill = OC_BRAND.saddleBrown }: { className?: string; fill?: string }) => (
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
      <path d="M0,70 C180,30 360,110 540,70 C720,30 900,110 1080,70 C1260,30 1350,60 1440,50 L1440,140 L0,140 Z" fill={OC_BRAND.pacificTeal} />
      <path d="M0,95 C200,60 400,125 600,92 C800,60 1000,125 1200,92 C1320,72 1380,85 1440,80 L1440,140 L0,140 Z" fill={OC_BRAND.deepWater} />
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
      <style>{FORM_CSS}</style>

      <header className="mx-auto flex w-full max-w-xl items-center justify-between gap-3 px-5 pt-3">
        <Link href="/podcasts/oc-pack" className={`flex min-h-11 items-center gap-2.5 ${text}`}>
          <SundogMark id="oc-header-mark" className="h-10 w-auto shrink-0" />
          <span className={`${display} text-xl leading-none`}>The OC Pack</span>
        </Link>
        {/* Deep Water, not Pacific Teal: teal on cream is 4.42:1, under AA at this size. */}
        <span className={`${label} text-[0.7rem] text-[color:var(--oc-deep-water)]`}>Free every Friday</span>
      </header>

      <main className="mx-auto w-full max-w-xl flex-1 px-5 pb-14 pt-6">
        <span className={kicker}>
          <span aria-hidden className="mr-2 inline-block h-2 w-2 rounded-full bg-[color:var(--oc-sunset-coral)]" />
          This weekend
        </span>

        <h1 className={`!py-0 mt-4 ${display} text-[2.15rem] leading-[1.08] ${text} sm:text-5xl`}>
          Every Friday:{" "}
          <span className="whitespace-nowrap bg-[linear-gradient(transparent_60%,var(--oc-golden-hour)_60%)] px-1">5 dog things</span> to do in
          Orange County this weekend.
        </h1>

        <div className="mt-5 flex items-center gap-8">
          <p className={`flex-1 text-[1.05rem] leading-relaxed ${muted}`}>
            One free email for OC dog parents. Events, trails, and beach days, picked fresh every week.
          </p>
          <SundogMark id="oc-hero-mark" title="The OC Pack" className="h-[6.5rem] w-auto shrink-0" />
        </div>

        <div className={`mt-6 ${card} ${bgShell} p-4 ${stickerLg}`}>
          <div className="oc-form">
            <OcPackEmailForm />
          </div>
          <p className={`mt-3 text-center text-sm ${muted}`}>Free. Every Friday. Unsubscribe anytime.</p>
        </div>

        <h2 className={`!py-0 mt-12 ${display} text-2xl ${text}`}>In every Friday email</h2>
        <ul className="mt-5 space-y-3">
          {BULLETS.map((b) => (
            <li key={b.text} className={`flex items-center gap-4 ${card} ${bgShell} p-4 ${frame}`}>
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${bgSun} ${display} text-xl ${text} ${stickerSm} !shadow-none`}>
                {b.icon === "paw" ? <Paw className="h-6 w-6" /> : b.icon}
              </span>
              <span className={`text-base leading-snug ${text}`}>{b.text}</span>
            </li>
          ))}
        </ul>

        <div className={`mt-10 ${card} ${bgShell} ${frame} p-5 text-center`}>
          <span className={kicker}>The podcast</span>
          <p className={`mt-3 ${text}`}>3 episodes live. New episodes every Thursday.</p>
          <Link
            href="/podcasts/oc-pack"
            className={`mt-1 inline-flex min-h-11 items-center gap-2 font-extrabold underline decoration-2 underline-offset-4 ${linkText}`}
          >
            <Paw className="h-4 w-4" fill={OC_BRAND.pacificTeal} /> Listen to The OC Pack podcast
          </Link>
        </div>
      </main>

      <footer>
        <Waves />
        <div className="bg-[color:var(--oc-deep-water)] px-5 pb-10 pt-2 text-center">
          <p className="text-sm text-[color:var(--oc-shell)]">
            A production of{" "}
            <Link
              href="/"
              className="inline-flex min-h-11 items-center font-extrabold text-[color:var(--oc-shell)] underline decoration-[color:var(--oc-sea-glass)] decoration-2 underline-offset-4"
            >
              The Joy Digi
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
