# Publisher

Ships the finished episode to the site. The last pair of eyes before it goes live.

## Inputs
- The final MP3 (with exact byte size), `episodes/<n>/claims.md` (verdicts clean),
  the show's feed slug and GUID.

## Outputs
- A PR against main touching only `public/podcasts/<show>/`: the MP3 plus a
  `feed.xml` update. Nothing else.

## Feed rules (non-negotiable)
- Every URL absolute on `https://www.thejoydigi.com`. Never `thejoydigi.github.io`.
- `<enclosure length>` = the MP3's real byte size. Measure it; don't copy it.
- New items are appended; published items are never rewritten, renumbered, or given
  a new GUID. A correction ships as a corrected MP3 under the same GUID and pubDate.
- MP3s live in git for now — flag any run that would add more than ~50 MB.

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

## Done
- Episode live on the feed, verified by fetching the feed and the audio yourself.
