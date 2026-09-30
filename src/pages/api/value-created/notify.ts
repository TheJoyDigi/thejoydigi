import { timingSafeEqual } from "node:crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { SITE } from "@/lib/email/brand";
import { parseValueChapters, validatePublishableChapter, type FeedChapter } from "@/lib/email/chapter-feed";
import { newChapterEmail } from "@/lib/email/new-chapter";
import { getShowSegmentId } from "@/lib/email/subscribe";

// Chapters 1–14 predate this series. The launch cutoff must be set explicitly.
const EARLIEST_EMAILED_CHAPTER = 15;
const RESEND_API = "https://api.resend.com";

type Broadcast = {
  id: string;
  name: string;
  segment_id: string | null;
  status: string;
};

type Summary = {
  ok: true;
  checked: number;
  sent: number[];
  alreadySent: number[];
};

type ErrorResponse = { error: string; sent?: number[] };

class NotifyError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

function authorized(header: string | undefined, secret: string) {
  if (!header?.startsWith("Bearer ")) return false;
  const supplied = Buffer.from(header.slice("Bearer ".length));
  const expected = Buffer.from(secret);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

async function resend(path: string, key: string, body?: unknown) {
  const response = await fetch(`${RESEND_API}${path}`, {
    method: body === undefined ? "GET" : "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(12_000),
  });
  const data: unknown = await response.json().catch(() => null);
  return { status: response.status, data: record(data) };
}

async function listBroadcasts(key: string): Promise<Broadcast[]> {
  const broadcasts: Broadcast[] = [];
  let after: string | undefined;

  // Never create a broadcast after an incomplete lookup; an unseen older one may already exist.
  for (let page = 0; page < 20; page++) {
    const query = new URLSearchParams({ limit: "100" });
    if (after) query.set("after", after);
    const result = await resend(`/broadcasts?${query}`, key);
    if (result.status !== 200 || !Array.isArray(result.data?.data) || typeof result.data.has_more !== "boolean") {
      throw new NotifyError(`Resend broadcast lookup failed (${result.status}).`, 502);
    }

    const raw = result.data.data;
    for (const item of raw) {
      const value = record(item);
      if (!value || typeof value.id !== "string" || typeof value.name !== "string" ||
        (typeof value.segment_id !== "string" && value.segment_id !== null && value.segment_id !== undefined) ||
        typeof value.status !== "string") {
        throw new NotifyError("Resend returned an invalid broadcast list.", 502);
      }
      broadcasts.push({
        id: value.id,
        name: value.name,
        segment_id: typeof value.segment_id === "string" ? value.segment_id : null,
        status: value.status,
      });
    }

    if (!result.data.has_more) return broadcasts;
    const last = record(raw[raw.length - 1]);
    if (!last || typeof last.id !== "string" || last.id === after) {
      throw new NotifyError("Resend broadcast pagination failed.", 502);
    }
    after = last.id;
  }
  throw new NotifyError("Resend broadcast lookup exceeded the page limit.", 502);
}

function firstChapterToEmail() {
  const raw = process.env.VALUE_CHAPTER_FIRST_NUMBER?.trim();
  if (!raw || !/^[1-9]\d*$/.test(raw)) return null;
  const number = Number(raw);
  return Number.isSafeInteger(number) && number >= EARLIEST_EMAILED_CHAPTER ? number : null;
}

async function liveChapters(firstNumber: number): Promise<FeedChapter[]> {
  const response = await fetch(`${SITE}/podcasts/value-created/feed.xml`, {
    cache: "no-store",
    signal: AbortSignal.timeout(12_000),
  });
  if (response.status !== 200) throw new NotifyError(`Value feed is unavailable (${response.status}).`, 502);
  try {
    return parseValueChapters(await response.text()).filter((chapter) => chapter.number >= firstNumber);
  } catch {
    throw new NotifyError("Value feed could not be validated.", 502);
  }
}

async function chapterPageIsLive(pageUrl: string) {
  const response = await fetch(pageUrl, {
    method: "HEAD",
    cache: "no-store",
    signal: AbortSignal.timeout(12_000),
  });
  // Require the final response to be on the intended chapter page, not a generic redirect page.
  return response.status === 200 && response.url === pageUrl;
}

async function chapterAudioIsLive(audioUrl: string, listedLength: string) {
  const response = await fetch(audioUrl, {
    method: "HEAD",
    cache: "no-store",
    signal: AbortSignal.timeout(12_000),
  });
  const contentType = response.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  const contentLength = response.headers.get("content-length");
  return response.status === 200 && response.url === audioUrl && contentType === "audio/mpeg" &&
    (contentLength === null || contentLength === listedLength);
}

function matchingBroadcasts(all: Broadcast[], name: string) {
  return all.filter((broadcast) => broadcast.name === name);
}

async function resumeDraft(id: string, name: string, segmentId: string, pageUrl: string,
  email: ReturnType<typeof newChapterEmail>, key: string) {
  const retrieved = await resend(`/broadcasts/${encodeURIComponent(id)}`, key);
  const draft = retrieved.data;
  if (retrieved.status !== 200 || !draft || draft.id !== id || draft.name !== name ||
    draft.segment_id !== segmentId || draft.status !== "draft" || draft.from !== email.from ||
    draft.subject !== email.subject || draft.html !== email.html || draft.text !== email.text ||
    !email.html.includes(pageUrl)) {
    throw new NotifyError(`Existing draft ${name} needs review before sending.`, 409);
  }
  const sent = await resend(`/broadcasts/${encodeURIComponent(id)}/send`, key, {});
  if (sent.status < 200 || sent.status >= 300 || sent.data?.id !== id) {
    throw new NotifyError(`Resend could not send existing draft ${name} (${sent.status}).`, 502);
  }
}

/** The serialized workflow calls this after publication; the broadcast name is a dedupe key. */
export default async function handler(req: NextApiRequest, res: NextApiResponse<Summary | ErrorResponse>) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });

  const secret = process.env.VALUE_CHAPTER_NOTIFY_SECRET?.trim();
  if (!secret || secret.length < 32) return res.status(503).json({ error: "Chapter email secret is not configured." });
  if (!authorized(req.headers.authorization, secret)) return res.status(401).json({ error: "Unauthorized." });
  if (process.env.VALUE_CHAPTER_EMAIL_ENABLED !== "true") {
    return res.status(503).json({ error: "Chapter email is not enabled." });
  }
  const firstNumber = firstChapterToEmail();
  if (firstNumber === null) {
    return res.status(503).json({ error: "VALUE_CHAPTER_FIRST_NUMBER must be set to a whole number of at least 15." });
  }

  const postalAddress = process.env.NEWSLETTER_POSTAL_ADDRESS?.trim();
  const resendKey = process.env.RESEND_CONTACTS_API_KEY?.trim();
  const segmentId = getShowSegmentId("value-created");
  if (!postalAddress || postalAddress.includes("@") || !resendKey || !segmentId) {
    return res.status(503).json({ error: "Chapter email is missing its postal address or Resend configuration." });
  }

  const sent: number[] = [];
  const alreadySent: number[] = [];
  try {
    const chapters = await liveChapters(firstNumber);
    if (chapters.length === 0) return res.status(200).json({ ok: true, checked: 0, sent, alreadySent });
    const broadcasts = await listBroadcasts(resendKey);

    for (const chapter of chapters) {
      const name = `value-created:${chapter.guid}`;
      const existing = matchingBroadcasts(broadcasts, name);
      if (existing.some((broadcast) => broadcast.segment_id !== segmentId)) {
        throw new NotifyError(`Broadcast ${name} uses a different segment and needs review.`, 409);
      }
      if (existing.some((broadcast) => ["sent", "queued", "scheduled"].includes(broadcast.status))) {
        alreadySent.push(chapter.number);
        continue;
      }
      if (existing.some((broadcast) => broadcast.status === "canceled") || existing.length > 1) {
        throw new NotifyError(`Broadcast ${name} needs review before sending.`, 409);
      }

      const pageUrl = `${SITE}/podcasts/value-created/${chapter.number}`;
      let audioUrl: string;
      try {
        audioUrl = validatePublishableChapter(chapter, SITE);
      } catch (error) {
        throw new NotifyError(error instanceof Error ? error.message : `Chapter ${chapter.number} feed is invalid.`, 409);
      }
      if (!(await chapterPageIsLive(pageUrl))) {
        throw new NotifyError(`Chapter ${chapter.number} page is not live yet.`, 409);
      }
      if (!(await chapterAudioIsLive(audioUrl, chapter.audioLength))) {
        throw new NotifyError(`Chapter ${chapter.number} audio is not live yet.`, 409);
      }

      const email = newChapterEmail({
        number: chapter.number,
        title: chapter.title,
        description: chapter.description,
        pageUrl,
        postalAddress,
      });

      if (existing.length === 1 && existing[0].status === "draft") {
        await resumeDraft(existing[0].id, name, segmentId, pageUrl, email, resendKey);
      } else if (existing.length === 0) {
        const created = await resend("/broadcasts", resendKey, {
          name,
          segment_id: segmentId,
          from: email.from,
          subject: email.subject,
          html: email.html,
          text: email.text,
          send: true,
        });
        if (created.status < 200 || created.status >= 300 || typeof created.data?.id !== "string") {
          throw new NotifyError(`Resend could not send chapter ${chapter.number} (${created.status}).`, 502);
        }
      } else {
        throw new NotifyError(`Broadcast ${name} has an unknown status.`, 409);
      }
      sent.push(chapter.number);
    }
    return res.status(200).json({ ok: true, checked: chapters.length, sent, alreadySent });
  } catch (error) {
    const status = error instanceof NotifyError ? error.status : 502;
    const message = error instanceof NotifyError ? error.message : "Chapter email failed. Retry later.";
    console.error("Value chapter notification failed:", message);
    return res.status(status).json({ error: message, sent });
  }
}
