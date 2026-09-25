import { NextSeo } from "next-seo";
import Head from "next/head";
import { useCallback, useState } from "react";
import type { Show } from "@/lib/podcasts";

export function PodcastSeo({ show, title, description }: { show: Show; title: string; description: string }) {
  const cover = `https://www.thejoydigi.com${show.cover}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: show.title,
    description: show.description,
    url: show.pageUrl,
    webFeed: show.feedUrl,
    image: cover,
    author: { "@type": "Person", name: show.author },
    publisher: { "@type": "Organization", name: "The Joy Digi", url: "https://www.thejoydigi.com" },
    episode: show.episodes.map((ep) => ({
      "@type": "PodcastEpisode",
      name: ep.title,
      description: ep.description,
      datePublished: new Date(ep.pubDate).toISOString(),
      timeRequired: `PT${Math.round(ep.seconds / 60)}M`,
      associatedMedia: { "@type": "MediaObject", contentUrl: `https://www.thejoydigi.com${ep.audio}` },
    })),
  };
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={show.pageUrl}
        openGraph={{
          type: "website",
          url: show.pageUrl,
          title,
          description,
          siteName: "The Joy Digi",
          images: [{ url: cover, width: 1400, height: 1400, alt: show.title }],
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
