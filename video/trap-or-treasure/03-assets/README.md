# Assets

- `cast/`: the cast sheet page (Mei before and after, the lineup, the Snare in four moods, the Trap Files binder). Build: `python3 02-engine/build.py 03-assets/cast`. View: `node 02-engine/render/sheet.js 03-assets/cast --times 3,12,21,31 --cols 4 --w 300`.

Planned:
- pose sheets for Rex, Pearl and each new Snare as they are built
- `palette.md` (copy of the palette from `00-program/visual-style.md` once final)
- `sfx-notes.md` (the recipe for each generated sound; the synth lives in `02-engine/parts/music.js`)
