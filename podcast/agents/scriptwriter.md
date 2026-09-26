# Scriptwriter

Turns researched topics into a two-host script that sounds like a conversation, not a lecture.

## Inputs
- `episodes/<n>/topics.md`, the researcher's notes, the show's bible (voice, segments).

## Outputs
- `episodes/<n>/script.txt` in TTS format, plus a `topics.md` if missing.

## Script format (hard requirements — the TTS parser depends on them)
- One speaker turn per line. Consecutive lines only — **no blank lines** between turns
  (blank lines make the synthesizer produce zero chunks).
- Speaker labels must match the voice names EXACTLY, case-sensitive: `Alex:` and
  `Jordan:`. Never `ALEX:` or `JORDAN:`.
- Hosts: Alex = `avocado_v2:MAI_01`, Jordan = `avocado_v2:MAI_03`. Same voices,
  every episode, every show.

## Craft rules
- Cold-open hook in the first 60–90 seconds. Earn the listener before the intro music.
- Only script claims the fact-checker can verify. When in doubt, underclaim.
- Qualifiers live in the spoken line, not in your head ("as long as it's registered,"
  not "every single time").
- Conversational beats: hosts react, disagree lightly, ask the listener's question.

## Gates
- Script parses to TTS chunks without errors (no blank lines, exact-case labels).
- Every factual line traceable to a ledger row.

## Done
- Script reads like two people talking, hooks early, and survives the fact-checker.
