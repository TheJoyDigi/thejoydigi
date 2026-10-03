# Value, Created — Chapter 16: Pricing: Naming Your Worth (LinkedIn cut)

The social video for sharing Chapter 16. It teaches the whole idea on screen, so it works with the sound off: costs set the floor, the buyer's value sets the ceiling, and you earn by pricing near the value you create, not by adding margin to your costs.

| | |
|---|---|
| File | `value-created-ch16-pricing-naming-your-worth.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 7.5 MB, -14.6 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/16.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | Thirty seconds of work. Charged for forty years. (Picasso's napkin gets a doodle, a 30-second dot, then a 40-year bar sweeps across) |
| 4.5–8.2 | Costs set the floor. The buyer sets the ceiling. (a floor line and a ceiling line draw in, the gap between them is shaded and marked THE GAP) |
| 8.2–12.1 | Most live on the floor. Cost-plus ignores the customer. (a ball marked COST-PLUS sits on the floor, a dashed ghost ball hints at the ceiling) |
| 12.1–17.5 | Price the outcome, not the input. (two gauges, BY COST and BY OUTCOME; on the drop the outcome ball shoots up) / Same two hours. Twice the money. |
| 17.5–22.0 | Offer three tiers. The middle wins. (BASIC, STANDARD, PREMIUM cards with one, two and three stars; the middle lifts and gets a check) |
| 22.0–26.4 | Raise it until someone says no. The right ones stay. (the ball hops up the gap with +10% and +20% chips, hits the ceiling, a NO bubble pops and the ball settles just under it) |
| 26.6–33.3 | Pricing is not arithmetic. (struck through) It is autobiography. (a signature squiggle draws under it) / Name it at the value you create. State it calmly, as a fact. |
| 33.3–38.0 | Value, Created — Chapter 16: Pricing: Naming Your Worth / Full 9-minute episode — link in comments |

Music drop at about 15.6 s: the outcome ball launches to the ceiling.

## Copy notes
- Rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. 74 words in headlines and sub-lines before the end card, about 98 counting the small tracked labels.
- No dollar signs, coins, cash, price tags or financial charts. The transcript's dollar and franc figures are left out on purpose; the idea is shown with a floor, a ceiling and a ball.
- Paraphrased from the transcript: "Twice the money" is the plumber story (twice the money for the same two hours). "+10%" and "+20%" come from "raise your rates, ten percent, twenty percent". "Cost-plus ignores the customer" condenses "it has nothing to do with the customer". "The right ones stay" condenses "the ones who stay are paying you closer to what you are worth". "Name it at the value you create" is "Name it at the level of the value you create".
- Borderline: the 30-second and 40-year bars are not to scale (a symbolic contrast). The gauges are plain floor/ceiling lines with a ball, not a price chart.
- The episode is 8:06; the end card rounds to "9-minute".

## Re-render
```
cd video/value-created
node _engine/render.js ch16-pricing-naming-your-worth --design --sheet 2,9,14,22,28,34,45   # stills + out/sheet.png (design seconds; drop --design for real seconds)
node _engine/render.js ch16-pricing-naming-your-worth                                         # out/<slug>.mp4 + checks (about 30 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`).
