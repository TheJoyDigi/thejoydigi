# EP14: The Minimum Payment Trap

**Trap:** 14 / 24  |  **World:** 4, Interest Swamp (debt)  |  **Length target:** 30 s (demo 28.6 s)  |  **Status:** scripted (demo built, awaiting director feedback)

## Hook (on screen, frame 1, max 8 words)
You paid $30. Debt dropped $10.

## The trap (named)
The minimum payment is set so most of it feeds interest, so the balance barely moves.

## The one idea (one sentence)
When you pay only the minimum, most of each payment goes to interest, so the debt shrinks slowly and costs far more.

## Visual metaphor (one only)
A treadmill: Mei walks hard, the balance bar barely moves. At the treasure the treadmill becomes a staircase.

## X-ray: who profits
Follow-the-money arrow: $30 leaves Mei's wallet and splits into $20 INTEREST (into the Gremlin's coin sack) and $10 DEBT (what Mei actually reduced). Counter shows the cost of staying on the treadmill.

## Treasure: the way out
Pay a fixed amount every month instead of the shrinking minimum. A fixed $50 (that is $20 more than the first minimum) cuts about 6 years to about 2 and you keep about $597. The minimum shrinks as you pay; your payment shouldn't.

## The numbers on screen (all illustrative, reproduce with `calc.py`)
| Number | Value | Source |
|---|---|---|
| Example | $1,000 balance, 24% APR, minimum = interest + 1% (floor $25), no new purchases | assumption, see `claims.md` #5 |
| First payment | $30 paid, $20 interest, balance $990 | `calc.py` |
| Minimum only | 74 months (about 6 years), interest about $887 | `calc.py` |
| Fixed $50 every month | 26 months (about 2 years), interest about $290 | `calc.py` |
| The minimum shrinks | $30 at the start, down to the $25 floor | `calc.py` |
| Difference | about 4 years and about $597 saved | `calc.py` |

## Mei's problem (relatable moment, 6 s)
Mei opens her card app. The big button says "Pay minimum: $30". Easy. She taps it, feels responsible, and the balance barely twitches.

## The rule (what we teach, 20 s)
Interest eats the minimum. Anything you add goes straight to the debt.

## Quest (one tiny free action)
Pay a fixed amount above your minimum, every month.

## Characters and location
Mei (work look), the Treadmill Gremlin (the Snare: a mechanism, never a company), Nickel. Rex does not appear in this episode.

## Music mood
Tense (trap) -> curious (X-ray) -> hopeful and triumphant (treasure).

## Notes
- Caption includes the plain-words name for search: "minimum payment trap".
- Pinned comment: "Which trap got YOU? Reply with the number." plus the quest.
- Statement tip for the caption (not on screen): US card statements must show how long minimum-only payoff takes and the total cost (`claims.md` #4).
- Run `../../00-program/content-rules.md` checklist before posting.
