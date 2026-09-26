# The OC Pack — Decision Changelog

The show's memory: every direction decision, dated. Newest first.

## 2026-09-26
- **Ep 1 correction staged (awaiting Long's approval).** Audit of the published episode found two inaccurate spoken lines: "A free adoption event next weekend" (organizer listing never says free) and "Every single time" (absolute microchip guarantee, unsupported). Both patched with synthesized Alex voice and remastered (−16.4 LUFS / −2.9 dBFS peak / 128 kbps, 468.88 s) as `episodes/001-starter-pack/audio-corrected.mp3`; script.txt and claims.md updated to match; correction logged in show bible per INFO_STANDARDS.md. Feed item updates only with Long's explicit approval. Also: original published audio re-measured −18.1 LUFS (notes said −16); corrected candidate measures −16.4 LUFS.

## 2026-09-25
- **Sound design kit built.** Five synthesized segment stingers (cold open / Big One / OC Local / Ask the Pack / takeaway) in the DJ-pool sonic family, zero license risk; `tools/master_episode.sh` mastering chain: voice polish (highpass, de-ess, light compression — no AI denoiser, AI voices are already clean) → assembly → optional stinger overlay → dual-pass loudnorm to −16 LUFS. Verified end-to-end on Ep 1 voice (−16.6 LUFS, stingers audible). Free SFX sources documented in `audio/sfx/SOURCES.md` (Pixabay / Mixkit / Sonniss cleared; BBC + YouTube Audio Library excluded). Engagement rule: stingers mark boundaries only, never decorate dialogue.
- **Vibe: DJ at the pool, SoCal.** Long: "make the show feel like DJ at the pool socal vibe." Jingles rebuilt as poolside house (122 BPM, steel-pan hook, riser + drop); hosts reframed as DJ-host (Alex) + pool-deck co-host (Jordan); DJ transitions ("dropping into," "cooling down"). Old playful jingles archived.
- **Show repo created.** All sources, art, audio, scripts, and direction docs centralized in one git repo (`oc-pack`), portable — nothing depends on the local VM.
- **Episode 1 v2 demo built** with the DJ vibe + full fact-audit corrections. Claim ledger `ep1_claims_v2.md`. Private, awaiting Long's review.
- **Logo in progress.** Three concepts commissioned in pool-party SoCal style; Lola QAs before Long sees anything.
- **Episode 1 v1 fact audit.** Script errors found and corrected: wrong weekday ("Saturday, October eleventh" — Oct 11 2026 is Sunday), Mission Viejo Fall Fest page was the 2025 edition (no verified 2026 event), unverified rinse stations / prices / medical figures. Rules written into INFO_STANDARDS.md permanently.
- **Weekly cron locked to private demos.** `oc-pack-weekly` builds a fact-checked private draft every Thursday ~9:49 AM PT. Nothing publishes without Long's explicit approval.
- **Production handbook written.** PRODUCTION.md (11-seat team, pipeline, hard gates, pre-publish checklist), ART_DIRECTION.md, INFO_STANDARDS.md (claim ledger, source hierarchy).
- **Feed title set.** "The OC Pack: Orange County Dog & Pet Parents" — brand stays "The OC Pack"; descriptor added for Apple/Spotify search (+~5 positions per keyword).
- **Cold-open rule.** Hook must land inside the first 60–90 seconds (20–35% of new-show listeners leave in the first five minutes).
- **Format verdict (research-backed).** ~20 min, two hosts, Thursday ~9 AM PT, weekly — all supported by industry data. Thursday = top download day; 9 AM PT lands in the midday listening peak; ~20 min sits in the highest-completion zone. WeRateDogs (closest national analog) also drops Thursdays — noted, not a reason to move.
- **Distribution.** Flagged as the real gap: local shows have no built-in engine. Plan beyond the feed needed — clips, rescue partnerships, vet-office QR codes.
- **Show created.** "The OC Pack" green-lit by Long: weekly podcast for Orange County pet parents. OC only (LA/SD get separate slugs + feeds later). Value pillars: local intel, money savers, health & safety, training, community. Hosts Alex + Jordan (avocado_v2:MAI_01/MAI_03). Audio −16 LUFS / 128 kbps. Contact hello@thejoydigi.com only. Publishing via PR guard workflow, never direct to main.
