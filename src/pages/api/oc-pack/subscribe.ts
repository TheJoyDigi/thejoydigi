import type { NextApiRequest, NextApiResponse } from "next";
import { welcomeEmail } from "@/lib/email/welcome";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
// Saving contacts needs a full-access key; RESEND_API_KEY can stay sending-only.
const CONTACTS_API_KEY = process.env.RESEND_CONTACTS_API_KEY || RESEND_API_KEY;
const SEGMENT_ID = process.env.RESEND_SEGMENT_OC_PACK ?? "00dadca0-b133-442f-a4dd-d12dfb164d51";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function resend(path: string, body?: unknown, apiKey = RESEND_API_KEY, method = "POST"): Promise<{ ok: boolean; data: any }> {
  const res = await fetch(`https://api.resend.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  let data: any = {};
  try {
    data = await res.json();
  } catch {
    /* non-JSON error body */
  }
  return { ok: res.ok, data };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return res.status(500).json({ error: "Email signup is not available right now." });
  }

  const { email: rawEmail, name: rawName, hp } = req.body ?? {};
  // Honeypot: real visitors never see this field, bots fill it. Pretend success, do nothing.
  if (hp) return res.status(200).json({ ok: true });
  const email = String(rawEmail || "").trim().toLowerCase();
  const name = String(rawName || "").trim().slice(0, 80);

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  // 1. Save the contact in this show's segment. "Already exists" is fine.
  const contact = await resend(
    "/contacts",
    {
      email,
      first_name: name || undefined,
      unsubscribed: false,
      segments: SEGMENT_ID ? [{ id: SEGMENT_ID }] : undefined,
    },
    CONTACTS_API_KEY
  );
  const exists = !contact.ok && /already/i.test(JSON.stringify(contact.data));
  if (!contact.ok && !exists) {
    console.error("Resend contacts.create failed:", contact.data);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
  if (exists) {
    // Already a contact: only welcome them if this show's list is new to them (stops repeat-email abuse).
    const listed = SEGMENT_ID ? await resend(`/contacts/${encodeURIComponent(email)}/segments`, undefined, CONTACTS_API_KEY, "GET") : null;
    const segments: { id: string }[] | null = listed?.ok ? (listed.data?.data ?? []) : null;
    if (!SEGMENT_ID || !segments || segments.some((seg) => seg.id === SEGMENT_ID)) {
      return res.status(200).json({ ok: true });
    }
    const added = await resend(`/contacts/${encodeURIComponent(email)}/segments/${SEGMENT_ID}`, {}, CONTACTS_API_KEY);
    if (!added.ok) console.error("Resend add-to-segment failed:", added.data);
  }

  // 2. Welcome email (contact is saved even if this fails)
  const welcome = welcomeEmail("oc-pack", name);
  const sent = await resend("/emails", {
    from: welcome.from,
    to: email,
    subject: welcome.subject,
    html: welcome.html,
    text: welcome.text,
    headers: welcome.headers,
  });
  if (!sent.ok) {
    console.error("Resend welcome email failed:", sent.data);
  }

  return res.status(200).json({ ok: true });
}
