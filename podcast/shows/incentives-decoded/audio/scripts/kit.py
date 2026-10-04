"""Incentives, Decoded — "The Game Table" sound identity kit.
Real CC0 recordings (VCSL + VSCO-2-CE) retuned to E minor pentatonic, sequenced on a swung 100 bpm grid.
Writes 44.1 kHz stereo 24-bit WAVs peaking at exactly -2.0 dBFS into out/.
"""
import os, re, glob, subprocess, hashlib, wave
import numpy as np
from load import decode, SR

W = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(W, 'out'); os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(7)
NAMES = 'C C# D D# E F F# G G# A A# B'.split()

def m2f(m): return 440 * 2 ** ((m - 69) / 12)
def n2m(n):
    p = re.match(r'([A-G]#?)(-?\d)', n); return NAMES.index(p.group(1)) + 12 * (int(p.group(2)) + 1)
LEAD_MAX = n2m('B5')

# ---------------- samples ----------------
def S(pattern):
    fs = sorted(glob.glob(os.path.join(W, 'samples', '**', pattern), recursive=True))
    assert fs, pattern
    return fs

def norm(x):
    return x / (np.abs(x).max() + 1e-12)

def edges(x, fin=.0015, fout=.03):
    """Micro-fades so trimmed starts and truncated sample tails never click."""
    x = x.copy(); a, b = int(fin * SR), min(int(fout * SR), len(x) // 2)
    x[:a] *= np.linspace(0, 1, a)[:, None]; x[-b:] *= np.linspace(1, 0, b)[:, None]
    return x

def measure_f0(x, approx, harmonics=1):
    """Exact pitch near `approx` (±70 cents): fundamental peak, or a harmonic comb for weak-fundamental bass."""
    m = x.mean(1); a = int(.08 * SR); seg = m[a:a + 65536]
    seg = seg * np.hanning(len(seg)); n = 1 << 19
    Sp = np.abs(np.fft.rfft(seg, n)); fr = np.fft.rfftfreq(n, 1 / SR)
    best, bc = -1, 0
    for c in np.arange(-70, 71, 1.0):
        f = approx * 2 ** (c / 1200)
        s = sum(Sp[int(round(f * h * n / SR))] / h ** .5 for h in range(1, harmonics + 1))
        if s > best: best, bc = s, c
    return approx * 2 ** (bc / 1200)

class Pitched:
    """Multi-sampled pitched instrument. table: list of (file, true_midi_guess, layer)."""
    def __init__(self, name, files, offset, label_re, harmonics=1, layer_re=None):
        self.name, self.zones = name, []
        for f in files:
            lab = re.search(label_re, os.path.basename(f)).group(1)
            mg = n2m(lab) + offset
            x = decode(f)
            fz = measure_f0(x, m2f(mg), harmonics)
            layer = re.search(layer_re, os.path.basename(f)).group(1) if layer_re else 'x'
            self.zones.append(dict(file=f, f0=fz, midi=69 + 12 * np.log2(fz / 440), layer=layer, x=edges(norm(x))))
        self.cache = {}

    def note(self, n, layer=None, max_shift=4.0):
        m = n2m(n) if isinstance(n, str) else n
        zs = [z for z in self.zones if (layer is None or z['layer'] == layer) and abs(z['midi'] - m) <= max_shift + .5] or self.zones
        z = min(zs, key=lambda z: (abs(z['midi'] - m), z['file']))
        assert abs(z['midi'] - m) <= max_shift + .5, f'{self.name} {n}: nearest zone {z["midi"]:.1f} too far'
        return shift(z['x'], m2f(m) / z['f0'], z['file'])

_shift_cache = {}
def shift(x, ratio, key):
    """Varispeed pitch shift (64-tap swr resampler; keeps the recording's natural decay)."""
    if abs(ratio - 1) < 1e-4: return x
    k = (key, round(ratio, 6))
    if k in _shift_cache: return _shift_cache[k]
    raw = x.astype(np.float32).tobytes()
    p = subprocess.run(['ffmpeg', '-v', 'error', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-',
                        '-af', f'asetrate={int(round(SR * ratio))},aresample={SR}:filter_size=64:phase_shift=12:cutoff=0.97', '-f', 'f32le', '-'],
                       input=raw, capture_output=True)
    y = np.frombuffer(p.stdout, np.float32).reshape(-1, 2).astype(np.float64)
    assert p.returncode == 0 and len(y) > len(x) * .5 / ratio, f'pitch shift failed ({key}, {ratio}): {p.stderr[-300:]!r}'
    _shift_cache[k] = y; return y

def strongest(x, lo=80):
    m = x.mean(1)[:8192]; m = m * np.hanning(len(m))
    Sp = np.abs(np.fft.rfft(m, 1 << 16)); f = np.fft.rfftfreq(1 << 16, 1 / SR); k = np.searchsorted(f, lo)
    return f[k + np.argmax(Sp[k:])]

class Perc:
    """Round-robin one-shots; `tune` retunes each hit's main resonance to a note so wood and drums sit in E minor."""
    def __init__(self, files, tune=None):
        self.x = [edges(norm(decode(f))) for f in files]; self.i = 0
        if tune: self.x = [edges(shift(x, m2f(n2m(tune)) / strongest(x), f)) for x, f in zip(self.x, files)]
    def hit(self):
        self.i += 1; return self.x[self.i % len(self.x)]

# Kenyan kalimba: labels sit one octave below the sounding pitch (VCSL naming), fundamentals are clean
kal = Pitched('kalimba', [f for f in S('Kalimba, Kenya/*.wav') if re.search(r'_(B2|B3_k12|C#3|D#3_k6|F#3_k5|F#4|G#3_k11)_', f)], 12, r'MainSpirit_([A-G]#?\d)_')
mar = Pitched('marimba', S('Marimba/*.wav'), 12, r'Outrigger_([A-G]#?\d)_', layer_re=r'_(loud|med|soft)_')
bas = Pitched('bass', S('Solo Contrabass/Pizz/*.wav'), 12, r'Pizz_([A-G]#?\d)_', harmonics=6, layer_re=r'_(v\d)_')

P = {
    'wood_pp': Perc(S('Woodblock/wood_click_pp_*.wav'), tune='E6'), 'wood_mp': Perc(S('Woodblock/wood_click_mp.wav') + S('Woodblock/wood_click2_mp.wav'), tune='E6'),
    'wood_f': Perc(S('Woodblock/wood_click_f_*.wav'), tune='E6'),
    'slit_hi': Perc(S('Slit Drum/LogDrumHi_MedM_v2_*.wav'), tune='E3'), 'slit_hi_soft': Perc(S('Slit Drum/LogDrumHi_MedM_v1_*.wav'), tune='E3'),
    'slit_lo': Perc(S('Slit Drum/LogDrumLo_MedM_v2_*.wav'), tune='A2'), 'slit_lo_hard': Perc(S('Slit Drum/LogDrumLo_MedM_v3_*.wav'), tune='A2'),
    'quinto_mute': Perc(S('Conga/Quinto_HitFM1_v1_*.wav')), 'quinto': Perc(S('Conga/Quinto_HitN_v2_*.wav')),
    'conga': Perc(S('Conga/Conga_HitN_v2_*.wav')), 'conga_soft': Perc(S('Conga/Conga_HitN_v1_*.wav')), 'conga_mute': Perc(S('Conga/Conga_HitFM_v1_*.wav')),
    'tumba': Perc(S('Conga/Tumba_HitN_v3_*.wav')), 'tumba_soft': Perc(S('Conga/Tumba_HitN_v1_*.wav')),
    'shk_up': Perc(S('Shaker, Small/Mid_ShakerLowFaster_Up_*.wav')), 'shk_dn': Perc(S('Shaker, Small/Mid_ShakerLowFaster_Down_*.wav')),
    'shk_hit': Perc(S('Shaker, Large/LShaker_Hit_*.wav')), 'shk_roll': Perc(S('Shaker, Small/Mid_Shaker_Roll_Fast_*.wav')),
    'cajon_b': Perc(S('Cajon/Cajon_hit1_mp_*.wav')), 'cajon_bf': Perc(S('Cajon/Cajon_hit1_f_*.wav')), 'cajon_s': Perc(S('Cajon/Cajon_hit2_pp_*.wav') + S('Cajon/Cajon_hit3_p_*.wav')),
    'tamb': Perc(S('Tambourine 1/Tamb1_Hit_v1_*.wav')), 'cabasa': Perc(S('Cabasa/Cabasa1_Hit_*.wav')),
}

# ---------------- DSP ----------------
def eq(x, curve):
    """Zero-phase FFT EQ with a gain curve g(f)."""
    n = 1 << int(np.ceil(np.log2(len(x) + 1)))
    X = np.fft.rfft(x, n, axis=0); f = np.fft.rfftfreq(n, 1 / SR)
    return np.fft.irfft(X * curve(f)[:, None], n, axis=0)[:len(x)]

def hp(fc, order=2): return lambda f: 1 / np.sqrt(1 + (fc / np.maximum(f, 1e-3)) ** (2 * order))
def lp(fc, order=2): return lambda f: 1 / np.sqrt(1 + (f / fc) ** (2 * order))
def shelf_hi(fc, db): g = 10 ** (db / 20); return lambda f: 1 + (g - 1) / (1 + (fc / np.maximum(f, 1e-3)) ** 2)
def chain(*cs): return lambda f: np.prod([c(f) for c in cs], axis=0)

# coin catch: a real tambourine jingle, pitched down and kept out of the very top so it reads as a warm "chink"
def coin():
    t = shift(P['tamb'].hit(), 2 ** (-5 / 12), 'tamb')
    t = eq(t, chain(hp(1400, 2), lp(5200, 3)))
    env = np.exp(-np.arange(len(t)) / SR / .09); t = t * env[:, None]
    c = eq(P['cabasa'].hit(), chain(hp(1800), lp(5000, 3))) * .35
    return norm(mixdown([(t, 0, 1, 0), (c, .012, 1, .1)], max(len(t), len(c)) + 2000))

def room_ir(seconds=1.7, pre=.012, damp=4200, seed=3):
    """Warm wooden-room impulse: early reflections + noise tail whose highs decay faster."""
    r = np.random.default_rng(seed); n = int(seconds * SR); t = np.arange(n) / SR
    ir = np.zeros((n, 2))
    for ch in range(2):
        noise = r.standard_normal(n) * np.exp(-t / (seconds / 6.9))
        # time-varying damping: blend toward a dark copy as the tail ages
        dark = eq(noise[:, None], lp(damp * .45, 1))[:, 0]
        a = np.clip(t / (seconds * .5), 0, 1)
        ir[:, ch] = (1 - a) * eq(noise[:, None], lp(damp, 1))[:, 0] + a * dark
        for k in range(10):
            d = int((pre + r.uniform(.003, .045)) * SR); ir[d, ch] += r.uniform(.25, .6) * (-1) ** k
    ir[:int(pre * SR)] = 0
    return ir / np.sqrt((ir ** 2).sum(0, keepdims=True))

IR_ROOM = room_ir(1.7); IR_SHORT = room_ir(.7, pre=.006, damp=5200, seed=9)

def conv(x, ir):
    n = 1 << int(np.ceil(np.log2(len(x) + len(ir))))
    y = np.fft.irfft(np.fft.rfft(x, n, axis=0) * np.fft.rfft(ir, n, axis=0), n, axis=0)
    return y[:len(x)]

def pan(x, p):
    """Constant-power pan, p in [-1, 1]."""
    a = (p + 1) * np.pi / 4; m = x.mean(1)
    return np.stack([m * np.cos(a), m * np.sin(a)], 1) * 1.414

def mixdown(events, n):
    out = np.zeros((n, 2))
    for x, t, g, p in events:
        i = int(round(t * SR))
        if i >= n: continue
        y = pan(x, p) * g if p is not None else x * g
        j = min(n, i + len(y)); out[i:j] += y[:j - i]
    return out

# ---------------- sequencing ----------------
BPM = 100; STEP = 60 / BPM / 4; SWING = .58

class Track:
    def __init__(self, name, gain_db=0, pan=0., send=.18, short=.0, color=None):
        self.name, self.g, self.pan, self.send, self.short, self.color, self.ev = name, 10 ** (gain_db / 20), pan, send, short, color, []
    def add(self, x, t, vel=1., p=None, human=.006):
        self.ev.append((x, max(0, t + rng.normal(0, human) * (human > 0)), vel * self.g, self.pan if p is None else p))

def at(bar, step, t0=0.):
    """Swung 16th grid position in seconds."""
    s = bar * 16 + step
    return t0 + s * STEP + ((SWING - .5) * 2 * STEP if int(s) % 2 == 1 else 0)

def render(tracks, length, fade=.35, master_db=-2.0, bright=-4.0, name=None):
    n = int(length * SR)
    dry = np.zeros((n, 2)); wet = np.zeros((n, 2)); wet_s = np.zeros((n, 2))
    for tr in tracks:
        if not tr.ev: continue
        y = mixdown(tr.ev, n)
        if tr.color: y = eq(y, tr.color)
        dry += y; wet += y * tr.send; wet_s += y * tr.short
    mix = dry + conv(wet, IR_ROOM) * .9 + conv(wet_s, IR_SHORT) * .8
    mix = eq(mix, chain(hp(32, 2), shelf_hi(6500, bright), lp(15000, 2)))
    # gentle glue: soft-knee saturation on peaks only
    pk = np.abs(mix).max(); y = mix / pk
    y = np.where(np.abs(y) > .6, np.sign(y) * (.6 + .4 * np.tanh((np.abs(y) - .6) / .4)), y)
    if fade: k = int(fade * SR); y[-k:] *= np.linspace(1, 0, k)[:, None] ** 1.5
    y *= 10 ** (master_db / 20) / np.abs(y).max()
    if name: write(name, y)
    return y

def write(name, y):
    path = os.path.join(OUT, name)
    q = np.clip(np.round(y * 8388607), -8388608, 8388607).astype(np.int32)
    b = q.astype('<i4').tobytes(); b = b''.join(b[i:i + 3] for i in range(0, len(b), 4))
    with wave.open(path, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(3); w.setframerate(SR); w.writeframes(b)
    return path

def new_tracks():
    return dict(
        kal=Track('kalimba', 2.5, .28, .22, .1, chain(hp(160), shelf_hi(4000, -3))),
        mar=Track('marimba', -5, -.3, .2, .08, chain(hp(90), shelf_hi(5000, -2))),
        bass=Track('bass', -5.5, 0, .05, .06, chain(hp(35), lp(2600, 2))),
        click=Track('clicks', 4, 0, .12, .25, chain(hp(220), lp(6000, 2))),
        conga=Track('congas', -3, -.15, .1, .12, chain(hp(70), lp(7500, 2))),
        shk=Track('shaker', 3, .45, .08, .05, chain(hp(400), lp(4200, 3))),
        caj=Track('cajon', -2, .05, .06, .1, chain(hp(45), lp(6000, 2))),
        coin=Track('coin', -6, .2, .25, .1),
    )

def lead(t, n, tr, vel=1., layer='med'):
    assert n2m(n) <= LEAD_MAX, f'lead note {n} above B5'
    tr['kal'].add(kal.note(n), t, vel)
