# EP01 The Five-Dollar Coffee

Final cut in the anime x infographic x game format. Lead: Wren. Narrator: Leda.

| File | What |
|---|---|
| `script.md`, `script.txt` | final narration, beats, changes for Lola, sign-off checklist |
| `claims.md` | no numbers asserted |
| `package.md` | title, caption, pinned comments, alt text, settings, device test |
| `source.json` | where the real source lives and how to rebuild (used by `qa.py`) |
| `export/` | the MP4s, captions and cover (git-ignored) |

The scene source is `03-assets/format-lab/demo.js` (plus `game.js` and `info.js`); the older paper-style
`scenes.js`, `page.json` and `dist/` in this folder are superseded and kept only for history.
Check: `python3 02-engine/qa/qa.py 01-episodes/ep01-the-five-dollar-coffee`.

## For Lola: what to check
1. Watch `export/ep01-five-dollar-coffee-anime-leda.mp4` with sound, then once on mute.
2. Read `script.md`: the narration, the "Changes from the earlier approved script", and tick the sign-off boxes you agree with.
3. Read `package.md`: caption, pinned comments, alt text. Say what to change.
4. Production has run the automated gate (`qa.py`: 0 fail). The human items are yours (sign-off) and Long's (device test on each platform).
