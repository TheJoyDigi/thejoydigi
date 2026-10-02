# Art guideline — Worth It (anime × infographic × game)

> **Owner: Claude agent (art direction), by Long's call on 2026-10-02.** This
> replaces the earlier paper-editorial guideline entirely; nothing is
> inherited from it. **Approved by Long on 2026-10-02 (Format Lab v7).** Live
> reference: the Format Lab artifact (`03-assets/format-lab/`, built with
> `python3 build.py`).

**Format:** a 30-second vertical short that mixes four styles and switches
every 3 to 5 seconds, so attention never settles.

| Style | Job | Examples |
|---|---|---|
| **Anime acting** | Emotion and the hook | Wren reacts, shock, think, resolve, joy |
| **Infographic** | The explanation | Flow diagrams, the trade-places swap, stat bars |
| **Game HUD** | Stakes and reward | Boss HP bar, XP bar, quest card, LEVEL UP |
| **Kinetic type** | The punchline | PROBLEM SOLVED. VALUE PAID. |

Rule: never hold one mode longer than about 5 seconds. Show it, then say it.
Must work on mute.

## Canvas and layout (hard rules)
- 9:16. Design in 360x640 units; master 1080x1920, 30 fps.
- **Safe box:** y 90 to 520; x 40–320 above y 280, x 40–260 below. Wide panels
  go above y 280; below it, keep everything within x 40–260. Below 520 is
  decoration only. 520 is an estimate (strict ad-spec limit is 416); the phone
  test decides.
- **Balance:** three bands. Upper (y 150–280): the boss panel, scan or diagram.
  Middle (y 280–400): readouts and dialogue. Lower (y 400–520): Wren, large.
  Leave y 112–150 as breathing room under the HUD. Verify with `sheet.js --safe` and a real phone.
- **Freeze-frame test:** pause anywhere, one focal point.
- **One idea per beat**, about 8 words on screen at once.
- Frame 0 shows the hook (it becomes the cover): boss panel plus Wren's face.

## The lead
**Wren** (working name), early 20s. The viewer's stand-in: curious, capable,
never the butt of the joke. Never speaks; the narrator talks and Wren reacts.
Ink-navy hair with a cyan streak, gold-trimmed teal jacket, gaming headset,
gold pendant that glows when value shows up. Rig: `02-engine/parts/lead.js`
(7 poses, 6 faces, blink, breath, rim light). Cast sheet: `03-assets/cast/`.
Rule: the myth gets struck, never Wren or the viewer.

## Density rules (added after review, 2026-10-02)
- **Three things per frame, max:** the main information, Wren, and one accent
  effect. Everything else waits for its own beat.
- **One idea per card.** Infographics reveal one step at a time (stepper), never
  three stacked cards. Max three rows, icon first, type at least 17 units.
- **Wren is a supporting presence:** about 75% of her first size (scale 0.75 to
  1.1 depending on the beat, belt at y 520). The infographic is the hero in the
  explain beats; Wren is the hero only on the myth hit.
- **One SFX word or damage pop per beat.** No duplicates of the same message.

## Palette (arcade, dark)
| Role | Hex | Use |
|---|---|---|
| Void navy | `#0A0F2C` | the world behind everything |
| Panel | `#10163F` | HUD panels, dialogue, cards |
| Interface cyan | `#2FE3D0` | HUD, scans, neutral UI, infographic flow |
| Value gold | `#FFC83D` | value found: stats, XP, rewards, level-up |
| Myth red | `#FF4D5E` | the myth only. Struck, then gone |
| Path green | `#4DFFA0` | the flip and the move: the way forward |
| Depth violet | `#7B5CFF` | glow, shade, burst lines |
| Signal white | `#F4F7FF` | primary text |

Semantics are fixed: red is only the myth, gold only value, green only the
way forward, cyan is interface. Never swap them.

## Type (three families)
| Role | Face | Use |
|---|---|---|
| Statement and impact | Russo One | myth, headlines, LEVEL UP, big type |
| HUD, labels, dialogue | Rajdhani 600/700 | HUD, stat rows, typed dialogue |
| Sound effects | Bangers | CRIT!, DING!, LV UP! on a starburst |

The Joy Digi end slate stays in the umbrella brand type (Fraunces, DM Sans)
because it is the company credit (`docs/brand/design-standard.md`).

## Toolkit (built in `02-engine/parts/`)
| Piece | File | Notes |
|---|---|---|
| Boss alert + HP bar (the myth) | `game.js` `gBoss` | one critical hit breaks it |
| Hit frame | `game.js` `gImpact` | flash, burst, rings, slash; myth strike only |
| Identify scan (the lens) | `game.js` `gScan`, `gStats` | reticle, beam, stat bars, VALUE FOUND |
| Level gate + dialogue (the flip) | `game.js` `gGate`, `gDialog` | typed question, gate turns green |
| Quest card + level-up (the move) | `game.js` `gQuest`, `gLevelUp`, `gWorthPlate` | one action, then LEVEL UP |
| HUD, damage pops, SFX words | `game.js` `gHud`, `gDamage`, `gSfx` | XP bar fills across the episode |
| Flow diagram, swap, icons, whip | `info.js` `iNode`, `iArrowDown`, `iSwap`, `gWhip` | max three nodes |
| Anime FX | `anime.js` | focus lines, emote marks, sparkle, camera push |

## Motion rules
1. High energy but legible: punchy on myth and flip, calmer on reframe and move.
2. Order inside a beat: reaction, device, text.
3. Hits get shake, flash and an SFX word. Nothing else shakes.
4. One emote or SFX per beat. Never stacked.
5. Hold the Quest card still for a full beat before LEVEL UP.
6. Scanlines and a subtle vignette on everything, shared across episodes.

## What NOT to do
- No money-hype: no "$$$", rockets, luxury flexing.
- Never punch down: the myth is struck, never Wren or the viewer.
- Red only on the myth. Never on a person.
- Do not hold one visual mode flat for more than about 5 seconds.
- No fan-service framing, no photoreal faces, no real people's likeness.
- No kid-targeting cues in titles, tags or covers (`platform-guide.md`).

## For Claude agent (build notes)
- Parts order in `02-engine/build.py`: core, worth, lead, anime, game, info.
  `worth.js` still holds the paper-era devices used by built Eps 1, 3, 5
  (to be rebuilt in this style) and the brand slate.
- Next: rebuild Eps 1, 3, 5 in this style, add painted backgrounds, a hand
  pose set, and a real "cross the gate" move for Wren.

## Constant motion (added 2026-10-02)
Something is always moving, so the eye never rests.
- **Moving world** (`game.js` `gWorld`): two parallax skyline layers, a perspective
  grid floor racing toward the viewer, and light streaks. Low contrast so panels
  stay readable. Speed follows the story (`WSPEED` keyframes in the demo): it
  freezes for 80 ms on the hit, surges on every slam, flip and level-up, and slows
  to a crawl (never zero) for the tension beat. Wren bobs in step with it.
- **Punch motion:** hit-stop, zoom-punch with damped shake and roll
  (`gPunchBegin`), colour-split ghosting (`gGhost`), flashes (`gFlash`), particle
  bursts (`gBurst`), squash and stretch on Wren (`gSquash`), overshoot on cards.
  Only on hits and slams: quick attack, fast decay.

## Voice and sound (added 2026-10-02)
- **Narrator:** one voice, Gemini TTS, lines echo the on-screen words and never
  add facts. Candidates built: Leda (youthful, warm), Puck (upbeat), Charon
  (calm). Script, timing anchors and delivery notes live in
  `03-assets/format-lab/voice.json`; `voice_build.py <Voice>` renders it.
- **The picture follows the voice.** Beat boundaries are set by where the
  narrator's lines fall (no speed-up needed), not the other way round.
- **Soundtrack:** synthesized in `03-assets/format-lab/sound.js` with the
  engine's `music.js` synth. A pad chord per beat (tense, bright, open,
  resolved), a soft 128 bpm kick and hat on the explain beats, and effects on
  every visual cue (alert blips and a heavy hit on the myth, scan beeps, plucks
  per step, typing ticks, level-up arpeggio, stamp thump).
- **Background sound:** a continuous ambience (drone, breathing air, sparse HUD
  chatter) plus a 128 bpm groove (kick, clap, hats, bass, arps) that changes per
  beat: dark and sparse on the myth, full on the explain beats, stripped for the
  tension beat, resolved on the move.
- **Punchy effects:** hits layer kick, sub-boom, noise burst and crash; risers and
  snare rolls lead into every slam, flip and level-up.
- **Mix:** two buses. The bed (ambience, pads, bass, arps) ducks about 6 dB under the
  narrator; effects and drums never duck. The bed sits about 13 dB under the voice
  while it speaks and swells in the gaps. Limiter on the master. Silent cut always kept.
