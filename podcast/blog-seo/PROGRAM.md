# Value, Created SEO Blog: Program

_Approved by Long, 2026-10-26. Editorial direction: Claude. Build, publish, measure: Lola.
Queue: [QUEUE.md](QUEUE.md) in this folder._

## Purpose

Win evergreen Google search traffic for **Value, Created**, the 32-chapter free
audiobook produced by The Joy Digi (hosts: Alex and Jordan).

Long's current phase is **traffic and leads first, conversion later**. Social and
trend content chase the moment; the blog is the compounding asset. A founder
searching a real question at 11 PM is a warm lead, and a good answer keeps
collecting visits for years. Every post routes readers to the free chapter
episode and the book page. We do not sell hard in posts; we teach, then point.

## The rules

1. **One post = one founder search question = one chapter's idea.** The title is
   the search question itself or a close variant ("How do I price my services?").
2. **Genuine articles, never transcript dumps.** The episode pages already hold
   the transcripts. A post teaches the chapter's idea in written form: the
   question answered plainly up top, the idea, a concrete example, a practical
   takeaway, a soft close.
3. **Internal links, always both:**
   - the chapter episode: `https://www.thejoydigi.com/podcasts/value-created/<N>`
   - the book page: `https://www.thejoydigi.com/books/value-created`
   Episode link first, book page second, one short paragraph at the end.
4. **Frontmatter** (loader: `src/lib/posts.ts`; posts are `.md` files in `posts/`):
   - `title`: the search question.
   - `excerpt`: the meta description. One or two sentences, under ~160 characters
     where possible, written for a searcher deciding to click.
   - `date`: quoted ISO date, `"2026-10-26"` (quote it; unquoted dates parse as
     Date objects and break serialization).
   - `coverImage`: `/posts/<slug>/cover.webp`.
   - `category`: `Value, Created` for every post in this program (keeps the
     related-posts module inside the series).
   - Slug: short, hyphenated, built from the search query
     (`how-to-price-my-services`).
5. **Cover image.** `public/posts/<slug>/cover.webp`, converted from an existing
   site or brand asset (default: the Value, Created cover,
   `public/podcasts/value-created/cover.jpg`). Never invent a path that 404s.
   The blog SEO component builds the OG image URL from this exact convention.
6. **Voice.** First person as Long. Dry, human, specific, understated wit. No
   hype, no corporate polish, no generic aphorisms, no hashtags.
7. **Hard style rules:**
   - No em dashes anywhere. Commas, periods, or colons instead.
   - "SI" never "AI" when the technology is meant.
   - Never "written by Long La." The book is **produced by The Joy Digi**.
8. **Examples** are invented small-business scenes (a bookkeeper, two plumbers, a
   coffee cart), introduced as composites ("call her Dana"). Never present
   invented numbers as facts about real companies.
9. **Length:** ~900-1,300 words of body. Short paragraphs. `##` section
   headings that carry the argument. No tables (the MDX pipeline does not
   render them reliably). No raw HTML, no curly braces in prose.
10. **Cadence: 2 posts per week**, top of the queue first. A pace we can keep
    forever beats a burst that dies.

## Editorial workflow

1. **Claude directs:** picks topics from the 32 chapters, ranks the queue,
   writes the outline for each post (hook, section beats, example, takeaway,
   close). Queue lives in QUEUE.md; refresh it when it drops below 6 topics.
2. **Lola drafts** from the outline, then **Claude reviews** the draft against
   this program's rules before anything ships.
3. **Lola publishes** (see below) and runs the measurement loop.

## Publishing route

- Files land via PR against `main`, one PR per batch (normally the week's 2 posts).
- The podcast-guard workflow auto-merges **podcast-path PRs only**. Blog PRs sit
  outside its scope: they stay open for review and are merged deliberately,
  not by the guard. Do not expect the guard to merge a blog PR.
- After merge, **force a production deployment** of the merge commit through
  the Vercel connector (`create_deployment`, project
  `prj_clYNb8SniwzY2p7h9AZy1ObOSPe5`, no teamId). Git-triggered deploys of
  API-authored commits land blocked on this project; a merged PR is not live
  until this step runs.
- `next-sitemap` regenerates the sitemap at build. Never commit
  `public/sitemap-0.xml`.
- Verify live before reporting: `/blog` lists the new posts, each post URL
  returns 200 with the right title, and the live sitemap contains both URLs.

## QA checklist (every post, before the PR)

- [ ] Title is the search question; slug matches the query.
- [ ] Excerpt works as a meta description (no truncation mid-thought).
- [ ] Date is a quoted ISO string; category is `Value, Created`.
- [ ] Body 900-1,300 words; question answered in the first lines.
- [ ] Both internal links present, episode first, book page second, and both
      URLs return 200.
- [ ] Cover webp exists at `public/posts/<slug>/cover.webp` and the
      `coverImage` path matches it exactly.
- [ ] Zero em dashes; zero standalone "AI"; no "written by Long La".
- [ ] Examples clearly invented composites; no factual claims about real
      companies that we cannot source.
- [ ] The MDX compiles through the site's own loader (`getPostBySlug`) and
      `npx tsc --noEmit` passes.
- [ ] Claude's review pass is done and its fixes applied.

## Measurement loop (Lola, weekly)

PostHog (project TJD, id 654160) is the system of record:

- Google-referred pageviews, site-wide and to `/blog/*` specifically,
  week over week. Baseline at launch (2026-10-26): ~4 Google visits/week.
- `/blog` and individual post views; which posts earn repeat visits.
- Click-through shape: do post readers move to episode pages and the book
  page? (Referrer = thejoydigi.com on those paths.)
- Report in the weekly four-front scoreboard. Mark honestly what is noise:
  one week of data is a weather report, not a climate.

**Quarterly:** refresh titles and excerpts on posts that get impressions but
few clicks, re-rank the queue against what actually earned traffic, and add
the next 12 topics from the reserve chapters. SEO results compound on a
3-6 month horizon; judge the program at the end of January 2027, not weekly.

## Known cleanups (not blocking)

- `BlogPostSEO` in `src/components/seo.tsx` carries legacy agency-era Open
  Graph tags ("Digital Solutions Blog", web-development keywords). Harmless,
  but rewrite them for the Value, Created series in a future pass.
- `src/content/seo-plan.md` is a retired agency-era roadmap (services,
  consultations). It does not describe this program; leave it or remove it in
  a separate cleanup PR.
