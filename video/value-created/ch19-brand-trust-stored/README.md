# Value, Created — Chapter 19: Brand: Trust, Stored (LinkedIn cut)

The social video for sharing Chapter 19. It teaches the whole idea on screen, so it works with the sound off: a brand is trust, stored; every kept promise goes in, it is built from promise, proof and memory, it compounds like a flywheel, one broken promise drains it, and you start with one promise.

| | |
|---|---|
| File | `value-created-ch19-brand-trust-stored.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 8.2 MB, -14.7 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/19.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | Same pill. Same factory. They pay for what’s not inside. (two identical bottles, NAME BRAND and STORE BRAND, joined by an equals sign; memory bubbles with suns float up from the name-brand bottle) |
| 4.5–8.0 | A brand is trust, stored. Every kept promise goes in. (a jar fills with stars, labelled KEPT PROMISES) |
| 8.4–12.0 | Promise. Proof. Memory. Proof has to be visible. (three tiers stack up, PROMISE, PROOF, MEMORY) |
| 12.9–16.9 | Promises build a flywheel. (four numbered steps around a wheel: PROMISE, KEPT, SHARED, TRUSTED) |
| 16.9–19.9 | It compounds. Faster each turn. (on the drop the wheel spins up and gold sparks race round it) |
| 20.4–23.7 | One broken promise drains ten kept ones. (a ten-star jar cracks and the stars spill out) |
| 24.8–28.4 | Diane picked one promise. On time, fixed right, or free. (an index card: Pick one. Keep it. Show it. Repeat it.) |
| 28.9–33.1 | A year in, they say: Just call Diane. That sentence is the brand. (a speech bubble) |
| 33.2–38.0 | Value, Created — Chapter 19: Brand: Trust, Stored / Full 9-minute episode — link in comments |

Music drop at about 16.9 s: the flywheel spins up.

## Copy notes
- Rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. 76 words in headlines and sub-lines before the end card, about 89 counting the small tracked labels.
- No dollar signs, coins, cash, price tags or financial charts. The transcript's deposit, withdrawal and savings-account language is shown as a jar of stars rather than money, and the price gap and 20% raise are left out.
- Borderline: the hook uses generic NAME BRAND and STORE BRAND labels instead of the transcript's Tylenol name, to avoid a trademark on screen. "Same factory" drops the transcript's "half the time" qualifier. The flywheel step labels (PROMISE, KEPT, SHARED, TRUSTED) condense the transcript's five steps (the reinvest step is left off). The ten stars are the transcript's "ten kept promises". "Pick one. Keep it. Show it. Repeat it." condenses the four-part index card (pick one promise, keep it, make the proof visible, be consistent).
- "A year in, they say: Just call Diane." is the transcript's "Do this for a year ... people start recommending you with a sentence ... Just call Diane". Diane is introduced one beat earlier on the index card.
- The episode is 8:25; the end card rounds to "9-minute".

## Re-render
```
cd video/value-created
node _engine/render.js ch19-brand-trust-stored --design --sheet 2,9,14,21,25,30,38,45   # stills + out/sheet.png (design seconds; drop --design for real seconds)
node _engine/render.js ch19-brand-trust-stored                                            # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`).
