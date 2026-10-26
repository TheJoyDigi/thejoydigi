import { useEffect, useRef, useState } from "react";
import type { Heading } from "@/lib/posts";

/**
 * Table of contents, in two variants rendered by the post page:
 * "rail" (desktop sticky nav with IntersectionObserver highlighting)
 * and "mobile" (a <details> disclosure in the article column).
 * CSS shows each variant only at its breakpoint.
 */
export default function Toc({
  headings,
  variant,
}: {
  headings: Heading[];
  variant: "rail" | "mobile";
}) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id || "");
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  const closeMobile = () => {
    if (detailsRef.current) detailsRef.current.open = false;
  };

  if (variant === "rail") {
    return (
      <nav className="b-toc" aria-label="Table of contents">
        <span className="b-toc__label">On this page</span>
        <ul>
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={h.id === activeId ? "is-active" : undefined}
                aria-current={h.id === activeId ? "true" : undefined}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <details className="b-toc-m" ref={detailsRef}>
        <summary>
          <span>On this page</span>
          <span className="b-toc-m__count">{headings.length} sections</span>
        </summary>
        <ul>
          {headings.map((h) => (
            <li key={h.id}>
              <a href={`#${h.id}`} onClick={closeMobile}>
                {h.text}
              </a>
            </li>
          ))}
      </ul>
    </details>
  );
}
