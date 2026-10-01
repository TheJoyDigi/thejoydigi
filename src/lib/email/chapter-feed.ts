export type FeedChapter = {
  guid: string;
  number: number;
  title: string;
  description: string;
  pubDate: string;
  audioUrl: string;
  audioLength: string;
  audioType: string;
};

const decodeXml = (value: string) =>
  value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#x([0-9a-f]+);/gi, (_, digits: string) => codePoint(Number.parseInt(digits, 16)))
    .replace(/&#(\d+);/g, (_, digits: string) => codePoint(Number(digits)))
    .replace(/&(amp|lt|gt|quot|apos);/g, (_, name: string) =>
      ({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" })[name] ?? ""
    )
    .trim();

function codePoint(value: number) {
  return Number.isInteger(value) && value >= 0 && value <= 0x10ffff
    ? String.fromCodePoint(value)
    : "";
}

function tag(item: string, name: string) {
  const match = item.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"));
  return match ? decodeXml(match[1]) : "";
}

function attribute(item: string, tagName: string, name: string) {
  const element = item.match(new RegExp(`<${tagName}\\b([^>]*)>`, "i"))?.[1] ?? "";
  const value = element.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i"));
  return value ? decodeXml(value[1] ?? value[2]) : "";
}

/** Parse the live feed, validating GUID and chapter title together before any email is sent. */
export function parseValueChapters(xml: string): FeedChapter[] {
  if (xml.length > 1_000_000) throw new Error("Value feed is unexpectedly large");
  const items = xml.match(/<item(?:\s[^>]*)?>[\s\S]*?<\/item>/gi);
  if (!items?.length) throw new Error("Value feed has no items");

  const chapters = items.map((item) => {
    const guid = tag(item, "guid");
    const title = tag(item, "title");
    const description = tag(item, "description").replace(/<[^>]*>/g, "").trim();
    const pubDate = tag(item, "pubDate");
    const audioUrl = attribute(item, "enclosure", "url");
    const audioLength = attribute(item, "enclosure", "length");
    const audioType = attribute(item, "enclosure", "type");
    const guidNumber = guid.match(/^vc-ch([1-9]\d*)-\d{4}-\d{2}-\d{2}$/);
    const titleNumber = title.match(/^Value, Created\s*[—–-]\s*Chapter\s+([1-9]\d*)\s*:/i);
    if (!guidNumber || !titleNumber || guidNumber[1] !== titleNumber[1] || !description) {
      throw new Error("Value feed contains an invalid chapter item");
    }
    return { guid, number: Number(guidNumber[1]), title, description, pubDate, audioUrl, audioLength, audioType };
  });

  const numbers = new Set<number>();
  const guids = new Set<string>();
  for (const chapter of chapters) {
    if (numbers.has(chapter.number) || guids.has(chapter.guid)) {
      throw new Error("Value feed contains duplicate chapters");
    }
    numbers.add(chapter.number);
    guids.add(chapter.guid);
  }
  return chapters.sort((a, b) => a.number - b.number);
}

/** Old feed items predate this email feature, so validate publication only for selected new items. */
export function validatePublishableChapter(chapter: FeedChapter, site: string, now = Date.now()) {
  const date = chapter.pubDate.match(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s+(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})\s+(\d{2}):(\d{2}):(\d{2})\s+([+-]\d{4}|GMT|UTC)$/i);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const month = date ? months.findIndex((name) => name.toLowerCase() === date[3].toLowerCase()) : -1;
  const day = Number(date?.[2]);
  const year = Number(date?.[4]);
  const hour = Number(date?.[5]);
  const minute = Number(date?.[6]);
  const second = Number(date?.[7]);
  const calendarDate = new Date(Date.UTC(year, month, day, hour, minute, second));
  if (!date || month < 0 || year < 2000 ||
    calendarDate.getUTCFullYear() !== year || calendarDate.getUTCMonth() !== month ||
    calendarDate.getUTCDate() !== day || calendarDate.getUTCHours() !== hour ||
    calendarDate.getUTCMinutes() !== minute || calendarDate.getUTCSeconds() !== second ||
    weekdays[calendarDate.getUTCDay()].toLowerCase() !== date[1].toLowerCase()) {
    throw new Error(`Chapter ${chapter.number} has an invalid publication date.`);
  }
  const zone = date[8].toUpperCase();
  const zoneHours = zone === "GMT" || zone === "UTC" ? 0 : Number(zone.slice(1, 3));
  const zoneMinutes = zone === "GMT" || zone === "UTC" ? 0 : Number(zone.slice(3, 5));
  if (zoneHours > 14 || zoneMinutes > 59 || (zoneHours === 14 && zoneMinutes !== 0)) {
    throw new Error(`Chapter ${chapter.number} has an invalid publication date.`);
  }
  const offset = zone[0] === "-" ? -(zoneHours * 60 + zoneMinutes) : zoneHours * 60 + zoneMinutes;
  const publishedAt = calendarDate.getTime() - offset * 60_000;
  if (publishedAt > now) {
    throw new Error(`Chapter ${chapter.number} is scheduled for the future.`);
  }

  let audio: URL;
  try {
    audio = new URL(chapter.audioUrl);
  } catch {
    throw new Error(`Chapter ${chapter.number} has an invalid audio enclosure.`);
  }
  const origin = new URL(site).origin;
  if (audio.origin !== origin || audio.protocol !== "https:" || audio.username || audio.password ||
    audio.search || audio.hash || !audio.pathname.startsWith("/podcasts/value-created/") ||
    !audio.pathname.toLowerCase().endsWith(".mp3") || chapter.audioType !== "audio/mpeg" ||
    !/^[1-9]\d*$/.test(chapter.audioLength) || !Number.isSafeInteger(Number(chapter.audioLength))) {
    throw new Error(`Chapter ${chapter.number} has an invalid audio enclosure.`);
  }
  return audio.href;
}
