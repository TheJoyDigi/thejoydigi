import { BlogPostSEO, DefaultSEO } from "@/components/seo";
import { SiteFrame } from "@/components/marketing/site-chrome";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type BlogLayoutProps = {
  children: React.ReactNode;
  postData?: {
    slug: string;
    publication: string;
    title: string;
    date: string;
    coverImage: string;
    category: string;
    excerpt: string;
  };
  /** Title/description for hub and publication section pages. */
  seo?: {
    title: string;
    description: string;
  };
};

const BlogLayout: React.FC<BlogLayoutProps> = ({ children, postData, seo }) => {
  const router = useRouter();
  const [currentPostData, setCurrentPostData] = useState(postData);

  useEffect(() => {
    setCurrentPostData(postData);
  }, [postData]);


  return (
    <>
      {router.pathname === "/blog/[publication]/[slug]" && currentPostData ? (
        <BlogPostSEO
          title={currentPostData.title}
          description={currentPostData.excerpt}
          date={currentPostData.date}
          author="Long La"
          slug={currentPostData.slug}
          path={`/blog/${currentPostData.publication}/${currentPostData.slug}`}
          hasCoverImage={!!currentPostData.coverImage}
        />
      ) : (
        <DefaultSEO
          image="/og/site/blog.png"
          title={seo?.title || "Value Creation for Founders | The Joy Digi"}
          description={
            seo?.description ||
            "Plain-language answers on how value is created, proven, and priced, for people building a first real business."
          }
        />
      )}
      <SiteFrame>{children}</SiteFrame>
    </>
  );
};

export default BlogLayout;
