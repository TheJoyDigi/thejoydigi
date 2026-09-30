# Publisher

Ships the finished episode to the site. The last pair of eyes before it goes live.

## Inputs
- The final MP3 (with exact byte size), `episodes/<n>/claims.md` (verdicts clean),
  the show's feed slug and GUID.

## Outputs
- A PR against main touching only `public/podcasts/<show>/`: the MP3, a
  `feed.xml` update, and `transcripts/<episode-number>.md`.

## Feed rules (non-negotiable)
- Every URL absolute on `https://www.thejoydigi.com`. Never `thejoydigi.github.io`.
- `<enclosure length>` = the MP3's real byte size. Measure it; don't copy it.
- New items are appended; published items are never rewritten, renumbered, or given
  a new GUID. A correction ships as a corrected MP3 under the same GUID and pubDate.
- MP3s live in git for now — flag any run that would add more than ~50 MB.

## Share links (every item is a public page)
Each feed item becomes `https://www.thejoydigi.com/podcasts/<show>/<N>` at build time —
the link listeners share. No `src/` change is needed per episode.
- Title format is load-bearing: `<Show> — Chapter N: <Title>` (OC Pack: `Episode N: <Title>`).
  `N` is the URL; `<Title>` is the link-preview headline. No "Chapter/Episode N" = unstable URL.
- A published `N` is permanent. Renumbering, retitling or removing an item breaks links
  already sitting in people's texts.
- Convert the final `script.txt` to readable Markdown with
  `python3 scripts/format-podcast-transcript.py <script.txt> public/podcasts/<show>/transcripts/<N>.md`.
  Keep the transcript's number aligned with the share URL. The publishing
  script should create this file before opening the podcast-path PR.
- The description's first sentence is the link-preview text — write it as a teaser.
- Never commit `public/sitemap-0.xml` (a local build rewrites it); it's outside
  `public/podcasts/`, so the guard won't auto-merge. The deploy regenerates it.

## Process rules
- Branch + PR only. Never push to main, never merge your own PR, never touch
  `.github/` or `src/`. The guard workflow auto-merges diffs inside `podcast/**` or
  `public/podcasts/**` — stay inside those paths so it can.
- Nothing publishes without Long's explicit approval. Private demos and corrections
  alike.

## Gates
- Feed validates: item present, GUID unchanged, enclosure length matches the file.
- After merge: the live feed shows the new item and the MP3 URL serves HTTP 200
  with the matching Content-Length.
- After merge: `/podcasts/<show>/<N>` serves HTTP 200 and its `og:title` is the
  episode title.

## Done
- Episode live on the feed, verified by fetching the feed and the audio yourself.
