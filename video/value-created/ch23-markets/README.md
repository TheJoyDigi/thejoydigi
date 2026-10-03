# Value, Created — Chapter 23: Markets (LinkedIn cut)

The social video for sharing Chapter 23. It teaches the whole idea on screen, so it works with the sound off: nobody sets a price, buyers and sellers discover it together, and the price is a message about what the world wants, so read it.

| | |
|---|---|
| File | `value-created-ch23-markets.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 8.6 MB, -14.7 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/23.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | Same fish. Two towns. What moved? Everything around it. (two stalls, identical fish, an ≠ and THE GAP) |
| 4.5–8.7 | Nobody sets the price. It’s discovered. (SELLER WANTS MORE and BUYER WANTS LESS arrows collide and a gold dot, THE PRICE, forms) |
| 8.7–14.5 | Opinions collide. The price survives. (bidders' paddles rise, drop out one by one, the last one stays: SOLD) |
| 14.5–19.3 | A price is a message. It tells everyone what to do next. (a beacon lights up and three boats turn toward the harbor) |
| 19.3–23.2 | No one is in charge. And yet it works. (a balance scale of sellers and buyers wobbles and settles level by itself) |
| 23.2–28.2 | Don’t ask how to charge more. Ask what the market is bidding for. (a pile of identical fish, TOO MANY, vs one glowing fish with paddles raised, TOO FEW) |
| 28.2–33.0 | The market is always talking. Are you listening? Read prices like messages. |
| 33.0–38.0 | Value, Created — Chapter 23: Markets / Full 7-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. About 66 words of headlines and sub-lines before the end card (about 83 counting the small caps labels). The episode rounds up to "7-minute" per the chapter table. No dollar signs, coins, shells, price tags or financial charts: the opening "three shells here, eight there" is shown only as an unlabelled gap between two stalls, and the auction is paddles with no numbers.

Flags for review:
- "Same fish. Two towns." and "Everything around it." follow the transcript's opening; the shell prices are left out on purpose.
- "Don’t ask how to charge more. Ask what the market is bidding for." is the transcript's line, lightly shortened.
- "Opinions collide. The price survives." compresses "The price is the truth that survives a collision of opinions."
- The tuna auction numbers, the stock exchange and the self-balancing boats story are left out (one idea per beat); the boats now stand for "a price moves people".

## Re-render
```
cd video/value-created
node _engine/render.js ch23-markets --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch23-markets                             # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
