# Hand-off to Lola: Incentives, Decoded sound kit (2026-10-03)

**Status:** the kit is built and pushed, and Long's blind A/B against alternatives is pending. Nobody has listened to it yet, because it was built and checked by measurement only. Your listen is the first.

**What it is:** "The Game Table" identity for Long's third book (32 chapters on incentives and human behaviour, with Alex and Jordan). It is an 18 s intro, a 14 s outro and seven stingers, all in `audio/`. The file list, specs and regenerate steps are in `audio/README.md`.

## Please do
1. **Listen to all nine with headphones, and once on a phone speaker.** Flag anything that sounds:
   - cheap or cartoonish (especially the coin catch and the clicks)
   - too bright: Long dislikes high shimmer, and the kit is deliberately dark at the top
   - out of tune: the kalimba is a real Kenyan instrument retuned to Western pitch
2. **Stingers:** check the first 0.3 s of each, since that's all a chapter plays. Is each one recognisable on its own?
3. **Outro:** read a voice credit over 6–14 s and confirm there's room for it.
4. **Episode test:** run one test episode through `master_episode.sh` with the intro, outro and a `stingers.spec`, and check the levels against the voice at −16 LUFS.
5. **Prepare Long's blind A/B:** the files are neutral, with no show name in the audio.

## If something needs changing
- **Levels per instrument:** `new_tracks()` in `audio/scripts/kit.py`.
- **Notes and arrangement:** `audio/scripts/compose.py` (the motif is `MOTIF_A` / `MOTIF_B`).
- **Rebuild:** run `fetch_samples.py` → `compose.py` → `qa.py`, then copy `out/` over `audio/` (the stingers drop their `stinger_` prefix).

## Constraints from Long (keep these)
- **Warm register:** no lead instrument above B5, and no high shimmer.
- **Instruments:** real instruments only, warm and human, never cartoonish.
- **No glass or crystal bells:** that's another show's identity.
