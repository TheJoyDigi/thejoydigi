# Value, Created — Chapter 29: The Reputation Flywheel (LinkedIn cut)

The social video for sharing Chapter 29. It teaches the whole idea on screen, so it works with the sound off: delivered value becomes reputation, reputation becomes opportunity, opportunity becomes more value delivered, and the wheel eventually spins itself.

| | |
|---|---|
| File | `value-created-ch29-the-reputation-flywheel.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 8.5 MB, -14.8 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/29.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | Danny wears shoe covers. / No ads. Ever. Booked six weeks out. (a boot gets its cover; then business card, van, three vans) |
| 4.5–9.2 | Every job is a broadcast. It reaches everyone they tell. (one customer, then six people light up around them) |
| 9.2–14.3 | Delivery becomes reputation. Reputation becomes opportunity. Opportunity becomes more delivery. (the flywheel closes node by node: DELIVERY, REPUTATION, OPPORTUNITY) |
| 14.3–19.1 | You stop chasing. Opportunity chases you. (the wheel speeds up; on the drop, message bubbles fly in from every side) |
| 19.1–23.6 | A flywheel of glass. One betrayal unwinds years. (the wheel cracks and shatters; a silent phone, QUIET FOR A YEAR) |
| 23.6–29.0 | Three rules: Overdeliver the small stuff / Put your name on it / Reply the same day |
| 29.0–33.2 | Do the work. Let them tell the story. (a small wheel spins underneath) |
| 33.2–38.0 | Value, Created — Chapter 29: The Reputation Flywheel / Full 7-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. About 75 words on screen before the end card. No dollar signs, coins, price tags or financial charts; the van, card and wheel are neutral objects.

Copy notes:
- "Danny wears shoe covers", "No ads. Ever." and "Booked six weeks out" are straight from the opening story; the card, van, three vans sequence is the transcript's own ("the card became a van, the van became three vans"). Danny's eleven years is left out.
- "Every job is a broadcast" and "It reaches everyone they tell" paraphrase "every single job was not a job. It was a broadcast" and the customer-tells-everyone mechanic.
- "You stop chasing. Opportunity chases you." compresses "you stop chasing opportunity and opportunity starts chasing you".
- Borderline: "A flywheel of glass" is the transcript's "a flywheel made of glass", and "QUIET FOR A YEAR" paraphrases "the phone went quiet for a year" (that was the contractor in the story, not Danny; the video does not name him).
- The three rules are shortened from "overdeliver the small stuff", "make your work attributable" (shown as "Put your name on it") and "respond fast" (shown as "Reply the same day", from "a same-day reply").
- The brand-versus-reputation distinction (chapter 19) is not on screen, to stay inside the word budget.

## Re-render
```
cd video/value-created
node _engine/render.js ch29-the-reputation-flywheel --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch29-the-reputation-flywheel                             # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
