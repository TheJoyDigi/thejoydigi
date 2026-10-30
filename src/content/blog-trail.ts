export interface TrailItem {
  n: number;
  title: string;
  slug?: string;
}

/**
 * The Value, Created beachhead cluster, in reading order. A slug makes the
 * row a link; no slug means "coming". Keep in sync with
 * podcast/blog-seo/QUEUE.md. When a post publishes, add its slug here in
 * the same PR. The blog index throws at build time if a trail slug has no
 * matching post, so this list can never promise a dead link.
 */
export const BLOG_TRAIL: TrailItem[] = [
  { n: 1, title: "What Is Value Creation, and How Does a Founder Actually Do It?", slug: "what-is-value-creation-for-founders" },
  { n: 2, title: "How Do I Find Out If Customers Will Actually Pay for What I'm Building?", slug: "how-to-get-first-paying-customers" },
  { n: 3, title: "Is Price the Same as Value? What a Price Actually Tells You", slug: "is-price-the-same-as-value" },
  { n: 4, title: "How Do I Price My Services Without Undercharging?", slug: "how-to-price-my-services" },
  { n: 5, title: "Why Will Anyone Pay? Needs, Wants, and Pain", slug: "how-to-find-a-customer-pain-point" },
  { n: 6, title: "How Do I Find a Business Idea Worth Pursuing?", slug: "how-to-find-a-business-idea" },
  { n: 7, title: "Why Do Founders Create Value and Still Not Get Paid?", slug: "value-creation-vs-value-capture" },
  { n: 8, title: "Why Am I Busy but Not Making Money?" },
  { n: 9, title: "How Do I Choose What to Build Next?" },
];

