import type { NextApiRequest, NextApiResponse } from "next";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM = "The OC Pack <hello@thejoydigi.com>";
const SPOTIFY_URL = "https://open.spotify.com/show/1vEadmFS7Bq1i3K9HfAzXO";
const PAGE_URL = "https://www.thejoydigi.com/podcasts/oc-pack";
const FEED_URL = "https://www.thejoydigi.com/podcasts/oc-pack/feed.xml";

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
<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#2b2118;background:#fffaf0;">
  <div style="font-size:22px;font-weight:800;margin-bottom:8px;">🐶 The OC Pack</div>
  <h1 style="font-size:26px;margin:16px 0 8px;">Welcome to the pack! 🎉</h1>
  <p>${hello} You're officially part of <strong>The OC Pack</strong> — the weekly podcast for Orange County dog &amp; pet parents.</p>
  <p>Every Thursday, Alex &amp; Jordan fetch you:</p>
  <ul>
    <li>🐾 Dog-friendly beaches, trails &amp; patios around OC</li>
    <li>💰 Vet-bill saving strategies that keep care great and costs sane</li>
    <li>🎓 Training &amp; health tips that actually work</li>
    <li>📍 Local events, adoption days &amp; meetups</li>
  </ul>
  <p>
    <a href="${SPOTIFY_URL}" style="display:inline-block;background:#1DB954;color:#fff;text-decoration:none;font-weight:700;padding:12px 24px;border-radius:999px;margin:8px 8px 8px 0;">▶ Listen on Spotify</a>
    <a href="${PAGE_URL}" style="display:inline-block;background:#e07856;color:#fff;text-decoration:none;font-weight:700;padding:12px 24px;border-radius:999px;margin:8px 8px 8px 0;">🌐 Episode page</a>
  </p>
  <p style="font-size:14px;color:#8a7a66;">Prefer RSS? Paste this into any podcast app:<br /><code>${FEED_URL}</code></p>
  <p>See you Thursday! 🦴<br />— Alex &amp; Jordan</p>
  <hr style="border:none;border-top:1px solid #ead9c2;margin:24px 0;" />
  <p style="font-size:12px;color:#8a7a66;">You're getting this because you joined the pack at thejoydigi.com. One email per week, unsubscribe anytime.</p>
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
    subject: "Welcome to the pack 🐶",
    html: welcomeHtml(name),
  });
  if (!sent.ok) {
    console.error("Resend welcome email failed:", sent.data);
  }

  return res.status(200).json({ ok: true });
}
