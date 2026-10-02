# Worth It — see the value. Be the value.

*Worth It is a production of The Joy Digi.* Lives in the thejoydigi repo at
`video/worth-it/`.

**Mission:** teach young people to see how money is really made — so they stop
playing defense and start playing offense. Thirty-second vertical shorts, one
ordinary money moment per episode: the myth everyone repeats, the reframe that
reveals the value hiding inside it, the better question, one move. Ends on
*"Worth it."*

**Format:** 9:16, ~30 s, burned-in kinetic type (mute-safe), one warm narrator,
subtle bed. Warm editorial art: paper cream, ink, gold. No mascots, no hype.

**Season 1:** 12 episodes in 5 movements — Seeing → Creating → Capturing →
Scaling → Giving. Each episode dramatizes one *Value, Created* chapter
(`01-episodes/season-map.md`).

**Position:** the short-video companion to the *Value, Created* audiobook
(Long's call, 2026-10-01). Each short maps 1:1 to an audiobook chapter; the
CTA ("want the full 15 minutes?") lives in captions and the profile bio, never
burned into the video.

## Start here

| If you want to... | Open |
|---|---|
| The show concept and philosophy check | `00-program/concept.md`, `00-program/audience.md` |
| The format, arc, and devices | `00-program/series-bible.md` |
| The art guideline (for Claude agent builds) | `00-program/visual-style.md` |
| The rules every episode obeys | `00-program/content-rules.md` |
| How episodes get made, and who does what | `00-program/production-pipeline.md` |
| What's ready and what blocks launch | `00-program/production-readiness.md` |
| The launch plan | `00-program/launch-plan.md` |
| Platform specs and safe zones | `00-program/platform-guide.md` |
| The season map | `01-episodes/season-map.md` |
| Ep 1 (voiced) | `01-episodes/ep01-the-five-dollar-coffee/` |

## Folder map

```
video/worth-it/
  README.md                      you are here
  00-program/                    the design (read these first)
    series-bible.md              mission, positioning, format, arc, devices, roles
    visual-style.md              art guideline: palette, type, devices, motion, don'ts
    audience.md                  who, the pain point, the value we give
    concept.md                   the original concept note + philosophy check
    content-rules.md             accuracy, compliance, trust, review checklist
    production-pipeline.md       the 12 steps, the roles, the rhythm
    production-readiness.md      audit: what's ready, what's blocked
    growth-plan.md               platform facts, hypotheses, tests, metrics
    launch-plan.md               phases, launch batch, launch gate
    platform-guide.md            TikTok / Reels / Shorts specs (series-agnostic)
  01-episodes/
    season-map.md                all 12 episodes: myth / reframe / flip / move / chapter
    ep01-the-five-dollar-coffee/ script + (audio kept local, git-ignored)
    _parked-trap-or-treasure/     the earlier Trap or Treasure work — parked, not deleted
  02-engine/                     deterministic render pipeline (inherited; needs Worth It restyle)
  03-assets/
  04-export/                     (final files live in each episode's export/; git-ignored)
```

## Roles
- **Lola — series director.** Content, scripts, art direction, QA. Manages production.
- **Claude agent — production worker.** Builds animation/visuals from the director's scripts.
- **Long — executive.** Approves scripts and cuts, device test, posts.

## Open decisions
| # | Decision | Status |
|---|---|---|
| 1 | Series title | Worth It (working title; trademark + handle check open) |
| 2 | Art guideline | Written; awaiting Long's approval |
| 3 | Voice | Warm narrator; Ep 1 cut voiced, awaiting Long's listen |
| 4 | Launch batch | Ep 1, 5, 3 — scripts for 5 and 3 to be written |
| 5 | Trap or Treasure | Parked. Engine reused; creature rigs retired |
