# Value, Created — Chapter 30: Choosing What to Build (LinkedIn cut)

The social video for sharing Chapter 30. It teaches the whole idea on screen, so it works with the sound off: effort is not what separates builders, the problem they choose is, because every other tool in the book is a multiplier and a multiplier times zero is still zero.

| | |
|---|---|
| File | `value-created-ch30-choosing-what-to-build.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 8.4 MB, -14.7 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/30.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | Two builders. Same 16-hour days. (two identical towers of 16 blocks build up together, then an equals sign) |
| 4.5–8.7 | Not the effort. The problem they chose. (the left tower gets a fax machine and dims, FAX ACCESSORY, 2006; the right turns gold with people on top, A DECADE, STEADY) |
| 8.7–15.1 | Every tool is a multiplier. Wrong one? Zero. / Right one? Everything works. (seven gold bars times a YOUR PROBLEM box: it shows 0 and the bars flatten, then flips to a gold check on the drop and the bars spring up) |
| 15.1–19.3 | Good problems look boring. (three plain boxes, FREIGHT INVOICES, DENTAL SCHEDULING, PLUMBING SUPPLY, each fills with gold) |
| 19.3–24.4 | Pass all three. Do they pay for workarounds? / Does it grow if ignored? / Can you start small? (three checkboxes get ticked) |
| 24.4–28.8 | Worth three years of mornings? Five or six real bets. (six circles, two spent, the third lit gold) |
| 28.8–33.2 | Only you can choose what’s worth building. / Choose like your life depends on it. |
| 33.2–38.0 | Value, Created — Chapter 30: Choosing What to Build / Full 6-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. About 82 words on screen before the end card. No dollar signs, coins, price tags or financial charts; the multiplier bars are plain gold bars with no axis or labels.

Copy notes:
- Borderline: the transcript says the second builder made a tool to send money to family across borders and "ended up wealthy". To stay clear of money wording and imagery the video says only "A DECADE, STEADY" (from "slow and steady, for a decade") and never states the outcome in words; the gold tower with people on top carries it.
- "Not the effort. The problem they chose." paraphrases "The difference was never effort. It was the problem each one chose."
- "Every tool is a multiplier. Wrong one? Zero." compresses "everything in this book has been a multiplier ... a multiplier times zero is still zero". The seven bars match the seven multipliers the host lists (ownership, trade, money, markets, leverage, networks, compounding), unlabeled.
- "Do they pay for workarounds?" shortens "do people already spend money trying to solve this badly"; "Does it grow if ignored?" and "Can you start small?" are shortened from the other two questions.
- The three boxes use the transcript's three boring examples verbatim (freight invoices, dental scheduling, the plumbing supply chain). The taste-as-trained-judgment segment is not on screen.
- "Choose like your life depends on it." is the transcript's own line, without its "It does."

## Re-render
```
cd video/value-created
node _engine/render.js ch30-choosing-what-to-build --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch30-choosing-what-to-build                             # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
