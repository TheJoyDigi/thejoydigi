import { THEMES, type ShowSlug } from "./brand";
import { renderEmail, unsubscribeHeaders, type EmailContent } from "./layout";

type Copy = Omit<EmailContent, "theme" | "reason"> & { subject: string };

const hello = (name: string) => (name ? `Hi ${name},` : "Hi there,");

const COPY: Record<ShowSlug, (name: string) => Copy> = {
  "value-created": (name) => {
    const t = THEMES["value-created"];
    return {
      subject: "Welcome to Value, Created",
      preheader: "You're on the list. Chapter I is ready whenever you are.",
      kicker: "Value, Created · An audiobook",
      heading: "Welcome to the book.",
      paragraphs: [
        `${hello(name)} you're on the list for **Value, Created**, the 32-chapter audiobook on the secret of value creation: what value is, how it's made, captured, and scaled.`,
        "Every chapter builds on the last, so the best place to start is the beginning.",
      ],
      primary: { label: "Begin Chapter I", href: `${t.pageUrl}/1` },
      secondary: { label: "Listen on Spotify", href: t.spotifyUrl },
      signoff: "Press play. We'll see you in Chapter I.\n— Alex & Jordan",
    };
  },
  "money-mastered": (name) => {
    const t = THEMES["money-mastered"];
    return {
      subject: "Welcome to Money, Mastered",
      preheader: "You're on the list. Three new chapters a week, starting with Chapter I.",
      kicker: "Money, Mastered · An audiobook",
      heading: "Welcome to the course.",
      paragraphs: [
        `${hello(name)} you're on the list for **Money, Mastered**, the 36-chapter audiobook that takes you from zero to mastery in macroeconomics, money, investing, trading, and Bitcoin.`,
        "New chapters land three times a week. Every chapter builds on the last, so start at the beginning.",
      ],
      primary: { label: "Begin Chapter I", href: `${t.pageUrl}/1` },
      secondary: { label: "Listen on Spotify", href: t.spotifyUrl },
      signoff: "Chapter I is where it all starts.\n— Alex & Jordan",
    };
  },
  "oc-pack": (name) => {
    const t = THEMES["oc-pack"];
    return {
      subject: "Welcome to the pack 🐶",
      preheader: "You're in! A new episode for OC pet parents every Thursday.",
      kicker: "The OC Pack · Weekly podcast",
      heading: "Welcome to the pack!",
      paragraphs: [
        `${hello(name)} you're officially part of **The OC Pack**, the weekly podcast for Orange County dog and pet parents. Every Thursday, Alex and Jordan fetch you:`,
      ],
      bullets: [
        "Dog-friendly beaches, trails and patios around OC",
        "Vet-bill strategies that keep care great and costs sane",
        "Training and health tips that actually work",
        "Local events, adoption days and meetups",
      ],
      primary: { label: "Listen on Spotify", href: t.spotifyUrl },
      secondary: { label: "Latest episode", href: t.pageUrl },
      signoff: "See you Thursday! 🦴\n— Alex & Jordan",
    };
  },
  "anthropic-blogcast": (name) => {
    const t = THEMES["anthropic-blogcast"];
    return {
      subject: "Welcome to Anthropic Blogcast",
      preheader: "Anthropic's latest posts, turned into short episodes you can listen to.",
      kicker: "Anthropic Blogcast",
      heading: "The blog, by ear.",
      paragraphs: [
        `${hello(name)} you're on the list for **Anthropic Blogcast**. Alex and Jordan turn Anthropic's announcements and research posts into short, listenable episodes, with new ones whenever Anthropic publishes.`,
        "An independent show by The Joy Digi, not affiliated with Anthropic.",
      ],
      primary: { label: "Listen now", href: t.pageUrl },
      secondary: { label: "Listen on Spotify", href: t.spotifyUrl },
      signoff: "Happy listening.\n— Alex & Jordan",
    };
  },
  "incentives-decoded": (name) => {
    const t = THEMES["incentives-decoded"];
    return {
      subject: "Welcome to Incentives, Decoded",
      preheader: "You're in. Level 01 takes about five minutes.",
      kicker: "Incentives, Decoded · Audio series",
      heading: "Find the payoff.",
      paragraphs: [
        `${hello(name)} you're on the list for **Incentives, Decoded**, 32 short chapters on the hidden payoffs behind how people act: at work, online, and in your own habits.`,
        "Each level is about five minutes and builds on the last, so start at Level 01.",
      ],
      primary: { label: "Play Level 01", href: `${t.pageUrl}/1` },
      secondary: { label: "See all 32 levels", href: t.pageUrl },
      signoff: "Ask what the payoff is. You'll never unsee it.\n— Alex & Jordan",
    };
  },
};

/** Welcome email for a show; `name` is raw user input (escaped by the layout). */
export function welcomeEmail(slug: ShowSlug, name: string) {
  const { subject, ...content } = COPY[slug](name);
  const theme = THEMES[slug];
  const { html, text } = renderEmail({ ...content, theme, reason: `You're getting this because you subscribed to ${theme.name} at thejoydigi.com.` });
  return { from: theme.from, subject, html, text, headers: unsubscribeHeaders(theme) };
}
