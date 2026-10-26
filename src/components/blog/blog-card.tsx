import Link from "next/link";
import type { ChapterRef } from "@/lib/posts";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  category: string;
  /** "row" for index lists, "compact" for related reading. */
  variant?: "row" | "compact";
  /** Preformatted date, e.g. "October 26, 2026". Falls back to `date`. */
  dateLabel?: string;
  readingTime?: number;
  chapter?: ChapterRef | null;
}

export default function BlogCard({
  title,
  excerpt,
  date,
  slug,
  variant = "row",
  dateLabel,
  readingTime,
  chapter,
}: BlogCardProps) {
  const when = dateLabel || date;
  const meta = readingTime ? `${when} · ${readingTime} min read` : when;

  if (variant === "compact") {
    return (
      <Link href={`/blog/${slug}`} className="b-compact">
        {chapter ? (
          <span className="b-compact__ch">Chapter {chapter.number}</span>
        ) : null}
        <span className="b-compact__title">{title}</span>
        <span className="b-compact__meta">{meta}</span>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${slug}`} className="b-row">
      <span className="b-row__ch">{chapter ? `CH ${chapter.number}` : ""}</span>
      <span className="b-row__main">
        <span className="b-row__title">{title}</span>
        <span className="b-row__excerpt">{excerpt}</span>
        <span className="b-row__meta">{meta}</span>
      </span>
      <span className="b-row__arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}
