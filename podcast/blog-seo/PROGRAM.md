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

## The niche (Long, 2026-10-26: niche-first)

**The niche: value creation for early-stage founders, in plain language.** The
blog aims to become the obvious home for "how value is actually created,
proven, and priced" for people building a first real business. Not generic
business advice.

- **Beachhead cluster:** the first 9 posts (QUEUE.md), sequenced in the order
  a founder meets the problem: what value is, whether customers will pay,
  what a price means, how to set one, pain, ideas, capture, inputs, choosing.
  Beachhead posts link to each other; the cluster reads as one body of work.
- **Expansion rings** (only after the beachhead is fully published): Ring 1
  trust and brand as stored value; Ring 2 distribution; Ring 3 systems,
  leverage, and compounding.
- **The rule:** new topics must serve the niche, and **no ring post publishes
  until all 9 beachhead posts are live**, except by Long's call. Two posts
  shipped at launch before this sequencing (pricing, Ch 16; systems, Ch 18).
  They stay live and are positioned honestly in QUEUE.md (pricing is the
  beachhead's practical #4; systems anchors Ring 3).

## Multi-blog architecture

The site is prepared for **multiple publications** sharing one engine:

- Every post carries a `publication` frontmatter field. All publications
  share the modern reading template, the explainer components, and the SEO
  machinery (Article JSON-LD, PostHog measurement).
- `/blog` is the hub. Each publication gets a section index at
  `/blog/<publication>` with its own title and meta: its own SEO lane.
  Registry: `src/lib/publications.ts`. **Post URLs nest under their
  publication: `/blog/<publication>/<slug>`** for every publication. Slugs
  are unique per publication, not globally. (The flat `/blog/<slug>` form
  shipped at launch on 2026-10-26 and was retired the same day, while the
  URLs carried no external equity; permanent redirects from each flat URL
  to its nested URL live in `next.config.js` `redirects()` — never link
  the flat form.)
- **Launch rule:** a publication's section index is created and linked only
  when its **first 3 posts are ready**, so no section ever opens empty, and
  no empty section page enters the sitemap or the nav. Publications with no
  posts are architecture-ready only: a registry entry, no page.
- The lanes:
  - **Value, Created** (`value-created`): value creation for early founders.
    Live.
  - **Money, Mastered** (`money-mastered`): personal money, plain language.
  - **The OC Pack** (`oc-pack`): Orange County pet parents.
  - **Anthropic Blogcast** (`anthropic-blogcast`): SI industry explainers.

This program governs the Value, Created publication. Future publications get
their own program notes in this folder when they approach launch.

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
   Episode link first, book page second, one short paragraph at the end. The
   closing link must keep the exact markdown pattern
   `[Chapter Title](https://www.thejoydigi.com/podcasts/value-created/<N>)`:
   the loader parses it to build the end-of-post "listen" card.
4. **Frontmatter** (loader: `src/lib/posts.ts`; posts are `.md` files in `posts/`):
   - `title`: the search question.
   - `excerpt`: the meta description. One or two sentences, under ~160 characters
     where possible, written for a searcher deciding to click.
   - `date`: quoted ISO date, `"2026-10-26"` (quote it; unquoted dates parse as
     Date objects and break serialization).
   - `coverImage`: `/posts/<slug>/cover.webp`.
   - `category`: `Value, Created` for every post in this program.
   - `publication`: `value-created` for every post in this program.
   - Slug: short, hyphenated, built from the search query
     (`how-to-price-my-services`). Unique within its publication; the same
     slug may exist under another publication. The published URL is
     `/blog/<publication>/<slug>`.
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
   headings that carry the argument, and **heading text must be unique within
   a post** (anchor ids derive from the text; duplicates fail the build).
   No markdown tables in prose. No raw HTML, no curly braces in prose.
10. **Cadence: 2 posts per week**, top of the queue first. A pace we can keep
    forever beats a burst that dies. When a post publishes, add its slug to
    `src/content/blog-trail.ts` in the same PR.

## The reading experience and visual explainers

Blog pages use a light reading theme modeled on Anthropic's blog (warm paper
`#FAF9F5`, near-black ink `#141413`, Fraunces headlines, DM Sans body at
~19px/1.75 in a 68ch column, hairline dividers, white explainer panels; gold
is the single sparing accent: deep gold `#7A5500` for links, the progress
fill, and focus rings, bright gold `#FFC94A` only as the route-card button
fill and the pull-quote mark). The dark P7 reading room shipped at launch
was replaced the same day (2026-10-26) at Long's direction. Tokens and
styles live in the `.blog-light` block of `src/styles/globals.css`;
the template is `src/pages/blog/[publication]/[slug].tsx` with components in
`src/components/blog/`. Reading time, the table of contents, the chapter
route card, and related reading are all derived by the loader; authors only
write the post.

**Explainers** (`src/components/blog/mdx-components.tsx`): `Ledger` (two-column
comparison), `Stat` (key figure), `Flow` (numbered steps), `PullQuote`.
Author rules:

1. PascalCase JSX with **double-quoted string props only**. No braces, no
   arrays, no text children, no markdown inside props.
2. One blank line before and after every block; **no blank lines inside** a
   block.
3. A double quote inside a prop value is written `&quot;`. Apostrophes and
   `$` are fine. No em dashes.
4. **Every number or claim on a visual must already appear in the body text.**
   An explainer restates; it never adds.
5. Max 3 explainers per post, never two back to back, never above the first
   `##`, except a `Flow` roadmap directly after the opening story.
6. Explainers clarify, not decorate. If the prose already says it plainly in
   two lines, skip the visual.

## Editorial workflow

1. **Claude directs:** picks topics from the 32 chapters, ranks the queue,
   writes the outline for each post (hook, section beats, example, takeaway,
   close, explainer placements). Queue lives in QUEUE.md; refresh it when it
   drops below 6 topics.
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
- **Sitemap:** generated by `src/app/sitemap.ts` during the build from the
  posts in `posts/`, so a new post is listed automatically. There is no
  sitemap file to edit or commit (`/sitemap-0.xml` is a rewrite of
  `/sitemap.xml`). Verify the live sitemap after deploy.
- Verify live before reporting: `/blog` lists the new posts, each post URL
  returns 200 with the right title, and the live sitemap contains the URLs.

## QA checklist (every post, before the PR)

- [ ] Title is the search question; slug matches the query.
- [ ] Excerpt works as a meta description (no truncation mid-thought).
- [ ] Date is a quoted ISO string; category is `Value, Created`;
      publication is `value-created`.
- [ ] Body 900-1,300 words; question answered in the first lines.
- [ ] Both internal links present, episode first, book page second, exact
      markdown pattern, and both URLs return 200.
- [ ] Cover webp exists at `public/posts/<slug>/cover.webp` and the
      `coverImage` path matches it exactly.
- [ ] Zero em dashes; zero standalone "AI"; no "written by Long La".
- [ ] Examples clearly invented composites; no factual claims about real
      companies that we cannot source.
- [ ] `##` headings unique within the post.
- [ ] Explainers: string props only, numbers already in the prose, max 3,
      none back to back.
- [ ] Trail updated in `src/content/blog-trail.ts` if the post is in the
      beachhead cluster.
- [ ] Nothing links the retired flat `/blog/<slug>` form; use the nested
      `/blog/<publication>/<slug>` form.
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
- The sitemap lists only some podcast episodes (it predates the blog). A full
  sitemap regeneration fix belongs to the build pipeline, not this program.
