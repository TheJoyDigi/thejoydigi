import { timingSafeEqual } from "node:crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { SITE } from "@/lib/email/brand";
import { fridayEmail, validateFridayIssue } from "@/lib/email/oc-pack-friday";
import { OC_PACK_SEGMENT_ID } from "@/lib/email/subscribe";

const RESEND_API = "https://api.resend.com";
const MAX_DAYS_BEFORE = 4;
const MAX_DAYS_AFTER = 1;

type Broadcast = {
  id: string;
  name: string;
  segment_id: string | null;
  status: string;
};

type Summary =
  | { ok: true; issue: string; sent: boolean; alreadySent?: boolean; skipped?: "stale" };
type ErrorResponse = { error: string };

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

function matchingBroadcasts(all: Broadcast[], name: string) {
  return all.filter((broadcast) => broadcast.name === name);
}

async function liveIssue(): Promise<unknown> {
  const response = await fetch(`${SITE}/podcasts/oc-pack/friday.json`, {
    cache: "no-store",
    signal: AbortSignal.timeout(12_000),
  });
  if (response.status !== 200) throw new NotifyError(`Friday issue is unavailable (${response.status}).`, 502);
  try {
    return await response.json();
  } catch {
    throw new NotifyError("Friday issue is not valid JSON.", 502);
  }
}

/** Today's calendar date in Orange County time, as YYYY-MM-DD. */
function todayInLosAngeles(): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function dayNumber(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  return Date.UTC(y, m - 1, d) / 86_400_000;
}

async function resumeDraft(id: string, name: string, email: ReturnType<typeof fridayEmail>, key: string) {
  const retrieved = await resend(`/broadcasts/${encodeURIComponent(id)}`, key);
  const draft = retrieved.data;
  if (retrieved.status !== 200 || !draft || draft.id !== id || draft.name !== name ||
    draft.segment_id !== OC_PACK_SEGMENT_ID || draft.status !== "draft" || draft.from !== email.from ||
    draft.subject !== email.subject || draft.html !== email.html || draft.text !== email.text) {
    throw new NotifyError(`Existing draft ${name} needs review before sending.`, 409);
  }
  await sendBroadcast(id, name, key);
}

async function sendBroadcast(id: string, name: string, key: string) {
  const sent = await resend(`/broadcasts/${encodeURIComponent(id)}/send`, key, {});
  if (sent.status < 200 || sent.status >= 300 || sent.data?.id !== id) {
    throw new NotifyError(`Resend could not send broadcast ${name} (${sent.status}).`, 502);
  }
}

/** The hourly workflow calls this; the broadcast name is the dedupe key. */
export default async function handler(req: NextApiRequest, res: NextApiResponse<Summary | ErrorResponse>) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });

  const secret = process.env.VALUE_CHAPTER_NOTIFY_SECRET?.trim();
  if (!secret || secret.length < 32) return res.status(503).json({ error: "Friday email secret is not configured." });
  if (!authorized(req.headers.authorization, secret)) return res.status(401).json({ error: "Unauthorized." });

  const postalAddress = process.env.NEWSLETTER_POSTAL_ADDRESS?.trim();
  const resendKey = process.env.RESEND_CONTACTS_API_KEY?.trim();
  if (!postalAddress || postalAddress.includes("@") || !resendKey) {
    return res.status(503).json({ error: "Friday email is missing its postal address or Resend configuration." });
  }

  try {
    const raw = await liveIssue();
    let issue;
    try {
      issue = validateFridayIssue(raw);
    } catch (error) {
      throw new NotifyError(error instanceof Error ? error.message : "Friday issue is invalid.", 409);
    }

    const offset = dayNumber(issue.date) - dayNumber(todayInLosAngeles());
    if (offset < -MAX_DAYS_BEFORE || offset > MAX_DAYS_AFTER) {
      return res.status(200).json({ ok: true, issue: issue.date, sent: false, skipped: "stale" });
    }

    const name = `oc-pack-friday:${issue.date}`;
    const broadcasts = await listBroadcasts(resendKey);
    const existing = matchingBroadcasts(broadcasts, name);
    if (existing.some((broadcast) => broadcast.segment_id !== OC_PACK_SEGMENT_ID)) {
      throw new NotifyError(`Broadcast ${name} uses a different segment and needs review.`, 409);
    }
    if (existing.some((broadcast) => ["sent", "queued", "scheduled"].includes(broadcast.status))) {
      return res.status(200).json({ ok: true, issue: issue.date, sent: false, alreadySent: true });
    }
    if (existing.some((broadcast) => broadcast.status === "canceled") || existing.length > 1) {
      throw new NotifyError(`Broadcast ${name} needs review before sending.`, 409);
    }

    const email = fridayEmail(issue, postalAddress);

    if (existing.length === 1 && existing[0].status === "draft") {
      await resumeDraft(existing[0].id, name, email, resendKey);
    } else if (existing.length === 0) {
      const created = await resend("/broadcasts", resendKey, {
        name,
        segment_id: OC_PACK_SEGMENT_ID,
        from: email.from,
        subject: email.subject,
        html: email.html,
        text: email.text,
      });
      const createdId = created.data?.id;
      if (created.status < 200 || created.status >= 300 || typeof createdId !== "string") {
        throw new NotifyError(`Resend could not create broadcast ${name} (${created.status}).`, 502);
      }
      await sendBroadcast(createdId, name, resendKey);
    } else {
      throw new NotifyError(`Broadcast ${name} has an unknown status.`, 409);
    }
    return res.status(200).json({ ok: true, issue: issue.date, sent: true });
  } catch (error) {
    const status = error instanceof NotifyError ? error.status : 502;
    const message = error instanceof NotifyError ? error.message : "Friday email failed. Retry later.";
    console.error("OC Pack Friday notification failed:", message);
    return res.status(status).json({ error: message });
  }
}
