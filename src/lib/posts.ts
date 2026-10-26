import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import { DEFAULT_PUBLICATION } from "./publications";
import { slugifyHeading } from "./slug";

const postsDirectory = path.join(process.cwd(), "posts");

export interface Heading {
  id: string;
  text: string;
}

export interface ChapterRef {
  number: number;
  title: string;
  url: string;
}

export interface PostSummary {
  slug: string;
  title: string;
  excerpt: string;
  /** Raw ISO date string from frontmatter; used for sorting and <time dateTime>. */
  date: string;
  /** "October 26, 2026" */
  dateLabel: string;
  coverImage: string;
  category: string;
  /** Publication slug (see src/lib/publications.ts). Defaults to value-created. */
  publication: string;
  /** Whole minutes, minimum 1. */
  readingTime: number;
  /** Parsed from the closing paragraph's episode link; null if absent. */
  chapter: ChapterRef | null;
}

export interface Post extends PostSummary {
  content: any;
  headings: Heading[];
  wordCount: number;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December",
];

// "2026-10-26" -> "October 26, 2026". Parse the string; never new Date()
// (timezone drift and hydration mismatch).
function formatDateLabel(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso));
  return m ? `${MONTHS[+m[2] - 1]} ${+m[3]}, ${m[1]}` : String(iso);
}

function stripInline(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();
}

function extractHeadings(content: string): Heading[] {
  const noFences = content.replace(/```[\s\S]*?```/g, "");
  const out: Heading[] = [];
  const re = /^##\s+(.+?)\s*#*\s*$/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(noFences)) !== null) {
    const text = stripInline(m[1]);
    out.push({ id: slugifyHeading(text), text });
  }
  const ids = new Set(out.map((h) => h.id));
  if (ids.size !== out.length) {
    throw new Error(
      "Duplicate ## heading text in post; headings must be unique (anchor ids derive from text)."
    );
  }
  return out;
}

function countWords(content: string): number {
  const text = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[A-Z][^>]*>/g, " ") // explainer tags are not reading time
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#*_>`-]/g, " ");
  return (text.match(/\S+/g) || []).length;
}

function extractChapter(content: string): ChapterRef | null {
  const m =
    /\[([^\]]+)\]\((https:\/\/www\.thejoydigi\.com\/podcasts\/value-created\/(\d+))\)/.exec(
      content
    );
  return m ? { number: +m[3], title: m[1], url: m[2] } : null;
}

function buildSummary(slug: string, data: any, content: string): PostSummary {
  const wordCount = countWords(content);
  const date = data.date || new Date().toISOString();
  return {
    slug,
    title: data.title || "Untitled Post",
    excerpt: data.excerpt || content.slice(0, 150) + "...",
    date,
    dateLabel: formatDateLabel(date),
    coverImage: data.coverImage || "/images/blog-default.jpg",
    category: data.category || "Technology",
    publication: data.publication || DEFAULT_PUBLICATION,
    readingTime: Math.max(1, Math.ceil(wordCount / 230)),
    chapter: extractChapter(content),
  };
}

function listSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

function readPost(slug: string): { data: any; content: string } {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return { data, content };
}

function byDateDesc(a: PostSummary, b: PostSummary): number {
  return a.date < b.date ? 1 : -1;
}

/** Summaries for every post (no MDX serialization). Cheap enough for index pages. */
export async function getPostSummaries(
  publication?: string
): Promise<PostSummary[]> {
  const summaries = listSlugs().map((slug) => {
    const { data, content } = readPost(slug);
    return buildSummary(slug, data, content);
  });
  const filtered = publication
    ? summaries.filter((s) => s.publication === publication)
    : summaries;
  return filtered.sort(byDateDesc);
}

/** Full posts including serialized MDX. Kept for compatibility. */
export async function getAllPosts(): Promise<Post[]> {
  const summaries = await getPostSummaries();
  const posts = await Promise.all(
    summaries.map(async (summary) => {
      const post = await getPostBySlug(summary.slug);
      return post as Post;
    })
  );
  return posts.filter(Boolean);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { data, content } = readPost(slug);
    const summary = buildSummary(slug, data, content);
    const mdxSource = await serialize(content);
    return {
      ...summary,
      content: mdxSource,
      headings: extractHeadings(content),
      wordCount: countWords(content),
    };
  } catch (error) {
    return null;
  }
}

// Client-side helper functions
export function getPostSlugFromPath(path: string): string {
  return path.split("/").pop()?.replace(/\.md$/, "") || "";
}

/**
 * Related reading: same publication + category first, then same publication,
 * then everything else; newest first within each tier.
 */
export async function getRelatedPosts(
  current: PostSummary,
  limit: number = 3
): Promise<PostSummary[]> {
  const all = await getPostSummaries();
  const others = all.filter((post) => post.slug !== current.slug);
  const tier = (post: PostSummary): number => {
    if (post.publication === current.publication && post.category === current.category)
      return 0;
    if (post.publication === current.publication) return 1;
    return 2;
  };
  return others.sort((a, b) => tier(a) - tier(b)).slice(0, limit);
}
