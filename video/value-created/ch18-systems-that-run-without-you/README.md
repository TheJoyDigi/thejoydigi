# Value, Created — Chapter 18: Systems That Run Without You (LinkedIn cut)

The social video for sharing Chapter 18. It teaches the whole idea on screen, so it works with the sound off: if it stops when you stop, it is a job; a system (process, roles, feedback) makes the value run without you, and you start with one task: do, document, delegate.

| | |
|---|---|
| File | `value-created-ch18-systems-that-run-without-you.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 8.0 MB, -15.0 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/18.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | Two painters. Same city. Both step away. One keeps going. (two lanes, LUIS and MARCUS; both owners walk off, Luis's lane stops at 0 houses, Marcus's crews keep painting to 41) |
| 4.5–9.4 | Stops when you stop? That’s a job. (a ladder with rungs JOB, PRACTICE, BUSINESS, ASSET; the climber keeps slipping back from the second rung) |
| 9.4–11.8 | Runs without you? That’s an asset. (on the drop the climber leaps to the top rung, which glows gold) |
| 12.4–16.6 | A system has three parts. Miss one. It collapses. (three pillars, PROCESS, ROLES, FEEDBACK, hold a gold seat with a ball; the FEEDBACK pillar drops away and the seat tilts) |
| 16.8–20.3 | Could it run a Tuesday without you? (a TUESDAY card: a gear keeps turning after YOU walks out, then a check) |
| 20.5–24.2 | Systems rot. Ask: what step is stupid now? (a checklist loses two struck-out steps and gets shorter) |
| 25.0–28.8 | Do. Document. Delegate. Start with the task you resent. (three cards: NARRATE IT, TEN STEPS, LET GO; a baton passes to a second person) |
| 29.1–33.1 | How do I do more? (struck) How does this happen without me? / Build the machine. (a gear turns) |
| 33.2–38.0 | Value, Created — Chapter 18: Systems That Run Without You / Full 9-minute episode — link in comments |

Music drop at about 9.4 s: the climber leaps from the bottom rung to ASSET.

## Copy notes
- Rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. 72 words in headlines and sub-lines before the end card, about 100 counting the small tracked labels.
- No dollar signs, coins, cash, price tags or financial charts. The ladder is four plain rungs with a person, not a growth chart. Hours-for-money and the "someone would pay for it" line are left out.
- Paraphrased from the transcript: "Both step away. One keeps going." compresses Luis's shoulder surgery and Marcus taking July off into one hook, so the shared picture is "the owner is gone". "0" and "41" are Luis's income going to zero (shown as houses, not money) and the 41 houses the crews painted in July. "Systems rot" and "Ask: what step is stupid now?" are the transcript's gardener rule (the crew-lead question each quarter). "Start with the task you resent" condenses "pick the task you repeat most often and resent the most". "Narrate it", "Ten steps" and "Let go" are the do, document, delegate sub-steps.
- Borderline: the 0 count for Luis is a simplification (the transcript says income went to zero in six weeks). The three Marcus crews are shown as two small persons; the number of crews is not claimed on screen.
- The episode is 8:35; the end card rounds to "9-minute".

## Re-render
```
cd video/value-created
node _engine/render.js ch18-systems-that-run-without-you --design --sheet 2,9,14,19,26,31,37,45   # stills + out/sheet.png (design seconds; drop --design for real seconds)
node _engine/render.js ch18-systems-that-run-without-you                                           # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`).
