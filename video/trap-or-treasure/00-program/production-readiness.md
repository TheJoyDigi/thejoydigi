# Production readiness (audit of 2026-10-01)

**Verdict: the pilot (Ep 14) is production-ready. The series is not ready to launch yet.** The blockers are distribution and inventory, not craft.

```
                 EP 14 (pilot)          SEASON
VISUAL           READY                  READY (system)    phone device test still to do
CONTENT          READY                  NOT READY         23 episodes are briefs only
CHARACTERS       READY                  PARTLY            Rex face pass, Pearl not ported, 23 Snares to build
SOUND            READY*                 READY (system)    *not yet heard by a human
PROCESS          READY                  BLOCKER           nothing is committed to git
DISTRIBUTION     -                      NOT READY         accounts, handles, launch inventory
```

## What was checked, and the evidence

| Area | Check | Result |
|---|---|---|
| Visual | `sheet.js --safe` on all beats | every face, number, headline and disclaimer inside the working box (y 90 to 470) |
| Visual | `sheet.js --balance` | top / middle / bottom detail 35% / 41% / 24% (was 47 / 46 / 7) |
| Visual | smallest on-screen text | 9.5 units minimum for anything meant to be read (lower-third label raised from 8.5, credit line from 9) |
| Visual | brand review (`joydigi-design` agent) | **on brand with fixes**: credit line moved to the Soft Sand token at 10 units; demo page accent `#B8431F` (passes AA) and Deep Teal text; doc fixes for the mark and credit colour. Brand-standard changes are left for your approval (below). |
| Visual | cover | `export/ep14-cover.png` at 1.6 s (both hook lines, shock face, stamp) with a small series lockup, cover only |
| Content | QA gate (`qa.py`) | 29 checks, 0 fail, 1 warn (device test and settings unticked) |
| Content | Receipts links | all 5 source URLs return HTTP 200 (2026-10-01) |
| Content | stale docs | three leftover "lender tower" lines fixed |
| Characters | cast sheet | republished with the current rig (work look, softened eyes) |
| Sound | loudness, two-pass | voiced cut -13.9 LUFS, silent cut -14.7 LUFS (linear mode stops short of clipping), true peak at or below -1.4 dBTP |
| Sound | captions | `export/ep14-voice.srt` generated from the voice timings, for platforms that accept a caption file |
| Process | refactor safety | shared scene helpers moved into `02-engine/parts/scenes-common.js`; `verify.js` proved all 48 sampled frames pixel-identical |

## Blockers before the first post

| # | Blocker | Who | How |
|---|---|---|---|
| 1 | **Nothing is in git.** `video/` is untracked, so all of this exists only on one disk. | you approve, Claude does it | commit on a branch and open a PR |
| 2 | **Nobody has heard the audio.** The voice was picked by a blind model test. | you | watch `ep14-voice-share.mp4` once with sound |
| 3 | **Device test.** Our safe zone is an estimate. | you | private draft on TikTok, Reels and Shorts; screenshot with the app UI |
| 4 | **Accounts and handles.** Not created; the name's trademark and handle availability are not checked. | you | decide the handle, check the name, create business accounts |
| 5 | **Launch inventory.** Only 1 of the 4 launch episodes exists (16 Pay in 4, 2 Free Trials, 14, 21 Scam Radar). Posting 3 a week needs a buffer. | Claude | build 16, 2 and 21 next, each with claims first |

## Should do soon (not blocking the pilot)

- **Brand standard (needs your OK; it is a cross-project file):**
  - Add a show row: `| Trap or Treasure (video) | #1C2550 | #F4E6C8 | #F5B83D | #F5B83D | #1C2550 | Playful money-trap quest, sly never scary |`, together with a matching `THEMES` entry in `src/lib/email/brand.ts`.
  - Add a video note: in-scene art may use show display faces; the brand slate is always Fraunces 700 and DM Sans 500.
  - Change the mark's path to `public/email/joydigi-mark.png`. `public/logo.svg` is an unrelated paw-print logo.
- **Characters:** Rex face pass, port Pearl (`rig-pearl.js`), and build the Snares for each new episode, about a day each.
- **Content:** before scripting their episodes, check platform rules for betting (Ep 23) and crypto (Ep 19), and whether the FTC click-to-cancel (Ep 2) and CFPB overdraft (Ep 8) rules are in force.
- **Hook lab:** if a non-A hook ships, give it its own voice lines (the voice must echo what is on screen).
- **Policy:** re-read YouTube's AI-persona monetization rule before turning on monetization; label the AI voice where a platform offers the toggle.
- **Site (optional):** a Trap or Treasure page on thejoydigi.com next to the podcasts, once episodes are live.

## Launch gate (all must be yes)

- [ ] Work committed and merged
- [ ] You have watched and listened to the pilot
- [ ] Device test passed on all three platforms
- [ ] Handle chosen, name checked, business accounts created, YouTube set to "not made for kids"
- [ ] Four episodes rendered, QA-passed and packaged (16, 2, 14, 21)
- [ ] Posting calendar with dates (3 a week)
- [ ] Results sheet ready (skip or swiped-away rate, completion, sends per reach, saves, comments naming a trap)
