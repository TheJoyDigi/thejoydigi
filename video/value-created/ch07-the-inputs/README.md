# Value, Created — Chapter 7: The Inputs (LinkedIn cut)

The social video for sharing Chapter 7. It teaches the whole idea on screen, so it works with the sound off: you spend three inputs (time, effort, skill), and skill is the only one that compounds.

| | |
|---|---|
| File | `value-created-ch7-the-inputs.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.3 s, about 7.7 MB, -14.6 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/7.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.7 s | Two carpenters. Same wood. Same tools. Same hours. / Wobbles. / Lasts decades. |
| 4.7–7.4 | Everything you make costs three inputs. (TIME · EFFORT · SKILL meters) |
| 7.4–10.7 | Time is capped. 24 hours. Spent once. (24h counts down to 0h) |
| 10.7–14.0 | Effort runs dry. Empty by dinner. (9 AM to 6 PM tank drains) |
| 14.0–18.6 | Skill compounds. The only input that grows as you spend it. (gold meter overflows) |
| 18.6–22.6 | Time and effort are the base. Skill is the multiplier. (×1 to ×6) |
| 22.6–28.6 | Year 1: almost identical. / Year 5: one hour = one week. / Silent, then sudden. (labelled Illustrative) |
| 28.6–33.3 | Time you spend once. Effort you spend daily. Skill you build forever. |
| 33.3–38.3 | Value, Created — Chapter 7: The Inputs / Full 10-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline. The episode is 9:17; the end card rounds to "10-minute".

## Re-render
```
cd video/value-created/ch07-the-inputs
node render.js --sheet 3,9,16,25,31   # PNG stills in out/
node render.js                        # out/value-created-ch7-the-inputs.mp4 (about 30 s)
```
- `scene.js` draws each frame as a pure function of time; the `WARP` table sets the pacing.
- `music.py` builds the 100 bpm bed and sound effects from the cue list `scene.js` exports, so the sound stays in sync after retiming. Needs numpy and ffmpeg.
- Fonts come from `src/assets/fonts/`; the headless browser comes from the Worth It engine (`video/worth-it/02-engine/render/lib.js`).
- After a re-render, copy the MP4 over the committed one only once it's approved.
