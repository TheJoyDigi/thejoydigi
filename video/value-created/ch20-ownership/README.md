# Value, Created — Chapter 20: Ownership (LinkedIn cut)

The social video for sharing Chapter 20. It teaches the whole idea on screen, so it works with the sound off: wages pay for the past, ownership pays for what happens next, so the question is not how hard you work but what you own, and you start with one small step.

| | |
|---|---|
| File | `value-created-ch20-ownership.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 7.7 MB, -15.1 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/20.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | Ten percent. Twelve days. Then he sold his claim. (ten blocks, one is HIS 10%; a 12-day clock turns, the gold block flies off to two other people, the rest light up) |
| 4.5–9.6 | Wages pay for your past. The deal ends with the hours. (a WAGE bar and an OWNERSHIP bar grow to a NOW line; the wage bar stops there) |
| 9.6–11.7 | Ownership pays for what happens next. (on the drop the OWNERSHIP bar runs on past NOW with gold chevrons and stars) |
| 12.2–17.1 | Same work. Same years. Three times the money. Tom also took the risk. (MAYA and TOM, five identical work blocks each; Maya ends with one gold block, Tom with three, two of them flickering) |
| 17.3–21.3 | The worker creates. The owner keeps. (TENANT to LANDLORD, AUTHOR to PUBLISHER, MUSICIAN to LABEL, gold dots flowing toward the owner) |
| 22.4–27.0 | Ownership is a ladder. The first rung is small. (four numbered stones: BUY IN AT WORK, ASK FOR A PIECE, BUY ASSETS, BUILD YOURS; a person hops across to a house marked YOURS) |
| 27.5–33.1 | The question isn’t effort. It’s what you own. Start this week. Take one step. (a gold key) |
| 33.2–38.0 | Value, Created — Chapter 20: Ownership / Full 8-minute episode — link in comments |

Music drop at about 9.6 s: the ownership bar runs past NOW.

## Copy notes
- Rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. 68 words in headlines and sub-lines before the end card, about 100 counting the small tracked labels.
- No dollar signs, coins, cash, price tags or financial charts. All the transcript's dollar figures are left out. Maya and Tom are shown as simple gold blocks (one versus three), which is a pictogram, not a chart. The only numbers are "10%", "12 days" and "three times", all from the transcript.
- Paraphrased from the transcript: "Ten percent. Twelve days. Then he sold his claim." compresses the Wayne story; the company is not named on screen. "Wages pay for your past" and "The deal ends with the hours" are the two-contract passage. "Three times the money" is the transcript's own phrase. "Tom also took the risk" condenses the owners-absorb-the-downside passage. The tenant, author and musician rows are the transcript's examples. The four stones condense rungs one to four (equity where you work, a piece instead of a raise, convert wages into assets, build something you own).
- Borderline: the headline says "ladder" and "rung" (the transcript's words) but the picture is stepping stones, to keep it different from Chapter 18's ladder. The risk idea gets one sub-line, not its own beat. The 5 grey squares under Maya and Tom stand for "five years". Compounding and the landlord's roof are left out for time.
- The episode is 7:37; the end card rounds to "8-minute".

## Re-render
```
cd video/value-created
node _engine/render.js ch20-ownership --design --sheet 2,5,9,14,19,21,28,33,38,45   # stills + out/sheet.png (design seconds; drop --design for real seconds)
node _engine/render.js ch20-ownership                                                  # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`).
