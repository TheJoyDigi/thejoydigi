# Value, Created — Chapter 27: Compounding (LinkedIn cut)

The social video for sharing Chapter 27. It teaches the whole idea on screen, so it works with the sound off: compounding is time turned into a multiplier, so the winners start early, never interrupt it, and pick snowballs that do not melt.

| | |
|---|---|
| File | `value-created-ch27-compounding.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 7.9 MB, -14.7 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/27.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | One grain of rice. Doubled on every square. / The king laughed. Rice was cheap. (chessboard, rice piles of 1, 2, 4, 8, 16, 32 grains on the first squares) |
| 4.5–7.6 | First 32: almost nothing. Flat looks like nothing. (one tiny grain on each of the first 32 squares; brackets FIRST 32 and LAST 32) |
| 7.6–11.2 | Double every seven years. Patience, not the rate. (five snowballs on a slope, each twice the area of the last: ×1, ×2, ×4, ×8, ×16 at START, YR 7, 14, 21, 28) |
| 11.2–14.5 | Compounding is time, turned into a multiplier. (a snowball rolls down a slope, growing exponentially) |
| 14.5–19.3 | The last three squares: almost everything. (rice heaps on the last row of the board, squares 57 to 64, each double the last; the last three erupt on the drop) |
| 19.3–23.2 | Cash out, and you start over. You lose the doublings after. (a growing snowball is slashed and a tiny one starts over at the top; dashed ghost snowballs mark what is lost) |
| 23.2–28.2 | Three rules: Start early. / Never interrupt it. / Pick snowballs that last. |
| 28.2–33.0 | Build the snowball. Point it downhill. Protect the years. Time is the final multiplier. (a small snowball rolls and grows) |
| 33.0–38.0 | Value, Created — Chapter 27: Compounding / Full 8-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. About 79 words on screen before the end card (headlines and sub-lines; about 110 with the small caps labels). The drop (real 16.5 s) is the last three squares shooting up. No dollar signs, coins, price tags or financial charts; the rice is food.

Copy notes (borderline items flagged):
- "First 32 squares: almost nothing" and "The last three: almost everything" follow the transcript and are arithmetically true (the last three squares hold seven eighths of the total).
- Squares 57 to 64 are rice heaps with true relative areas (each double the last), standing on the board's last row. There are no bars, axes or money.
- The ×1 to ×16 snowballs show "doubles every seven years, four times = sixteenfold in 28 years". The transcript's "ten percent a year" is deliberately left off screen so it does not read as a return chart.
- "Double every seven years" paraphrases "something growing at ten percent a year doubles every seven years"; "Patience, not the rate" is the transcript's "The rate was never the impressive part. The patience was."
- "Cash out, and you start over. You lose the doublings after." paraphrases Munger's "never interrupt it" and "you lose the doublings the money would have bought". The slash is a generic cut, not scissors or cash.
- The end card says "8-minute" per the team brief's table; the feed's `itunes:duration` was not re-checked.

## Re-render
```
cd video/value-created
node _engine/render.js ch27-compounding --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch27-compounding                             # out/<slug>.mp4 + checks (about 90 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
