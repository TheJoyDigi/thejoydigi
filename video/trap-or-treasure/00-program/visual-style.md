# Visual style

## Two looks, one show

| Look | Used for | Reference film |
|---|---|---|
| **Quest look** (modern anime, saturated pastels, RPG UI) | Mei's story, problems, emotions | Mei Reel |
| **Pearl's Corner** (mid-century print, grain, cream and teal) | definitions, myth-busters, the "rule" moment | Popcorn Time |

Cutting between them is a feature: story in Quest look, lesson in Pearl look.

## Style toolbox: combine styles, one job each

Use whichever style explains the beat best. A video uses **one style per beat, at most 4 in total**, and cuts between them on an action (on the beat).

| Style | Best for | Beat |
|---|---|---|
| **Kinetic type** (big words, numbers slamming in) | the hook, the one number, the rule | Hook |
| **Anime character** (limited animation, Mei, Rex, Nickel) | emotion, the relatable moment | Step in, Treasure |
| **Fake phone / app screen** (fictional app, taps, swipes) | traps that live on a screen: checkout offers, subscriptions, betting apps | Step in |
| **Pearl print + draw-on diagram** (hand-drawn lines wipe in) | how the trap works, who profits | X-ray |
| **Flat motion graphics** (arrows, counters, jars, bars, donuts) | money flow, the number, before vs after | X-ray |
| **Game UI** (HP and XP bars, level-up, stats screen) | scores, progress, the escape feeling | Treasure |

**Keep it one show:** shared palette, the same navy outline weight, one grain overlay on everything, and the semantic colors (red cost, green good) in every style.

## Trap and treasure grade (applies on top of any style)

| Act | Look |
|---|---|
| **Trap** (Step in) | red tint, tight vignette, slow push-in, tense music, a red "TRAP 07" stamp |
| **X-ray** | Pearl cream and teal, flat and calm, the reveal |
| **Treasure** | colors open to green and gold, light rays, level-up chime, Nickel sparkles |

## Clarity rules (super easy to understand)
1. **Freeze-frame test:** pause on any frame. There is one focal point, and the eye knows where to go.
2. **One new thing per beat.** Never show a new idea and a new style at the same time.
3. **Max about 7 words on screen at once.** Big, high contrast, never over a face.
4. **Show it before you say it.** The picture appears first, then the words confirm it.
5. **The number always counts up** and is the largest thing on screen when it appears.
6. **Follow-the-money arrow** is always the same shape and color so viewers learn to spot it.

## Palette

| Role | Hex | Use |
|---|---|---|
| Coin gold | `#f5b83d` | money, Nickel, highlights |
| Growth green | `#4cd68a` | good, saving, growth |
| Cost red | `#ff5d6c` | spending, debt, danger |
| Safe blue | `#4cc9f0` | savings, shields, safety |
| Credit purple | `#9b7bff` | credit score, bureaus |
| Ink navy | `#1c2550` | outlines, text strokes |
| Mei yellow | `#f3c969` | Mei's cardigan, series anchor |
| Pearl cream / teal / rust | `#f4e6c8` / `#2f7f86` / `#d0583a` | Pearl's Corner |

**Semantic rule:** green always means growth or good, red always means cost or danger. Never swap them.

## Text styles
| Style | Font | Use |
|---|---|---|
| Hook / claim | Dela Gothic One, cream fill, navy outline, coral offset shadow | big statements, numbers |
| Mei's note | Caveat (handwriting) | her thoughts, the quest |
| Pearl's sign | Bowlby One + Pacifico | Pearl's Corner titles |
| Caption | Figtree 600 | small explanatory lines |

Text motion library (already built): per-letter spring pop-in, letters that drop and bounce on a wire, handwriting wipe with underline, giant slam with shockwave and shine, split-by-slash, number counter with rolling digits.

## Motion rules
1. Ease in and out. Anticipate. Hold the end.
2. Limited animation on threes for characters; background drifts smoothly.
3. **A number always counts up on screen** when a number matters.
4. One metaphor per video. Never mix two.
5. Frame 0 must already contain the hook text and motion (it becomes the cover).
6. **Safe box** for anything the viewer must read: y 90 to 470, x 40 to 320 above y 280, x 40 to 260 below (see Layout rules).
7. Leave 0.5 s of stillness before the quest so the action lands.

## Metaphor library (one per topic, reuse for consistency)

| Concept | Picture |
|---|---|
| Price | hours on a clock |
| Budget | three jars / pizza split |
| Saving | vault, jar filling, pipe diverting coins |
| Emergency fund | shield with an HP bar |
| Credit | a trust bridge built plank by plank |
| Credit score | RPG stats screen, level bar |
| Utilization | fuel or HP gauge |
| Interest on debt | snowball rolling downhill |
| Minimum payment trap | treadmill or quicksand |
| Inflation | shrink ray |
| Compound growth | seed to tree to orchard |
| Diversification | basket of many fruits, storm hits one tree |
| Employer match | coin-doubling machine with a cap |
| Scams | fishing line with bait, red-flag radar |
| Credit freeze | ice lock on the score bar |

## Infographic kit (to build once, reuse everywhere)
Snare (`gremlin()`), coin sack, Trap File card, trap stamp (numbered), follow-the-money arrow, fake phone screen with fictional app, treasure card, number counter with rolling digits, donut/pie with labeled slices, jar and tank fill, progress bar, HP/fuel gauge, stats screen with 5 bars, growing line chart, tree growth, snowball, calendar, shield, bridge, radar, quest card.
Each piece takes a few parameters and draws at any time `t` (pure function of time), so scrubbing and export work.

## Sound
- Sound adds feeling only; the message must work on mute (`series-bible.md`).
- Moods: tense (trap), curious (X-ray), hopeful and triumphant (treasure, level up), swing (Pearl's Corner).
- SFX: coin ding, level-up chime, error buzz, whoosh, pop.
- Music and effects are generated by deterministic code and rendered offline by `02-engine/render/render.js`. They are our own audio, so there is no licensing issue (`platform-guide.md`).
- **Sound effects** (clicks, taps, coin clinks, stamp thuds, the Snare's laugh, gulp and poof) sit on every on-screen action.

## Brand slate (end card)
The umbrella frame never changes; the show look lives inside it (`docs/brand/design-standard.md`).

| Element | Spec |
|---|---|
| Background | Deep Teal `#003B49` |
| Mark | coral four-point sparkle ✦ (`#FF6B6B`), drawn in code by `brandMark()` in `02-engine/parts/infographics.js`, mirroring `public/email/joydigi-mark.png`. (`public/logo.svg` is an unrelated paw-print logo, not the mark.) Coral ✦ is brand only; red means cost. |
| Wordmark | "The Joy Digi" in Fraunces, Soft Sand `#FDF6EC` |
| Credit line | "Trap or Treasure is a production of The Joy Digi" in DM Sans 500, 10 units, Soft Sand `#FDF6EC`. Never Ink Soft on teal (2.42:1); Ink Soft is for text on sand only. |
| Placement | inside the safe box (about y 430 to 470, x 40 to 260). The caption and username area covers everything lower. |

Trap or Treasure's own palette (coin gold, growth green, cost red, safe blue, credit purple, Mei yellow, **Snare violet** `#C04FD0`) is the **show sub-brand**. It sits inside the frame and never replaces it. Possible follow-up: add a Trap or Treasure row to the show table in the design standard.

## Layout rules (hard)
- 9:16, 360x640 design units. **Platform UI covers the top 14%, the bottom 35%, and a button column on the right** (`platform-guide.md`, `02-engine/render/safezone.json`).
- **Safe box (working limit):** y 90 to 470. Above y 280 use x 40 to 320. From y 280 to 470 use x 40 to 260. Faces, numbers, headlines, disclaimers and the brand slate stay inside it. Below y 470 is floor, ground and decoration only. Backgrounds still bleed to the edges. (The strict advertising-spec limit is y 416; see `platform-guide.md` for why we use 470 and the risk.)
- **Compose in three bands, never in a stack.** Every beat puts something in each band so nothing piles up under the top tag: **A headline (y 96 to 220)**, **B hero (y 220 to 350)**: the face or the action, **C readout (y 350 to 470)**: the number, the label, the disclaimer. Then the **ground (y 470+)** is set dressing.
- Center lines: x 170 above y 280, x 150 below.
- **Ground = set dressing (decor only; the app UI may cover it):** floors with perspective, characters' legs and feet, the base of the stairs, a coin pile that grows with the savings, a Trap File dossier footer on the Pearl pages, the Trap Files collection strip on the quest card. Characters stand low and large so their bodies fill the lower area while their faces stay inside the safe box.
  - **Measure it:** `node 02-engine/render/sheet.js <ep> --balance` prints the share of visual detail (edge energy) in the top, middle and bottom thirds per frame. A message-in-the-top rule alone gave 47% / 46% / 7%. **Target: bottom third at least 18%, top no more than 42%.** Ep 14 measures 35% / 41% / 24% after the three-band recomposition (it was 47% / 46% / 7%).
- Minimum text: 14 units for anything meant to be read at a glance; 9.5 units only for disclaimers.
- Characters about a quarter of the safe box height or more. Text never over a character face.
- Check every episode with `node 02-engine/render/sheet.js <ep> --safe`: nothing important may sit in the red.

## The Snares (creature design language)
- Snare violet body `#C04FD0` (shade `#8E33A3`, belly `#F3C9F6`, inner ears `#FF9BB5`), navy outline weight 2.4, big pointed ears, a tail with an arrow tip, short arms, round feet.
- One prop per Snare that shows the mechanism (remote, sack, leaf, clock, magnifier).
- Four moods: smug (half-lidded, sly), gulp (happy squint, cheeks), scared (wide eyes, sweat drop), dizzy (X eyes).
- **Size = how much you still owe.** Draw the Snare at a scale tied to the balance. It shrinks as the debt shrinks and poofs at zero.
- Violet is only for Snares. Red still means cost and danger, green still means good.
- Sly, not scary. Never a real company's mascot, logo or colors.

## The Trap File card
- Cream card, navy 3 px border, red `TRAP N` pill, portrait window on a dark gradient, name in Dela Gothic One, then Move and Weakness lines. A green `SOLVED` stamp lands at the end of the episode.
- The binder is a 24-slot grid, one solved, the rest locked with a `?`.
- Built as `trapCard()` in `02-engine/parts/infographics.js`. Compact mode drops the Move and Weakness lines for the quest card.

## Cast sheet
`03-assets/cast/` is a live page: Mei before and after, the lineup, the Snare in four moods, the Trap Files binder. Rebuild with `python3 02-engine/build.py 03-assets/cast`.
