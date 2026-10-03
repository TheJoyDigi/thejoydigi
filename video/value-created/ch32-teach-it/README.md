# Value, Created — Chapter 32: Teach It (LinkedIn cut)

The social video for sharing Chapter 32. It teaches the whole idea on screen, so it works with the sound off: teaching is the final leverage because knowledge is the one asset you can give away and keep, the test is whether the student can teach someone else, and the practical move is one idea to one person this week.

| | |
|---|---|
| File | `value-created-ch32-teach-it.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 8.1 MB, -14.8 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/32.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | Forty years of furniture. / Trained hands build for a century. (a table is drawn, then crumbles; a tree of apprentices grows in its place) |
| 4.5–9.5 | Teaching is the final leverage. (a TEACH node sends a pulse to LEVERAGE, NETWORKS, COMPOUNDING, REPUTATION and GIVING at once, and they all light gold) |
| 9.5–15.2 | Teach a friend. You still know it. (an idea block is handed from one person to another; on the drop both keep one, the giver’s grows: MASTERY and KNOWLEDGE) |
| 15.2–19.9 | Can your student teach someone else? (YES · MULTIPLIED: four people pass the idea along; NO · PERFORMED: a student loops back to the teacher and the chain stops at an X) |
| 19.9–25.0 | Three rules: Why before how / Make them do it / Give away the whole thing |
| 25.0–29.1 | A book is a teaching machine. (a book lights up a field of dots) |
| 29.1–33.2 | Teach one idea. To one person. This week. |
| 33.2–38.0 | Value, Created — Chapter 32: Teach It / Full 6-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. About 68 words on screen before the end card. No dollar signs, coins, price tags or financial charts.

Copy notes:
- The Kyoto carpenter is not named or located on screen; "Forty years of furniture" and "Trained hands build for a century" are from the opening story ("furniture for forty years", "the hands he trained will build for a century").
- "Teaching is the final leverage" is the transcript's thesis line. The five labelled nodes are the multipliers the host lists ("leverage, networks, compounding, reputation, giving first"); the chapter's "teaching works on all the others at once" is drawn as one simultaneous pulse.
- "You still know it" plus MASTERY and KNOWLEDGE paraphrase "you still know how to negotiate ... The student gets the knowledge. You get the mastery." The giver's block growing stands for "you know it better than before".
- Borderline: YES · MULTIPLIED and NO · PERFORMED shorten "If yes, you multiplied. If not, you performed." The loop-back arrow stands for the guru trap's dependent student, which is not named on screen.
- "Why before how", "Make them do it" and "Give away the whole thing" shorten the three rules (the "while you watch" part is dropped, and the eye icon carries it).
- "A book is a teaching machine" is the transcript's line; the dot field shows "thousands of strangers" without a number.
- "Teach one idea. To one person. This week." compresses the sendoff ("one idea, one person", "teach it to someone this week"). The chapter's final line ("That is why this book exists") is not on screen.

## Re-render
```
cd video/value-created
node _engine/render.js ch32-teach-it --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch32-teach-it                             # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
