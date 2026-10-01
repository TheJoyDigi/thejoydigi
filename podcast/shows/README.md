# Shows

One directory per show or book. Books and podcasts use the same shape — a book is
episodic audio with chapters instead of episodes.

## Adding a new show

1. Copy the `oc-pack/` shape:
   ```
   podcast/shows/<new-show>/
     show/
       show-bible.md      <- premise, audience, hosts, segments, voice
       PRODUCTION.md      <- pipeline, gates, pre-publish checklist
       ART_DIRECTION.md   <- visual/sound identity (optional)
       INFO_STANDARDS.md  <- sourcing policy, standing corrections (optional)
       CHANGELOG.md       <- per-episode production log
     episodes/
       001-<slug>/
         script.txt       <- TTS format: one turn per line, no blank lines,
                              exact-case labels (Alex:, Jordan:)
         topics.md        <- what the episode covers
         claims.md        <- claim ledger (see podcast/shared/CLAIMS_TEMPLATE.md)
         notes.md         <- production notes, corrections, decisions
   ```
2. Name episodes `NNN-<slug>/` with zero-padded numbers (`001-`, `002-`, ...).
3. GUIDs: `<show-prefix>-ep<n>-YYYY-MM-DD` (e.g. `ocp-ep1-2026-09-25`). A GUID is
   forever — corrections reuse it.
4. Point the show at `podcast/shared/` for mastering, voices, and the claim template.
   Show-specific jingles go in the show dir; pass them to the mastering script via
   `INTRO_WAV` / `OUTRO_WAV`.
5. Served output lives in `public/podcasts/<new-show>/` (MP3s, `feed.xml`, cover art)
   — written only by the publish step, never by hand.

## Current shows

- `oc-pack/` — The OC Pack: Orange County Dog & Pet Parents. Weekly, ~20 min.
- `money-mastered/` — Money, Mastered. 36-chapter book, 3 chapters/week (Mon/Wed/Fri).
- `daily-ai-brief/` — legacy daily-news project (separate pipeline, library only).
