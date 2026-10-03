# Value, Created — Chapter 21: Trade: The First Leverage (LinkedIn cut)

The social video for sharing Chapter 21. It teaches the whole idea on screen, so it works with the sound off: do one thing well and trade for the rest; trade breaks the two caps on what one person can do, the network beats the hero, and you start by circling your one thing.

| | |
|---|---|
| File | `value-created-ch21-trade-the-first-leverage.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 8.6 MB, -15.0 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/21.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | Nobody knows how to make a pencil. Thousands of people. Coordinated by trade. (CEDAR, GRAPHITE, RAPESEED and BRASS flow into a pencil, then dozens of people link to it) |
| 4.7–8.5 | Do one thing well. Trade for the rest. Both eat better. (a FARMER and a BLACKSMITH swap wheat and a hammer) |
| 9.1–12.9 | Alone, you hit two caps. Your time. Your weak spots. (a person in a box capped by 24 HOURS and WEAK SPOTS, stacking gold blocks until they hit the limit) |
| 12.9–15.0 | Trade breaks both. Rent everyone’s best hours. (on the drop the two caps fly off, a network of people appears and the blocks multiply) |
| 15.4–20.2 | The network beats the hero. Same bread. Same street. (ELENA does all five jobs, then BURNOUT; PRIYA hands four to other people, keeps BREAD, THREE SHOPS) |
| 20.9–24.1 | Could someone do it 80% as well? Good enough. Trade it. (a ring fills to 80%) |
| 24.6–28.1 | Circle the one thing. Trade the rest. (a list of MILLING, BOOKS, BAKING, DELIVERIES, POSTS; BAKING is circled and the other four get TRADE tags) |
| 28.6–33.1 | Be the best at one thing. Trade for the rest. The first leverage. (a lever lifts a gold block as people step on the long arm) |
| 33.2–38.0 | Value, Created — Chapter 21: Trade: The First Leverage / Full 8-minute episode — link in comments |

Music drop at about 12.9 s: the two caps break away.

## Copy notes
- Rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. 81 words in headlines and sub-lines before the end card, about 116 counting the small tracked labels.
- No dollar signs, coins, cash, price tags or financial charts. The 80% ring is a plain progress ring, not a financial chart, and "less than your best hour is worth" is left out.
- Paraphrased from the transcript: "Thousands of people. Coordinated by trade." compresses the I, Pencil passage; the CEDAR, GRAPHITE, RAPESEED and BRASS tiles are its parts (the places, Oregon and Sri Lanka, are left off). "Alone, you hit two caps. Your time. Your weak spots." is "your own time, and your own mediocrity at the things you are bad at". "Rent everyone’s best hours" is "rent everybody else’s best hours". "Both eat better" is the farmer and blacksmith line. "The network beats the hero" is "the network outperforms the hero every time". "Good enough. Trade it." condenses the 80% standard. The five bakery jobs are condensed (MILLING, BOOKS, DELIVERY, SOCIAL, BREAD).
- Borderline: Elena's row shows her doing every step and Priya's shows other people on four; "Three shops" is the transcript's two-year result. The ring says 80% only, without the "you gain it back ten times over" half. "The first leverage" is the chapter's own phrase. "Nobody knows how to make a pencil" paraphrases "not a single person ... knows how to make me" and is not attributed to the essay or author on screen.
- The episode is 7:35; the end card rounds to "8-minute".

## Re-render
```
cd video/value-created
node _engine/render.js ch21-trade-the-first-leverage --design --sheet 2,5,8,14,19,23,26,31,36,45   # stills + out/sheet.png (design seconds; drop --design for real seconds)
node _engine/render.js ch21-trade-the-first-leverage                                                 # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`).
