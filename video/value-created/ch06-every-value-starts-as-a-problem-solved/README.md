# Value, Created — Chapter 6: Every Value Starts as a Problem Solved (LinkedIn cut)

The social video for sharing Chapter 6. It teaches the whole idea on screen, so it works with the sound off: every value ever created started as a problem solved, so value equals the problem solved minus the cost of solving it, and the move is to find the real problem first.

| | |
|---|---|
| File | `value-created-ch6-every-value-starts-as-a-problem-solved.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 8.7 MB, -15.1 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/6.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | Three before-and-afters. Nobody bought a tool. They bought the end of a problem. (three cards, LOCKED OUT / EMPTY ROOM / HAND CHARTS; a tangled scribble in each straightens into a gold line and gets a check) |
| 4.5–7.6 | Every invention is a rescue. (CONTAINER, BARCODE, SEARCH icons, each checked off) |
| 7.6–11.2 | The problem comes first. (a tangled node, a gold arrow, a gold block) |
| 11.2–14.5 | Every workaround is a problem in disguise. (a clumsy plank bridge over a river, then a dotted gold line for the real bridge) |
| 14.5–19.3 | Problem solved, minus the cost. Equals value. (a tall gold block minus a short dark block; on the drop the value block rises) |
| 19.3–23.2 | Would someone pay you to make it stop, today? (MAYBE LATER: a hobby with a logo, then PAY TODAY slams in gold) |
| 23.2–28.2 | Stop asking what you can build. Ask what’s broken. (a broken ring mends with gold seams) |
| 28.2–33.0 | Find the problem. End it well. Charge less than the pain. |
| 33.0–38.0 | Value, Created — Chapter 6: Every Value Starts as a Problem Solved / Full 10-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. About 83 words on screen before the end card. The episode is about 9.5 minutes; the end card says "10-minute". No dollar signs, coins, price tags or financial charts; the formula is drawn as plain blocks.

Flags:
- "Nobody bought a tool. They bought the end of a problem." generalises the transcript's "Nobody bought a slim jim, a review, or a software tool. They bought the end of a problem."
- "Charge less than the pain" is the transcript's "charge less than the pain it caused", shortened. Borderline only because it is about pricing; nothing price-like is drawn.
- "MAYBE LATER: a hobby with a logo" uses the transcript's phrase for a problem nobody would pay to end today.
- The kintsugi-style mended ring is decoration for "find what is broken and end it well", not something from the transcript.
- The end card title is split over two gold rows ("Chapter 6:" / the title) into three rows so each stays 66+ px.
- The hook's second line is split over two rows and the card label shortened (HAND CHARTS) to clear the text-size floor: headlines 66+ px, sub-lines 44+ px, caps labels 24+ px.

## Re-render
```
cd video/value-created
node _engine/render.js ch06-every-value-starts-as-a-problem-solved --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch06-every-value-starts-as-a-problem-solved                             # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
