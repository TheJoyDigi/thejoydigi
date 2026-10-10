"""Word timestamps for one audiobook chapter; ffmpeg decodes so PyAV is never touched."""
import sys, json, subprocess, numpy as np
from faster_whisper import WhisperModel
src, out = sys.argv[1], sys.argv[2]
pcm = subprocess.run(["ffmpeg", "-v", "quiet", "-i", src, "-ac", "1", "-ar", "16000", "-f", "f32le", "-"], capture_output=True).stdout
audio = np.frombuffer(pcm, np.float32)
m = WhisperModel("small.en", device="cpu", compute_type="int8")
segs, _ = m.transcribe(audio, word_timestamps=True, beam_size=5, condition_on_previous_text=False)
words = [{"w": w.word.strip(), "s": round(w.start, 3), "e": round(w.end, 3)} for s in segs for w in (s.words or [])]
json.dump(words, open(out, "w"), indent=0); print(len(words), "words", out)
