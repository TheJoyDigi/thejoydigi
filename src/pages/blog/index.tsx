import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import BlogCard from "../../components/blog/blog-card";
import { CtaBand, PageHero, Reveal } from "@/components/marketing/kit";
import { getAllPosts } from "../../lib/posts";
import BlogLayout from "./_layout";

interface BlogIndexProps {
  posts: {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    coverImage: string;
    category: string;
  }[];
}

export default function BlogIndex({ posts }: BlogIndexProps) {
  const [featured, ...rest] = posts;

  return (
    <BlogLayout>
      <PageHero
        kicker="Field notes"
        title="Notes from the"
        accent="workbench."
        lead="Honest write-ups on what I'm building, what super intelligence (SI) is changing, and what I learn along the way."
      />

      <section className="bg-[#FDF6EC] py-16 md:py-24">
        <div className="container mx-auto px-4">
          {featured && (
            <Reveal className="mb-10 md:mb-14">
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid gap-0 overflow-hidden rounded-[2rem] border-2 border-[#1B140D] bg-white shadow-[6px_6px_0_0_#1B140D] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#1B140D] no-underline hover:no-underline lg:grid-cols-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-4 top-4 inline-flex rounded-full border-2 border-[#1B140D] bg-[#FFC94A] px-3 py-1 text-sm font-bold text-[#1B140D]">
                    {featured.category}
                  </span>
                </div>
                <div className="flex flex-col justify-center p-8 md:p-10">
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#6B5D4F]">
                    {featured.date}
                  </div>
                  <h2 className="font-ui !py-0 font-bold tracking-[-0.02em] mb-3 text-3xl text-[#1B140D] md:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="text-[#1B140D]/75">{featured.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1 font-semibold text-[#8F6300]">
                    Read article <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          {featured ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="mx-auto max-w-2xl rounded-[2rem] border-2 border-dashed border-[#1B140D]/25 bg-white/60 px-8 py-16 text-center">
                <p className="font-bungee text-2xl md:text-3xl text-[#1B140D]">The first notes are <span className="joy-accent">brewing.</span></p>
                <p className="mt-4 text-[#1B140D]/70">
                  In the meantime, see what I&apos;m building in the{" "}
                  <Link href="/#lab" className="font-semibold text-[#8F6300] underline-offset-4 hover:underline">
                    Lab
                  </Link>{" "}
                  or press play on a{" "}
                  <Link href="/podcasts" className="font-semibold text-[#8F6300] underline-offset-4 hover:underline">
                    podcast
                  </Link>
                  .
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <CtaBand />
    </BlogLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
};
