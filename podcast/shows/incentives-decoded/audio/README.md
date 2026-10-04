# Incentives, Decoded — sound identity kit: "The Game Table"

Warm, tactile and a little mischievous. The kit is built only from real instrument recordings: kalimba and marimba lead, upright-bass pizzicato, congas, shaker, cajón, wooden game-piece clicks (woodblock, slit drum) and a coin-catch made from a real tambourine jingle pitched down. The key is E minor pentatonic at a swung 100 bpm. There are no glass or crystal bells, and no lead note above B5.

## Files (44.1 kHz, 24-bit stereo WAV, sample and true peak at −2.0 dBFS)
| File | Length | What it is |
|---|---|---|
| `intro_18s.wav` | 18.0 s | Lone game-piece clicks, then the bass, congas and kalimba motif join, the full groove lands with the marimba, and it ends on a logo hit (bass E1, marimba chord, coin catch) that rings out |
| `outro_14s.wav` | 14.0 s | The motif recapped gently, a warm resolve on E minor around 4.8 s, then a sparse low tail (from about 6 s) with room for the voice credit |
| `stingers/cold_open.wav` | 1.2 s | A single decisive wooden tick: a woodblock attack on a hollow log-drum body |
| `stingers/gameboard.wav` | 2.8 s | Two pieces placed (click, click), then the kalimba states E–G–A over a bass E |
| `stingers/reveal.wav` | 3.0 s | Conga slap with a marimba chord stab, low E and the coin catch |
| `stingers/inward.wav` | 3.0 s | Sparse and intimate: one low kalimba tone, a breath of shaker, a soft marimba E |
| `stingers/move.wav` | 2.6 s | Click-click, then a quick kalimba run E–G–A–B up to D with a bass hop: forward motion |
| `stingers/takeaway.wav` | 3.0 s | A warm resolve: rolled marimba E minor 7, a kalimba line falling home to E, low E bass |
| `stingers/teaser.wav` | 2.6 s | A soft lift: kalimba A–B–D left open on D over a hushed shaker, a question for next time |

Every stinger front-loads its identity into the first 0.3 s, because that's all the chapter plays.

## Measured (from `scripts/qa.py`)
- **Tuning:** every pitched note is within ±2 cents. The woodblocks and slit drums are retuned to E and A as well.
- **Key:** the top pitch classes are E, G, A, B and D (E minor pentatonic) in the intro, outro and most stingers.
- **Warmth:** energy above 6 kHz is at least 28 dB down in every file, and the spectral centroid is 250–500 Hz.
- **Loudness:** the integrated loudness is −16 to −22 LUFS. The episode master (`podcast/shared/audio/master_episode.sh`) normalises the final mix to −16.
- **Intro build:** about −30 dB RMS for the clicks, −20 for the congas and kalimba, −18 for the full groove and logo hit, and −28 for the tail.

## Use in an episode
```
INTRO_WAV=podcast/shows/incentives-decoded/audio/intro_18s.wav \
OUTRO_WAV=podcast/shows/incentives-decoded/audio/outro_14s.wav \
podcast/shared/audio/master_episode.sh voice.mp3 out.mp3 stingers.spec
```
`stingers.spec` lines are `<seconds> podcast/shows/incentives-decoded/audio/stingers/<name>.wav`.

## Regenerate or tweak
```
cd podcast/shows/incentives-decoded/audio/scripts
python3 fetch_samples.py   # ~70 MB of CC0 recordings into samples/ (git-ignored)
python3 compose.py         # renders all nine files into out/
python3 qa.py              # format, peaks, LUFS, warmth, key, clicks
```
- **Where things live:** `kit.py` is the sampler, tuning, room reverb and mix bus. The per-instrument levels are in `new_tracks()`. `compose.py` holds the motif and each asset's arrangement.
- **Determinism:** the build is seeded, so a fresh fetch and render are byte-identical to the committed WAVs.
- **To publish a change:** copy `out/` over these files (the stingers drop their `stinger_` prefix).

## Sources and licence
Every sound is a CC0 1.0 (public domain) recording, so no attribution is required and there is no licence risk:
- **Versilian Community Sample Library** (https://github.com/sgossner/VCSL): Kenyan kalimba, marimba, conga, shakers, woodblock, cajón, cabasa, slit drum and tambourine.
- **VSCO-2 Community Edition** (https://github.com/sgossner/VSCO-2-CE): solo contrabass pizzicato.

No synth tones are used. The only processing is retuning (varispeed resampling), EQ, a synthesized room reverb and gentle bus saturation.
