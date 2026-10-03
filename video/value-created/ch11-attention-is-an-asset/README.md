# Value, Created — Chapter 11: Attention Is an Asset (LinkedIn cut)

The social video for sharing Chapter 11. It teaches the whole idea on screen, so it works with the sound off: content is infinite but attention is not, so earn it, never steal it, and guard your own.

| | |
|---|---|
| File | `value-created-ch11-attention-is-an-asset.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 8.2 MB, -14.8 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/11.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | The first banner ad. 44% clicked. (100 viewer dots, 44 light up) / Today: 0.05%. Same rectangle. (the dots go dark, a small AD rectangle stays) |
| 4.5–7.6 | Content is endless. Your budget: 16 waking hours. (a 24-hour dial, 16 gold hours; content cards fly in and bounce off it) |
| 7.6–11.2 | Netflix's biggest rival? Sleep. (an hour token drops into a play tile, then hops to a moon tile) |
| 11.2–14.5 | Earn it. Never steal it. Stolen attention leaves. (EARNED room fills steadily and stays; STOLEN room fills fast, then empties) |
| 14.5–19.3 | Two hours of idle scrolling... A full month a year. (a 30-day calendar fills as the counter races to 730 HOURS on the drop) |
| 19.3–23.2 | Guard your attention. Long, unbroken focus. (a chopped SCATTERED bar versus one unbroken gold FOCUSED bar) |
| 23.2–28.2 | Three rules: Earn it first. Respect it. Never steal it. |
| 28.2–33.0 | Content is infinite. Attention is not. Earn it. Guard it. (infinity sign beside a single gold dot) |
| 33.0–38.0 | Value, Created — Chapter 11: Attention Is an Asset / Full 10-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. About 80 words on screen before the end card, counting labels and counters. No dollar signs, coins, price tags or financial charts; the Super Bowl ad cost and other dollar figures are left out on purpose. Copy notes to check:
- "44%" and "0.05%" are the transcript's 44 percent and "about five hundredths of one percent". The 100-dot grid shows 44 of 100 as a proportion; the 0.05% state shows no lit dots, since 0.05 of 100 rounds to none.
- "Same rectangle" paraphrases "Same rectangle. Same internet."
- "16 waking hours" is the transcript's "about sixteen" awake hours of 24.
- "Netflix's biggest rival? Sleep." paraphrases the Reed Hastings line ("we compete with sleep").
- "Stolen attention leaves." compresses "you rented a crowd and woke up owning an empty room"; the room visual carries that line.
- Borderline: "A full month a year" follows the transcript, which says 730 hours "is a full month of waking life". 730 hours is 30 full 24-hour days (the 30-cell calendar), but about 46 of the 16-hour waking days. The transcript wording is kept; consider "a full month of hours" if that bothers you.
- "Earn it first. Respect it. Never steal it." compresses the three rules (earn with value before you ask; respect it once you have it; never steal it). "Guard it" is the chapter's own-attention turn.
- The episode is 9:19; the end card rounds up to "10-minute".

## Re-render
```
cd video/value-created
node _engine/render.js ch11-attention-is-an-asset --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch11-attention-is-an-asset                              # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
