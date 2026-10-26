const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

// Marketing posts removed in the 2026 portfolio relaunch; keep their old URLs resolving.
const removedPosts = require("./removed-blog-posts.json");

// Blog posts moved under their publication section on 2026-10-26 (posts now
// live at /blog/<publication>/<slug>); keep the original flat URLs resolving
// permanently. Slug -> publication.
const movedPosts = {
  "what-is-value-creation-for-founders": "value-created",
  "how-to-get-first-paying-customers": "value-created",
  "how-to-price-my-services": "value-created",
  "how-to-make-my-business-run-without-me": "value-created",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  // PostHog via a first-party path so ad blockers don't drop events; see src/lib/analytics.ts.
  async rewrites() {
    return [
      { source: "/ingest/static/:path*", destination: "https://us-assets.i.posthog.com/static/:path*" },
      { source: "/ingest/:path*", destination: "https://us.i.posthog.com/:path*" },
    ];
  },
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: "/case-studies/ruh-roh-retreat",
        destination: "/case-studies/the-blue-sock",
        permanent: true,
      },
      { source: "/services", destination: "/", permanent: true },
      { source: "/services/:path*", destination: "/", permanent: true },
      ...Object.entries(movedPosts).map(([slug, publication]) => ({
        source: `/blog/${slug}`,
        destination: `/blog/${publication}/${slug}`,
        permanent: true,
      })),
      ...removedPosts.map((slug) => ({ source: `/blog/${slug}`, destination: "/blog", permanent: true })),
    ];
  },
  // Share cards are prerendered; keep podcast audio out of the route's function bundle (Vercel 250 MB cap).
  outputFileTracingExcludes: { "/og/**/*": ["public/**/*.mp3", "public/**/*.wav", "public/**/*.m4a"] },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [{ hostname: "localhost" }],
  },
};

module.exports = withMDX(nextConfig);
