# EP16 Claim Ledger

Template and rules: `../../../../podcast/shared/CLAIMS_TEMPLATE.md`.
Verification date: 2026-10-01. Verdicts: keep / qualify / correct / remove.

| # | Claim as scripted | Source (exact URL, who publishes it) | Verdict |
|---|---|---|---|
| 1 | Pay in 4 splits a purchase into four equal payments: the first at checkout, the next three every two weeks, over six weeks. | https://files.consumerfinance.gov/f/documents/cfpb_buy-now-pay-later-market-trends-consumer-impacts_report_2022-09.pdf (CFPB, BNPL market trends report, Sept 2022, p. 3: "the first installment paid as a down payment due at checkout, and the next three due in two-week intervals over six weeks") | keep |
| 2 | 63% of BNPL borrowers had more than one loan at the same time at some point in the year; 33% across different companies; stacking spikes over the holidays. | https://files.consumerfinance.gov/f/documents/cfpb_BNPL_Report_2025_01.pdf (CFPB, Consumer Use of BNPL and Other Unsecured Debt, Jan 2025, executive summary and section V; 2022 data from six large lenders) | qualify (say "had more than one at a time", data year 2022) |
| 3 | About 1 in 3 BNPL users aged 18 to 29 paid late in the past year (32%). | https://www.federalreserve.gov/publications/files/2025-report-economic-well-being-us-households-202605.pdf (Federal Reserve, Economic Well-Being of U.S. Households in 2025, May 2026, table 41) | keep |
| 4 | 64% of BNPL users who paid late were charged extra. | same report, BNPL section ("Sixty-four percent of those BNPL users who were late making a payment ... said they were charged extra") | keep |
| 5 | 11% of BNPL users had a BNPL payment trigger an overdraft or NSF fee from their bank. | same report, BNPL section | keep |
| 6 | Stores pay the lender a fee to offer Pay in 4, and late fees add more. | CFPB Sept 2022 report (claim 1 URL), p. 4 to 6: "merchant discount fees (fees merchants paid to BNPL lenders)"; consumer fees were 13.4% of lender revenue in 2021; late fees "often around $7 per missed payment" | qualify (no fee amounts on screen; fees vary) |
| 7 | Illustrative cart: $200 + $120 + $80 = 12 payments in 6 weeks, $100 due every two weeks, $400 total; one plan at a time is $50 per date. | `calc.py` in this folder | keep (illustrative) |
| 8 | Most BNPL loans did not appear in credit records (caption only, not on screen). | CFPB Jan 2025 report (claim 2 URL), executive summary | keep (caption only; reporting rules are changing) |

## Qualifiers that must appear in the script
- With the cart numbers: **"Illustrative cart. Fees vary by lender."**
- End card: "Educational only. Not financial advice."
- No lender, store or app named. The checkout screen is a generic shop.

## Removed
- "On-time BNPL payments do not help your credit score." True at the time of the Fed survey, but credit-score treatment of BNPL is changing. Not on screen.
