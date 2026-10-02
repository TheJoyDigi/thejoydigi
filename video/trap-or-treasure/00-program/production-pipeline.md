# Production pipeline: from evidence to posted to learned

```
0 PICK -> 1 BRIEF -> 2 CLAIMS -> 3 SCRIPT -> 4 HOOK LAB -> 5 STORYBOARD -> 6 BUILD -> 7 QA GATE -> 8 RENDER -> 9 PACKAGE -> 10 DEVICE TEST -> 11 POST -> 12 LEARN
```

Claims come **before** the script. A number that cannot be sourced never reaches the storyboard.

| # | Step | Output | Done when | Tool or file |
|---|---|---|---|---|
| 0 | **Pick** | the trap and its slot | chosen from `episode-map.md` using `evidence.md` and the content calendar in `growth-plan.md` | |
| 1 | **Brief** | `brief.md` | trap, Snare, hook, X-ray, treasure, quest all named | `_template/brief.md` |
| 2 | **Claims** | `claims.md` and, for any math, `calc.py` | every claim has an exact URL and a verdict; every on-screen number reproduces from `calc.py` | `podcast/shared/CLAIMS_TEMPLATE.md` |
| 3 | **Script** | `script.md` | each beat has one picture and under 8 words; the mute test is written down | `_template/script.md` |
| 4 | **Hook lab** | three hooks (A face, B Snare, C text) | all three play; one is the default | `scenes.js` hook functions |
| 5 | **Storyboard** | `storyboard.md` | each second of the 30 is accounted for, and the layout fits the safe box | |
| 6 | **Build** | `scenes.js` | `python3 02-engine/build.py <ep>` builds; plays start to end; scrubbing works | `02-engine/` |
| 7 | **QA gate** | a passing report | `python3 02-engine/qa/qa.py <ep>` has 0 fails, and a human has ticked the mute and freeze-frame tests | `02-engine/qa/qa.py` |
| 8b | **Voice** (optional) | `export/<slug>-voice.mp4` | `voice.json` lines fit their beats, no overlaps, music ducked, about -14 LUFS; the silent cut is kept | `python3 02-engine/voice/voice.py build <ep>` |
| 8 | **Render** | `export/<slug>.mp4`, `-share.mp4`, `-cover.png` | 1080x1920, 30 fps, H.264, loudness near -14 LUFS | `node 02-engine/render/render.js <ep>` |
| 9 | **Package** | `package.md` | caption, pinned comments, receipts, alt text, audience setting, cover | `_template/package.md` |
| 10 | **Device test** | screenshots of a private draft on each platform | nothing important is hidden by the app UI | `platform-guide.md` |
| 11 | **Post** | the live post | the checklist in `content-rules.md` is clean | |
| 12 | **Learn** | numbers in `episode-map.md` | after 48 hours and after 7 days; decisions logged | `growth-plan.md` |

## Tools

```
python3 02-engine/build.py <ep>                     build dist/<slug>.html (and a publishable fragment)
node    02-engine/render/sheet.js <ep> [--safe]     contact sheet; --safe overlays the app UI zones
node    02-engine/render/sheet.js <ep> --balance    share of visual detail in the top, middle and bottom thirds (bottom at least 18%)
node    02-engine/render/render.js <ep>             deterministic MP4: every frame, offline audio, two-pass loudness, cover image with series lockup
node    02-engine/render/verify.js <ep> --save f / --check f   frame fingerprints: prove a refactor changed nothing
python3 02-engine/voice/voice.py audition <ep>        sample the same line in several voices
python3 02-engine/voice/voice.py build <ep>            generate, fit and mix the voice onto the render
python3 02-engine/qa/qa.py <ep>                     the QA gate
```

- **Rendering is deterministic.** Every frame is `draw(t)` at 1080x1920 and the soundtrack is rendered offline with seeded noise, so the same source gives the same file. No screen recording.
- Contact sheets are the main visual QA. Look at 12 to 15 frames and at the `--safe` version, always.
- The Playwright browser tool is shared in this workspace; the render and sheet tools launch their own headless browser so they never fight with it.

## Hook lab (step 4)
Write three openings. Build all three. Pick a default with the contact sheet and the mute test. The other two are kept and rotated across episodes so we learn which kind works (`growth-plan.md`). Switch in the demo page with the Hook lab buttons, or `?hook=B` for local builds.

## Package (step 9)
`package.md` holds everything that is not the video:
- Caption: the hook in plain words, the trap's plain name for search, no hashtag stuffing.
- **Pinned comment 1, Receipts:** the sources from `claims.md`, plus any correction.
- **Pinned comment 2, an open question** ("Which trap got you?"). Never "comment X", "share this" or "reply done".
- Alt text and the burned-in caption file.
- Audience settings (YouTube: not made for kids) and the AI-disclosure answer (no AI-generated media).
- The chosen cover frame.

## Roles
- **You:** choose the topics and tone, approve the claims and the cut, do the device test on your own phone, post, and report the numbers.
- **Claude (director):** briefs, claims research, scripts, storyboards, building, QA, rendering, packaging, and reading the numbers back to you.

## Rhythm per world
1. Brief, claim and script all 4 episodes in one sitting.
2. Build the new Snares and infographic pieces the world needs.
3. Build, QA and render the 4 episodes.
4. Post them over about 1.5 weeks while the next world starts.
5. Review the numbers before starting the next world.

## Definition of done for the season
24 episodes plus bonus shorts posted, engine documented, results reviewed against our own baseline, season 2 chosen from comments and the numbers.
