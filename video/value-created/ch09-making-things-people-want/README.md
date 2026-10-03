# Value, Created — Chapter 9: Making Things People Want (LinkedIn cut)

The social video for sharing Chapter 9. It teaches the whole idea on screen, so it works with the sound off: the best product does not win, the best fit does; find a want that already exists, watch behaviour rather than opinions, test small, and build for the people who would grieve if it vanished.

| | |
|---|---|
| File | `value-created-ch9-making-things-people-want.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 8.9 MB, -14.6 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/9.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | The Segway. Brilliant engineering. The world shrugged. About 30,000 sold. (a Segway in a burst of hype and confetti, then the glow and confetti fade) |
| 4.5–7.6 | Then came a rock. A million sold. (a box with air holes and a rock, then a glow) |
| 7.6–11.2 | The rock won on want. (a Segway icon with a sliver bar: about 30,000; a rock icon with a long gold bar: over a million) |
| 11.2–14.5 | You can’t manufacture want. You discover it. ALREADY IN THE GROUND. (gold nuggets buried in a strip of soil) |
| 14.5–19.3 | The best product doesn’t win. The best fit wins. (a spiky BEST PRODUCT keeps bouncing off a slot; on the drop a plain block clicks in and the slot glows gold) |
| 19.3–23.2 | Watch what they do, not what they say. (a dotted SAY path ends in a "?", a solid gold DO path ends in a check) |
| 23.2–28.2 | Build the smallest test. A stranger clicks. Or doesn’t. (a dashed outline for the full vision, a small gold block that gets clicked, a count of clicks) |
| 28.2–33.0 | If it vanished, who would grieve? Build for the grievers. (a gold block vanishes; some of the people behind it turn gold) |
| 33.0–38.0 | Value, Created — Chapter 9: Making Things People Want / Full 7-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. About 82 words on screen before the end card. The episode is about 6.5 minutes; the end card says "7-minute". No dollar signs, coins, price tags or financial charts: the transcript's investment, price and "charge early" points are left out, and the bar comparison is units sold only.

Flags:
- "About 30,000 sold" and "A million sold" are the transcript's numbers (about thirty thousand Segways in a decade; over a million Pet Rocks). Comparing them directly is the chapter's own framing, but they cover different time spans.
- The Segway is drawn as a simple side view (wheel, platform, stalk, handlebar) and is the weakest drawing in the set; it reads as a scooter. The words "The Segway." carry it.
- "Charge early" and "money is a vote" from the transcript are intentionally not shown, to stay clear of money imagery. The smallest-test beat shows clicks instead.
- The "faster horses" example and the vacation-rental air-mattress story are left out for length.
- Text sizes follow the lead's floor (sub-lines 44+ px, caps labels 24+ px); "The best product doesn’t win." is split over two rows, and the end card title over two rows.
- "ALREADY IN THE GROUND" paraphrases the transcript's prospector image ("It is already in the ground").

## Re-render
```
cd video/value-created
node _engine/render.js ch09-making-things-people-want --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch09-making-things-people-want                             # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
