import { SITE, STUDIO, THEMES } from "./brand";
import { renderEmail, unsubscribeHeaders, type Cta } from "./layout";
import type { NewsletterShow } from "./subscribe";

const hello = (name: string) => (name ? `Hi ${name},` : "Hi there,");

// One line (and a secondary button) for readers who signed up on a show's page. Keep each claim true to its feed.
const INTEREST: Record<NewsletterShow, { line: string; cta: Cta }> = {
  "value-created": {
    line: "The complete 32-chapter **Value, Created** audiobook is live. Start at Chapter I.",
    cta: { label: "Begin Chapter I", href: `${THEMES["value-created"].pageUrl}/1` },
  },
  "money-mastered": {
    line: "**Money, Mastered** is still publishing, and every chapter builds on the last. Start at Chapter I.",
    cta: { label: "Begin Chapter I", href: `${THEMES["money-mastered"].pageUrl}/1` },
  },
  "anthropic-blogcast": {
    line: "**Anthropic Blogcast** is an independent show (not affiliated with Anthropic) that turns Anthropic's posts into short episodes, with new ones whenever Anthropic publishes.",
    cta: { label: "Listen now", href: THEMES["anthropic-blogcast"].pageUrl },
  },
  "oc-pack": {
    line: "A new **OC Pack** episode lands every Thursday for OC dog and pet parents. 🐶",
    cta: { label: "Latest episode", href: THEMES["oc-pack"].pageUrl },
  },
};

/** The one welcome for The Joy Digi list; `name` is raw user input (escaped by the layout). */
export function welcomeEmail(name: string, interest?: NewsletterShow) {
  const extra = interest ? INTEREST[interest] : undefined;
  const { html, text } = renderEmail({
    theme: STUDIO,
    preheader: "One list for new episodes, new books and new shows.",
    kicker: "The Joy Digi · Newsletter",
    heading: "You're on the list.",
    paragraphs: [
      `${hello(name)} welcome to **The Joy Digi**, where we make joyful things with code and AI.`,
      ...(extra ? [extra.line] : []),
      "Here's what to expect from us:",
    ],
    bullets: [
      "New episodes every week from The OC Pack and Anthropic Blogcast",
      "First word on new books and new shows, before anyone else",
    ],
    primary: { label: "Browse the shows", href: `${SITE}/podcasts` },
    secondary: extra?.cta,
    signoff: "Glad you're here.\n— Alex & Jordan",
    reason: "You're getting this because you joined The Joy Digi list at thejoydigi.com.",
  });
  return { from: STUDIO.from, subject: "Welcome to The Joy Digi", html, text, headers: unsubscribeHeaders(STUDIO) };
}
