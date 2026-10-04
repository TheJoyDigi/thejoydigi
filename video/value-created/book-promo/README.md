# Value, Created — Book promo (LinkedIn cut)

The social video for the whole free audiobook. It teaches the book's shape and its one idea with the sound off: most people chase money, but money is created value, frozen; the book climbs five steps (see it, create it, capture it, scale it, master it) and reduces to one sentence about solving a real problem.

| | |
|---|---|
| File | `value-created-book-promo.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 44.8 s, about 8.5 MB, -14.9 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame, full staircase), for LinkedIn's custom thumbnail |
| Source | `podcast/shows/value-created/curriculum.md` and transcripts `public/podcasts/value-created/transcripts/1, 6, 15, 22, 24, 32.md` |
| Use | Post the video, put the audiobook link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–3.0 s | Everyone wants money. Almost no one asks what it's made of. (a sealed box with a "?" that rattles) |
| 3.0–5.6 | Value. (lid slides off, a four-point spark rises) Money is created value, frozen. |
| 5.6–9.2 | See it. Value is not in things. It is in people. (staircase: a dashed outline of five steps appears, step 1 rises and tints gold, a small ink figure lands on it) |
| 9.2–12.9 | Create it. The creator's job is not to invent. It is to notice. (step 2; the stepped silhouette extends and the figure climbs) |
| 12.9–16.5 | Capture it. Creation is abundant. Capture is scarce. (step 3) |
| 16.5–20.2 | Scale it. Leverage is doing more with less. (step 4) |
| 20.2–23.8 | Master it. Teaching is the final leverage. (step 5, the staircase is fully lit) |
| 23.8–28.0 | The book in one sentence: Find a real problem. Solve it well. Charge less than the pain it caused. (three numbered rows, a rule drawn under them) |
| 28.0–30.1 | Value, created. (the drop: the sum lands under the rule, the rows dim) |
| 30.1–32.5 | 32 chapters. 5 parts. (the staircase returns and chapter tiles sit on its treads, 5, 9, 6, 7 and 5 per part) |
| 32.5–35.1 | About 4 hours. Free. |
| 35.1–39.6 | Value is not found. It is created. (the steps glow in turn, the figure jumps on the top step) |
| 39.6–44.8 | Value, Created / A free audiobook in 32 chapters / Listen free — link in comments / PRODUCED BY THE JOY DIGI (a tiny stair outline with a spark above it) |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no host names, no Blue Sock or Nextdoor. 94 words on screen before the end card (headlines and sub-lines; about 104 with the small caps labels THE BOOK IN ONE SENTENCE and the five step names). No dollar signs, coins, price tags or financial charts: the hook object is a plain box with a four-point spark, the staircase is one stepped outline with a soft gold wash and a small ink figure climbing it, and the tiles are chapters. The tiles are all alike; there is no dark tile.

Where each line comes from (all verbatim unless noted):
| On screen | Transcript |
|---|---|
| Value is not in things. It is in people. | 1 |
| The creator's job is not to invent. It is to notice. | 6 |
| Find a real problem. Solve it well. Charge less than the pain it caused. / THE BOOK IN ONE SENTENCE | 6 ("...and you have created value"; "That is the whole book in one sentence") |
| Creation is abundant. Capture is scarce. | 15 |
| Money is created value, frozen. | 22 (first half of "Money is created value, frozen, so it can be spent later") |
| Leverage is doing more with less. | 24 |
| Teaching is the final leverage. | 32 |
| Value is not found. It is created. | 32 ("value is not found, it is created", split into two sentences) |

Copy notes (borderline items flagged):
- The five step names (see, create, capture, scale, master) follow the book's own sendoff in chapter 32 ("see it, create it, capture it, multiply it, give it first, and now, teach it"), mapped to the five parts. "Scale" is the curriculum's "Exchanging and Scaling"; the transcript says "multiply".
- Each step carries a line from the part's own chapters: 1 (Seeing), 6 (Creating), 15 (Capturing), 24 (Exchanging and Scaling), 32 (Mastery).
- "Almost no one asks what it's made of" is the team brief's premise, not a transcript quote.
- Tile counts follow the curriculum: Seeing 1–5, Creating 6–14, Capturing 15–20, Exchanging and Scaling 21–27, Mastery 28–32. "About 4 hours" is from the brief; the feed's `itunes:duration` total was not re-checked.
- The end card footer drops "A FREE AUDIOBOOK" (the kicker, gold line and "Listen free" already say it).

## Re-render
```
cd video/value-created
node _engine/render.js book-promo --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js book-promo                               # out/value-created-book-promo.mp4 + checks (about 35 s)
```
`scene.js` holds the scenes, `WARP` pacing (about 0.7×, end card about 5 s real) and sound cues; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
