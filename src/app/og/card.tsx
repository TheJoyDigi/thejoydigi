import fs from "fs";
import path from "path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import type { ShowTheme } from "@/lib/email/brand";

export type CardTheme = Pick<ShowTheme, "card" | "text" | "muted" | "heading" | "kicker" | "accent" | "onAccent">;

/** The site's own dark surface (hero, header, footer) for cards that aren't about one show. */
export const NIGHT: CardTheme = {
  card: "#0B0B0C",
  text: "#FDF6EC",
  muted: "#B9B2A6",
  heading: "#FDF6EC",
  kicker: "#FFC94A",
  accent: "#FFC94A",
  onAccent: "#0B0B0C",
};

const font = (file: string) => fs.readFileSync(path.join(process.cwd(), "src", "assets", "fonts", file));

export const fonts = [
  { name: "Fraunces", data: font("Fraunces-SemiBold.ttf"), weight: 600 as const, style: "normal" as const },
  { name: "DM Sans", data: font("DMSans-Medium.ttf"), weight: 500 as const, style: "normal" as const },
  { name: "DM Sans", data: font("DMSans-Bold.ttf"), weight: 700 as const, style: "normal" as const },
];

/** Satori can't decode WebP and covers run to 3000px, so re-encode at 2× the box before inlining. */
export async function publicImage(file: string, width: number, height: number, format: "jpeg" | "png" = "jpeg") {
  const img = sharp(path.join(process.cwd(), "public", file)).resize(width * 2, height * 2);
  const buf = format === "png" ? await img.png().toBuffer() : await img.jpeg({ quality: 82 }).toBuffer();
  return `data:image/${format};base64,${buf.toString("base64")}`;
}

export const titleSize = (text: string) => (text.length <= 22 ? 78 : text.length <= 40 ? 66 : text.length <= 64 ? 56 : 48);

const ICONS = {
  play: "M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5Z",
  arrow: "M4 11h12.17l-4.58-4.59L13 5l7 7-7 7-1.41-1.41L16.17 13H4z",
};

type ShareCardProps = {
  theme: CardTheme;
  kicker: string;
  title: string;
  body: string;
  bodySize?: number;
  credit: string;
  cta: string;
  icon?: keyof typeof ICONS;
  image: { src: string; width: number; height: number };
};

/** 1200×630 card: kicker, title, body and CTA on the left, cover art on the right. */
export function shareCard({ theme, kicker, title, body, bodySize = 26, credit, cta, icon = "play", image }: ShareCardProps) {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: theme.card, padding: 64, fontFamily: "DM Sans" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 56 }}>
          <div style={{ display: "flex", alignItems: "center", color: theme.kicker, fontSize: 24, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase" }}>
            <div style={{ width: 14, height: 14, background: theme.accent, transform: "rotate(45deg)", marginRight: 16 }} />
            {kicker}
          </div>
          <div style={{ display: "block", marginTop: 28, color: theme.heading, fontFamily: "Fraunces", fontSize: titleSize(title), lineHeight: 1.08, letterSpacing: -1, lineClamp: 4 }}>
            {title}
          </div>
          <div style={{ display: "block", marginTop: 24, color: theme.muted, fontSize: bodySize, lineHeight: 1.4, lineClamp: 3 }}>{body}</div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
            <div style={{ color: theme.muted, fontSize: 22, marginBottom: 12 }}>{credit}</div>
            <div style={{ display: "flex", alignItems: "center", fontSize: 26, fontWeight: 700 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 22, background: theme.accent, marginRight: 16 }}>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d={ICONS[icon]} fill={theme.onAccent} />
                </svg>
              </div>
              <span style={{ color: theme.text }}>{cta}&nbsp;</span>
              <span style={{ color: theme.kicker }}>thejoydigi.com</span>
            </div>
          </div>
        </div>
        <img src={image.src} alt="" width={image.width} height={image.height} style={{ alignSelf: "center", borderRadius: 28, border: "2px solid rgba(255,255,255,0.12)", boxShadow: "0 24px 60px rgba(0,0,0,0.35)" }} />
      </div>
    ),
    { width: 1200, height: 630, fonts }
  );
}
