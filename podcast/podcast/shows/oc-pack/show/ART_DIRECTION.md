# The OC Pack — Art Direction

**Identity in one line:** the cheerful local friend who always knows the best dog spot, the cheapest vet hack, and what's happening this weekend. Playful, warm, useful. Never corporate, never cutesy-empty.

## Visual identity

### Cover art (series)
- Style: bold, cheerful flat vector illustration. Happy dog and cat, Orange County California cues (sun, coast, palm). Readable and inviting.
- Current series cover: `~/workspace/podcasts/oc-pack/cover.jpg` (shared across episodes via `--series-id oc-pack-weekly`).
- Thumbnail rule: the show must read at podcast-app thumbnail size — bold shapes, high contrast, minimal fine detail. If the title treatment isn't legible at 150px, it fails.
- Consistency rule: one series cover. No per-episode cover experiments unless the Art Director approves a variant and Long signs off.

### Episode artwork (future)
- If episode-specific art is introduced: same vector style, same palette family, episode subject as the single focal element. Series cover remains the feed-level image.

### Palette and type direction
- Warm, sunny, outdoorsy: golden yellows, ocean blues, grass greens, warm neutrals. Avoid cold clinical blues/grays and aggressive reds.
- Type: rounded, friendly, bold. Legible at small sizes; never thin or condensed for the show name.

### Social clips and promo (future)
- Clip template: series cover lockup + burned-in captions + episode hook as the headline. One visual language across Instagram/TikTok/YouTube Shorts.
- Audiograms use the jingle's sonic identity, not generic stock music.

## Sound identity

**Vibe: DJ at the pool, SoCal.** The show opens and closes like a poolside DJ set — warm house groove, steel-pan sunshine, a riser into a drop. The energy says Saturday pool party, not radio studio.

### Jingles
- Intro: `~/workspace/podcasts/music/oc_pack_intro.wav` — poolside house @122 BPM: four-on-the-floor kick, offbeat hats, deep bass stabs, Rhodes chords, steel-pan hook, riser + drop (~11s).
- Outro: `~/workspace/podcasts/music/oc_pack_outro.wav` — groove recap, steel-pan hook, breakdown, warm resolve (~11s).
- Previous playful jingles are archived in `music/old/` (oc_pack_intro_playful.wav, oc_pack_outro_playful.wav).
- Filenames are stable: future episodes pick up jingle changes automatically. New jingle versions go through the Art Director and Long before replacing.
- Jingle synth source: `make_oc_pack_dj_jingle.js` (pool edition), `make_oc_pack_jingle.js` (archived playful edition).

### Segment stingers
Five signature stingers, one per segment, same DJ-pool sonic family as the jingles
(synth source `audio/scripts/make_oc_pack_stingers.js`):
- **Cold open** (`cold_open.wav`, 3.0s): riser → impact + high steel-pan hit — "the drop is coming."
- **The Big One** (`big_one.wav`, 2.5s): A–C–E steel-pan motif + groove stab.
- **OC Local** (`oc_local.wav`, 2.5s): bouncy E–G–A pan riff + shaker.
- **Ask the Pack** (`ask_pack.wav`, 2.5s): playful C–A question motif + pop blips.
- **Takeaway** (`takeaway.wav`, 3.0s): warm Rhodes F–A–C resolve, gentle fade.
Rule: stingers mark segment boundaries only — one hit per boundary, never under
dialogue for decoration. Overuse turns signal into noise (NPR's caution stands).

### Voice direction
- **Alex** (avocado_v2:MAI_01): the DJ-host and local expert. Warm authority with party energy — hypes the set, then teaches. Explains like a friend, never lectures, never talks down.
- **Jordan** (avocado_v2:MAI_03): the curious pet parent on the pool deck. Asks the questions a listener would ask, reacts honestly, keeps Alex grounded.
- Energy: a poolside DJ set where the music is information. "Turn it up," "dropping into," "cooling down," "one more track" — DJ transitions frame the segments, but the substance stays dense and useful. Playful banter is seasoning, not the meal — it never stalls the information.
- Pacing: brisk but unhurried. No filler words scripted in; no stage directions in scripts.

### Mix standards
- Target: **−16 LUFS / 128 kbps** (same as Money, Mastered).
- Mastering chain: `tools/master_episode.sh` — voice polish (highpass 80 Hz, gentle
  de-ess, light compression) → assembly (intro + 0.5s gap + voice + 0.5s gap + outro)
  → optional stinger overlay via `stingers.spec` → dual-pass loudnorm → 128k MP3.
  Verified on Ep 1 voice: −16.6 LUFS, decode OK, stingers audible at boundaries.
- **Safety rule:** never let ffmpeg write over the only copy of an episode. Copy the episode, write the merge to a NEW file, verify (ffprobe duration ≈ voice + ~22s; full decode passes), then move into place.
- Music beds under voices: none in the current format. If beds are ever introduced, they sit well under the voice and duck on speech.

## Merch and brand extensions (future, Long approves first)
- The tribe name is the merch: "Pack member" shirts, stickers, tote bags. Identity names get worn and shared; descriptive names don't.
- No merch moves until the show has an audience asking for it.

## Art review rule
The Art Director validates every image for quality before Long sees it. Long sees only the strongest finished version — never drafts, never options, never process.
