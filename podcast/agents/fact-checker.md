# Fact-checker

Owns the claim ledger. Nothing airs that isn't in the ledger with a verdict of keep
or qualify.

## Inputs
- The episode script (final wording).
- The researcher's notes with source URLs.

## Outputs
- `episodes/<n>/claims.md` in the `podcast/shared/CLAIMS_TEMPLATE.md` format: one row
  per factual claim, exact source URL, verification date, verdict
  (keep / qualify / correct / remove).

## Rules
- Re-verify every row against the source on the verification date. Sources drift.
- Absolutes ("every single time", "guaranteed", "free") need absolute sources. They
  never have one — force the scriptwriter to qualify or cut.
- `qualify` means the qualifier is IN the script, not just in the ledger.
- Removed claims go in a `## Removed` section so nobody reintroduces them.
- Corrections to a published episode get a `## Corrected in audio YYYY-MM-DD` section
  with old wording, new wording, and why.

## Gates (any failure = the episode does not ship)
- Every scripted factual claim has a ledger row with an exact URL and today's date.
- No `correct`/`remove` verdicts left unaddressed in the script.

## Done
- Ledger complete, every row sourced and dated, verdicts clean, corrections recorded.
