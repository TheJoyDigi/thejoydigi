# Value, Created — Chapter 1: What ‘Value’ Actually Means (LinkedIn cut)

The social video for sharing Chapter 1. It teaches the whole idea on screen, so it works with the sound off: value is not in things, it is in people, and it moves with three dials (desire, scarcity, context) while the object never changes.

| | |
|---|---|
| File | `value-created-ch1-what-value-actually-means.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 8.7 MB, -14.9 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/1.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | Diamond or water? Which is worth more? In a kitchen, diamond wins. (a scale: gem on one pan, glass of water on the other, tips to the gem) |
| 4.5–7.6 | In a desert, water wins. Nothing about them changed. (same scale tips the other way) |
| 7.6–14.5 | Three dials set value (DESIRE, SCARCITY, CONTEXT). Turn one. Value moves. (three gauges drive a VALUE bar; the gem stays labelled SAME ROCK) |
| 14.5–19.3 | Value isn't in things. It's in people. (the glow leaps from the gem onto a person on the drop) |
| 19.3–23.2 | Nobody buys a drill. They buy the hole. (drill, then a glowing hole in a wall) |
| 23.2–28.2 | Stop asking: What can I make? Ask instead: What can I change for someone? (first question struck through, a dotted start dot arcs to a gold end dot) |
| 28.2–33.0 | The change is the product. Now go find someone thirsty. (glass of water with sparkles) |
| 33.0–38.0 | Value, Created — Chapter 1: What ‘Value’ Actually Means / Full 11-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. About 74 words on screen before the end card. The episode is about 10.5 minutes; the end card says "11-minute". No dollar signs, coins, price tags or financial charts.

Copy notes:
- "Three dials" is a visual metaphor for the transcript's three ingredients (desire, scarcity, context). The dial descriptors were dropped so the text clears the size floor.
- "Nobody buys a drill. They buy the hole." is the transcript's drill example, shortened.
- "The change is the product." and "go find someone thirsty" are the transcript's own closing lines.
- The "kitchen" and "desert" settings are the transcript's tap-water and thirsty-in-a-desert contrast.
- Text sizes follow the lead's floor: headlines 66+ px, sub-lines 44+ px, tracked caps labels 24+ px. The end card title is split over two rows so each row stays 66+ px.

## Re-render
```
cd video/value-created
node _engine/render.js ch01-what-value-actually-means --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch01-what-value-actually-means                             # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
