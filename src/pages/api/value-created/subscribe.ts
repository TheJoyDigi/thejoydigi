import type { NextApiRequest, NextApiResponse } from "next";

// Full-access key from the Resend team that verified thejoydigi.com (a sending-only key can't save contacts).
const RESEND_API_KEY = process.env.RESEND_CONTACTS_API_KEY || process.env.RESEND_API_KEY;
const SEGMENT_ID = process.env.RESEND_SEGMENT_VALUE_CREATED ?? "1f112a61-0dd0-454e-872a-0d731a143985";
const FROM = "Value, Created <hello@thejoydigi.com>";
const PAGE_URL = "https://www.thejoydigi.com/podcasts/value-created";
const FEED_URL = "https://www.thejoydigi.com/podcasts/value-created/feed.xml";

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
<div style="font-family:Georgia,'Times New Roman',serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#F4EEDD;background:#0C1130;">
  <div style="font-size:13px;letter-spacing:3px;color:#F2A81D;">VALUE, CREATED</div>
  <h1 style="font-size:28px;margin:16px 0 8px;color:#FFD47E;">Welcome to the book.</h1>
  <p>${hello} You're on the list for <strong>Value, Created</strong> — the 32-chapter audiobook on the secret of value creation: what value is, how it is made, captured, and scaled.</p>
  <p>New chapters on the way. Start at the beginning — every chapter builds on the last:</p>
  <p>
    <a href="${PAGE_URL}" style="display:inline-block;background:#F2A81D;color:#0C1130;text-decoration:none;font-weight:700;padding:12px 24px;border-radius:999px;margin:8px 8px 8px 0;">Begin Chapter I</a>
  </p>
  <p style="font-size:14px;color:#F4EEDD;opacity:0.65;">Prefer RSS? Paste this into any podcast app:<br /><code style="color:#FFD47E;">${FEED_URL}</code></p>
  <p>Chapter I is where it all starts. Press play. — Alex &amp; Jordan</p>
  <hr style="border:none;border-top:1px solid rgba(242,168,29,0.25);margin:24px 0;" />
  <p style="font-size:12px;color:#F4EEDD;opacity:0.5;">You're getting this because you subscribed at thejoydigi.com. Unsubscribe anytime.</p>
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

  // 1. Save the contact in this show's segment. "Already exists" is fine.
  const contact = await resend("/contacts", {
    email,
    first_name: name || undefined,
    unsubscribed: false,
    segments: SEGMENT_ID ? [{ id: SEGMENT_ID }] : undefined,
  });
  const exists = !contact.ok && /already/i.test(JSON.stringify(contact.data));
  if (!contact.ok && !exists) {
    console.error("Resend contacts.create failed:", contact.data);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
  if (exists && SEGMENT_ID) {
    const added = await resend(`/contacts/${encodeURIComponent(email)}/segments/${SEGMENT_ID}`, {});
    if (!added.ok) console.error("Resend add-to-segment failed:", added.data);
  }

  // 2. Welcome email (contact is saved even if this fails)
  const sent = await resend("/emails", {
    from: FROM,
    to: email,
    subject: "Welcome to Value, Created",
    html: welcomeHtml(name),
  });
  if (!sent.ok) {
    console.error("Resend welcome email failed:", sent.data);
  }

  return res.status(200).json({ ok: true });
}
