import { THEMES } from "./brand";
import { renderEmail } from "./layout";

const RESEND_UNSUBSCRIBE_URL = "{{{RESEND_UNSUBSCRIBE_URL}}}";
const EPISODE_URL_PREFIX = "https://www.thejoydigi.com/";
const MAX_SUBJECT = 120;
const MAX_DETAIL = 400;
const MAX_SHORT = 200;

export type FridayIssue = {
  date: string;
  subject: string;
  headline: string;
  intro: string;
  picks: { name: string; detail: string }[];
  trailGuide: { name: string; parking: string; shade: string; leash: string; note: string };
  vetPlaybook: { title: string; detail: string };
  episode: { title: string; url: string };
};

function record(value: unknown, label: string): Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`Friday issue ${label} must be an object.`);
  }
  return value as Record<string, unknown>;
}

function text(source: Record<string, unknown>, key: string, label: string, max: number): string {
  const value = source[key];
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Friday issue ${label}.${key} must be a non-empty string.`);
  }
  if (value.length > max) throw new Error(`Friday issue ${label}.${key} must be at most ${max} characters.`);
  return value;
}

function isRealDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(y, m - 1, d));
  return parsed.getUTCFullYear() === y && parsed.getUTCMonth() === m - 1 && parsed.getUTCDate() === d;
}

/** Strict validation of the live friday.json before anything is rendered or sent. */
export function validateFridayIssue(raw: unknown): FridayIssue {
  const root = record(raw, "root");
  const date = text(root, "date", "issue", 10);
  if (!isRealDate(date)) throw new Error("Friday issue date must be a real calendar date formatted YYYY-MM-DD.");
  const subject = text(root, "subject", "issue", MAX_SUBJECT);
  const headline = text(root, "headline", "issue", MAX_SHORT);
  const intro = text(root, "intro", "issue", MAX_DETAIL);

  if (!Array.isArray(root.picks) || root.picks.length !== 5) {
    throw new Error("Friday issue picks must contain exactly 5 entries.");
  }
  const picks = root.picks.map((item, i) => {
    const pick = record(item, `picks[${i}]`);
    return { name: text(pick, "name", `picks[${i}]`, MAX_SHORT), detail: text(pick, "detail", `picks[${i}]`, MAX_DETAIL) };
  });

  const trail = record(root.trailGuide, "trailGuide");
  const trailGuide = {
    name: text(trail, "name", "trailGuide", MAX_SHORT),
    parking: text(trail, "parking", "trailGuide", MAX_DETAIL),
    shade: text(trail, "shade", "trailGuide", MAX_DETAIL),
    leash: text(trail, "leash", "trailGuide", MAX_DETAIL),
    note: text(trail, "note", "trailGuide", MAX_DETAIL),
  };

  const vet = record(root.vetPlaybook, "vetPlaybook");
  const vetPlaybook = {
    title: text(vet, "title", "vetPlaybook", MAX_SHORT),
    detail: text(vet, "detail", "vetPlaybook", MAX_DETAIL),
  };

  const ep = record(root.episode, "episode");
  const episode = { title: text(ep, "title", "episode", MAX_SHORT), url: text(ep, "url", "episode", 300) };
  if (!episode.url.startsWith(EPISODE_URL_PREFIX)) {
    throw new Error(`Friday issue episode.url must start with ${EPISODE_URL_PREFIX}`);
  }

  return { date, subject, headline, intro, picks, trailGuide, vetPlaybook, episode };
}

function preheaderFrom(intro: string): string {
  const flat = intro.replace(/\s+/g, " ").trim();
  if (flat.length <= 90) return flat;
  const cut = flat.slice(0, 90);
  const space = cut.lastIndexOf(" ");
  return `${(space > 40 ? cut.slice(0, space) : cut).replace(/[\s,;:.\-—–]+$/, "")}…`;
}

/** The weekly OC Pack Friday letter for the OC Pack Resend segment. */
export function fridayEmail(issue: FridayIssue, postalAddress: string) {
  const theme = THEMES["oc-pack"];
  const { html, text } = renderEmail(
    {
      theme,
      preheader: preheaderFrom(issue.intro),
      kicker: "The OC Pack · Friday Letter",
      heading: issue.headline,
      paragraphs: [
        issue.intro,
        ...issue.picks.map((pick, i) => `**${i + 1}. ${pick.name}** — ${pick.detail}`),
        `**Trail guide: ${issue.trailGuide.name}**\nParking: ${issue.trailGuide.parking} · Shade: ${issue.trailGuide.shade} · Leash: ${issue.trailGuide.leash}\n${issue.trailGuide.note}`,
        `**The Vet Bill Playbook**\n${issue.vetPlaybook.title} — ${issue.vetPlaybook.detail}`,
      ],
      primary: { label: "Listen to this week's episode", href: issue.episode.url },
      secondary: { label: "Browse all episodes", href: theme.pageUrl },
      signoff: "See you out there.\n— The OC Pack",
      reason: "You're receiving this because you joined The OC Pack list at thejoydigi.com.",
    },
    { unsubscribeUrl: RESEND_UNSUBSCRIBE_URL, postalAddress }
  );

  return { from: theme.from, subject: issue.subject, html, text };
}
