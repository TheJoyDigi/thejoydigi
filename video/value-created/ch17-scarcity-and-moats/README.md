# Value, Created — Chapter 17: Scarcity and Moats (LinkedIn cut)

The social video for sharing Chapter 17. It teaches the whole idea on screen, so it works with the sound off: creating value is only half the game, a moat (hard to copy, replace or leave) keeps it, the best moats are layered, no moat lasts, and you dig it before the copies arrive.

| | |
|---|---|
| File | `value-created-ch17-scarcity-and-moats.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 7.6 MB, -15.0 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/17.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | A line out the door. Then came the copies. (Daniel's shop with a queue; two grey copy shops appear across the street, the queue walks over and a CLOSED sign drops on Daniel's door) |
| 4.5–9.9 | Value is the treasure. No moat? Ladders walk in. (top-down castle with a gem; four ladders lean on the keep and the gem shakes) |
| 9.9–13.0 | The moat keeps copies out. (on the drop, water floods a ring around the castle and pushes the ladders away) |
| 13.3–17.5 | Six kinds of water. (six tiles: SECRETS, NETWORKS, SWITCHING COSTS, BRAND, SCALE, PERMISSION) |
| 17.5–21.7 | Layer them. Rivals must cross all at once. (four concentric rings: SECRET, SUBSCRIPTIONS, REGULARS, REPUTATION; a ladder falls short) |
| 21.7–25.2 | Moats drain. An app drained the taxi moat. (a cross-section moat loses its water through a plug marked APP and a rival walks across to the gem) |
| 25.7–29.4 | Rival across the street. What is still yours? (checks: Secret process, Relationships, Reputation, Speed, Deep niche) |
| 29.5–33.2 | Value gets you in the game. A moat keeps you in it. / Dig it before you need it. (a gem inside two gold rings) |
| 33.2–38.0 | Value, Created — Chapter 17: Scarcity and Moats / Full 10-minute episode — link in comments |

Music drop at about 9.9 s: the water floods in around the castle.

## Copy notes
- Rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. 76 words in headlines and sub-lines before the end card, about 90 counting the small tracked labels.
- No dollar signs, coins, cash, price tags or financial charts. The transcript's dollar, percent and medallion-price figures are left out on purpose. The treasure is a gem, not money.
- Paraphrased from the transcript: "Ladders walk in" is "anyone with a ladder walks in and takes the treasure". "Rivals must cross all at once" is "several moats that a competitor would have to cross at the same time". "An app drained the taxi moat" condenses the taxi medallion story; the same-day "Technology drained it overnight" is dropped. The six waters are the transcript's own list. The four ring labels (SECRET, SUBSCRIPTIONS, REGULARS, REPUTATION) are the coffee roaster's secret roast, subscription, 300 regulars and 15-year reputation. The five checklist items condense the moat-test list (secret recipe or process, relationships, reputation, speed, narrow niche).
- Borderline: Daniel is shown as a generic shop with a queue of simple person icons, not a character. "DANIEL’S" is the only name on screen and comes from the transcript. "Rival across the street" drops the "twice my money" detail so it stays money-free.
- The episode is 9:26; the end card rounds to "10-minute".

## Re-render
```
cd video/value-created
node _engine/render.js ch17-scarcity-and-moats --design --sheet 2,9,14,21,28,34,40,45   # stills + out/sheet.png (design seconds; drop --design for real seconds)
node _engine/render.js ch17-scarcity-and-moats                                          # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`).
