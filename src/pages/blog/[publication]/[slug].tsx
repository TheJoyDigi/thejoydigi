import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import {
  getPostByPublicationAndSlug,
  getPostSummaries,
  getRelatedPosts,
  type Post,
  type PostSummary,
} from "@/lib/posts";
import { getPublication } from "@/lib/publications";
import { mdxComponents } from "@/components/blog/mdx-components";
import ReadingProgress from "@/components/blog/reading-progress";
import Toc from "@/components/blog/toc";
import PostEnd from "@/components/blog/post-end";
import BlogLayout from "../_layout";

interface BlogPostProps {
  post: Post;
  relatedPosts: PostSummary[];
}

export default function BlogPost({ post, relatedPosts }: BlogPostProps) {
  if (!post) return null;

  const publication = getPublication(post.publication);
  const showToc = post.headings.length >= 3 && post.wordCount >= 700;

  return (
    <BlogLayout postData={post}>
      <div className="blog-light">
        <ReadingProgress targetId="post-body" />
        <header className="b-head">
          <Link href="/blog" className="b-back">
            ← All articles
          </Link>
          <p className="b-kicker">
            {publication ? publication.name : post.category}
            {post.chapter ? (
              <span className="b-kicker__bug">Chapter {post.chapter.number}</span>
            ) : null}
          </p>
          <h1 className="b-title">{post.title}</h1>
          <div className="b-byline">
            <span className="b-byline__name">Long La</span>
            <span>
              <time dateTime={post.date}>{post.dateLabel}</time>
            </span>
            <span>{post.readingTime} min read</span>
          </div>
        </header>

        <div className="b-grid">
          <aside className="b-grid__toc">
            {showToc ? <Toc headings={post.headings} variant="rail" /> : null}
          </aside>
          <article className="b-grid__main">
            {showToc ? (
              <div className="b-toc-m-wrap">
                <Toc headings={post.headings} variant="mobile" />
              </div>
            ) : null}
            <div id="post-body" className="post-prose">
              <MDXRemote {...post.content} components={mdxComponents} />
            </div>
            <PostEnd post={post} related={relatedPosts} />
          </article>
          <div className="b-grid__gutter" aria-hidden="true" />
        </div>
      </div>
    </BlogLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPostSummaries();
  const paths = posts.map((post) => ({
    params: { publication: post.publication, slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPostProps> = async ({
  params,
}) => {
  const publication = params?.publication as string;
  const slug = params?.slug as string;

  // Unknown publication: clean 404, never a half-resolved post page.
  if (!getPublication(publication)) {
    return { notFound: true };
  }

  const post = await getPostByPublicationAndSlug(publication, slug);

  if (!post) {
    return { notFound: true };
  }

  const relatedPosts = await getRelatedPosts(post);

  return {
    props: {
      post,
      relatedPosts,
    },
  };
};
