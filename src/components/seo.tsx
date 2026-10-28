import { NextSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";

interface DefaultSEOProps {
  title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
}

const SITE_URL = "https://www.thejoydigi.com";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "The Joy Digi",
      url: SITE_URL,
      logo: `${SITE_URL}/og-the-joy-digi-v2.png`,
    },
    {
      "@type": "WebSite",
      name: "The Joy Digi",
      url: SITE_URL,
      publisher: { "@type": "Organization", name: "The Joy Digi" },
    },
  ],
};

export const DefaultSEO: React.FC<DefaultSEOProps> = ({
  title = "The Joy Digi: Podcasts by Long La",
  description = "The Joy Digi is Long La's independent podcast studio: Value, Created, Money, Mastered, Incentives, Decoded, The OC Pack, and the Anthropic Blogcast. Every episode free.",
  image = "/og-the-joy-digi-v2.png",
  noindex = false,
}) => {
  const { asPath } = useRouter();
  const url = `${SITE_URL}${asPath.split(/[?#]/)[0]}`;
  const imageUrl = image.startsWith("/") ? `${SITE_URL}${image}` : image;
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        noindex={noindex}
        openGraph={{
          type: "website",
          url,
          title,
          description,
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: "Long La, a 3D illustrated portrait",
            },
          ],
          siteName: "TheJoyDigi",
        }}
        twitter={{
          handle: "@thejoydigi",
          site: "@thejoydigi",
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "Long La, The Joy Digi, podcasts, podcast studio, Value Created, Money Mastered, Incentives Decoded, The OC Pack, Anthropic Blogcast",
          },
          {
            name: "author",
            content: "TheJoyDigi",
          },
          {
            name: "copyright",
            content: "© 2026 TheJoyDigi. All rights reserved.",
          },
        ]}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </Head>
    </>
  );
};

interface BlogPostSEOProps {
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
  hasCoverImage: boolean;
  /** Canonical page path. Post pages pass `/blog/<publication>/<slug>` explicitly
   *  (posts nest under their publication section); the `/blog/<slug>` default is
   *  only a fallback for legacy callers like /seo-plan. */
  path?: string;
}

export const BlogPostSEO: React.FC<BlogPostSEOProps> = ({
  title,
  description,
  date,
  author,
  slug,
  hasCoverImage,
  path,
}) => {
  const pagePath = path ?? `/blog/${slug}`;
  const pageUrl = `https://www.thejoydigi.com${pagePath}`;
  const imageUrl = hasCoverImage
    ? `https://www.thejoydigi.com/posts/${slug}/cover.webp`
    : "https://www.thejoydigi.com/og-the-joy-digi-v2.png";

  const fullTitle = `${title} - TheJoyDigi Blog`;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: [imageUrl],
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Organization",
      name: "The Joy Digi",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "The Joy Digi",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-the-joy-digi-v2.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  return (
    <>
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </Head>
    <NextSeo
      title={fullTitle}
      description={description}
      canonical={pageUrl}
      openGraph={{
        type: "article",
        url: pageUrl,
        title: fullTitle,
        description,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        article: {
          publishedTime: date,
          authors: [author],
          section: "Digital Solutions Blog",
          tags: [
            "web development",
            "digital transformation",
            "mobile apps",
            "user experience",
            "technical SEO",
          ],
        },
        siteName: "TheJoyDigi",
      }}
      twitter={{
        handle: "@thejoydigi",
        site: "@thejoydigi",
        cardType: "summary_large_image",
      }}
      additionalMetaTags={[
        {
          name: "keywords",
          content: `website design, web development, mobile app development, progressive web apps, technical SEO, digital analytics, ${title.toLowerCase()}`,
        },
        {
          name: "robots",
          content: "index, follow",
        },
      ]}
    />
    </>
  );
};
