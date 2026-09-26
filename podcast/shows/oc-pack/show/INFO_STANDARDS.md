# The OC Pack — Information Standards

**The rule:** no uncertain claim ships. If a fact can't be verified from a real source, it is qualified, corrected, or removed. Long's standing direction: don't post anything if you're not sure.

## Source hierarchy

1. **Primary/official** — city and county pages, park and beach official pages, nonprofit flyers and organizer listings, current ordinances and regulations, insurer/industry primary data.
2. **Established secondary** — reputable news, veterinary publications, industry reports relaying primary data (attribute narrowly: "reported by X, based on Y data").
3. **Never** — unsourced blog claims, stale pages presented as current, social posts, memory, "everyone knows."

Secondary reporting of someone else's data is not the primary source. Say whose data it is.

## Claim ledger

Every episode ships with `ep{N}_claims.md`. One row per substantive claim:

| Claim (as scripted) | Source | Verified | Verdict |
|---|---|---|---|
| e.g. "Huntington Dog Beach is at 100 Goldenwest Street, open 5 AM–10 PM" | Dog Beach official listing | 2026-09-25 | keep |

Verdicts:
- **keep** — solid source, script as-is.
- **qualify** — true with limits; attribute narrowly and soften ("most policies," "reported," "around").
- **correct** — the fact is wrong; fix it before generation.
- **remove** — no solid source; cut it.

A claim with no keep/qualify verdict does not enter the script.

## Standing rules (from the Episode 1 audit, 2026-09-25)

- **Dates:** verify every weekday with the `date` command before scripting. October 11, 2026 is a Sunday — never "Saturday, October eleventh."
- **Events:** confirm the event is the current year's edition on an official or organizer page. A page describing "Saturday, October 11" may be last year's event. Remove stale events; never present a prior-year event as upcoming.
- **Attribution:** name the right organization. A Pet Adoption Center of Orange County event is not an OC Animal Care event.
- **Beaches and trails:** use the official wording. San Onofre allows dogs only on Bluffs Trail 1 and Trail 6 (trails, not beach sections), six-foot leash max. Don't generalize across beaches.
- **Prices:** no exact prices unless tied to a current, clinic-specific source. Old and new flyers conflict; fees change. Say "check the current flyer" instead of guessing.
- **Medical and safety advice:** conservative, attributed, non-guaranteed. "Sun-heated pavement can burn paws; test it and go early or late" — not universal temperature rules or second-count guarantees.
- **Insurance and money figures:** attribute the dataset and date ("most recently reported averages"), never present as guaranteed current prices. "Most policies exclude pre-existing conditions," not "every."
- **Ordinances:** cite the actual code section (e.g., OC §4-1-45: six-foot leash on public property unless an authorized exception applies).
- **Consumer rights:** the official, citable version. California vets must offer a free written prescription on request (Title 16, §2032.2). Keep the official right; drop unverified retailer price claims.
- **No unverified specifics:** rinse stations, exact beach lengths, "only" claims, and boundary details ship only with a source.
- **Freshness:** an event that already happened gets cut from the script if the episode delivers after it.

## Corrections policy

If an error ships: correct it on the next episode, update the feed item if the claim is load-bearing, and log the correction in the bible. No silent fixes to published facts.

## Review flow

1. Research Lead gathers material with sources.
2. Fact Checker builds the claim ledger and issues verdicts.
3. Script Editor writes only from keep/qualify claims.
4. QA Lead re-checks the ledger against the final script before Long's review.
5. Long gets the demo **plus the claim ledger** — he sees what stands behind every fact.
