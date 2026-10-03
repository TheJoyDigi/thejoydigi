# Value, Created — Chapter 8: Knowledge as Raw Material (LinkedIn cut)

The social video for sharing Chapter 8. It teaches the whole idea on screen, so it works with the sound off: knowledge is the one raw material that never gets used up and multiplies when shared, so stockpile it by writing it down, teaching it and learning beside masters.

| | |
|---|---|
| File | `value-created-ch8-knowledge-as-raw-material.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 9.3 MB, -14.8 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/8.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | A factory stops. Nobody knows why. One chalk X. It roars back. (three gears grind to a halt, a chalk X is drawn on the middle one, they spin up again) |
| 4.5–7.6 | The chalk mark was cheap. Knowing where to put it wasn’t. (an INVOICE with a sliver bar for CHALK MARK and a full gold bar for KNOWING WHERE) |
| 7.6–11.2 | Iron runs out. Wood burns. Knowledge doesn’t. (a steel girder and a log shrink away, a glowing KNOWLEDGE orb stays) |
| 11.2–14.5 | Share it. Keep all of it. (one lit candle lights four more and stays just as bright) |
| 14.5–19.3 | One head holds it. Write it down. A rumor becomes an asset. (the glow leaps from a head onto a page on the drop while the person walks away) |
| 19.3–23.2 | Teach what you learn. Watch the masters. (speech bubbles around a teacher; gold dots flow from a master to an apprentice) |
| 23.2–28.2 | Underneath it all: knowledge. (TIME runs out, EFFORT runs dry, SKILL compounds, then KNOWLEDGE slams in as the base layer) |
| 28.2–33.0 | Build the stockpile. Write down the chalk marks. (a stack of notebooks, the top one gold) |
| 33.0–38.0 | Value, Created — Chapter 8: Knowledge as Raw Material / Full 8-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. About 85 words on screen before the end card. The episode is about 7.5 minutes; the end card says "8-minute". No dollar signs, coins, price tags or financial charts: the transcript's invoice (ten thousand dollars, one dollar for the chalk) is shown only as a thin bar against a full bar, with no figures.

Flags:
- The Steinmetz hook drops his name, the year and the dollar amounts; "A factory stops" and "One chalk X" are from the transcript, the invoice is shown as bars only.
- "Iron runs out. Wood burns." paraphrases "Iron gets used up. Wood gets burned."
- "A rumor becomes an asset." is the transcript's "knowledge stops being a rumor and becomes an asset", shortened.
- "Teach what you learn" and "Watch the masters" compress the transcript's second and third ways to stockpile (learn in public, apprenticeship); the beat has no written explanation of why.
- "Time runs out / effort runs dry / skill compounds" quotes the transcript's own takeaway.
- Text sizes follow the lead's floor; the end card title is split over two rows to stay 66+ px.
- The page the glow lands on is a plain document with lines, standing in for "write it down".

## Re-render
```
cd video/value-created
node _engine/render.js ch08-knowledge-as-raw-material --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch08-knowledge-as-raw-material                             # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
