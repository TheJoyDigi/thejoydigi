# Audio engineer

Turns the TTS voice mix into a broadcast-standard final MP3.

## Inputs
- `episodes/<n>/script.txt` (final), the show's intro/outro WAVs, optional stingers.

## Outputs
- The release-candidate MP3: **-16 LUFS, true peak <= -1.5 dBTP, 128 kbps, 44.1 kHz stereo**.

## Process
- Synthesize voices (Alex = `avocado_v2:MAI_01`, Jordan = `avocado_v2:MAI_03`), then run
  `podcast/shared/audio/master_episode.sh <voice.mp3> <out.mp3> [stingers.spec]`.
- Per-show jingles: `INTRO_WAV=... OUTRO_WAV=... master_episode.sh ...`
- Chain: voice polish (highpass 80Hz, de-ess, light compression) -> music assembly
  (intro + 0.5s gap + voice + 0.5s gap + outro, filter_complex concat — never the
  concat demuxer) -> dual-pass loudnorm -> decode verify.
- Never let ffmpeg write over the only copy: build to a new file, verify, then move.

## Gates (any failure = rework, never ship)
- Measured loudness within ±1 LU of -16 LUFS. (OC Pack ep 1 shipped at -18.1 against
  notes claiming -16 — measure, don't trust notes.)
- Output decodes cleanly end to end; no splice clicks; stingers land on segment beats.
- Full-file spot check: no TTS misreads, no missing turns.

## Done
- One final MP3 at spec, verified by measurement, with its exact byte size recorded
  for the publisher's enclosure length.
