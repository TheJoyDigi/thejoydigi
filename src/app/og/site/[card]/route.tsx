import fs from "fs";
import path from "path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { THEMES } from "@/lib/email/brand";
import { getShow } from "@/lib/podcasts";
import { PUBLICATIONS } from "@/lib/publications";
import { fonts, NIGHT, publicImage, shareCard } from "../../card";

// Built once per deploy: /og/site/<card>.png share cards for pages that aren't a show, episode or post.
export const dynamic = "force-static";
export const dynamicParams = false;

const CARDS = ["home", "blog", "book-value-created", "case-study-the-blue-sock", "case-study-qrganiz"] as const;

export function generateStaticParams() {
  return CARDS.map((card) => ({ card: `${card}.png` }));
}

/** Mirrors the homepage hero: P7 logo, the headline, the portrait, on the night surface. */
async function home() {
  const logo = await sharp(path.join(process.cwd(), "public/brand/logo-horizontal-dark.svg")).resize(720).png().toBuffer();
  const portrait = await publicImage("/me/long-3d-hero.webp", 402, 600, "png");
  const glow = (x: number, y: number, size: number, rgb: string, alpha: number) => (
    <div style={{ position: "absolute", left: x, top: y, width: size, height: size, borderRadius: size / 2, background: `radial-gradient(circle, rgba(${rgb},${alpha}) 0%, rgba(${rgb},0) 70%)` }} />
  );
  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: NIGHT.card, fontFamily: "DM Sans" }}>
        {glow(640, -140, 720, "255,201,74", 0.32)}
        {glow(820, 180, 560, "255,46,136", 0.26)}
        {glow(560, 260, 520, "74,190,255", 0.2)}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: 700, padding: "48px 0 56px 64px" }}>
          <img src={`data:image/png;base64,${logo.toString("base64")}`} alt="" width={300} height={110} style={{ marginLeft: -10 }} />
          <div style={{ display: "flex", flexDirection: "column", marginTop: 36, color: NIGHT.heading, fontFamily: "Fraunces", fontSize: 72, lineHeight: 1.04, letterSpacing: -1.5 }}>
            <span>I make podcasts</span>
            <div style={{ display: "flex" }}>
              <span>for people</span>
              <span style={{ color: NIGHT.accent, marginLeft: 18 }}>who build.</span>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: 26, color: NIGHT.muted, fontSize: 28, lineHeight: 1.4 }}>
            Free shows on value, money and incentives, plus one for OC dog people.
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: "auto", fontSize: 26, fontWeight: 700 }}>
            <span style={{ color: NIGHT.text }}>Listen at&nbsp;</span>
            <span style={{ color: NIGHT.kicker }}>thejoydigi.com</span>
          </div>
        </div>
        <img src={portrait} alt="" width={402} height={600} style={{ position: "absolute", right: 70, bottom: 0 }} />
      </div>
    ),
    { width: 1200, height: 630, fonts }
  );
}

export async function GET(_req: Request, { params }: { params: Promise<{ card: string }> }) {
  const { card } = await params;
  switch (card) {
    case "home.png":
      return home();
    case "blog.png": {
      const pub = PUBLICATIONS.find((p) => p.slug === "value-created")!;
      return shareCard({
        theme: THEMES["value-created"],
        kicker: `${pub.name} · Articles`,
        title: "Value creation, in plain language",
        body: pub.description.match(/^.*?\./)![0],
        credit: "Produced by The Joy Digi",
        cta: "Read free at",
        icon: "arrow",
        image: { src: await publicImage(getShow("value-created").cover, 440, 440), width: 440, height: 440 },
      });
    }
    case "book-value-created.png": {
      // Same source as the book page, so the card always matches the manuscript.
      const book = JSON.parse(fs.readFileSync(path.join(process.cwd(), "book/value-created/book.json"), "utf8"));
      return shareCard({
        theme: THEMES["value-created"],
        kicker: "A book by The Joy Digi",
        title: book.title,
        body: book.subtitle,
        bodySize: 30,
        credit: "Produced by The Joy Digi · Paperback & Kindle",
        cta: "Read more at",
        icon: "arrow",
        image: { src: await publicImage("/books/value-created/cover.jpg", 312, 500), width: 312, height: 500 },
      });
    }
    case "case-study-the-blue-sock.png":
      return shareCard({
        theme: NIGHT,
        kicker: "Case study",
        title: "The Blue Sock",
        body: "A boutique dog-sitting marketplace for Irvine & Orange County: sitter profiles, portals and payments.",
        credit: "Built by The Joy Digi",
        cta: "Read it at",
        icon: "arrow",
        image: { src: await publicImage("/case-studies/bluesock-hero.webp", 480, 270), width: 480, height: 270 },
      });
    case "case-study-qrganiz.png":
      return shareCard({
        theme: NIGHT,
        kicker: "Case study",
        title: "QRganiz",
        body: "A QR code item tracker that helps people organize their belongings.",
        credit: "Built by The Joy Digi",
        cta: "Read it at",
        icon: "arrow",
        image: { src: await publicImage("/case-studies/qrganiz-hero.webp", 420, 420), width: 420, height: 420 },
      });
    default:
      return new Response("Not found", { status: 404 });
  }
}
