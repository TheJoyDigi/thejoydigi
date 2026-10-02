# Export

Final files are rendered into each episode's own `export/` folder (git-ignored): `<slug>.mp4` (master, 1080x1920, about 19 MB), `<slug>-share.mp4` (720p, under 15 MB), `<slug>-cover.png`. Command: `node 02-engine/render/render.js <ep>`.

This folder is kept for hand-copied finals. Keep every file under 50 MB and never commit renders.
