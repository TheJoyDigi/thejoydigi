# The Joy Digi Project Notes

## Build Commands

- Development: `npm run dev`
- Build: `npm run build`
- Production: `npm run start`
- Clean: `npm run clean` (removes .next directory)
- Lint: `npm run lint`

## Environment

- Next.js: 15.1.7
- React: 19.0.0
- Node.js: v23.6.0
- npm: 11.1.0

## Project Structure

- Blog posts are stored as Markdown files in `/posts/` directory
- SSG is used for blog pages with getStaticProps and getStaticPaths
- `gray-matter` parses the post metadata
- `react-markdown` renders the post content
- Video shows (animated, vertical) are produced in `/video/<show>/`, the video counterpart of `/podcast/`: sources and docs only, finals stay local. First show: `video/worth-it/` (start at its README).

## SEO Information

- Business name: The Joy Digi (thejoydigi.com), where Long La builds joyful things with code and AI: products, podcasts, and experiments.
- Podcasts: Value, Created; Money, Mastered; The OC Pack; Anthropic Blogcast, all credited "Produced by The Joy Digi".
- The old Ruh-Roh Retreat case study now redirects to `/case-studies/the-blue-sock` (see `next.config.js`).
- Contact: hello@thejoydigi.com, +1 (714) 329-4534

## Design Choices

- The Joy Digi brand: Deep Teal `#003B49`, Soft Sand `#FDF6EC`, Coral `#FF6B6B` (+ Sun, Sky, Mint accents); Fraunces display + DM Sans body. Full rules in `docs/brand/design-standard.md`.
- Each podcast has its own palette inside that umbrella (see the standard's show table).
- Animation: Framer Motion for subtle, playful interactions.
- Layout: mobile-first responsive design with focused sections.

## Brand & email design

- All shows are productions of The Joy Digi. Standard: `docs/brand/design-standard.md`.
- Emails must be built with `renderEmail` in `src/lib/email/` (tokens in `brand.ts`); never hand-write HTML in API handlers.
- Before merging any email/brand change: `node scripts/email-brand-check.cjs` must pass, then have the `joydigi-design` agent review (`.claude/agents/joydigi-design.md`).
