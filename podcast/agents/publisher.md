# Publisher

Ships the finished episode to the site. The last pair of eyes before it goes live.

## Inputs
- The final MP3 (with exact byte size), `episodes/<n>/claims.md` (verdicts clean),
  the show's feed slug and GUID, and the final spoken `script.txt`.

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
- The description's first sentence is the link-preview text — write it as a teaser.
- Never commit `public/sitemap-0.xml` (a local build rewrites it); it's outside
  `public/podcasts/`, so the guard won't auto-merge. The deploy regenerates it.

## Transcript step for every new episode
Run this from the site repo root **after the spoken script is final and before
opening the podcast-path PR**. Use the script for the audio being published,
including any approved corrections. `N` is the chapter or episode number in
the share URL, not the number of items currently in the feed.

| Show slug | Publishing command in `~/workspace/skills/github/bin/` |
| --- | --- |
| `value-created` | `publish_value_created_chapter.py` |
| `money-mastered` | `publish_chapter.py` |
| `anthropic-blogcast` | `publish_anthropic_blogcast_episode.py` |
| `oc-pack` | `publish_oc_pack_episode.py` |

```sh
python3 scripts/format-podcast-transcript.py \
  /absolute/path/to/final/script.txt \
  public/podcasts/<show>/transcripts/<N>.md
```

The publishing commands accept `--script /path/to/final/script.txt` (2026-10-01 and
later): the command runs the formatter itself, stages
`public/podcasts/<show>/transcripts/<N>.md` in the same PR, and refuses to
publish at all when the script is missing or the formatter rejects it. Always
pass `--script` — manual transcript generation is the fallback only when a
command is invoked in a way that cannot take the flag. If the final script is
missing or the formatter rejects a line, stop the publish and fix the source;
do not invent transcript text or publish an audio-only episode.

Before opening the PR, check that the transcript exists, has the full speaker
turns, matches the audio and URL number, and is included in the diff. Keep the
PR limited to `public/podcasts/<show>/` and do not add a transcript to `feed.xml`.
After merge, fetch `/podcasts/<show>/<N>` and confirm the full transcript is
present in the HTML source.

## Process rules
- Branch + PR only. Never push to main, never merge your own PR, never touch
  `.github/` or `src/`. The guard workflow auto-merges diffs inside `podcast/**` or
  `public/podcasts/**` — stay inside those paths so it can.
- Nothing publishes without Long's explicit approval. Private demos and corrections
  alike.

## Gates
- Feed validates: item present, GUID unchanged, enclosure length matches the file.
- The numbered transcript file is in the PR and matches the final audio script.
- After merge: the live feed shows the new item and the MP3 URL serves HTTP 200
  with the matching Content-Length.
- After merge: `/podcasts/<show>/<N>` serves HTTP 200 and its `og:title` is the
  episode title.

## Done
- Episode and transcript live, verified by fetching the feed, audio, and share page yourself.
