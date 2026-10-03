# Value, Created — Chapter 3: Two Faces — Use vs. Exchange (LinkedIn cut)

The social video for sharing Chapter 3. It teaches the whole idea on screen, so it works with the sound off: every valuable thing has two faces, use value (what it does for you) and exchange value (what others will trade for it); businesses live in the gap between them, so always ask which face you are looking at.

| | |
|---|---|
| File | `value-created-ch3-two-faces-use-vs-exchange.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 9.0 MB, -14.7 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/3.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | 2 a.m. Freezing. A coat or a certificate? You take the coat. (mountains, snow, a coat and a sealed certificate on a rock; the coat glows) |
| 4.5–7.6 | A warm office. The certificate wins. Nothing about them changed. (the same two objects, the glow swaps sides) |
| 7.6–11.2 | Every valuable thing has two faces. (two medallions: USE with the coat, EXCHANGE with swap arrows) |
| 11.2–14.5 | Grandma’s ring. A pawnbroker buys metal. Not memories. (the ring's glow and sparkles drain away) |
| 14.5–19.3 | Create the bucket. Capture the cup. The gap is where businesses live. No gap, no business. (a full bucket and a small cup; on the drop a bracket marks THE GAP) |
| 19.3–23.2 | Would you still buy it if nobody saw? No? You bought the signal. (an eye closes and the watch loses its shine) |
| 23.2–28.2 | Before every trade, ask: Which face am I looking at? (a gold ring and "?" hop between USE and EXCHANGE) |
| 28.2–33.0 | Get the face right. The confusion tax disappears. |
| 33.0–38.0 | Value, Created — Chapter 3: Two Faces — Use vs. Exchange / Full 12-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. About 89 words on screen before the end card (a little over the 80 target; the ring beat is the one to cut if it needs trimming). The episode is about 11.5 minutes; the end card says "12-minute". No dollar signs, coins, price tags or financial charts.

Flags:
- Borderline imagery: the transcript's "stock certificate" is drawn as a generic sealed certificate (lines, gold seal, no text, no numbers, no chart) and called just "a certificate". Say if you would rather swap it for a neutral object.
- The pawn-shop beat drops the transcript's dollar figure; "A pawnbroker buys metal. Not memories." paraphrases "He is buying metal... cannot resell your memories".
- "Create the bucket. Capture the cup." paraphrases "create use value by the bucket and capture exchange value by the cup".
- "No? You bought the signal." compresses the transcript's status-goods test.
- The end card title is split over two gold rows ("Chapter 3:" / "Two Faces — Use vs. Exchange") so each row stays 66+ px.
- Other text sizes follow the lead's floor: sub-lines 44+ px, tracked caps labels 24+ px.

## Re-render
```
cd video/value-created
node _engine/render.js ch03-two-faces-use-vs-exchange --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch03-two-faces-use-vs-exchange                             # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
