import type { CSSProperties } from "react";
import { Nunito, Titan_One } from "next/font/google";

/**
 * OC Pack brand tokens (OC Monogram / "Poolside Sticker" system). Pages read
 * colors, fonts, radii and shadows from here, so a restyle is a one-file swap:
 * change the values below and every class in OC_CLASS follows, because those
 * classes point at the CSS variables, not hex codes.
 *
 * Canonical sources (these win over the values below):
 *   podcast/shows/oc-pack/show/ART_DIRECTION.md
 *   docs/brand/social/oc-pack/README.md
 */

/** Titan One: display / headlines, 1-7 words. Brown on light; on color, cream with a brown outline. */
export const titanOne = Titan_One({ subsets: ["latin"], weight: "400", variable: "--oc-display", display: "swap" });
/** Variable Nunito: 700 (Bold) for reading text, 800/900 (ExtraBold/Black) for kickers and labels. */
export const nunito = Nunito({ subsets: ["latin"], variable: "--oc-body", display: "swap" });

export const OC_BRAND = {
  /** All outlines, body text, hard shadows. Never pure black. */
  brown: "#6B3410",
  /** Sticker borders, text panels, display letters. */
  cream: "#FFF4DA",
  /** Default canvas. */
  sand: "#FDE3A7",
  /** Hero color: highlights, sunbursts, kicker text on big art. */
  sunset: "#FC7F46",
  /** Labels, hearts, warm accents. Pink-coral, never red. */
  coral: "#FF6F61",
  /** Banner sun, the dog, floats. */
  gold: "#FEBB55",
  /** Avatar sunburst, banner sea. */
  teal: "#2E9CA6",
  /** Water highlights. */
  lagoon: "#7CC8C8",
  /** Palm fronds, dark accent text. */
  palm: "#1F6B5C",
} as const;

export const OC_FONT = {
  display: "var(--oc-display), system-ui, sans-serif",
  body: "var(--oc-body), system-ui, sans-serif",
  /** next/font classes that define --oc-display and --oc-body. Put on the page root. */
  vars: `${titanOne.variable} ${nunito.variable}`,
} as const;

export const OC_RADIUS = {
  card: "1.5rem",
  tile: "1rem",
  pill: "9999px",
} as const;

export const OC_SHADOW = {
  border: "3px",
  /** Offset shadow sizes (literal in OC_CLASS strings; Tailwind 3 needs literals). */
  sticker: "5px",
  small: "3px",
  big: "8px",
} as const;

/** "#6B3410", 0.8 to "rgba(107,52,16,0.8)". Tailwind 3 can't apply /opacity to var() colors. */
const alpha = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
};

/** CSS variables for the page root. Every OC_CLASS entry resolves through these. */
export const ocBrandVars = {
  "--oc-muted": alpha(OC_BRAND.brown, 0.82),
  "--oc-dash": alpha(OC_BRAND.brown, 0.35),
  "--oc-line": alpha(OC_BRAND.brown, 0.16),
  "--oc-brown": OC_BRAND.brown,
  "--oc-cream": OC_BRAND.cream,
  "--oc-sand": OC_BRAND.sand,
  "--oc-sunset": OC_BRAND.sunset,
  "--oc-coral": OC_BRAND.coral,
  "--oc-gold": OC_BRAND.gold,
  "--oc-teal": OC_BRAND.teal,
  "--oc-lagoon": OC_BRAND.lagoon,
  "--oc-palm": OC_BRAND.palm,
  "--oc-radius-card": OC_RADIUS.card,
  "--oc-radius-tile": OC_RADIUS.tile,
  "--oc-border": OC_SHADOW.border,
  fontFamily: OC_FONT.body,
  fontWeight: 700,
  background: OC_BRAND.sand,
  color: OC_BRAND.brown,
} as CSSProperties;

/** Static Tailwind class strings (kept literal so Tailwind can see them).
 *  NOTE: Tailwind 3 cannot resolve a bare var() inside shadow-[...] (verified:
 *  neither shadow-[var(--x)] nor shadow-[shadow:var(--x)] generates CSS), so the
 *  offsets are literal here while the color stays on var(--oc-brown). */
export const OC_CLASS = {
  /** Titan One display. */
  display: "font-[family-name:var(--oc-display)]",
  /** Nunito Black 900, all caps, +5% tracking, brown text on a Sunset pill. */
  kicker:
    "inline-flex items-center rounded-full bg-[color:var(--oc-sunset)] px-3 py-1 text-xs font-black uppercase tracking-[0.05em] text-[color:var(--oc-brown)]",
  /** Nunito ExtraBold label without the pill. */
  label: "font-extrabold uppercase tracking-[0.14em]",
  sticker: "border-[length:var(--oc-border)] border-solid border-[color:var(--oc-brown)] shadow-[5px_5px_0_0_var(--oc-brown)]",
  stickerSm: "border-[length:var(--oc-border)] border-solid border-[color:var(--oc-brown)] shadow-[3px_3px_0_0_var(--oc-brown)]",
  stickerLg: "border-[length:var(--oc-border)] border-solid border-[color:var(--oc-brown)] shadow-[8px_8px_0_0_var(--oc-brown)]",
  frame: "border-[length:var(--oc-border)] border-solid border-[color:var(--oc-line)]",
  card: "rounded-[var(--oc-radius-card)]",
  tile: "rounded-[var(--oc-radius-tile)]",
  text: "text-[color:var(--oc-brown)]",
  muted: "text-[color:var(--oc-muted)]",
  dashed: "border-[length:var(--oc-border)] border-dashed border-[color:var(--oc-dash)]",
  accentText: "text-[color:var(--oc-sunset)]",
  linkText: "text-[color:var(--oc-palm)]",
  bgSand: "bg-[color:var(--oc-sand)]",
  bgCream: "bg-[color:var(--oc-cream)]",
  bgSunset: "bg-[color:var(--oc-sunset)]",
  bgCoral: "bg-[color:var(--oc-coral)]",
  bgGold: "bg-[color:var(--oc-gold)]",
  bgTeal: "bg-[color:var(--oc-teal)]",
  bgLagoon: "bg-[color:var(--oc-lagoon)]",
  bgPalm: "bg-[color:var(--oc-palm)]",
  selection: "selection:bg-[color:var(--oc-sunset)] selection:text-[color:var(--oc-cream)]",
} as const;
