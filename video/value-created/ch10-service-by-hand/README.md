# Value, Created — Chapter 10: Service, by Hand (LinkedIn cut)

The social video for sharing Chapter 10. It teaches the whole idea on screen, so it works with the sound off: automation handles the routine, but the human "extra" beyond what any system requires is the value people remember, so do things for people by hand.

| | |
|---|---|
| File | `value-created-ch10-service-by-hand.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 8.0 MB, -14.9 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/10.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | Two snow tires. At a suit store. (tires roll onto a counter beside a rack of suit jackets) / Refunded. No argument. (gold check) |
| 4.5–7.6 | Automation ate the bottom. The top is handmade. (stacked tiers: two fill with machine stripes, the top one stays gold, BY HAND) |
| 7.6–11.2 | Judgment is the product. The refund was just packaging. (a SYSTEM dot stops at the POLICY wall; a PERSON dot leaps over it) |
| 11.2–14.5 | You remember people. Never the efficient ones. (NURSE, MECHANIC, BARBER icons) |
| 14.5–19.3 | Systems stop at adequate. The extra is the value. (a bar hits the ADEQUATE ceiling, then a gold section punches through on the drop) |
| 19.3–23.2 | You can't automate being cared for. (chatbot bubble "I understand your frustration." struck out, a gold heart lands: A PERSON) |
| 23.2–28.2 | Three moves: Be present. Hear the real problem. Follow up. |
| 28.2–33.0 | Machines do the routine. Humans do the caring. By hand. With care. |
| 33.0–38.0 | Value, Created — Chapter 10: Service, by Hand / Full 7-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. About 86 words on screen before the end card, counting labels. No dollar signs, coins, price tags or financial charts; the Nordstrom refund amount is left out on purpose. Copy notes to check:
- "Two snow tires. At a suit store." and "Refunded. No argument." come straight from the opening story (the store has never sold tires).
- "Judgment is the product. The refund was just packaging." is a near-verbatim line from the transcript.
- "Systems stop at adequate." paraphrases "you cap it at adequate"; "The extra is the value." is verbatim.
- The chatbot line "I understand your frustration." is quoted from the transcript.
- "Be present. Hear the real problem. Follow up." compresses the chapter's three rules ("solve the real problem, not the stated one" becomes "hear the real problem").
- "By hand. With care." is from the transcript's closing line. The episode is 6:14; the end card rounds up to "7-minute".

## Re-render
```
cd video/value-created
node _engine/render.js ch10-service-by-hand --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch10-service-by-hand                              # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
