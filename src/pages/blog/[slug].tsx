import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Link from "next/link";
import BlogCard from "../../components/blog/blog-card";
import SocialShare from "../../components/blog/social-share";
import { CtaBand, Kicker, Reveal } from "@/components/marketing/kit";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "../../lib/posts";
import BlogLayout from "./_layout";

interface BlogPostProps {
  post: {
    slug: string;
    title: string;
    date: string;
    coverImage: string;
    category: string;
    content: any;
    excerpt: string;
  };
  relatedPosts: {
    slug: string;
    title: string;
    date: string;
    coverImage: string;
    category: string;
    excerpt: string;
  }[];
}

export default function BlogPost({ post, relatedPosts }: BlogPostProps) {
  const postUrl = `https://thejoydigi.com/blog/${post.slug}`;

  return (
    <BlogLayout postData={post}>
      <div className="bg-[#FDF6EC]">
        {/* Article Header */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto max-w-4xl px-4">
            <Reveal>
              <Link
                href="/blog"
                className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#003B49]/60 hover:text-[#003B49] no-underline hover:no-underline"
              >
                <span aria-hidden>←</span> All articles
              </Link>
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex rounded-full border-2 border-[#003B49] bg-[#FFC94A] px-3.5 py-1 text-sm font-bold text-[#003B49]">
                  {post.category}
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#003B49]/55">{post.date}</span>
              </div>
              <h1 className="font-display !py-0 text-4xl font-[460] tracking-[-0.03em] text-[#003B49] md:text-6xl">
                {post.title}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(0,59,73,0.45)]">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 900px, 92vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Article Body */}
        <section className="pb-16 md:pb-20">
          <div className="container mx-auto max-w-4xl px-4">
            <SocialShare title={post.title} url={postUrl} description={post.excerpt} />
            <div className="blogContainer !px-0">
              <MDXRemote {...post.content} />
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4">
              <Reveal className="mb-12 max-w-3xl">
                <Kicker>Keep reading</Kicker>
                <h2 className="font-display !py-0 mt-4 text-3xl font-[460] text-[#003B49] md:text-4xl">
                  More {post.category} articles.
                </h2>
              </Reveal>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} {...relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <CtaBand />
    </BlogLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPostBySlug(params?.slug as string);
  if (!post) {
    return {
      notFound: true,
    };
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.category);

  return {
    props: {
      post,
      relatedPosts,
    },
  };
};
