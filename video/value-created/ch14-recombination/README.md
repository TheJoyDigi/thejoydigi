# Value, Created — Chapter 14: Recombination (LinkedIn cut)

The social video for sharing Chapter 14. It teaches the whole idea on screen, so it works with the sound off: almost nothing is invented from scratch, it is old parts in a new arrangement, so collect ingredients, cross borders and test combinations cheap.

| | |
|---|---|
| File | `value-created-ch14-recombination.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 9.0 MB, -15.0 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/14.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | Gutenberg invented nothing. He rearranged. (WINE PRESS + TYPE + MOLD slide together into a gold PRINTING PRESS tile) |
| 4.5–7.6 | Three old gadgets. One new arrangement. (PLAYER, PHONE and WEB spin into one phone slab) |
| 7.6–11.2 | Same trick, everywhere. (three equations: crescent + ring = CRONUT, bookmark + glue drop = POST-IT, mic + note = KARAOKE) |
| 11.2–14.5 | You don't need to invent. Just collect ingredients. (ten tiles on a shelf: SKILLS, TOOLS, INDUSTRIES) |
| 14.5–19.3 | Ten ingredients make 45 pairs. Twenty make 190. (ten dots join with 45 lines and a counter; on the drop it doubles to twenty dots and 190 lines) |
| 19.3–23.2 | Recombination happens at the borders. (YOUR FIELD and ANOTHER FIELD; one dot from each meets on the border and becomes a gold diamond) |
| 23.2–28.2 | Test it cheap. Small bets. Fast feedback. (twenty tiles get crossed off, one gold check: Keep the winners.) |
| 28.2–33.0 | Don't ask what to invent. Ask what to combine. Value hides in the uncombined. |
| 33.0–38.0 | Value, Created — Chapter 14: Recombination / Full 9-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. About 79 words on screen before the end card, counting labels. No dollar signs, coins, price tags or financial charts; dollar and "billions" figures from the transcript are left out on purpose. Copy notes to check:
- "Gutenberg invented nothing. He rearranged." is a sharpened form of "He did not invent the printing press... He rearranged." The three parts (winemaker's press, type, goldsmith casting) are all in the transcript.
- "Three old gadgets. One new arrangement." paraphrases Jobs's three products becoming one device; the player/phone/web labels stand for the iPod, phone and internet communicator.
- Cronut (croissant + donut), Post-it (weak glue + paper bookmark) and karaoke (microphone + backing tracks) are from the transcript. The karaoke tile shows a microphone plus a music note, a simplification of "a microphone, a recording and a bar".
- "Ten ingredients make 45 pairs. Twenty make 190." is verbatim in the transcript. Dot-and-line graph is a picture of that arithmetic, not data.
- "Recombination happens at the borders." is verbatim. The two fields are generic, not tied to a transcript example.
- "Small bets. Fast feedback." and "Keep the winners." come from rule three. Twenty tiles echo "the person who tries twenty combinations".
- "Value hides in the uncombined." is a close paraphrase of the transcript's "Value is not hiding in the undiscovered. It is hiding in the uncombined." The episode is 8:59; the end card rounds to "9-minute".

## Re-render
```
cd video/value-created
node _engine/render.js ch14-recombination --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch14-recombination                              # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
