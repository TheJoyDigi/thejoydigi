# Value, Created video engine

Shared engine for the square LinkedIn videos, one per audiobook chapter. Each chapter folder holds only what is unique to it.

```
video/value-created/
  _engine/
    core.js      canvas, palette, easing, text and effect helpers, camera, swipes, kicker, progress bar, draw(), boot()
    index.html   page shell: fonts from src/assets/fonts, loads core.js then ../<chapter>/scene.js
    render.js    stills, contact sheets, full MP4 render and checks
    music.py     100 bpm bed and sound effects, generated from the cue list
  chNN-<slug>/
    scene.js     the chapter: config, scenes, sound cues
    README.md    specs, beats table, copy notes, re-render steps
    value-created-chN-<slug>.mp4, thumbnail.png, .gitignore (out/)
```

## Commands (run from `video/value-created/`)
| Command | Does |
|---|---|
| `node _engine/render.js chNN-slug --warp` | Prints the design-time to real-time table and the real duration |
| `node _engine/render.js chNN-slug --sheet 2,6,11 [--design]` | Writes stills and a tiled `out/sheet.png` (times in real seconds, or design seconds with `--design`) |
| `node _engine/render.js chNN-slug` | Full render to `out/value-created-chN-slug.mp4`, then prints format and loudness and writes `out/mp4sheet.png` (32 frames) |

Rendering takes about 30 s. It needs ffmpeg, numpy and Playwright, all found the same way as the Worth It engine.

## What `scene.js` must define
| Global | Meaning |
|---|---|
| `CHAPTER`, `KICKER_END`, `BAR_END` | Chapter number. Design times at which the top-left kicker fades and the progress bar stops (just before the end card). |
| `WARP` | `[design, real]` pairs. Write scenes at a relaxed pace (about 52 s design) and map them to about 0.7× (36 to 40 s real); the end card keeps about 5 s real. |
| `SWIPES` | Design times of the 3 ink swipes that hide the biggest cuts |
| `KB` | `[start, end]` slow camera-push segments; put boundaries at swipe centres |
| `IMPACTS` | `[time, amplitude]` screen shakes (3 to 16) |
| `MARKERS` | `{ groove, breakdown, drop, end }` for the music: groove at the first swipe, a riser from breakdown to drop, drop on the biggest reveal, end just before the end card |
| `SCENES`, `END_CARD` | Scene functions `f(t)` drawn under the camera, and the end-card function drawn after the swipes |

Add sound with `cue(t, type, opts)`. The types are `whoosh{v}`, `pop{f}`, `tick{f:0|1|2}`, `thud`, `impact{v}`, `boom{v}`, `chime{n}`, `blip{n}`, `knock{v}`, `scratch`, `swish`, `drain{d}` and `riser{d}`; `n` is a MIDI note. Every swipe gets a `whoosh` at swipe −0.3, and the drop gets `boom` + `chime` + a big `IMPACTS` entry.

## Helpers in core.js
- **Text:** `line(t, str, x, y, {size, font:'sans', start, end, stagger, align:'left', color})` pops words in, and `[bracketed]` words turn gold. `label(str, x, y, alpha, color, size, align)` draws tracked capitals. `fit(str, maxW, size, kind, weight)` returns the largest size that fits.
- **Effects:** `burst()` throws sparks, `ring()` draws a shockwave, `rr()` is a rounded rect.
- **Easing:** `prog`, `eo`, `eio`, `eback` (overshoot), `env`, `lerp`, `rnd` (seeded).
- **Palette:** `C`.

## Rules every chapter follows
- **The video teaches.** The chapter's one idea must land with the sound off; it is not a trailer.
- **Look:** paper cream, ink and gold. Simple line-art objects are fine; no mascots or cartoon characters.
- **Words:** about 80 on screen before the end card, one idea per beat. No hashtags, emojis or hard sell. Never "written by Long La", never Blue Sock.
- **Facts:** every fact comes from `public/podcasts/value-created/transcripts/N.md`. An invented example number gets a small "Illustrative" label.
- **No money imagery:** no $ signs, coins, price tags or financial charts (brand standard). Chapter 4 is the one approved exception, because its examples are prices.
- **End card:** "Value, Created —" / gold "Chapter N: Title" (use `fit()` to stay at or under 900 px) / "Full M-minute episode — link in comments" / "A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI". M is the feed's `itunes:duration` rounded up to the next minute.
- **Layout:** keep 72 px side margins. Body text sits between y 200 and 900. Nothing overlaps.

## Lessons from Chapters 4, 5 and 7
- **`line()` calls don't know about each other.** Two calls on the same row overlap unless their `end` times differ. To land one word on a hit, split it into a second row that starts on the hit.
- **Retiming means moving several things together.** When a beat moves, update `WARP`, the timeline constants, `IMPACTS`, the cues and `MARKERS` together; keep each scene's times in named constants so they move as one. Check with `--warp` and `--sheet --design`.
- **Generated cues add up fast.** Keep repeating ticks to about 30 and the total to about 110 cues.
- **Look at sheets, not just numbers.** Do two or three still passes covering every beat, including mid-animation frames, before the full render, and then look at `out/mp4sheet.png`.
