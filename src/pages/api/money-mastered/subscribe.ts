import type { NextApiRequest, NextApiResponse } from "next";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM = "Money, Mastered <hello@thejoydigi.com>";
const SPOTIFY_URL = "https://open.spotify.com/show/4lfKVQtvDKY7X6YWn4JmfO";
const PAGE_URL = "https://www.thejoydigi.com/podcasts/money-mastered";
const FEED_URL = "https://www.thejoydigi.com/podcasts/money-mastered/feed.xml";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function resend(path: string, body: unknown): Promise<{ ok: boolean; data: any }> {
  const res = await fetch(`https://api.resend.com${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  let data: any = {};
  try {
    data = await res.json();
  } catch {
    /* non-JSON error body */
  }
  return { ok: res.ok, data };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function welcomeHtml(name: string): string {
  const hello = name ? `Hi ${escapeHtml(name)}!` : "Hi there!";
  return `
<div style="font-family:Georgia,'Times New Roman',serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#EFE6D2;background:#060E1A;">
  <div style="font-size:13px;letter-spacing:3px;color:#D9B56A;">MONEY, MASTERED</div>
  <h1 style="font-size:28px;margin:16px 0 8px;color:#F3DE9E;">Welcome to the course.</h1>
  <p>${hello} You're on the list for <strong>Money, Mastered</strong> — the 36-chapter audiobook that takes you from zero to mastery in macroeconomics, money, investing, trading, and Bitcoin.</p>
  <p>New chapters land three times a week. Start at the beginning — every chapter builds on the last:</p>
  <p>
    <a href="${SPOTIFY_URL}" style="display:inline-block;background:#1DB954;color:#fff;text-decoration:none;font-weight:700;padding:12px 24px;border-radius:999px;margin:8px 8px 8px 0;">▶ Listen on Spotify</a>
    <a href="${PAGE_URL}" style="display:inline-block;background:#D9B56A;color:#060E1A;text-decoration:none;font-weight:700;padding:12px 24px;border-radius:999px;margin:8px 8px 8px 0;">Begin Chapter I</a>
  </p>
  <p style="font-size:14px;color:#EFE6D2;opacity:0.65;">Prefer RSS? Paste this into any podcast app:<br /><code style="color:#F3DE9E;">${FEED_URL}</code></p>
  <p>Chapter I is where it all starts. Press play. — Alex &amp; Jordan</p>
  <hr style="border:none;border-top:1px solid rgba(217,181,106,0.25);margin:24px 0;" />
  <p style="font-size:12px;color:#EFE6D2;opacity:0.5;">You're getting this because you subscribed at thejoydigi.com. Unsubscribe anytime.</p>
</div>`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return res.status(500).json({ error: "Email signup is not available right now." });
  }

  const { email: rawEmail, name: rawName } = req.body ?? {};
  const email = String(rawEmail || "").trim().toLowerCase();
  const name = String(rawName || "").trim().slice(0, 80);

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  // 1. Save the contact (default audience). "Already exists" is fine.
  const contact = await resend("/contacts", {
    email,
    firstName: name || undefined,
    unsubscribed: false,
  });
  if (!contact.ok && !/already/i.test(JSON.stringify(contact.data))) {
    console.error("Resend contacts.create failed:", contact.data);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }

  // 2. Welcome email (contact is saved even if this fails)
  const sent = await resend("/emails", {
    from: FROM,
    to: email,
    subject: "Welcome to Money, Mastered",
    html: welcomeHtml(name),
  });
  if (!sent.ok) {
    console.error("Resend welcome email failed:", sent.data);
  }

  return res.status(200).json({ ok: true });
}
