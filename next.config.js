const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

// Marketing posts removed in the 2026 portfolio relaunch; keep their old URLs resolving.
const removedPosts = require("./removed-blog-posts.json");

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
    domains: ["localhost"],
  },
};

module.exports = withMDX(nextConfig);
