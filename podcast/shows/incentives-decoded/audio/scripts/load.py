"""Decode every sample to 44.1 kHz stereo float32 (cached .npy), trim leading silence, measure pitch."""
import os, subprocess, json, re, glob
import numpy as np
SR = 44100
W = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(W, 'cache'); os.makedirs(CACHE, exist_ok=True)

def decode(path):
    key = os.path.join(CACHE, re.sub(r'[^A-Za-z0-9]+', '_', os.path.relpath(path, W)) + '.npy')
    if os.path.exists(key): return np.load(key)
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'], capture_output=True).stdout
    x = np.frombuffer(raw, np.float32).reshape(-1, 2).astype(np.float64)
    env = np.abs(x).max(1); thr = env.max() * 0.02
    on = int(np.argmax(env > thr)); on = max(0, on - int(.002 * SR))
    x = x[on:]
    np.save(key, x); return x

def f0(x):
    m = x.mean(1); seg = m[int(.03*SR):int(.03*SR)+16384]
    if len(seg) < 4096: seg = m[:16384]
    seg = seg * np.hanning(len(seg)); n = 1 << 17
    S = np.abs(np.fft.rfft(seg, n)); fr = np.fft.rfftfreq(n, 1/SR)
    lo, hi = np.searchsorted(fr, 25), np.searchsorted(fr, 2500)
    # harmonic product spectrum, robust to strong 2nd/3rd partials
    hps = S.copy()
    for h in (2, 3):
        d = S[::h]; hps[:len(d)] *= d
    k = lo + np.argmax(hps[lo:hi]); return fr[k], fr[lo + np.argmax(S[lo:hi])]

def midi(f): return 69 + 12*np.log2(f/440)
NAMES = 'C C# D D# E F F# G G# A A# B'.split()
def name(m): m = int(round(m)); return f'{NAMES[m%12]}{m//12-1}'

if __name__ == '__main__':
    out = {}
    for inst, pat in [('kalimba', 'samples/vcsl/**/Kalimba, Tanzania/*.wav'), ('marimba', 'samples/vcsl/**/Marimba/*.wav'), ('bass', 'samples/vsco/**/Pizz/*.wav'), ('slit', 'samples/vcsl/**/Slit Drum/*.wav')]:
        for p in sorted(glob.glob(pat, recursive=True)):
            x = decode(p); fh, fp = f0(x)
            out.setdefault(inst, []).append(dict(file=os.path.relpath(p, W), dur=round(len(x)/SR, 2), peak=round(float(np.abs(x).max()), 3), f0=round(fh, 1), note=name(midi(fh)), cents=round((midi(fh)-round(midi(fh)))*100), loudest_partial=round(fp, 1)))
    json.dump(out, open('analysis.json', 'w'), indent=1)
    for inst, rows in out.items():
        print(f'\n## {inst} ({len(rows)})')
        for r in rows: print(f"  {os.path.basename(r['file'])[:52]:52s} {r['note']:>4s} {r['cents']:+4d}c f0={r['f0']:7.1f} dur={r['dur']:5.2f} pk={r['peak']}")
