import type { CSSProperties } from "react";
import { Nunito, Titan_One } from "next/font/google";

/**
 * OC Pack brand tokens. Pages read colors, fonts, radii and shadows from here,
 * so a restyle is a one-file swap: change the values below and every class in
 * OC_CLASS follows, because those classes point at the CSS variables, not hex codes.
 */

export const titan = Titan_One({ subsets: ["latin"], weight: "400", variable: "--oc-display", display: "swap" });
export const nunito = Nunito({ subsets: ["latin"], variable: "--oc-body", display: "swap" });

export const OC_BRAND = {
  sand: "#FDE3A7",
  cream: "#FFF4DA",
  sunset: "#FC7F46",
  coral: "#FF6F61",
  gold: "#FEBB55",
  teal: "#2E9CA6",
  palm: "#1F6B5C",
  brown: "#6B3410",
  link: "#B8431F",
} as const;

export const OC_FONT = {
  display: "var(--oc-display)",
  body: "var(--oc-body), system-ui, sans-serif",
  /** next/font classes that define --oc-display and --oc-body. Put on the page root. */
  vars: `${titan.variable} ${nunito.variable}`,
} as const;

export const OC_RADIUS = {
  card: "1.75rem",
  tile: "1rem",
  pill: "9999px",
} as const;

export const OC_SHADOW = {
  border: "3px",
  /** Sticker shadow offsets (literal in OC_CLASS strings; Tailwind 3 needs literals). */
  sticker: "5px",
  small: "3px",
  big: "10px",
} as const;

/** "#6B3410", 0.8 to "rgba(107,52,16,0.8)". Tailwind 3 can't apply /opacity to var() colors. */
const alpha = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
};

/** CSS variables for the page root. Every OC_CLASS entry resolves through these. */
export const ocBrandVars = {
  "--oc-muted": alpha(OC_BRAND.brown, 0.8),
  "--oc-dash": alpha(OC_BRAND.brown, 0.35),
  "--oc-sand": OC_BRAND.sand,
  "--oc-cream": OC_BRAND.cream,
  "--oc-sunset": OC_BRAND.sunset,
  "--oc-coral": OC_BRAND.coral,
  "--oc-gold": OC_BRAND.gold,
  "--oc-teal": OC_BRAND.teal,
  "--oc-palm": OC_BRAND.palm,
  "--oc-brown": OC_BRAND.brown,
  "--oc-link": OC_BRAND.link,
  "--oc-radius-card": OC_RADIUS.card,
  "--oc-radius-tile": OC_RADIUS.tile,
  "--oc-border": OC_SHADOW.border,
  fontFamily: OC_FONT.body,
  background: OC_BRAND.sand,
  color: OC_BRAND.brown,
} as CSSProperties;

/** Static Tailwind class strings (kept literal so Tailwind can see them).
 *  NOTE: Tailwind 3 cannot resolve a bare var() inside shadow-[...] (verified:
 *  neither shadow-[var(--x)] nor shadow-[shadow:var(--x)] generates CSS), so the
 *  sticker offsets are literal here while the color stays on var(--oc-brown). */
export const OC_CLASS = {
  display: "font-[family-name:var(--oc-display)] font-normal",
  sticker: "border-[length:var(--oc-border)] border-solid border-[color:var(--oc-brown)] shadow-[5px_5px_0_0_var(--oc-brown)]",
  stickerSm: "border-[length:var(--oc-border)] border-solid border-[color:var(--oc-brown)] shadow-[3px_3px_0_0_var(--oc-brown)]",
  stickerLg: "border-[length:var(--oc-border)] border-solid border-[color:var(--oc-brown)] shadow-[10px_10px_0_0_var(--oc-brown)]",
  card: "rounded-[var(--oc-radius-card)]",
  tile: "rounded-[var(--oc-radius-tile)]",
  text: "text-[color:var(--oc-brown)]",
  muted: "text-[color:var(--oc-muted)]",
  dashed: "border-[length:var(--oc-border)] border-dashed border-[color:var(--oc-dash)]",
  accentText: "text-[color:var(--oc-sunset)]",
  linkText: "text-[color:var(--oc-link)]",
  bgSand: "bg-[color:var(--oc-sand)]",
  bgCream: "bg-[color:var(--oc-cream)]",
  bgGold: "bg-[color:var(--oc-gold)]",
  bgTeal: "bg-[color:var(--oc-teal)]",
  selection: "selection:bg-[color:var(--oc-sunset)] selection:text-[color:var(--oc-cream)]",
} as const;
