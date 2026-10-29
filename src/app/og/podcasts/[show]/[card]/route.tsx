import { THEMES, type ShowSlug } from "@/lib/email/brand";
import { getShow, type Show } from "@/lib/podcasts";
import { publicImage, shareCard } from "../../../card";

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

/** First sentence of the feed description, minus a leading "<Show>:" that would repeat the title. */
const tagline = (show: Show) => {
  const text = show.description.replace(new RegExp(`^${show.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}:\\s*`), "");
  const first = text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;
  return first.charAt(0).toUpperCase() + first.slice(1);
};

export async function GET(_req: Request, { params }: { params: Promise<{ show: string; card: string }> }) {
  const { show: slug, card } = await params;
  const theme = THEMES[slug as ShowSlug];
  const show = getShow(slug);
  const ep = card === "show.png" ? undefined : show.episodes.find((e) => `${e.number}.png` === card);
  if (!theme || (card !== "show.png" && !ep)) return new Response("Not found", { status: 404 });

  const unit = ep && /chapter/i.test(ep.title) ? "Chapter" : "Episode";
  return shareCard({
    theme,
    kicker: ep ? `${theme.name} · ${unit} ${ep.number}` : "A podcast by The Joy Digi",
    title: ep ? ep.shortTitle : theme.name,
    body: ep ? `${ep.duration} listen · ${ep.dateLabel}` : tagline(show),
    bodySize: ep ? 28 : 26,
    credit: slug === "anthropic-blogcast" ? "Produced by The Joy Digi · Not affiliated with Anthropic" : "Produced by The Joy Digi",
    cta: "Listen free at",
    image: { src: await publicImage(show.cover, 440, 440), width: 440, height: 440 },
  });
}
