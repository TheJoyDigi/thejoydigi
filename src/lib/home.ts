import { getShow } from "./podcasts";

export type HomeData = {
  mm: { released: number; total: number; latestNumber: number; latestTitle: string };
  oc: { count: number; latestTitle: string };
};

/** Server-only: live facts for the landing page, read from the podcast feeds at build time. */
export function getHomeData(): HomeData {
  const mm = getShow("money-mastered");
  const oc = getShow("oc-pack");
  const mmLatest = mm.episodes[mm.episodes.length - 1];
  const ocLatest = oc.episodes[oc.episodes.length - 1];
  return {
    mm: {
      released: mm.episodes.length,
      total: Number(mm.description.match(/(\d+)-chapter/)?.[1] ?? mm.episodes.length),
      latestNumber: mmLatest?.number ?? 0,
      latestTitle: mmLatest?.shortTitle ?? "",
    },
    oc: { count: oc.episodes.length, latestTitle: ocLatest?.shortTitle ?? "" },
  };
}
