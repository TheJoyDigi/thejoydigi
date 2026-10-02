# Episode template

From Ep 2 on, an episode is a config, not new code. The picture follows the narration.

```
<ep>/voice.json  --voice_ep.py-->  <ep>/export/voice/plan.json + narration.mp3   (Gemini TTS, cached)
<ep>/episode.js  --build_ep.py-->  <ep>/dist/<slug>.html                          (preview with sound; ?hq=1 for render)
                 --render_ep.js-> <ep>/export/<slug>-<voice>.mp4, -share.mp4, -silent.mp4, -cover.png, .srt
python3 02-engine/qa/qa.py <ep>   (reads <ep>/source.json)
```

`episode.js` defines `EP = {num, lead:'wren'|'kai', title, slug, shots:[...]}`. Shot times can reference
narration lines: `'r1'` (start), `'r1.end'`, `'r1+0.4'`. Shot types, drawn by `parts/director.js`:

| Type | Fields |
|---|---|
| `boss` | `hit`, `lines` (the myth, 2–3 lines) |
| `compare` | `cards` (two: item, title, rows), `win`, `cardAt`, `winAt`, `moveAt`, `bannerAt`, `banner`, `poses` |
| `punch` | `lines` (2), `slam2At`, optional `x0,y0,size0,x1,y1,size1` |
| `lockon` | `item`, `moveAt`, `lockAt`, `typeAt`, `question`, `label`, `lockedLabel`, `poses` |
| `quest` | `lines` (3), `levelAt`, `plateAt` |
| `outro` | `dur` |

Camera punches, squash pops, the moving world's speed and the whole soundtrack are derived from the shots,
so a new episode needs no sound or motion code. Ep 1 is still the hand-built Format Lab demo; `stepper`,
`scan`, `swap` and `gate` shots are to be ported from it when an episode needs them.
