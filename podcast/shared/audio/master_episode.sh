#!/bin/bash
# master_episode.sh — The OC Pack enhanced mastering chain.
#
# Usage: master_episode.sh <voice.mp3> <out.mp3> [stingers.spec]
#
#   voice.mp3      raw TTS voice mix (Alex + Jordan)
#   out.mp3        final release candidate: -16 LUFS / 128 kbps / 44.1k stereo
#   stingers.spec  optional: lines of "<seconds> <stinger.wav>" — stinger start
#                  times in FINAL timeline seconds (intro + gaps included),
#                  mixed over the voice bed at segment boundaries.
#
# Chain:
#   1. Voice polish: highpass 80Hz -> gentle de-ess shelf -> light compression
#   2. Assembly: intro + 0.5s gap + voice + 0.5s gap + outro (filter_complex concat)
#   3. Optional stinger overlay (amix, stingers duck-free short hits)
#   4. Dual-pass loudnorm to -16 LUFS (true peak -1.5 dBTP), 128k MP3
#
# Safety: never overwrites the input; writes to a new file; verifies decode.
set -euo pipefail

if [ $# -lt 2 ]; then
  echo "usage: master_episode.sh <voice.mp3> <out.mp3> [stingers.spec]" >&2
  exit 1
fi
VOICE="$1"; OUT="$2"; SPEC="${3:-}"
MUSIC_DIR="$(dirname "$0")"
# Per-show music: point INTRO_WAV / OUTRO_WAV at the show's jingles.
# Defaults preserve the OC Pack behavior (jingles next to this script).
INTRO="${INTRO_WAV:-$MUSIC_DIR/oc_pack_intro.wav}"
OUTRO="${OUTRO_WAV:-$MUSIC_DIR/oc_pack_outro.wav}"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

echo "== 1. voice polish =="
ffmpeg -y -v error -i "$VOICE" \
  -af "highpass=f=80,equalizer=f=7000:t=q:w=1:g=-2.5,acompressor=threshold=-18dB:ratio=3:attack=20:release=250:makeup=2dB" \
  -ar 44100 -ac 2 "$WORK/voice_polished.wav"

echo "== 2. assembly =="
ffmpeg -y -v error -i "$INTRO" -ar 44100 -ac 2 "$WORK/intro.wav"
ffmpeg -y -v error -i "$OUTRO" -ar 44100 -ac 2 "$WORK/outro.wav"
ffmpeg -y -v error -f lavfi -i anullsrc=r=44100:cl=stereo -t 0.5 "$WORK/gap.wav"

if [ -n "$SPEC" ] && [ -f "$SPEC" ]; then
  echo "== 3. stinger overlay =="
  VALID=$(grep -cvE '^\s*(#|$)' "$SPEC" || true)
  if [ "$VALID" -eq 0 ]; then
    echo "   (spec empty, assembling without stingers)"
    ffmpeg -y -v error -i "$WORK/intro.wav" -i "$WORK/gap.wav" -i "$WORK/voice_polished.wav" \
      -i "$WORK/gap.wav" -i "$WORK/outro.wav" \
      -filter_complex "[0:a][1:a][2:a][3:a][4:a]concat=n=5:v=0:a=1" "$WORK/assembled.wav"
  else
    INPUTS="-i $WORK/intro.wav -i $WORK/gap.wav -i $WORK/voice_polished.wav -i $WORK/gap.wav -i $WORK/outro.wav"
    FILTER="[0:a][1:a][2:a][3:a][4:a]concat=n=5:v=0:a=1[base]"
    idx=5
    prev="[base]"
    while read -r sec sting; do
      [ -z "$sec" ] && continue
      case "$sec" in \#*) continue;; esac
      INPUTS="$INPUTS -i $sting"
      ms=$(awk "BEGIN{printf \"%d\", $sec*1000}")
      FILTER="$FILTER;[$idx:a]adelay=${ms}|${ms},volume=0.9[s$idx]"
      FILTER="$FILTER;${prev}[s$idx]amix=inputs=2:normalize=0[mprev]"
      prev="[mprev]"
      idx=$((idx+1))
    done < "$SPEC"
    FILTER="$FILTER;[mprev]acopy[aout]"
    # shellcheck disable=SC2086
    ffmpeg -y -v error $INPUTS -filter_complex "$FILTER" -map "[aout]" "$WORK/assembled.wav"
  fi
else
  echo "== 3. no stingers =="
  ffmpeg -y -v error -i "$WORK/intro.wav" -i "$WORK/gap.wav" -i "$WORK/voice_polished.wav" \
    -i "$WORK/gap.wav" -i "$WORK/outro.wav" \
    -filter_complex "[0:a][1:a][2:a][3:a][4:a]concat=n=5:v=0:a=1" "$WORK/assembled.wav"
fi

echo "== 4. loudnorm dual-pass =="
# NOTE: pass 1 must NOT use -v error — loudnorm prints its JSON stats to stderr,
# which -v error would suppress.
ffmpeg -hide_banner -i "$WORK/assembled.wav" -af loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json -f null - 2> "$WORK/ln.json" || true
if ! grep -q '"input_i"' "$WORK/ln.json" 2>/dev/null; then
  echo "   (loudnorm stats unavailable — single-pass fallback)" >&2
  # single-pass fallback (stats print suppressed at -v error on some builds)
  ffmpeg -y -v error -i "$WORK/assembled.wav" -af loudnorm=I=-16:TP=-1.5:LRA=11 \
    -ar 44100 -ac 2 -b:a 128k "$OUT"
else
  # ffmpeg >= 7 prints input_i/input_tp/input_lra/input_thresh/target_offset;
  # the filter's 2nd-pass options still use the measured_* names.
  python3 - "$WORK/ln.json" > "$WORK/ln_args.txt" <<'EOF'
import json, sys, re
raw = open(sys.argv[1]).read()
m = re.search(r'\{[^{}]*"input_i"[^{}]*\}', raw, re.S)
d = json.loads(m.group(0))
print("loudnorm=I=-16:TP=-1.5:LRA=11"
      ":measured_I={input_i}:measured_TP={input_tp}:measured_LRA={input_lra}"
      ":measured_thresh={input_thresh}:offset={target_offset}:linear=true".format(**d))
EOF
  LN2=$(cat "$WORK/ln_args.txt")
  ffmpeg -y -v error -i "$WORK/assembled.wav" -af "$LN2" -ar 44100 -ac 2 -b:a 128k "$OUT"
fi

echo "== 5. verify =="
ffprobe -v error -show_entries format=duration,size -of default=noprint_wrappers=1 "$OUT"
ffmpeg -v error -i "$OUT" -f null - && echo DECODE_OK
ffmpeg -v info -i "$OUT" -af volumedetect -f null - 2>&1 | grep -E "max_volume|mean_volume"
echo "MASTERED -> $OUT"
