# Trap or Treasure: money anime for young people

*Trap or Treasure is a production of The Joy Digi.* Lives in the thejoydigi repo at `video/trap-or-treasure/`.

**Mission:** show young people the traps built into the modern consumer and financial system, and the way out. Vertical anime shorts, about 30 seconds each, one trap per video, built for TikTok, Instagram Reels and YouTube Shorts.
**Cast:** Mei (hero, 19), Rex (friend), the **Snares** (each trap drawn as a creature), Nickel (coin), Pearl (archivist).

## The show in one picture

```
HOOK        face + the trap as a number           0-1.9 s    -> three variants (Hook Lab)
STEP IN     Mei or Rex walks into it; Snare       1.9-6 s
X-RAY       how it works, who profits             6-15.5 s   follow-the-money arrow, one counting number
TREASURE    the Snare shrinks; the way out        15.5-24 s
QUEST       one action + the solved Trap File     24-28.6 s  loop
```

## Season 1 at a glance

```
SEASON 1  =  6 WORLDS x 4 TRAPS = 24 shorts   (+ bonus Pearl's Corner and "Trap or Treasure?" quizzes)

 World 1  STARTER VILLAGE   1 Time Is Money      2 Free Trials       3 First Paycheck   4 50/30/20
 World 2  VAULT VALLEY      5 Pay Yourself First 6 Money Shield      7 Where to Keep Cash  8 Overdraft and junk fees
 World 3  SCORE MOUNTAIN    9 What Is Credit     10 Score = Level Bar 11 Utilization    12 On-Time Boss
 World 4  INTEREST SWAMP    13 Interest Snowball 14 Minimum Trap      15 Student Loans   16 Pay in 4
 World 5  SEED GARDEN       17 Shrink Ray        18 Compound Interest 19 Get-Rich Hype   20 Free Money Match
 World 6  FORTRESS         21 Scam Radar        22 Cash-Advance Apps 23 The Free Bet    24 Level-Up Plan
```

Ranked by evidence (`00-program/evidence.md`). Posted by hook strength, not curriculum order.

## Start here

| If you want to... | Open |
|---|---|
| See the pilot episode (video, hook lab, feedback form) | the published page (link in the chat) or `01-episodes/ep14-minimum-payment-trap/export/ep14-share.mp4` (local, git-ignored) |
| See the characters | `03-assets/cast/` (build it, or the published page) |
| Know why these traps | `00-program/evidence.md` |
| Know the rules for TikTok, Reels and Shorts | `00-program/platform-guide.md` |
| Produce an episode | `00-program/production-pipeline.md` |
| Know what is ready and what blocks launch | `00-program/production-readiness.md` |
| Know the launch plan and weekly rhythm | `00-program/launch-plan.md` |

## Folder map

```
video/trap-or-treasure/
  README.md                      you are here
  00-program/                    the design (read these first)
    series-bible.md              mission, positioning, format, structure, hook lab, devices
    characters.md                cast, the Snares, rigs, rules
    visual-style.md              styles, palette, layout and safe box, Snare and card design
    content-rules.md             accuracy, compliance, trust, review checklist
    evidence.md                  what young people face; verified vs reported
    platform-guide.md            safe zones, specs, AI disclosure, music, finance rules
    growth-plan.md               what platforms say, hypotheses, tests, calendar, metrics
    production-pipeline.md       the 13 steps, the tools, the gates
  01-episodes/
    episode-map.md               all 24 + bonus, evidence, status
    _template/                   brief, script, claims, package
    ep01-... to ep24-...         one folder per episode
    _parked/                     six episodes replaced by higher-evidence traps
  02-engine/                     how videos get built
    parts/                       core, rig-mei, infographics, music, transport
    shell.html, build.py         page shell and build
    render/                      render.js (MP4), sheet.js (contact sheets), safezone.json
    qa/qa.py                     the QA gate
    reference/                   the original working films
  03-assets/
    cast/                        the cast sheet page
  04-export/                     (final files live in each episode's export/ folder; git-ignored)
```

Repo rule: text, docs and small files only. Rendered MP4, GIF and WAV files stay local (`video/.gitignore`).

## How we work

```
evidence -> brief -> claims -> script -> hook lab -> storyboard -> build -> QA gate -> render -> package -> device test -> post -> learn
```

Pilot: **Ep 14, The Minimum Payment Trap** (built, rendered, awaiting your feedback). Next pilots: the broadest-reach traps (16 Pay in 4, 2 Free Trials).

## Open decisions (defaults assumed until you change them)

| # | Decision | Assumed default |
|---|---|---|
| 1 | Brand and channel | **The Joy Digi** production, under the umbrella brand standard (`docs/brand/design-standard.md`). |
| 2 | Series title | Trap or Treasure (renamed from Pocket Quest). Check trademark and handle availability. |
| 3 | Language | English first. Vietnamese subtitles or a second cut later, if you want. |
| 4 | Voice | **Google Gemini text-to-speech** (your decision). Mei's lines only repeat what is on screen. A silent cut is always kept. The director chose the voice **Leda**. Re-read YouTube's monetization policy before monetizing. |
| 5 | Region | US money rules. Other countries need their own cut. |
| 6 | Cadence | 3 posts a week, produced in batches of one world. |
| 7 | TikTok handle and profile text | To decide. End card uses the coral sparkle mark and The Joy Digi wordmark (drawn in code). |
| 8 | Core audience | 18 to 25. We have almost no data on 16 and 17 year olds. |
| 9 | Season 1 slots | Six episodes were replaced by higher-evidence traps (student loans, cash-advance apps, betting apps, subscriptions, overdraft fees, get-rich hype). Approve or revert. |
