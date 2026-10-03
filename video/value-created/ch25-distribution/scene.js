/* Value, Created Ch 25 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 25, KICKER_END = 48.9, BAR_END = 49.6;
const WARP = [[0, 0], [6.4, 4.4], [12.4, 8.6], [18.8, 13], [27, 18.6], [32, 22.1], [38, 26.4], [43.5, 30.2], [49.7, 34.4], [55.9, 39.4]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const VH = [2.2, 2.7, 3.2, 3.7], FLY = .55;
const ORB0 = 7.3, PULSES = [8.2, 9.2, 10.2, 11.2];
const ROWB = 14.3, GOLD_B = 15.6, WIN = 17.3;
const HARD = [19.4, 19.6, 19.8], ROAD0 = 21.3, DROP = 23.4, LAUNCH_DT = .05, BFLY = .7;
const NOT = 28.6, ORB6 = 33.6, ARR6 = ORB6 + 1.2;
const MK0 = 38.6, DL0 = 40.0, MARK = 41.6;
const SWIPES = [6.4, 18.8, 32];
const E = 49.7;
const IMPACTS = [[VH[3] + FLY, 7], [ORB0 + .1, 4], [WIN, 8], [DROP, 16], [DROP + BFLY + .2, 7], [NOT + .1, 10], [ARR6, 8], [MARK, 9], [45.1, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 18.8], [18.8, 32], [32, 49.7]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 }); cue(1.2, 'pop', { f: .9 });
[.4, .5, .6, .7].forEach((x, i) => cue(x, 'blip', { n: [55, 59, 62, 66][i] }));
VH.forEach((s, i) => { cue(s, 'whoosh', { v: .3 }); cue(s + FLY, 'blip', { n: [64, 67, 71, 76][i] }); });
cue(VH[3] + FLY, 'impact', { v: .8 }); cue(VH[3] + FLY, 'chime', { n: 76 }); cue(5.0, 'pop', { f: 1 });
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.1 }); cue(7.0, 'swish'); cue(ORB0, 'pop', { f: 1.2 }); cue(ORB0 + .1, 'chime', { n: 72 });
PULSES.forEach((p, i) => cue(p, 'blip', { n: 67 - i * 3 }));
cue(8.6, 'pop', { f: 1 }); cue(10.5, 'drain', { d: 1.2 });
cue(12.6, 'pop', { f: 1.1 }); cue(13.1, 'pop', { f: .9 }); cue(13.0, 'thud'); cue(ROWB, 'swish');
for (let i = 0; i < 6; i += 2) cue(GOLD_B + i * .12, 'tick', { f: i % 2 });
cue(GOLD_B + .7, 'blip', { n: 72 }); cue(WIN - .15, 'riser', { d: .15 }); cue(WIN, 'impact', { v: .8 }); cue(WIN, 'chime', { n: 76 });
cue(19.0, 'pop', { f: 1.1 }); cue(19.9, 'pop', { f: .9 });
HARD.forEach(h => cue(h, 'thud'));
cue(20.8, 'riser', { d: DROP - 20.8 });
for (let x = ROAD0, k = 0; x < DROP - .1; x += .2 - k * .01, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 });
for (let i = 0; i < 5; i++) cue(DROP + BFLY + i * LAUNCH_DT, 'blip', { n: [67, 71, 74, 76, 79][i] });
cue(DROP + BFLY + .2, 'thud');
cue(27.2, 'pop', { f: 1.1 }); cue(27.4, 'thud'); cue(28.4, 'pop', { f: .9 });
cue(NOT - .15, 'riser', { d: .15 }); cue(NOT + .1, 'impact', { v: .8 }); cue(NOT + .1, 'knock', { v: 1 }); cue(NOT + .5, 'knock', { v: .7 });
for (let x = 29.4; x < 31.2; x += .45) cue(x, 'tick', { f: 0 });
cue(32.2, 'pop', { f: 1.1 }); cue(32.9, 'pop', { f: .9 }); cue(32.5, 'thud');
cue(ORB6 - .1, 'whoosh', { v: .4 });
for (let i = 0; i < 6; i += 2) cue(ARR6 + i * .1, 'blip', { n: 60 + i * 3 });
cue(ARR6, 'impact', { v: .8 }); cue(ARR6, 'chime', { n: 79 });
cue(38.0, 'pop', { f: 1.1 }); cue(40.0, 'pop', { f: 1.2 });
for (let i = 0; i < 4; i++) { cue(DL0 + i * .18, 'blip', { n: [60, 64, 67, 72][i] }); }
cue(MARK, 'impact', { v: .8 }); cue(MARK, 'chime', { n: 76 });
cue(43.5, 'pop', { f: 1.1 }); cue(44.6, 'pop', { f: 1.1 }); cue(45.1, 'thud'); cue(45.1, 'impact', { v: .9 }); cue(45.1, 'chime', { n: 76 }); cue(45.5, 'swish'); cue(46.0, 'pop', { f: .9 });
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: 6.4, breakdown: 20.8, drop: DROP, end: 49.6 };

function person(x, y, s, a) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const draw = col => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(0, -16, 12, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(0, 18, 24, Math.PI, 2 * Math.PI); ctx.fill(); };
  draw('rgba(58,52,44,0.22)');
  if (a > 0) { ctx.globalAlpha *= clamp(a); draw(C.gold); }
  ctx.restore();
}
function glow(x, y, r, a) {
  if (a <= 0) return;
  const g = ctx.createRadialGradient(x, y, 6, x, y, r);
  g.addColorStop(0, `rgba(221,182,95,${.7 * a})`); g.addColorStop(1, 'rgba(221,182,95,0)');
  ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
}
/* anchored at bottom centre */
function house(x, y, w, lit) {
  ctx.save(); ctx.translate(x, y); ctx.lineJoin = 'round'; ctx.lineWidth = 5; ctx.strokeStyle = C.ink;
  glow(0, -w * .45, w * 1.1, lit);
  rr(-w / 2, -w * .78, w, w * .78, 6); ctx.fillStyle = C.paper; ctx.fill(); ctx.fillStyle = 'rgba(58,52,44,0.08)'; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-w * .6, -w * .78); ctx.lineTo(0, -w * 1.25); ctx.lineTo(w * .6, -w * .78); ctx.closePath();
  ctx.fillStyle = 'rgba(58,52,44,0.14)'; ctx.fill(); ctx.stroke();
  rr(-w * .16, -w * .58, w * .32, w * .3, 4); ctx.fillStyle = 'rgba(58,52,44,0.18)'; ctx.fill();
  ctx.save(); ctx.globalAlpha *= clamp(lit); ctx.fillStyle = C.goldL; ctx.fill(); ctx.restore(); ctx.stroke();
  ctx.restore();
}
function orb(x, y, r, a) {
  r = Math.max(.01, r);
  glow(x, y, r * 3, a);
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
}
function ground(y, x0, x1, p) {
  ctx.save(); ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath();
  ctx.moveTo(x0, y); ctx.lineTo(lerp(x0, x1, p), y); ctx.stroke(); ctx.restore();
}
function box(x, y, w, h, fillA) {
  rr(x - w / 2, y - h / 2, w, h, 6); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x - w * .3, y - h * .2); ctx.lineTo(x + w * .3, y - h * .2); ctx.stroke();
}

/* ---------- S1: the better machine lost (0 – 6.4) ---------- */
const HX = [590, 710, 830, 950], GY = 800;
function machine(x, label, tag, a) {
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, GY); ctx.scale(1.35, 1.35);
  rr(-66, -104, 132, 104, 10); ctx.fillStyle = C.paper; ctx.fill(); ctx.fillStyle = 'rgba(58,52,44,0.1)'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
  rr(-44, -84, 88, 14, 5); ctx.fillStyle = C.ink; ctx.fill();
  [-28, 28].forEach(dx => { ctx.beginPath(); ctx.arc(dx, -36, 15, 0, Math.PI * 2); ctx.lineWidth = 5; ctx.stroke(); });
  ctx.restore();
  label_(label, x, GY + 46, a, C.ink, 24);
  if (tag) {
    ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, GY - 172); rr(-80, -22, 160, 44, 22); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
    label_(tag, x, GY - 164, a, C.ink, 24);
  }
}
const label_ = (s, x, y, a, c, sz) => label(s, x, y, a, c, sz);
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'The better machine [lost.]', W / 2, 215, { size: 80, start: -.5, stagger: .12, end: 5.95 });
  line(t, 'VHS won on distribution.', W / 2, 300, { size: 54, color: C.ink2, start: 1.2, stagger: .08, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35));
  ctx.save(); ctx.globalAlpha = out;
  ground(GY, 72, W - 72, eio(prog(t, -.2, .5)));
  HX.forEach((x, i) => {
    const p = eback(prog(t, .2 + i * .1, .4)), lit = eo(prog(t, VH[i] + FLY, .25));
    if (p > 0) { ctx.save(); ctx.translate(x, GY); ctx.scale(p, p); ctx.translate(-x, -GY); house(x, GY, 100, lit); ctx.restore(); }
  });
  const dim = 1 - .45 * eo(prog(t, 4.3, .6));
  machine(160, 'BETAMAX', 'BETTER', eback(prog(t, .3, .4)) * dim);
  machine(350, 'VHS', null, eback(prog(t, .4, .4)));
  VH.forEach((s, i) => {
    const q = prog(t, s, FLY); if (q <= 0 || q >= 1) return;
    const e = eio(q), x = lerp(350, HX[i], e), y = lerp(740, GY - 44, e) - Math.sin(e * Math.PI) * 150;
    ctx.save(); ctx.translate(x, y); ctx.rotate((e - .5) * .5); box(0, 0, 50, 36); ctx.restore();
  });
  ctx.restore();
  VH.forEach((s, i) => burst(t, s + FLY, HX[i], GY - 44, 8, 11 + i * 17, C.goldL, 300, .5));
  ring(t, VH[3] + FLY, HX[3], GY - 44, 30, 260, C.gold, .6, 9);
}

/* ---------- S2: nobody sees it (6.4 – 12.4) ---------- */
function scene2(t) {
  if (t < 6.4 || t > 12.5) return;
  const end = 11.9, out = 1 - eio(prog(t, end, .35)), IY = 740;
  line(t, 'Value nobody sees', W / 2, 215, { size: 80, start: 6.7, stagger: .1, end });
  line(t, '[might as well not exist.]', W / 2, 305, { size: 66, start: 8.4, stagger: .08, end });
  ctx.save(); ctx.globalAlpha = out;
  const lp = eback(prog(t, 6.7, .45)), rp = eback(prog(t, 6.9, .45));
  if (lp > 0) { ctx.save(); ctx.translate(222, IY); ctx.scale(lp, lp); ctx.translate(-222, -IY); rr(72, IY, 300, 36, 10); ctx.fillStyle = 'rgba(58,52,44,0.16)'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke(); house(222, IY, 200, 1); ctx.restore(); }
  if (rp > 0) { ctx.save(); ctx.translate(858, IY); ctx.scale(rp, rp); ctx.translate(-858, -IY); rr(708, IY, 300, 36, 10); ctx.fillStyle = 'rgba(58,52,44,0.16)'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore(); }
  [0, 1, 2, 3].forEach(i => { const p = eback(prog(t, 7.6 + i * .12, .35)); if (p > 0) person(745 + i * 70, IY - 28, p * 1.6, 0); });
  const op = eback(prog(t, ORB0, .4));
  if (op > 0) orb(222, 520, 42 * op * (1 + .05 * Math.sin(t * 5)), op);
  ctx.restore();
  PULSES.forEach(p => ring(t, p, 222, 520, 40, 330, C.gold, 1.1, 8));
  label('?', 540, 700, out * .5 * eo(prog(t, 8.4, .4)), C.ink2, 110);
  label('WORKSHOP', 222, IY + 80, out * eo(prog(t, 7.0, .3)), C.ink, 24);
  label('EXCHANGE', 858, IY + 80, out * eo(prog(t, 7.2, .3)), C.ink, 24);
}

/* ---------- S3: the reachable one wins (12.4 – 18.8) ---------- */
const RY = [520, 740], RX = i => 640 + i * 66;
function scene3(t) {
  if (t < 12.4 || t > 18.9) return;
  const end = 18.3, out = 1 - eio(prog(t, end, .35));
  line(t, 'Two makers. Same value.', W / 2, 215, { size: 74, start: 12.6, stagger: .09, end });
  line(t, '[The reachable one wins.]', W / 2, 300, { size: 70, start: 13.4, stagger: .08, end });
  const wp = eo(prog(t, WIN, .4)), fa = 1 - .55 * wp;
  [0, 1].forEach(r => {
    const p = eback(prog(t, 13.0 + r * .35, .4)); if (p <= 0) return;
    const y = RY[r];
    ctx.save(); ctx.globalAlpha = out * (r === 0 ? fa : 1);
    ctx.translate(150, y); ctx.scale(p, p); ctx.translate(-150, -y); orb(150, y, 44, 1); ctx.restore();
    ctx.save(); ctx.globalAlpha = out * (r === 0 ? fa : 1);
    for (let i = 0; i < 6; i++) { const dp = eback(prog(t, 13.4 + r * .35 + i * .06, .3)); if (dp > 0) person(RX(i), y + 20, dp * 1.2, r === 1 ? eo(prog(t, GOLD_B + i * .12, .2)) : 0); }
    if (r === 0) {
      ctx.strokeStyle = C.ink2; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.setLineDash([2, 14]); ctx.globalAlpha *= .8 * eo(prog(t, 13.8, .4));
      ctx.beginPath(); ctx.moveTo(210, y); ctx.lineTo(430, y); ctx.stroke(); ctx.setLineDash([]);
    } else {
      const rd = eio(prog(t, ROWB, .6));
      ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(210, y); ctx.lineTo(lerp(210, 590, rd), y); ctx.stroke();
      if (rd >= 1) for (let k = 0; k < 4; k++) { const x = 230 + ((t * 230 + k * 95) % 380); ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill(); }
    }
    ctx.restore();
  });
  label('HIDDEN', 170, RY[0] + 82, out * fa * eo(prog(t, 13.3, .3)), C.ink2, 24);
  label('REACHABLE', 170, RY[1] + 82, out * eo(prog(t, 13.7, .3)), C.goldText, 24);
  const hp = eio(prog(t, WIN, .45)) * out;
  if (hp > 0) { ctx.save(); ctx.globalAlpha = hp; rr(72, 660, 936, 168, 24); ctx.lineWidth = 7; ctx.strokeStyle = C.goldText; ctx.stroke(); ctx.restore(); }
  ring(t, WIN, 540, 744, 60, 520, C.gold, .7, 10);
  burst(t, WIN, 540, 744, 22, 301, C.goldL, 900, .8);
}

/* ---------- S4: Allen Lane's road (18.8 – 27) ---------- */
const PEOPLE4 = [0, 1, 2, 3, 4].map(i => 706 + i * 68), NBK = 10, G4 = 820;
const bookTarget = i => [PEOPLE4[i % 5] + (i < 5 ? -24 : 24), 612];
function bigBook(x, h, a, lean) {
  ctx.save(); ctx.translate(x, G4); ctx.rotate(lean); ctx.scale(a, a);
  rr(-62, -h, 124, h, 10); ctx.fillStyle = C.paper; ctx.fill(); ctx.fillStyle = 'rgba(58,52,44,0.14)'; ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-38, -h); ctx.lineTo(-38, 0); ctx.moveTo(-10, -h * .7); ctx.lineTo(40, -h * .7); ctx.stroke();
  ctx.restore();
}
function pocketBook(x, y, rot) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); rr(-21, -30, 42, 60, 6); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 4.5; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-9, -30); ctx.lineTo(-9, 30); ctx.stroke(); ctx.restore();
}
function scene4(t) {
  if (t < 18.8 || t > 27.1) return;
  const end = 26.5, out = 1 - eio(prog(t, end, .35));
  line(t, 'Allen Lane, 1935.', W / 2, 215, { size: 80, start: 19.0, stagger: .1, end: DROP - .45 });
  line(t, 'He wrote no new book.', W / 2, 300, { size: 54, color: C.ink2, start: 19.9, stagger: .07, end: DROP - .45 });
  line(t, 'Not better value.', W / 2, 215, { size: 80, start: DROP, stagger: .1, end });
  line(t, '[Better arrival.]', W / 2, 310, { size: 84, start: DROP + .35, stagger: .12, end });
  ctx.save(); ctx.globalAlpha = out;
  ground(G4, 72, W - 72, eio(prog(t, 18.9, .5)));
  const pl = eo(prog(t, 19.2, .4));
  ctx.save(); ctx.globalAlpha *= pl; rr(650, G4 - 56, 358, 38, 8); ctx.fillStyle = 'rgba(58,52,44,0.16)'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
  const rd = eio(prog(t, ROAD0, DROP - .1 - ROAD0));
  if (rd > 0) { ctx.save(); ctx.strokeStyle = C.gold; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.setLineDash([30, 24]); ctx.beginPath(); ctx.moveTo(440, G4 + 36); ctx.lineTo(lerp(440, 640, rd), G4 + 36); ctx.stroke(); ctx.restore(); }
  PEOPLE4.forEach((x, i) => { const p = eback(prog(t, 19.4 + i * .1, .35)); if (p > 0) person(x, G4 - 56 - 31, p * 1.7, eo(prog(t, DROP + BFLY + i * LAUNCH_DT, .2))); });
  const sh = 1 - eio(prog(t, DROP, .4));
  [[150, 230, -.03], [300, 205, 0], [450, 245, .03]].forEach(([x, h, lean], i) => {
    const p = eback(prog(t, HARD[i], .35)); if (p <= 0 || sh <= 0) return;
    const wob = Math.sin(t * 16 + i * 2) * .015 * eo(prog(t, 20.9, .8));
    ctx.save(); ctx.globalAlpha *= sh; bigBook(x, h, p * (.4 + .6 * sh), lean + wob); ctx.restore();
  });
  for (let i = 0; i < NBK; i++) {
    const L = DROP + i * LAUNCH_DT, q = prog(t, L, BFLY); if (q <= 0) continue;
    const e = eio(q), [tx, ty] = bookTarget(i), sx = 300, sy = 720;
    pocketBook(lerp(sx, tx, e), lerp(sy, ty, e) - Math.sin(e * Math.PI) * 170, e * 6.28 * (i % 2 ? 1 : -1) * (1 - e));
  }
  ctx.restore();
  ring(t, DROP, 300, 720, 50, 460, C.gold, .8, 12);
  burst(t, DROP, 300, 720, 28, 313, C.goldL, 1000, .9);
  ring(t, DROP + BFLY + .2, 830, 700, 40, 360, C.gold, .7, 9);
}

/* ---------- S5: if you build it (27 – 32) ---------- */
function stream(t, y, dir, speed) {
  for (let i = 0; i < 10; i++) {
    const x = (((i * 150 + dir * t * speed) % 1500) + 1500) % 1500 - 180;
    person(x, y, 1.2, 0);
  }
}
function scene5(t) {
  if (t < 27 || t > 32.1) return;
  const end = 31.6, out = 1 - eio(prog(t, end, .35)), G5 = 800;
  line(t, 'If you build it,', W / 2, 215, { size: 80, start: 27.2, stagger: .1, end });
  line(t, 'they will [not] come.', W / 2, 305, { size: 80, start: 28.4, stagger: .1, end });
  ctx.save(); ctx.globalAlpha = out;
  ground(G5, 72, W - 72, eio(prog(t, 27.1, .4)));
  const hp = eback(prog(t, 27.2, .45));
  ctx.save(); ctx.globalAlpha *= eo(prog(t, 27.6, .4)); stream(t, 520, -1, 140); ctx.restore();
  if (hp > 0) { ctx.save(); ctx.translate(540, G5); ctx.scale(hp, hp); ctx.translate(-540, -G5); house(540, G5, 300, 1); ctx.restore(); }
  ctx.save(); ctx.globalAlpha *= eo(prog(t, 27.6, .4)); stream(t, 862, 1, 190); ctx.restore();
  ctx.restore();
  ring(t, NOT + .1, 540, 640, 40, 460, C.gold, .6, 9);
}

/* ---------- S6: go where they gather (32 – 38) ---------- */
const G6 = 800;
const CROWD = Array.from({ length: 15 }, (_, i) => ({ x: 620 + (i % 5) * 80, y: 560 + ((i / 5) | 0) * 80 }));
function scene6(t) {
  if (t < 32 || t > 38.1) return;
  const end = 37.7, out = 1 - eio(prog(t, end, .3));
  line(t, 'Go where they [gather.]', W / 2, 215, { size: 78, start: 32.2, stagger: .1, end });
  line(t, 'The platform, not the bookshop.', W / 2, 300, { size: 50, color: C.ink2, start: 32.9, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  ground(G6, 72, W - 72, eio(prog(t, 32.2, .4)));
  const hp = eback(prog(t, 32.4, .45));
  if (hp > 0) { ctx.save(); ctx.translate(210, G6); ctx.scale(hp, hp); ctx.translate(-210, -G6); house(210, G6, 240, 0); ctx.restore(); }
  CROWD.forEach((c, i) => {
    const p = eback(prog(t, 32.6 + i * .04, .3)); if (p <= 0) return;
    const d = Math.hypot(c.x - 780, c.y - 640), lit = eo(prog(t, ARR6 + d / 520, .25));
    person(c.x, c.y + 18, p * 1.35, lit);
  });
  const q = prog(t, ORB6, 1.2);
  if (q < 1) {
    const e = eio(q), ox = q <= 0 ? 210 : lerp(210, 780, e), oy = q <= 0 ? G6 - 70 : lerp(G6 - 70, 520, e) - Math.sin(e * Math.PI) * 160;
    orb(ox, oy, 34 * eback(prog(t, 33.2, .3)), eo(prog(t, 33.2, .3)));
  }
  ctx.restore();
  label('BOOKSHOP', 210, G6 + 56, out * eo(prog(t, 32.7, .3)), C.ink2, 24);
  label('PLATFORM', 800, G6 + 56, out * eo(prog(t, 32.9, .3)), C.goldText, 24);
  ring(t, ARR6, 780, 640, 40, 420, C.gold, .7, 10);
  burst(t, ARR6, 780, 640, 20, 611, C.goldL, 800, .8);
}

/* ---------- S7: half and half (38 – 43.5) ---------- */
function scene7(t) {
  if (t < 38 || t > 43.6) return;
  const end = 43.3, out = 1 - eio(prog(t, end, .3));
  line(t, 'A month making?', W / 2, 215, { size: 80, start: 38.0, stagger: .1, end });
  line(t, 'A month [delivering.]', W / 2, 305, { size: 80, start: DL0 - .2, stagger: .1, end });
  ctx.save(); ctx.globalAlpha = out;
  [['MAKE', 520, MK0, false], ['DELIVER', 730, DL0, true]].forEach(([nm, y, s0, gold]) => {
    label(nm, 72, y - 62, out * eo(prog(t, s0 - .2, .3)), gold ? C.goldText : C.ink, 28, 'left');
    for (let i = 0; i < 4; i++) {
      const p = eback(prog(t, s0 + i * .18, .35)); if (p <= 0) continue;
      ctx.save(); ctx.translate(72 + i * 234 + 111, y); ctx.scale(p, p);
      rr(-111, -40, 222, 80, 12); ctx.fillStyle = gold ? C.goldL : C.fill; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
    }
  });
  ctx.restore();
  ring(t, MARK, 996, 625, 40, 300, C.gold, .7, 10);
  burst(t, MARK, 996, 625, 16, 811, C.goldL, 800, .8);
}

/* ---------- S8: takeaway (43.5 – 49.7) ---------- */
function scene8(t) {
  if (t < 43.5 || t > 49.8) return;
  const end = 49.2, sz = fit('But: is it arriving?', 900, 96, 'serif');
  line(t, 'Not: is it done?', W / 2, 450, { size: 96, color: C.ink2, start: 43.5, stagger: .1, end });
  const r = line(t, '[But: is it arriving?]', W / 2, 575, { size: sz, start: 44.6, stagger: .1, end });
  const u = eio(prog(t, 45.5, .4)) * (1 - eio(prog(t, end, .35)));
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 612, r.w * u, 9); }
  line(t, 'Build your road.', W / 2, 700, { size: 46, color: C.ink2, start: 46.0, stagger: .07, end });
  const out = 1 - eio(prog(t, end, .35)), rp = eio(prog(t, 46.4, .8));
  ctx.save(); ctx.globalAlpha = out;
  ctx.strokeStyle = C.gold; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.setLineDash([28, 22]); ctx.beginPath(); ctx.moveTo(240, 870); ctx.lineTo(lerp(240, 640, rp), 870); ctx.stroke(); ctx.setLineDash([]);
  const hp = eback(prog(t, 46.5, .4)); if (hp > 0) { ctx.save(); ctx.translate(740, 880); ctx.scale(hp, hp); ctx.translate(-740, -880); house(740, 880, 110, eo(prog(t, 47.3, .3))); ctx.restore(); }
  ctx.restore();
  burst(t, 45.2, W / 2, 545, 24, 707, C.goldL, 1100, .9);
  burst(t, 47.3, 740, 830, 12, 223, C.goldL, 500, .6);
}

/* ---------- S9: end card (49.7 – 55.9) ---------- */
function scene9(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const mp = eio(prog(t, E + .95, .7));
  ctx.save(); ctx.strokeStyle = C.cream; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.setLineDash([20, 16]);
  ctx.beginPath(); ctx.moveTo(350, 300); ctx.lineTo(lerp(350, 650, mp), 300); ctx.stroke(); ctx.setLineDash([]);
  const hp = eback(prog(t, E + 1.1, .4));
  if (hp > 0) {
    ctx.translate(710, 316); ctx.scale(hp, hp);
    rr(-34, -56, 68, 56, 5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-44, -56); ctx.lineTo(0, -96); ctx.lineTo(44, -56); ctx.stroke();
    rr(-11, -42, 22, 20, 3); ctx.fillStyle = C.goldL; ctx.fill();
  }
  ctx.restore();
  ring(t, E + 1.3, 710, 270, 30, 280, C.goldL, .8, 8);
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  line(t, '[Chapter 25: Distribution]', W / 2, 535, { size: fit('Chapter 25: Distribution', 900, 60, 'serif'), goldColor: C.goldL, start: E + 1.6, stagger: .06 });
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, 590, 140 * lp, 4);
  line(t, 'Full 7-minute episode — link in comments', W / 2, 680, { font: 'sans', size: 38, color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 22, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8];
const END_CARD = scene9;
