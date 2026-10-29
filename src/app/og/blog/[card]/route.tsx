import fs from "fs";
import path from "path";
import { THEMES, type ShowSlug } from "@/lib/email/brand";
import { getShow } from "@/lib/podcasts";
import { getPostSummaries } from "@/lib/posts";
import { PUBLICATIONS } from "@/lib/publications";
import { publicImage, shareCard } from "../../card";

// Built once per deploy: /og/blog/<slug>.png, a 1200×630 card per post in its publication's colours.
export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPostSummaries()).map((post) => ({ card: `${post.slug}.png` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ card: string }> }) {
  const { card } = await params;
  const post = (await getPostSummaries()).find((p) => `${p.slug}.png` === card);
  if (!post) return new Response("Not found", { status: 404 });

  const publication = PUBLICATIONS.find((p) => p.slug === post.publication);
  // Posts without a cover get the frontmatter default, which isn't a real file.
  const cover = fs.existsSync(path.join(process.cwd(), "public", post.coverImage)) ? post.coverImage : getShow("value-created").cover;
  return shareCard({
    theme: THEMES[post.publication as ShowSlug] ?? THEMES["value-created"],
    kicker: `${publication?.name ?? "The Joy Digi"} · Article`,
    title: post.title,
    body: `${post.readingTime} min read · ${post.dateLabel}`,
    bodySize: 28,
    credit: "Produced by The Joy Digi",
    cta: "Read free at",
    icon: "arrow",
    image: { src: await publicImage(cover, 440, 440), width: 440, height: 440 },
  });
}
