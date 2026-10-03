# Value, Created — Chapter 12: Trust, the Invisible Ingredient (LinkedIn cut)

The social video for sharing Chapter 12. It teaches the whole idea on screen, so it works with the sound off: trust is the invisible foundation under every other kind of value, built one kept promise at a time, lost in an instant, and never bought, only earned.

| | |
|---|---|
| File | `value-created-ch12-trust-the-invisible-ingredient.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 8.4 MB, -15.2 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/12.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | Every bottle. Off every shelf. (27 pill bottles on three shelves) / Nobody asked. They did it anyway. (the bottles are swept off, the shelves empty) |
| 4.5–7.6 | Where trust is high, business is cheap. (HIGH TRUST: a gold dot crosses a short track fast; LOW TRUST: an ink dot winds through a long track of gates) |
| 7.6–11.2 | It can't be bought. Only earned. (cards for an ad, a spokesperson and reviews bounce off a dashed TRUST block: ATTENTION, AWARENESS, SUSPICION) |
| 11.2–14.5 | Say Thursday. Show up Wednesday. Every overshoot is a deposit. (a week strip: flag on THU, gold check lands on WED) |
| 14.5–19.3 | Slowly up. Instantly down. (a tower of dark blocks with a gold cap rises one block at a time, then one crack on the drop sends it tumbling into a heap) |
| 19.3–23.2 | Apologies are cheap. Made whole is expensive. (a scale: a light SORRY card barely moves it, a heavy gold MADE WHOLE block slams it down) |
| 23.2–28.2 | Be the first to trust. It comes back multiplied. (YOU sends one gold orb to THEM, two come back: ×2) |
| 28.2–33.0 | Build the trust. Earn the dividend. One kept promise at a time. (SKILL, ATTENTION, SOLUTIONS blocks stand on a dashed TRUST base that fills gold) |
| 33.0–38.0 | Value, Created — Chapter 12: Trust, the Invisible Ingredient / Full 9-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. About 88 words on screen before the end card, counting labels. No dollar signs, coins, price tags or financial charts: the dollar figures (the recall's cost, the Ritz-Carlton limit) and the market-share percentages are left out on purpose, and the recall is shown only as bottles leaving shelves. Copy notes to check:
- "Nobody asked. They did it anyway." paraphrases "Nobody ordered them to do it" (no regulator asked, lawyers advised against). The bottle count on screen (27) is a graphic, not the 31 million, and carries no number label.
- "Where trust is high, business is cheap" is verbatim; the two tracks (short with a handshake, long with gates) illustrate the transaction-cost passage and are not data.
- "It can't be bought" cards map to the transcript: advertising gets attention, a famous spokesperson gets awareness, bought five-star reviews get suspicion.
- "Say Thursday. Show up Wednesday." is the plumber example; "Every overshoot is a deposit" is verbatim. Borderline: "deposit" is a finance word, used as a metaphor only.
- "Slowly up. Instantly down." paraphrases "slowly up, and instantly down".
- "Apologies are cheap. Made whole is expensive." is verbatim; "SORRY" is a label, not a quote.
- "Be the first to trust. It comes back multiplied." compresses "The fastest way to be trusted is to be the first one to trust" and "Extend it, and it comes back multiplied". The orb and "×2" are illustrative and carry no "Illustrative" label because there is no real number.
- "Earn the dividend." is Alex's sign-off line; "One kept promise at a time." is from the takeaway. The SKILL / ATTENTION / SOLUTIONS blocks are a shorthand for chapters 6, 7 and 11 ("Trust is what all of them run on").
- The episode is 8:41; the end card rounds up to "9-minute".

## Re-render
```
cd video/value-created
node _engine/render.js ch12-trust-the-invisible-ingredient --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch12-trust-the-invisible-ingredient                              # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
