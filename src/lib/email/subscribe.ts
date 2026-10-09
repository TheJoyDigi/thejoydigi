import type { NextApiRequest, NextApiResponse } from "next";
import { welcomeEmail } from "./welcome";

export const NEWSLETTER_SHOWS = ["value-created", "money-mastered", "anthropic-blogcast", "oc-pack"] as const;
export type NewsletterShow = (typeof NEWSLETTER_SHOWS)[number];

type SignupResponse =
  | { ok: true; welcomeSent: boolean; alreadySubscribed?: boolean }
  | { error: string };

type ResendResponse = { status: number; data: Record<string, unknown> };

// Every signup joins one Joy Digi list. The fallback is the original Value, Created segment,
// so existing subscribers stay put and chapter broadcasts keep reaching the same people.
const FALLBACK_SEGMENT = "1f112a61-0dd0-454e-872a-0d731a143985";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isNewsletterShow(value: unknown): value is NewsletterShow {
  return typeof value === "string" && NEWSLETTER_SHOWS.some((show) => show === value);
}

export function getNewsletterSegmentId(): string {
  return process.env.RESEND_SEGMENT_JOY_DIGI?.trim() || FALLBACK_SEGMENT;
}

/** Kept for the chapter notifier: every show now shares the single Joy Digi segment. */
export const getShowSegmentId: (show: NewsletterShow) => string = getNewsletterSegmentId;

async function resend(path: string, method: "GET" | "POST", apiKey: string, body?: unknown): Promise<ResendResponse> {
  const response = await fetch(`https://api.resend.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data: unknown = await response.json().catch(() => ({}));
  return {
    status: response.status,
    data: data && typeof data === "object" && !Array.isArray(data) ? (data as Record<string, unknown>) : {},
  };
}

function isDuplicate(response: ResendResponse): boolean {
  return response.status === 409 ||
    (response.status === 422 && typeof response.data.message === "string" && /already exists/i.test(response.data.message));
}

async function getContact(email: string, apiKey: string): Promise<ResendResponse> {
  return resend(`/contacts/${encodeURIComponent(email)}`, "GET", apiKey);
}

async function hasSegment(email: string, id: string, apiKey: string): Promise<boolean | null> {
  const listed = await resend(`/contacts/${encodeURIComponent(email)}/segments`, "GET", apiKey);
  if (listed.status !== 200 || !Array.isArray(listed.data.data)) return null;
  return listed.data.data.some((item) => item && typeof item === "object" && "id" in item && item.id === id);
}

/**
 * Shared signup handler: adds the contact to the single Joy Digi segment. `interest` is the show the
 * reader signed up from (if any); it only tailors the welcome email and log lines.
 */
export async function subscribeToNewsletter(req: NextApiRequest, res: NextApiResponse<SignupResponse>, interest?: NewsletterShow) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });

  const body = req.body && typeof req.body === "object" && !Array.isArray(req.body) ? req.body : {};
  // The hidden field catches simple bots without telling them they were caught.
  if (body.hp) return res.status(200).json({ ok: true, welcomeSent: false });

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : "";
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const contactsKey = process.env.RESEND_CONTACTS_API_KEY || process.env.RESEND_API_KEY;
  const id = getNewsletterSegmentId();
  const source = interest ?? "joy-digi";
  if (!contactsKey) {
    console.error(`Email signup is missing Resend configuration for ${source}.`);
    return res.status(503).json({ error: "Email signup is not available right now." });
  }

  try {
    let contact = await getContact(email, contactsKey);
    let newlySubscribed = false;

    if (contact.status === 404) {
      // Only brand-new contacts may be created with unsubscribed:false. An existing opt-out is never reset.
      const created = await resend("/contacts", "POST", contactsKey, {
        email,
        first_name: name || undefined,
        unsubscribed: false,
        segments: [{ id }],
      });
      if (created.status >= 200 && created.status < 300) {
        newlySubscribed = true;
      } else if (isDuplicate(created)) {
        // Another request created this contact after the GET; inspect it before adding a segment.
        contact = await getContact(email, contactsKey);
      } else {
        throw new Error(`Resend contact create returned ${created.status}`);
      }
    }

    if (!newlySubscribed) {
      if (contact.status !== 200) throw new Error(`Resend contact lookup returned ${contact.status}`);
      if (contact.data.unsubscribed === true) {
        return res.status(409).json({ error: "This address is opted out of emails. Contact hello@thejoydigi.com to rejoin." });
      }
      if (contact.data.unsubscribed !== false) throw new Error("Resend contact lookup omitted subscription status");

      const listed = await hasSegment(email, id, contactsKey);
      if (listed === null) throw new Error("Resend segment lookup failed");
      if (listed) return res.status(200).json({ ok: true, welcomeSent: false, alreadySubscribed: true });

      const added = await resend(`/contacts/${encodeURIComponent(email)}/segments/${id}`, "POST", contactsKey);
      if (added.status < 200 || added.status >= 300) {
        if (!isDuplicate(added) || (await hasSegment(email, id, contactsKey)) !== true) {
          throw new Error(`Resend add-to-segment returned ${added.status}`);
        }
      }
    }

    const sendKey = process.env.RESEND_API_KEY;
    if (!sendKey) return res.status(200).json({ ok: true, welcomeSent: false });

    try {
      const welcome = welcomeEmail(name, interest);
      const sent = await resend("/emails", "POST", sendKey, {
        from: welcome.from,
        to: email,
        subject: welcome.subject,
        html: welcome.html,
        text: welcome.text,
        headers: welcome.headers,
      });
      if (sent.status < 200 || sent.status >= 300) {
        console.error(`Resend welcome email failed for ${source}: ${sent.status}`);
      }
      return res.status(200).json({ ok: true, welcomeSent: sent.status >= 200 && sent.status < 300 });
    } catch (error) {
      // Contact storage succeeded. A welcome-email failure must not invite a retry that repeats the signup.
      console.error(`Resend welcome email failed for ${source}:`, error);
      return res.status(200).json({ ok: true, welcomeSent: false });
    }
  } catch (error) {
    console.error(`Resend signup failed for ${source}:`, error);
    return res.status(502).json({ error: "Something went wrong. Please try again." });
  }
}
