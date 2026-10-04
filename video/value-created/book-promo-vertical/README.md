# Value, Created — Book promo, vertical 9:16 (Reels / TikTok / Shorts cut)

The short-form version of `../book-promo/`: same story and visuals (one stepped staircase with a small ink climber, the one-sentence theory, the 32 chapters), but about 27.6 s instead of 44.8 s and 58 words instead of 94, because attention is lower on these platforms. Laid out for the tall frame, not letterboxed.

| | |
|---|---|
| File | `value-created-book-promo-vertical.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1920, 30 fps, H.264 + AAC, 27.6 s, about 7.6 MB, -14.6 LUFS |
| Thumbnail | `thumbnail.png` (1080 × 1920, the "32 chapters. About 4 hours. Free." frame with the full staircase) |
| Source | `../book-promo/` copy and transcripts `public/podcasts/value-created/transcripts/1, 6, 15, 24, 32.md` |
| Use | Post as a Reel, TikTok or Short; put the audiobook link in the bio or pinned comment |

## Beats
| Time (real) | On screen | Words |
|---|---|---|
| 0–1.8 s | Everyone wants money. What's it made of? (readable on frame 0; a sealed box rattles) | 7 |
| 1.8–3.0 | **Value.** (lid slides off, a four-point spark rises) | 1 |
| 3.2–5.4 | See it. Value is in people. (staircase appears, step 1 rises, an ink figure lands) | 6 |
| 5.4–7.6 | Create it. Don't invent. Notice. | 5 |
| 7.6–9.8 | Capture it. Capture is scarce. | 5 |
| 9.8–12.1 | Scale it. More with less. | 5 |
| 12.1–14.8 | Master it. Teaching is the final leverage. (staircase fully lit) | 7 |
| 14.8–18.6 | Find a real problem. Solve it well. Charge less than the pain it caused. (three rows, a rule, riser) | 14 |
| 18.6–20.8 | **Value, created.** (the drop) | 2 |
| 20.8–23.9 | 32 chapters. About 4 hours. Free. (tiles fill the treads, 5, 9, 6, 7, 5 per part; the figure jumps) | 6 |
| 23.9–27.6 | Value, Created / Free audiobook / 32 chapters / Listen free — link in bio / PRODUCED BY THE JOY DIGI | |

Pacing: no beat exceeds 2.8 words per second of its hold (hook 2.7, steps 2.3–2.7, theory 2.7, chapters 2.0). Total 58 words on screen before the end card, plus the chapter-range labels on the steps.

Copy rules kept: no hashtags, emojis or hard sell, no byline, no host names, no Blue Sock or Nextdoor, no dollar signs, coins, price tags or financial charts.

Where each line comes from:
| On screen | Transcript |
|---|---|
| Value is in people. | 1 ("Value is not in things. It is in people.", shortened) |
| Don't invent. Notice. | 6 ("the creator's job is not to invent. It is to notice", condensed) |
| Find a real problem. Solve it well. Charge less than the pain it caused. | 6 (verbatim) |
| Capture is scarce. | 15 ("Creation is abundant. Capture is scarce.", second half) |
| More with less. | 24 ("Leverage is doing more with less.", shortened) |
| Teaching is the final leverage. | 32 (verbatim) |
| About 4 hours | the brief; the feed's total is 4.29 h |

Dropped from the 44.8 s cut to fit: "Money is created value, frozen.", "Almost no one asks", "5 parts" as text (the five stair groups still show it), the "THE BOOK IN ONE SENTENCE" label, and the closing "Value is not found. It is created." The end card says "link in bio" because comment links are not clickable on Reels, TikTok or Shorts, and drops the "·" between its two gold rows.

## Layout
Left-aligned at x 135 inside the working box (y 270–1560, x 120–960 above y 840, x 120–780 below it). The engine's kicker at y 96 is hidden (`KICKER_END = -1`) and redrawn at y 330. Staircase steps are labelled with chapter ranges (1–5 … 28–32). Every still pass was checked with `--safe`. Text floor as rendered: headlines 100+ px, rows 68, sub-lines 72, labels 25.

## Re-render
```
cd video/value-created
node _engine/render.js book-promo-vertical --sheet 2,6,11,15,19,24 --safe   # stills + out/sheet.png (red = platform UI; add --design for design time)
node _engine/render.js book-promo-vertical                                   # out/value-created-book-promo-vertical.mp4 + checks (about 30 s)
```
`scene.js` holds the scenes, `WARP` pacing (0.6×, end card 3.5 s real) and sound cues; `video.json` sets the 1920 height; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
