/* Value, Created Ch 24 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 24, KICKER_END = 49.4, BAR_END = 50.1;
const WARP = [[0, 0], [6.4, 4.4], [12.4, 8.6], [18.8, 13], [27, 18.6], [33.2, 22.8], [39.2, 27], [44, 30.4], [50.2, 34.8], [56.4, 39.8]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const HEAVES = [2.0, 2.9, 3.8, 4.7];
const PUSH = 8.2, LAND = PUSH + 1;
const LV = [13.4, 14.05, 14.7, 15.35];
const DROP = 23.4, MESS0 = 19.5;
const RINGS = [30.0, 30.3, 30.6, 30.9, 31.2];
const FAN0 = 34.9, FAN_DT = .075;
const BREAK = 41.3;
const SWIPES = [6.4, 18.8, 33.2];
const E = 50.2;
const IMPACTS = [...HEAVES.map((h, i) => [h, [3, 4, 5, 9][i]]), [LAND, 9], [LV[3] + 1, 5], [DROP, 16], [DROP + .5, 5], [RINGS[4] + .1, 8],
  [FAN0 + 18 * FAN_DT, 5], [BREAK, 12], [45.1, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 18.8], [18.8, 33.2], [33.2, 50.2]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 }); cue(1.2, 'pop', { f: .9 });
[.4, .55, .7].forEach((x, i) => cue(x, 'blip', { n: [55, 59, 62][i] }));
HEAVES.forEach((h, i) => { cue(h, 'knock', { v: .9 - i * .1 }); cue(h + .08, 'tick', { f: 1 }); });
cue(HEAVES[3] + .1, 'thud'); cue(5.2, 'scratch');
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.1 }); cue(6.85, 'thud'); cue(7.1, 'swish');
cue(PUSH - .1, 'whoosh', { v: .4 });
cue(LAND - .25, 'pop', { f: 1.2 }); cue(LAND, 'impact', { v: .7 }); cue(LAND, 'thud'); cue(LAND + .02, 'chime', { n: 72 });
cue(12.6, 'pop', { f: 1.1 }); cue(13.2, 'pop', { f: .9 });
LV.forEach((s, i) => { cue(s, 'pop', { f: 1 }); cue(s + 1.0, 'blip', { n: [60, 64, 67, 72][i] }); });
cue(LV[3] + 1.0, 'chime', { n: 79 });
cue(19.0, 'pop', { f: 1.1 });
for (let i = 0; i < 36; i += 6) cue(MESS0 + i * .035, 'tick', { f: (i / 6) % 2 });
cue(21.0, 'riser', { d: DROP - 21.0 });
for (let x = 22.4, k = 0; x < DROP - .05; x += .12 - k * .004, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 }); cue(DROP + .5, 'thud');
[0, 1, 2].forEach(i => cue(DROP + .15 + i * .15, 'blip', { n: [67, 72, 76][i] }));
cue(27.2, 'pop', { f: 1.1 }); cue(28.0, 'pop', { f: .9 });
for (let i = 0; i < 5; i++) cue(28.2 + i * .18, 'tick', { f: 2 });
RINGS.forEach((s, i) => { cue(s, 'pop', { f: 1 + i * .06 }); cue(s + .05, 'blip', { n: [62, 64, 67, 69, 72][i] }); });
cue(RINGS[4] + .1, 'impact', { v: .8 }); cue(RINGS[4] + .1, 'chime', { n: 76 }); cue(31.5, 'pop', { f: .95 });
cue(33.4, 'pop', { f: 1.1 }); cue(34.1, 'pop', { f: .9 });
[33.8, 34.05, 34.3, 34.55].forEach(x => cue(x, 'tick', { f: 0 }));
for (let j = 0; j < 18; j += 3) cue(FAN0 + j * FAN_DT, 'blip', { n: 60 + (j * 5 / 3 | 0) });
cue(FAN0 + 18 * FAN_DT, 'chime', { n: 79 }); cue(FAN0 + 18 * FAN_DT, 'thud');
cue(39.4, 'pop', { f: 1.1 }); cue(40.1, 'whoosh', { v: .35 });
cue(BREAK - .6, 'riser', { d: .6 }); cue(BREAK, 'impact', { v: .9 }); cue(BREAK, 'scratch'); cue(BREAK + .3, 'knock', { v: 1 }); cue(BREAK + .55, 'pop', { f: .9 });
cue(44.0, 'pop', { f: 1.1 }); cue(45.1, 'thud'); cue(45.1, 'impact', { v: .9 }); cue(45.1, 'chime', { n: 76 }); cue(46.0, 'swish'); cue(46.5, 'pop', { f: .9 });
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: 6.4, breakdown: 21.0, drop: DROP, end: 50.1 };

/* anchored at bottom centre */
function boulder(x, y, s, lw) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath();
  for (let k = 0; k < 11; k++) {
    const a = k / 11 * Math.PI * 2, r = .86 + .2 * rnd(k + 3);
    ctx.lineTo(Math.cos(a) * 100 * r, Math.min(0, -75 + Math.sin(a) * 75 * r));
  }
  ctx.closePath(); ctx.fillStyle = C.paper; ctx.fill(); ctx.fillStyle = 'rgba(58,52,44,0.12)'; ctx.fill();
  ctx.lineWidth = (lw || 6) / s; ctx.lineJoin = 'round'; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.lineCap = 'round'; ctx.beginPath();
  ctx.moveTo(62, -104); ctx.lineTo(78, -80); ctx.lineTo(66, -60); ctx.moveTo(-84, -38); ctx.lineTo(-62, -58);
  ctx.stroke(); ctx.restore();
}
function fulcrum(px, py, h, w) {
  ctx.save(); ctx.lineJoin = 'round'; ctx.lineWidth = 6; ctx.strokeStyle = C.ink;
  ctx.beginPath(); ctx.moveTo(px - w / 2, py + h); ctx.lineTo(px, py + 10); ctx.lineTo(px + w / 2, py + h); ctx.closePath();
  ctx.fillStyle = 'rgba(58,52,44,0.16)'; ctx.fill(); ctx.stroke(); ctx.restore();
}
/* plank rotates about the pivot; th > 0 lowers the long (right) end */
function plank(px, py, th, a, b) {
  ctx.save(); ctx.translate(px, py); ctx.rotate(th);
  rr(-a, -14, a + b, 18, 9); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.restore();
  return { lx: px - a * Math.cos(th), ly: py - a * Math.sin(th), rx: px + b * Math.cos(th), ry: py + b * Math.sin(th) };
}
function pressArrow(x, y, len, a) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goldText; ctx.fillStyle = C.goldText; ctx.lineWidth = 12; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x, y - len); ctx.lineTo(x, y - 14); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x - 20, y - 22); ctx.lineTo(x, y + 2); ctx.lineTo(x + 20, y - 22); ctx.closePath(); ctx.fill(); ctx.restore();
}
function ground(y, x0, x1, p) {
  ctx.save(); ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath();
  ctx.moveTo(x0, y); ctx.lineTo(lerp(x0, x1, p), y); ctx.stroke(); ctx.restore();
}

/* ---------- S1: bare arms (0 – 6.4) ---------- */
const bump = (t, h) => Math.max(0, 1 - Math.abs(t - h) / .3);
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'A [400-pound] boulder.', W / 2, 215, { size: 80, start: -.5, stagger: .12, end: 5.95 });
  line(t, 'Bare arms. Nothing moves.', W / 2, 300, { size: 54, color: C.ink2, start: 1.2, stagger: .08, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35)), BY = 800;
  const heave = HEAVES.reduce((a, h) => a + (t >= h ? Math.exp(-(t - h) * 6) * Math.sin((t - h) * 40) : 0), 0);
  const push = HEAVES.reduce((a, h) => a + bump(t, h), 0) * 22, bp = eback(prog(t, -.2, .5));
  ctx.save(); ctx.globalAlpha = out;
  ground(BY, 72, W - 72, eio(prog(t, -.2, .5)));
  ctx.save(); ctx.translate(540, BY); ctx.rotate(.04 * heave); ctx.scale(bp, bp); ctx.translate(-540, -BY); boulder(540, BY, 2); ctx.restore();
  label('400 LB', 540, BY - 140, out * eo(prog(t, .3, .3)), C.ink2, 26);
  [[120, 345 + push, 1], [960, 735 - push, -1]].forEach(([bx, tx, d]) => {
    const ap = eio(prog(t, .5, .5)); if (ap <= 0) return;
    const x0 = lerp(bx, tx, ap);
    ctx.lineCap = 'round'; ctx.lineWidth = 22; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.moveTo(x0 - d * 220 * ap, 690); ctx.lineTo(x0, 690); ctx.stroke();
    ctx.beginPath(); ctx.arc(x0 + d * 4, 690, 26, 0, Math.PI * 2); ctx.fillStyle = C.paper; ctx.fill(); ctx.lineWidth = 6; ctx.stroke();
  });
  HEAVES.forEach(h => {
    const a = bump(t, h); if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = out * a; ctx.strokeStyle = C.ink2; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath();
    [-1, 0, 1].forEach(k => { ctx.moveTo(540 + k * 60, 490 - Math.abs(k) * 10); ctx.lineTo(540 + k * 78, 458 - Math.abs(k) * 8); });
    ctx.stroke(); ctx.restore();
  });
  ctx.restore();
  burst(t, HEAVES[3], 540, BY - 20, 14, 31, C.faint, 500, .6);
}

/* ---------- S2: branch and rock (6.4 – 12.4) ---------- */
const P2 = [400, 740], TH0 = -.52, TH1 = .2;
function scene2(t) {
  if (t < 6.4 || t > 12.5) return;
  const end = 11.9, out = 1 - eio(prog(t, end, .35)), gy = 840;
  line(t, 'He didn’t get stronger.', W / 2, 215, { size: 74, start: 6.7, stagger: .09, end });
  line(t, '[The arrangement changed.]', W / 2, 305, { size: 66, start: LAND - .25, stagger: .08, end });
  const ip = eback(prog(t, 6.75, .45));
  ctx.save(); ctx.globalAlpha = out;
  ground(gy, 72, W - 72, eio(prog(t, 6.6, .5)));
  if (ip > 0) {
    ctx.save(); ctx.translate(P2[0], gy); ctx.scale(ip, ip); ctx.translate(-P2[0], -gy);
    const th = lerp(TH0, TH1, eio(prog(t, PUSH, 1))) + (t > LAND ? .02 * Math.exp(-(t - LAND) * 8) * Math.sin((t - LAND) * 30) : 0);
    fulcrum(P2[0], P2[1], 100, 120);
    const e = plank(P2[0], P2[1], th, 200, 500);
    boulder(e.lx + 30, e.ly - 12, .85);
    pressArrow(e.rx, e.ry - 36, 70, eo(prog(t, PUSH - .3, .25)) * (1 - eo(prog(t, LAND + .3, .3))));
    ctx.restore();
  }
  ctx.restore();
  ring(t, LAND, 890, gy, 20, 200, C.gold, .6, 9);
  burst(t, LAND, 890, gy - 6, 14, 71, C.goldL, 600, .7);
  burst(t, LAND, 230, 700, 12, 91, C.faint, 400, .6);
}

/* ---------- S3: four levers (12.4 – 18.8) ---------- */
const LCX = [290, 790, 290, 790], LGY = [610, 610, 835, 835], LB = [140, 170, 200, 225], LSC = [.9, 1.05, 1.2, 1.35];
const LNAME = ['CAPITAL', 'CODE', 'PEOPLE', 'MEDIA'];
function loadIcon(kind) {
  ctx.save(); ctx.strokeStyle = C.ink; ctx.fillStyle = C.ink; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (kind === 0) {
    ctx.beginPath(); ctx.moveTo(0, 14); ctx.lineTo(0, -6); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(-9, -8, 9, 5, -.6, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(9, -14, 9, 5, .6, 0, Math.PI * 2); ctx.fill();
  } else if (kind === 1) {
    ctx.beginPath(); ctx.moveTo(-10, -11); ctx.lineTo(-21, 0); ctx.lineTo(-10, 11); ctx.moveTo(10, -11); ctx.lineTo(21, 0); ctx.lineTo(10, 11);
    ctx.moveTo(4, -13); ctx.lineTo(-4, 13); ctx.stroke();
  } else if (kind === 2) {
    [[-15, -2, 6], [15, -2, 6], [0, -8, 7]].forEach(([x, y, r]) => { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); });
    ctx.beginPath(); ctx.arc(0, 22, 15, Math.PI, 2 * Math.PI); ctx.fill();
  } else {
    ctx.beginPath(); ctx.arc(-14, 10, 4, 0, Math.PI * 2); ctx.fill();
    [12, 22, 32].forEach(r => { ctx.beginPath(); ctx.arc(-14, 10, r, -Math.PI / 2, 0); ctx.stroke(); });
  }
  ctx.restore();
}
function loadBox(kind, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rr(-32, -64, 64, 64, 12); ctx.fillStyle = C.paper; ctx.fill(); ctx.lineWidth = 5 / s; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.translate(0, -32); loadIcon(kind); ctx.restore();
}
function scene3(t) {
  if (t < 12.4 || t > 18.9) return;
  const end = 18.3, out = 1 - eio(prog(t, end, .35));
  line(t, 'Four [levers.]', W / 2, 215, { size: 84, start: 12.6, stagger: .12, end });
  line(t, 'Same trick. Longer branch.', W / 2, 295, { size: 52, color: C.ink2, start: 13.0, stagger: .08, end });
  ctx.save(); ctx.globalAlpha = out;
  LV.forEach((s, i) => {
    const p = eback(prog(t, s, .4)); if (p <= 0) return;
    const px = LCX[i] - 30, gy = LGY[i], py = gy - 48;
    ctx.save(); ctx.translate(px, gy); ctx.scale(p, p); ctx.translate(-px, -gy);
    ground(gy, px - 100, px + LB[i] + 20, 1);
    fulcrum(px, py, 48, 80);
    const th = lerp(-.53, .19, eio(prog(t, s + .4, .6))), e = plank(px, py, th, 95, LB[i]);
    loadBox(i, e.lx + 28, e.ly - 8, LSC[i]);
    pressArrow(e.rx, e.ry - 26, 44, eo(prog(t, s + .3, .2)) * (1 - eo(prog(t, s + 1.1, .3))));
    ctx.restore();
    label(LNAME[i], px + 50, gy + 42, out * eo(prog(t, s + .2, .3)), C.ink, 26);
  });
  ctx.restore();
  ring(t, LV[3] + 1, LCX[3] - 30 - 95 + 28, LGY[3] - 85, 20, 200, C.gold, .6, 9);
  burst(t, LV[3] + 1, LCX[3] - 30 - 95 + 28, LGY[3] - 85, 14, 211, C.goldL, 600, .7);
}

/* ---------- S4: one steel box (18.8 – 27) ---------- */
const NB = 36;
const MESS = Array.from({ length: NB }, (_, i) => ({ x: 250 + rnd(i * 3 + 1) * 580, y: 540 + rnd(i * 3 + 2) * 250, w: 40 + rnd(i * 3 + 3) * 50, h: 30 + rnd(i * 5 + 1) * 44, r: (rnd(i * 7 + 2) - .5) * 1.1 }));
const gridX = i => 220 + (i % 9) * 80, gridY = i => 540 + ((i / 9) | 0) * 80;
function scene4(t) {
  if (t < 18.8 || t > 27.1) return;
  const end = 26.5, out = 1 - eio(prog(t, end, .35));
  line(t, 'One steel box.', W / 2, 215, { size: 80, start: 19.0, stagger: .1, end });
  line(t, 'Loading, [36× cheaper.]', W / 2, 310, { size: 76, start: DROP, stagger: .12, end });
  ctx.save(); ctx.globalAlpha = out;
  const hp = eo(prog(t, DROP + .3, .4));
  if (hp > 0) {
    ctx.save(); ctx.globalAlpha *= hp; ctx.lineJoin = 'round'; ctx.beginPath();
    ctx.moveTo(180, 830); ctx.lineTo(900, 830); ctx.lineTo(850, 884); ctx.lineTo(230, 884); ctx.closePath();
    ctx.fillStyle = 'rgba(58,52,44,0.12)'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
  }
  for (let i = 0; i < NB; i++) {
    const pa = eback(prog(t, MESS0 + i * .035, .3)); if (pa <= 0) continue;
    const m = eio(prog(t, DROP + ((i % 9) + ((i / 9) | 0)) * .03, .45)), M = MESS[i];
    const wob = Math.sin(t * 14 + i * 1.7) * eo(prog(t, 21, 1)) * (1 - m);
    ctx.save(); ctx.translate(lerp(M.x, gridX(i), m), lerp(M.y, gridY(i), m) + wob * 6); ctx.rotate(lerp(M.r, 0, m) + wob * .1); ctx.scale(pa, pa);
    const w = lerp(M.w, 70, m), h = lerp(M.h, 56, m);
    rr(-w / 2, -h / 2, w, h, 4); ctx.fillStyle = 'rgba(58,52,44,0.14)'; ctx.fill();
    ctx.save(); ctx.globalAlpha *= m; ctx.fillStyle = i === 13 ? C.goldL : '#FFFBF3'; ctx.fill(); ctx.restore();
    ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.lineWidth = 2.5; ctx.globalAlpha *= .55; ctx.beginPath();
    for (let k = 1; k < 5; k++) { const rx = -w / 2 + k * w / 5; ctx.moveTo(rx, -h / 2 + 5); ctx.lineTo(rx, h / 2 - 5); }
    ctx.stroke(); ctx.restore();
  }
  ctx.restore();
  ring(t, DROP, W / 2, 680, 60, 560, C.gold, .8, 12);
  ring(t, DROP + .12, W / 2, 680, 40, 440, C.goldL, .7, 8);
  burst(t, DROP, W / 2, 680, 30, 313, C.goldL, 1000, .9);
}

/* ---------- S5: audit your week (27 – 33.2) ---------- */
const DX = i => 166 + i * 187.2, DY = [540, 660, 780];
const REP = [1, 0, 2, 1, 0];
function glyph(kind) {
  ctx.save(); ctx.strokeStyle = C.ink2; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
  if (kind === 0) ctx.arc(0, 0, 22, 0, Math.PI * 2);
  else if (kind === 1) { ctx.moveTo(0, -24); ctx.lineTo(24, 20); ctx.lineTo(-24, 20); ctx.closePath(); }
  else if (kind === 2) { ctx.moveTo(-22, 0); ctx.lineTo(22, 0); ctx.moveTo(0, -22); ctx.lineTo(0, 22); }
  else if (kind === 3) { for (let k = 0; k < 6; k++) ctx.lineTo(Math.cos(k * Math.PI / 3) * 24, Math.sin(k * Math.PI / 3) * 24); ctx.closePath(); }
  else if (kind === 4) { ctx.moveTo(0, -26); ctx.lineTo(24, 0); ctx.lineTo(0, 26); ctx.lineTo(-24, 0); ctx.closePath(); }
  else if (kind === 5) { ctx.moveTo(-18, -18); ctx.lineTo(18, 18); ctx.moveTo(18, -18); ctx.lineTo(-18, 18); }
  else if (kind === 6) { ctx.moveTo(-18, -20); ctx.lineTo(8, 0); ctx.lineTo(-18, 20); }
  else if (kind === 7) ctx.arc(0, 8, 22, Math.PI, 2 * Math.PI);
  else if (kind === 8) { ctx.moveTo(-26, 0); ctx.lineTo(26, 0); }
  else { ctx.moveTo(-26, 0); ctx.quadraticCurveTo(-13, -22, 0, 0); ctx.quadraticCurveTo(13, 22, 26, 0); }
  ctx.stroke(); ctx.restore();
}
function scene5(t) {
  if (t < 27 || t > 33.3) return;
  const end = 32.7, out = 1 - eio(prog(t, end, .35));
  line(t, 'Audit your week.', W / 2, 215, { size: 78, start: 27.2, stagger: .1, end });
  line(t, 'Circle what [repeats.]', W / 2, 300, { size: 68, start: 28.0, stagger: .1, end });
  line(t, 'A repeat is a [lever] waiting.', W / 2, 890, { size: 46, color: C.ink2, start: 31.5, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  ['MON', 'TUE', 'WED', 'THU', 'FRI'].forEach((d, i) => label(d, DX(i), 440, out * eo(prog(t, 27.8 + i * .12, .3)), C.ink2, 24));
  let g = 0;
  for (let i = 0; i < 5; i++) for (let r = 0; r < 3; r++) {
    const rep = REP[i] === r, kind = rep ? -1 : g++;
    const p = eback(prog(t, 28.2 + i * .18 + r * .06, .3)); if (p <= 0) continue;
    ctx.save(); ctx.translate(DX(i), DY[r]); ctx.scale(p, p);
    if (rep) {
      const gp = eo(prog(t, 31.6, .4));
      rr(-26, -26, 52, 52, 10); ctx.fillStyle = C.ink; ctx.fill();
      ctx.save(); ctx.globalAlpha *= gp; ctx.fillStyle = C.goldL; ctx.fill(); ctx.restore();
      ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke();
    } else glyph(kind % 10);
    ctx.restore();
  }
  REP.forEach((r, i) => {
    const rp = eback(prog(t, RINGS[i], .3)); if (rp <= 0) return;
    ctx.beginPath(); ctx.arc(DX(i), DY[r], 46 * rp, 0, Math.PI * 2); ctx.lineWidth = 7; ctx.strokeStyle = C.goldText; ctx.stroke();
  });
  ctx.restore();
  ring(t, RINGS[4] + .1, DX(4), DY[0], 40, 300, C.gold, .7, 10);
  burst(t, RINGS[4] + .1, DX(4), DY[0], 16, 417, C.goldL, 800, .8);
}

/* ---------- S6: write it once (33.2 – 39.2) ---------- */
function person(x, y, a) {
  ctx.save(); ctx.translate(x, y);
  const draw = col => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(0, -16, 12, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(0, 18, 24, Math.PI, 2 * Math.PI); ctx.fill(); };
  draw('rgba(58,52,44,0.2)');
  if (a > 0) { ctx.globalAlpha *= a; draw(C.gold); }
  ctx.restore();
}
function scene6(t) {
  if (t < 33.2 || t > 39.3) return;
  const end = 38.7, out = 1 - eio(prog(t, end, .35)), PX = 250, PY = 640;
  line(t, 'Write it [once.]', W / 2, 215, { size: 84, start: 33.4, stagger: .12, end });
  line(t, 'Cheapest lever: media.', W / 2, 300, { size: 54, color: C.ink2, start: 34.1, stagger: .08, end });
  ctx.save(); ctx.globalAlpha = out;
  const pp = eback(prog(t, 33.5, .4));
  const ppl = Array.from({ length: 18 }, (_, j) => ({ x: 520 + ((j / 3) | 0) * 88, y: 540 + (j % 3) * 110, at: FAN0 + j * FAN_DT }));
  ppl.forEach(q => {
    const lp = eio(prog(t, q.at - .35, .35));
    if (lp > 0) { ctx.strokeStyle = C.gold; ctx.globalAlpha = out * .55; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(PX + 80, PY); ctx.lineTo(lerp(PX + 80, q.x - 30, lp), lerp(PY, q.y, lp)); ctx.stroke(); ctx.globalAlpha = out; }
    const pe = eback(prog(t, 34.4, .4));
    ctx.save(); ctx.globalAlpha = out * eo(prog(t, 34.4, .4)); person(q.x, q.y, 0); ctx.restore();
    ctx.save(); ctx.globalAlpha = out * eo(prog(t, q.at, .2)); person(q.x, q.y, 1); ctx.restore();
  });
  if (pp > 0) {
    ctx.save(); ctx.translate(PX, PY); ctx.scale(pp, pp);
    rr(-75, -95, 150, 190, 14); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.lineCap = 'round'; ctx.lineWidth = 5; ctx.strokeStyle = C.ink;
    [-55, -25, 5, 35].forEach((y, k) => {
      const lp = eio(prog(t, 33.8 + k * .25, .3)); ctx.beginPath(); ctx.moveTo(-48, y); ctx.lineTo(-48 + (k === 3 ? 50 : 96) * lp, y); ctx.stroke();
    });
    ctx.restore();
  }
  ctx.restore();
  label('ONE AFTERNOON', PX, 800, out * eo(prog(t, 34.3, .3)), C.goldText, 24);
  ring(t, FAN0 - .3, PX, PY, 80, 330, C.gold, .7, 9);
}

/* ---------- S7: never under something broken (39.2 – 44) ---------- */
function crate(x, y, split, t, floor) {
  const pts = [[0, -130], [12, -95], [-10, -60], [10, -25], [0, 0]];
  const halves = [-1, 1];
  halves.forEach(d => {
    const q = split > 0 ? t - BREAK : 0;
    ctx.save(); ctx.translate(x + (d < 0 ? -105 : 15) * (split ? 1 - Math.exp(-q * 4) : 0), y + (split ? Math.min(520 * q * q, floor) : 0)); ctx.rotate(d * (split ? Math.min(q * 1.6, .9) : 0));
    ctx.beginPath(); ctx.moveTo(d * 65, -130); ctx.lineTo(0, -130);
    pts.slice(1).forEach(([px, py]) => ctx.lineTo(px, py));
    ctx.lineTo(d * 65, 0); ctx.closePath();
    ctx.fillStyle = C.paper; ctx.fill(); ctx.fillStyle = 'rgba(58,52,44,0.12)'; ctx.fill(); ctx.lineJoin = 'round'; ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.restore();
  });
}
function scene7(t) {
  if (t < 39.2 || t > 44.1) return;
  const end = 43.75, out = 1 - eio(prog(t, end, .3)), gy = 840;
  const sz = fit('Never lever something broken.', 940, 70, 'serif'), sz2 = fit('Leverage multiplies whatever it touches.', 940, 46, 'sans');
  line(t, 'Never lever something [broken.]', W / 2, 215, { size: sz, start: 39.4, stagger: .1, end });
  line(t, 'Leverage multiplies whatever it touches.', W / 2, 300, { size: sz2, font: 'sans', color: C.ink2, start: BREAK + .3, stagger: .06, end });
  const P = P2, th = lerp(TH0, TH1, eio(prog(t, 40.2, .9)));
  ctx.save(); ctx.globalAlpha = out;
  ground(gy, 72, W - 72, eio(prog(t, 39.3, .5)));
  const ip = eback(prog(t, 39.5, .45));
  if (ip > 0) {
    ctx.save(); ctx.translate(P[0], gy); ctx.scale(ip, ip); ctx.translate(-P[0], -gy);
    fulcrum(P[0], P[1], 100, 120);
    const e = plank(P[0], P[1], th, 200, 500);
    ctx.save(); ctx.translate(e.lx + 36, e.ly - 8); ctx.scale(.95, .95); crate(0, 0, t > BREAK ? 1 : 0, t, (gy - (e.ly - 8)) / .95 - 10); ctx.restore();
    pressArrow(e.rx, e.ry - 36, 70, eo(prog(t, 40.0, .25)) * (1 - eo(prog(t, 41.2, .3))));
    ctx.restore();
  }
  ctx.restore();
  burst(t, BREAK, 230, 680, 22, 521, C.ink2, 700, .8);
  ring(t, BREAK, 230, 690, 30, 260, C.gold, .6, 9);
}

/* ---------- S8: takeaway (44 – 50.2) ---------- */
function scene8(t) {
  if (t < 44 || t > 50.3) return;
  const end = 49.6;
  line(t, 'Where is your', W / 2, 450, { size: 100, start: 44.0, stagger: .1, end });
  const r = line(t, '[place to stand?]', W / 2, 575, { size: 100, start: 45.1, stagger: .1, end });
  const u = eio(prog(t, 46.0, .4)) * (1 - eio(prog(t, end, .35)));
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 612, r.w * u, 9); }
  line(t, 'Find your branch.', W / 2, 720, { size: 46, color: C.ink2, start: 46.5, stagger: .07, end });
  const mp = eback(prog(t, 46.8, .4)) * (1 - eio(prog(t, end, .35)));
  if (mp > 0) {
    ctx.save(); ctx.translate(W / 2, 850); ctx.scale(mp, mp);
    fulcrum(0, 0, 40, 70);
    plank(0, 0, lerp(-.3, .22, eio(prog(t, 47.0, .7))), 110, 190);
    ctx.restore();
  }
  burst(t, 45.2, W / 2, 545, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S9: end card (50.2 – 56.4) ---------- */
function scene9(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const mp = eback(prog(t, E + .95, .4));
  if (mp > 0) {
    ctx.save(); ctx.translate(W / 2, 290); ctx.scale(mp, mp);
    ctx.lineJoin = 'round'; ctx.lineWidth = 6; ctx.strokeStyle = C.cream;
    ctx.beginPath(); ctx.moveTo(-36, 44); ctx.lineTo(0, 4); ctx.lineTo(36, 44); ctx.closePath(); ctx.stroke();
    ctx.rotate(lerp(-.35, .25, eio(prog(t, E + 1.05, .6))));
    rr(-150, -14, 300, 14, 7); ctx.fillStyle = C.cream; ctx.fill();
    ctx.beginPath(); ctx.arc(-120, -34, 18, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill();
    ctx.restore();
  }
  ring(t, E + 1.3, W / 2, 290, 30, 300, C.goldL, .8, 8);
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  line(t, '[Chapter 24: Leverage]', W / 2, 535, { size: fit('Chapter 24: Leverage', 900, 60, 'serif'), goldColor: C.goldL, start: E + 1.6, stagger: .06 });
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
