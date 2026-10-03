# Value, Created — Chapter 13: Removing Friction (LinkedIn cut)

The social video for sharing Chapter 13. It teaches the whole idea on screen, so it works with the sound off: friction doesn't destroy value, it locks it up, so remove the toll booths and the value that was already yours flows.

| | |
|---|---|
| File | `value-created-ch13-removing-friction.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 8.4 MB, -14.9 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/13.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | One word on a button. (shoppers stall at REGISTER and drop away) / Purchases up 45%. (the button flips to CONTINUE and everyone flows through) |
| 4.5–7.6 | Never one big wall. A thousand toll booths. (five booths; a crowd of ten thins to one) |
| 7.6–11.2 | A tenth of a second. 1% of sales. (100-square grid; each tick of 0.1 s greys one square, AMAZON'S OWN TEST) |
| 11.2–14.5 | Sales stop when arms are full. (a hand basket fills, extra items bounce off) |
| 14.5–19.3 | Remove one limit. Sales soared. The value was already there. (a cart builds wheel by wheel, then items pour in on the drop) |
| 19.3–23.2 | Watch where people stall. Don't ask. (a cursor clicks BUY four times, an eye watches, ×4) |
| 23.2–28.2 | Delete a step. Before adding a feature. (a form loses two fields and closes up) / Time the wait. Give it an owner. (stopwatch, 3.2 s, OWNER chip) |
| 28.2–33.0 | The value is already yours. Go collect it. |
| 33.0–38.0 | Value, Created — Chapter 13: Removing Friction / Full 10-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. About 80 words on screen before the end card, counting labels. No dollar signs, coins, price tags or financial charts; all dollar figures from the transcript are left out on purpose (the "three hundred million dollar button" is shown only as the 45% purchase jump). Copy notes to check:
- "One word on a button" plus REGISTER to CONTINUE and "Purchases up 45%" match the Spool story; the video never names Spool or says the site is a retailer.
- "A tenth of a second. 1% of sales." is Amazon's 100 ms = 1% finding. The grid shows it three times (0.1 s, 0.2 s, 0.3 s, -3%), which extends the rule linearly; borderline, the transcript only states 1% per 100 ms.
- "Sales stop when arms are full" and "Remove one limit" paraphrase the Goldman shopping cart story ("stopped buying when their arms were full"). The video skips the models-pushing-carts part.
- "The value was already there" is verbatim from the transcript's first law.
- "Watch where people stall. Don't ask." compresses rule one (watch, don't ask). The ×4 clicks come from "click the same button four times".
- "Delete a step. Before adding a feature." is rule two. "Time the wait. Give it an owner." compresses rule three; the 3.2 s is invented and carries an "Illustrative" label.
- The episode is 9:44; the end card rounds up to "10-minute".

## Re-render
```
cd video/value-created
node _engine/render.js ch13-removing-friction --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch13-removing-friction                              # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
