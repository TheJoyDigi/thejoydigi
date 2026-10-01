import type { NextApiRequest, NextApiResponse } from "next";
import { welcomeEmail } from "./welcome";

export const NEWSLETTER_SHOWS = ["value-created", "money-mastered", "anthropic-blogcast", "oc-pack"] as const;
export type NewsletterShow = (typeof NEWSLETTER_SHOWS)[number];

type SignupResponse =
  | { ok: true; welcomeSent: boolean; alreadySubscribed?: boolean }
  | { error: string };

type ResendResponse = { status: number; data: Record<string, unknown> };

const FALLBACK_SEGMENTS: Partial<Record<NewsletterShow, string>> = {
  "value-created": "1f112a61-0dd0-454e-872a-0d731a143985",
  "money-mastered": "245e081b-be4e-4c6c-9b42-84db1b445216",
  "oc-pack": "00dadca0-b133-442f-a4dd-d12dfb164d51",
};

const FALLBACK_TOPICS: Partial<Record<NewsletterShow, string>> = {
  "money-mastered": "931ed58a-f3bb-496c-a714-af9e28142d8a",
  "anthropic-blogcast": "a9b3ac5a-5a74-4ffb-aef7-6dcc84a4fa49",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isNewsletterShow(value: unknown): value is NewsletterShow {
  return typeof value === "string" && NEWSLETTER_SHOWS.some((show) => show === value);
}

export function getShowSegmentId(show: NewsletterShow): string | undefined {
  const configured = {
    "value-created": process.env.RESEND_SEGMENT_VALUE_CREATED,
    "money-mastered": process.env.RESEND_SEGMENT_MONEY_MASTERED,
    // The free Resend plan allows three segments. These shows share one segment
    // and use separate opt-in topics to keep their audiences distinct.
    "anthropic-blogcast": process.env.RESEND_SEGMENT_MONEY_MASTERED,
    "oc-pack": process.env.RESEND_SEGMENT_OC_PACK,
  }[show]?.trim();
  return configured || FALLBACK_SEGMENTS[show === "anthropic-blogcast" ? "money-mastered" : show];
}

function getShowTopicId(show: NewsletterShow): string | undefined {
  const configured = ({
    "money-mastered": process.env.RESEND_TOPIC_MONEY_MASTERED,
    "anthropic-blogcast": process.env.RESEND_TOPIC_ANTHROPIC_BLOGCAST,
  } as Partial<Record<NewsletterShow, string | undefined>>)[show];
  return configured?.trim() || FALLBACK_TOPICS[show];
}

async function resend(path: string, method: "GET" | "POST" | "PATCH", apiKey: string, body?: unknown): Promise<ResendResponse> {
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

async function hasTopicOptIn(email: string, topicId: string, apiKey: string): Promise<boolean | null> {
  const listed = await resend(`/contacts/${encodeURIComponent(email)}/topics`, "GET", apiKey);
  if (listed.status !== 200 || !Array.isArray(listed.data.data) || listed.data.has_more === true) return null;
  return listed.data.data.some((item) =>
    item && typeof item === "object" && "id" in item && item.id === topicId &&
    "subscription" in item && item.subscription === "opt_in"
  );
}

/** Shared handler for the podcast shows. Resend stores one global contact with show preferences. */
export async function subscribeToShow(req: NextApiRequest, res: NextApiResponse<SignupResponse>, show: NewsletterShow) {
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
  const id = getShowSegmentId(show);
  const topicId = getShowTopicId(show);
  const usesTopic = show === "money-mastered" || show === "anthropic-blogcast";
  if (!contactsKey || !id || (usesTopic && !topicId)) {
    console.error(`Email signup is missing Resend configuration for ${show}.`);
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
        ...(topicId ? { topics: [{ id: topicId, subscription: "opt_in" }] } : {}),
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

      const [listed, optedIn] = await Promise.all([
        hasSegment(email, id, contactsKey),
        topicId ? hasTopicOptIn(email, topicId, contactsKey) : Promise.resolve(true),
      ]);
      if (listed === null) throw new Error("Resend segment lookup failed");
      if (optedIn === null) throw new Error("Resend topic lookup failed");
      if (listed && optedIn) return res.status(200).json({ ok: true, welcomeSent: false, alreadySubscribed: true });

      if (!listed) {
        const added = await resend(`/contacts/${encodeURIComponent(email)}/segments/${id}`, "POST", contactsKey);
        if (added.status < 200 || added.status >= 300) {
          if (!isDuplicate(added) || (await hasSegment(email, id, contactsKey)) !== true) {
            throw new Error(`Resend add-to-segment returned ${added.status}`);
          }
        }
      }
      if (topicId && !optedIn) {
        const updated = await resend(`/contacts/${encodeURIComponent(email)}/topics`, "PATCH", contactsKey, {
          topics: [{ id: topicId, subscription: "opt_in" }],
        });
        if (updated.status < 200 || updated.status >= 300) {
          throw new Error(`Resend topic update returned ${updated.status}`);
        }
      }
    }

    const sendKey = process.env.RESEND_API_KEY;
    if (!sendKey) return res.status(200).json({ ok: true, welcomeSent: false });

    try {
      const welcome = welcomeEmail(show, name);
      const sent = await resend("/emails", "POST", sendKey, {
        from: welcome.from,
        to: email,
        subject: welcome.subject,
        html: welcome.html,
        text: welcome.text,
        headers: welcome.headers,
      });
      if (sent.status < 200 || sent.status >= 300) {
        console.error(`Resend welcome email failed for ${show}: ${sent.status}`);
      }
      return res.status(200).json({ ok: true, welcomeSent: sent.status >= 200 && sent.status < 300 });
    } catch (error) {
      // Contact storage succeeded. A welcome-email failure must not invite a retry that repeats the signup.
      console.error(`Resend welcome email failed for ${show}:`, error);
      return res.status(200).json({ ok: true, welcomeSent: false });
    }
  } catch (error) {
    console.error(`Resend signup failed for ${show}:`, error);
    return res.status(502).json({ error: "Something went wrong. Please try again." });
  }
}
