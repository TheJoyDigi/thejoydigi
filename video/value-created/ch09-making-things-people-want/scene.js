/* Value, Created Ch 9 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 9, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [10.9, 7.6], [16, 11.2], [20.7, 14.5], [27.6, 19.3], [33.1, 23.2], [40.3, 28.2], [47.1, 33], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const SHRUG = 3.9;
const BOX = 7.0, SOLD = 9.0;
const BARS = [11.6, 12.4], BAR_D = 1.0;
const NUG = [17.2, 17.8, 18.4];
const TRY = [21.7, 22.35, 23.0], AWAY = 23.2, DROP = 23.6;
const SAYS = 28.6, DOES = 30.1, HIT = 31.2;
const CLICKS = [35.9, 36.6, 37.3];
const VANISH = 41.4;
const SWIPES = [6.4, 20.7, 33.1];
const E = 46.85;
const IMPACTS = [[.3, 6], [SHRUG + .4, 8], [BOX + .3, 5], [SOLD + .3, 5], [BARS[1] + BAR_D, 11], ...NUG.map((s, i) => [s + .2, 3 + i]), ...TRY.map(s => [s + .22, 6]),
  [DROP, 16], [DROP + .45, 5], [HIT, 11], ...CLICKS.map(s => [s + .1, 4]), [VANISH, 13], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 20.7], [20.7, 33.1], [33.1, 46.8]];

cue(0, 'impact', { v: .8 }); cue(.02, 'pop', { f: 1 }); cue(.1, 'chime', { n: 79 });
for (let x = .5; x < SHRUG - .1; x += .35) cue(x, 'tick', { f: 2 });
cue(SHRUG - .1, 'drain', { d: 1.0 }); cue(SHRUG, 'pop', { f: 1.2 }); cue(SHRUG + .4, 'thud'); cue(4.7, 'pop', { f: 1.2 }); cue(4.75, 'thud');
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(BOX, 'whoosh', { v: .3 }); cue(BOX + .3, 'thud'); cue(BOX + .35, 'blip', { n: 60 });
for (let i = 0; i < 5; i++) { cue(BOX + .6 + i * .12, 'tick', { f: 2 }); }
cue(SOLD, 'pop', { f: 1.1 }); cue(SOLD, 'whoosh', { v: .3 }); cue(SOLD + .3, 'chime', { n: 76 }); cue(SOLD + .3, 'thud');
cue(11.1, 'pop', { f: 1.2 }); cue(BARS[0], 'whoosh', { v: .25 }); cue(BARS[0] + .3, 'tick', { f: 2 }); cue(BARS[0] + .3, 'blip', { n: 55 });
for (let x = BARS[1]; x < BARS[1] + BAR_D; x += .07) cue(x, 'tick', { f: 1 });
cue(BARS[1] + BAR_D, 'chime', { n: 79 }); cue(BARS[1] + BAR_D, 'thud'); cue(BARS[1] + BAR_D, 'impact', { v: .7 }); cue(14.0, 'pop', { f: 1 });
cue(16.2, 'pop', { f: 1.2 }); cue(17.6, 'pop', { f: 1.2 });
NUG.forEach((s, i) => { cue(s, 'whoosh', { v: .2 }); cue(s + .2, 'blip', { n: [64, 69, 76][i] }); cue(s + .2, 'tick', { f: 2 }); });
cue(19.4, 'pop', { f: .9 });
cue(20.2, 'riser', { d: DROP - 20.2 }); cue(21.0, 'pop', { f: 1 });
TRY.forEach(s => { cue(s, 'whoosh', { v: .25 }); cue(s + .22, 'knock', { v: 1 }); cue(s + .22, 'thud'); });
cue(AWAY - .1, 'swish');
for (let x = 22.6, k = 0; x < DROP - .05; x += .12 - k * .003, k++) if (x > 23.35 || x < 21.6) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .02, 'knock', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 }); cue(DROP + .45, 'thud');
cue(27.8, 'pop', { f: 1.2 }); cue(28.0, 'swish'); cue(SAYS, 'whoosh', { v: .25 }); cue(29.4, 'pop', { f: 1.2 });
for (let x = SAYS; x < SAYS + .9; x += .15) cue(x, 'tick', { f: 0 });
cue(DOES - .1, 'whoosh', { v: .35 }); for (let x = DOES; x < HIT - .1; x += .1) cue(x, 'tick', { f: 1 });
cue(HIT - .6, 'riser', { d: .6 }); cue(HIT, 'impact', { v: .9 }); cue(HIT, 'chime', { n: 76 }); cue(HIT + .1, 'pop', { f: 1.2 }); cue(HIT + .35, 'knock', { v: 1 });
cue(33.3, 'pop', { f: 1.2 }); cue(34.5, 'pop', { f: 1 }); cue(35.2, 'whoosh', { v: .25 });
CLICKS.forEach((s, i) => { cue(s, 'tick', { f: 2 }); cue(s + .05, 'blip', { n: [64, 69, 76][i] }); cue(s + .1, 'pop', { f: 1 }); });
cue(40.0, 'whoosh', { v: .35 }); cue(40.45, 'thud'); cue(VANISH - .3, 'riser', { d: .3 }); cue(VANISH, 'impact', { v: .9 }); cue(VANISH, 'scratch'); cue(VANISH + .05, 'drain', { d: .8 }); cue(VANISH + .1, 'pop', { f: 1.2 });
cue(VANISH + .7, 'knock', { v: .6 }); cue(42.35, 'swish'); cue(43.4, 'pop', { f: .9 }); cue(43.45, 'chime', { n: 76 });
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: 6.4, breakdown: 20.2, drop: DROP, end: 46.75 };

function star(x, y, r, a) {
  if (a <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= a; ctx.beginPath();
  for (let i = 0; i < 8; i++) { const rad = i % 2 ? r * .28 : r, an = i * Math.PI / 4 - Math.PI / 2; ctx.lineTo(Math.cos(an) * rad, Math.sin(an) * rad); }
  ctx.closePath(); ctx.fillStyle = C.goldL; ctx.fill(); ctx.restore();
}
function glow(x, y, r, a) {
  if (a <= 0) return;
  const g = ctx.createRadialGradient(x, y, 10, x, y, r);
  g.addColorStop(0, `rgba(221,182,95,${a})`); g.addColorStop(1, 'rgba(221,182,95,0)');
  ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
}
function small(str, x, y, a, color, size, align) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.font = font('sans', size || 30, 500); ctx.textAlign = align || 'center'; ctx.fillStyle = color || C.ink2; ctx.fillText(str, x, y); ctx.restore();
}
function person(x, y, s, head, body, lw) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = (lw || 6) / s; ctx.strokeStyle = C.ink;
  ctx.beginPath(); ctx.moveTo(-40, 0); ctx.bezierCurveTo(-40, -44, -22, -58, 0, -58); ctx.bezierCurveTo(22, -58, 40, -44, 40, 0); ctx.closePath(); ctx.fillStyle = body; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, -92, 30, 0, Math.PI * 2); ctx.fillStyle = head; ctx.fill(); ctx.stroke(); ctx.restore();
}

/* segway and rock are anchored at their bottom centre */
function segway(x, y, s, a) {
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 7 / s; ctx.strokeStyle = C.ink; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.arc(0, -78, 78, 0, Math.PI * 2); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, -78, 24, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
  rr(-125, -176, 250, 30, 12); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
  ctx.lineWidth = 14 / s; ctx.beginPath(); ctx.moveTo(40, -176); ctx.lineTo(40, -420); ctx.stroke();
  ctx.lineWidth = 12 / s; ctx.beginPath(); ctx.moveTo(-4, -432); ctx.lineTo(96, -432); ctx.stroke();
  ctx.restore();
}
function rock(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 6 / s; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-60, 0); ctx.bezierCurveTo(-76, -30, -50, -66, -10, -62); ctx.bezierCurveTo(30, -70, 70, -44, 62, 0); ctx.closePath(); ctx.fillStyle = '#A59C8C'; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-30, -36); ctx.lineTo(-6, -44); ctx.lineWidth = 4 / s; ctx.strokeStyle = '#FFFBF3'; ctx.stroke(); ctx.restore();
}

/* ---------- S1: the Segway (0 – 6.4) ---------- */
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'The Segway.', W / 2, 215, { size: 88, start: -.62, stagger: .12, end: 3.7 });
  line(t, 'Brilliant engineering.', W / 2, 305, { size: 54, color: C.ink2, start: 1.0, stagger: .08, end: 3.7 });
  line(t, 'The world [shrugged.]', W / 2, 220, { size: 84, start: SHRUG, stagger: .1, end: 5.95 });
  line(t, 'About 30,000 sold.', W / 2, 310, { size: 60, color: C.ink2, start: 4.7, stagger: .1, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35)), hype = 1 - eio(prog(t, SHRUG - .1, .5));
  ctx.save(); ctx.globalAlpha = out;
  const sp = eback(prog(t, .2, .5));
  if (hype > 0) {
    glow(540, 660, 420 * hype, .6 * hype);
    ctx.save(); ctx.translate(540, 660); ctx.rotate(t * .25); ctx.strokeStyle = C.goldL; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.globalAlpha *= .6 * hype;
    for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8; ctx.beginPath(); ctx.moveTo(Math.cos(a) * 280, Math.sin(a) * 280); ctx.lineTo(Math.cos(a) * 350, Math.sin(a) * 350); ctx.stroke(); }
    ctx.restore();
  }
  ctx.save(); ctx.globalAlpha = out * lerp(1, .5, eo(prog(t, SHRUG, .5))); segway(540, 850, 1.0 * clamp(sp), 1); ctx.restore();
  for (let i = 0; i < 46; i++) {
    const t0 = .3 + rnd(i) * 3.2, dt = t - t0; if (dt < 0 || t > SHRUG + 1.2) continue;
    const x = 80 + rnd(i + 5) * 920 + 30 * Math.sin(dt * 3 + i), y = 330 + dt * (60 + 90 * rnd(i + 9)) + (t > SHRUG ? (t - SHRUG) * 200 : 0);
    if (y > 960) continue;
    ctx.save(); ctx.globalAlpha = out * (1 - eo(prog(t, SHRUG, 1.2))); ctx.translate(x, y); ctx.rotate(dt * 3 + i); ctx.fillStyle = [C.gold, C.goldL, C.ink2, C.faint][i % 4]; ctx.fillRect(-6, -3, 12, 6); ctx.restore();
  }
  ctx.restore();
  burst(t, .15, 540, 640, 30, 5, C.goldL, 1100, .9);
}

/* ---------- S2: the Pet Rock (6.4 – 10.9) ---------- */
function box(x, y, s, a) {
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 6 / s; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round';
  rock(0, -150, 2.2);
  rr(-170, -170, 340, 170, 12); ctx.fillStyle = '#D9BC8A'; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-170, -170); ctx.lineTo(-190, -210); ctx.moveTo(170, -170); ctx.lineTo(190, -210); ctx.stroke();
  ctx.restore();
}
function scene2(t) {
  if (t < 6.4 || t > 11) return;
  const end = 10.45, out = 1 - eio(prog(t, end, .35));
  line(t, 'Then came a [rock.]', W / 2, 220, { size: 88, start: 6.65, stagger: .1, end });
  line(t, 'A million sold.', W / 2, 310, { size: 60, color: C.ink2, start: SOLD, stagger: .1, end });
  const bp = eback(prog(t, BOX, .5));
  ctx.save(); ctx.globalAlpha = out;
  if (bp > 0) {
    ctx.save(); ctx.translate(540, 820); ctx.scale(clamp(bp), clamp(bp)); ctx.translate(-540, -820); box(540, 820, 1.4, 1); ctx.restore();
    for (let i = 0; i < 5; i++) { const hp = eback(prog(t, BOX + .6 + i * .12, .3)); if (hp > 0) { ctx.beginPath(); ctx.arc(540 + (i - 2) * 70, 740, 12 * clamp(hp), 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill(); } }
  }
  const sd = eo(prog(t, SOLD, .5));
  ctx.restore();
  glow(540, 650, 300 * sd, .5 * out);
  star(300, 600, 22, (.5 + .5 * Math.sin(t * 5)) * sd * out); star(820, 560, 16, (.5 + .5 * Math.sin(t * 5 + 2)) * sd * out); star(860, 700, 20, (.5 + .5 * Math.sin(t * 5 + 4)) * sd * out);
  ring(t, SOLD + .3, 540, 650, 40, 400, C.gold, .8, 10);
  burst(t, SOLD + .3, 540, 650, 24, 29, C.goldL, 900, .8);
}

/* ---------- S3: want, not engineering (10.9 – 16) ---------- */
function scene3(t) {
  if (t < 10.9 || t > 16.1) return;
  const end = 15.55, out = 1 - eio(prog(t, end, .35));
  line(t, 'The rock won on [want.]', W / 2, 220, { size: fit('The rock won on want.', 936, 84, 'serif'), start: 11.1, stagger: .09, end });
  ctx.save(); ctx.globalAlpha = out;
  const X0 = 250, MAXW = 700, RY = [560, 720];
  ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.lineCap = 'round'; const ap = eio(prog(t, 11.2, .4));
  ctx.beginPath(); ctx.moveTo(X0, 440); ctx.lineTo(X0, 440 + 380 * ap); ctx.stroke();
  const sp = eback(prog(t, BARS[0] - .1, .4)), rp = eback(prog(t, BARS[1] - .1, .4));
  if (sp > 0) { ctx.save(); ctx.globalAlpha = out; segway(135, RY[0] + 45, .22 * clamp(sp), 1); ctx.restore(); }
  if (rp > 0) rock(135, RY[1] + 36, .9 * clamp(rp));
  const b0 = eback(prog(t, BARS[0], .4)), b1 = eio(prog(t, BARS[1], BAR_D));
  if (b0 > 0) { rr(X0, RY[0] - 24, Math.max(10, 24 * clamp(b0)), 48, 10); ctx.fillStyle = C.ink; ctx.fill(); }
  if (b1 > 0) { rr(X0, RY[1] - 24, Math.max(10, MAXW * b1), 48, 12); ctx.fillStyle = C.gold; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); }
  ctx.restore();
  small('about 30,000', X0 + 60, RY[0] + 13, out * eo(prog(t, BARS[0] + .4, .3)), C.ink, 44, 'left');
  small('over a million', X0 + MAXW - 24, RY[1] + 13, out * eo(prog(t, BARS[1] + BAR_D, .3)), C.ink, 44, 'right');
  const done = BARS[1] + BAR_D;
  ring(t, done, X0 + MAXW, RY[1], 40, 340, C.gold, .8, 10);
  burst(t, done, X0 + MAXW, RY[1], 22, 41, C.goldL, 900, .8);
}

/* ---------- S4: want is discovered (16 – 20.7) ---------- */
const NUGGETS = [[300, 760, 1.5], [580, 800, 1.9], [820, 740, 1.4]];
function nugget(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineWidth = 5 / s; ctx.strokeStyle = C.ink;
  ctx.beginPath(); ctx.moveTo(-44, 6); ctx.lineTo(-26, -34); ctx.lineTo(12, -44); ctx.lineTo(46, -14); ctx.lineTo(34, 26); ctx.lineTo(-10, 38); ctx.closePath(); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-18, -18); ctx.lineTo(10, -26); ctx.lineWidth = 4 / s; ctx.strokeStyle = '#FFFBF3'; ctx.stroke(); ctx.restore();
}
function scene4(t) {
  if (t < 16 || t > 20.8) return;
  const end = 20.25, out = 1 - eio(prog(t, end, .35));
  line(t, 'You can’t manufacture want.', W / 2, 220, { size: fit('You can’t manufacture want.', 936, 80, 'serif'), start: 16.2, stagger: .08, end });
  line(t, 'You [discover] it.', W / 2, 315, { size: 88, start: 17.6, stagger: .12, end });
  ctx.save(); ctx.globalAlpha = out;
  const gp = eio(prog(t, 16.4, .5)), top = 560;
  ctx.fillStyle = 'rgba(58,52,44,0.10)'; ctx.fillRect(72, top, (W - 144) * gp, 330);
  ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(72, top); ctx.lineTo(72 + (W - 144) * gp, top); ctx.stroke();
  ctx.strokeStyle = C.faint; ctx.lineWidth = 3;
  for (let i = 0; i < 26; i++) { const x = 100 + rnd(i) * 860, y = top + 30 + rnd(i + 7) * 280; if (x < 72 + (W - 144) * gp) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 18, y + 6); ctx.stroke(); } }
  NUGGETS.forEach(([x, y, s], i) => {
    const p = eback(prog(t, NUG[i], .4)); if (p <= 0) return;
    glow(x, y, 120 * clamp(p), .5);
    nugget(x, y, s * clamp(p));
    star(x + 50 * s, y - 50 * s, 16, (.5 + .5 * Math.sin(t * 6 + i * 2)) * clamp(p));
  });
  ctx.restore();
  label('ALREADY IN THE GROUND', W / 2, top - 30, out * eo(prog(t, 19.0, .35)), C.goldText, 24);
  NUGGETS.forEach(([x, y], i) => { ring(t, NUG[i] + .2, x, y, 20, 150, C.gold, .6, 6); });
}

/* ---------- S5: the best fit wins (20.7 – 27.6) ---------- */
const WALL = [640, 440, 368, 420], SLOT = [640, 550, 200, 200], CYY = 650;
function spiky(x, y, s, a) {
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineWidth = 6 / s; ctx.strokeStyle = C.ink; ctx.beginPath();
  for (let i = 0; i < 14; i++) { const an = i * Math.PI / 7 - Math.PI / 2, r = i % 2 ? 62 : 122; ctx.lineTo(Math.cos(an) * r, Math.sin(an) * r); }
  ctx.closePath(); ctx.fillStyle = C.faint; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, 30, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 4 / s; ctx.stroke(); ctx.restore();
}
function scene5(t) {
  if (t < 20.7 || t > 27.7) return;
  const end = 27.1, out = 1 - eio(prog(t, end, .35));
  line(t, 'The best product', W / 2, 220, { size: 80, start: 21.0, stagger: .07, end: 23.45 });
  line(t, 'doesn’t win.', W / 2, 310, { size: 80, start: 21.5, stagger: .07, end: 23.45 });
  line(t, 'The best [fit] wins.', W / 2, 225, { size: 92, start: DROP, stagger: .12, end });
  ctx.save(); ctx.globalAlpha = out;
  const wp = eio(prog(t, 21.1, .5));
  ctx.save(); ctx.translate(W, 0); ctx.scale(wp, 1); ctx.translate(-W, 0);
  ctx.beginPath(); ctx.moveTo(WALL[0], WALL[1]); ctx.lineTo(WALL[0] + WALL[2], WALL[1]); ctx.lineTo(WALL[0] + WALL[2], WALL[1] + WALL[3]); ctx.lineTo(WALL[0], WALL[1] + WALL[3]);
  ctx.lineTo(WALL[0], SLOT[1] + SLOT[3]); ctx.lineTo(SLOT[0] + SLOT[2], SLOT[1] + SLOT[3]); ctx.lineTo(SLOT[0] + SLOT[2], SLOT[1]); ctx.lineTo(WALL[0], SLOT[1]); ctx.closePath();
  ctx.fillStyle = 'rgba(58,52,44,0.10)'; ctx.fill(); ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
  const fit1 = eo(prog(t, DROP - .02, .3)); if (fit1 > 0) glow(SLOT[0] + 100, CYY, 260, .7 * fit1);
  const sp = eback(prog(t, 21.4, .45));
  let fx = 280, rot = 0;
  TRY.forEach(s => { const u = (t - s) / .65; if (u > 0 && u < 1) { fx = 280 + 245 * Math.pow(Math.sin(Math.PI * u), .6); rot = .25 * Math.exp(-Math.max(0, u - .5) * 8) * Math.sin(u * 40) * (u > .5 ? 1 : 0); } });
  const away = eio(prog(t, AWAY, .35));
  if (sp > 0 && away < 1) { ctx.save(); ctx.globalAlpha = out * (1 - away); ctx.translate(fx, CYY - 120 * away); ctx.rotate(rot); ctx.scale(clamp(sp), clamp(sp)); spiky(0, 0, 1, 1); ctx.restore(); }
  const pin = eio(prog(t, AWAY, DROP - AWAY)), bump = t > DROP ? 1 + .12 * Math.exp(-(t - DROP) * 10) : 1;
  if (away > 0) { ctx.save(); ctx.translate(lerp(60, SLOT[0] + 100, pin), CYY); ctx.scale(bump, bump); rr(-100, -100, 200, 200, 16); ctx.fillStyle = C.gold; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore(); }
  ctx.restore();
  label('BEST PRODUCT', 280, 870, out * (1 - away) * eo(prog(t, 21.8, .3)), C.ink2, 24);
  ring(t, DROP, SLOT[0] + 100, CYY, 50, 520, C.gold, .8, 12);
  ring(t, DROP + .12, SLOT[0] + 100, CYY, 30, 420, C.goldL, .7, 8);
  burst(t, DROP, SLOT[0] + 100, CYY, 30, 313, C.goldL, 1000, .9);
}

/* ---------- S6: watch, don't ask (27.6 – 33.1) ---------- */
function curve(a, b, c, d, p) {
  const pts = []; for (let i = 0; i <= 50 * p; i++) { const s = i / 50, u = 1 - s; pts.push([u * u * u * a[0] + 3 * u * u * s * b[0] + 3 * u * s * s * c[0] + s * s * s * d[0], u * u * u * a[1] + 3 * u * u * s * b[1] + 3 * u * s * s * c[1] + s * s * s * d[1]]); }
  return pts;
}
function scene6(t) {
  if (t < 27.6 || t > 33.2) return;
  const end = 32.65, out = 1 - eio(prog(t, end, .35));
  line(t, 'Watch what they [do,]', W / 2, 220, { size: 80, start: 27.8, stagger: .08, end });
  line(t, 'not what they say.', W / 2, 310, { size: 64, color: C.ink2, start: 29.4, stagger: .08, end });
  const A = [190, 700], SE = [800, 540], DE = [800, 860];
  ctx.save(); ctx.globalAlpha = out;
  const pp = eback(prog(t, 28.0, .45));
  if (pp > 0) { ctx.save(); ctx.translate(A[0], A[1] + 50); ctx.scale(clamp(pp), clamp(pp)); ctx.translate(-A[0], -A[1] - 50); person(A[0], A[1] + 50, 1.5, C.paper, 'rgba(58,52,44,0.12)', 6); ctx.restore(); }
  const sp = eio(prog(t, SAYS, .9)), dp = eio(prog(t, DOES, HIT - DOES));
  const P1 = curve([A[0] + 90, A[1] - 20], [400, A[1] - 120], [560, SE[1] - 20], [SE[0] - 80, SE[1]], sp);
  if (P1.length > 1) { ctx.save(); ctx.strokeStyle = C.ink2; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.setLineDash([2, 16]); ctx.beginPath(); P1.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke(); ctx.restore(); }
  const P2 = curve([A[0] + 90, A[1] + 40], [400, A[1] + 140], [560, DE[1] - 20], [DE[0] - 80, DE[1]], dp);
  if (P2.length > 1) { ctx.save(); ctx.strokeStyle = C.goldText; ctx.lineWidth = 11; ctx.lineCap = 'round'; ctx.beginPath(); P2.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke(); ctx.restore(); }
  const qp = eback(prog(t, SAYS + .8, .4));
  if (qp > 0) { ctx.save(); ctx.translate(SE[0], SE[1]); ctx.scale(clamp(qp), clamp(qp)); ctx.beginPath(); ctx.arc(0, 0, 62, 0, Math.PI * 2); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink2; ctx.setLineDash([2, 12]); ctx.lineCap = 'round'; ctx.stroke(); ctx.setLineDash([]); ctx.font = font('serif', 80); ctx.textAlign = 'center'; ctx.fillStyle = C.ink2; ctx.fillText('?', 0, 28); ctx.restore(); }
  const cp = eback(prog(t, HIT, .4));
  if (cp > 0) {
    ctx.save(); ctx.translate(DE[0], DE[1]); ctx.scale(clamp(cp), clamp(cp)); glow(0, 0, 200, .7); ctx.beginPath(); ctx.arc(0, 0, 62, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.lineWidth = 13; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(-26, 2); ctx.lineTo(-6, 24); ctx.lineTo(28, -20); ctx.stroke(); ctx.restore();
  }
  ctx.restore();
  label('SAY', 520, 600, out * eo(prog(t, SAYS + .4, .3)), C.ink2, 26);
  label('DO', 520, 920 - 40, out * eo(prog(t, DOES + .4, .3)), C.goldText, 28);
  ring(t, HIT, DE[0], DE[1], 40, 330, C.gold, .8, 10);
  burst(t, HIT, DE[0], DE[1], 22, 604, C.goldL, 1000, .8);
}

/* ---------- S7: smallest test (33.1 – 40.3) ---------- */
function cursor(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 54); ctx.lineTo(14, 42); ctx.lineTo(26, 68); ctx.lineTo(38, 62); ctx.lineTo(26, 38); ctx.lineTo(44, 36); ctx.closePath();
  ctx.fillStyle = C.ink; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = '#FFFBF3'; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
}
function scene7(t) {
  if (t < 33.1 || t > 40.4) return;
  const end = 39.85, out = 1 - eio(prog(t, end, .35));
  line(t, 'Build the smallest test.', W / 2, 220, { size: fit('Build the smallest test.', 936, 80, 'serif'), start: 33.3, stagger: .08, end });
  const s2 = 'A stranger [clicks.] Or doesn’t.';
  line(t, s2, W / 2, 310, { size: fit('A stranger clicks. Or doesn’t.', 936, 58, 'serif'), start: 34.5, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  const gp = eback(prog(t, 34.0, .5)), sp = eback(prog(t, 35.0, .45));
  if (gp > 0) { ctx.save(); ctx.translate(310, 680); ctx.scale(clamp(gp), clamp(gp)); ctx.setLineDash([2, 16]); ctx.lineCap = 'round'; ctx.lineWidth = 6; ctx.strokeStyle = C.ink2; rr(-170, -170, 340, 340, 26); ctx.stroke(); ctx.restore(); }
  const hit = CLICKS.map(c => Math.max(0, 1 - (t - c) / .3) * (t >= c ? 1 : 0)), cnt = CLICKS.filter(c => t >= c).length;
  if (sp > 0) {
    ctx.save(); ctx.translate(790, 700); const pulse = 1 + .1 * Math.max(...hit); ctx.scale(clamp(sp) * pulse, clamp(sp) * pulse);
    glow(0, 0, 200, .5 * Math.min(1, cnt)); rr(-60, -60, 120, 120, 16); ctx.fillStyle = C.gold; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
  }
  const cq = eio(prog(t, 35.2, .5));
  if (cq > 0) { const cx = lerp(1000, 800 + 20 * hit.reduce((a, b) => Math.max(a, b), 0), cq), cy = lerp(520, 700 + 14 * hit.reduce((a, b) => Math.max(a, b), 0), cq); cursor(cx, cy, 1.3); }
  if (cnt > 0) { ctx.save(); const bpp = eback(prog(t, CLICKS[cnt - 1] + .05, .3)); ctx.translate(850, 580); ctx.scale(clamp(bpp), clamp(bpp)); ctx.beginPath(); ctx.arc(0, 0, 38, 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill(); ctx.font = font('sans', 44, 700); ctx.textAlign = 'center'; ctx.fillStyle = C.paper; ctx.fillText(String(cnt), 0, 15); ctx.restore(); }
  ctx.restore();
  CLICKS.forEach(c => ring(t, c, 790, 700, 20, 140, C.gold, .45, 8));
}

/* ---------- S8: who would grieve (40.3 – 47.1) ---------- */
function scene8(t) {
  if (t < 40.3 || t > 47.1) return;
  const end = 46.7, out = 1 - eio(prog(t, end, .35));
  line(t, 'If it vanished,', W / 2, 235, { size: 84, start: 40.65, stagger: .1, end });
  line(t, 'who would [grieve?]', W / 2, 335, { size: 88, start: VANISH, stagger: .1, end });
  ctx.save(); ctx.globalAlpha = out;
  const bp = eback(prog(t, 40.6, .45)), van = prog(t, VANISH, .25);
  if (bp > 0 && van < 1) { ctx.save(); ctx.translate(540, 520); ctx.scale(clamp(bp) * (1 - van * .6), clamp(bp) * (1 - van * .6)); ctx.globalAlpha = out * (1 - van); glow(0, 0, 160, .6); rr(-70, -70, 140, 140, 18); ctx.fillStyle = C.gold; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore(); }
  const GR = [1, 3, 5];
  for (let i = 0; i < 7; i++) {
    const p = eback(prog(t, 40.8 + i * .06, .4)); if (p <= 0) continue;
    const x = 540 + (i - 3) * 140, g = GR.includes(i), react = eo(prog(t, VANISH + .15 + (g ? 0 : 99), .4));
    ctx.save(); ctx.translate(x, 880); ctx.scale(clamp(p), clamp(p)); ctx.translate(-x, -880);
    person(x, 880 + 12 * react, 1.5, g && react > 0 ? C.goldL : C.paper, g && react > 0 ? C.goldL : 'rgba(58,52,44,0.12)', 5);
    ctx.restore();
    if (g && react > 0) { glow(x, 780, 110 * react, .6); }
  }
  ctx.restore();
  GR.forEach(i => ring(t, VANISH + .2, 540 + (i - 3) * 140, 780, 20, 140, C.gold, .6, 6));
  burst(t, VANISH, 540, 520, 30, 707, C.goldL, 1000, .9);
  line(t, 'Build for the [grievers.]', W / 2, 640, { size: 58, color: C.ink, start: 43.4, stagger: .08, end });
}

/* ---------- S9: end card (47.1 – 53) ---------- */
function scene9(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const gp = eio(prog(t, E + .9, .4));
  ctx.fillStyle = C.cream; ctx.globalAlpha = .7; ctx.fillRect(W / 2 - 120 * gp, 186, 240 * gp, 4); ctx.globalAlpha = 1;
  const p1 = eback(prog(t, E + .95, .4)), p2 = eback(prog(t, E + 1.2, .4));
  if (p1 > 0) {
    ctx.save(); ctx.translate(W / 2 - 40, 280); ctx.scale(clamp(p1), clamp(p1)); ctx.strokeStyle = C.cream; ctx.lineWidth = 5; ctx.globalAlpha = .6; ctx.setLineDash([2, 10]); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-50, -40); ctx.lineTo(40, -40); ctx.lineTo(40, -10); ctx.moveTo(-50, 40); ctx.lineTo(40, 40); ctx.lineTo(40, 10); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
  }
  if (p2 > 0) { ctx.save(); ctx.translate(W / 2 + 30, 280); ctx.scale(clamp(p2), clamp(p2)); rr(-34, -34, 68, 68, 10); ctx.fillStyle = C.goldL; ctx.fill(); ctx.restore(); }
  ring(t, E + 1.2, W / 2 + 30, 280, 30, 300, C.goldL, .8, 8);
  const rows = ['Chapter 9:', 'Making Things People Want'], sz = Math.min(...rows.map(r => fit(r, 900, 72, 'serif'))), ry = 520 + rows.length * 78 - 30;
  line(t, 'Value, Created —', W / 2, 430, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  rows.forEach((r, i) => line(t, '[' + r + ']', W / 2, 520 + i * 78, { size: sz, goldColor: C.goldL, start: E + 1.6 + i * .2, stagger: .06 }));
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, ry, 140 * lp, 4);
  line(t, 'Full 7-minute episode — link in comments', W / 2, ry + 90, { font: 'sans', size: fit('Full 7-minute episode — link in comments', 936, 44, 'sans'), color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 24, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8];
const END_CARD = scene9;
