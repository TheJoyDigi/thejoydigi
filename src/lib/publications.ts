/**
 * Blog publications registry. /blog is the shared hub; each publication is a
 * niche lane with its own section index at /blog/<slug>, generated and linked
 * only once the publication has published posts (launch rule: first 3 posts
 * ready before a section opens; see podcast/blog-seo/PROGRAM.md).
 * All publications share the one reading template, explainer components,
 * and SEO machinery.
 */
export interface Publication {
  slug: string;
  name: string;
  /** One-line positioning shown on the section page and hub. */
  tagline: string;
  /** Meta description for the section index. */
  description: string;
  /** The niche lane this publication owns. */
  lane: string;
  /** True once the section index exists and is linked. */
  launched: boolean;
}

export const PUBLICATIONS: Publication[] = [
  {
    slug: "value-created",
    name: "Value, Created",
    tagline: "Value creation for early-stage founders, in plain language.",
    description:
      "Plain-language answers on how value is created, proven, and priced, for people building a first real business. From the free audiobook Value, Created, produced by The Joy Digi.",
    lane: "Value creation for early founders",
    launched: true,
  },
  {
    slug: "money-mastered",
    name: "Money, Mastered",
    tagline: "Personal money, in plain language.",
    description:
      "Plain-language answers about personal money: earning, keeping, and growing it without the jargon.",
    lane: "Personal money, plain language",
    launched: false,
  },
  {
    slug: "oc-pack",
    name: "The OC Pack",
    tagline: "Life with dogs in Orange County.",
    description:
      "Practical answers for Orange County pet parents: places, care, and the everyday craft of a good life with a dog.",
    lane: "Orange County pet parents",
    launched: false,
  },
  {
    slug: "anthropic-blogcast",
    name: "Anthropic Blogcast",
    tagline: "The SI industry, explained.",
    description:
      "Plain-language explainers on the SI industry: what shipped, what it means, and what to do with it.",
    lane: "SI industry explainers",
    launched: false,
  },
];

export const DEFAULT_PUBLICATION = "value-created";

export function getPublication(slug: string): Publication | undefined {
  return PUBLICATIONS.find((p) => p.slug === slug);
}
