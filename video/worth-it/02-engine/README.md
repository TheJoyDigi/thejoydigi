# Engine: how videos get built

## What exists today
The engine renders deterministic vertical video: single HTML pages draw on a
canvas, play in the browser, and export to MP4. (The original reference films
and demo pages were removed; the engine below is what the show runs on.)

## Built-in features (all in the vertical films)
- `draw(t)` is a pure function of time, so scrubbing, export and record all work.
- Text: `kin` (spring letters), `drop` (letters bounce on wires), `hand` (handwriting wipe), `underline`, `slam` (shockwave and shine), `speedLines`, `swipe`.
- Cel shading from SVG path strings (`Path2D`), rigs driven by joint angles.
- Export: GIF (own encoder: shared 256-color palette, LZW, delta frames), MP4/WebM by recording the canvas in real time with a generated music track.
- Saving through the artifact `downloads` capability.

## Build system (built for Ep 14)

```
02-engine/
  parts/
    core.js          helpers, fonts, text effects            (lifted from reference/mei-reel.html)
    rig-mei.js       Mei and Rex rig, poses, faces           (extended: work look, rex look, shock face)
    infographics.js  the show's kit: Snare (gremlin), coin sack, Trap File card, stamp, phone UI, money arrow,
                     coin, wallet, treadmill, stairs, chest, HP bar, Nickel, brand mark
    scenes-common.js shared scene helpers: backgrounds, camera, hook text, Mei work look, lower third, ground set dressing,
                     Pearl and treasure backgrounds, silhouette, cover lockup
    music.js         seeded 128 bpm synth: kick, hat, clap, bass, pluck, tone, noise, sound effects
    transport.js     canvas, play, scrub, sound, window.TT (draw, scale, frameData, renderAudio, seek, setHook)
  shell.html         page shell (phone-first, themed), build.py
  render/
    render.js        deterministic MP4: every frame at 1080x1920, offline audio, loudness-normalized, 720p share copy
    sheet.js         contact sheets; --safe overlays the app-UI zones; --balance measures detail per third
    verify.js        frame fingerprints before and after a refactor
    safezone.json    the safe-zone numbers and where they come from
    lib.js           finds playwright and an installed headless browser
  voice/voice.py     Gemini TTS: audition voices, generate lines, fit to beats, duck music, mux (reads voice.json)
  qa/qa.py           the QA gate
01-episodes/epNN-slug/
  scenes.js          the only new code per episode (timeline, scenes, cues)
  page.json          title and copy for the demo page
  feedback.html/.js/.css   optional director-feedback panel for the demo page
  dist/              built page(s)       export/  rendered files (git-ignored)
```

```
python3 02-engine/build.py <ep>                       build the page
node    02-engine/render/sheet.js <ep> [--safe] [--balance] [--times 1,2,3] [--w 300]
node    02-engine/render/render.js <ep> [--query "?hook=B&t=0" --suffix -hookB]
python3 02-engine/qa/qa.py <ep>
```

Not built yet: `rig-pearl.js`, `scenes-common.js` (reusable rooms and backgrounds), GIF export. The original plan is kept below.

## Original plan

```
02-engine/
  parts/
    core.js          helpers, fonts, text effects
    rig-mei.js       Mei parts, poses, faces
    rig-pearl.js     Pearl parts and poses
    rig-nickel.js    Nickel the coin (new)
    infographics.js  counter, jar, donut, gauge, stats screen, tree, snowball, shield, bridge (new)
    scenes-common.js street, room, office, backgrounds
    music.js         mood-based generative music and sfx
    transport.js     play, scrub, scene chips
    export.js        GIF encoder + MP4 recorder
  shell.html         page layout and styles (phone-first)
  build.py           concatenates parts + an episode's scenes.js into one HTML
01-episodes/epNN-slug/
  scenes.js          the only new code per episode: timeline, text, infographic calls
  dist/epNN.html     built artifact, ready to publish
```

An episode then costs mostly: script, `scenes.js` (about 150 lines), music mood, QA.

## Lessons learned (do not relearn these)
1. **Vertical 9:16 always** (360x640 logical, canvas 720x1280).
2. Check every build with **contact sheets**: render 8 to 12 frames from `draw(t)` into one image and look at it.
3. The browser test tool blocks `file:` URLs. Serve the folder with `python3 -m http.server` and open localhost.
4. A local server without a charset garbles non-ASCII text. **Escape non-ASCII in scripts** (`\uXXXX`) so it works everywhere.
5. Preload canvas fonts with `document.fonts.load(...)` and redraw when ready.
6. Keep titles in the **safe zone** (y 90 to 520). Bottom floor area is a good place for particles, not for text.
7. Record MP4 in **real time from a clock tied to wall time** or the video stutters.
8. Cap the video bitrate (4 to 5 Mbps at 720p). A 16 s film came out at 8.6 MB.
9. Declare `capabilities: {downloads: true}` when publishing, or Save buttons do nothing.
10. Do not copy a company logo. Use plain lettering for brand-adjacent signs.

11. **Time warp:** write scenes in "design time" and play them through a piecewise-linear `warp(t)` onto 128 bpm bar lines. Retiming a whole episode is then changing one array, not rewriting scenes.
12. The Playwright MCP browser is shared and can be navigated by other agents mid-task. Use the render tools, which launch their own headless browser. The MCP tool can only save screenshots under its own output folder.
13. **Layout is a safety rule, not taste.** Platform UI covers the top 14%, the bottom 35% and a right-hand button column (`00-program/platform-guide.md`). Check every episode with `sheet.js --safe`.
14. Deterministic rendering beats screen recording: every frame is drawn at full size, and the soundtrack is rendered offline with a seeded noise generator, so the same source gives the same file.
15. Film grain is expensive to compress. Master at CRF 19 is about 19 MB for 28.6 s; the 720p share copy is about 4 MB. Build contact sheets inside the page (draw frames into one canvas) and screenshot that element.

16. **Voice:** Gemini TTS (`gemini-3.8-flash-tts`, Interactions API) treats the text as a verbatim transcript, so delivery goes in a style note, not in the text. Tier 1 allows about 10 requests a minute, so the tool paces itself and caches every line by content. Dramatic styles and ellipses slow speech a lot: use a pace note ("fast-paced, snappy"), trim leading and trailing silence, and write numbers as words. Normalizing a mix to -14 LUFS makes the music disappear if the voice is much louder than the music bed: raise the music before the ducking (`music_gain`).

## Open engine questions
- Voiceover: browser speech synthesis is not recordable into the stream. A TTS file would need to be generated outside the browser and mixed in.
- Longer shows: real-time recording means a 40 s video takes 40 s. Fine for 24 episodes.
