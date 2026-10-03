# Value, Created — Chapter 22: Money: Value, Frozen (LinkedIn cut)

The social video for sharing Chapter 22. It teaches the whole idea on screen, so it works with the sound off: money is created value, frozen so it can be spent later, and the value was never in the money, it was in the creating.

| | |
|---|---|
| File | `value-created-ch22-money-value-frozen.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 9.2 MB, -14.7 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/22.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | Best catch of his life. Gone by sunset. (a heap of fish under a sun that crosses the sky; the fish turn grey) |
| 4.5–8.7 | Money is created value, frozen. Spend it later. (TODAY's fish slides into a block of ice, LATER) |
| 8.7–14.5 | Every money is a freezer. Same three tests, every time. (shell, salt, record; KEEPS? SCARCE? TRUSTED? tick in row by row) |
| 14.5–19.3 | Then the freezer breaks. Value melts. The thaw comes back smaller. (the block cracks and melts; the fish comes out smaller than it went in) |
| 19.3–23.2 | Print more? Thinner slices. The freezer never got bigger. (one block cut into 4, 8, then 16 slices) |
| 23.2–28.2 | Run the freezer test. Freezer, or melting ice? Skills don’t melt. (an ice block melts away while a gear inside a second block stays intact) |
| 28.2–33.0 | The value was never in the money. It was in the creating. You can always make more fish. |
| 33.0–38.0 | Value, Created — Chapter 22: Money: Value, Frozen / Full 8-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. About 71 words of headlines and sub-lines before the end card (about 95 counting the small caps labels). The episode rounds up to "8-minute" per the chapter table. No dollar signs, coins, cash, price tags or financial charts: the money chapter is told with fish, ice, slices, a gear.

Flags for review:
- The shell in the "freezers" row is a seashell, drawn as an object, not as currency, but it is the transcript's cowrie money; swap it for another object if it reads as money.
- "Same three tests, every time.", "Print more? Thinner slices." and "The thaw comes back smaller." paraphrase the transcript (the thinner-slices and thaw-smaller lines are close to the source). "Skills don’t melt." is the transcript's point about skills in shorter form.
- The salary/salt, Rome and debasement story is left out (one idea per beat).

## Re-render
```
cd video/value-created
node _engine/render.js ch22-money-value-frozen --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch22-money-value-frozen                             # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
