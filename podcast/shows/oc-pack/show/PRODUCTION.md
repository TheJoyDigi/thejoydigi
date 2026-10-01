# The OC Pack — Production Handbook

**Purpose:** one document that says who does what, in what order, and what "good enough to ship" means. Every seat below is filled today. Long is Executive Producer; Lola fills every crew seat and runs each gate before anything reaches Long.

## Team roster

| Seat | Filled by | Owns | Signs off on |
|---|---|---|---|
| Executive Producer | Long | Final say on show name, format, episodes, publishing | Every publish; any format change |
| Showrunner | Lola | Bible, episode slate, pillar rotation, season arcs | Script direction before generation |
| Research Lead | Lola | Fresh, verifiable OC material each week | Topics file; claim ledger sources |
| Fact Checker | Lola | Every substantive claim verified against a primary/reliable source | Claim ledger verdicts (keep / qualify / correct / remove) |
| Script Editor | Lola | Structure, hook, voice consistency, spoken-form rules | Final script |
| Voice Director | Lola | Alex/Jordan consistency, energy, pacing | Generated audio performance |
| Audio Engineer | Lola | Generation, music assembly, loudness, file safety | Final MP3 (tech QA) |
| Art Director | Lola | Cover art, visual identity, jingle direction | Any artwork shown to Long or published |
| Distribution Manager | Lola | Feed health, platform listings, clips, partnerships | Publish PR; live feed verification |
| QA Lead | Lola | Pre-publish checklist, full-episode listen | Release candidate |
| Archivist | Lola | Naming, ledgers, episode log, memory | Repo state after each episode |

## Role cards

### Executive Producer (Long)
- Approves the show name, format, voices, episode topics, and every publish.
- Reviews each private demo and gives the go/no-go.
- Nothing ships on autopilot. Ever.

### Showrunner
- Keeps this bible and the three direction docs (Production, Art, Info Standards) current.
- Plans pillar rotation so no value pillar repeats two weeks running unless the news demands it.
- Owns the teaser: every episode points at next week.

### Research Lead
- Uses news-vertical search for fresh OC pet-parent material: spots, vet costs, seasonal hazards, events, community news.
- Dedups against `podcast-helper manifest read` topics before writing.
- Writes `ep{N}_topics.md` and hands every claim to the Fact Checker with its source.

### Fact Checker
- Maintains `ep{N}_claims.md`: one row per substantive claim — claim, source, verification date, verdict.
- Verdicts: **keep** (solid source), **qualify** (attribute narrowly, soften), **correct** (fix the fact), **remove** (no solid source).
- Hard rules live in `INFO_STANDARDS.md`. Any claim without a verdict of keep/qualify does not enter the script.

### Script Editor
- Enforces the episode structure: cold open → The Big One → OC Local → Ask the Pack → takeaway + teaser.
- **Cold open rule:** the single most valuable or surprising thing lands inside the first 60–90 seconds. Data: 20–35% of listeners leave in the first five minutes.
- Spoken form: numbers spelled out, "P M"/"A M", no abbreviations, no URLs, no stage directions.
- Labels `Alex:` / `Jordan:` exactly, one turn per line, no blank lines.
- ~2,300–2,600 words (~18–20 min).

### Voice Director
- Alex: the teacher, local expert. Warm authority, never lectures.
- Jordan: the curious pet parent. Asks the listener's questions, reacts honestly.
- Energy: playful and upbeat, like two friends who genuinely like dogs. Banter serves the information; it never stalls it.

### Audio Engineer
- Generates with `podcast-helper generate` (Alex=avocado_v2:MAI_01, Jordan=avocado_v2:MAI_03, `--series-id oc-pack-weekly`). Never passes `--publish`.
- Assembles intro/outro with ffmpeg `filter_complex` concat. **Never overwrites the only audio copy**: work on copies, write to a new file, verify, then move into place.
- Technical QA on every final MP3: ffprobe duration ≈ voice + ~22s, full decode passes, loudness −16 LUFS, 128 kbps.

### Art Director
- Standards live in `ART_DIRECTION.md`. Validates every image before Long sees it; shows only the strongest version.

### Distribution Manager
- Publishes only via `publish_oc_pack_episode.py`: branch + PR, guard workflow auto-merges. Never pushes to main, never merges manually, never bypasses the guard.
- After merge: verifies the live feed — new `<item>` present, GUID correct, enclosure URL resolves, enclosure byte length matches the MP3, audio plays.
- Owns the distribution plan beyond the feed: clips, rescue partnerships, vet-office QR codes.

### QA Lead
- Listens to the complete final MP3 before it goes to Long. Checks: hook lands early, no factual wobble, no audio glitches, music levels right, no dead air.
- Runs the pre-publish checklist (below). Any failure blocks the release.

### Archivist
- Filenames: `oc-pack-episode-<N>-<title-slug>-<YYYY-MM-DD>.mp3`; GUIDs `ocp-ep<N>-<YYYY-MM-DD>`.
- After each episode: topics file, claim ledger, script, and final MP3 in `~/workspace/podcasts/oc-pack/`; episode logged in the bible; memory updated.
- Warns Long before any run adds more than ~50 MB to the site repo.

## Production pipeline

1. **Research** → topics file
2. **Claim ledger** → every claim sourced and verdict
3. **Script** → structure, hook, spoken form (GATE: fact-checker sign-off)
4. **Generate** → voices, no publish flag
5. **Mastering** → `tools/master_episode.sh` voice polish + stinger overlay + assembly + loudnorm (GATE: decode + duration + −16 LUFS check)
6. **Audio QA** → full listen, loudness, levels (GATE: QA lead sign-off)
7. **Art check** → cover/episode art validated (GATE: art director sign-off)
8. **Long review** → private demo + claim ledger + change list (GATE: explicit approval)
9. **Publish** → PR guard only (GATE: PR URL confirmed, guard merged)
10. **Verify live** → feed item, GUID, enclosure, playback (GATE: distribution sign-off)
11. **Log** → bible episode log, memory, archive

Gates are hard stops. A failed gate sends the episode back to the stage that owns it.

## Pre-publish checklist (QA Lead runs it)

- [ ] Claim ledger complete; zero unverified claims in script
- [ ] Cold open hook lands inside 90 seconds
- [ ] Full MP3 listened to end to end; no glitches, levels correct
- [ ] −16 LUFS / 128 kbps confirmed
- [ ] Long's explicit approval recorded
- [ ] Publish via script only; PR URL confirmed; guard merged
- [ ] Live feed shows the item; GUID, enclosure URL, and byte length verified; audio plays

## Sound design kit (2026-09-25)

All free, all synthesized in-house (zero license risk), one sonic family (DJ pool house).

- **Segment stingers** (`audio/stingers/`, synth source `audio/scripts/make_oc_pack_stingers.js`):
  `cold_open.wav` (3.0s, riser→impact), `big_one.wav` (2.5s, A-C-E pan motif),
  `oc_local.wav` (2.5s, bouncy E-G-A riff), `ask_pack.wav` (2.5s, playful C-A motif),
  `takeaway.wav` (3.0s, warm Rhodes resolve). Peaks at −1 dBFS.
- **Mastering chain** (`tools/master_episode.sh`):
  `master_episode.sh <voice.mp3> <out.mp3> [stingers.spec]`
  1. Voice polish: highpass 80 Hz → gentle de-ess shelf → light compression
     (AI voices are already noiseless — no AI denoiser in the chain).
  2. Assembly: intro + 0.5s gap + voice + 0.5s gap + outro (filter_complex concat;
     never overwrites the input).
  3. Optional stinger overlay: `stingers.spec` lines of `<seconds> <stinger.wav>`
     with timestamps in FINAL timeline seconds (intro+gaps included).
  4. Dual-pass loudnorm to −16 LUFS (TP −1.5), 44.1 kHz stereo, 128 kbps.
  5. Verify: duration, byte size, decode OK, peak/mean levels.
  Note: ffmpeg ≥ 7 prints loudnorm stats as `input_i/input_tp/...` (not `measured_*`);
  the script maps them. Never use `-v error` on the stats pass — it swallows the JSON.
- **Library SFX**: see `audio/sfx/SOURCES.md` (Pixabay / Mixkit / Sonniss cleared;
  BBC and YouTube Audio Library excluded). Synthesized stingers always win for
  recurring segment branding; library SFX only for one-off moments.

## Cadence

- Weekly, every **Thursday ~9:49 AM PT**: private draft built, fact-checked, and delivered to Long.
- Publishing happens only after Long's explicit approval of that week's demo — a separate, deliberate step.
- Show title (feed): **The OC Pack: Orange County Dog & Pet Parents**. Brand: The OC Pack.
- Contact everywhere: hello@thejoydigi.com only.
