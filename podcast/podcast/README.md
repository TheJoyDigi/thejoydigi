# Studio

The show-and-book production pipeline for thejoydigi.com. Everything we publish as audio is made here.

## Layout

```
podcast/
  README.md            <- this file
  shared/              <- pipeline used by every show (audio, voices, templates)
  agents/              <- crew playbooks (researcher, fact-checker, ...)
  shows/               <- one directory per show or book
  daily-ai-brief/      <- legacy daily-news project (separate pipeline)
public/podcasts/       <- SERVED artifacts (never edited by hand)
```

## The one rule

**`podcast/` is production sources. `public/podcasts/` is served artifacts.**

- `podcast/shows/<show>/` holds everything that goes *into* an episode: the show bible,
  production docs, per-episode scripts, topics, claim ledgers, notes. Text and docs only —
  no MP3s.
- `public/podcasts/<show>/` holds what the site serves: final MP3s, `feed.xml`, cover art.
  Only the publish step writes here, and only via a PR.

Audio flows one direction: `podcast/` -> build/master -> `public/podcasts/`. Never the reverse.

## Publish flow

1. Produce the episode from its show directory: research, script, claim ledger, TTS voice mix.
2. Master with `podcast/shared/audio/master_episode.sh` (-16 LUFS / 128 kbps).
3. Run the publish script, which copies the final MP3 into `public/podcasts/<show>/`,
   updates `feed.xml` (enclosure length = the MP3's real byte size), and opens a PR.
4. The guard workflow auto-merges PRs whose diff stays inside `podcast/**` or
   `public/podcasts/**`. Nothing publishes without Long's explicit approval.

## Feed rules (non-negotiable)

- Every URL in `feed.xml` absolute on `https://www.thejoydigi.com` — never `thejoydigi.github.io`.
- `<enclosure length>` must equal the MP3's real byte size.
- Never rewrite, renumber, or change the GUID of a published item. Corrections ship as a
  corrected MP3 under the same GUID (see OC Pack ep 1, `ocp-ep1-2026-09-25`).
