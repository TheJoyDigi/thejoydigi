import { THEMES } from "./brand";
import { renderEmail } from "./layout";

const RESEND_UNSUBSCRIBE_URL = "{{{RESEND_UNSUBSCRIBE_URL}}}";

export type NewChapter = {
  number: number;
  title: string;
  description: string;
  pageUrl: string;
  postalAddress: string;
};

/** A chapter announcement for Value, Created's opted-in Resend segment. */
export function newChapterEmail(chapter: NewChapter) {
  const theme = THEMES["value-created"];
  const chapterTitle = chapter.title.replace(/^Value, Created\s*[—–-]\s*Chapter\s+\d+\s*:\s*/i, "").trim();
  const { html, text } = renderEmail(
    {
      theme,
      preheader: `${chapterTitle} — your next chapter is ready.`,
      kicker: `Value, Created · Chapter ${chapter.number}`,
      heading: `Chapter ${chapter.number}: ${chapterTitle}`,
      paragraphs: [
        "Your next chapter is here.",
        chapter.description,
      ],
      primary: { label: `Listen to Chapter ${chapter.number}`, href: chapter.pageUrl },
      signoff: "Enjoy the chapter.\n— Alex & Jordan",
      reason: "You're receiving this because you subscribed to Value, Created at thejoydigi.com.",
    },
    { unsubscribeUrl: RESEND_UNSUBSCRIBE_URL, postalAddress: chapter.postalAddress }
  );

  return {
    from: theme.from,
    subject: `Chapter ${chapter.number} is here · Value, Created`,
    html,
    text,
  };
}
