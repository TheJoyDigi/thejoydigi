/* Value, Created Ch 10 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 10, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [10.9, 7.6], [16, 11.2], [20.7, 14.5], [27.6, 19.3], [33.1, 23.2], [40.3, 28.2], [47.1, 33], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const TIRES = [1.0, 1.5], TIRE_DUR = .85, OK = 3.9;
const TIERS = [7.2, 7.75], TOPT = 8.9;
const WALL = 11.3, SYS_GO = 11.9, SYS_HIT = 12.75, PER_GO = 12.4, LEAP = 13.2, LAND = 14.1, PER_HIT = 14.75;
const MEM = [16.9, 17.5, 18.1];
const DROP = 23.6, RISE = 21.3, TOUCH = 22.55;
const BUB = 28.0, STRIKE = 30.0, HEART = 30.5;
const QS = [33.5, 34.7, 35.9];
const SWIPES = [6.4, 20.7, 33.1];
const E = 46.85;
const IMPACTS = [[TIRES[0] + TIRE_DUR, 4], [TIRES[1] + TIRE_DUR, 6], [OK + .25, 11], [TIERS[0] + .35, 4], [TIERS[1] + .35, 5], [TOPT + .25, 12],
  [WALL + .3, 4], [SYS_HIT, 9], [PER_HIT, 8], ...MEM.map(s => [s + .25, 4]), [TOUCH, 6], [DROP, 16], [DROP + .45, 5], [STRIKE + .1, 6], [HEART, 11],
  ...QS.map(s => [s + .1, 3]), [41.4, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 20.7], [20.7, 33.1], [33.1, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
[.45, .6].forEach((x, i) => cue(x + .1, 'blip', { n: [57, 62][i] }));
TIRES.forEach(x => { cue(x, 'whoosh', { v: .3 }); cue(x + TIRE_DUR, 'thud'); cue(x + TIRE_DUR + .05, 'blip', { n: 55 }); });
cue(3.4, 'pop', { f: 1 });
cue(OK, 'whoosh', { v: .35 }); cue(OK + .25, 'impact', { v: .8 }); cue(OK + .25, 'chime', { n: 76 }); cue(4.7, 'pop', { f: 1.1 });
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(7.2, 'pop', { f: .9 });
TIERS.forEach((s, i) => { cue(s, 'whoosh', { v: .3 }); cue(s + .35, 'thud'); cue(s + .4, 'blip', { n: [55, 59][i] }); });
for (let x = TIERS[0] + .6; x < TIERS[1] + 1; x += .14) cue(x, 'tick', { f: 0 });
cue(TOPT, 'whoosh', { v: .4 }); cue(TOPT + .25, 'impact', { v: .8 }); cue(TOPT + .25, 'chime', { n: 79 }); cue(8.4, 'pop', { f: 1 });
cue(11.1, 'pop', { f: 1.2 }); cue(11.9, 'pop', { f: .9 });
cue(WALL, 'whoosh', { v: .3 }); cue(WALL + .3, 'thud');
for (let x = SYS_GO; x < SYS_HIT - .1; x += .12) cue(x, 'tick', { f: 1 });
cue(SYS_HIT, 'impact', { v: .7 }); cue(SYS_HIT, 'knock', { v: .9 });
cue(PER_GO, 'swish'); cue(LEAP, 'whoosh', { v: .4 }); cue(LAND, 'thud'); cue(LAND + .05, 'blip', { n: 64 });
cue(PER_HIT, 'chime', { n: 79 }); cue(PER_HIT, 'impact', { v: .7 });
cue(15.9, 'whoosh', { v: .35 });
cue(16.2, 'pop', { f: 1.2 });
MEM.forEach((s, i) => { cue(s, 'pop', { f: 1 }); cue(s + .1, 'blip', { n: [62, 67, 71][i] }); });
cue(18.9, 'pop', { f: .9 });
cue(20.2, 'riser', { d: DROP - 20.2 }); cue(21.0, 'pop', { f: 1 });
cue(RISE, 'swish'); cue(TOUCH, 'knock', { v: 1 });
for (let x = TOUCH + .2, k = 0; x < DROP - .05; x += .12 - k * .004, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 }); cue(DROP + .45, 'thud');
cue(27.8, 'pop', { f: 1.2 });
cue(BUB, 'whoosh', { v: .3 }); [BUB + .2, BUB + .5, BUB + .8, BUB + 1.1].forEach(x => cue(x, 'tick', { f: 0 }));
cue(STRIKE, 'scratch'); cue(STRIKE + .1, 'impact', { v: .5 });
cue(HEART - .5, 'riser', { d: .5 }); cue(HEART, 'impact', { v: .9 }); cue(HEART, 'chime', { n: 76 }); cue(HEART + .1, 'pop', { f: 1.2 });
cue(HEART + .4, 'knock', { v: .9 }); cue(HEART + .7, 'knock', { v: .7 });
cue(33.3, 'tick', { f: 2 });
QS.forEach((s, i) => { cue(s + .1, 'blip', { n: [64, 67, 71][i] }); cue(s + .1, 'pop', { f: 1 }); });
cue(40.0, 'whoosh', { v: .35 }); cue(40.45, 'thud'); cue(41.4, 'impact', { v: .9 }); cue(42.35, 'swish'); cue(43.4, 'pop', { f: .9 });
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: 6.4, breakdown: 20.2, drop: DROP, end: 46.75 };

/* ---------- shared drawings ---------- */
function tire(x, y, r, rot) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fillStyle = C.fill; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.strokeStyle = C.cream; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath();
  for (let i = 0; i < 18; i++) { const a = i * Math.PI / 9; ctx.moveTo(Math.cos(a) * r * .8, Math.sin(a) * r * .8); ctx.lineTo(Math.cos(a) * r * .94, Math.sin(a) * r * .94); }
  ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, r * .52, 0, Math.PI * 2); ctx.fillStyle = C.paper; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.beginPath();
  for (let i = 0; i < 5; i++) { const a = i * Math.PI * 2 / 5; ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * r * .5, Math.sin(a) * r * .5); }
  ctx.lineWidth = 4; ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, r * .12, 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill();
  ctx.restore();
}
function jacket(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.lineWidth = 5 / s; ctx.strokeStyle = C.ink; ctx.lineJoin = ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 18); ctx.moveTo(-56, 44); ctx.lineTo(0, 18); ctx.lineTo(56, 44); ctx.stroke();
  rr(-52, 44, 104, 190, 14); ctx.fillStyle = 'rgba(58,52,44,0.12)'; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-22, 44); ctx.lineTo(0, 112); ctx.lineTo(22, 44); ctx.stroke();
  [150, 186].forEach(by => { ctx.beginPath(); ctx.arc(0, by, 5, 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill(); });
  ctx.restore();
}
function hand(fill, stroke, lw) {
  ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.fillStyle = fill; ctx.lineJoin = 'round';
  [[-24, 40], [-8, 52], [8, 54], [24, 44]].forEach(([fx, fh]) => { rr(fx - 7, -fh, 14, fh + 12, 7); ctx.fill(); ctx.stroke(); });
  rr(-32, -6, 64, 56, 18); ctx.fill(); ctx.stroke();
  ctx.save(); ctx.translate(-30, 22); ctx.rotate(-.9); rr(-7, -34, 14, 40, 7); ctx.fill(); ctx.stroke(); ctx.restore();
}
function heart(x, y, s, fill) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(0, 60); ctx.bezierCurveTo(-110, -10, -70, -80, 0, -32); ctx.bezierCurveTo(70, -80, 110, -10, 0, 60); ctx.closePath();
  ctx.fillStyle = fill; ctx.fill(); ctx.lineWidth = 6 / s; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
}

/* ---------- S1: snow tires at a suit store (0 – 6.4) ---------- */
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'Two snow tires.', W / 2, 215, { size: 84, start: -.62, stagger: .12, end: 3.7 });
  line(t, 'At a [suit store.]', W / 2, 305, { size: 84, start: -.4, stagger: .12, end: 3.7 });
  line(t, '[Refunded.]', W / 2, 235, { size: 104, start: OK, stagger: .12, end: 5.95 });
  line(t, 'No argument.', W / 2, 325, { size: 60, color: C.ink2, start: 4.7, stagger: .1, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35));
  ctx.save(); ctx.globalAlpha = out;
  ctx.strokeStyle = C.ink; ctx.lineWidth = 8; ctx.lineCap = 'round';
  const cp = eo(prog(t, .3, .6));
  ctx.beginPath(); ctx.moveTo(72, 800); ctx.lineTo(72 + 936 * cp, 800); ctx.stroke();
  ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(1008 - 400 * cp, 462); ctx.lineTo(1008, 462); ctx.stroke();
  [680, 810, 940].forEach((x, i) => { const p = eback(prog(t, .45 + i * .15, .4)); if (p > 0) { ctx.save(); ctx.translate(x, 462); ctx.scale(p, p); ctx.translate(-x, -462); jacket(x, 462, 1); ctx.restore(); } });
  [250, 470].forEach((tx, i) => {
    const p = eo(prog(t, TIRES[i], TIRE_DUR)); if (p <= 0) return;
    const x = lerp(-120, tx, p); tire(x, 690, 110, (x - tx) / 110 + (i ? .6 : 0));
  });
  const bp = eback(prog(t, OK, .4));
  if (bp > 0) {
    ctx.save(); ctx.translate(360, 520); ctx.scale(bp, bp); ctx.beginPath(); ctx.arc(0, 0, 58, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(-22, 2); ctx.lineTo(-6, 20); ctx.lineTo(24, -18); ctx.stroke(); ctx.restore();
  }
  ring(t, OK + .25, 360, 520, 40, 280, C.gold, .7, 10);
  burst(t, OK + .25, 360, 520, 20, 41, C.goldL, 900, .8);
  ctx.restore();
}

/* ---------- S2: automation ate the bottom (6.4 – 10.9) ---------- */
function scene2(t) {
  if (t < 6.4 || t > 11) return;
  const end = 10.45, out = 1 - eio(prog(t, end, .35));
  line(t, 'Automation ate the [bottom.]', W / 2, 220, { size: 66, start: 6.65, end });
  line(t, 'The top is [handmade.]', W / 2, 310, { size: 62, color: C.ink2, start: 8.4, end });
  ctx.save(); ctx.globalAlpha = out;
  [[840, 750, TIERS[0]], [620, 610, TIERS[1]], [400, 470, TOPT]].forEach(([w, y, s], i) => {
    const p = eback(prog(t, s, .4)); if (p <= 0) return;
    ctx.save(); ctx.translate(W / 2, y + 60); ctx.scale(p, p); ctx.translate(-W / 2, -y - 60);
    const x0 = W / 2 - w / 2;
    rr(x0, y, w, 120, 18); ctx.fillStyle = '#FFFBF3'; ctx.fill();
    ctx.save(); rr(x0, y, w, 120, 18); ctx.clip();
    if (i < 2) {
      const fp = eio(prog(t, s + .3, .6));
      ctx.fillStyle = C.fill; ctx.fillRect(x0, y, w * fp, 120);
      ctx.strokeStyle = 'rgba(244,237,224,0.28)'; ctx.lineWidth = 8; ctx.beginPath();
      for (let k = -2; k < w / 40 + 3; k++) { const sx = x0 + k * 40 + (t * 70) % 40; ctx.moveTo(sx, y + 120); ctx.lineTo(sx + 60, y); }
      ctx.save(); ctx.beginPath(); ctx.rect(x0, y, w * fp, 120); ctx.clip(); ctx.stroke(); ctx.restore();
    } else {
      ctx.fillStyle = C.goldL; ctx.fillRect(x0, y, w, 120);
    }
    ctx.restore();
    rr(x0, y, w, 120, 18); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    if (i === 2) {
      ctx.save(); ctx.translate(W / 2 - 120, y + 78); ctx.scale(.75, .75); hand(C.paper, C.ink, 7); ctx.restore();
    }
    ctx.restore();
  });
  ring(t, TOPT + .25, W / 2, 530, 40, 340, C.gold, .7, 10);
  burst(t, TOPT + .25, W / 2, 530, 20, 61, C.goldL, 800, .8);
  ctx.restore();
  label('BY HAND', W / 2 + 40, 540, out * eo(prog(t, TOPT + .2, .3)), C.ink, 30);
}

/* ---------- S3: judgment is the product (10.9 – 16) ---------- */
function scene3(t) {
  if (t < 10.9 || t > 16.1) return;
  const end = 15.55, out = 1 - eio(prog(t, end, .35));
  line(t, 'Judgment is the [product.]', W / 2, 220, { size: 70, start: 11.1, end });
  line(t, 'The refund was just packaging.', W / 2, 305, { size: 50, color: C.ink2, start: 11.9, stagger: .07, end });
  const WX = 620, YS = 790, YP = 640;
  ctx.save(); ctx.globalAlpha = out;
  ctx.strokeStyle = C.faint; ctx.lineWidth = 3; ctx.setLineDash([2, 14]); ctx.lineCap = 'round';
  [YS, YP].forEach(y => { ctx.beginPath(); ctx.moveTo(150, y); ctx.lineTo(950, y); ctx.stroke(); });
  ctx.setLineDash([]);
  const wp = eback(prog(t, WALL, .45));
  if (wp > 0) { ctx.save(); ctx.translate(WX, 840); ctx.scale(1, wp); rr(-26, -340, 52, 340, 14); ctx.fillStyle = C.ink; ctx.fill(); ctx.restore(); }
  const sq = t > SYS_HIT ? .22 * Math.exp(-(t - SYS_HIT) * 8) * Math.cos((t - SYS_HIT) * 28) : 0;
  const sx = lerp(170, 560, eio(prog(t, SYS_GO, SYS_HIT - SYS_GO)));
  const sp = eback(prog(t, SYS_GO - .4, .35));
  if (sp > 0) { ctx.save(); ctx.translate(sx, YS); ctx.scale(sp * (1 - sq), sp * (1 + sq)); ctx.beginPath(); ctx.arc(0, 0, 34, 0, Math.PI * 2); ctx.fillStyle = C.fill; ctx.fill(); ctx.restore(); }
  let px = 170, py = YP;
  if (t >= LEAP) { const q = prog(t, LEAP, LAND - LEAP); px = lerp(520, 720, q); py = YP - 170 * Math.sin(Math.PI * q); }
  if (t >= LAND) { px = lerp(720, 900, eo(prog(t, LAND, PER_HIT - LAND))); py = YP; }
  if (t < LEAP) px = lerp(170, 520, eio(prog(t, PER_GO, LEAP - PER_GO)));
  const pp = eback(prog(t, PER_GO - .4, .35));
  if (pp > 0) { ctx.save(); ctx.translate(px, py); ctx.scale(pp, pp); ctx.beginPath(); ctx.arc(0, 0, 34, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore(); }
  const tp = eback(prog(t, PER_GO - .3, .4));
  if (tp > 0) { ctx.save(); ctx.translate(900, YP); ctx.scale(tp, tp); ctx.beginPath(); ctx.arc(0, 0, 58, 0, Math.PI * 2); ctx.lineWidth = 6; ctx.strokeStyle = C.goldText; ctx.stroke(); ctx.restore(); }
  ctx.restore();
  label('PERSON', 170, YP - 50, out * eo(prog(t, PER_GO - .3, .3)), C.goldText, 24);
  label('SYSTEM', 170, YS + 62, out * eo(prog(t, SYS_GO - .3, .3)), C.ink2, 24);
  label('POLICY', WX, 885, out * eo(prog(t, WALL + .2, .3)), C.ink, 24);
  ring(t, PER_HIT, 900, YP, 40, 300, C.gold, .7, 10);
  burst(t, PER_HIT, 900, YP, 20, 83, C.goldL, 900, .8);
  burst(t, SYS_HIT, 592, YS, 8, 91, C.faint, 300, .5);
}

/* ---------- S4: you remember people (16 – 20.7) ---------- */
function scene4(t) {
  if (t < 16 || t > 20.8) return;
  const end = 20.25, out = 1 - eio(prog(t, end, .35));
  line(t, 'You remember [people.]', W / 2, 220, { size: 80, start: 16.2, end });
  line(t, 'Never the efficient ones.', W / 2, 305, { size: 54, color: C.ink2, start: 18.9, stagger: .07, end });
  const xs = [240, 540, 840], y = 660;
  ctx.save(); ctx.globalAlpha = out;
  xs.forEach((x, i) => {
    const p = eback(prog(t, MEM[i], .45)); if (p <= 0) return;
    ctx.save(); ctx.translate(x, y); ctx.scale(p, p);
    ctx.beginPath(); ctx.arc(0, 0, 98, 0, Math.PI * 2); ctx.fillStyle = i === 1 ? C.goldL : '#FFFBF3'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.lineCap = ctx.lineJoin = 'round'; ctx.strokeStyle = C.ink; ctx.fillStyle = C.ink;
    if (i === 0) { ctx.translate(0, 8); ctx.scale(.9, .9); hand(C.goldL, C.ink, 5); }
    else if (i === 1) {
      rr(-24, -46, 48, 88, 10); ctx.lineWidth = 6; ctx.stroke(); ctx.beginPath(); ctx.arc(0, 28, 5, 0, Math.PI * 2); ctx.fill();
      [0, 1].forEach(k => { ctx.beginPath(); ctx.arc(30, -20, 24 + k * 16, -.9, .9); ctx.lineWidth = 5; ctx.stroke(); });
    } else {
      ctx.lineWidth = 6;
      ctx.beginPath(); ctx.arc(-26, 26, 18, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.arc(26, 26, 18, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-14, 14); ctx.lineTo(40, -44); ctx.moveTo(14, 14); ctx.lineTo(-40, -44); ctx.stroke();
    }
    ctx.restore();
    ring(t, MEM[i] + .25, x, y, 100, 190, C.gold, .5, 6);
  });
  ctx.restore();
  ['NURSE', 'MECHANIC', 'BARBER'].forEach((s, i) => label(s, xs[i], y + 150, out * eo(prog(t, MEM[i] + .2, .3)), C.ink, 26));
}

/* ---------- S5: the extra breaks the cap (20.7 – 27.6) ---------- */
function scene5(t) {
  if (t < 20.7 || t > 27.7) return;
  const end = 27.1, out = 1 - eio(prog(t, end, .35)), CY = 600, BX = 540, BW = 240, BASE = 900;
  line(t, 'Systems stop at adequate.', W / 2, 215, { size: 56, color: C.ink2, start: 21.0, stagger: .08, end });
  line(t, '[The extra] is the value.', W / 2, 305, { size: 68, start: DROP, stagger: .12, end });
  ctx.save(); ctx.globalAlpha = out;
  const lp = eio(prog(t, 20.95, .5));
  ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.setLineDash([22, 14]);
  ctx.beginPath(); ctx.moveTo(72, CY); ctx.lineTo(72 + (W - 144) * lp, CY); ctx.stroke(); ctx.setLineDash([]);
  const rp = eio(prog(t, RISE, TOUCH - RISE)), top = lerp(BASE, CY, rp);
  const hit = t > TOUCH ? Math.exp(-(t - TOUCH) * 7) * Math.cos((t - TOUCH) * 30) : 0;
  const wob = 5 * Math.sin(t * 70) * eo(prog(t, TOUCH + .3, .9)) * (1 - eo(prog(t, DROP, .12)));
  ctx.save(); ctx.translate(BX + wob, BASE); ctx.scale(1 + .08 * hit, 1 - .06 * hit); ctx.translate(-BX, -BASE);
  if (rp > 0) { rr(BX - BW / 2, top, BW, BASE - top, 14); ctx.fillStyle = C.fill; ctx.fill(); }
  ctx.restore();
  const gp = eback(prog(t, DROP, .5));
  if (gp > 0) {
    const gt = CY - 190 * gp, g = ctx.createLinearGradient(0, gt, 0, CY); g.addColorStop(0, C.goldL); g.addColorStop(1, C.gold);
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, CY + 12); ctx.clip();
    rr(BX - BW / 2 + 10, gt, BW - 20, CY - gt + 20, 14); ctx.fillStyle = g; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
    ctx.beginPath(); ctx.moveTo(BX, gt - 44 * gp); ctx.lineTo(BX + 38, gt + 8); ctx.lineTo(BX - 38, gt + 8); ctx.closePath(); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 5; ctx.stroke();
  }
  ctx.restore();
  label('ADEQUATE', 72, CY - 22, out * lp, C.ink2, 26, 'left');
  ring(t, DROP, BX, CY, 60, 520, C.gold, .8, 12);
  ring(t, DROP + .12, BX, CY, 40, 420, C.goldL, .7, 8);
  burst(t, DROP, BX, CY - 60, 30, 313, C.goldL, 1100, .9);
  burst(t, TOUCH, BX, CY, 10, 377, C.faint, 400, .5);
}

/* ---------- S6: you can't automate being cared for (27.6 – 33.1) ---------- */
function scene6(t) {
  if (t < 27.6 || t > 33.2) return;
  const end = 32.65, out = 1 - eio(prog(t, end, .35));
  line(t, 'You can’t automate', W / 2, 215, { size: 72, start: 27.8, stagger: .08, end });
  line(t, '[being cared for.]', W / 2, 303, { size: 72, start: 28.3, stagger: .1, end });
  const bp = eback(prog(t, BUB, .4)), sp = eio(prog(t, STRIKE, .35)), dim = 1 - .55 * sp;
  if (bp > 0) {
    ctx.save(); ctx.globalAlpha = out * dim; ctx.translate(W / 2, 520); ctx.scale(bp, bp); ctx.translate(-W / 2, -520);
    ctx.beginPath(); ctx.moveTo(250, 590); ctx.lineTo(236, 650); ctx.lineTo(320, 592); ctx.closePath(); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.strokeStyle = C.ink; ctx.stroke();
    rr(190, 430, 700, 164, 40); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(252, 592); ctx.lineTo(318, 592); ctx.strokeStyle = '#FFFBF3'; ctx.lineWidth = 8; ctx.stroke();
    ctx.restore();
    ctx.save(); ctx.globalAlpha = dim; line(t, 'I understand your frustration.', W / 2, 526, { font: 'sans', size: 38, color: C.ink, start: BUB + .25, stagger: .22, end }); ctx.restore();
    label('CHATBOT', 190, 410, out * dim * eo(prog(t, BUB + .1, .3)), C.ink2, 24, 'left');
    if (sp > 0) {
      ctx.save(); ctx.globalAlpha = out; ctx.strokeStyle = C.ink; ctx.lineWidth = 7; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(224, 506); ctx.lineTo(lerp(224, 856, sp), lerp(506, 486, sp)); ctx.stroke(); ctx.restore();
    }
  }
  const hp = eback(prog(t, HEART, .4));
  if (hp > 0) {
    const beat = 1 + .06 * Math.sin((t - HEART) * 9) * eo(prog(t, HEART + .5, .3));
    ctx.save(); ctx.globalAlpha = out; heart(W / 2, 770, 1.45 * hp * beat, C.goldL); ctx.restore();
  }
  label('A PERSON', W / 2, 905, out * eo(prog(t, HEART + .3, .3)), C.goldText, 26);
  ring(t, HEART, W / 2, 770, 60, 420, C.gold, .8, 10);
  burst(t, HEART, W / 2, 770, 22, 604, C.goldL, 1000, .8);
}

/* ---------- S7: three moves (33.1 – 40.3) ---------- */
function icon(kind, t) {
  ctx.save(); ctx.strokeStyle = C.cream; ctx.fillStyle = C.cream; ctx.lineWidth = 4; ctx.lineCap = ctx.lineJoin = 'round';
  if (kind === 0) {
    const bl = 1 - .85 * Math.max(0, Math.sin(t * 2.2) * 6 - 5.2);
    ctx.beginPath(); ctx.moveTo(-22, 0); ctx.quadraticCurveTo(0, -20 * bl, 22, 0); ctx.quadraticCurveTo(0, 20 * bl, -22, 0); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, 7, 0, Math.PI * 2); ctx.fill();
  } else if (kind === 1) {
    const dx = 3 * Math.sin(t * 3);
    ctx.beginPath(); ctx.arc(-4 + dx, -4, 13, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(6 + dx, 6); ctx.lineTo(20 + dx, 20); ctx.stroke();
  } else {
    ctx.beginPath(); ctx.arc(0, 2, 16, -2.6, 1.9); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-18, -12); ctx.lineTo(-17, -1); ctx.lineTo(-7, -6); ctx.closePath(); ctx.fill();
  }
  ctx.restore();
}
function scene7(t) {
  if (t < 33.1 || t > 40.4) return;
  const qEnd = 39.85;
  label('THREE MOVES', W / 2, 290, env(t, 33.3, qEnd, .3), C.goldText, 26);
  ['Be [present.]', 'Hear the [real problem.]', '[Follow up.]'].forEach((q, i) => {
    const s = QS[i], y = 460 + i * 160;
    const np = eback(prog(t, s, .3)) * (1 - eio(prog(t, qEnd, .3)));
    if (np > 0) {
      ctx.save(); ctx.translate(205, y - 22); ctx.scale(np, np);
      ctx.beginPath(); ctx.arc(0, 0, 40, 0, Math.PI * 2); ctx.fillStyle = i === 2 ? C.ink : C.gold; ctx.fill();
      icon(i, t); ctx.restore();
    }
    line(t, q, 270, y, { size: 62, align: 'left', start: s + .1, stagger: .08, end: qEnd });
  });
}

/* ---------- S8: takeaway (40.3 – 47.1) ---------- */
function scene8(t) {
  if (t < 40.3 || t > 47.1) return;
  const end = 46.7;
  line(t, 'Machines do the routine.', W / 2, 440, { size: 66, start: 40.45, stagger: .1, end });
  const r = line(t, '[Humans do the caring.]', W / 2, 570, { size: 76, start: 41.4, stagger: .1, end });
  const u = eio(prog(t, 42.35, .4)) * (1 - eio(prog(t, end, .35)));
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 606, r.w * u, 9); }
  line(t, 'By hand. With care.', W / 2, 740, { size: 54, color: C.ink2, start: 43.4, stagger: .1, end });
  burst(t, 41.5, W / 2, 540, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S9: end card (47.1 – 53) ---------- */
function scene9(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const hp = eback(prog(t, E + .95, .45));
  if (hp > 0) { ctx.save(); ctx.translate(W / 2, 290); ctx.scale(hp * 1.15, hp * 1.15); hand(C.goldL, C.cream, 5); ctx.restore(); }
  ring(t, E + 1.2, W / 2, 270, 30, 300, C.goldL, .8, 8);
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  const title = 'Chapter 10: Service, by Hand';
  line(t, '[' + title + ']', W / 2, 535, { size: fit(title, 900, 66, 'serif'), goldColor: C.goldL, start: E + 1.6, stagger: .06 });
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
