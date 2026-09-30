import ReactMarkdown from "react-markdown";
import type { Episode } from "@/lib/podcasts";

/** Only episode URLs with a transcript render this section. The text stays in server HTML. */
export function EpisodeTranscript({ episode }: { episode?: Episode }) {
  if (!episode?.transcript?.trim()) return null;

  return (
    <section aria-labelledby="transcript-heading" className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">
          {episode.title}
        </p>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed opacity-80">{episode.description}</p>
        <details className="mt-8 rounded-2xl border border-current p-5 md:p-8">
          <summary id="transcript-heading" className="cursor-pointer text-2xl font-semibold">
            Transcript
          </summary>
          <div className="mt-8 space-y-5 break-words leading-8">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p>{children}</p>,
                strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
              }}
            >
              {episode.transcript}
            </ReactMarkdown>
          </div>
        </details>
      </div>
    </section>
  );
}
