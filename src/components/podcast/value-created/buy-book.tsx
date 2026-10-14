import Image from "next/image";
import React from "react";

// Amazon listings: paperback (ASIN B0HMFV4457, ISBN 9798160611600) and Kindle (ASIN B0HMFPCCHK).
export const PAPERBACK_URL = "https://www.amazon.com/dp/B0HMFV4457";
export const KINDLE_URL = "https://www.amazon.com/dp/B0HMFPCCHK";
// US list prices on Amazon.com, confirmed by Long 2026-10-13; update here if they change.
export const PAPERBACK_PRICE = "$14.99";
export const KINDLE_PRICE = "$9.99";

function BookIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z" />
      <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
    </svg>
  );
}

function TabletIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="5" y="2" width="14" height="20" rx="2.5" />
      <path d="M9 6h6M9 10h6M9 14h4" />
    </svg>
  );
}

const btn =
  "group inline-flex flex-1 items-center justify-center gap-3 rounded-2xl px-6 py-4 no-underline transition-transform duration-300 hover:-translate-y-0.5 hover:no-underline";

/** The two Amazon formats as one card; the free audiobook CTA always sits above it. */
export function BuyBook({ heading = "Own the book", compact = false, className = "" }: { heading?: string; compact?: boolean; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-[#F2A81D]/45 bg-gradient-to-br from-[#1B2150] via-[#121741] to-[#0C1130] p-5 shadow-[0_0_60px_-20px_rgba(242,168,29,0.55)] sm:p-6 ${className}`}>
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#F2A81D]/15 blur-3xl" />
      {compact ? (
        <p className="relative flex items-baseline justify-between gap-3 font-[family-name:var(--vc-display)] text-xs tracking-[0.35em] text-[#F2A81D]">
          <span className="whitespace-nowrap">{heading}</span>
          <span className="hidden whitespace-nowrap font-sans text-[11px] tracking-wide text-[#F4EEDD]/55 sm:inline">Paperback &amp; Kindle · on Amazon</span>
        </p>
      ) : (
      <div className="relative flex items-center gap-5">
        <Image src="/books/value-created/cover.jpg" alt="Value, Created book cover" width={160} height={256} className="hidden h-auto w-[72px] shrink-0 rounded-md shadow-[0_10px_30px_-8px_rgba(0,0,0,0.8)] sm:block" />
        <div>
          <p className="font-[family-name:var(--vc-display)] text-xs tracking-[0.35em] text-[#F2A81D]">{heading}</p>
          <p className="mt-1 font-[family-name:var(--vc-serif)] text-xl italic text-[#F4EEDD] md:text-2xl">Keep it on your shelf or in your pocket.</p>
          <p className="mt-1 text-xs tracking-wide text-[#F4EEDD]/55">32 chapters · an infographic in every one · on Amazon</p>
        </div>
      </div>
      )}
      <div className={`relative ${compact ? "mt-4" : "mt-5"} flex flex-col gap-3 sm:flex-row`}>
        <a
          href={PAPERBACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btn} bg-gradient-to-b from-[#FFD47E] to-[#D1941F] text-[#0C1130] shadow-[0_0_40px_-8px_rgba(242,168,29,0.8)]`}
        >
          <BookIcon className="h-6 w-6 shrink-0" />
          <span className="text-left leading-tight">
            <span className="block text-base font-bold">Buy the paperback</span>
            <span className="block text-xs font-semibold"><span className="font-extrabold">{PAPERBACK_PRICE}</span> <span className="opacity-70">· print edition</span></span>
          </span>
        </a>
        <a href={KINDLE_URL} target="_blank" rel="noopener noreferrer" className={`${btn} bg-[#F4EEDD] text-[#0C1130] shadow-[0_0_40px_-12px_rgba(244,238,221,0.6)]`}>
          <TabletIcon className="h-6 w-6 shrink-0" />
          <span className="text-left leading-tight">
            <span className="block text-base font-bold">Get it on Kindle</span>
            <span className="block text-xs font-semibold"><span className="font-extrabold">{KINDLE_PRICE}</span> <span className="opacity-70">· read instantly</span></span>
          </span>
        </a>
      </div>
    </div>
  );
}
