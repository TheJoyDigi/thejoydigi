import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

interface DefaultSEOProps {
  title?: string;
  description?: string;
  image?: string;
}

export const DefaultSEO: React.FC<DefaultSEOProps> = ({
  title = "The Joy Digi | A Digital Studio for visionary brands",
  description = "Helping businesses grow with joyful experiences, purposeful design, custom tech, and clear strategy. Specializing in website design, web & mobile apps, SEO, and digital consulting.",
  image = "/long-digital-partner-websites-apps-seo-the-joy-digi-rectangle.webp",
}) => {
  const { asPath } = useRouter();
  const url = `https://thejoydigi.com${asPath.split(/[?#]/)[0]}`;
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
            url: image,
            width: 1200,
            height: 630,
            alt: "The Joy Digi",
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
            "digital studio, web design, web development, mobile apps, SEO, digital marketing, tech consulting, custom software, business growth, digital strategy",
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
    : "https://www.thejoydigi.com/about-image.webp";

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
