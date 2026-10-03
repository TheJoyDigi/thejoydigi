# Value, Created — Chapter 24: Leverage (LinkedIn cut)

The social video for sharing Chapter 24. It teaches the whole idea on screen, so it works with the sound off: leverage is arranging things so the same effort moves something far heavier, and there are four levers (capital, code, people, media).

| | |
|---|---|
| File | `value-created-ch24-leverage.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 39.8 s, about 8.8 MB, -15.0 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/24.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.4 s | A 400-pound boulder. Bare arms. Nothing moves. (two arms push, the boulder only shudders) |
| 4.4–8.6 | He didn't get stronger. The arrangement changed. (a branch on a rock lifts the boulder) |
| 8.6–13.0 | Four levers. Same trick. Longer branch. (CAPITAL, CODE, PEOPLE, MEDIA, four planks each lifting a heavier load) |
| 13.0–18.6 | One steel box. Loading, 36× cheaper. (a mess of 36 loose shipping containers, cream with vertical ridges and one gold, snaps into a perfect 9×4 grid on the drop) |
| 18.6–22.8 | Audit your week. Circle what repeats. A repeat is a lever waiting. (Mon to Fri grid, the repeating task ringed each day and turned gold) |
| 22.8–27.0 | Write it once. Cheapest lever: media. (one page fans out to 18 readers, ONE AFTERNOON) |
| 27.0–30.4 | Never lever something broken. Leverage multiplies whatever it touches. (a cracked crate is lifted and splits apart) |
| 30.4–34.8 | Where is your place to stand? Find your branch. |
| 34.8–39.8 | Value, Created — Chapter 24: Leverage / Full 7-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. About 75 words on screen before the end card (labels included). The end card's "7-minute" comes from the lead's chapter table (not re-checked against the feed's `itunes:duration`). No dollar signs, coins, price tags or financial charts: the container beat shows only "36× cheaper" with crates, and the transcript's dollar figures are left out.

Copy notes to check:
- "Same trick. Longer branch." paraphrases the transcript's "Four levers. Same trick. The branch under the boulder, just longer."
- "A repeat is a lever waiting." paraphrases "Anything that repeats is a lever waiting to happen."
- "Never lever something broken." paraphrases "never put a lever under something broken". The debt warning is left out to keep one idea per beat.
- "Find your branch." is the transcript's sign-off ("Until then, find your branch.").

## Re-render
```
cd video/value-created
node _engine/render.js ch24-leverage --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch24-leverage                             # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`).
