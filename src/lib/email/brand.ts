// Email brand tokens. Source of truth: docs/brand/design-standard.md — keep the two in sync.

export const SITE = "https://www.thejoydigi.com";

/** The Joy Digi umbrella: frames every email (header, outer canvas, footer). */
export const JOY = {
  ink: "#003B49",
  sand: "#FDF6EC",
  coral: "#FF6B6B",
  sun: "#FFC94A",
  sky: "#4ABEFF",
  mint: "#7EE0C3",
  inkSoft: "#4D7580",
  line: "#E8DCC8",
  display: "Fraunces, Georgia, 'Times New Roman', serif",
  body: "'DM Sans', -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif",
  mark: `${SITE}/email/joydigi-mark.png`,
  fontsHref: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap",
} as const;

/** A show's sub-brand: colours, cover and copy for the show card only; type stays The Joy Digi's. */
export type ShowTheme = {
  slug: string;
  name: string;
  from: string;
  pageUrl: string;
  feedUrl: string;
  spotifyUrl: string;
  cover: string;
  card: string;
  text: string;
  muted: string;
  heading: string;
  kicker: string;
  accent: string;
  onAccent: string;
  outline: string;
  subtle: string;
};

const show = (slug: string) => ({
  pageUrl: `${SITE}/podcasts/${slug}`,
  feedUrl: `${SITE}/podcasts/${slug}/feed.xml`,
  cover: `${SITE}/email/${slug}-cover.jpg`,
});

export const THEMES = {
  "value-created": {
    slug: "value-created",
    name: "Value, Created",
    from: "Value, Created <hello@thejoydigi.com>",
    spotifyUrl: "https://open.spotify.com/show/3ZKCjfSrrsJ1W3kJRn9qXk",
    ...show("value-created"),
    card: "#0C1130",
    text: "#F4EEDD",
    muted: "#B9B4A6",
    heading: "#FFD47E",
    kicker: "#F2A81D",
    accent: "#F2A81D",
    onAccent: "#0C1130",
    outline: "#8A6D2F",
    subtle: "#151B42",
  },
  "money-mastered": {
    slug: "money-mastered",
    name: "Money, Mastered",
    from: "Money, Mastered <hello@thejoydigi.com>",
    spotifyUrl: "https://open.spotify.com/show/4lfKVQtvDKY7X6YWn4JmfO",
    ...show("money-mastered"),
    card: "#060E1A",
    text: "#EFE6D2",
    muted: "#A9A391",
    heading: "#F3DE9E",
    kicker: "#D9B56A",
    accent: "#D9B56A",
    onAccent: "#060E1A",
    outline: "#7A6840",
    subtle: "#0E1A2B",
  },
  "oc-pack": {
    slug: "oc-pack",
    name: "The OC Pack",
    from: "The OC Pack <hello@thejoydigi.com>",
    spotifyUrl: "https://open.spotify.com/show/1vEadmFS7Bq1i3K9HfAzXO",
    ...show("oc-pack"),
    card: "#FFF4DA",
    text: "#6B3410",
    muted: "#7E5A3E",
    heading: "#6B3410",
    kicker: "#B8431F",
    accent: "#B8431F",
    onAccent: "#FFFFFF",
    outline: "#6B3410",
    subtle: "#FDE3A7",
  },
  "anthropic-blogcast": {
    slug: "anthropic-blogcast",
    name: "Anthropic Blogcast",
    from: "Anthropic Blogcast <hello@thejoydigi.com>",
    spotifyUrl: "https://open.spotify.com/show/0U5pyPMawaksXnC5PD821m",
    ...show("anthropic-blogcast"),
    card: "#101418",
    text: "#F4EFE6",
    muted: "#A7A39B",
    heading: "#F4EFE6",
    kicker: "#E9B44C",
    accent: "#E2725B",
    onAccent: "#101418",
    outline: "#6E6961",
    subtle: "#1A1F24",
  },
  "incentives-decoded": {
    slug: "incentives-decoded",
    name: "Incentives, Decoded",
    from: "Incentives, Decoded <hello@thejoydigi.com>",
    spotifyUrl: "",
    ...show("incentives-decoded"),
    card: "#5B3DF5",
    text: "#FFFFFF",
    muted: "#E4DEFF",
    heading: "#D4FF3A",
    kicker: "#D4FF3A",
    accent: "#D4FF3A",
    onAccent: "#0E0D12",
    outline: "#0E0D12",
    subtle: "#4A2FE0",
  },
} satisfies Record<string, ShowTheme>;

export type ShowSlug = keyof typeof THEMES;
