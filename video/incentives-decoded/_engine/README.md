# Incentives, Decoded shorts engine

9:16 TikTok / Reels / Shorts clips, one per chapter. Each short is a real excerpt of the episode audio (Alex and Jordan, Lola's mix with its music bed) with animated word-by-word captions, a sticker-zine stage that illustrates what is being said, generated sound effects, and an end card. The look matches the show page: electric violet, acid lime, ink outlines, hard shadows, Bricolage Grotesque + Space Mono.

```
video/incentives-decoded/
  _engine/
    core.js     canvas, palette, captions, host avatars, icons, stage primitives, HUD, end card
    index.html  page shell (fonts in fonts/)
    prep.py     whisper word timings per chapter (cache/chN.json) + clip cut (out/voice.wav, out/clip.js)
    mix.py      voice + SFX + end sting -> out/mix-raw.wav
    render.js   cut, stills, full render, checks, copy to ../exports/
  epNN-<slug>/  clip.json + scene.js + README.md (+ out/, git-ignored)
  exports/      finished MP4s and covers (git-ignored)
```

## Commands (run from `video/incentives-decoded/`)
| Command | Does |
|---|---|
| `~/.venvs/whisper/bin/python _engine/prep.py --list N` | Chapter N's turns (T0, T1, …) with start/end seconds and the music gaps. Pick your segments from this. |
| `node _engine/render.js epNN-slug --sheet 0,3,6,9 [--safe]` | Cuts the clip, writes stills + `out/sheet.png` (times in clip seconds). `--safe` tints platform-UI areas red. |
| `node _engine/render.js epNN-slug` | Full render (about 1–2 min): `out/<slug>.mp4`, `out/mp4sheet.png` (30 frames), `out/cover.png`, loudness check, copy to `exports/`. |

Per-word times for a chapter live in `_engine/cache/chN.json` (`words[].w/s/e/sp/turn`), if you need exact times for a mid-turn cut.

## clip.json
```json
{ "chapter": 7, "segments": [ { "turns": [0, 3] }, { "start": 141.2, "end": 152.9 } ] }
```
- A segment is either whole turns (`"turns": [first, last]`, inclusive) or a time range (it keeps every word fully inside it). Pads and fades are added for you.
- **1 or 2 segments.** Two segments are joined by an automatic ink/lime swipe + whoosh.
- **Voice length 28–45 s** (prep prints it). The end card adds 3.8 s.

### Picking the clip (this decides whether people watch)
1. **Segment 1 is almost always the cold open**: the turns before the first `~ N s without speech (music) ~` line. It was written as a hook. Use it whole unless it is over ~32 s.
2. **Optional segment 2: the payoff.** The chapter's core idea, best line, or "the move", 6–16 s, that lands as a strong ending (a punchline, a reframe, or a question). It must make sense on its own: no dangling "this", "he", "that story" without context. If the speaker quotes someone, show who on screen (see ep01's Charlie Munger chip).
3. The clip must **end on a strong line**, never mid-thought.

## scene.js
```js
const HOOK = "Why you can't stop scrolling";     // headline box, on screen from frame 0 (it is the thumbnail)
const EMPH = ['incentive', 'payoff'];              // caption words drawn in lime with a little pop
icon('phone', T('phone'), T('be honest'), { s: 1.2, enter: 'drop' });
versus(T('willpower'), T('once you learn'), 'Willpower problem', 'Incentive problem', { winner: 'b', tWin: T('incentive problem') });
```
**Time everything from the words**: `T('word')` = start of the first clip word matching it (case and punctuation ignored), `T('word', 2)` = second occurrence, `T('two word phrase')` = a phrase, `TE(...)` = end time. A word that isn't in the clip throws, so the render fails loudly instead of drifting. `VOICE_END` = when the voice stops (end card starts).

### What the engine already does (don't redo it)
- **HUD**: LEVEL chip, show chip, XP progress bar (top). **Hook** box under it. **Captions** (y 700–980): word-by-word pop, active-word highlight, speaker tag (Alex pink, Jordan cyan), 2 lines max, chunked on sentences and speaker changes.
- **Host avatars**: when nothing is on the stage, Alex and Jordan stickers fill it and the speaker pulses to the voice. They are a fallback, not a beat.
- **Sound**: every primitive below adds its own SFX (pop, thud, impact, ticks, chime…). Joins get a whoosh, the end card gets a whoosh + boom + sting. `bg()` adds a whoosh.
- **End card**: "INCENTIVES, DECODED" / chapter title / "FULL N-MIN EPISODE · FREE" / "link in bio" / level coin / "PRODUCED BY THE JOY DIGI".

### Stage primitives (stage = y 1010–1540, centre x 450)
| Call | Use it for |
|---|---|
| `icon(name, t0, t1, {x, y, s, rot, enter:'pop'\|'drop', spin, sfx})` | A sticker object. Names: `phone coin clock bell heart eye trophy crown lock chartUp chartDown megaphone target house briefcase people gift die pawn star cursor check cross question warning lightning fire snake fish scale magnet hourglass key thought arrow medal handshake` |
| `slam(text, t0, t1, {y, bg, color, size, rot, shake})` | 1–3 punchy words slammed on with a shake + impact. The payoff moment. |
| `decode(text, t0, t1, {y, size, bg, dur})` | Scrambled letters resolving into the word (the show's signature). Key concept names. |
| `versus(t0, t1, a, b, {y, winner:'a'\|'b', tWin, ca, cb})` | Any contrast: stated vs revealed, zero-sum vs positive-sum. Winner gets a check, loser greys out. |
| `list(t1, [[text, t], …], {y, gap})` | 2–3 items said in a row; prefix `x:` for a cross instead of a check. |
| `bubble(t0, t1, text, {side:'left'\|'right', y})` | A quoted line or "what people say" vs "what they do". |
| `counter(t0, t1, from, to, {y, prefix, suffix, label, dur})` | Only for a number **said in the clip**. |
| `meter(t0, t1, label, from, to, {y})` | Something rising or draining (status, effort, trust). |
| `stamp(text, t0, t1, {x, y, color, rot})` | A verdict over an object: NOPE, PAID, IGNORED. |
| `arrowFx(t0, t1, x1, y1, x2, y2, {color})` | Cause → effect between two stickers. |
| `burstFx(t, x, y)` | Confetti + chime. Once, at the climax. |
| `bg(t, color, {x, y})` | Circle-wipe the background (`C.violet C.ink C.pink C.cyan C.lime C.orange`). On light backgrounds the captions flip to ink automatically. |
| `shake(t, amp)`, `cue(t, type, opts)` | Extra hit / extra sound (`whoosh pop tick thud impact boom chime{n} blip{n} knock swish riser{d}`). |
| `custom(t0, t1, (t, p, pout) => {...})` | Anything else, drawn with `ctx` + helpers (`pill`, `chip`, `stext`, `ICONS.x()`, `shape`, `fit`, `wrap`). `p` is the overshooting entrance (0→1). |

## Rules (every episode)
- **Hook**: 3–7 words, sentence case, true to what the clip says, makes a scroller stop (a relatable question, a surprising claim the clip backs up, a "you" statement). No emojis, hashtags, all caps, or clickbait the clip doesn't pay off.
- **Something purposeful on the stage ~75% of the time**; a new beat every 2–4 s; host avatars only fill short gaps (≤ 4 s). One visual idea per beat, and it must match the words being said at that moment.
- **Rhythm**: 2–4 `bg()` changes per clip, one big payoff moment (`slam` or `decode` + `shake`, and `burstFx` once). Don't stack more than 3 stage elements at once.
- **Words on the stage**: short (a slam is ≤ 4 words). Never repeat the caption line verbatim on the stage; label or contrast it instead. Text stays in x 130–770 (the helpers already fit to the stage).
- **Facts**: every word on screen must be said in the clip or be a direct label of it. No new numbers, names, brands or claims. Keep the script's own hedges ("the story goes").
- **Brand**: no logos of real companies, no money imagery beyond the show's `coin` (+1 point token), no emojis.
- **Look before you render**: do 2–3 `--sheet` passes covering every beat (mid-animation frames too), open `out/sheet.png`, fix overlaps, then full render and open `out/mp4sheet.png`.

## Episode README.md
Hook · segments (with the words they cover) · voice length / total · beats table (time → what's on stage → said line) · anything a reviewer should check.
