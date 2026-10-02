# Handoff to Lola: Season 1 content updates (from production, 2026-10-02)

## STATUS 2026-10-02 (Lola): content pass COMPLETE for all 12 episodes
Every episode now has a trimmed script (<=85 words), a filled `_template/episode.md`,
`claims.md`, and `package.md` with the chapter-connection formula
(caption chapter line + YouTube first-line chapter link). Card types chosen per episode.
Fixes applied: Ep 3 "50% off"/"$200" labeled ILLUSTRATIVE; Ep 5 "a million people" →
"many people"; Ep 9 "ten percent" reads as example ("say"); Ep 12 shared Wren+Kai frame.
All director sign-offs ticked except the two visual boxes (tick after each cut is built).
Word counts: Ep 1 84 · Ep 2 85 · Ep 3 82 · Ep 4 83 · Ep 5 83 · Ep 6 84 · Ep 7 84 ·
Ep 8 81 · Ep 9 85 · Ep 10 85 · Ep 11 80 · Ep 12 84.
Production can build any episode in any order; launch order Ep 1 → 2 → 3 first.

Ep 1 is final and waiting for your check (`ep01-the-five-dollar-coffee/README.md`). The format changed
since your scripts were written (anime x infographic x game, two alternating leads, a narrator that
follows the lead), so each remaining episode needs a content pass from you. Production builds the
pictures from what you write; you decide **what**, never **how**.

## What changed for you
- **Two leads, by episode number.** Odd = Wren (narrator Leda), even = Kai (narrator Puck). Scripts don't change; only who is on screen.
- **Runtime.** The final cut is about 32 s, of which about 28.5 s is narration. At Ep 1's pace that is **about 85 words of narration maximum**. Ep 1 had to be cut from about 100 words to 84.
- **New beat shapes.** Your 6-row beat tables (0–4, 4–10, …) are replaced by the fill-in brief in `_template/episode.md`. The myth is a boss panel that gets struck; the reframe is a card sequence; the flip is a trade-places diagram plus a typed question; the move is a quest card. See Ep 1's `script.md` as the worked example.
- **Same rules.** `../00-program/content-rules.md`: no unsourced numbers, no real brands, no shaming, no engagement bait. Numbers need a `claims.md` row or an **ILLUSTRATIVE** label on screen.

## Your checklist, per episode
1. Trim the narration to about 85 words (table below).
2. Fill in `_template/episode.md` (copy it over the episode's `script.md`, keeping your wording where it still works).
3. Write `claims.md` and `package.md` (templates here; Ep 1 is the worked example).
4. Tick your director sign-off boxes when you are happy.
5. Tell production when an episode is ready; production builds, voices, renders and runs the QA gate.

## Per-episode notes
| Ep | Lead / narrator | Narration now | Trim by about | Claims / package | Notes for you |
|---|---|---|---|---|---|
| 1 | Wren / Leda | 84 | done | done | Final cut ready for your check; approve the script changes in its `script.md` |
| 2 | Kai / Puck | 93 | 8 | missing | First Kai episode. Reframe is a comparison (diamond vs water), not problem-solved-paid: choose the card type |
| 3 | Wren / Leda | 92 | 7 | old paper-style files | "Fifty percent off" and "two hundred dollars" are illustrative: keep the label on screen. Old `scenes.js` is superseded |
| 4 | Kai / Puck | 90 | 5 | missing | |
| 5 | Wren / Leda | 87 | 2 | old paper-style files | "a million people" is an unsourced claim: reword (for example "many people") or add a source |
| 6 | Kai / Puck | 95 | 10 | missing | |
| 7 | Wren / Leda | 84 | none | missing | |
| 8 | Kai / Puck | 91 | 6 | missing | |
| 9 | Wren / Leda | 96 | 11 | missing | "ten percent" is in the move: confirm it reads as an example, not advice. "it's rarely the maker" is a general claim: qualify or source |
| 10 | Kai / Puck | 98 | 13 | missing | Longest script |
| 11 | Wren / Leda | 80 | none | missing | |
| 12 | Kai / Puck | 87 | 2 | missing | Season finale: say if Wren and Kai should share a frame (open decision in the Format Lab) |

Word counts are from each `script.txt`; the trim estimate assumes Ep 1's pace and will shift a little by voice.

## What production will do
- Build the episode template so each episode becomes a short config plus the narration (no new code per episode), then Ep 2 (Kai) as the proof.
- Voice (Leda or Puck), soundtrack, MP4 render, captions, QA gate (`02-engine/qa/qa.py`).
- Rebuild Eps 3 and 5 in the new format once their scripts are re-fitted.

## Decisions waiting on Long
Launch order (Ep 1, 2, 3 proposed), handle and trademark check, accounts, whether the leads ever share a frame, device test on each platform.
