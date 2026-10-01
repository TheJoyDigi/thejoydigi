# Shared pipeline

Everything in `podcast/shared/` is used by every show and book. Fix it once here; every
show inherits the fix. Show-specific overrides live in the show's own directory.

## What's here

- `audio/master_episode.sh` — the mastering chain: voice polish (highpass, de-ess,
  light compression) -> music assembly (intro + gap + voice + gap + outro, filter_complex
  concat) -> dual-pass loudnorm to **-16 LUFS / 128 kbps / 44.1 kHz stereo** -> decode verify.
  Never overwrites its input; writes a new file.
  - Per-show jingles: set `INTRO_WAV` and `OUTRO_WAV` env vars. Defaults to the OC Pack
    jingles (expected next to the script).
  - Optional third arg: a `stingers.spec` file of `<seconds> <stinger.wav>` lines,
    mixed over the voice bed at segment boundaries.
- `CLAIMS_TEMPLATE.md` — the claim-ledger format every episode uses.

## What belongs here (add as the pipeline grows)

- `voices/` — TTS voice configs (Alex = `avocado_v2:MAI_01`, Jordan = `avocado_v2:MAI_03`;
  keep names and voices stable across every episode of every show).
- Script templates (cold-open hook, segment beats) and the TTS script format rules.
- Jingle/stinger synth sources and the SFX sourcing policy.

## Rules

- Backwards compatible only: any change here must not break existing shows' builds.
- Loudness standard is fixed: -16 LUFS, true peak <= -1.5 dBTP, 128 kbps MP3.
