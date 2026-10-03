/* Value, Created Ch 22 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 22, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [10.9, 7.6], [16, 11.2], [20.7, 14.5], [27.6, 19.3], [33.1, 23.2], [40.3, 28.2], [47.1, 33], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const FISH0 = .4, FISH_DT = .09, SUN0 = 1.7, SUN1 = 5.5, GONE = 3.1;
const MOVE = 7.3, FREEZE = 8.4;
const OBJ = [13.4, 13.7, 14.0], ROW = [14.9, 16.1, 17.3];
const TICK = ROW.map(r => [0, 1, 2].map(k => r + .3 + k * .15));
const DROP = 23.6, CRACK = 22.2;
const SL = [28.4, 29.5, 30.6];
const MELT0 = 35.0, MELT1 = 37.6, CHECK = 36.9;
const SWIPES = [6.4, 20.7, 33.1];
const E = 46.85;
const IMPACTS = [[5.5, 6], [FREEZE, 9], [TICK[2][2], 6], [DROP, 16], [DROP + .45, 5], ...SL.map((s, i) => [s + .1, 3 + i * 2]), [CHECK, 8], [41.4, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 20.7], [20.7, 33.1], [33.1, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
for (let i = 0; i < 12; i++) cue(FISH0 + i * FISH_DT + .1, 'tick', { f: i % 2 });
[.45, .8, 1.15].forEach((x, i) => cue(x + .1, 'blip', { n: [55, 59, 62][i] }));
cue(GONE, 'pop', { f: 1.1 }); cue(SUN0, 'whoosh', { v: .3 });
cue(4.4, 'drain', { d: 1.2 }); cue(5.5, 'thud');
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(7.2, 'pop', { f: .9 });
cue(MOVE, 'whoosh', { v: .35 }); cue(MOVE + .9, 'thud');
cue(FREEZE, 'impact', { v: .8 }); cue(FREEZE, 'chime', { n: 76 });
[.2, .35, .5].forEach((x, i) => cue(FREEZE + x, 'blip', { n: [69, 72, 76][i] }));
cue(9.2, 'pop', { f: .9 }); cue(9.4, 'pop', { f: 1 });
cue(12.6, 'pop', { f: 1.2 }); cue(13.0, 'pop', { f: .9 });
OBJ.forEach((s, i) => { cue(s, 'whoosh', { v: .25 }); cue(s + .2, 'blip', { n: [60, 64, 67][i] }); });
ROW.forEach(r => cue(r, 'pop', { f: 1 }));
TICK.forEach((row, ri) => row.forEach((x, k) => { cue(x, 'tick', { f: 2 }); cue(x + .02, 'blip', { n: 60 + ri * 4 + k * 2 }); }));
cue(TICK[2][2] + .15, 'chime', { n: 79 }); cue(TICK[2][2] + .15, 'impact', { v: .5 });
cue(20.2, 'riser', { d: DROP - 20.2 }); cue(21.0, 'pop', { f: 1.1 });
for (let x = CRACK, k = 0; x < DROP - .05; x += .22 - k * .004, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .15, 'drain', { d: 1.4 });
cue(DROP + .45, 'thud'); cue(DROP + .8, 'swish'); cue(25.2, 'pop', { f: .9 });
cue(27.8, 'pop', { f: 1.2 }); cue(28.0, 'swish');
SL.forEach((s, i) => { cue(s, 'whoosh', { v: .25 }); cue(s + .35, 'thud'); cue(s + .4, 'blip', { n: [60, 64, 67][i] }); });
cue(31.2, 'pop', { f: .9 });
cue(33.3, 'tick', { f: 2 }); cue(33.4, 'pop', { f: 1.1 }); cue(34.2, 'pop', { f: .9 });
for (let x = MELT0 + .2; x < MELT1; x += .4) cue(x, 'tick', { f: 0 });
cue(35.4, 'whoosh', { v: .3 }); cue(35.7, 'pop', { f: 1 }); cue(36.4, 'pop', { f: 1.1 });
cue(CHECK, 'impact', { v: .7 }); cue(CHECK, 'chime', { n: 76 });
cue(40.0, 'whoosh', { v: .35 }); cue(40.45, 'thud'); cue(41.4, 'impact', { v: .9 }); cue(41.4, 'chime', { n: 76 });
cue(42.35, 'swish'); cue(43.4, 'pop', { f: .9 });
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: 6.4, breakdown: 20.2, drop: DROP, end: 46.75 };

const pop = (t, a, d) => Math.max(0, eback(prog(t, a, d)));
const mix = (a, b, p) => `rgb(${a.map((v, i) => Math.round(lerp(v, b[i], p))).join(',')})`;
const hl = (t, str, y, o) => line(t, str, W / 2, y, Object.assign({}, o, { size: fit(str, 900, o.size || 80, 'serif') }));

function spark(x, y, r, a) {
  if (a <= 0 || r <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= a; ctx.beginPath();
  for (let i = 0; i < 8; i++) { const rad = i % 2 ? r * .25 : r, an = i * Math.PI / 4 - Math.PI / 2; ctx.lineTo(Math.cos(an) * rad, Math.sin(an) * rad); }
  ctx.closePath(); ctx.fillStyle = C.goldL; ctx.fill(); ctx.restore();
}

/* fish is anchored at its centre and w is its overall length */
function fish(x, y, w, fill, o) {
  o = o || {};
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); const s = w / 220; ctx.scale(s, s);
  ctx.lineWidth = (o.lw || 5) / s; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round';
  if (o.dash) ctx.setLineDash([22, 16]);
  ctx.beginPath(); ctx.ellipse(10, 0, 88, 46, 0, 0, Math.PI * 2); if (fill) { ctx.fillStyle = fill; ctx.fill(); } ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-70, 0); ctx.lineTo(-118, -38); ctx.lineTo(-118, 38); ctx.closePath(); if (fill) { ctx.fillStyle = fill; ctx.fill(); } ctx.stroke();
  if (!o.dash) { ctx.beginPath(); ctx.arc(55, -10, 7, 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill(); }
  ctx.restore();
}

/* ice block is anchored at its bottom centre */
function ice(x, yb, w, h, p) {
  if (p <= 0 || h < 3) return;
  ctx.save(); ctx.globalAlpha *= p;
  rr(x - w / 2, yb - h, w, h, Math.min(22, h / 2)); ctx.fillStyle = 'rgba(255,255,255,0.32)'; ctx.fill();
  ctx.save(); ctx.clip(); ctx.strokeStyle = 'rgba(26,24,20,0.09)'; ctx.lineWidth = 3; ctx.beginPath();
  for (let k = -h; k < w; k += 30) { ctx.moveTo(x - w / 2 + k, yb); ctx.lineTo(x - w / 2 + k + h, yb - h); }
  ctx.stroke(); ctx.restore();
  rr(x - w / 2, yb - h, w, h, Math.min(22, h / 2)); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
  if (h > 140) {
    ctx.strokeStyle = 'rgba(255,255,255,0.9)'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath();
    ctx.moveTo(x - w / 2 + 34, yb - h + 38); ctx.lineTo(x - w / 2 + 34, yb - h + 92);
    ctx.moveTo(x - w / 2 + 34, yb - h + 110); ctx.lineTo(x - w / 2 + 34, yb - h + 124);
    ctx.stroke();
  }
  ctx.restore();
}

function flake(x, y, r, a) {
  if (a <= 0 || r <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= a; ctx.strokeStyle = C.ink2; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath();
  for (let i = 0; i < 3; i++) { const an = i * Math.PI / 3; ctx.moveTo(Math.cos(an) * r, Math.sin(an) * r); ctx.lineTo(-Math.cos(an) * r, -Math.sin(an) * r); }
  ctx.stroke(); ctx.restore();
}

function puddle(x, y, rx, ry) {
  if (rx < 2) return;
  ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(221,182,95,0.5)'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke();
}

function drip(x, y, r) {
  ctx.beginPath(); ctx.moveTo(x, y - r * 1.8); ctx.quadraticCurveTo(x + r, y - r * .2, x, y + r); ctx.quadraticCurveTo(x - r, y - r * .2, x, y - r * 1.8);
  ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.ink; ctx.stroke();
}

function sun(x, y, r, t) {
  ctx.save(); ctx.translate(x, y);
  ctx.strokeStyle = C.gold; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath();
  for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5 + t * .4; ctx.moveTo(Math.cos(a) * (r + 14), Math.sin(a) * (r + 14)); ctx.lineTo(Math.cos(a) * (r + 32), Math.sin(a) * (r + 32)); }
  ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.restore();
}

function gear(x, y, r, rot) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath();
  for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8, rad = i % 2 ? r * .8 : r; ctx.lineTo(Math.cos(a) * rad, Math.sin(a) * rad); }
  ctx.closePath(); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round'; ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, r * .3, 0, Math.PI * 2); ctx.fillStyle = C.paper; ctx.fill(); ctx.stroke();
  ctx.restore();
}

function tick(x, y, s) {
  if (s <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.arc(0, 0, 24, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill();
  ctx.strokeStyle = C.cream; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-10, 1); ctx.lineTo(-3, 9); ctx.lineTo(11, -8); ctx.stroke(); ctx.restore();
}

/* ---------- S1: the catch rots (0 – 6.4) ---------- */
const GY = 820;
const HEAP = [[260, 784], [400, 788], [540, 784], [680, 788], [820, 784], [330, 730], [470, 734], [610, 730], [750, 734], [400, 676], [540, 680], [680, 676]]
  .map(([x, y], i) => [x + (rnd(i + 5) - .5) * 24, y, (rnd(i + 20) - .5) * .5]);
function scene1(t) {
  if (t > 6.6) return;
  hl(t, 'Best catch of his life.', 215, { size: 80, start: -.62, stagger: .1, end: 5.95 });
  hl(t, 'Gone by [sunset.]', 305, { size: 86, start: GONE, stagger: .12, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35)), u = prog(t, SUN0, SUN1 - SUN0), decay = eio(prog(t, 2.0, 3.4));
  ctx.save(); ctx.globalAlpha = out;
  ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(72, GY); ctx.lineTo(W - 72, GY); ctx.stroke();
  const sp = pop(t, SUN0, .5);
  if (sp > 0) {
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, GY - 3); ctx.clip();
    ctx.translate(lerp(150, 930, u), GY - 340 * Math.sin(Math.PI * u) + 60 * (1 - sp)); sun(0, 0, 58 * sp, t); ctx.restore();
  }
  HEAP.forEach(([x, y, rot], i) => {
    const p = pop(t, FISH0 + i * FISH_DT, .35); if (p <= 0) return;
    fish(x, y, 170 * p, mix([221, 182, 95], [150, 143, 132], decay), { rot, lw: 4 });
  });
  ctx.strokeStyle = C.ink2; ctx.lineWidth = 4; ctx.lineCap = 'round';
  [400, 540, 680].forEach((x, i) => {
    const a = decay * eo(prog(t, 2.6 + i * .2, .4)); if (a <= 0) return;
    ctx.globalAlpha = out * a * .8; ctx.beginPath();
    for (let k = 0; k <= 20; k++) { const yy = 630 - k * 5, xx = x + 10 * Math.sin(t * 5 + k * .5 + i * 2) * (k / 20 + .3); k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }
    ctx.stroke();
  });
  ctx.restore();
}

/* ---------- S2: money is created value, frozen (6.4 – 12.4) ---------- */
function scene2(t) {
  if (t < 6.4 || t > 12.5) return;
  const end = 11.95, out = 1 - eio(prog(t, end, .35)), BX = 690, BY = 820, BW = 420, BH = 350;
  hl(t, 'Money is created', 220, { size: 80, start: 6.65, end });
  hl(t, '[value, frozen.]', 312, { size: 90, start: 7.2, end });
  hl(t, 'Spend it later.', 396, { size: 52, color: C.ink2, start: 9.2, end });
  ctx.save(); ctx.globalAlpha = out;
  const fz = eio(prog(t, FREEZE, .5)), ap = eo(prog(t, 7.0, .4));
  if (fz < 1) {
    ctx.save(); ctx.globalAlpha = out * ap * (1 - fz); ctx.setLineDash([16, 14]); ctx.lineWidth = 5; ctx.strokeStyle = C.ink2;
    rr(BX - BW / 2, BY - BH, BW, BH, 22); ctx.stroke(); ctx.restore();
  }
  const m = eio(prog(t, MOVE, 1.0)), fp = pop(t, .3 + 6.5, .4);
  fish(lerp(240, BX, m), lerp(660, BY - BH / 2, m), lerp(230, 220, m) * fp, C.goldL);
  ice(BX, BY, BW, BH, fz);
  const tp = eo(prog(t, 7.0, .3)) * (1 - eo(prog(t, MOVE + .2, .3)));
  label('TODAY', 240, 800, out * tp, C.ink, 26);
  label('LATER', BX, 868, out * eo(prog(t, 9.4, .3)), C.goldText, 26);
  ctx.restore();
  [[-190, -110, 26], [-110, -170, 18], [170, -150, 24], [200, -60, 16], [60, -190, 20]].forEach(([dx, dy, r], i) =>
    spark(BX + dx, BY - BH / 2 + dy, r * pop(t, FREEZE + .1 + i * .08, .35), Math.max(0, .6 + .4 * Math.sin(t * 5 + i)) * out));
  [[-BW / 2 + 40, -BH + 44, 22], [BW / 2 - 44, -BH + 52, 16], [BW / 2 - 50, -50, 20]].forEach(([dx, dy, r], i) => flake(BX + dx, BY + dy, r * pop(t, FREEZE + .3 + i * .12, .4), out));
  ring(t, FREEZE, BX, BY - BH / 2, 40, 330, C.gold, .7, 10);
  burst(t, FREEZE, BX, BY - BH / 2, 22, 801, C.goldL, 900, .8);
}

/* ---------- S3: three freezers, three tests (12.4 – 20.7) ---------- */
const COLS = [400, 620, 840], ROWY = [650, 745, 840];
function shell() {
  ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(0, 38); ctx.arc(0, 38, 78, Math.PI * 1.12, Math.PI * 1.88); ctx.closePath(); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
  ctx.beginPath();
  for (let i = 1; i < 5; i++) { const a = Math.PI * (1.12 + .76 * i / 5); ctx.moveTo(0, 38); ctx.lineTo(Math.cos(a) * 78, 38 + Math.sin(a) * 78); }
  ctx.stroke();
  rr(-18, 38, 36, 16, 6); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
}
function salt() {
  ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round';
  [[0, 6, 54], [-52, 38, 26], [50, 40, 22]].forEach(([x, y, r]) => {
    ctx.save(); ctx.translate(x, y);
    ctx.beginPath(); for (let i = 0; i < 6; i++) ctx.lineTo(Math.cos(i * Math.PI / 3 - Math.PI / 2) * r, Math.sin(i * Math.PI / 3 - Math.PI / 2) * r);
    ctx.closePath(); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, r); ctx.moveTo(0, 0); ctx.lineTo(-r * .87, -r / 2); ctx.moveTo(0, 0); ctx.lineTo(r * .87, -r / 2); ctx.stroke();
    ctx.restore();
  });
}
function record() {
  ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.lineCap = 'round';
  rr(-72, -56, 144, 112, 14); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.stroke();
  [-28, 0, 28].forEach((y, i) => {
    ctx.beginPath(); ctx.arc(-46, y, 7, 0, Math.PI * 2); ctx.fillStyle = i === 1 ? C.gold : C.ink; ctx.fill();
    ctx.beginPath(); ctx.moveTo(-26, y); ctx.lineTo(48 - i * 12, y); ctx.stroke();
  });
}
function scene3(t) {
  if (t < 12.4 || t > 20.8) return;
  const end = 20.2, out = 1 - eio(prog(t, end, .35));
  hl(t, 'Every money is a [freezer.]', 215, { size: 78, start: 12.4, end });
  hl(t, 'Same three tests, every time.', 297, { size: 48, color: C.ink2, start: 13.0, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  [shell, salt, record].forEach((fn, i) => {
    const p = pop(t, OBJ[i], .4); if (p <= 0) return;
    ctx.save(); ctx.translate(COLS[i], 440); ctx.scale(p, p);
    rr(-98, -78, 196, 156, 20); ctx.fillStyle = 'rgba(58,52,44,0.08)'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke();
    fn(); ctx.restore();
    label(['SHELL', 'SALT', 'RECORD'][i], COLS[i], 556, out * eo(prog(t, OBJ[i] + .2, .3)), C.ink, 24);
  });
  ['KEEPS?', 'SCARCE?', 'TRUSTED?'].forEach((s, r) => {
    const a = eo(prog(t, ROW[r], .3));
    label(s, 72, ROWY[r] + 9, a, C.ink2, 26, 'left');
    ctx.save(); ctx.globalAlpha = out * a * .6; ctx.strokeStyle = C.faint; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(72, ROWY[r] + 42); ctx.lineTo(W - 72, ROWY[r] + 42); ctx.stroke(); ctx.restore();
    COLS.forEach((x, k) => tick(x, ROWY[r], pop(t, TICK[r][k], .3)));
  });
  ctx.restore();
  ring(t, TICK[2][2], COLS[2], ROWY[2], 30, 280, C.gold, .7, 10);
  burst(t, TICK[2][2], COLS[2], ROWY[2], 20, 911, C.goldL, 800, .8);
}

/* ---------- S4: the freezer breaks (20.7 – 27.6) ---------- */
function scene4(t) {
  if (t < 20.7 || t > 27.7) return;
  const end = 27.1, out = 1 - eio(prog(t, end, .35)), X = 540, YB = 800, BW = 440, BH = 340;
  hl(t, 'Then the freezer [breaks.]', 215, { size: 78, start: 21.0, stagger: .1, end });
  hl(t, '[Value melts.]', 312, { size: 92, start: DROP, stagger: .14, end });
  hl(t, 'The thaw comes back smaller.', 396, { size: 50, color: C.ink2, start: 25.2, stagger: .07, end });
  const bp = pop(t, 20.95, .4), m = eio(prog(t, DROP, .9)), h = BH * (1 - .88 * m);
  const wob = 6 * Math.sin(t * 70) * eo(prog(t, CRACK, .9)) * (1 - eo(prog(t, DROP, .15)));
  ctx.save(); ctx.globalAlpha = out;
  puddle(X, YB + 4, 330 * m, 32 * m);
  if (bp > 0) {
    ctx.save(); ctx.translate(X + wob, YB); ctx.scale(bp, bp); ctx.translate(-X, -YB);

    ice(X, YB, BW * (1 + .15 * m), h, 1 - eo(prog(t, DROP + .5, .5)));
    const cr = eo(prog(t, CRACK, 1.3)) * (1 - m);
    if (cr > .01) {
      ctx.strokeStyle = C.ink; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
      [[-120, -BH, [[0, 0], [24, 50], [-10, 100], [20, 160]]], [70, -BH, [[0, 0], [-20, 60], [14, 110], [-14, 170]]]].forEach(([cx, cy, pts]) => {
        const n = Math.max(2, Math.ceil(pts.length * cr)); pts.slice(0, n).forEach(([dx, dy], i) => i ? ctx.lineTo(X + cx + dx, YB + cy + dy) : ctx.moveTo(X + cx + dx, YB + cy + dy));
      });
      ctx.stroke();
    }
    ctx.restore();
  }
  const dr = eo(prog(t, 21.6, .4)) * (1 - m);
  if (dr > 0) [-150, -30, 100, 170].forEach((dx, i) => {
    const ph = (t * .9 + i * .27) % 1; drip(X + dx, YB + 6 + ph * ph * 40, 9 * dr * (1 - ph * .3));
  });
  const fm = eo(prog(t, DROP + .1, .9)), gp = eo(prog(t, DROP + .7, .4));
  if (bp > 0) fish(lerp(X + wob, 790, fm), lerp(YB - BH / 2, 640, fm), lerp(230, 100, fm) * bp, C.goldL, { lw: lerp(5, 4, fm) });
  if (gp > 0) {
    ctx.save(); ctx.globalAlpha = out * gp; fish(290, 640, 230, null, { dash: true, lw: 5 });
    ctx.strokeStyle = C.ink2; ctx.lineWidth = 4; ctx.setLineDash([4, 14]); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(440, 640); ctx.lineTo(670, 640); ctx.stroke(); ctx.restore();
    label('WENT IN', 290, 740, out * gp, C.ink2, 26); label('CAME OUT', 790, 740, out * gp, C.goldText, 26);
  }
  ctx.restore();
  ring(t, DROP, X, YB - 100, 60, 520, C.gold, .8, 12);
  ring(t, DROP + .12, X, YB - 100, 40, 420, C.goldL, .7, 8);
  burst(t, DROP, X, YB - 80, 28, 313, C.goldL, 1000, .9);
  burst(t, DROP + .1, X, YB - 150, 16, 377, C.gold, 800, .8);
}

/* ---------- S5: printing more means thinner slices (27.6 – 33.1) ---------- */
function scene5(t) {
  if (t < 27.6 || t > 33.2) return;
  const end = 32.65, out = 1 - eio(prog(t, end, .35)), X0 = 110, SW = 860, Y0 = 480, SH = 280;
  hl(t, 'Print more? Thinner [slices.]', 215, { size: 78, start: 27.8, end });
  hl(t, 'The freezer never got bigger.', 297, { size: 48, color: C.ink2, start: 31.2, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  const bp = eio(prog(t, 28.0, .5));
  rr(X0, Y0, SW * bp, SH, 20); ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
  if (bp > .98) fish(W / 2, Y0 + SH / 2, 240, C.goldL);
  [4, 8, 16].forEach((N, s) => {
    const a = eo(prog(t, SL[s], .35)) * (s < 2 ? 1 - eo(prog(t, SL[s + 1], .35)) : 1);
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = out * a * .55; ctx.beginPath(); ctx.rect(X0, Y0, SW, SH); ctx.clip(); ctx.fillStyle = C.goldL;
    for (let i = 0; i < N; i += 2) ctx.fillRect(X0 + SW * i / N, Y0, SW / N, SH);
    ctx.restore();
  });
  ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.lineCap = 'round';
  for (let k = 1; k < 16; k++) {
    const s = k % 4 === 0 ? 0 : k % 2 === 0 ? 1 : 2, q = eio(prog(t, SL[s], .5)); if (q <= 0) continue;
    const x = X0 + SW * k / 16; ctx.beginPath(); ctx.moveTo(x, Y0); ctx.lineTo(x, Y0 + SH * q); ctx.stroke();
  }
  ctx.restore();
  [4, 8, 16].forEach((N, s) => label(N + ' SLICES', W / 2, 830, out * eo(prog(t, SL[s], .3)) * (s < 2 ? 1 - eo(prog(t, SL[s + 1], .3)) : 1), C.goldText, 30));
  label('SAME BLOCK', W / 2, 880, out * eo(prog(t, 28.4, .3)), C.ink2, 24);
  SL.forEach((s, i) => burst(t, s + .3, X0 + SW * (i ? .5 : .25), Y0 + SH / 2, 10, 520 + i * 31, C.goldL, 500, .6));
}

/* ---------- S6: the freezer test (33.1 – 40.3) ---------- */
function scene6(t) {
  if (t < 33.1 || t > 40.4) return;
  const end = 39.85, out = 1 - eio(prog(t, end, .35)), YB = 790, BW = 340, BH = 340, XL = 290, XR = 790;
  hl(t, 'Run the freezer test.', 215, { size: 80, start: 33.4, stagger: .1, end });
  hl(t, 'Freezer, or melting ice?', 297, { size: 50, color: C.ink2, start: 34.2, stagger: .07, end: 36.1 });
  hl(t, '[Skills] don’t melt.', 297, { size: 56, start: 36.4, stagger: .1, end });
  const m = eio(prog(t, MELT0, MELT1 - MELT0)), h = BH * (1 - .85 * m), lp = pop(t, 33.9, .4), rp = pop(t, 34.2, .4);
  ctx.save(); ctx.globalAlpha = out;
  if (lp > 0) {
    ctx.save(); ctx.translate(XL, YB); ctx.scale(lp, lp); ctx.translate(-XL, -YB);
    puddle(XL, YB + 4, 170 * m, 18 * m);
    fish(XL, YB - Math.max(h / 2, 30), lerp(220, 70, m), C.goldL);
    ice(XL, YB, BW * (1 + .1 * m), h, 1);
    if (m > .02 && m < .95) [-80, 10, 90].forEach((dx, i) => { const ph = (t * .9 + i * .3) % 1; drip(XL + dx, YB + 6 + ph * ph * 40, 8); });
    ctx.restore();
  }
  if (rp > 0) {
    ctx.save(); ctx.translate(XR, YB); ctx.scale(rp, rp); ctx.translate(-XR, -YB);
    gear(XR, YB - BH / 2, 100 * pop(t, 35.4, .4), t * .8);
    ice(XR, YB, BW, BH, 1);
    ctx.restore();
  }
  ctx.restore();
  label('MELTING ICE', XL, 870, out * eo(prog(t, 34.2, .3)), C.ink2, 26);
  label('YOUR SKILLS', XR, 870, out * eo(prog(t, 34.4, .3)), C.goldText, 26);
  tick(XR + BW / 2 - 10, YB - BH + 6, pop(t, CHECK, .35) * out);
  ring(t, CHECK, XR, YB - BH / 2, 40, 300, C.gold, .7, 10);
  burst(t, CHECK, XR, YB - BH / 2, 20, 655, C.goldL, 800, .8);
}

/* ---------- S7: takeaway (40.3 – 47.1) ---------- */
function scene7(t) {
  if (t < 40.3 || t > 47.1) return;
  const end = 46.7;
  hl(t, 'The value was never', 370, { size: 84, start: 40.45, stagger: .08, end });
  hl(t, 'in the money.', 460, { size: 84, start: 40.8, stagger: .08, end });
  const r = hl(t, '[It was in the creating.]', 610, { size: 100, start: 41.4, stagger: .1, end });
  const u = eio(prog(t, 42.35, .4)) * (1 - eio(prog(t, end, .35)));
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 646, r.w * u, 9); }
  hl(t, 'You can always make more fish.', 780, { size: 50, color: C.ink2, start: 43.4, stagger: .07, end });
  const fp = pop(t, 43.9, .4) * (1 - eio(prog(t, end, .35)));
  if (fp > 0) fish(W / 2, 880 + 6 * Math.sin(t * 4), 110 * fp, C.goldL);
  burst(t, 41.5, W / 2, 580, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S8: end card (47.1 – 53) ---------- */
function scene8(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const gp = eio(prog(t, E + .9, .4));
  ctx.fillStyle = C.cream; ctx.globalAlpha = .7; ctx.fillRect(W / 2 - 120 * gp, 186, 240 * gp, 4); ctx.globalAlpha = 1;
  const p = pop(t, E + .95, .4);
  if (p > 0) {
    ctx.save(); ctx.translate(W / 2, 250); ctx.scale(p, p);
    rr(-62, -42, 124, 84, 16); ctx.fillStyle = 'rgba(244,237,224,0.14)'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.cream; ctx.stroke();
    ctx.beginPath(); ctx.ellipse(6, 0, 30, 15, 0, 0, Math.PI * 2); ctx.moveTo(-24, 0); ctx.lineTo(-42, -13); ctx.lineTo(-42, 13); ctx.closePath();
    ctx.fillStyle = C.goldL; ctx.fill(); ctx.restore();
  }
  ring(t, E + 1.2, W / 2, 250, 30, 300, C.goldL, .8, 8);
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  const ts = 'Chapter 22: Money: Value, Frozen';
  line(t, '[' + ts + ']', W / 2, 535, { size: fit(ts, 900, 60, 'serif'), goldColor: C.goldL, start: E + 1.6, stagger: .06 });
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, 590, 140 * lp, 4);
  line(t, 'Full 8-minute episode — link in comments', W / 2, 680, { font: 'sans', size: 38, color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 22, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene1, scene2, scene3, scene4, scene5, scene6, scene7];
const END_CARD = scene8;
