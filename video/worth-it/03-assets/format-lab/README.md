# Format Lab

The interactive reference for the Worth It format (anime x infographic x game HUD),
and the current source of the **Ep 1 anime demo** (The Five-Dollar Coffee).
Published as a private artifact: https://claude.ai/artifact/6UdXTP48vgg9MYWSiNgs14 (v7).

| File | What it is |
|---|---|
| `demo.js` | The Ep 1 timeline, beats, cues and `drawDemo(t)` (pure function of time) |
| `sound.js` | Soundtrack: ambience + groove (bed bus) and hits/risers/UI sounds (fx bus), keyed to the timeline |
| `voice.json` | Narrator lines, timing anchors, delivery notes, candidate voices |
| `voice_build.py` | Renders the narrator with Gemini TTS (`python3 voice_build.py Leda Puck Charon`). Key comes from your shell env, never printed |
| `wrapper.js` | Exposes the engine to the page as `window.WL`, defines the toolkit cards |
| `lab.html` | The page: player, style mix, beat breakdown, voice picker, toolkit, look, decisions, feedback |
| `build.py` | `python3 build.py` inlines engine parts + demo + sound + voices into `dist/format-lab.html` |

## Rebuild
```
python3 voice_build.py Leda Puck Charon   # only if export/ is empty (costs about 12 TTS calls per voice)
python3 build.py                          # writes dist/format-lab.html (git-ignored)
```
`export/` (narration mp3s, TTS cache) and `dist/` are git-ignored, so the generated audio
stays local. Publish `dist/format-lab.html` with `capabilities: {db: {}}` so feedback is saved.

## Status (2026-10-02)
- Format approved by Long as of Format Lab v7 (arcade world, Wren, infographic stepper and swap, boss hit, quest and level-up, arcade outro).
- Narrator voice not picked yet: Leda, Puck and Charon are built for comparison.
- **Ep 1 is not yet in the render pipeline.** To ship it: port `drawDemo` and `sound.js` into
  `01-episodes/ep01-.../scenes.js` for `render.js` (MP4), mix the narrator with `voice.py`, run QA,
  package. Built Eps 1, 3 and 5 in `01-episodes/` are still in the earlier paper style.
