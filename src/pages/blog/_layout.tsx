import { BlogPostSEO } from "@/components/seo";
import { SiteFrame } from "@/components/marketing/site-chrome";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type BlogLayoutProps = {
  children: React.ReactNode;
  postData?: {
    slug: string;
    title: string;
    date: string;
    coverImage: string;
    category: string;
    excerpt: string;
  };
};

const BlogLayout: React.FC<BlogLayoutProps> = ({ children, postData }) => {
  const router = useRouter();
  const [currentPostData, setCurrentPostData] = useState(postData);

  useEffect(() => {
    setCurrentPostData(postData);
  }, [postData]);


  return (
    <>
      {router.pathname === "/blog/[slug]" && currentPostData ? (
        <BlogPostSEO
          title={currentPostData.title}
          description={currentPostData.excerpt}
          date={currentPostData.date}
          author="TheJoyDigi Team"
          slug={currentPostData.slug}
          hasCoverImage={!!currentPostData.coverImage}
        />
      ) : (
        <BlogPostSEO
          title="Field Notes"
          description="Long La's notes on building joyful products, podcasts, and AI experiments."
          date={new Date().toISOString()}
          author="TheJoyDigi Team"
          slug="blog"
          hasCoverImage={false}
        />
      )}
      <SiteFrame>{children}</SiteFrame>
    </>
  );
};

export default BlogLayout;
