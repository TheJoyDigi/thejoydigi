# Value, Created — Chapter 2: The Beholder’s Eye (LinkedIn cut)

The social video for sharing Chapter 2. It teaches the whole idea on screen, so it works with the sound off: each extra slice is worth less than the last (diminishing marginal utility), and prices and decisions are set by the next unit, not the total.

| | |
|---|---|
| File | `value-created-ch2-the-beholders-eye.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 8.1 MB, -14.8 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/2.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | Six slices of pizza. You’re starving. How much is each slice worth? (a pizza of six numbered slices; slice one lifts out and glows) |
| 4.5–11.2 | Slice one: transcendent. Each one worth less. (bars step down, with "80%" on slice two per the transcript) |
| 11.2–14.5 | Slice six: worth less than nothing. (the sixth bar drops below the line) |
| 14.5–19.3 | Total says water. The next one sets the price. (WATER and DIAMOND each get a TOTAL bar; on the drop the NEXT bars flip: water's next is tiny, diamond's is tall) |
| 19.3–23.2 | The price is set at the edge. By the person on the fence. (a row of buyers behind a fence: THRILLED, one gold figure ON THE FENCE, three that WALK AWAY) |
| 23.2–28.2 | Find the empty plate. Not the one who just ate six slices. (a slice lands on the STARVING plate; the FULL plate holds only crusts) |
| 28.2–33.0 | The last unit decides. Totals impress. Margins decide. (descending bars, the last one glowing gold) |
| 33.0–38.0 | Value, Created — Chapter 2: The Beholder’s Eye / Full 10-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. About 78 words on screen before the end card. The episode is about 9.5 minutes; the end card says "10-minute". No dollar signs, coins, price tags or financial charts; the bars show "worth to you" per slice and total vs next unit, not money.

Copy notes:
- "Prices are set by the next unit" is shown with the water and diamond contrast from the transcript; the bar heights are illustrative (no numbers shown except the transcript's "80%").
- "The price is set at the edge. By the person on the fence." paraphrases the transcript's marginal buyer ("the person at the edge"). Borderline: "price" appears in the headline but nothing price-like is drawn.
- Slice six is "worth less than nothing", the transcript's own wording ("someone would have to pay you to eat it").
- The fence figures and plates are simple line-art, no characters.
- Text sizes follow the lead's floor: headlines 66+ px, sub-lines 44+ px, tracked caps labels 24+ px. The end card title is split over two rows so each row stays 66+ px.

## Re-render
```
cd video/value-created
node _engine/render.js ch02-the-beholders-eye --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch02-the-beholders-eye                             # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
