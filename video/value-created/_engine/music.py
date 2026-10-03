"""v2 soundtrack: 100 bpm warm groove + SFX from out/cues.json (real-time cues exported by scene.js). Writes out/music-raw.wav."""
import json, os, wave
import numpy as np

SR = 48000
spec = json.load(open('out/cues.json'))
DUR, CUES, MK = spec['dur'], spec['cues'], spec['markers']
N = int(SR * DUR)
rng = np.random.default_rng(20261003)
music = np.zeros((N, 2)); sfx = np.zeros((N, 2))
tt = np.arange(N) / SR

def hz(m): return 440 * 2 ** ((m - 69) / 12)
def T(d): return np.arange(int(d * SR)) / SR

def add(buf, sig, start, pan=0.0, vol=1.0):
    i = int(start * SR)
    if i >= N: return
    if i < 0: sig, i = sig[-i:], 0
    j = min(N, i + len(sig)); s = sig[: j - i] * vol
    buf[i:j, 0] += s * np.sqrt(.5 * (1 - pan)); buf[i:j, 1] += s * np.sqrt(.5 * (1 + pan))

def svf(x, fc, q=.7, mode='band'):
    """Chamberlin state-variable filter; fc may be an array (swept)."""
    fc = np.broadcast_to(np.asarray(fc, float), x.shape)
    f = 2 * np.sin(np.pi * np.minimum(fc, SR / 6) / SR)
    low = band = 0.0; out = np.empty_like(x); d = 1 / q
    for n in range(len(x)):
        high = x[n] - low - d * band
        band += f[n] * high; low += f[n] * band
        out[n] = band if mode == 'band' else (low if mode == 'low' else high)
    return out

# ---------------- music ----------------
BEAT = 60 / 100
BAR = 4 * BEAT
chords = [  # bass, pad voices, arp pool
    (41, [57, 60, 64, 67], [69, 72, 76, 79]),
    (45, [55, 60, 64, 67], [67, 72, 76, 79]),
    (38, [53, 57, 60, 64], [65, 69, 72, 76]),
    (46, [53, 57, 62, 65], [65, 69, 74, 77]),
]
groove, brk, drop, end = MK['groove'], MK['breakdown'], MK['drop'], MK['end']

def pad_note(m, dur, vol):
    t = T(dur + 1.2)
    sig = sum(np.sin(2 * np.pi * hz(m) * (1 + c / 1200) * t + rng.uniform(0, 6)) for c in (-6, 0, 6)) / 3
    sig += .2 * np.sin(2 * np.pi * hz(m) * 2 * t)
    return sig * np.clip(t / .5, 0, 1) * np.clip((dur + 1.2 - t) / 1.2, 0, 1) * vol

def pluck(m, vol, decay=.35):
    t = T(1.6); f = hz(m)
    sig = np.sin(2 * np.pi * f * t) + .35 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t * 4) + .12 * np.sin(2 * np.pi * 3 * f * t) * np.exp(-t * 8)
    return sig * np.minimum(t / .004, 1) * np.exp(-t / decay) * vol

def kick(vol):
    t = T(.35); f = 45 + 110 * np.exp(-t * 28)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9) * vol

hat_src = rng.standard_normal(int(.06 * SR))
hat_sig = (hat_src - svf(hat_src, 6000, .7, 'low')) * np.exp(-T(.06) * 70)
clap_src = rng.standard_normal(int(.2 * SR))
clap_sig = svf(clap_src, 1500, 1.2) * np.exp(-T(.2) * 22) * 2.2

in_groove = lambda x: groove <= x < end and not (brk <= x < drop)
pos, k = 0.0, 0
while pos < end:
    bass, voices, pool = chords[k % 4]
    for v in voices: add(music, pad_note(v, BAR, .03), pos, rng.uniform(-.35, .35))
    for b in range(8):
        x = pos + b * BEAT / 2
        if x >= end: break
        if b % 2 == 0 and in_groove(x): add(music, kick(.55), x)
        if b % 2 == 1 and in_groove(x): add(music, hat_sig, x, .3, .12)
        if b in (2, 6) and in_groove(x) and x >= drop: add(music, clap_sig, x, -.1, .1)
        if x >= groove and not (brk <= x < drop):
            add(music, pluck(bass - 12 + (12 if b in (3, 7) else 0), .16, .18), x)
            add(music, pluck(pool[(b * 3 + k) % 4] + (12 if x >= drop and b % 4 == 3 else 0), .04, .3), x, (-.4, .4)[b % 2])
        elif x < groove and b % 4 == 0:
            add(music, pluck(pool[(b + k) % 4], .045, .6), x, (-.3, .3)[(b // 4) % 2])
    pos += BAR; k += 1

# sidechain pump on the groove
beat_phase = np.mod(tt - groove, BEAT)
pump = np.where((tt >= groove) & (tt < end) & ~((tt >= brk) & (tt < drop)), 1 - .45 * np.exp(-beat_phase * 10), 1)
music *= pump[:, None]
# final chord rings out under the end card
for v in chords[0][1] + [chords[0][0] - 12]: add(music, pad_note(v, DUR - end, .04), end)

# ---------------- sfx ----------------
def noise(d): return rng.standard_normal(int(d * SR))

def s_whoosh(v):
    d = .55; t = T(d); fc = 300 + 3500 * np.sin(np.pi * t / d) ** 2
    return svf(noise(d), fc, 1.4) * np.sin(np.pi * t / d) ** 1.5 * 1.4 * v
def s_pop(f):
    t = T(.09); fr = 700 * f * (1 + .8 * np.exp(-t * 60))
    return np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 45) * .55
def s_tick(f):
    t = T(.04); base = (2600, 2100, 3200)[f]
    return (np.sin(2 * np.pi * base * t) * .6 + svf(noise(.04), base, 2) * .8) * np.exp(-t * 150) * .45
def s_thud():
    t = T(.3); fr = 50 + 90 * np.exp(-t * 25)
    return (np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 14) + svf(noise(.3), 400, .8, 'low') * np.exp(-t * 40) * .6) * .8
def s_impact(v):
    t = T(.8); fr = 38 + 120 * np.exp(-t * 18)
    body = np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 6)
    crack = svf(noise(.8), 2500, .6) * np.exp(-t * 30)
    return (body + .7 * crack) * .9 * v
def s_boom(v):
    t = T(1.6); fr = 32 + 90 * np.exp(-t * 10)
    body = np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 2.6)
    air = svf(noise(1.6), 900, .5, 'low') * np.exp(-t * 5)
    return (body + .5 * air + .4 * svf(noise(1.6), 3000, .7) * np.exp(-t * 25)) * v
def s_chime(n):
    t = T(2.2); f = hz(n)
    return sum(a * np.sin(2 * np.pi * f * m * t) * np.exp(-t * (1.6 + m)) for m, a in ((1, 1), (2.76, .4), (5.4, .2), (2, .3))) * np.minimum(t / .002, 1) * .32
def s_blip(n):
    t = T(.35); f = hz(n)
    sig = np.sign(np.sin(2 * np.pi * f * t)) * .3 + np.sin(2 * np.pi * f * t)
    return svf(sig, 2400, .9, 'low') * np.exp(-t * 11) * .4
def s_knock(v):
    t = T(.12)
    return (np.sin(2 * np.pi * 190 * t) + .5 * np.sin(2 * np.pi * 470 * t) + svf(noise(.12), 1200, 1.5) * .6) * np.exp(-t * 45) * .55 * v
def s_scratch():
    d = .32; t = T(d)
    return svf(noise(d), 4200, 1.8) * (np.sin(np.pi * t / d) ** .7) * (.7 + .3 * np.sin(2 * np.pi * 22 * t)) * .22
def s_swish():
    d = .3; t = T(d)
    return svf(noise(d), 1500 + 6000 * t / d, 2) * np.sin(np.pi * t / d) * .5
def s_drain(d):
    t = T(d); fr = 520 * np.exp(-t / d * 1.5) * (1 + .06 * np.sin(2 * np.pi * 7 * t))
    tone = np.sin(2 * np.pi * np.cumsum(fr) / SR) * .25
    bub = np.zeros(len(t))
    for i in range(18):
        st = int(rng.uniform(0, d - .08) * SR); bt = T(.06)
        bf = rng.uniform(250, 700) * (1 + 3 * bt)
        bub[st:st + len(bt)] += np.sin(2 * np.pi * np.cumsum(bf) / SR) * np.exp(-bt * 60) * .5
    return (tone + bub) * np.minimum(t / .1, 1) * np.clip((d - t) / .4, 0, 1)
def s_riser(d):
    t = T(d); x = t / d
    sw = svf(noise(d), 300 + 6000 * x ** 2, 2.2) * x ** 2 * 1.1
    tone = np.sin(2 * np.pi * np.cumsum(220 * 2 ** (2 * x)) / SR) * .25 * x ** 1.5
    return sw + tone

for c in CUES:
    ty, at = c['type'], c['t']
    if ty == 'whoosh': add(sfx, s_whoosh(c.get('v', 1)), at, 0)
    elif ty == 'pop': add(sfx, s_pop(c.get('f', 1)), at, rng.uniform(-.2, .2))
    elif ty == 'tick': add(sfx, s_tick(c.get('f', 0)), at, rng.uniform(-.3, .3))
    elif ty == 'thud': add(sfx, s_thud(), at)
    elif ty == 'impact': add(sfx, s_impact(c.get('v', 1)), at)
    elif ty == 'boom': add(sfx, s_boom(c.get('v', 1)), at)
    elif ty == 'chime': add(sfx, s_chime(c['n']), at, .15)
    elif ty == 'blip': add(sfx, s_blip(c['n']), at, rng.uniform(-.3, .3))
    elif ty == 'knock': add(sfx, s_knock(c.get('v', 1)), at, -.35)
    elif ty == 'scratch': add(sfx, s_scratch(), at, rng.uniform(-.4, .4))
    elif ty == 'swish': add(sfx, s_swish(), at, .2)
    elif ty == 'drain': add(sfx, s_drain(c['d']), at, 0)
    elif ty == 'riser': add(sfx, s_riser(c['d']), at, 0)

# short room reverb on everything
def reverb(x, secs=1.6, mix=.22):
    irn = int(secs * SR); it = np.arange(irn) / SR
    size = 1 << int(np.ceil(np.log2(N + irn))); out = np.empty_like(x)
    for ch in range(2):
        ir = rng.standard_normal(irn) * np.exp(-it / .35); ir /= np.sqrt((ir ** 2).sum())
        wet = np.fft.irfft(np.fft.rfft(x[:, ch], size) * np.fft.rfft(ir, size), size)[:N]
        out[:, ch] = x[:, ch] + mix * wet
    return out

music = reverb(music, mix=.3); sfx = reverb(sfx, mix=.18)
music /= np.abs(music).max() + 1e-9; sfx /= np.abs(sfx).max() + 1e-9
mix = .55 * music + .8 * sfx
mix *= (np.clip(tt / .05, 0, 1) * np.clip((DUR - tt) / 1.5, 0, 1))[:, None]
mix = np.tanh(mix * 1.2) / np.tanh(1.2)
mix = mix / np.abs(mix).max() * .9
with wave.open('out/music-raw.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype('<i2').tobytes())
print('ok', round(DUR, 2), 's,', len(CUES), 'cues')
