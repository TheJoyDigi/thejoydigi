# Production pipeline — Worth It

```
0 PICK -> 1 SCRIPT -> 2 CLAIMS -> 3 HOOK -> 4 BUILD -> 5 QA GATE -> 6 RENDER ->
7 VOICE -> 8 PACKAGE -> 9 DEVICE TEST -> 10 POST -> 11 LEARN
```

The director writes the script first (content leads); claims verify what the
script asserts. A number that cannot be sourced never reaches the build.

| # | Step | Output | Done when | Owner |
|---|---|---|---|---|
| 0 | **Pick** | the episode and its slot | chosen from `season-map.md`, post order by hook strength | Lola |
| 1 | **Script** | `script.md` | myth, reframe, flip, move named; every beat has one picture and under 8 words; the mute test is written down; the chapter it earns is named | Lola |
| 2 | **Claims** | `claims.md` (+ `calc.py` for any math) | every number has an exact URL and a verdict | Lola |
| 3 | **Hook** | the first 2 seconds | the myth lands on frame 0; cover frame chosen | Lola |
| 4 | **Build** | scenes per `visual-style.md` | plays start to end; scrubbing works; Lens/Counter/Strike/Card devices used | Claude agent |
| 5 | **QA gate** | a passing report | automated checks 0 fail **and** the director has ticked the mute, freeze-frame, and philosophy checks | Lola |
| 6 | **Render** | `export/<slug>.mp4`, `-cover.png` | 1080x1920, 30 fps, H.264, loudness near -16 LUFS | Claude agent |
| 7 | **Voice** | `export/<slug>-voice.mp4` + silent cut kept | lines fit beats, music ducked, ~-16 LUFS | Claude agent (voice direction: Lola) |
| 8 | **Package** | `package.md` | caption (with the audiobook CTA: "want the full 15 minutes? link in bio"), pinned open question, receipts, alt text, audience setting, cover | Claude agent |
| 9 | **Device test** | screenshots of a private draft on each platform | nothing important hidden by the app UI | Long |
| 10 | **Post** | the live post | the checklist in `content-rules.md` is clean | Long |
| 11 | **Learn** | numbers in `season-map.md` | after 48 hours and 7 days; decisions logged | Lola |

## Roles
- **Lola (series director):** story, season map, scripts, claims, high-level
  art and voice direction, QA sign-off, managing Claude agent's work, reading
  the numbers, weekly report to Long. The only content brain on the show.
  **Boundary (Long's call, 2026-10-02): Lola does not build visuals or video.**
  No video samples, no production commits, no tech detail on how video gets
  made — direction is high-level only ("what", never "how"). Lola's craft is
  writing and directing; the agent's is producing.
- **Claude agent (production worker):** builds ALL animation and visual
  content from the director's scripts per `visual-style.md`; renders;
  packages; keeps the engine healthy. The hands. Owns every production
  commit under `01-episodes/` and `02-engine/`.
- **Long (executive):** approves each script (5 min) and each final cut
  (10 min); device test on his phone; posts; reports numbers back.

## Rhythm
- Lola scripts 3 episodes (claims included) → Claude agent builds the new
  visual pieces the batch needs → builds, QA, renders → Long reviews
  (~30 min for 3) → post Mon/Wed/Fri while the next batch starts.
- Long's time per week: ~1 hour (30 min review, 20 min posting, 10 min numbers).

## Engine
`02-engine/` is the deterministic render pipeline (kinetic type, `render.js`
MP4, `sheet.js --safe` contact sheets, `qa.py` gate). Claude agent restyles
its parts to the Worth It art guideline and builds the four signature devices
(Lens, Counter, Myth Strike, Move Card) plus the 12 everyday objects. The
Trap-or-Treasure creature rigs are parked, not deleted.

## Definition of done for the season
12 episodes posted, engine documented, results reviewed against our own
baseline, season 2 chosen from the remaining chapters + comments + numbers.
