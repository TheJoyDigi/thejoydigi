/* Value, Created Ch 12 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 12, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [10.9, 7.6], [16, 11.2], [20.7, 14.5], [27.6, 19.3], [33.1, 23.2], [40.3, 28.2], [47.1, 33], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const SWEEP = 3.9;
const TR_DRAW = 6.9, HT_GO = 7.5, HT_ARR = 8.3, LT_GO = 7.5, LT_ARR = 10.3, LT_LEN = 2580;
const GATES = [350, 1250, 1500, 2000, 2300], GATE_T = GATES.map(d => LT_GO + d / LT_LEN * (LT_ARR - LT_GO));
const CARDS = [11.4, 11.55, 11.7], BT = [12.3, 13.2, 14.1];
const CELLS = 16.3, FLAG = 16.9, WED = 18.5;
const DROP = 23.6, TOWER = 21.2, TOWER_DT = .25, TN = 9;
const LIGHT = 28.2, HEAVY = 30.2;
const THROW = 33.9, ARR = 34.8, SPLIT = 35.25, BACK = 36.3;
const SWIPES = [6.4, 20.7, 33.1];
const E = 46.85;
const IMPACTS = [[SWEEP + .55, 7], [HT_ARR, 4], [LT_ARR, 5], ...BT.map(b => [b, 5]), [WED, 8], [DROP, 16], [DROP + .45, 5], [DROP + .75, 4],
  [LIGHT + .1, 3], [HEAVY + .1, 12], [ARR, 4], [BACK, 8], [41.4, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 20.7], [20.7, 33.1], [33.1, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
for (let i = 0; i < 27; i += 3) cue(.3 + i * .035 + .05, 'tick', { f: (i / 3) % 3 | 0 });
cue(.2, 'whoosh', { v: .2 });
cue(3.4, 'pop', { f: 1 });
cue(SWEEP - .05, 'whoosh', { v: .6 }); cue(SWEEP + .3, 'swish'); cue(SWEEP + .55, 'impact', { v: .8 }); cue(SWEEP + .55, 'thud');
cue(4.7, 'pop', { f: 1.1 }); cue(5.0, 'blip', { n: 55 }); cue(5.15, 'blip', { n: 62 });
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(7.2, 'pop', { f: .9 }); cue(TR_DRAW, 'whoosh', { v: .3 });
cue(HT_GO, 'swish'); cue(HT_ARR, 'chime', { n: 79 }); cue(HT_ARR, 'impact', { v: .6 });
GATE_T.forEach((x, i) => cue(x, 'blip', { n: [50, 48, 50, 48, 46][i] }));
cue(LT_ARR, 'thud');
cue(11.1, 'pop', { f: 1.2 }); cue(14.7, 'pop', { f: .9 });
CARDS.forEach((s, i) => { cue(s, 'pop', { f: 1 }); cue(s + .08, 'blip', { n: [60, 64, 67][i] }); });
BT.forEach((b, i) => { cue(b - .3, 'whoosh', { v: .25 }); cue(b, 'knock', { v: .9 }); cue(b + .05, 'blip', { n: [50, 47, 44][i] }); });
cue(15.9, 'whoosh', { v: .35 });
cue(16.2, 'pop', { f: 1.2 }); for (let i = 0; i < 5; i++) cue(CELLS + i * .1, 'tick', { f: 2 });
cue(FLAG, 'pop', { f: 1.1 }); cue(FLAG + .1, 'thud'); cue(17.8, 'pop', { f: 1.1 });
cue(WED - .3, 'swish'); cue(WED, 'impact', { v: .8 }); cue(WED, 'chime', { n: 76 }); cue(WED + .4, 'blip', { n: 83 });
cue(20.2, 'riser', { d: DROP - 20.2 }); cue(21.0, 'pop', { f: 1 });
for (let i = 0; i < TN; i++) { cue(TOWER + i * TOWER_DT + .12, 'tick', { f: i % 2 }); if (i % 2 === 0) cue(TOWER + i * TOWER_DT + .14, 'blip', { n: 50 + i * 2 }); }
for (let x = 22.9, k = 0; x < DROP - .05; x += .11 - k * .004, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 72 }); cue(DROP, 'impact', { v: 1 }); cue(DROP, 'scratch'); cue(DROP + .2, 'whoosh', { v: .4 });
cue(DROP + .5, 'thud'); cue(DROP + .75, 'thud');
cue(27.8, 'pop', { f: 1.2 });
cue(LIGHT - .25, 'whoosh', { v: .25 }); cue(LIGHT, 'thud'); cue(LIGHT + .05, 'blip', { n: 64 });
cue(29.8, 'pop', { f: 1.1 }); cue(HEAVY - .3, 'riser', { d: .3 }); cue(HEAVY, 'impact', { v: .9 }); cue(HEAVY, 'boom', { v: .5 }); cue(HEAVY, 'chime', { n: 72 });
cue(HEAVY + .35, 'knock', { v: .8 }); cue(HEAVY + .6, 'knock', { v: .6 });
cue(33.3, 'pop', { f: 1.1 });
cue(THROW, 'swish'); cue(ARR, 'blip', { n: 67 }); cue(ARR, 'thud'); cue(SPLIT, 'pop', { f: 1.2 }); cue(SPLIT + .05, 'whoosh', { v: .3 });
cue(BACK - .05, 'chime', { n: 76 }); cue(BACK, 'impact', { v: .7 }); cue(BACK + .1, 'chime', { n: 79 }); cue(35.0, 'pop', { f: 1 });
cue(40.0, 'whoosh', { v: .35 }); cue(40.45, 'thud'); cue(40.9, 'tick', { f: 2 }); cue(41.4, 'impact', { v: .9 }); cue(41.4, 'chime', { n: 72 }); cue(42.35, 'swish'); cue(43.4, 'pop', { f: .9 });
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: 6.4, breakdown: 20.2, drop: DROP, end: 46.75 };

/* ---------- shared drawings ---------- */
function bottle(x, y, s, rot) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round';
  rr(-28, -82, 56, 82, 10); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.goldL; ctx.fillRect(-28, -58, 56, 28); ctx.beginPath(); ctx.moveTo(-28, -58); ctx.lineTo(28, -58); ctx.moveTo(-28, -30); ctx.lineTo(28, -30); ctx.stroke();
  rr(-31, -102, 62, 24, 6); ctx.fillStyle = C.fill; ctx.fill(); ctx.stroke();
  ctx.restore();
}
function polyAt(pts, d) {
  const out = [pts[0]]; let acc = 0;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (acc + L >= d) { const q = (d - acc) / L; out.push([lerp(a[0], b[0], q), lerp(a[1], b[1], q)]); return out; }
    out.push(b); acc += L;
  }
  return out;
}
function stroke(pts) { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
function bust(x, y, s, fill) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 6 / s; ctx.strokeStyle = C.ink; ctx.fillStyle = fill;
  ctx.beginPath(); ctx.arc(0, 64, 90, Math.PI, 2 * Math.PI); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, -64, 40, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.restore();
}
function orb(x, y, r) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke(); }
function dashBlock(x, y, w, h, fillA) {
  rr(x, y, w, h, 18); ctx.fillStyle = `rgba(221,182,95,${fillA})`; ctx.fill();
  ctx.lineWidth = 5; ctx.strokeStyle = C.goldText; ctx.setLineDash([16, 12]); ctx.stroke(); ctx.setLineDash([]);
}

/* ---------- S1: every bottle off every shelf (0 – 6.4) ---------- */
const SHELF = [520, 680, 840], BOT_X = c => 140 + c * 100;
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'Every bottle.', W / 2, 215, { size: 84, start: -.62, stagger: .12, end: 3.7 });
  line(t, 'Off every [shelf.]', W / 2, 305, { size: 84, start: -.4, stagger: .12, end: 3.7 });
  line(t, '[Nobody asked.]', W / 2, 235, { size: 100, start: SWEEP, stagger: .14, end: 5.95 });
  line(t, 'They did it anyway.', W / 2, 325, { size: 56, color: C.ink2, start: 4.7, stagger: .08, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35));
  ctx.save(); ctx.globalAlpha = out;
  const cp = eo(prog(t, .2, .6));
  ctx.strokeStyle = C.ink; ctx.lineWidth = 7; ctx.lineCap = 'round';
  SHELF.forEach(y => { ctx.beginPath(); ctx.moveTo(72, y + 2); ctx.lineTo(72 + 936 * cp, y + 2); ctx.stroke(); });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 9; c++) {
    const i = r * 9 + c, ap = eback(prog(t, .3 + i * .035, .3)); if (ap <= 0) continue;
    const q = prog(t, SWEEP + c * .05 + r * .1, .7);
    bottle(BOT_X(c) + 1300 * q * q, SHELF[r] - 50 * Math.sin(Math.PI * Math.min(1, q * 1.3)), ap, q * .9);
  }
  ctx.restore();
}

/* ---------- S2: where trust is high, business is cheap (6.4 – 10.9) ---------- */
const HT = [[140, 530], [940, 530]], LT = [[140, 660], [940, 660], [940, 750], [140, 750], [140, 840], [940, 840]];
function scene2(t) {
  if (t < 6.4 || t > 11) return;
  const end = 10.45, out = 1 - eio(prog(t, end, .35));
  line(t, 'Where trust is high,', W / 2, 220, { size: 70, start: 6.65, end });
  line(t, 'business is [cheap.]', W / 2, 308, { size: 70, start: 7.2, end });
  ctx.save(); ctx.globalAlpha = out; ctx.lineCap = ctx.lineJoin = 'round';
  const dp = eio(prog(t, TR_DRAW, .5));
  ctx.strokeStyle = C.faint; ctx.lineWidth = 5;
  stroke(polyAt(HT, 800 * dp)); stroke(polyAt(LT, LT_LEN * dp));
  [[140, 530], [140, 660]].forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, 12 * dp, 0, Math.PI * 2); ctx.fillStyle = C.faint; ctx.fill(); });
  [[940, 530], [940, 840]].forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, 26 * dp, 0, Math.PI * 2); ctx.lineWidth = 6; ctx.strokeStyle = C.goldText; ctx.stroke(); });
  const gp = eback(prog(t, TR_DRAW + .3, .4));
  if (gp > 0) { ctx.beginPath(); ctx.arc(540, 530, 15 * gp, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke(); }
  GATES.forEach((d, i) => {
    const p = eback(prog(t, TR_DRAW + .1 + i * .08, .3)); if (p <= 0) return;
    const [x, y] = polyAt(LT, d).pop(), hit = t > GATE_T[i] ? 1 + .5 * Math.exp(-(t - GATE_T[i]) * 9) : 1;
    ctx.save(); ctx.translate(x, y); ctx.scale(p * hit, p * hit); rr(-14, -14, 28, 28, 5); ctx.fillStyle = C.ink; ctx.fill(); ctx.restore();
  });
  const gd = 800 * eio(prog(t, HT_GO, HT_ARR - HT_GO)), ld = LT_LEN * prog(t, LT_GO, LT_ARR - LT_GO);
  if (t >= HT_GO - .2) { const [x, y] = polyAt(HT, gd).pop(), s = eback(prog(t, HT_GO - .2, .3)); ctx.beginPath(); ctx.arc(x, y, 19 * s, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke(); }
  if (t >= LT_GO - .2) { const [x, y] = polyAt(LT, ld).pop(), s = eback(prog(t, LT_GO - .2, .3)); ctx.beginPath(); ctx.arc(x, y, 19 * s, 0, Math.PI * 2); ctx.fillStyle = C.fill; ctx.fill(); }
  ctx.restore();
  label('HIGH TRUST', 140, 492, out * eo(prog(t, TR_DRAW + .3, .3)), C.goldText, 24, 'left');
  label('LOW TRUST', 140, 622, out * eo(prog(t, TR_DRAW + .4, .3)), C.ink2, 24, 'left');
  ring(t, HT_ARR, 940, 530, 30, 300, C.gold, .7, 10);
  burst(t, HT_ARR, 940, 530, 18, 51, C.goldL, 800, .8);
  burst(t, LT_ARR, 940, 840, 8, 57, C.faint, 300, .5);
}

/* ---------- S3: it can't be bought (10.9 – 16) ---------- */
function icon3(kind) {
  ctx.save(); ctx.fillStyle = C.ink; ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.lineJoin = ctx.lineCap = 'round';
  if (kind === 0) {
    rr(-34, -12, 24, 24, 4); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-10, -14); ctx.lineTo(28, -36); ctx.lineTo(28, 36); ctx.lineTo(-10, 14); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-26, 12); ctx.lineTo(-20, 34); ctx.stroke();
  } else if (kind === 1) {
    ctx.beginPath(); ctx.arc(0, -16, 17, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(0, 40, 36, Math.PI, 2 * Math.PI); ctx.fill();
  } else {
    ctx.beginPath();
    for (let i = 0; i < 10; i++) { const r = i % 2 ? 14 : 34, a = i * Math.PI / 5 - Math.PI / 2; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r + 2); }
    ctx.closePath(); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
  }
  ctx.restore();
}
function scene3(t) {
  if (t < 10.9 || t > 16.1) return;
  const end = 15.55, out = 1 - eio(prog(t, end, .35)), xs = [240, 540, 840], tx = [480, 540, 600];
  line(t, 'It can’t be [bought.]', W / 2, 220, { size: 80, start: 11.1, end });
  line(t, 'Only earned.', W / 2, 305, { size: 54, color: C.ink2, start: 14.7, stagger: .1, end });
  ctx.save(); ctx.globalAlpha = out;
  let sh = 0, flash = 0;
  BT.forEach(b => { if (t > b) { sh += 7 * Math.sin((t - b) * 60) * Math.exp(-(t - b) * 10); flash = Math.max(flash, Math.exp(-(t - b) * 6)); } });
  const bp = eback(prog(t, 11.2, .4));
  if (bp > 0) {
    ctx.save(); ctx.translate(540 + sh, 540); ctx.scale(bp, bp); ctx.translate(-540, -540); dashBlock(430, 440, 220, 200, .1 + .3 * flash); ctx.restore();
    label('TRUST', 540 + sh, 552, out * eo(prog(t, 11.4, .3)), C.goldText, 30);
  }
  xs.forEach((x, i) => {
    const p = eback(prog(t, CARDS[i], .4)); if (p <= 0) return;
    let cx = x, cy = 780;
    if (t < BT[i]) { const q = eo(prog(t, BT[i] - .4, .4)); cx = lerp(x, tx[i], q); cy = lerp(780, 680, q); }
    else { const q = eo(prog(t, BT[i], .45)); cx = lerp(tx[i], x, q); cy = lerp(680, 780, q); }
    ctx.save(); ctx.translate(cx, cy); ctx.scale(p, p); ctx.rotate(t > BT[i] ? .12 * Math.exp(-(t - BT[i]) * 7) * Math.sin((t - BT[i]) * 24) : 0);
    rr(-80, -70, 160, 140, 18); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.scale(1, 1); icon3(i); ctx.restore();
  });
  ctx.restore();
  ['ATTENTION', 'AWARENESS', 'SUSPICION'].forEach((s, i) => label(s, xs[i], 892, out * eo(prog(t, BT[i] + .15, .3)), i === 2 ? C.goldText : C.ink2, 24));
  BT.forEach(b => ring(t, b, 540, 650, 40, 160, C.gold, .45, 6));
}

/* ---------- S4: say Thursday, show up Wednesday (16 – 20.7) ---------- */
function scene4(t) {
  if (t < 16 || t > 20.8) return;
  const end = 20.25, out = 1 - eio(prog(t, end, .35)), DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'], cx = i => 141 + 75 + i * 162, CY = 585;
  line(t, 'Say [Thursday.]', W / 2, 220, { size: 80, start: 16.2, end });
  line(t, 'Show up [Wednesday.]', W / 2, 305, { size: 72, start: 17.8, stagger: .1, end });
  line(t, 'Every overshoot is a [deposit.]', W / 2, 800, { size: 50, color: C.ink2, start: 19.0, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  DAYS.forEach((d, i) => {
    const p = eback(prog(t, CELLS + i * .1, .35)); if (p <= 0) return;
    ctx.save(); ctx.translate(cx(i), CY); ctx.scale(p, p);
    const wp = i === 2 ? eo(prog(t, WED, .3)) : 0;
    rr(-75, -75, 150, 150, 18); ctx.fillStyle = wp > 0 ? C.goldL : '#FFFBF3'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.restore();
    label(d, cx(i), CY + 62, out * eo(prog(t, CELLS + i * .1 + .2, .3)), C.ink2, 22);
  });
  const fp = eback(prog(t, FLAG, .4));
  if (fp > 0) {
    ctx.save(); ctx.translate(cx(3) - 20, CY + 30); ctx.scale(fp, fp); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -80); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, -80); ctx.lineTo(54, -62); ctx.lineTo(0, -44); ctx.closePath(); ctx.fillStyle = C.ink; ctx.fill(); ctx.restore();
  }
  const kp = eback(prog(t, WED, .4));
  if (kp > 0) {
    ctx.save(); ctx.translate(cx(2), CY - 10); ctx.scale(kp, kp); ctx.lineWidth = 14; ctx.lineCap = ctx.lineJoin = 'round'; ctx.strokeStyle = C.ink;
    ctx.beginPath(); ctx.moveTo(-28, 4); ctx.lineTo(-8, 26); ctx.lineTo(30, -22); ctx.stroke(); ctx.restore();
  }
  ctx.restore();
  ring(t, WED, cx(2), CY, 40, 280, C.gold, .7, 10);
  burst(t, WED, cx(2), CY, 20, 71, C.goldL, 900, .8);
}

/* ---------- S5: slowly up, instantly down (20.7 – 27.6) ---------- */
function scene5(t) {
  if (t < 20.7 || t > 27.7) return;
  const end = 27.1, out = 1 - eio(prog(t, end, .35)), BX = 540, BASE = 880;
  line(t, 'Slowly up.', W / 2, 215, { size: 64, color: C.ink2, start: 21.0, stagger: .1, end });
  line(t, '[Instantly down.]', W / 2, 308, { size: 84, start: DROP, stagger: .14, end });
  ctx.save(); ctx.globalAlpha = out;
  const lp = eio(prog(t, 20.95, .5));
  ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(240, BASE + 4); ctx.lineTo(240 + 600 * lp, BASE + 4); ctx.stroke();
  const wob = 4 * Math.sin(t * 70) * eo(prog(t, 22.9, .7)) * (t < DROP ? 1 : 0);
  for (let i = 0; i < TN; i++) {
    const s = TOWER + i * TOWER_DT, p = eback(prog(t, s, .3)); if (p <= 0) continue;
    let x = BX + wob * (1 + i * .1), y = BASE - (i + 1) * 46 + 4, rot = 0;
    const q = prog(t, DROP + .05 + (TN - 1 - i) * .03, 1.1);
    if (q > 0) {
      x += (rnd(i + 3) * 2 - 1) * (60 + 300 * q); const yf = y - 140 * q + 1200 * q * q, yl = BASE - 42 - (i % 3) * 10;
      rot = (rnd(i + 9) * 2 - 1) * 2.5 * q; if (yf >= yl) { y = yl; rot = (rnd(i + 9) * 2 - 1) * .3; } else y = yf;
    }
    ctx.save(); ctx.translate(x, y + 21 - 60 * (1 - eo(prog(t, s, .3)))); ctx.rotate(rot); ctx.scale(1, clamp(p, 0, 1.2));
    rr(-120, -21, 240, 42, 8); ctx.fillStyle = i === TN - 1 ? C.goldL : i % 2 ? C.ink2 : C.fill; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
  }
  const cr = prog(t, DROP, .08) * (1 - prog(t, DROP + .12, .2));
  if (cr > 0) {
    ctx.save(); ctx.globalAlpha = out * cr; ctx.strokeStyle = C.ink; ctx.lineWidth = 9; ctx.lineJoin = 'miter'; ctx.beginPath();
    [[BX - 210, 500], [BX - 60, 590], [BX - 120, 650], [BX + 40, 740], [BX - 10, 790], [BX + 210, 860]].forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));
    ctx.stroke(); ctx.restore();
  }
  ctx.restore();
  ring(t, DROP, BX, 680, 60, 520, C.gold, .8, 12);
  ring(t, DROP + .12, BX, 680, 40, 420, C.goldL, .7, 8);
  burst(t, DROP, BX, 680, 30, 313, C.goldL, 1100, .9);
}

/* ---------- S6: apologies are cheap, made whole is expensive (27.6 – 33.1) ---------- */
function scene6(t) {
  if (t < 27.6 || t > 33.2) return;
  const end = 32.65, out = 1 - eio(prog(t, end, .35)), PX = 540, PY = 600, L = 300;
  line(t, 'Apologies are cheap.', W / 2, 215, { size: 66, start: 27.8, stagger: .08, end });
  line(t, '[Made whole] is expensive.', W / 2, 303, { size: 62, start: 29.8, stagger: .1, end });
  const hx = t - HEAVY, ang = t < LIGHT ? 0 : t < HEAVY ? -.06 * eo(prog(t, LIGHT, .25)) : .24 - .3 * Math.exp(-hx * 5) * Math.cos(hx * 14);
  const ex = [PX - L * Math.cos(ang), PX + L * Math.cos(ang)], ey = [PY - L * Math.sin(ang), PY + L * Math.sin(ang)], pan = ey.map(y => y + 130);
  ctx.save(); ctx.globalAlpha = out; ctx.lineCap = ctx.lineJoin = 'round';
  const sp = eback(prog(t, 27.7, .45));
  if (sp > 0) {
    ctx.save(); ctx.translate(PX, 880); ctx.scale(1, sp); ctx.translate(-PX, -880);
    ctx.strokeStyle = C.ink; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(PX, PY); ctx.lineTo(PX, 870); ctx.stroke();
    rr(PX - 120, 866, 240, 24, 10); ctx.fillStyle = C.ink; ctx.fill(); ctx.restore();
    ctx.save(); ctx.translate(PX, PY); ctx.rotate(ang); ctx.scale(sp, 1); rr(-L - 14, -9, 2 * L + 28, 18, 9); ctx.fillStyle = C.ink; ctx.fill(); ctx.restore();
    ctx.beginPath(); ctx.arc(PX, PY, 18 * sp, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
    [0, 1].forEach(i => {
      const px = ex[i] + (i ? 0 : 0), py = pan[i];
      ctx.strokeStyle = C.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(ex[i], ey[i]); ctx.lineTo(px - 90, py); ctx.moveTo(ex[i], ey[i]); ctx.lineTo(px + 90, py); ctx.stroke();
      rr(px - 100, py, 200, 16, 8); ctx.fillStyle = C.ink; ctx.fill();
    });
  }
  const lq = prog(t, LIGHT - .5, .5), lx = ex[0], ly = lerp(pan[0] - 360, pan[0] - 30, lq * lq);
  if (lq > 0) {
    ctx.save(); ctx.translate(lx, ly); rr(-76, -30, 152, 60, 10); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
  }
  const hq = prog(t, HEAVY - .5, .5), hxp = ex[1], hy = lerp(pan[1] - 400, pan[1] - 55, hq * hq);
  if (hq > 0) {
    ctx.save(); ctx.translate(hxp, hy); const g = ctx.createLinearGradient(0, -55, 0, 55); g.addColorStop(0, C.goldL); g.addColorStop(1, C.gold);
    rr(-90, -55, 180, 110, 14); ctx.fillStyle = g; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
  }
  ctx.restore();
  label('SORRY', lx, ly + 10, out * eo(lq * 4), C.ink2, 24);
  label('MADE', hxp, hy - 4, out * eo(hq * 4), C.ink, 24); label('WHOLE', hxp, hy + 28, out * eo(hq * 4), C.ink, 24);
  ring(t, HEAVY, ex[1], pan[1], 40, 300, C.gold, .7, 10);
  burst(t, HEAVY, ex[1], pan[1], 20, 604, C.goldL, 900, .8);
}

/* ---------- S7: be the first to trust (33.1 – 40.3) ---------- */
const AX = 230, BXP = 850, BY = 700;
const qb = (p0, p1, p2, q) => [(1 - q) * (1 - q) * p0[0] + 2 * (1 - q) * q * p1[0] + q * q * p2[0], (1 - q) * (1 - q) * p0[1] + 2 * (1 - q) * q * p1[1] + q * q * p2[1]];
function scene7(t) {
  if (t < 33.1 || t > 40.4) return;
  const end = 39.85, out = 1 - eio(prog(t, end, .4));
  line(t, 'Be the first to [trust.]', W / 2, 220, { size: 70, start: 33.3, stagger: .08, end });
  line(t, 'It comes back [multiplied.]', W / 2, 305, { size: 54, color: C.ink2, start: 35.0, stagger: .08, end });
  ctx.save(); ctx.globalAlpha = out;
  const ap = eback(prog(t, 33.4, .4)), bp = eback(prog(t, 33.55, .4));
  const bpop = 1 + .1 * Math.exp(-Math.max(0, t - ARR) * 9) * (t > ARR ? 1 : 0), apop = 1 + .1 * Math.exp(-Math.max(0, t - BACK) * 9) * (t > BACK ? 1 : 0);
  if (ap > 0) bust(AX, BY, 1.2 * ap * apop, C.goldL);
  if (bp > 0) bust(BXP, BY, 1.2 * bp * bpop, '#FFFBF3');
  const P0 = [AX + 110, 650], P2 = [BXP - 110, 650];
  if (t >= THROW - .2 && t < SPLIT) {
    const q = eio(prog(t, THROW, ARR - THROW)), pt = qb(P0, [540, 380], P2, q), bob = t > ARR ? 5 * Math.sin((t - ARR) * 9) : 0;
    orb(pt[0], pt[1] + bob, 22 * eback(prog(t, THROW - .2, .25)));
  }
  [[430, 1], [890, 0]].forEach(([cy, home], i) => {
    if (t < SPLIT) return;
    const q = eio(prog(t, SPLIT + .1, BACK - SPLIT - .1)), pt = qb(P2, [540, cy], [AX + 125, home ? 610 : 690], q);
    orb(pt[0], pt[1], 22 * eback(prog(t, SPLIT, .25)));
  });
  ctx.restore();
  if (t > BACK) {
    ctx.save(); ctx.globalAlpha = out * eo(prog(t, BACK, .3)); ctx.translate(540, 770); const kp = 1 + .4 * Math.exp(-(t - BACK) * 8); ctx.scale(kp, kp);
    ctx.font = font('serif', 120); ctx.textAlign = 'center'; ctx.fillStyle = C.goldText; ctx.fillText('×2', 0, 40); ctx.restore();
  }
  label('YOU', AX, 850, out * eo(prog(t, 33.9, .3)), C.goldText, 24);
  label('THEM', BXP, 850, out * eo(prog(t, 34.0, .3)), C.ink2, 24);
  ring(t, ARR, BXP - 110, 650, 30, 220, C.gold, .6, 8);
  ring(t, BACK, AX + 125, 650, 30, 260, C.gold, .7, 10);
  burst(t, BACK, AX + 125, 650, 20, 808, C.goldL, 900, .8);
}

/* ---------- S8: takeaway (40.3 – 47.1) ---------- */
function scene8(t) {
  if (t < 40.3 || t > 47.1) return;
  const end = 46.7, out = 1 - eio(prog(t, end, .35));
  line(t, 'Build the [trust.]', W / 2, 215, { size: 84, start: 40.45, stagger: .1, end });
  const r = line(t, '[Earn the dividend.]', W / 2, 300, { size: 64, start: 41.4, stagger: .1, end });
  const u = eio(prog(t, 42.35, .4)) * out;
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 322, r.w * u, 8); }
  line(t, 'One kept promise at a time.', W / 2, 395, { size: 44, color: C.ink2, start: 43.4, stagger: .06, end });
  ctx.save(); ctx.globalAlpha = out;
  ['SKILL', 'ATTENTION', 'SOLUTIONS'].forEach((s, i) => {
    const p = eback(prog(t, 40.9 + i * .15, .4)); if (p <= 0) return;
    const x = 190 + i * 240 + 110;
    ctx.save(); ctx.translate(x, 600); ctx.scale(p, p); rr(-110, -75, 220, 150, 14); ctx.fillStyle = 'rgba(58,52,44,0.12)'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
    label(s, x, 608, out * eo(prog(t, 41.1 + i * .15, .3)), C.ink, 22);
  });
  const fp = eo(prog(t, 41.4, .5));
  dashBlock(150, 700, 780, 150, .1 + .5 * fp);
  if (fp > 0) { rr(150, 700, 780, 150, 18); ctx.lineWidth = 6 * fp; ctx.strokeStyle = C.ink; ctx.stroke(); }
  ctx.restore();
  label('TRUST', W / 2, 788, out * eo(prog(t, 40.8, .3)), fp > .5 ? C.ink : C.goldText, 34);
  ring(t, 41.4, W / 2, 775, 60, 560, C.gold, .8, 12);
  burst(t, 41.45, W / 2, 775, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S9: end card (47.1 – 53) ---------- */
function scene9(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  [[-28, C.cream], [28, C.goldL]].forEach(([dx, col], i) => {
    const p = eback(prog(t, E + .95 + i * .12, .45)); if (p <= 0) return;
    ctx.save(); ctx.translate(W / 2 + dx, 270); ctx.scale(p, p); ctx.beginPath(); ctx.arc(0, 0, 46, 0, Math.PI * 2); ctx.lineWidth = 8; ctx.strokeStyle = col; ctx.globalAlpha = i ? 1 : .6; ctx.stroke(); ctx.restore();
  });
  ring(t, E + 1.2, W / 2, 270, 30, 300, C.goldL, .8, 8);
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  const title = 'Chapter 12: Trust, the Invisible Ingredient';
  line(t, '[' + title + ']', W / 2, 535, { size: fit(title, 900, 66, 'serif'), goldColor: C.goldL, start: E + 1.6, stagger: .06 });
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, 590, 140 * lp, 4);
  line(t, 'Full 9-minute episode — link in comments', W / 2, 680, { font: 'sans', size: 38, color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 22, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8];
const END_CARD = scene9;
