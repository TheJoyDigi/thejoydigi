# Value, Created — Chapter 4: Price Is Not Value (LinkedIn cut)

The social video for sharing Chapter 4. It teaches the whole idea on screen, so it works with the sound off: a price is a rumor about one trade, value is what you get, and the gap between them is the opportunity.

| | |
|---|---|
| File | `value-created-ch4-price-is-not-value.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 37.6 s, about 6.9 MB, -14.9 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/4.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.9 s | Same bottle of water. (grocery 50¢, airport $5, concert $20) / Did the water change? No. |
| 4.9–8.7 | A price is a rumor, not a fact. (buyer and seller meet at one tag: one moment; the number keeps changing) |
| 8.7–13.6 | The business sat still. The price ran laps. (JAN $40, JUN $60, OCT $35) |
| 13.6–17.4 | Price is what you pay. Value is what you get. (Warren Buffett) |
| 17.4–21.2 | The gap is the opportunity. (price below value: BUY; above: WALK AWAY) |
| 21.2–25.8 | Why prices go wrong: urgency, information, emotion, thin crowd |
| 25.8–32.6 | Ask three questions: What's it worth to me? What would others pay? What does the tag say? / Hear the rumor. Don't marry it. |
| 32.6–37.6 | Value, Created — Chapter 4: Price Is Not Value / Full 10-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline. The episode is 9:27; the end card rounds to "10-minute". The price tags show dollar amounts because the chapter's examples are prices; there are no coins, money bags or stock charts.

## Re-render
```
cd video/value-created
node _engine/render.js ch04-price-is-not-value --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch04-price-is-not-value                             # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
