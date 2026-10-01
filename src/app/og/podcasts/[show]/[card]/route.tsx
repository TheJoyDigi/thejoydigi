import fs from "fs";
import path from "path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { THEMES, type ShowSlug } from "@/lib/email/brand";
import { getShow, type Show } from "@/lib/podcasts";

// Built once per deploy: /og/podcasts/<show>/show.png and /og/podcasts/<show>/<episode>.png (1200×630 share cards).
export const dynamic = "force-static";
export const dynamicParams = false;

const slugs = Object.keys(THEMES) as ShowSlug[];

export function generateStaticParams() {
  return slugs.flatMap((show) => [
    { show, card: "show.png" },
    ...getShow(show).episodes.map((ep) => ({ show, card: `${ep.number}.png` })),
  ]);
}

const font = (file: string) => fs.readFileSync(path.join(process.cwd(), "src", "assets", "fonts", file));

const fonts = [
  { name: "Fraunces", data: font("Fraunces-SemiBold.ttf"), weight: 600 as const, style: "normal" as const },
  { name: "DM Sans", data: font("DMSans-Medium.ttf"), weight: 500 as const, style: "normal" as const },
  { name: "DM Sans", data: font("DMSans-Bold.ttf"), weight: 700 as const, style: "normal" as const },
];

/** Covers are up to 3000px; downscale before inlining so each card stays small. */
async function coverDataUrl(show: Show) {
  const jpg = await sharp(path.join(process.cwd(), "public", show.cover)).resize(880, 880).jpeg({ quality: 82 }).toBuffer();
  return `data:image/jpeg;base64,${jpg.toString("base64")}`;
}

/** First sentence of the feed description, minus a leading "<Show>:" that would repeat the title. */
const tagline = (show: Show) => {
  const text = show.description.replace(new RegExp(`^${show.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}:\\s*`), "");
  const first = text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;
  return first.charAt(0).toUpperCase() + first.slice(1);
};

const titleSize = (text: string) => (text.length <= 22 ? 78 : text.length <= 40 ? 66 : text.length <= 64 ? 56 : 48);

export async function GET(_req: Request, { params }: { params: Promise<{ show: string; card: string }> }) {
  const { show: slug, card } = await params;
  const theme = THEMES[slug as ShowSlug];
  const show = getShow(slug);
  const ep = card === "show.png" ? undefined : show.episodes.find((e) => `${e.number}.png` === card);
  if (!theme || (card !== "show.png" && !ep)) return new Response("Not found", { status: 404 });

  const unit = ep && /chapter/i.test(ep.title) ? "Chapter" : "Episode";
  const kicker = ep ? `${theme.name} · ${unit} ${ep.number}` : "A podcast by The Joy Digi";
  const title = ep ? ep.shortTitle : theme.name;
  const body = ep ? `${ep.duration} listen · ${ep.dateLabel}` : tagline(show);
  const credit = slug === "anthropic-blogcast" ? "Produced by The Joy Digi · Not affiliated with Anthropic" : "Produced by The Joy Digi";
  const cover = await coverDataUrl(show);

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
          <div style={{ display: "block", marginTop: 24, color: theme.muted, fontSize: ep ? 28 : 26, lineHeight: 1.4, lineClamp: 3 }}>{body}</div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
            <div style={{ color: theme.muted, fontSize: 22, marginBottom: 12 }}>{credit}</div>
            <div style={{ display: "flex", alignItems: "center", fontSize: 26, fontWeight: 700 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 22, background: theme.accent, marginRight: 16 }}>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5Z" fill={theme.onAccent} />
                </svg>
              </div>
              <span style={{ color: theme.text }}>Listen free at&nbsp;</span>
              <span style={{ color: theme.kicker }}>thejoydigi.com</span>
            </div>
          </div>
        </div>
        <img src={cover} alt="" width={440} height={440} style={{ alignSelf: "center", borderRadius: 28, border: "2px solid rgba(255,255,255,0.12)", boxShadow: "0 24px 60px rgba(0,0,0,0.35)" }} />
      </div>
    ),
    { width: 1200, height: 630, fonts }
  );
}
