import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/marketing/kit";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  coverImage: string;
  category: string;
}

export default function BlogCard({
  title,
  excerpt,
  date,
  slug,
  coverImage,
  category,
}: BlogCardProps) {
  return (
    <Reveal className="h-full">
      <Link
        href={`/blog/${slug}`}
        className="group block h-full overflow-hidden rounded-[2rem] border-2 border-[#003B49] bg-white shadow-[6px_6px_0_0_#003B49] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#003B49] no-underline hover:no-underline"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(min-width: 1024px) 400px, 92vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <span className="absolute left-4 top-4 inline-flex rounded-full border-2 border-[#003B49] bg-[#FFC94A] px-3 py-1 text-sm font-bold text-[#003B49]">
            {category}
          </span>
        </div>
        <div className="p-6 md:p-7">
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#003B49]/55">{date}</div>
          <h2 className="font-display !py-0 mb-2 text-2xl font-[460] text-[#003B49] line-clamp-2">
            {title}
          </h2>
          <p className="text-[#003B49]/75 line-clamp-3">{excerpt}</p>
          <span className="mt-4 inline-flex items-center gap-1 font-semibold text-[#FF6B6B]">
            Read article <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
