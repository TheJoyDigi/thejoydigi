# The OC Pack — Show Bible

**Show:** The OC Pack
**Feed title:** The OC Pack: Orange County Dog & Pet Parents
**Tagline:** The weekly podcast for Orange County pet parents.
**Feed:** https://www.thejoydigi.com/podcasts/oc-pack/feed.xml
**Cadence:** Weekly, every Thursday morning (~20 minutes) — private draft for Long's review; publishing only after his explicit approval
**Hosts:** Alex (avocado_v2:MAI_01) and Jordan (avocado_v2:MAI_03)
**Sound:** Playful, upbeat intro/outro jingles (`~/workspace/podcasts/music/oc_pack_intro.wav`, `oc_pack_outro.wav`)
**Audio standard:** -16 LUFS / 128 kbps (same as Money, Mastered)
**Contact:** hello@thejoydigi.com

## Direction docs (read these with the bible)
- `PRODUCTION.md` — full production team, pipeline, gates, pre-publish checklist
- `ART_DIRECTION.md` — visual identity, sound identity, voice direction, merch
- `INFO_STANDARDS.md` — sourcing rules, claim ledger, standing corrections, corrections policy

## Mission
Every episode gives Orange County pet parents something genuinely useful: save money, keep pets healthier and safer, or discover something great to do together locally. No filler, no generic pet tips you could read anywhere — everything is OC-specific or money-in-your-pocket practical.

## Value pillars (rotate across episodes)
1. **Local intel** — dog-friendly beaches, trails, parks, patios, and hidden gems in OC; what's new, what changed, what's worth the drive.
2. **Money savers** — vet-bill strategies, insurance vs. wellness plans, low-cost clinics, prescription hacks, food and supply savings.
3. **Health & safety** — OC-specific hazards (foxtails, heat, coyotes, ocean water), seasonal alerts, when to see a vet vs. wait.
4. **Training & behavior** — practical, positive methods; local trainer and class spotlights.
5. **Community** — adoption spotlights, local pet businesses, events, listener questions ("Ask the Pack").

## Episode structure (~20 min)
1. **Cold open** (30–45s) — the single most valuable or surprising thing in this episode, up front. **The hook must land inside the first 60–90 seconds** (20–35% of listeners leave a new show in the first five minutes).
2. **The Big One** (~10 min) — the main value topic, taught in layers: what it is, why it matters in OC, exactly what to do.
3. **OC Local** (~5 min) — one local recommendation or alert (a spot, a business, a seasonal warning).
4. **Ask the Pack** (~3 min) — one listener question answered (seed with common questions until real ones arrive).
5. **Takeaway + teaser** (1 min) — one explicit takeaway, one teaser for next week.

## Production rules
- Script: no blank lines between turns; speaker labels `Alex:` / `Jordan:` exactly; spoken-form numbers; complete conversational sentences.
- Topics summary file every episode (`--topics-file`) for dedup via `podcast-helper manifest read`.
- `--series-id oc-pack-weekly` on every generate call (shared show cover art).
- Music assembly via ffmpeg filter_complex concat; never overwrite the only audio copy; verify with ffprobe + full decode.
- Publish through `publish_oc_pack_episode.py` (branch + PR; guard auto-merges; never push to main or merge manually).
- Episode filenames: `oc-pack-episode-<N>-<title-slug>-<YYYY-MM-DD>.mp3`; GUIDs: `ocp-ep<N>-<YYYY-MM-DD>`.
- Warn Long before any run adds more than ~50 MB to the repo.
- Future regions (LA, SD) get their own show slug + feed; this bible is the template.

## Episode log
- Ep 1 (published 2026-09-25): "The OC Pet Parent Starter Pack" — v2 DJ-pool edition, 7:50, −16 LUFS/128k. GUID ocp-ep1-2026-09-25. Feed title set to "The OC Pack: Orange County Dog & Pet Parents"; show owner/author TheJoyDigi. PRs #23 (title) + #24 (episode) via guard workflow. Live feed verified: item, GUID, enclosure length 7514564, audio serves 200 audio/mpeg. Spotify: submitted 2026-09-25 (RSS), https://open.spotify.com/show/1vEadmFS7Bq1i3K9HfAzXO, live within ~24h.
- Ep 1 v1 (superseded, generated 2026-09-25): private demo; fact audit found errors (wrong weekday, stale 2025 event, unverified claims). Never published.
- **Ep 1 correction (2026-09-26):** the published episode contained two inaccurate lines — "A free adoption event next weekend" (organizer listing never says free) and "Every single time" (absolute microchip guarantee, unsupported). Both corrected in staged `episodes/001-starter-pack/audio-corrected.mp3` ("An adoption event next weekend" / "As long as it's registered"), remastered to −16.4 LUFS. Claim ledger, script, and notes updated. Feed item will be updated only with Long's approval — correction not live. Original published audio re-measured −18.1 LUFS (notes had claimed −16).
