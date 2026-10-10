# Value, Created — Launch film (9:16)

The official book announcement for Reels, TikTok and Shorts. It's a 46-second vertical film built from the real paperback (the 300-dpi KDP cover and the actual interior pages), the real audiobook voice, and an original orchestral score.

| | |
|---|---|
| File | `out/value-created-launch.mp4` (local; copy here only once Long approves) |
| Format | 1080 × 1920, 30 fps, H.264 + AAC 256k, 46.0 s, −14 LUFS, peak −1 dBFS |
| Renderer | `film/film.js`: dependency-free WebGL2 (3D book, page-curl mesh, light-ray and fbm smoke shaders, bloom, anamorphic streak, light leaks, ACES grade, grain), rendered headless on the Mac GPU by `film/render.mjs` |
| Score | Lyria 3.5 (`audio/score.txt`, take 2 of 3, used unedited); its orchestral hit lands on the "IT IS CREATED." beat |
| Voice | Real audiobook lines (ch. 22 and 32), cut on Whisper word timestamps (`audio/tx.py`) |

## Beats
| Time | On screen | Audio |
|---|---|---|
| 0–3.2 | Spark ignites. "Everyone wants more money. / ALMOST NO ONE ASKS WHAT IT'S MADE OF." | piano |
| 3.2–8.0 | Cover art, gold heat-ripple shader. "Money is created value, FROZEN." | VO ch. 22: "Money is created value, frozen, so it can be spent later." |
| 8.0–12.6 | The 3D paperback turns spine-first into the light. "THE BOOK IS HERE / Now in paperback." | |
| 12.6–18.2 | Real interior pages turn (Ch. 1 opener → infographic → takeaways). "32 SHORT CHAPTERS · 5 PARTS" | page turns |
| 18.2–24.2 | The five steps: SEE / CREATE / CAPTURE / SCALE / MASTER IT, each with its line | strings build |
| 24.2–28.0 | "Value is not found. / IT IS CREATED." | VO ch. 32, then the orchestral hit |
| 28.0–36.6 | READ IT (paperback turns to the back cover) → LISTEN TO IT (audiobook card, bars driven by the soundtrack) | VO: "This is Value, Created." |
| 36.6–46.0 | Book hero. "OUT NOW / Search "Value, Created" on Amazon / PRODUCED BY THE JOY DIGI" | final chord rings out |

All copy comes from the book's back cover, `book.json` and the audiobook transcripts (see `../book-promo/README.md` for line sources). No author byline, no money imagery beyond the book's own cover, and all text stays inside the safe zones in `../_engine/README.md` (below y 840, text is fitted to x ≤ 780).

## QA done
- Codex creative review of the frames (scored 5/10 the first time) → fixed: sharp text drawn after the grade, safe-zone fitting, faster hook, light kept off the type, darker paper, tighter pacing.
- Three Gemini listening passes on the mix → fixed: removed the chimes, the music now plays unedited, the VO is EQ'd and compressed, the ducking releases before the hit, and there's a clean ring-out ending.

## Re-render
Needs Playwright (from `book/value-created/node_modules`), ffmpeg, and textures in `tex/` (front/back/spine cut from `book/value-created/out/print/value-created-cover.pdf` at 300 dpi; `page1-3` from interior pages 9, 12 and 15; `art` and `podcast` from `public/podcasts/value-created/cover-v3.jpg`).
```
python3 -m http.server 8765 --bind 127.0.0.1         # from this folder
python3 audio/mix.py audio                             # score + VO + SFX -> audio/mix-raw.wav, then loudnorm to -14 LUFS
node film/render.mjs --stills 1,5,10                   # stills
node film/render.mjs --video out/film-silent.mp4       # ~9 min on the M1 Max GPU
ffmpeg -i out/film-silent.mp4 -i audio/mix.wav -c:v copy -c:a aac -b:a 256k -shortest out/value-created-launch.mp4
```
