import Link from "next/link";
import type { Post, PostSummary } from "@/lib/posts";
import BlogCard from "./blog-card";
import SocialShare from "./social-share";

const BOOK_URL = "https://www.thejoydigi.com/books/value-created";

/**
 * End-of-post module: the route to the free chapter episode and the book
 * page, related reading, and share. Rendered after the prose, inside the
 * reading column.
 */
export default function PostEnd({
  post,
  related,
}: {
  post: Post;
  related: PostSummary[];
}) {
  const chapter = post.chapter;
  const postUrl = `https://www.thejoydigi.com/blog/${post.publication}/${post.slug}`;

  return (
    <div className="b-end">
      {chapter ? (
        <section className="b-route" aria-label="Listen to this chapter">
          <span className="xp-label">Hear it as a conversation</span>
          <h2 className="b-route__title">
            Chapter {chapter.number}: {chapter.title}
          </h2>
          <p className="b-route__text">
            Alex and Jordan talk this chapter through in the free audiobook,
            produced by The Joy Digi.
          </p>
          <div className="b-route__actions">
            <Link href={chapter.url} className="b-route__btn">
              Listen to Chapter {chapter.number}
            </Link>
            <Link href={BOOK_URL} className="b-route__link">
              See the book page
            </Link>
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section aria-label="Related reading">
          <h2 className="b-end__h">Keep reading</h2>
          <div className="b-related">
            {related.map((r) => (
              <BlogCard
                key={`${r.publication}/${r.slug}`}
                title={r.title}
                excerpt={r.excerpt}
                date={r.date}
                dateLabel={r.dateLabel}
                slug={r.slug}
                publication={r.publication}
                category={r.category}
                variant="compact"
                readingTime={r.readingTime}
                chapter={r.chapter}
              />
            ))}
          </div>
        </section>
      ) : null}

      <SocialShare title={post.title} url={postUrl} description={post.excerpt} />
    </div>
  );
}
