"""Mix for one short: the episode voice clip (it already carries Lola's bed) + SFX from out/cues.json + an end-card sting.
Run from the episode folder; writes out/mix-raw.wav (render.js loudness-normalises it to -14 LUFS)."""
import json, wave
import numpy as np

SR = 48000
spec = json.load(open('out/cues.json'))
DUR, VEND, CUES = spec['dur'], spec['voiceEnd'], spec['cues']
N = int(SR * DUR)
rng = np.random.default_rng(20261004)
tt = np.arange(N) / SR

with wave.open('out/voice.wav') as w:
    v = np.frombuffer(w.readframes(w.getnframes()), dtype='<i2').reshape(-1, 2) / 32768
voice = np.zeros((N, 2)); voice[:min(N, len(v))] = v[:N]
sfx = np.zeros((N, 2)); sting = np.zeros((N, 2))


def hz(m): return 440 * 2 ** ((m - 69) / 12)
def T(d): return np.arange(int(d * SR)) / SR


def add(buf, sig, start, pan=0.0, vol=1.0):
    i = int(start * SR)
    if i >= N: return
    if i < 0: sig, i = sig[-i:], 0
    j = min(N, i + len(sig)); s = sig[: j - i] * vol
    buf[i:j, 0] += s * np.sqrt(.5 * (1 - pan)); buf[i:j, 1] += s * np.sqrt(.5 * (1 + pan))


def svf(x, fc, q=.7, mode='band'):
    fc = np.broadcast_to(np.asarray(fc, float), x.shape)
    f = 2 * np.sin(np.pi * np.minimum(fc, SR / 6) / SR)
    low = band = 0.0; out = np.empty_like(x); d = 1 / q
    for n in range(len(x)):
        high = x[n] - low - d * band
        band += f[n] * high; low += f[n] * band
        out[n] = band if mode == 'band' else (low if mode == 'low' else high)
    return out


def noise(d): return rng.standard_normal(int(d * SR))
def s_whoosh(v):
    d = .5; t = T(d); fc = 300 + 3800 * np.sin(np.pi * t / d) ** 2
    return svf(noise(d), fc, 1.4) * np.sin(np.pi * t / d) ** 1.5 * 1.3 * v
def s_pop(f):
    t = T(.09); fr = 700 * f * (1 + .8 * np.exp(-t * 60))
    return np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 45) * .6
def s_tick(f):
    t = T(.04); base = (2600, 2100, 3200)[f]
    return (np.sin(2 * np.pi * base * t) * .6 + svf(noise(.04), base, 2) * .8) * np.exp(-t * 150) * .45
def s_thud():
    t = T(.3); fr = 50 + 90 * np.exp(-t * 25)
    return (np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 14) + svf(noise(.3), 400, .8, 'low') * np.exp(-t * 40) * .6) * .85
def s_impact(v):
    t = T(.7); fr = 38 + 120 * np.exp(-t * 18)
    return (np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 6) + .7 * svf(noise(.7), 2500, .6) * np.exp(-t * 30)) * .9 * v
def s_boom(v):
    t = T(1.4); fr = 32 + 90 * np.exp(-t * 10)
    return (np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 2.6) + .5 * svf(noise(1.4), 900, .5, 'low') * np.exp(-t * 5)) * v
def s_chime(n):
    t = T(1.6); f = hz(n)
    return sum(a * np.sin(2 * np.pi * f * m * t) * np.exp(-t * (2 + m)) for m, a in ((1, 1), (2.76, .4), (5.4, .2), (2, .3))) * np.minimum(t / .002, 1) * .3
def s_blip(n):
    t = T(.3); f = hz(n)
    sig = np.sign(np.sin(2 * np.pi * f * t)) * .3 + np.sin(2 * np.pi * f * t)
    return svf(sig, 2400, .9, 'low') * np.exp(-t * 12) * .4
def s_knock(v):
    t = T(.12)
    return (np.sin(2 * np.pi * 190 * t) + .5 * np.sin(2 * np.pi * 470 * t) + svf(noise(.12), 1200, 1.5) * .6) * np.exp(-t * 45) * .6 * v
def s_swish():
    d = .28; t = T(d)
    return svf(noise(d), 1500 + 6000 * t / d, 2) * np.sin(np.pi * t / d) * .5
def s_riser(d):
    t = T(d); x = t / d
    return svf(noise(d), 300 + 6000 * x ** 2, 2.2) * x ** 2 * .9 + np.sin(2 * np.pi * np.cumsum(220 * 2 ** (2 * x)) / SR) * .2 * x ** 1.5


def pluck(m, vol, decay=.3):
    t = T(1.4); f = hz(m)
    sig = np.sin(2 * np.pi * f * t) + .4 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t * 5) + .15 * np.sin(2 * np.pi * 3 * f * t) * np.exp(-t * 9)
    return sig * np.minimum(t / .003, 1) * np.exp(-t / decay) * vol
def kick(vol):
    t = T(.3); f = 48 + 120 * np.exp(-t * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 10) * vol
clap_sig = svf(noise(.18), 1600, 1.1) * np.exp(-T(.18) * 24) * 2


def s_sting(at):
    """Two bars at 120 bpm under the end card: E-minor pentatonic plucks, kick + clap, a final chord."""
    beat = .5
    arp = [64, 67, 71, 74, 76, 74, 71, 79]
    for i, m in enumerate(arp):
        add(sting, pluck(m, .32), at + i * beat / 2, (-.35, .35)[i % 2])
        add(sting, pluck(m - 24, .3, .18), at + i * beat / 2) if i % 2 == 0 else None
    for b in range(6):
        add(sting, kick(.9), at + b * beat)
        if b % 2: add(sting, clap_sig, at + b * beat, .1, .35)
    for m in (52, 64, 67, 71, 76):
        add(sting, pluck(m, .22, .9), at + 3.0)


for c in CUES:
    ty, at = c['type'], c['t']
    if ty == 'whoosh': add(sfx, s_whoosh(c.get('v', 1)), at)
    elif ty == 'pop': add(sfx, s_pop(c.get('f', 1)), at, rng.uniform(-.25, .25), c.get('v', 1))
    elif ty == 'tick': add(sfx, s_tick(c.get('f', 0)), at, rng.uniform(-.3, .3))
    elif ty == 'thud': add(sfx, s_thud(), at)
    elif ty == 'impact': add(sfx, s_impact(c.get('v', 1)), at)
    elif ty == 'boom': add(sfx, s_boom(c.get('v', 1)), at)
    elif ty == 'chime': add(sfx, s_chime(c['n']), at, .15)
    elif ty == 'blip': add(sfx, s_blip(c['n']), at, rng.uniform(-.3, .3))
    elif ty == 'knock': add(sfx, s_knock(c.get('v', 1)), at, -.3)
    elif ty == 'swish': add(sfx, s_swish(), at, .2)
    elif ty == 'riser': add(sfx, s_riser(c['d']), at)
    elif ty == 'sting': s_sting(at)
    else: raise SystemExit(f'unknown cue type {ty}')

# Duck the SFX while someone is talking so the words always win.
env = np.abs(voice).max(axis=1)
k = int(.08 * SR); env = np.convolve(env, np.ones(k) / k, mode='same')
speaking = np.clip(env / .05, 0, 1)
sfx *= (1 - .55 * speaking)[:, None]

sfx /= np.abs(sfx).max() + 1e-9
sting /= np.abs(sting).max() + 1e-9
vpeak = np.abs(voice).max() + 1e-9
mix = voice / vpeak + .42 * sfx + .55 * sting
mix *= np.clip((DUR - tt) / .6, 0, 1)[:, None]
mix = np.tanh(mix * 1.1) / np.tanh(1.1)
mix = mix / (np.abs(mix).max() + 1e-9) * .95
with wave.open('out/mix-raw.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype('<i2').tobytes())
print('mix ok', round(DUR, 2), 's,', len(CUES), 'cues')
