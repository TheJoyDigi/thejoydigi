"""Score edit + real audiobook VO (ducked) + synthesized SFX -> mix.wav. Times in film seconds."""
import subprocess, numpy as np, glob, sys
SR = 48000; DUR = 46.0; W = sys.argv[1]
def loadvo(path, ss, to):
    chain = "highpass=f=90,equalizer=f=220:t=q:w=1:g=1.5,equalizer=f=3400:t=q:w=1.2:g=4.5,highshelf=f=9000:g=2.5,acompressor=threshold=-22dB:ratio=3:attack=4:release=90:makeup=4"
    cmd = ["ffmpeg", "-v", "quiet", "-ss", str(ss), "-to", str(to), "-i", path, "-af", chain, "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True).stdout, np.float32).reshape(-1, 2).copy()
def load(path, ss=None, to=None):
    cmd = ["ffmpeg", "-v", "quiet"] + (["-ss", str(ss)] if ss is not None else []) + (["-to", str(to)] if to is not None else []) + ["-i", path, "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True).stdout, np.float32).reshape(-1, 2).copy()
N = int(DUR * SR); mix = np.zeros((N, 2), np.float32); rng = np.random.default_rng(3)
def put(buf, t, gain=1.0):
    i = int(t * SR)
    if i < 0: buf = buf[-i:]; i = 0
    j = min(N, i + len(buf));
    if j > i: mix[i:j] += buf[: j - i] * gain
def fade(buf, fi=0.0, fo=0.0):
    n = len(buf); env = np.ones(n, np.float32)
    if fi: k = int(fi * SR); env[:k] = np.sin(np.linspace(0, np.pi / 2, k)) ** 2
    if fo: k = int(fo * SR); env[-k:] = np.cos(np.linspace(0, np.pi / 2, k)) ** 2
    return buf * env[:, None]

# --- score: take02 plays unedited; its hit (42.62) lands on film 26.35 and its own final chord ends the film
take = glob.glob(f"{W}/takes/*/take02.mp3")[0]; OFF = 42.62 - 26.35
A = fade(load(take, OFF, OFF + DUR), fi=0.9)
music = np.zeros((N, 2), np.float32); music[: min(N, len(A))] = A[:N]

# --- VO: real audiobook lines
A22 = sorted(glob.glob("/Users/longla/CODE/thejoydigi/public/podcasts/value-created/value-created-chapter-22-*.mp3"))[0]
A32 = sorted(glob.glob("/Users/longla/CODE/thejoydigi/public/podcasts/value-created/value-created-chapter-32-*.mp3"))[0]
VO = [(3.95, fade(loadvo(A22, 115.80, 119.55), 0.03, 0.15)), (24.2, fade(loadvo(A32, 309.60, 311.85), 0.03, 0.2)), (32.45, fade(loadvo(A22, 76.75, 78.10), 0.03, 0.15))]
# --- SFX (subtle, all synthesized)
def ir(sec=1.6):
    n = int(sec * SR); e = np.exp(-np.linspace(0, 6, n)); return (rng.standard_normal((n, 2)) * e[:, None] * 0.02).astype(np.float32)
REV = ir()
def verb(x, wet=0.35):
    out = np.stack([np.convolve(x[:, c], REV[:, c])[: len(x) + len(REV)] for c in range(2)], 1)
    dry = np.zeros_like(out); dry[: len(x)] = x; return dry * (1 - wet) + out * wet
def chime(freqs, dur=2.2, amp=0.12):
    t = np.arange(int(dur * SR)) / SR; s = sum(np.sin(2 * np.pi * f * t + i) * np.exp(-t * (2.2 + i * 0.6)) for i, f in enumerate(freqs))
    s *= np.minimum(1, t / 0.004); return verb(np.stack([s, np.roll(s, 90)], 1).astype(np.float32) * amp)
def whoosh(dur=1.0, amp=0.08, lo=300, hi=2400):
    n = int(dur * SR); x = rng.standard_normal(n); f = np.geomspace(lo, hi, n); y = np.zeros(n); a = 0.0
    for i in range(n): k = f[i] / SR * 6.28; a += (x[i] - a) * min(1, k); y[i] = a
    env = np.sin(np.linspace(0, np.pi, n)) ** 2; s = (y * env * amp).astype(np.float32); return verb(np.stack([s, s[::-1] * 0.6 + s * 0.4], 1))
def paper(dur=0.45, amp=0.22):
    n = int(dur * SR); x = rng.standard_normal(n); flutter = 0.5 + 0.5 * np.sin(np.linspace(0, 40, n)) ** 2
    hp = np.diff(x, prepend=0); env = np.exp(-np.linspace(0, 5, n)) * np.minimum(1, np.linspace(0, 12, n))
    s = (hp * flutter * env * amp).astype(np.float32); return verb(np.stack([s, s], 1), 0.2)
def sub(dur=2.5, amp=0.55):
    t = np.arange(int(dur * SR)) / SR; f = 38 + 30 * np.exp(-t * 9); s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 2.2) * np.minimum(1, t / 0.005)
    return np.stack([s, s], 1).astype(np.float32) * amp
duck = np.ones(N, np.float32)
for t, v in VO:
    hold, rel = (0.0, 0.06) if abs(t - 24.2) < 0.01 else (0.35, 0.25)   # the climax line must release before the hit
    a, b = int((t - 0.25) * SR), int((t + len(v) / SR + hold) * SR)
    ramp = int(0.25 * SR); rr = int(rel * SR); env = np.ones(N, np.float32); env[a:b] = 0.28
    env[a - ramp:a] = np.linspace(1, 0.28, ramp); env[b:b + rr] = np.linspace(0.28, 1, rr); duck = np.minimum(duck, env)
mix += music * duck[:, None] * 0.9
for t, v in VO: put(verb(v, 0.1)[: len(v) + SR // 2] * 2.0, t)

def swell(dur=1.2, amp=0.07):
    n = int(dur * SR); x = rng.standard_normal(n); y = np.zeros(n); a = 0.0
    for i in range(n): a += (x[i] - a) * 0.04; y[i] = a
    env = np.linspace(0, 1, n) ** 3; s = (y * env * amp * 4).astype(np.float32); return verb(np.stack([s, s], 1), 0.3)
put(swell(0.6, 0.05), -0.15)                                     # breath into the spark
put(paper(), 14.1); put(paper(), 16.0)                           # page turns
mix = fade(mix, 0.05, 0.05)
peak = np.abs(mix).max(); mix = mix / max(peak, 1e-6) * 0.89
subprocess.run(["ffmpeg", "-y", "-v", "quiet", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", f"{W}/mix-raw.wav"], input=mix.astype(np.float32).tobytes())
print("raw mix written", round(N / SR, 2), "s")
