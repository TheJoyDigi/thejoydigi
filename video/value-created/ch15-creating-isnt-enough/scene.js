/* Value, Created Ch 15 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 15, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [10.9, 7.6], [16, 11.2], [20.7, 14.5], [27.6, 19.3], [33.1, 23.2], [40.3, 28.2], [47.1, 33], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const FLASK = .45, FACT = 1.9, STREAM = 3.9, DOT_N = 10, DOT_DT = .09, DOT_TR = .7;
const HALF_L = 7.2, HALF_D = 7.9, HALF_R = 8.9;
const DOC = 11.3, HL = 12.3, ARR = [13.2, 13.55, 13.9];
const GRID0 = 16.5, GRID_DT = .02, SELLER = 18.4;
const DROP = 23.6, FALL_L = [21.7, 22.1, 22.5, 22.9], FALL_R = [0, 1, 2, 3, 4].map(k => DROP + .05 + k * .14), FALL_DUR = .5;
const PAGE = 28.0, SIG0 = 28.8, SIG_DUR = 1.5, SEAL = 30.5;
const BAR = 33.5, FLIP = 36.0, FLIP_DUR = .9, HIT = FLIP + FLIP_DUR;
const SWIPES = [6.4, 20.7, 33.1];
const E = 46.85;
const IMPACTS = [[FACT + .3, 4], [STREAM + .25, 9], [DOT_N * DOT_DT + STREAM + DOT_TR, 6], [HALF_L + .3, 4], [HALF_R + .25, 12], [DOC + .3, 4], [HL + .2, 5], ...ARR.map(a => [a + .25, 4]),
  [SELLER + .3, 9], [DROP - .9, 4], [DROP, 16], [DROP + .45, 5], [SEAL, 11], [HIT, 12], [41.4, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 20.7], [20.7, 33.1], [33.1, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
[.45, .6].forEach((x, i) => cue(x + .1, 'blip', { n: [57, 62][i] }));
cue(FLASK, 'whoosh', { v: .3 }); cue(FLASK + .35, 'thud'); cue(FACT, 'whoosh', { v: .3 }); cue(FACT + .35, 'thud'); cue(FACT + .4, 'blip', { n: 55 });
cue(3.4, 'pop', { f: 1 });
cue(STREAM, 'whoosh', { v: .35 }); cue(STREAM + .25, 'impact', { v: .8 }); cue(STREAM + .3, 'drain', { d: 1.3 }); cue(4.7, 'pop', { f: 1.1 });
for (let i = 0; i < DOT_N; i++) cue(STREAM + .2 + i * DOT_DT + DOT_TR, 'tick', { f: i % 3 });
cue(STREAM + DOT_N * DOT_DT + DOT_TR + .05, 'chime', { n: 72 });
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(8.5, 'pop', { f: .9 });
cue(HALF_L, 'whoosh', { v: .3 }); cue(HALF_L + .3, 'thud'); cue(HALF_L + .35, 'blip', { n: 60 });
cue(HALF_D, 'swish');
cue(HALF_R - .4, 'riser', { d: .4 }); cue(HALF_R + .25, 'impact', { v: .8 }); cue(HALF_R + .25, 'chime', { n: 79 }); cue(HALF_R + .3, 'thud');
cue(11.1, 'pop', { f: 1.2 }); cue(12.8, 'pop', { f: 1 });
cue(DOC, 'whoosh', { v: .3 }); cue(DOC + .3, 'thud');
for (let i = 0; i < 6; i++) cue(DOC + .5 + i * .1, 'tick', { f: 2 });
cue(HL, 'swish'); cue(HL + .2, 'blip', { n: 67 }); cue(HL + .2, 'impact', { v: .6 });
ARR.forEach((a, i) => { cue(a, 'whoosh', { v: .25 }); cue(a + .25, 'blip', { n: [64, 69, 76][i] }); cue(a + .25, 'thud'); });
cue(15.6, 'chime', { n: 72 });
cue(16.2, 'pop', { f: 1.2 }); cue(17.9, 'pop', { f: 1 });
for (let i = 0; i < 60; i += 3) cue(GRID0 + i * GRID_DT, 'tick', { f: (i / 3) % 3 });
cue(SELLER - .1, 'whoosh', { v: .35 }); cue(SELLER + .3, 'impact', { v: .8 }); cue(SELLER + .3, 'chime', { n: 76 }); cue(SELLER + .3, 'thud');
cue(20.2, 'riser', { d: DROP - 20.2 }); cue(21.0, 'pop', { f: 1 });
FALL_L.forEach((s, i) => { cue(s + FALL_DUR, 'thud'); cue(s + FALL_DUR + .02, 'blip', { n: [55, 57, 60, 62][i] }); });
for (let x = 22.95, k = 0; x < DROP - .05; x += .12 - k * .004, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 }); cue(DROP + .45, 'thud');
FALL_R.forEach((s, i) => cue(s + FALL_DUR, 'blip', { n: [64, 67, 71, 74, 79][i] }));
cue(27.8, 'pop', { f: 1.2 }); cue(29.2, 'pop', { f: 1 });
cue(PAGE, 'whoosh', { v: .3 }); cue(PAGE + .3, 'thud');
for (let x = SIG0; x < SIG0 + SIG_DUR; x += .1) cue(x, 'tick', { f: 0 });
cue(SEAL - .3, 'riser', { d: .3 }); cue(SEAL, 'impact', { v: .9 }); cue(SEAL, 'chime', { n: 76 }); cue(SEAL + .1, 'pop', { f: 1.2 });
cue(33.3, 'pop', { f: 1.1 }); cue(BAR, 'whoosh', { v: .3 }); cue(BAR + .35, 'thud'); cue(34.4, 'pop', { f: .9 });
cue(FLIP - .3, 'riser', { d: .3 });
for (let x = FLIP; x < HIT; x += .1) cue(x, 'tick', { f: 1 });
cue(HIT, 'impact', { v: .9 }); cue(HIT, 'chime', { n: 79 }); cue(HIT + .1, 'pop', { f: 1.2 });
cue(40.0, 'whoosh', { v: .35 }); cue(40.45, 'thud'); cue(41.4, 'impact', { v: .9 }); cue(42.35, 'swish'); cue(43.4, 'pop', { f: .9 });
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: 6.4, breakdown: 20.2, drop: DROP, end: 46.75 };

/* ---------- shared drawings ---------- */
function flask(x, y, s, frac, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const path = () => {
    ctx.beginPath(); ctx.moveTo(-30, -230); ctx.lineTo(-30, -120); ctx.lineTo(-115, -14); ctx.quadraticCurveTo(-125, 0, -105, 0); ctx.lineTo(105, 0);
    ctx.quadraticCurveTo(125, 0, 115, -14); ctx.lineTo(30, -120); ctx.lineTo(30, -230); ctx.closePath();
  };
  path(); ctx.fillStyle = 'rgba(58,52,44,0.10)'; ctx.fill();
  if (frac > .01) {
    ctx.save(); path(); ctx.clip();
    const ly = -frac * 150, g = ctx.createLinearGradient(0, ly, 0, 0); g.addColorStop(0, C.goldL); g.addColorStop(1, C.gold);
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-130, 0);
    for (let k = 0; k <= 26; k++) ctx.lineTo(-130 + k * 10, ly + 5 * Math.sin(t * 4 + k * .7));
    ctx.lineTo(130, 0); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#FFF4D6';
    for (let i = 0; i < 6; i++) { const ph = (t * .8 + i * .17) % 1; ctx.globalAlpha = (1 - ph) * .9; ctx.beginPath(); ctx.arc((i - 2.5) * 30, -ph * frac * 140, 5 + (i % 3) * 2, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
  }
  path(); ctx.lineWidth = 6 / s; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round'; ctx.stroke();
  rr(-42, -246, 84, 18, 6); ctx.fillStyle = C.paper; ctx.fill(); ctx.stroke();
  ctx.restore();
}
function factory(x, y, lit, t) {
  ctx.save(); ctx.translate(x, y);
  ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round';
  rr(100, -330, 36, 140, 4); ctx.fillStyle = 'rgba(58,52,44,0.18)'; ctx.fill(); ctx.stroke();
  for (let i = 0; i < 3; i++) { const ph = (t * .5 + i * .33) % 1; ctx.globalAlpha = (1 - ph) * .5; ctx.beginPath(); ctx.arc(118 + ph * 30, -350 - ph * 90, 14 + ph * 16, 0, Math.PI * 2); ctx.fillStyle = C.ink2; ctx.fill(); }
  ctx.globalAlpha = 1;
  rr(-170, -200, 340, 200, 10); ctx.fillStyle = 'rgba(58,52,44,0.12)'; ctx.fill(); ctx.stroke();
  for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-170 + i * 113, -200); ctx.lineTo(-170 + i * 113, -260); ctx.lineTo(-170 + (i + 1) * 113, -200); ctx.closePath(); ctx.fillStyle = 'rgba(58,52,44,0.12)'; ctx.fill(); ctx.stroke(); }
  rr(-135, -165, 270, 54, 8); ctx.fillStyle = C.ink; ctx.fill();
  ctx.font = font('sans', 28, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream; ctx.fillText('GOODYEAR', 2.5, -126); ctx.textAlign = 'left'; ctx.letterSpacing = '0px';
  [-110, -30, 50].forEach((wx, i) => { rr(wx, -86, 60, 56, 6); ctx.fillStyle = lit > i ? C.goldL : C.paper; ctx.fill(); ctx.lineWidth = 5; ctx.stroke(); });
  ctx.restore();
}
function basket(x, y, stroke, fill, lw) {
  ctx.save(); ctx.translate(x, y); ctx.lineJoin = ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(0, -70, 70, Math.PI, 2 * Math.PI); ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-90, -70); ctx.lineTo(90, -70); ctx.lineTo(66, 0); ctx.lineTo(-66, 0); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.stroke();
  ctx.lineWidth = lw * .6; ctx.beginPath();
  [-40, 0, 40].forEach(k => { ctx.moveTo(k * 1.15, -70); ctx.lineTo(k * .85, 0); }); ctx.moveTo(-78, -35); ctx.lineTo(78, -35); ctx.stroke();
  ctx.restore();
}
function fruit(x, y, r) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke(); }

/* ---------- S1: Goodyear invented it, a factory took his name (0 – 6.4) ---------- */
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'Goodyear invented', W / 2, 215, { size: 84, start: -.62, stagger: .12, end: 3.7 });
  line(t, '[vulcanized rubber.]', W / 2, 305, { size: 84, start: -.4, stagger: .12, end: 3.7 });
  line(t, 'Died [penniless.]', W / 2, 235, { size: 96, start: STREAM, stagger: .12, end: 5.95 });
  line(t, 'A tire company took his name.', W / 2, 322, { size: 50, color: C.ink2, start: 4.7, stagger: .08, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35));
  ctx.save(); ctx.globalAlpha = out;
  ctx.strokeStyle = C.ink; ctx.lineWidth = 8; ctx.lineCap = 'round';
  const gp = eo(prog(t, .3, .6)); ctx.beginPath(); ctx.moveTo(72, 820); ctx.lineTo(72 + 936 * gp, 820); ctx.stroke();
  const fp = eback(prog(t, FLASK, .45));
  if (fp > 0) {
    const drain = eio(prog(t, STREAM + .2, 1.3));
    ctx.save(); ctx.translate(230, 820); ctx.scale(fp, fp); ctx.translate(-230, -820); flask(230, 820, 1.15, .72 * (1 - .93 * drain), t); ctx.restore();
  }
  const bp = eback(prog(t, FACT, .45));
  const lit = Math.min(3, Math.floor((t - STREAM - .2 - DOT_TR) / (DOT_N * DOT_DT / 3)) + 1);
  if (bp > 0) { ctx.save(); ctx.translate(800, 820); ctx.scale(bp, bp); ctx.translate(-800, -820); factory(800, 820, t > STREAM ? Math.max(0, lit) : 0, t); ctx.restore(); }
  ctx.fillStyle = C.gold;
  for (let i = 0; i < DOT_N; i++) {
    const q = (t - STREAM - .2 - i * DOT_DT) / DOT_TR; if (q <= 0 || q >= 1) continue;
    const e = eio(q), x = (1 - e) * (1 - e) * 250 + 2 * e * (1 - e) * 480 + e * e * 720, y = (1 - e) * (1 - e) * 560 + 2 * e * (1 - e) * 360 + e * e * 650;
    ctx.beginPath(); ctx.arc(x, y, 13, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
  ring(t, STREAM + DOT_N * DOT_DT + DOT_TR, 800, 700, 40, 300, C.gold, .7, 10);
  burst(t, STREAM + DOT_N * DOT_DT + DOT_TR, 800, 700, 18, 41, C.goldL, 800, .8);
}

/* ---------- S2: creating is only half (6.4 – 10.9) ---------- */
function scene2(t) {
  if (t < 6.4 || t > 11) return;
  const end = 10.45, out = 1 - eio(prog(t, end, .35)), cx = W / 2, cy = 640, R = 200;
  line(t, 'Creating is only [half.]', W / 2, 220, { size: 76, start: 6.65, end });
  line(t, 'Capturing is the other.', W / 2, 310, { size: 56, color: C.ink2, start: 8.5, stagger: .08, end });
  ctx.save(); ctx.globalAlpha = out;
  const lp = eback(prog(t, HALF_L, .45));
  if (lp > 0) {
    ctx.save(); ctx.translate(cx, cy); ctx.scale(lp, lp);
    ctx.beginPath(); ctx.arc(0, 0, R, Math.PI / 2, Math.PI * 1.5); ctx.closePath();
    const g = ctx.createLinearGradient(-R, 0, 0, 0); g.addColorStop(0, C.gold); g.addColorStop(1, C.goldL); ctx.fillStyle = g; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
  }
  const dp = eo(prog(t, HALF_D, .4)), rp = eback(prog(t, HALF_R, .4));
  if (dp > 0 && rp <= 0) {
    ctx.save(); ctx.globalAlpha = out * dp; ctx.strokeStyle = C.ink2; ctx.lineWidth = 5; ctx.setLineDash([16, 12]);
    ctx.beginPath(); ctx.arc(cx, cy, R, -Math.PI / 2, Math.PI / 2); ctx.closePath(); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
  }
  if (rp > 0) {
    ctx.save(); ctx.translate(cx, cy); ctx.scale(rp, rp);
    ctx.beginPath(); ctx.arc(0, 0, R, -Math.PI / 2, Math.PI / 2); ctx.closePath(); ctx.fillStyle = C.fill; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
  }
  ctx.restore();
  label('CREATE', cx - 100, cy + 10, out * eo(prog(t, HALF_L + .25, .3)), C.ink, 28);
  label('CAPTURE', cx + 100, cy + 10, out * eo(prog(t, HALF_R + .2, .3)), C.cream, 28);
  ring(t, HALF_R + .25, cx + 100, cy, 40, 380, C.gold, .7, 10);
  burst(t, HALF_R + .25, cx + 100, cy, 20, 61, C.goldL, 900, .8);
}

/* ---------- S3: the better deal won (10.9 – 16) ---------- */
function scene3(t) {
  if (t < 10.9 || t > 16.1) return;
  const end = 15.55, out = 1 - eio(prog(t, end, .35));
  line(t, 'The better product lost.', W / 2, 220, { size: 70, start: 11.1, end });
  line(t, 'The better [deal] won.', W / 2, 310, { size: 70, start: 12.8, stagger: .1, end });
  const dx = 110, dy = 440, dw = 380, dh = 440;
  ctx.save(); ctx.globalAlpha = out;
  const pp = eback(prog(t, DOC, .45));
  if (pp > 0) {
    ctx.save(); ctx.translate(dx + dw / 2, dy + dh / 2); ctx.scale(pp, pp); ctx.translate(-dx - dw / 2, -dy - dh / 2);
    rr(dx, dy, dw, dh, 16); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    for (let i = 0; i < 7; i++) {
      const lw = prog(t, DOC + .5 + i * .1, .3), ly = dy + 50 + i * 52, wd = (i % 3 === 2 ? 220 : 290) * lw;
      if (i === 5) continue;
      rr(dx + 36, ly, wd, 16, 8); ctx.fillStyle = 'rgba(94,86,75,0.3)'; ctx.fill();
    }
    const hp = eo(prog(t, HL, .4)), hy = dy + 50 + 5 * 52;
    ctx.save(); ctx.translate(0, 0);
    if (hp > 0) { rr(dx + 24, hy - 12, 312 * hp, 42, 10); ctx.fillStyle = C.goldL; ctx.fill(); rr(dx + 36, hy, 270 * hp, 16, 8); ctx.fillStyle = C.ink; ctx.fill(); }
    ctx.restore();
    ctx.restore();
  }
  const hy = dy + 50 + 5 * 52 + 9, mx = 800;
  [0, 1, 2].forEach(i => {
    const my = 520 + i * 150, s = ARR[i], ap = eio(prog(t, s, .35)), mp = eback(prog(t, s + .15, .4));
    if (ap > 0) {
      ctx.strokeStyle = C.gold; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(dx + dw - 20, hy); ctx.lineTo(lerp(dx + dw - 20, 690, ap), lerp(hy, my, ap)); ctx.stroke();
    }
    if (mp > 0) {
      ctx.save(); ctx.translate(mx, my); ctx.scale(mp, mp);
      rr(-90, -55, 180, 110, 12); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
      rr(-60, -28, 120, 56, 8); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 4; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, 55); ctx.lineTo(0, 78); ctx.moveTo(-34, 78); ctx.lineTo(34, 78); ctx.lineWidth = 6; ctx.stroke(); ctx.restore();
    }
  });
  ctx.restore();
  ring(t, HL + .2, dx + dw / 2, hy, 40, 260, C.gold, .6, 8);
  ARR.forEach((a, i) => burst(t, a + .25, mx, 520 + i * 150, 8, 70 + i * 9, C.goldL, 400, .5));
}

/* ---------- S4: ten thousand can make it, one can sell it (16 – 20.7) ---------- */
function scene4(t) {
  if (t < 16 || t > 20.8) return;
  const end = 20.25, out = 1 - eio(prog(t, end, .35));
  line(t, 'Ten thousand can make it.', W / 2, 220, { size: 66, start: 16.2, end });
  line(t, 'One can [sell it.]', W / 2, 310, { size: 66, start: 17.9, stagger: .1, end });
  ctx.save(); ctx.globalAlpha = out;
  const GX = 110, GY = 450, SP = 54;
  for (let i = 0; i < 60; i++) {
    const c = i % 10, r = (i / 10) | 0, p = eback(prog(t, GRID0 + i * GRID_DT, .25)); if (p <= 0) continue;
    const jit = 3 * Math.sin(t * 9 + i) * eo(prog(t, SELLER, .4));
    ctx.beginPath(); ctx.arc(GX + c * SP + jit, GY + r * SP + 30, 15 * p, 0, Math.PI * 2); ctx.fillStyle = C.fill; ctx.fill();
  }
  const fp = eo(prog(t, GRID0 + 1.2, .5));
  ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (fp > 0) {
    ctx.beginPath(); ctx.moveTo(668, 440 + 8); ctx.lineTo(lerp(668, 756, fp), lerp(448, 612, fp)); ctx.moveTo(668, 800); ctx.lineTo(lerp(668, 756, fp), lerp(800, 668, fp)); ctx.stroke();
  }
  if (t > SELLER + .3) for (let i = 0; i < 6; i++) {
    const ph = ((t - SELLER) * .8 + i / 6) % 1;
    ctx.globalAlpha = out * (1 - ph); ctx.beginPath(); ctx.arc(lerp(670, 750, ph), lerp(480 + i * 56, 640, ph), 13 * (1 - ph * .5), 0, Math.PI * 2); ctx.fillStyle = C.fill; ctx.fill();
  }
  ctx.globalAlpha = out;
  const sp = eback(prog(t, SELLER, .45));
  if (sp > 0) {
    const gl = ctx.createRadialGradient(880, 640, 10, 880, 640, 200); gl.addColorStop(0, 'rgba(221,182,95,.7)'); gl.addColorStop(1, 'rgba(221,182,95,0)'); ctx.fillStyle = gl; ctx.fillRect(680, 440, 400, 400);
    ctx.beginPath(); ctx.moveTo(756, 640); ctx.lineTo(lerp(756, 830, sp), 640); ctx.lineWidth = 8; ctx.strokeStyle = C.gold; ctx.stroke();
    ctx.save(); ctx.translate(890, 640); ctx.scale(sp, sp); ctx.beginPath(); ctx.arc(0, 0, 54, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
  }
  ctx.restore();
  label('MAKERS', GX + 4.5 * SP, 880, out * eo(prog(t, GRID0 + 1.2, .3)), C.ink2, 26);
  label('SELLER', 890, 740, out * eo(prog(t, SELLER + .2, .3)), C.goldText, 26);
  ring(t, SELLER + .3, 890, 640, 50, 340, C.gold, .7, 10);
  burst(t, SELLER + .3, 890, 640, 20, 83, C.goldL, 800, .8);
}

/* ---------- S5: who captures this? (20.7 – 27.6) ---------- */
const FR = [[470, 450], [560, 430], [640, 470], [510, 510], [600, 520], [440, 520], [670, 530], [540, 470], [580, 480]];
const LREST = [[-45, -22], [0, -22], [45, -22], [-22, -56]], RREST = [[-45, -22], [0, -22], [45, -22], [-22, -56], [22, -56]];
function scene5(t) {
  if (t < 20.7 || t > 27.7) return;
  const end = 27.1, out = 1 - eio(prog(t, end, .35)), GY = 830, LB = 230, RB = 850;
  line(t, 'Who captures this?', W / 2, 215, { size: 70, start: 21.0, stagger: .1, end });
  line(t, '[Is it me?]', W / 2, 318, { size: 96, start: DROP, stagger: .14, end });
  ctx.save(); ctx.globalAlpha = out;
  ctx.strokeStyle = C.ink; ctx.lineWidth = 7; ctx.lineCap = 'round';
  const gp = eio(prog(t, 20.95, .5)); ctx.beginPath(); ctx.moveTo(72, GY); ctx.lineTo(72 + 936 * gp, GY); ctx.stroke();
  const shake = 4 * Math.sin(t * 60) * eo(prog(t, DROP - 1, .9)) * (1 - eo(prog(t, DROP, .12)));
  const tp = eback(prog(t, 21.1, .5));
  if (tp > 0) {
    ctx.save(); ctx.translate(540 + shake, GY); ctx.scale(tp, tp); ctx.translate(-540, -GY);
    rr(512, 610, 56, 220, 10); ctx.fillStyle = C.fill; ctx.fill();
    [[540, 470, 115], [440, 520, 85], [640, 520, 85]].forEach(([cx, cy, r]) => { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = '#EFE6D2'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke(); });
    ctx.restore();
  }
  const slide = eio(prog(t, DROP + .1, .6)), lbx = LB - 360 * slide, rbx = RB;
  const lb = eback(prog(t, 21.2, .4)), rb = eback(prog(t, 21.35, .4));
  if (lb > 0 && slide < 1) { ctx.save(); ctx.globalAlpha = out * (1 - slide); ctx.translate(lbx, GY); ctx.scale(lb, lb); basket(0, 0, C.ink, 'rgba(58,52,44,0.12)', 6); ctx.restore(); }
  if (rb > 0) {
    const pulse = 1 + .05 * Math.exp(-Math.max(0, t - DROP) * 5) * Math.sin((t - DROP) * 24);
    ctx.save(); ctx.translate(rbx, GY); ctx.scale(rb * pulse, rb * pulse); basket(0, 0, C.goldText, 'rgba(221,182,95,0.4)', 7); ctx.restore();
  }
  FR.forEach(([fx, fy], i) => {
    const pop = eback(prog(t, 21.3 + i * .05, .3)); if (pop <= 0) return;
    const li = i < 4, k = li ? i : i - 4 < 5 ? i - 4 : -1;
    if (k < 0 && i >= 9) return;
    const s = li ? FALL_L[i] : FALL_R[i - 4], q = prog(t, s, FALL_DUR);
    if (q <= 0) { fruit(fx + shake, fy, 17 * pop); return; }
    const rest = li ? LREST[k] : RREST[k], bx = li ? LB : RB, ex = bx + rest[0], ey = GY + rest[1] - 12;
    const gx = li ? lerp(fx, ex, eio(q)) - 360 * slide * (q >= 1 ? 1 : 0) : lerp(fx, ex, eio(q));
    const gy = lerp(fy, ey, q * q) - 60 * Math.sin(Math.PI * q);
    ctx.globalAlpha = out * (li && slide > 0 && q >= 1 ? 1 - slide : 1);
    fruit(gx, gy, 17); ctx.globalAlpha = out;
  });
  ctx.restore();
  label('SOMEONE ELSE', LB, 890, out * (1 - slide) * eo(prog(t, 21.5, .3)), C.ink2, 24);
  label('ME', RB, 890, out * eo(prog(t, 21.6, .3)), C.goldText, 28);
  ring(t, DROP, 540, 480, 60, 520, C.gold, .8, 12);
  ring(t, DROP + .12, 540, 480, 40, 420, C.goldL, .7, 8);
  burst(t, DROP, 540, 470, 30, 313, C.goldL, 1100, .9);
  FALL_R.forEach((s, i) => burst(t, s + FALL_DUR, RB + RREST[i][0], GY - 40, 7, 400 + i * 13, C.goldL, 380, .45));
}

/* ---------- S6: get it in writing (27.6 – 33.1) ---------- */
function scene6(t) {
  if (t < 27.6 || t > 33.2) return;
  const end = 32.65, out = 1 - eio(prog(t, end, .35));
  line(t, 'Get it in [writing,]', W / 2, 215, { size: 76, start: 27.8, stagger: .1, end });
  line(t, 'before it works.', W / 2, 303, { size: 56, color: C.ink2, start: 29.1, stagger: .1, end });
  const px = 330, py = 440, pw = 420, ph = 450, pp = eback(prog(t, PAGE, .45));
  if (pp > 0) {
    ctx.save(); ctx.globalAlpha = out; ctx.translate(W / 2, py + ph / 2); ctx.scale(pp, pp); ctx.translate(-W / 2, -py - ph / 2);
    rr(px, py, pw, ph, 16); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    for (let i = 0; i < 5; i++) { const lw = prog(t, PAGE + .4 + i * .1, .3); rr(px + 40, py + 50 + i * 52, (i === 4 ? 200 : 340) * lw, 16, 8); ctx.fillStyle = 'rgba(94,86,75,0.3)'; ctx.fill(); }
    ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.moveTo(px + 40, py + 395); ctx.lineTo(px + 300, py + 395); ctx.stroke();
    const u = prog(t, SIG0, SIG_DUR), pts = [];
    for (let k = 0; k <= 60 * u; k++) { const v = k / 60; pts.push([px + 50 + v * 230, py + 372 + 20 * Math.sin(v * 17) * (1 - v * .45) - 10 * Math.sin(v * 5)]); }
    if (pts.length > 1) {
      ctx.strokeStyle = C.goldText; ctx.lineWidth = 6; ctx.lineCap = ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke();
      if (u < 1) { const [x, y] = pts[pts.length - 1]; ctx.strokeStyle = C.ink; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 52, y - 90); ctx.stroke(); ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill(); }
    }
    const sp = eback(prog(t, SEAL, .4));
    if (sp > 0) {
      ctx.save(); ctx.translate(px + pw - 80, py + ph - 80); ctx.scale(sp, sp); ctx.rotate(-.15);
      ctx.beginPath(); for (let i = 0; i < 16; i++) { const rad = i % 2 ? 40 : 52, an = i * Math.PI / 8; ctx.lineTo(Math.cos(an) * rad, Math.sin(an) * rad); }
      ctx.closePath(); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
      ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-16, 2); ctx.lineTo(-4, 15); ctx.lineTo(18, -13); ctx.stroke(); ctx.restore();
    }
    ctx.restore();
  }
  label('DAY ONE', W / 2, 410, out * eo(prog(t, PAGE + .3, .3)), C.goldText, 26);
  ring(t, SEAL, px + pw - 80, py + ph - 80, 40, 360, C.gold, .8, 10);
  burst(t, SEAL, px + pw - 80, py + ph - 80, 22, 604, C.goldL, 1000, .8);
}

/* ---------- S7: flip the ratio (33.1 – 40.3) ---------- */
function scene7(t) {
  if (t < 33.1 || t > 40.4) return;
  const qEnd = 39.85, out = 1 - eio(prog(t, qEnd, .35));
  line(t, 'Build the [business,]', W / 2, 215, { size: 76, start: 33.2, stagger: .1, end: qEnd });
  line(t, 'not just the product.', W / 2, 303, { size: 56, color: C.ink2, start: 34.3, stagger: .08, end: qEnd });
  const bp = eback(prog(t, BAR, .45)), x0 = 110, bw = 860, by = 520, bh = 100;
  const fl = eback(prog(t, FLIP, FLIP_DUR)), share = lerp(.9, .1, clamp(fl, 0, 1.1)), tw = bw * clamp(share, .02, .98);
  if (bp > 0) {
    ctx.save(); ctx.globalAlpha = out; ctx.translate(W / 2, by + bh / 2); ctx.scale(bp, bp); ctx.translate(-W / 2, -by - bh / 2);
    rr(x0, by, bw, bh, 22); ctx.fillStyle = C.goldL; ctx.fill();
    ctx.save(); rr(x0, by, bw, bh, 22); ctx.clip(); ctx.fillStyle = C.fill; ctx.fillRect(x0, by, tw, bh); ctx.restore();
    rr(x0, by, bw, bh, 22); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
  }
  const la = out * eo(prog(t, BAR + .25, .3));
  label('THE THING', x0 + 4, by - 26, la, C.ink2, 26, 'left');
  label('CAPTURE', x0 + bw, by - 26, la, C.goldText, 26, 'right');
  const nl = Math.round(share * 100), nr = 100 - nl, kp = t > HIT ? 1 + .2 * Math.exp(-(t - HIT) * 9) : 1;
  ctx.save(); ctx.globalAlpha = la; ctx.font = font('serif', 120); ctx.fillStyle = C.ink2; ctx.fillText(nl + '%', x0, by + bh + 150);
  ctx.textAlign = 'right'; ctx.fillStyle = C.goldText; ctx.translate(x0 + bw, by + bh + 150); ctx.scale(kp, kp); ctx.fillText(nr + '%', 0, 0); ctx.restore();
  line(t, 'Flip the ratio.', W / 2, 880, { size: 56, start: FLIP, stagger: .1, end: qEnd });
  ring(t, HIT, x0 + bw - 100, by + bh / 2, 40, 360, C.gold, .8, 10);
  burst(t, HIT, x0 + bw - 100, by + bh / 2, 20, 77, C.goldL, 900, .8);
}

/* ---------- S8: takeaway (40.3 – 47.1) ---------- */
function scene8(t) {
  if (t < 40.3 || t > 47.1) return;
  const end = 46.7;
  line(t, 'Honor what you create.', W / 2, 440, { size: 70, start: 40.45, stagger: .1, end });
  const r = line(t, '[Capture it.]', W / 2, 580, { size: 104, start: 41.4, stagger: .12, end });
  const u = eio(prog(t, 42.35, .4)) * (1 - eio(prog(t, end, .35)));
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 616, r.w * u, 9); }
  line(t, 'Make sure the answer is you.', W / 2, 760, { size: 46, color: C.ink2, start: 43.4, stagger: .07, end });
  burst(t, 41.5, W / 2, 550, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S9: end card (47.1 – 53) ---------- */
function scene9(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const bp = eback(prog(t, E + .9, .4));
  if (bp > 0) { ctx.save(); ctx.translate(W / 2, 360); ctx.scale(.9 * bp, .9 * bp); basket(0, 0, C.cream, 'rgba(244,237,224,0.12)', 6); ctx.restore(); }
  const fq = prog(t, E + 1.05, .3);
  if (fq > 0 && fq < 1) { ctx.beginPath(); ctx.arc(W / 2, lerp(190, 330, fq * fq), 18, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); }
  else if (fq >= 1) { ctx.beginPath(); ctx.arc(W / 2, 330, 18, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); }
  ring(t, E + 1.35, W / 2, 330, 30, 280, C.goldL, .8, 8);
  line(t, 'Value, Created —', W / 2, 480, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  const title = 'Chapter 15: Creating Isn’t Enough';
  line(t, '[' + title + ']', W / 2, 575, { size: fit(title, 900, 66, 'serif'), goldColor: C.goldL, start: E + 1.6, stagger: .06 });
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, 625, 140 * lp, 4);
  line(t, 'Full 9-minute episode — link in comments', W / 2, 715, { font: 'sans', size: 38, color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 22, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 990);
  ctx.restore();
}

const SCENES = [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8];
const END_CARD = scene9;
