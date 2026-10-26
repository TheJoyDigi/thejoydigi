import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPostSummaries, type PostSummary } from "@/lib/posts";
import { PUBLICATIONS } from "@/lib/publications";
import { BLOG_TRAIL } from "@/content/blog-trail";
import BlogCard from "@/components/blog/blog-card";
import BlogLayout from "./_layout";

interface TrailView {
  n: number;
  title: string;
  slug?: string;
  /** Nested post URL (/blog/<publication>/<slug>) once the post is live. */
  href?: string;
}

interface BlogIndexProps {
  posts: PostSummary[];
  trail: TrailView[];
  publishedInTrail: number;
}

export default function BlogIndex({
  posts,
  trail,
  publishedInTrail,
}: BlogIndexProps) {
  const [lead, ...rest] = posts;
  const upcoming = PUBLICATIONS.filter((p) => !p.launched);

  return (
    <BlogLayout
      seo={{
        title: "Value Creation for Founders | The Joy Digi",
        description:
          "Plain-language answers on how value is created, proven, and priced, for people building a first real business.",
      }}
    >
      <div className="blog-dark">
        <div className="b-wrap">
          <header className="b-mast">
            <p className="xp-label">Value, Created: the field guide</p>
            <h1 className="b-h1">
              How value is actually{" "}
              <em className="b-h1__accent">created, proven, and priced.</em>
            </h1>
            <p className="b-lead">
              Plain-language answers for people building a first real
              business. One founder question per article, each drawn from a
              chapter of the free audiobook Value, Created, produced by The
              Joy Digi.
            </p>
            <p className="b-meta">
              {posts.length} article{posts.length === 1 ? "" : "s"} · New
              questions twice a week
            </p>
          </header>

          <section className="b-section" aria-label="Start here">
            <div className="b-section__head">
              <span className="xp-label">Start here: the first nine questions</span>
              <span className="b-meta">
                {publishedInTrail} of {trail.length} published
              </span>
            </div>
            <p className="b-trail__intro">
              The path I would give a founder with no customers yet.
            </p>
            <ol className="b-trail">
              {trail.map((item) => (
                <li key={item.n} className="b-trail__item">
                  <span
                    className={
                      item.href ? "b-trail__n is-live" : "b-trail__n"
                    }
                  >
                    {item.n}
                  </span>
                  {item.href ? (
                    <Link href={item.href} className="b-trail__link">
                      {item.title}
                      <span className="b-chip">Read</span>
                    </Link>
                  ) : (
                    <span className="b-trail__soon" aria-disabled="true">
                      {item.title}
                      <span className="b-chip b-chip--soon">Soon</span>
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <p className="b-meta">
              The full series lives in its own section:{" "}
              <Link href="/blog/value-created" className="b-inline-link">
                Value, Created articles
              </Link>
            </p>
          </section>

          <section className="b-section" aria-label="Latest articles">
            <h2 className="b-h2">Latest</h2>
            {lead ? (
              <>
                <article className="b-lead-story">
                  <div>
                    <Link href={`/blog/${lead.publication}/${lead.slug}`} className="b-lead-story__link">
                      <span className="b-lead-story__title">{lead.title}</span>
                    </Link>
                    <p className="b-lead-story__excerpt">{lead.excerpt}</p>
                    <p className="b-meta">
                      {lead.dateLabel} · {lead.readingTime} min read
                    </p>
                  </div>
                  <div className="b-lead-story__cover">
                    <Image
                      src={lead.coverImage}
                      alt={lead.title}
                      width={220}
                      height={220}
                      sizes="220px"
                    />
                  </div>
                </article>
                <div>
                  {rest.map((post) => (
                    <BlogCard
                      key={`${post.publication}/${post.slug}`}
                      title={post.title}
                      excerpt={post.excerpt}
                      date={post.date}
                      dateLabel={post.dateLabel}
                      slug={post.slug}
                      publication={post.publication}
                      category={post.category}
                      readingTime={post.readingTime}
                      chapter={post.chapter}
                    />
                  ))}
                </div>
              </>
            ) : (
              <p className="b-lead">The first articles are on the way.</p>
            )}
          </section>

          <section className="b-section" aria-label="Publications">
            <span className="xp-label">Publications</span>
            <p className="b-pubs">
              <Link href="/blog/value-created" className="b-inline-link">
                Value, Created
              </Link>{" "}
              is publishing now.{" "}
              {upcoming.map((p) => p.name).join(", ")} are on the way, each
              opening when its first articles are ready.
            </p>
          </section>
        </div>
      </div>
    </BlogLayout>
  );
}

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  const posts = await getPostSummaries();
  const bySlug = new Map(posts.map((p) => [p.slug, p]));
  const trail: TrailView[] = BLOG_TRAIL.map((item) => {
    if (!item.slug) return item;
    const post = bySlug.get(item.slug);
    if (!post) {
      throw new Error(
        `blog-trail references missing post slug: ${item.slug}`
      );
    }
    return { ...item, href: post.url };
  });
  return {
    props: {
      posts,
      trail,
      publishedInTrail: trail.filter((t) => t.href).length,
    },
  };
};
