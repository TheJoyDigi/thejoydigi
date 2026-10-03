# Value, Created — Chapter 25: Distribution (LinkedIn cut)

The social video for sharing Chapter 25. It teaches the whole idea on screen, so it works with the sound off: value nobody sees might as well not exist, so build the road that carries what you made to where people already are.

| | |
|---|---|
| File | `value-created-ch25-distribution.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 39.4 s, about 9.0 MB, -15.1 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/25.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.4 s | The better machine lost. VHS won on distribution. (BETAMAX with a BETTER tag stays put; VHS boxes fly to four houses and light every window) |
| 4.4–8.6 | Value nobody sees might as well not exist. (WORKSHOP glows, light pulses die in the gap, EXCHANGE stays dark) |
| 8.6–13.0 | Two makers. Same value. The reachable one wins. (HIDDEN orb with no road vs REACHABLE orb with a road, the crowd lights up) |
| 13.0–18.6 | Allen Lane, 1935. He wrote no new book. / Not better value. Better arrival. (hardcovers, a road draws across, pocket books fly onto the platform on the drop) |
| 18.6–22.1 | If you build it, they will not come. (a lit house while crowds stream past) |
| 22.1–26.4 | Go where they gather. The platform, not the bookshop. (your orb leaves the BOOKSHOP and lights the crowd on the PLATFORM) |
| 26.4–30.2 | A month making? A month delivering. (MAKE and DELIVER, four equal blocks each) |
| 30.2–34.4 | Not: is it done? But: is it arriving? Build your road. |
| 34.4–39.4 | Value, Created — Chapter 25: Distribution / Full 7-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. About 80 words on screen before the end card (labels included). No dollar signs, coins, price tags or financial charts; Lane's sixpence price is left out.

Copy notes to check:
- "The better machine lost" and "VHS won on distribution" paraphrase the transcript's "The better machine was a footnote" and "VHS did not win on quality. It won on distribution." Betamax and VHS are named on screen (BETAMAX / VHS labels).
- "Two makers. Same value. The reachable one wins." paraphrases "Two people can create exactly the same value, and the one with better distribution wins."
- "He wrote no new book." is from "Lane did not write a single new book."
- "A month making? A month delivering." paraphrases "If you spent a month making something, spend a month getting it seen."
- "Not: is it done? But: is it arriving?" is the transcript's own takeaway question; "Build your road." is its sign-off.
- The end card's "7-minute" comes from the lead's chapter table (not re-checked against the feed's `itunes:duration`).

## Re-render
```
cd video/value-created
node _engine/render.js ch25-distribution --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch25-distribution                             # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`).
