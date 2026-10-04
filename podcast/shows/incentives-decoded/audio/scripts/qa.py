"""Objective checks on the rendered kit (format, peaks, loudness, warmth, key, clicks, front-loading)."""
import glob, os, subprocess, wave, json, numpy as np
SR = 44100
NAMES = 'C C# D D# E F F# G G# A A# B'.split()
def read(p):
    with wave.open(p) as w:
        ch, sw, sr, n = w.getnchannels(), w.getsampwidth(), w.getframerate(), w.getnframes(); b = w.readframes(n)
    a = np.frombuffer(b, np.uint8).reshape(-1, 3)
    v = (a[:, 0].astype(np.int32) | (a[:, 1].astype(np.int32) << 8) | (a[:, 2].astype(np.int32) << 16))
    v = np.where(v >= 1 << 23, v - (1 << 24), v) / 8388608.0
    return v.reshape(-1, ch), ch, sw, sr
rows = []
for p in sorted(glob.glob('out/*.wav')):
    x, ch, sw, sr = read(p); m = x.mean(1)
    pk = 20 * np.log10(np.abs(x).max())
    st = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', p, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
    lufs = float(st.split('I:')[-1].split('LUFS')[0]); tp = float(st.split('Peak:')[-1].split('dBFS')[0])
    S = np.abs(np.fft.rfft(m * np.hanning(len(m)))) ** 2; f = np.fft.rfftfreq(len(m), 1 / sr)
    cen = (S * f).sum() / S.sum(); hi = 10 * np.log10(S[f > 6000].sum() / S.sum())
    # chroma over 80 Hz - 2 kHz
    band = (f > 80) & (f < 2000); pc = np.zeros(12)
    np.add.at(pc, (np.round(12 * np.log2(f[band] / 440) + 69).astype(int)) % 12, S[band])
    top = [NAMES[i] for i in np.argsort(pc)[::-1][:5]]
    d = np.abs(np.diff(m)); clicks = int((d > 0.25).sum())
    e = m ** 2; front = 10 * np.log10(e[:int(.3 * sr)].mean() / (e.mean() + 1e-12)) if len(m) > .3 * sr else 0
    rows.append((os.path.basename(p), ch, sw * 8, sr, len(x) / sr, pk, tp, lufs, cen, hi, top, clicks, front))
print(f"{'file':26s} ch bit  sr     dur   peak  truePk  LUFS  centroid >6k(dB) top-5 pitch classes   jumps front0.3s")
for r in rows:
    print(f"{r[0]:26s} {r[1]}  {r[2]}  {r[3]} {r[4]:5.2f}  {r[5]:+.2f}  {r[6]:+.2f}  {r[7]:5.1f}  {r[8]:6.0f}Hz  {r[9]:6.1f}   {' '.join(r[10]):22s} {r[11]:3d}   {r[12]:+5.1f}dB")
