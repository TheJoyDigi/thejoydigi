import { BlogPostSEO } from "@/components/seo";
import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import path from "path";

// Configure marked for tables and other markdown features
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown (includes tables)
  breaks: true,
});

export default function SEOPlan({ content }: { content: string }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <BlogPostSEO
        title="SEO Roadmap"
        description="A practical, step-by-step guide to get thejoydigi.com ranking and attracting the right traffic."
        date={new Date().toISOString()}
        author="TheJoyDigi Team"
        slug="seo-plan"
        hasCoverImage={false}
        path="/seo-plan"
      />
      <div
        className="seo-content prose prose-lg max-w-none
          prose-headings:font-bold prose-headings:text-gray-900
          prose-h1:text-4xl prose-h1:mb-8 prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-4
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-gray-800
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-gray-700
          prose-p:text-gray-600 prose-p:leading-relaxed prose-p:my-4
          prose-ul:list-disc prose-ul:text-gray-600 prose-ul:my-4 prose-ul:pl-6
          prose-ol:list-decimal prose-ol:text-gray-600 prose-ol:my-4 prose-ol:pl-6
          prose-li:my-2 prose-li:leading-relaxed
          prose-table:min-w-full prose-table:overflow-hidden prose-table:shadow-sm prose-table:my-8 prose-table:border prose-table:border-gray-200 prose-table:rounded-lg prose-th:bg-gray-50 prose-th:border prose-th:border-gray-200 prose-th:px-4 prose-th:py-2 prose-td:border prose-td:border-gray-200 prose-td:px-4 prose-td:py-2 prose-tr:even:bg-gray-50
          prose-blockquote:border-l-4 prose-blockquote:border-gray-200 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-6 prose-blockquote:bg-gray-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
          prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
          prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:my-6
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900 prose-strong:font-semibold
          prose-em:text-gray-600 prose-em:italic
          prose-hr:my-8 prose-hr:border-gray-200"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "src", "content", "seo-plan.md");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content } = matter(fileContent);
  const htmlContent = marked(content);

  return {
    props: {
      content: htmlContent,
    },
  };
}
