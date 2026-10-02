# EP14 Claim Ledger

Template and rules: `../../../../podcast/shared/CLAIMS_TEMPLATE.md`.
Verification date: 2026-10-01. Verdicts: keep / qualify / correct / remove.

| # | Claim as scripted | Source (exact URL, who publishes it) | Verdict |
|---|---|---|---|
| 1 | Credit card companies make money by charging interest; interest is added to what you owe each month. | https://files.consumerfinance.gov/f/documents/cfpb_building_block_activities_understanding-minimum-payments_guide.pdf (CFPB Building Blocks teacher guide "Understanding minimum payments", Summer 2022, p. 2 to 3) | keep |
| 2 | Paying only the minimum can take years, even decades, on high balances. | https://files.consumerfinance.gov/f/documents/cfpb_building_block_activities_understanding-minimum-payments_guide.pdf (CFPB Building Blocks teacher guide, Summer 2022, p. 3: "It can take years, even decades, to pay off high balances.") | keep |
| 3 | Paying more than the minimum means less time and less paid in total. | https://files.consumerfinance.gov/f/documents/cfpb_building_block_activities_understanding-minimum-payments_guide.pdf (CFPB Building Blocks teacher guide, Summer 2022, p. 4 answer guide: Q1 "Less time", Q2 "Will pay less") | keep |
| 4 | US card statements must show how long it takes to repay at the minimum and the total cost. | https://www.consumerfinance.gov/rules-policy/regulations/1026/7/ (CFPB, Regulation Z 12 CFR 1026.7(b)(12)) | keep (caption only, not on screen) |
| 5 | Example minimum = interest + 1% of balance, floor $25. Real minimums vary by card. | https://experian.com/blogs/ask-experian/how-is-your-credit-card-minimum-payment-calculated (Experian blog, updated 2025-11-07, secondary source, primary CFPB page on the formula not found): method 2 "typically around 1%" plus fees and interest; floors "such as $25 or $35". | qualify |
| 6 | $1,000 at 24% APR on that formula: first payment $30, $20 of it interest, balance $990. | `calc.py` in this folder (our own arithmetic on the assumptions in #5) | keep (illustrative) |
| 7 | Minimum only: 74 months, about $887 interest. Flat $50: 26 months, about $290. Difference about 4 years and about $597. | `calc.py` | keep (illustrative) |

| 8 | 24% a year is about 2% a month, so about $20 on $1,000. | Arithmetic (24% / 12). Issuers usually charge interest with a daily rate (APR / 365), so a monthly figure is approximate: https://www.consumerfinance.gov/ask-cfpb/what-is-a-daily-periodic-rate-on-a-credit-card-en-46/ (CFPB) | qualify ("about" on screen) |
| 9 | The minimum payment shrinks as the balance falls ($30 at the start, down to the $25 floor in our example). | `calc.py`, on the formula in #5 | keep (illustrative) |
| 10 | Paying a fixed $50 every month: 26 months, about $290 interest; you keep about $597 vs minimum only. (Minimum + $20 would be 30 months, about $324.) | `calc.py` | keep (illustrative) |

## Qualifiers that must appear in the script
- On screen, with every number: **"Illustrative. $1,000 at 24% APR. Minimum = interest + 1%. Real cards vary."**
- End card: "Educational only. Not financial advice."
- Say "can" and "often", never "always".

## Removed
- Any "average APR" figure. Not sourced, not needed. 24% is stated as an example only.
- Any named lender, card, bank or app. The trap is drawn as the Treadmill Gremlin, a mechanism, not a company.
