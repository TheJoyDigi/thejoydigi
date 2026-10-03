# Value, Created — Chapter 28: Give Value First (LinkedIn cut)

The social video for sharing Chapter 28. It teaches the whole idea on screen, so it works with the sound off: give what costs you little and means a lot, with no hook and no score kept, and the goodwill you have banked comes back as opportunity.

| | |
|---|---|
| File | `value-created-ch28-give-value-first.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 8.3 MB, -14.8 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/28.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | She answered. For months. / She never pitched. (question and answer bubbles stack up, each answer checked) |
| 4.5–10.0 | Hundreds of deposits. Zero withdrawals. (a ledger: gold deposits pile up on the left, a big 0 on the right) |
| 10.0–14.8 | Then she asked. One post. / Dozens said yes. (one bubble, then a crowd of 32 neighbors floods in on the drop) |
| 14.8–19.6 | Cheap for you. Precious to them. (a scale: a small weight, TWO MINUTES, tips against a gold block, A WEEK OF WORRY) |
| 19.6–24.0 | A gift with a hook? People can tell. / Want them to win. (a gift on a hook line; the hook lifts away and the gift glows) |
| 24.0–28.8 | Four moves. Five-minute favor, daily / Go where the questions are / Give the whole idea / Give where you’re strong |
| 28.8–33.2 | Give first. Keep no score. / Their ledger is the one that pays. |
| 33.2–38.0 | Value, Created — Chapter 28: Give Value First / Full 7-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. About 77 words on screen before the end card. The end card minute count comes from the brief's chapter table. No dollar signs, coins, price tags or financial charts; the transcript's vet-bill figure was left out on purpose.

Copy notes:
- "Hundreds of deposits. Zero withdrawals." is the transcript's own framing ("hundreds of deposits and zero withdrawals").
- "Dozens said yes." compresses "dozens of neighbors volunteered". The 32 icons are decorative, not a count.
- "Cheap for you. Precious to them." and the TWO MINUTES / A WEEK OF WORRY labels paraphrase the transcript's "two-minute answer ... a week of worry".
- "Five-minute favor, daily", "Go where the questions are", "Give the whole idea" and "Give where you’re strong" are shortened forms of the four moves.
- "Want them to win." paraphrases "genuinely want the other person to win".
- Borderline: "Their ledger is the one that pays." paraphrases "everyone else's ledger is the one that pays". The chapter's Grant research is not on screen, to stay inside the word budget.

## Re-render
```
cd video/value-created
node _engine/render.js ch28-give-value-first --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch28-give-value-first                             # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
