import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { getShow } from "@/lib/podcasts";
import { getPostSummaries, postPath } from "@/lib/posts";

// Built inside `next build` so Vercel's adapter ships it; a postbuild file in public/ lands after the output is collected.
export const dynamic = "force-static";

const SITE = "https://www.thejoydigi.com";
const PAGES = path.join(/* turbopackIgnore: true */ process.cwd(), "src", "pages");

// Noindex, auth-callback, test and internal pages; add any new noindex page here.
const EXCLUDE = new Set(["/brand-deck", "/docs", "/manage-interests", "/tiktok-auth", "/tiktok-content", "/tiktok-tokens", "/x-ai-test"]);

/** Routes for every page file under src/pages, dynamic ones still bracketed (e.g. /podcasts/oc-pack/[episode]). */
function pageRoutes(): string[] {
  return fs
    .readdirSync(PAGES, { recursive: true, encoding: "utf8" })
    .map((file) => file.split(path.sep))
    .filter((parts) => parts[0] !== "api" && !parts.some((part) => part.startsWith("_")) && /\.(tsx?|jsx?|mdx?)$/.test(parts.at(-1)!))
    .map((parts) => "/" + parts.join("/").replace(/\.\w+$/, "").replace(/(^|\/)index$/, ""));
}

async function expand(route: string): Promise<string[]> {
  if (!route.includes("[")) return [route];
  if (route === "/blog/[publication]/[slug]") return (await getPostSummaries()).map((post) => postPath(post.publication, post.slug));
  const show = route.match(/^\/podcasts\/([^/[]+)\/\[episode\]$/)?.[1];
  if (show) return getShow(show).episodes.map((ep) => `/podcasts/${show}/${ep.number}`);
  throw new Error(`sitemap: no URL list for dynamic page ${route}; add one in src/app/sitemap.ts`);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const routes = (await Promise.all(pageRoutes().filter((route) => !EXCLUDE.has(route)).map(expand)))
    .flat()
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  return routes.map((route) => ({
    url: route === "/" ? SITE : SITE + route,
    lastModified,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
