import { NextSeo } from "next-seo";
import Head from "next/head";
import { useCallback, useState, type MouseEvent } from "react";
import { SiSpotify, SiYoutube } from "react-icons/si";
import type { Show } from "@/lib/podcasts";

export function PodcastSeo({ show, title: showTitle, description: showDescription, episode }: { show: Show; title: string; description: string; episode?: number }) {
  const ep = episode === undefined ? undefined : show.episodes[episode];
  const title = ep ? `${ep.shortTitle} — ${show.title}` : showTitle;
  const description = ep ? ep.description : showDescription;
  const url = ep ? `${show.pageUrl}/${ep.number}` : show.pageUrl;
  const cover = `https://www.thejoydigi.com${show.cover}`;
  const card = `https://www.thejoydigi.com/og/podcasts/${show.slug}/${ep ? ep.number : "show"}.png`;
  const series = {
    "@type": "PodcastSeries",
    name: show.title,
    description: show.description,
    url: show.pageUrl,
    webFeed: show.feedUrl,
    image: cover,
    author: { "@type": "Person", name: show.author },
    publisher: { "@type": "Organization", name: "The Joy Digi", url: "https://www.thejoydigi.com" },
  };
  const episodeLd = (e: Show["episodes"][number]) => ({
    "@type": "PodcastEpisode",
    url: `${show.pageUrl}/${e.number}`,
    name: e.title,
    episodeNumber: e.number,
    description: e.description,
    datePublished: new Date(e.pubDate).toISOString(),
    timeRequired: `PT${Math.round(e.seconds / 60)}M`,
    associatedMedia: { "@type": "MediaObject", contentUrl: `https://www.thejoydigi.com${e.audio}` },
  });
  const jsonLd = ep
    ? [
        { "@context": "https://schema.org", ...episodeLd(ep), image: cover, partOfSeries: { "@type": "PodcastSeries", name: show.title, url: show.pageUrl } },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Podcasts", item: "https://www.thejoydigi.com/podcasts" },
            { "@type": "ListItem", position: 2, name: show.title, item: show.pageUrl },
            { "@type": "ListItem", position: 3, name: ep.shortTitle, item: url },
          ],
        },
      ]
    : { "@context": "https://schema.org", ...series, episode: show.episodes.map(episodeLd) };
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          type: "website",
          url,
          title,
          description,
          siteName: "The Joy Digi",
          images: [{ url: card, width: 1200, height: 630, alt: ep ? `${ep.shortTitle}, ${show.title}` : show.title }],
        }}
        twitter={{ cardType: "summary_large_image", site: "@thejoydigi" }}
      />
      <Head>
        <link rel="alternate" type="application/rss+xml" title={show.title} href={show.feedUrl} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
    </>
  );
}

export function useCopy(text: string) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy this feed URL:", text);
    }
  }, [text]);
  return { copied, copy };
}

export const PlayIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
  </svg>
);

export const PauseIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <rect x="6" y="5" width="4.5" height="14" rx="1.2" />
    <rect x="13.5" y="5" width="4.5" height="14" rx="1.2" />
  </svg>
);

export const SkipIcon = ({ seconds, back = false, className = "" }: { seconds: number; back?: boolean; className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {back ? <path d="M4 12a8 8 0 1 0 2.3-5.7M4 4v4h4" /> : <path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v4h-4" />}
    <text x="12" y="15.2" textAnchor="middle" fontSize="7" fontWeight="700" fill="currentColor" stroke="none">
      {seconds}
    </text>
  </svg>
);

/** Animated bars shown only while an episode is actually playing. */
export function Equalizer({ color, active }: { color: string; active: boolean }) {
  return (
    <span className="inline-flex h-4 items-end gap-[3px]" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-[3px] rounded-full"
          style={{
            background: color,
            height: active ? undefined : "30%",
            animation: active ? `pod-eq 0.9s ${i * 0.15}s ease-in-out infinite alternate` : "none",
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes pod-eq {
          from {
            height: 25%;
          }
          to {
            height: 100%;
          }
        }
      `}</style>
    </span>
  );
}

/** Hero "listen elsewhere" pills; each page passes its own themed pill classes. */
export function PlatformLinks({ spotify, youtube, className = "", linkClassName = "" }: { spotify?: string; youtube?: string; className?: string; linkClassName?: string }) {
  const pill = `inline-flex min-h-11 items-center gap-2 no-underline hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${linkClassName}`;
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {spotify && (
        <a href={spotify} target="_blank" rel="noopener noreferrer" className={pill}>
          <SiSpotify aria-hidden size={22} color="#1DB954" />
          Spotify
        </a>
      )}
      {youtube && (
        <a href={youtube} target="_blank" rel="noopener noreferrer" className={pill}>
          <SiYoutube aria-hidden size={22} color="#FF0000" />
          YouTube
        </a>
      )}
    </div>
  );
}

/** "✓ Played" or a thin bar with time left, for an episode row. */
export function ListenProgress({ time, seconds, done, color, track, className = "" }: { time: number; seconds: number; done: boolean; color: string; track: string; className?: string }) {
  if (done && (time < 1 || time >= seconds - 20)) return <span className={`flex w-fit items-center gap-1 text-xs font-semibold ${className}`}>✓ Played</span>;
  if (time < 1) return null;
  return (
    <span className={`flex w-fit items-center gap-2 text-xs font-semibold tabular-nums ${className}`}>
      <span className="relative h-1 w-16 overflow-hidden rounded-full" style={{ background: track }}>
        <span className="absolute inset-y-0 left-0 rounded-full" style={{ background: color, width: `${Math.min(100, (time / seconds) * 100)}%` }} />
      </span>
      {fmtLeft(seconds - time)}
    </span>
  );
}

export const fmtLeft = (s: number) => {
  const m = Math.max(1, Math.round(s / 60));
  return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m left` : `${m} min left`;
};

export const episodePath = (show: Show, ep: { number: number }) => `/podcasts/${show.slug}/${ep.number}`;

/** Plain clicks play in place; modified clicks (new tab, etc.) follow the link to the episode page. */
export function playOnPlainClick(e: MouseEvent, play: () => void) {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  e.stopPropagation();
  play();
}
