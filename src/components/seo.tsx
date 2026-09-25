import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

interface DefaultSEOProps {
  title?: string;
  description?: string;
  image?: string;
}

export const DefaultSEO: React.FC<DefaultSEOProps> = ({
  title = "The Joy Digi — Long La, a joyful builder",
  description = "Long La builds joyful things with code and AI: The Blue Sock, QRganiz, the Money, Mastered audiobook, The OC Pack podcast, and experiments from the lab.",
  image = "/og-the-joy-digi.png",
}) => {
  const { asPath } = useRouter();
  const url = `https://thejoydigi.com${asPath.split(/[?#]/)[0]}`;
  const imageUrl = image.startsWith("/") ? `https://www.thejoydigi.com${image}` : image;
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={url}
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
            alt: "Long La, a 3D illustrated portrait, next to the words: I build joyful things with code & AI",
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
            "Long La, The Joy Digi, software engineer, AI, builder, portfolio, podcasts, The Blue Sock, QRganiz, Money Mastered, The OC Pack",
        },
        {
          name: "author",
          content: "TheJoyDigi",
        },
        {
          name: "copyright",
          content: "© 2024 TheJoyDigi. All rights reserved.",
        },
      ]}
    />
  );
};

interface BlogPostSEOProps {
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
  hasCoverImage: boolean;
}

export const BlogPostSEO: React.FC<BlogPostSEOProps> = ({
  title,
  description,
  date,
  author,
  slug,
  hasCoverImage,
}) => {
  const imageUrl = hasCoverImage
    ? `https://www.thejoydigi.com/posts/${slug}/cover.webp`
    : "https://www.thejoydigi.com/og-the-joy-digi.png";

  const fullTitle = `${title} - TheJoyDigi Blog`;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <NextSeo
      title={fullTitle}
      description={description}
      canonical={`https://www.thejoydigi.com/blog/${slug}`}
      openGraph={{
        type: "article",
        url: `https://www.thejoydigi.com/blog/${slug}`,
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
  );
};
