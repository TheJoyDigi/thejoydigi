# Value, Created — Chapter 15: Creating Isn’t Enough (LinkedIn cut)

The social video for sharing Chapter 15. It teaches the whole idea on screen, so it works with the sound off: creating value and capturing it are two different games, and value flows to whoever owns the scarce piece, so ask of everything you make, "Who captures this? Is it me?"

| | |
|---|---|
| File | `value-created-ch15-creating-isnt-enough.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 8.2 MB, -15.0 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/15.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | Goodyear invented vulcanized rubber. (a flask bubbles gold beside a factory) / Died penniless. A tire company took his name. (the gold drains out of the flask and streams into the GOODYEAR factory) |
| 4.5–7.6 | Creating is only half. Capturing is the other. (a disc: the gold CREATE half, then the CAPTURE half slams in) |
| 7.6–11.2 | The better product lost. The better deal won. (a contract with one gold line fans out to three computers) |
| 11.2–14.5 | Ten thousand can make it. One can sell it. (60 maker dots squeeze toward a gate; one gold SELLER) |
| 14.5–19.3 | Who captures this? Is it me? (fruit falls from a tree into the SOMEONE ELSE basket; on the drop the fruit lands in the gold ME basket) |
| 19.3–23.2 | Get it in writing, before it works. (DAY ONE page, a signature is written, a gold seal lands) |
| 23.2–28.2 | Build the business, not just the product. Flip the ratio. (THE THING 90% / CAPTURE 10% flips to 10% / 90%) |
| 28.2–33.0 | Honor what you create. Capture it. Make sure the answer is you. |
| 33.0–38.0 | Value, Created — Chapter 15: Creating Isn’t Enough / Full 9-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. About 85 words on screen before the end card, counting labels. No dollar signs, coins, price tags or financial charts; the dollar figures in the transcript (Goodyear's debt, the QDOS purchase, the coffee and app-store margins) are left out on purpose. Copy notes to check:
- "Died penniless." and "A tire company took his name." follow the opening; the transcript says the company took his name nearly forty years after his death. The GOODYEAR sign on the factory is a graphic, not a claim about who owned it.
- "The better product lost. The better deal won." paraphrases "Kildall made the better product. Gates made the better deal." The highlighted contract line stands for Microsoft keeping the right to sell to anyone else; the three computers are the clone makers.
- "Ten thousand can make it. One can sell it." is taken from "If ten thousand people can make it, but only one can sell it, the seller eats." The 60 dots are a graphic, not a count.
- "Who captures this? Is it me?" is the transcript's own question; "Make sure the answer is you." is its closing line.
- "Get it in writing, before it works." is the transcript's rule two; DAY ONE is shorthand for "before the value exists".
- 90% / 10% flipping to 10% / 90% comes from "ninety percent of their energy on the thing, ten percent on everything that captures its value ... flip the ratio". The flip itself is the video's reading of "flip".
- The fruit tree and baskets draw the transcript's seed-and-harvest idea ("a seed nobody harvests feeds someone else"), drawn as a tree.

## Re-render
```
cd video/value-created
node _engine/render.js ch15-creating-isnt-enough --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch15-creating-isnt-enough                             # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
