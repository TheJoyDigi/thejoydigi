import { getShow } from "./podcasts";

/** Landing order for the Shows section; each slug is a folder under public/podcasts. */
export const SHOW_SLUGS = ["value-created", "money-mastered", "incentives-decoded", "oc-pack", "anthropic-blogcast"] as const;

export type ShowSlug = (typeof SHOW_SLUGS)[number];

/** Card display names where the feed title is too long for the card grid. */
const DISPLAY_TITLES: Partial<Record<ShowSlug, string>> = {
  "oc-pack": "The OC Pack",
};

export type HomeShow = {
  slug: ShowSlug;
  title: string;
  cover: string;
  /** Show.pageUrl served site-relative, so previews and dev stay on their own host. */
  pageUrl: string;
  count: number;
  latestShortTitle: string;
};

export type HomeData = {
  mm: { released: number; total: number; latestNumber: number; latestTitle: string };
  oc: { count: number; latestTitle: string };
  shows: HomeShow[];
};

/** Server-only: live facts for the landing page, read from the podcast feeds at build time. */
export function getHomeData(): HomeData {
  const mm = getShow("money-mastered");
  const oc = getShow("oc-pack");
  const mmLatest = mm.episodes[mm.episodes.length - 1];
  const ocLatest = oc.episodes[oc.episodes.length - 1];
  const shows = SHOW_SLUGS.map((slug) => {
    const show = slug === "money-mastered" ? mm : slug === "oc-pack" ? oc : getShow(slug);
    return {
      slug,
      title: DISPLAY_TITLES[slug] ?? show.title,
      cover: show.cover,
      pageUrl: show.pageUrl.replace(/^https?:\/\/(www\.)?thejoydigi\.com/, ""),
      count: show.episodes.length,
      latestShortTitle: show.episodes[show.episodes.length - 1]?.shortTitle ?? "",
    };
  });
  return {
    mm: {
      released: mm.episodes.length,
      total: Number(mm.description.match(/(\d+)-chapter/)?.[1] ?? mm.episodes.length),
      latestNumber: mmLatest?.number ?? 0,
      latestTitle: mmLatest?.shortTitle ?? "",
    },
    oc: { count: oc.episodes.length, latestTitle: ocLatest?.shortTitle ?? "" },
    shows,
  };
}
