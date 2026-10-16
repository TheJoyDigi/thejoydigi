import posthog from "posthog-js";
import { KINDLE_PRICE, KINDLE_URL, PAPERBACK_PRICE, PAPERBACK_URL } from "@/components/podcast/value-created/buy-book";

// Public project key (safe to ship, like the Clarity/GA ids in _document.tsx).
const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || "phc_uqwvizTTXUbrpT7wnWbqzRqQQMpwoc43kJeJuxn4cwLj";
const PROD_HOSTS = ["thejoydigi.com", "www.thejoydigi.com"];
// Set NEXT_PUBLIC_POSTHOG_LOCAL=1 to test tracking on localhost; those events carry $host=localhost.
const LOCAL = process.env.NEXT_PUBLIC_POSTHOG_LOCAL === "1";

let ready = false;

/** Visiting any page with ?notrack=1 opts this browser out for good; ?notrack=0 opts back in. */
function applyOptOut() {
  const flag = new URLSearchParams(window.location.search).get("notrack");
  if (flag === "1") posthog.opt_out_capturing();
  if (flag === "0") posthog.opt_in_capturing();
}

export function initAnalytics() {
  if (ready || typeof window === "undefined" || !(PROD_HOSTS.includes(window.location.hostname) || LOCAL)) return;
  posthog.init(KEY, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: "2026-08-30",
    capture_pageview: "history_change",
    person_profiles: "identified_only",
  });
  ready = true;
  applyOptOut();
  document.addEventListener("click", onOutboundClick, true);
}

export function track(event: string, props?: Record<string, unknown>) {
  if (ready) posthog.capture(event, props);
}

const PLATFORMS: [RegExp, string][] = [
  [/(^|\.)spotify\.com$/, "spotify"],
  [/(^|\.)(youtube\.com|youtu\.be)$/, "youtube"],
  [/(^|\.)podcasts\.apple\.com$/, "apple_podcasts"],
  [/(^|\.)overcast\.fm$/, "overcast"],
  [/(^|\.)pocketcasts\.com$/, "pocket_casts"],
];

const BOOK_LINKS: Record<string, { book: string; format: string; price: number }> = {
  [PAPERBACK_URL]: { book: "value-created", format: "paperback", price: Number(PAPERBACK_PRICE.slice(1)) },
  [KINDLE_URL]: { book: "value-created", format: "kindle", price: Number(KINDLE_PRICE.slice(1)) },
};

/** Show slug from /podcasts/<slug> or /books/<slug> so platform clicks are attributed to a show. */
const showFromPath = () => window.location.pathname.match(/^\/(?:podcasts|books)\/([^/?#]+)/)?.[1];

function onOutboundClick(e: MouseEvent) {
  const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
  if (!a) return;
  let url: URL;
  try {
    url = new URL(a.href, window.location.href);
  } catch {
    return;
  }
  const base = { show: showFromPath(), page: window.location.pathname, link_text: a.textContent?.trim().slice(0, 80), href: url.href };
  const book = BOOK_LINKS[`${url.origin}${url.pathname}`];
  if (book) return track("book_buy_click", { ...base, ...book, store: "amazon" });
  const isFeed = url.origin === window.location.origin && /\.(xml|rss)$|\/feed\b/.test(url.pathname);
  const platform = isFeed ? "rss" : PLATFORMS.find(([re]) => re.test(url.hostname))?.[1];
  if (platform) return track("listen_elsewhere_click", { ...base, platform });
  if (url.protocol === "mailto:") return track("outbound_click", { ...base, domain: "email" });
  if (/^https?:$/.test(url.protocol) && url.origin !== window.location.origin) track("outbound_click", { ...base, domain: url.hostname.replace(/^www\./, "") });
}
