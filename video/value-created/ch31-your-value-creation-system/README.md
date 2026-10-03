# Value, Created — Chapter 31: Your Value-Creation System (LinkedIn cut)

The social video for sharing Chapter 31. It teaches the whole idea on screen, so it works with the sound off: the book's parts only become a machine when they are assembled into three rooms (intake, engine, flywheel) in a loop that runs on a weekly rhythm, written on one page and run for ninety days.

| | |
|---|---|
| File | `value-created-ch31-your-value-creation-system.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 8.5 MB, -14.9 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/31.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | Thirty chapters. Thirty parts. / Parts are not a machine. (thirty boards tumble into a pile) |
| 4.5–9.3 | Three rooms. One loop. (three houses: INTAKE what flows in, ENGINE what you build, FLYWHEEL what comes back; a return arrow closes the loop) |
| 9.3–15.3 | Priya answers questions. 30 minutes. Every morning. / Clients she never pitched. (a 30-day calendar fills with gold; on the drop it shrinks aside and a GUIDE page and six CLIENTS appear) |
| 15.3–19.4 | All intake. No output. A warehouse. (parts stack up in the intake house, the other two go dark, NOTHING SHIPS) |
| 19.4–24.4 | Three rules: A rhythm, not a decision / Check the returns monthly / Hand off the boring parts |
| 24.4–28.8 | One page. Run it ninety days. (a page with INTAKE, ENGINE, FLYWHEEL lines, then a 90 DAYS stamp) |
| 28.8–33.2 | The machine builds you back. You are its first product. |
| 33.2–38.0 | Value, Created — Chapter 31: Your Value-Creation System / Full 8-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. About 84 words on screen before the end card (the three room sub-labels account for nine of them). No dollar signs, coins, price tags or financial charts.

Copy notes:
- The opening swaps the transcript's IKEA box for a pile of thirty plain boards, so no brand is shown; "Thirty chapters of parts" is its line, "pieces are not a machine" is paraphrased as "Parts are not a machine".
- "Three rooms" and the INTAKE / ENGINE / FLYWHEEL names and their sub-labels are the transcript's own. The rooms are drawn as small houses, not the wheel from Chapter 29.
- Priya's "thirty minutes a morning" and "clients she never pitched" are straight from the transcript; "30 minutes. Every morning." is shortened. The video does not show her years of progression, only the rhythm and the result.
- "All intake. No output. A warehouse." paraphrases the "museum" failure ("a machine that takes in but never puts out is not a machine. It is a warehouse"). NOTHING SHIPS is added wording, not a transcript phrase.
- "A rhythm, not a decision", "Check the returns monthly" and "Hand off the boring parts" shorten the three rules (rhythm, tight loop, let it run).
- "One page. Run it ninety days." and "The machine builds you back. You are its first product." are from the closing advice and the final lines.

## Re-render
```
cd video/value-created
node _engine/render.js ch31-your-value-creation-system --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch31-your-value-creation-system                             # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
