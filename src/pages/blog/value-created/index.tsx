import { GetStaticProps } from "next";
import Link from "next/link";
import { getPostSummaries, type PostSummary } from "@/lib/posts";
import { getPublication, type Publication } from "@/lib/publications";
import BlogCard from "@/components/blog/blog-card";
import BlogLayout from "../_layout";

interface SectionProps {
  publication: Publication;
  posts: PostSummary[];
}

/**
 * Section index for the Value, Created publication. A section page like
 * this one is added only when its publication launches (launch rule: the
 * first 3 posts ready; see podcast/blog-seo/PROGRAM.md). Post URLs stay
 * at /blog/<slug>; this page is the publication's home and SEO lane.
 */
export default function ValueCreatedSection({
  publication,
  posts,
}: SectionProps) {
  return (
    <BlogLayout
      seo={{ title: `${publication.name} | The Joy Digi`, description: publication.description }}
    >
      <div className="blog-dark">
        <div className="b-wrap">
          <header className="b-mast">
            <Link href="/blog" className="b-back">
              ← All articles
            </Link>
            <p className="xp-label" style={{ marginTop: 32 }}>
              Publication
            </p>
            <h1 className="b-h1">{publication.name}</h1>
            <p className="b-lead">{publication.tagline}</p>
            <p className="b-lead" style={{ marginTop: 16 }}>
              Each article answers one founder question and stands on one
              chapter of the free audiobook. Start with the question you
              are actually asking this week.
            </p>
            <p className="b-meta">
              {posts.length} article{posts.length === 1 ? "" : "s"} · New
              questions twice a week ·{" "}
              <Link href="/podcasts/value-created" className="b-inline-link">
                Hear the audiobook
              </Link>{" "}
              ·{" "}
              <Link href="/books/value-created" className="b-inline-link">
                The book page
              </Link>
            </p>
          </header>

          <section className="b-section" aria-label="Value, Created articles">
            <div>
              {posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  dateLabel={post.dateLabel}
                  slug={post.slug}
                  category={post.category}
                  readingTime={post.readingTime}
                  chapter={post.chapter}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </BlogLayout>
  );
}

export const getStaticProps: GetStaticProps<SectionProps> = async () => {
  const publication = getPublication("value-created");
  if (!publication) throw new Error("value-created publication missing");
  const posts = await getPostSummaries("value-created");
  return { props: { publication, posts } };
};
