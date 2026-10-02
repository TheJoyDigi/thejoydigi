# EP16 script (approved 2026-10-01; 28.6 s, 128 bpm, same beat grid as Ep 14)

Every beat works on mute. Voice lines only echo the on-screen text. Rex speaks in the trap; Mei speaks from the X-ray on.

| Time | Beat | Picture | On-screen text | Voice |
|---|---|---|---|---|
| 0-1.9 | HOOK (A) | Rex grinning at his phone, Black Friday glow. At 0.85 s his face drops; the banner slams up from below | top: "ONLY $50." / banner: "12 PAYMENTS. 6 WEEKS." / stamp "TRAP 16" | Rex: "Only fifty!" then "Wait... twelve payments?" |
| 1.9-4.2 | STEP IN | Phone checkout: big "Pay in 4: $50 today" button, tiny "Pay $200" link. Rex taps it, then two more carts flash by: "only $30", "only $20". The Quad Imp pops up behind the phone. Lower third: "MEET TRAP 16: QUAD IMP" | "Pay in 4: $50 today" / "only $30" / "only $20" | Rex: "It's only fifty. And thirty. And twenty." |
| 4.2-6.1 | STEP IN | Rex in his new jacket and earbuds, beaming. The Quad Imp juggles four invoices behind him | "Feels free." / "It's a loan." | Rex: "Feels free." Mei: "It's a loan." |
| 6.1-10.8 | X-RAY | Pearl page. Header "WHAT'S DUE WHEN?" A six-week calendar: today, week 2, week 4, week 6. Bricks ($50, $30, $20) drop onto each date and stack to $100 | header: "WHAT'S DUE WHEN?" then "$100 EVERY TWO WEEKS" / side: "63% had more than one at a time" | Mei: "What's due when? A hundred, every two weeks." |
| 10.8-15.5 | X-RAY | One autopay bounces: a late-fee tag and a bank overdraft tag hit the brick wall. Arrows from the store and from late fees into the Quad Imp's sack | "ONE MISSED PAYMENT..." / "LATE FEE" "OVERDRAFT" / "About 1 in 3 users 18 to 29 paid late." / "Illustrative cart. Fees vary by lender. Receipts in the comments." | Mei: "Miss one, and the fees pile on." |
| 15.5-18.2 | TREASURE | Swipe to green. Mei with a big calculator; the twelve bricks collapse into one number | "ADD IT UP." / "BEFORE YOU TAP." / "$400 in 6 weeks" | Mei: "Add it up before you tap." |
| 18.2-24.4 | TREASURE | Two calendars side by side: three plans ($100 per date) vs one plan ($50 per date). The Quad Imp shrinks as plans drop off. Rex, relieved | "THREE PLANS: $100 every 2 weeks" / "ONE PLAN: $50" / "ONE PLAN AT A TIME." | Mei: "One plan at a time. Half the hit." |
| 24.4-28.6 | QUEST | Quest card with the solved Trap File 16, binder strip 2/24, brand slate | "QUEST: ADD UP EVERY PAY IN 4 DUE THIS MONTH." / "Every app. Every plan." / "Which trap got you?" | Mei: "Quest: add up every payment due this month." / "Which trap got you?" |

## New builds needed
Quad Imp (Snare), calendar-brick infographic, checkout UI variant (Pay in 4 button), late-fee and overdraft tags, Rex's voice and a face pass.

## Mute test and freeze-frame test
- [x] trap, number and quest are clear with sound off (director, contact sheets, 2026-10-01; pending your viewing)
- [x] every paused frame has one focal point (director, contact sheets, 2026-10-01; pending your viewing)
- [x] safe-box test: `sheet.js --safe`, nothing important in the red; balance 33% / 44% / 23%

## Voice (built)
Rex: Umbriel. Mei: Leda. One planned Mei line ("Most people have more than one") was cut in the mix because it collided with the next beat; the 63% stat is on screen instead.

## Fact check
- [x] every number is in `claims.md` or `calc.py`
- [x] "Illustrative cart. Fees vary by lender." on screen with the cart numbers
- [x] no lender, store or app named
