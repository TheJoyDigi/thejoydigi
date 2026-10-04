"""Compose the Game Table kit: intro, outro, seven stingers."""
import numpy as np
from kit import *

# signature motif, two bars of swung 16ths (step, note, velocity): a question that leans on D, an answer home to E
MOTIF_A = [(0, 'E4', 1), (3, 'G4', .8), (4, 'A4', .9), (7, 'B4', .85), (8, 'D5', 1), (10, 'B4', .7), (12, 'A4', .85), (14, 'G4', .75), (15, 'A4', .6)]
MOTIF_B = [(0, 'B4', 1), (3, 'G4', .75), (4, 'E4', .9), (10, 'D4', .7), (11, 'E4', .8), (12, 'G4', .9)]
BASS_A = [(0, 'E2', 1, 'v3'), (6, 'E2', .55, 'v1'), (8, 'G1', .85, 'v3'), (11, 'A2', .7, 'v1'), (14, 'B1', .8, 'v1')]
BASS_B = [(0, 'E2', 1, 'v3'), (6, 'D2', .6, 'v1'), (8, 'D2', .8, 'v1'), (11, 'B1', .75, 'v1'), (14, 'D2', .7, 'v1')]

def bass(tr, t, n, vel, layer):
    if vel <= 0: return
    tr['bass'].add(bas.note(n, layer), t, vel)

def marimba(tr, t, n, vel=1., layer='med'):
    tr['mar'].add(mar.note(n, layer), t, vel)

def click(tr, t, kind='wood_pp', vel=1., p=None):
    tr['click'].add(P[kind].hit(), t, vel, p)

def conga_bar(tr, bar, t0=0., vel=1.):
    # tumbao-flavoured: muted heel/tip on the beats, open tones on 4-and and 1, quinto slap answer
    for s, k, v in [(2, 'conga_mute', .5), (4, 'quinto_mute', .75), (6, 'conga', .85), (7, 'conga', .8), (10, 'conga_mute', .45),
                    (12, 'quinto_mute', .7), (14, 'tumba', .9), (15, 'tumba', .75)]:
        tr['conga'].add(P[k].hit(), at(bar, s, t0), v * vel, -.35 if 'quinto' in k else (.2 if 'tumba' in k else -.1))

def shaker_bar(tr, bar, t0=0., vel=1., steps=range(16)):
    for s in steps:
        k = 'shk_up' if s % 2 else 'shk_dn'
        tr['shk'].add(P[k].hit(), at(bar, s, t0), vel * (.95 if s % 4 == 0 else .6 if s % 2 == 0 else .75))

def motif(tr, bar, part, t0=0., vel=1., dbl=False):
    for s, n, v in part:
        t = at(bar, s, t0); lead(t, n, tr, v * vel)
        if dbl: marimba(tr, t + .004, n2m(n) - 12, v * vel * .55, 'med')

def bassline(tr, bar, part, t0=0., vel=1.):
    for s, n, v, l in part: bass(tr, at(bar, s, t0), n, v * vel, l)

def coin_hit(tr, t, vel=1.):
    tr['coin'].add(coin(), t, vel)

# ---------------- INTRO (18 s) ----------------
def intro():
    tr = new_tracks(); B = 16 * STEP  # one bar = 2.4 s
    # bar 0: game pieces placed on the table, sparse
    for s, k, v, p in [(0, 'wood_mp', .9, -.2), (5, 'slit_hi_soft', .8, .3), (8, 'wood_pp', .8, .1), (11, 'slit_lo', .7, -.3), (14, 'wood_pp', .7, .25), (15, 'wood_pp', .55, .3)]:
        click(tr, at(0, s), k, v, p)
    # bar 1: pieces keep moving, bass enters, shaker sneaks in
    for s, k, v, p in [(0, 'wood_mp', .8, -.2), (6, 'slit_hi_soft', .7, .3), (10, 'wood_pp', .7, .1), (13, 'slit_lo', .6, -.25)]:
        click(tr, at(1, s), k, v, p)
    bassline(tr, 1, BASS_A, vel=.8)
    shaker_bar(tr, 1, vel=.55, steps=range(8, 16))
    tr['caj'].add(P['cajon_s'].hit(), at(1, 12), .5)
    # bars 2-3: congas + kalimba motif
    for b in (2, 3):
        conga_bar(tr, b, vel=.8 if b == 2 else .9); shaker_bar(tr, b, vel=.7)
        bassline(tr, b, BASS_A if b == 2 else BASS_B)
        for s, k, v in [(5, 'wood_pp', .45), (13, 'slit_hi_soft', .4)]: click(tr, at(b, s), k, v, .35)
    motif(tr, 2, MOTIF_A); motif(tr, 3, MOTIF_B)
    # bars 4-5: full groove, marimba doubles an octave down and comps, cajon backbeat
    for b in (4, 5):
        conga_bar(tr, b); shaker_bar(tr, b, vel=.8)
        bassline(tr, b, BASS_A if b == 4 else BASS_B)
        for s, k in [(0, 'cajon_b'), (10, 'cajon_b')]: tr['caj'].add(P[k].hit(), at(b, s), .8)
        for s in (4, 12): tr['caj'].add(P['cajon_s'].hit(), at(b, s), .7)
        for s, notes in [(2, ('E3', 'B3', 'D4')), (6, ('G3', 'D4', 'E4')), (10, ('A3', 'E4', 'G4')), (14, ('G3', 'B3', 'D4'))]:
            for i, n in enumerate(notes): marimba(tr, at(b, s) + i * .006, n, .42, 'soft')
    motif(tr, 4, MOTIF_A, dbl=True)
    # answer lifts: the second half climbs instead of falling home
    motif(tr, 5, [(0, 'B4', 1), (3, 'D5', .8), (4, 'E5', .95), (7, 'D5', .7), (8, 'B4', .85), (10, 'A4', .7), (11, 'B4', .75)], dbl=True)
    # bar 6: pickup fill then the logo hit on beat 3
    for s, k, v in [(0, 'quinto', .8), (1, 'quinto', .6), (2, 'conga', .8), (3, 'conga', .65), (4, 'tumba', .85), (5, 'tumba', .7)]:
        tr['conga'].add(P[k].hit(), at(6, s), v, -.3 if 'quinto' in k else .15)
    bass(tr, at(6, 0), 'B1', .8, 'v1'); bass(tr, at(6, 4), 'D2', .75, 'v1')
    lead(at(6, 4), 'B4', tr, .8); lead(at(6, 6), 'D5', tr, .85)
    click(tr, at(6, 6), 'wood_mp', .85, -.15); click(tr, at(6, 7), 'wood_f', .75, .15)  # the last move before the hit
    hit = at(6, 8)
    lead(hit, 'E5', tr, 1.); lead(hit + .008, 'B4', tr, .7); lead(hit + .016, 'E4', tr, .65)
    for i, n in enumerate(('E3', 'B3', 'E4', 'G4')): marimba(tr, hit + i * .005, n, .95 if i else 1., 'loud')
    bass(tr, hit, 'E1', 1., 'v3'); bass(tr, hit + .01, 'E2', .55, 'v3')
    tr['conga'].add(P['tumba'].hit(), hit, .95, .1); tr['caj'].add(P['cajon_bf'].hit(), hit, 1.)
    click(tr, hit, 'slit_lo_hard', .8, 0)
    coin_hit(tr, hit + .02, .9)
    # marimba ring-out roll underneath the tail, warm and soft
    for k in range(14):
        t = hit + .35 + k * .085
        for n in ('E3', 'B3'): marimba(tr, t + rng.uniform(0, .01), n, .22 * (1 - k / 16), 'soft')
    return render(tr.values(), 18.0, fade=.6, name='intro_18s.wav')

# ---------------- OUTRO (14 s) ----------------
def outro():
    tr = new_tracks()
    # recap: motif at a gentler touch, half-time bass, light hand percussion
    motif(tr, 0, MOTIF_A, vel=.8)
    bass(tr, at(0, 0), 'E2', .9, 'v3'); bass(tr, at(0, 8), 'G1', .7, 'v3'); bass(tr, at(0, 14), 'B1', .55, 'v1')
    shaker_bar(tr, 0, vel=.45, steps=range(0, 16, 2))
    for s, k, v in [(6, 'conga_soft', .6), (7, 'conga_soft', .5), (14, 'tumba_soft', .65)]: tr['conga'].add(P[k].hit(), at(0, s), v)
    click(tr, at(0, 12), 'wood_pp', .45, .3)
    # bar 1: marimba takes the answer low and slow
    for s, n, v in [(0, 'B3', .9), (3, 'G3', .7), (4, 'E3', .8), (10, 'D4', .65), (11, 'E4', .75), (12, 'G4', .8)]:
        marimba(tr, at(1, s), n, v, 'med')
    bass(tr, at(1, 0), 'E2', .85, 'v3'); bass(tr, at(1, 8), 'D2', .7, 'v1'); bass(tr, at(1, 12), 'B1', .6, 'v1')
    shaker_bar(tr, 1, vel=.35, steps=range(0, 16, 4))
    tr['conga'].add(P['tumba_soft'].hit(), at(1, 14), .55)
    # resolve: warm E minor (add 9 colour from the kalimba), rolled marimba, low E bass
    R = at(2, 0)
    bass(tr, R, 'E1', .95, 'v3')
    for i, n in enumerate(('E3', 'B3', 'D4', 'G4')): marimba(tr, R + i * .03, n, .75, 'med')
    lead(R + .12, 'B4', tr, .7); lead(R + .3, 'E4', tr, .6)
    for k in range(26):  # gentle roll, fading under the voice credit
        t = R + .5 + k * .11
        for n in ('E3', 'B3', 'G4'): marimba(tr, t + rng.uniform(0, .012), n, .2 * (1 - k / 28) ** 1.4, 'soft')
    # tail: sparse kalimba memories, far apart, leave room for the credit
    for t, n, v in [(R + 3.6, 'G4', .35), (R + 5.0, 'E4', .3), (R + 6.6, 'B3', .28)]: lead(t, n, tr, v)
    click(tr, R + 8.4, 'wood_pp', .35, .2)  # the last piece set down
    return render(tr.values(), 14.0, fade=1.2, name='outro_14s.wav')

# ---------------- STINGERS ----------------
def stinger(name, length, build):
    tr = new_tracks(); build(tr)
    for t in tr.values(): t.ev = [(x, tt + .005, g, pp) for x, tt, g, pp in t.ev]  # 5 ms lead-in, no attack on sample zero
    return render(tr.values(), length, fade=.25, name=f'stinger_{name}.wav')

def s_cold_open(tr):
    # one decisive wooden tick: woodblock attack on a hollow log-drum body
    click(tr, 0, 'wood_f', 1., 0); click(tr, .002, 'slit_hi', .55, 0); tr['caj'].add(P['cajon_s'].hit(), .001, .25)

def s_gameboard(tr):
    click(tr, 0, 'wood_mp', .95, -.2); click(tr, .075, 'slit_hi', .8, .25)
    lead(.13, 'E4', tr, .95); lead(.135, 'B4', tr, .6); marimba(tr, .13, 'E3', .7, 'med'); bass(tr, .13, 'E2', .9, 'v3')
    lead(.28, 'G4', tr, .75); lead(.43, 'A4', tr, .8); lead(.66, 'B4', tr, .6)
    tr['conga'].add(P['conga'].hit(), .43, .55)

def s_reveal(tr):
    tr['conga'].add(P['quinto'].hit(), 0, .9, -.3); tr['conga'].add(P['tumba'].hit(), .005, .9, .2)
    for i, n in enumerate(('E3', 'B3', 'D4', 'G4')): marimba(tr, .01 + i * .004, n, .95, 'loud')
    lead(.012, 'B4', tr, .9); lead(.02, 'E5', tr, .75); bass(tr, 0, 'E1', 1., 'v3')
    tr['caj'].add(P['cajon_bf'].hit(), 0, .8); coin_hit(tr, .03, 1.)

def s_inward(tr):
    # close and quiet: one low kalimba tone, a breath of shaker, a soft low marimba
    lead(0, 'E4', tr, .8); marimba(tr, .004, 'E3', .45, 'soft')
    tr['shk'].add(P['shk_hit'].hit(), .18, .35); lead(.62, 'B3', tr, .45)
    for t in tr.values(): t.send = min(.35, t.send * 1.6)

def s_move(tr):
    click(tr, 0, 'wood_mp', .9, -.2); click(tr, .075, 'wood_pp', .8, .2)
    for i, n in enumerate(('E4', 'G4', 'A4', 'B4')): lead(.02 + i * .07, n, tr, .75 + .06 * i)
    lead(.31, 'D5', tr, .95); bass(tr, .02, 'E2', .85, 'v3'); bass(tr, .31, 'B1', .8, 'v1')
    tr['conga'].add(P['quinto_mute'].hit(), .16, .6, -.3); tr['conga'].add(P['conga'].hit(), .31, .75, .1)
    tr['shk'].add(P['shk_up'].hit(), .24, .6)

def s_takeaway(tr):
    bass(tr, 0, 'E1', .95, 'v3')
    for i, n in enumerate(('E3', 'G3', 'B3', 'D4')): marimba(tr, i * .025, n, .8, 'med')
    for i, n in enumerate(('B4', 'A4', 'G4')): lead(.03 + i * .09, n, tr, .8 - .05 * i)
    lead(.3, 'E4', tr, .9); marimba(tr, .3, 'E4', .5, 'soft')
    for k in range(10):
        for n in ('E3', 'B3'): marimba(tr, .55 + k * .1 + rng.uniform(0, .01), n, .18 * (1 - k / 11), 'soft')

def s_teaser(tr):
    # soft lift that stays open on D: a question for next time
    tr['shk'].add(P['shk_roll'].hit(), 0, .28)
    for t, n, v in [(0, 'A4', .7), (.12, 'B4', .8), (.24, 'D5', .9)]: lead(t, n, tr, v)
    marimba(tr, .0, 'G3', .45, 'soft'); marimba(tr, .24, 'D4', .5, 'soft'); bass(tr, .0, 'A2', .55, 'v1')
    tr['conga'].add(P['conga_soft'].hit(), .24, .4)

if __name__ == '__main__':
    intro(); outro()
    stinger('cold_open', 1.2, s_cold_open)
    stinger('gameboard', 2.8, s_gameboard)
    stinger('reveal', 3.0, s_reveal)
    stinger('inward', 3.0, s_inward)
    stinger('move', 2.6, s_move)
    stinger('takeaway', 3.0, s_takeaway)
    stinger('teaser', 2.6, s_teaser)
    print('rendered')
