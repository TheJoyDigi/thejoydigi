import fs from "fs";
import path from "path";

export type Episode = {
  number: number;
  title: string;
  shortTitle: string;
  description: string;
  pubDate: string;
  dateLabel: string;
  duration: string;
  seconds: number;
  audio: string;
};

export type Show = {
  slug: string;
  title: string;
  description: string;
  author: string;
  cover: string;
  feedUrl: string;
  pageUrl: string;
  episodes: Episode[];
};

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .trim();

const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : "";
};

const attr = (xml: string, name: string, key: string) => {
  const m = xml.match(new RegExp(`<${name}\\s[^>]*${key}="([^"]*)"`));
  return m ? decode(m[1]) : "";
};

const numbered = (title: string) => {
  const m = title.match(/(?:Chapter|Episode)\s+(\d+)/i);
  return m ? Number(m[1]) : undefined;
};

const order = (ep: { title: string; pubDate: string }) => numbered(ep.title) ?? new Date(ep.pubDate).getTime();

const sentence = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const toSeconds = (d: string) => d.split(":").reduce((acc, part) => acc * 60 + Number(part || 0), 0);

/** Feed URLs are absolute production URLs; serve them site-relative so previews and dev play local files. */
const sitePath = (url: string) => url.replace(/^https?:\/\/(www\.)?thejoydigi\.com/, "");

/** Reads public/podcasts/<slug>/feed.xml at build time; episodes come back in chapter/episode order. */
export function getShow(slug: string): Show {
  const xml = fs.readFileSync(path.join(process.cwd(), "public", "podcasts", slug, "feed.xml"), "utf8");
  const channel = xml.split("<item>")[0];
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];

  const episodes = items
    .map((item) => {
      const title = tag(item, "title");
      const pubDate = tag(item, "pubDate");
      const duration = tag(item, "itunes:duration");
      return {
        title,
        shortTitle: title.replace(/^.*?—\s*/, "").replace(/^(Chapter|Episode)\s+\d+:\s*/, ""),
        description: sentence(tag(item, "description").replace(/<[^>]+>/g, "").replace(/^(Chapter|Episode)\s+\d+:\s*/i, "")),
        pubDate,
        dateLabel: new Date(pubDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "America/Los_Angeles" }),
        duration: duration.replace(/^0:/, "").replace(/^0(\d:)/, "$1"),
        seconds: toSeconds(duration),
        audio: sitePath(attr(item, "enclosure", "url")),
      };
    })
    .sort((a, b) => order(a) - order(b))
    .map((ep, i) => ({ ...ep, number: numbered(ep.title) ?? i + 1 }));

  return {
    slug,
    title: tag(channel, "title"),
    description: tag(channel, "description"),
    author: tag(channel, "itunes:author"),
    cover: sitePath(attr(channel, "itunes:image", "href")) || `/podcasts/${slug}/cover.jpg`,
    feedUrl: `https://www.thejoydigi.com/podcasts/${slug}/feed.xml`,
    pageUrl: `https://www.thejoydigi.com/podcasts/${slug}`,
    episodes,
  };
}
