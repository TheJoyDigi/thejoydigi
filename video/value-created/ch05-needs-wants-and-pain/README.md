# Value, Created — Chapter 5: Needs, Wants, and Pain (LinkedIn cut)

The social video for sharing Chapter 5. It teaches the whole idea on screen, so it works with the sound off: value springs from three wells (needs, wants, pain), and pain is the deepest because it cannot wait.

| | |
|---|---|
| File | `value-created-ch5-needs-wants-and-pain.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 8.4 MB, -15.0 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/5.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | Same person. Three decisions. (bread, bag, burst pipe: REFLEX, FANTASY, RESCUE) / What was different? The well. |
| 4.5–7.6 | Value springs from three wells. (NEEDS, WANTS, PAIN) |
| 7.6–11.2 | Needs are crowded. Forty loaves. Buyers compare. (40 identical loaves, a ring hopping between them) |
| 11.2–14.5 | Wants are fickle. The second bag thrills less. (glowing gold bag, then a pale one) |
| 14.5–19.3 | Pain is the deepest well. (the pain well plunges below the other two) |
| 19.3–23.2 | Needs wait. Wants wait. Pain can't. (MORNING and PAYDAY bars, then a clock slams in: NOW) |
| 23.2–28.2 | Three questions: Whose pain is this? / What does each day cost? / Would they pay today? |
| 28.2–33.0 | Find the pain. Find the value. / Real pain. Never invented. |
| 33.0–38.0 | Value, Created — Chapter 5: Needs, Wants, and Pain / Full 11-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. About 80 words on screen before the end card. The episode is 10:44; the end card rounds to "11-minute". No dollar signs, coins, price tags or financial charts; the only number is "forty loaves", which is in the transcript. "Real pain. Never invented." carries the chapter's warning against manufactured urgency.

## Re-render
```
cd video/value-created
node _engine/render.js ch05-needs-wants-and-pain --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch05-needs-wants-and-pain                             # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
