import type { CSSProperties } from "react";
import { Figtree, Fraunces } from "next/font/google";

/**
 * OC Pack brand tokens (Direction C "Sundog", FINAL v1). Pages read colors, fonts,
 * radii and shadows from here, so a restyle is a one-file swap: change the values
 * below and every class in OC_CLASS follows, because those classes point at the
 * CSS variables, not hex codes.
 */

/** Variable Fraunces with the SOFT axis loaded; OC_CLASS.display sets wght 800 + SOFT 100. */
export const fraunces = Fraunces({ subsets: ["latin"], axes: ["SOFT"], variable: "--oc-display", display: "swap" });
/** Variable Figtree: 500 (Medium) for reading text, 800 (ExtraBold) for kickers and labels. */
export const figtree = Figtree({ subsets: ["latin"], variable: "--oc-body", display: "swap" });

export const OC_BRAND = {
  /** Primary background, 55% of a composition. */
  duneCream: "#FFE7B6",
  /** All reading type, frames, outlines. */
  saddleBrown: "#4B2102",
  /** Kickers, labels, links, interactive elements. */
  pacificTeal: "#05758B",
  goldenHour: "#FDB42B",
  sunDisc: "#FEC23E",
  /** Spark only: one small moment per composition, max 2%. Never a field. */
  sunsetCoral: "#FF7168",
  deepWater: "#04505F",
  nightSaddle: "#2A1405",
  /** Light panels and cards. */
  shell: "#FFF4DE",
  /** Highlights on teal. */
  seaGlass: "#57B9BC",
  /** Mark only (the bluff in the emblem). */
  bluff: "#8A4314",
} as const;

export const OC_FONT = {
  display: "var(--oc-display), Georgia, serif",
  body: "var(--oc-body), system-ui, sans-serif",
  /** next/font classes that define --oc-display and --oc-body. Put on the page root. */
  vars: `${fraunces.variable} ${figtree.variable}`,
} as const;

export const OC_RADIUS = {
  card: "1.5rem",
  tile: "1rem",
  pill: "9999px",
} as const;

export const OC_SHADOW = {
  border: "2px",
  /** Offset shadow sizes (literal in OC_CLASS strings; Tailwind 3 needs literals). */
  sticker: "4px",
  small: "3px",
  big: "6px",
} as const;

/** "#4B2102", 0.8 to "rgba(75,33,2,0.8)". Tailwind 3 can't apply /opacity to var() colors. */
const alpha = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
};

/** CSS variables for the page root. Every OC_CLASS entry resolves through these. */
export const ocBrandVars = {
  "--oc-muted": alpha(OC_BRAND.saddleBrown, 0.82),
  "--oc-dash": alpha(OC_BRAND.saddleBrown, 0.3),
  "--oc-line": alpha(OC_BRAND.saddleBrown, 0.16),
  "--oc-dune-cream": OC_BRAND.duneCream,
  "--oc-saddle-brown": OC_BRAND.saddleBrown,
  "--oc-pacific-teal": OC_BRAND.pacificTeal,
  "--oc-golden-hour": OC_BRAND.goldenHour,
  "--oc-sun-disc": OC_BRAND.sunDisc,
  "--oc-sunset-coral": OC_BRAND.sunsetCoral,
  "--oc-deep-water": OC_BRAND.deepWater,
  "--oc-night-saddle": OC_BRAND.nightSaddle,
  "--oc-shell": OC_BRAND.shell,
  "--oc-sea-glass": OC_BRAND.seaGlass,
  "--oc-bluff": OC_BRAND.bluff,
  "--oc-radius-card": OC_RADIUS.card,
  "--oc-radius-tile": OC_RADIUS.tile,
  "--oc-border": OC_SHADOW.border,
  fontFamily: OC_FONT.body,
  fontWeight: 500,
  background: OC_BRAND.duneCream,
  color: OC_BRAND.saddleBrown,
} as CSSProperties;

/** Static Tailwind class strings (kept literal so Tailwind can see them).
 *  NOTE: Tailwind 3 cannot resolve a bare var() inside shadow-[...] (verified:
 *  neither shadow-[var(--x)] nor shadow-[shadow:var(--x)] generates CSS), so the
 *  offsets are literal here while the color stays on var(--oc-saddle-brown). */
export const OC_CLASS = {
  /** Fraunces ExtraBold, SOFT 100. */
  display: "font-[family-name:var(--oc-display)] font-extrabold [font-variation-settings:'SOFT'_100]",
  /** Figtree ExtraBold, all caps, letter-spaced, Shell text on a Pacific Teal pill. */
  kicker:
    "inline-flex items-center rounded-full bg-[color:var(--oc-pacific-teal)] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-[color:var(--oc-shell)]",
  /** Figtree ExtraBold label without the pill. */
  label: "font-extrabold uppercase tracking-[0.14em]",
  sticker: "border-[length:var(--oc-border)] border-solid border-[color:var(--oc-saddle-brown)] shadow-[4px_4px_0_0_var(--oc-saddle-brown)]",
  stickerSm: "border-[length:var(--oc-border)] border-solid border-[color:var(--oc-saddle-brown)] shadow-[3px_3px_0_0_var(--oc-saddle-brown)]",
  stickerLg: "border-[length:var(--oc-border)] border-solid border-[color:var(--oc-saddle-brown)] shadow-[6px_6px_0_0_var(--oc-saddle-brown)]",
  frame: "border-[length:var(--oc-border)] border-solid border-[color:var(--oc-line)]",
  card: "rounded-[var(--oc-radius-card)]",
  tile: "rounded-[var(--oc-radius-tile)]",
  text: "text-[color:var(--oc-saddle-brown)]",
  muted: "text-[color:var(--oc-muted)]",
  dashed: "border-[length:var(--oc-border)] border-dashed border-[color:var(--oc-dash)]",
  accentText: "text-[color:var(--oc-golden-hour)]",
  linkText: "text-[color:var(--oc-pacific-teal)]",
  bgCream: "bg-[color:var(--oc-dune-cream)]",
  bgShell: "bg-[color:var(--oc-shell)]",
  bgGold: "bg-[color:var(--oc-golden-hour)]",
  bgSun: "bg-[color:var(--oc-sun-disc)]",
  bgTeal: "bg-[color:var(--oc-pacific-teal)]",
  bgDeepWater: "bg-[color:var(--oc-deep-water)]",
  selection: "selection:bg-[color:var(--oc-pacific-teal)] selection:text-[color:var(--oc-shell)]",
} as const;
