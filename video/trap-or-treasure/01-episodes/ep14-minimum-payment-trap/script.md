# EP14 script (28.6 s, 128 bpm, cuts on the beat)

Every beat works on mute. No voiceover (see `../../00-program/series-bible.md`). Everything the viewer must read sits inside the safe box (y 90 to 470, x 40 to 320 above y 280, x 40 to 260 below; three bands: headline, hero, readout).

| Time | Beat | Style | Picture / animation | On-screen text | Sound |
|---|---|---|---|---|---|
| 0-1.9 | HOOK (A) | kinetic type + Mei close-up, red | Frame 0 already shows Mei smiling and "YOU PAID $30." At 0.85 s "DEBT DROPPED $10." slams, Mei's face flips to shock, a sweat drop falls, the TRAP 14 stamp lands | "YOU PAID $30." "DEBT DROPPED $10." "TRAP 14 OF 24" | boom, slam, stamp thud |
| 1.9-4.2 | STEP IN | anime + fake phone UI | Mei taps "Pay minimum". Balance $1,000 to $990, a "-$10" floats. The Treadmill Gremlin rises over the phone with a smug grin. Lower third "MEET TRAP 14: TREADMILL GREMLIN" | "Easy. Pay the minimum." "Minimum due: $30" | tap click, sad blip, the Gremlin's laugh |
| 4.2-6.1 | STEP IN | anime, red | Mei walks on a treadmill. The Gremlin sits on the console with the remote, Nickel is worried. The debt bar barely moves | "Feels responsible." "Goes nowhere." | treadmill ticks |
| 6.1-10.8 | X-RAY | Pearl print + money arrow | The $30 coin drops from the wallet and splits. The $20 piece rides the arrow into the Gremlin's sack (gulp). The $10 piece drops onto the debt bar | header: "WHERE DID THE $20 GO?" then "$20 GOES TO INTEREST" then "$10 PAYS YOUR DEBT"; side note "24% a year is about 2% a month: $20" | bouncy beat, coin clinks, gulp |
| 10.8-15.5 | X-RAY | flat motion graphics | 74 payment tiles fill; payments and interest counters roll to 74 and about $887; "about 6 YEARS"; "$1,000 becomes $1,887" | "74 PAYMENTS LATER..." "about 6 YEARS" "Illustrative. $1,000 at 24% APR. Minimum = interest + 1%. Real cards vary. Receipts in the comments." | counter clicks, big hit |
| 15.5-18.2 | TREASURE | anime + game UI, green-gold | Swipe to green. Stairs pop up. Mei climbs, Nickel cheers, a chest opens with "$50" | "PAY $50. EVERY MONTH." "The minimum shrinks. Your payment shouldn't." | whoosh, level-up chime, blips |
| 18.2-24.4 | TREASURE | game UI + counters | Two debt bars race ("MINIMUM ONLY (it shrinks)" vs "$50 EVERY MONTH"), each with a Snare whose size is the balance. The fixed-$50 Gremlin shrinks and poofs; Nickel cheers. Counters: 2 years, $290, "YOU KEEP $597" | "MONTH 26" "2 YEARS" "$290 interest" "YOU KEEP $597" "Illustrative. $1,000 at 24% APR. Real cards vary." | rising arp, poof, coin clinks, big hit |
| 24.4-28.6 | QUEST | flat card + brand slate | Quest card with the solved Trap File card (SOLVED stamp), XP bar, "Level up!". "Which trap got you?" appears, then the brand slate rides the last 1.5 s | "QUEST: PAY A FIXED AMOUNT." "Above your minimum. Same amount, every month." "TRAP 14 > TREASURE" "World 4 Ep 14/24" "Educational only. Not financial advice." "Which trap got you?" "Trap or Treasure is a production of The Joy Digi" | chord, chimes |

## New infographic pieces (built, `02-engine/parts/infographics.js`)
Snare (`gremlin()`), coin sack, Trap File card, trap stamp, act tag, phone UI, money arrow, coin, wallet, treadmill, stairs, chest, HP bar, Nickel.

## Poses and faces used
Mei (work look): joy, shock, calm, sad, walk. Nickel: worried, happy.

## Mute test and freeze-frame test
- [x] trap, number and quest are clear with sound off (director, contact sheets, 2026-10-01; pending your viewing)
- [x] every paused frame has one focal point (director, contact sheets, 2026-10-01; pending your viewing)
- [x] safe-box test: `sheet.js --safe`, nothing important in the red (director, 2026-10-01)

## Fact check
- [x] numbers sourced and dated (`claims.md`, 2026-10-01)
- [x] "illustrative" on screen with every number
- [x] no company, product or stock named (the Gremlin is a mechanism)
