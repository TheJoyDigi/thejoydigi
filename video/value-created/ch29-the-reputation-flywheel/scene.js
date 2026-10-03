/* Value, Created Ch 29 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 29, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [13, 9.2], [20, 14.3], [26.8, 19.1], [33.2, 23.6], [40.6, 29], [46.85, 33.2], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const COVER = 1.7, LAND = COVER + .4;
const CARD = 4.0, VAN1 = 4.7, VANS = [5.2, 5.35, 5.5];
const CUST = 7.0, RIPPLE = 7.6, OUTER = [8.4, 8.65, 8.9, 9.15, 9.4, 9.65];
const NODE = [13.2, 15.2, 17.2], ARW = [14.0, 16.0, 18.0], SPIN0 = 18.9;
const DROP = 23.2, OPP = Array.from({ length: 8 }, (_, i) => DROP + .05 + i * .1);
const CRACK = 28.3, SHATTER = 28.95, PHONE = 30.5;
const RULES = [34.7, 35.9, 37.1];
const T0 = 41.0;
const SWIPES = [6.4, 26.8, 33.2];
const E = 46.85;
const IMPACTS = [[LAND, 7], [VANS[2] + .1, 6], [CUST + .1, 4], [NODE[0] + .1, 3], [NODE[1] + .1, 3], [NODE[2] + .1, 4], [ARW[2] + .7, 6], [DROP, 16], [DROP + .45, 5],
  [CRACK, 5], [SHATTER, 13], ...RULES.map((s, i) => [s + .15, 3 + i]), [T0 + 1.5, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 26.8], [26.8, 33.2], [33.2, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
cue(.5, 'pop', { f: .9 }); cue(COVER - .15, 'whoosh', { v: .3 }); cue(LAND, 'thud'); cue(LAND, 'impact', { v: .7 }); cue(LAND + .02, 'chime', { n: 72 });
cue(3.9, 'pop', { f: 1.2 }); cue(CARD, 'pop', { f: 1 }); cue(CARD + .02, 'blip', { n: 60 });
cue(VAN1 - .1, 'whoosh', { v: .3 }); cue(VAN1, 'blip', { n: 64 });
VANS.forEach((x, i) => { cue(x, 'tick', { f: 2 }); cue(x + .02, 'blip', { n: [67, 71, 76][i] }); });
cue(VANS[2] + .1, 'impact', { v: .6 }); cue(VANS[2] + .12, 'chime', { n: 76 });
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(CUST, 'pop', { f: 1 }); cue(CUST + .02, 'blip', { n: 60 }); cue(RIPPLE, 'swish');
OUTER.forEach((x, i) => { cue(x, 'tick', { f: 2 }); cue(x + .03, 'blip', { n: [64, 67, 71, 74, 76, 79][i] }); });
cue(9.0, 'pop', { f: 1 }); cue(11.0, 'tick', { f: 0 });
cue(12.75, 'whoosh', { v: .3 });
[13.0, 15.2, 17.3].forEach(x => cue(x - .1, 'pop', { f: 1.1 }));
NODE.forEach((s, i) => { cue(s, 'thud'); cue(s + .03, 'blip', { n: [60, 64, 67][i] }); cue(ARW[i], 'whoosh', { v: .25 }); });
cue(ARW[2] + .7, 'impact', { v: .6 }); cue(ARW[2] + .7, 'chime', { n: 72 });
cue(20.3, 'pop', { f: 1.2 }); cue(21.4, 'riser', { d: DROP - 21.4 });
for (let x = SPIN0, k = 0; x < DROP - .05; x += Math.max(.1, .5 - k * .04), k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 });
OPP.forEach((x, i) => cue(x + .45, 'blip', { n: [67, 71, 74, 79, 72, 76, 74, 79][i] }));
cue(26.5, 'swish');
cue(27.0, 'pop', { f: 1.2 }); cue(CRACK - .2, 'riser', { d: .2 });
[0, .12, .26].forEach(d => cue(CRACK + d, 'knock', { v: .7 }));
cue(SHATTER, 'impact', { v: 1 }); cue(SHATTER, 'scratch'); cue(SHATTER, 'drain', { d: 1.4 }); cue(28.4, 'pop', { f: 1 });
cue(PHONE, 'pop', { f: .9 }); cue(PHONE + .3, 'thud');
cue(33.9, 'pop', { f: 1.2 });
RULES.forEach((s, i) => { cue(s, 'whoosh', { v: .25 }); cue(s + .15, 'pop', { f: 1 }); cue(s + .2, 'blip', { n: [64, 67, 72][i] }); });
cue(RULES[2] + .2, 'chime', { n: 79 });
cue(T0 - .05, 'whoosh', { v: .35 }); cue(T0 + .1, 'thud'); cue(T0 + 1.5, 'impact', { v: .9 }); cue(T0 + 1.5, 'chime', { n: 76 });
cue(T0 + 2.6, 'swish'); cue(T0 + 3.2, 'pop', { f: .9 });
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: 6.4, breakdown: 21.4, drop: DROP, end: 46.75 };

function star(x, y, r, col) {
  ctx.save(); ctx.translate(x, y); ctx.beginPath();
  for (let i = 0; i < 10; i++) { const rad = i % 2 ? r * .42 : r, an = i * Math.PI / 5 - Math.PI / 2; ctx.lineTo(Math.cos(an) * rad, Math.sin(an) * rad); }
  ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.restore();
}
function person(x, y, s, fill) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 4 / s; ctx.strokeStyle = C.ink; ctx.fillStyle = fill;
  ctx.beginPath(); ctx.arc(0, -18, 15, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 30, 31, Math.PI, 2 * Math.PI); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();
}
/* origin at the sole's back edge; cover pulls down over the foot */
function shoe(x, y, s, cover) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineWidth = 6 / s; ctx.strokeStyle = C.ink;
  ctx.beginPath(); ctx.moveTo(-40, -190); ctx.lineTo(34, -190); ctx.lineTo(34, -80); ctx.lineTo(112, -52); ctx.quadraticCurveTo(138, -44, 138, -18); ctx.lineTo(138, 0); ctx.lineTo(-40, 0); ctx.closePath();
  ctx.fillStyle = C.fill; ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.ink; ctx.fillRect(-40, -16, 178, 16);
  ctx.strokeStyle = C.faint; ctx.lineCap = 'round'; ctx.beginPath(); [-165, -140, -115].forEach(ly => { ctx.moveTo(-26, ly); ctx.lineTo(20, ly); }); ctx.stroke();
  if (cover > 0) {
    ctx.save(); ctx.translate(0, -(1 - eo(cover)) * 300); ctx.globalAlpha *= clamp(cover * 3); ctx.strokeStyle = C.ink;
    ctx.beginPath(); ctx.moveTo(-52, -118); ctx.lineTo(46, -118); ctx.lineTo(46, -88); ctx.lineTo(124, -60); ctx.quadraticCurveTo(150, -50, 150, -16); ctx.lineTo(150, 10); ctx.lineTo(-52, 10); ctx.closePath();
    ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-52, -100); ctx.lineTo(46, -100); ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}
/* origin at the van's bottom centre, facing right */
function van(x, y, s, p) {
  if (p <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * p, s * p); ctx.lineJoin = 'round'; ctx.lineWidth = 5 / s;
  ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.moveTo(-70, -10); ctx.lineTo(-70, -90); ctx.lineTo(22, -90); ctx.lineTo(60, -58); ctx.lineTo(76, -52); ctx.lineTo(76, -10); ctx.closePath();
  ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(30, -80); ctx.lineTo(54, -58); ctx.lineTo(30, -58); ctx.closePath(); ctx.fillStyle = C.paper; ctx.fill(); ctx.stroke();
  [-38, 44].forEach(wx => { ctx.beginPath(); ctx.arc(wx, -6, 15, 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill(); ctx.beginPath(); ctx.arc(wx, -6, 5, 0, Math.PI * 2); ctx.fillStyle = C.cream; ctx.fill(); });
  ctx.restore();
}
function arrow(x0, x1, y, p) {
  if (p <= 0) return;
  const x = lerp(x0, x1, p);
  ctx.save(); ctx.strokeStyle = C.ink2; ctx.fillStyle = C.ink2; ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x, y); ctx.stroke();
  if (p > .9) { ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x1 - 16, y - 12); ctx.lineTo(x1 - 16, y + 12); ctx.closePath(); ctx.fill(); }
  ctx.restore();
}

/* ---------- S1: shoe covers, no ads (0 – 6.4) ---------- */
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'Danny wears', W / 2, 215, { size: 84, start: -.62, stagger: .12, end: 3.7 });
  line(t, '[shoe covers.]', W / 2, 305, { size: 84, start: -.4, stagger: .12, end: 3.7 });
  line(t, 'No ads. [Ever.]', W / 2, 215, { size: 84, start: 3.9, stagger: .12, end: 5.95 });
  line(t, 'Booked six weeks out.', W / 2, 305, { size: 58, color: C.ink2, start: 4.4, stagger: .09, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35)), bo = eo(prog(t, .35, .4)) * (1 - eio(prog(t, 3.55, .3)));
  if (bo > 0) {
    ctx.save(); ctx.globalAlpha = bo;
    ctx.fillStyle = 'rgba(58,52,44,0.10)'; ctx.beginPath(); ctx.ellipse(540, 846, 230, 18, 0, 0, Math.PI * 2); ctx.fill();
    shoe(447, 840, 1.9, prog(t, COVER, .4)); ctx.restore();
    ring(t, LAND, 540, 800, 40, 380, C.gold, .7, 10);
    burst(t, LAND, 540, 800, 20, 41, C.goldL, 900, .8);
  }
  ctx.save(); ctx.globalAlpha = out;
  const cp = eback(prog(t, CARD, .4));
  if (cp > 0) {
    ctx.save(); ctx.translate(190, 770); ctx.scale(cp, cp); ctx.rotate(-.05);
    rr(-80, -52, 160, 104, 12); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
    star(-44, -16, 16, C.gold); ctx.fillStyle = C.faint; rr(-18, -26, 78, 10, 5); ctx.fill(); rr(-52, 12, 112, 10, 5); ctx.fill(); rr(-52, 32 - 4, 70, 8, 4); ctx.fill();
    ctx.restore();
  }
  arrow(280, 345, 770, eio(prog(t, VAN1 - .35, .3)));
  van(480, 815, 1.35, eback(prog(t, VAN1, .4)));
  arrow(590, 655, 770, eio(prog(t, VANS[0] - .35, .3)));
  VANS.forEach((s, i) => van(750 + i * 92, 815, .72, eback(prog(t, s, .35))));
  ring(t, VANS[2], 850, 770, 30, 260, C.gold, .6, 8);
  ctx.restore();
}

/* ---------- S2: every job is a broadcast (6.4 – 13) ---------- */
const BC = [540, 660], BR = 250;
function scene2(t) {
  if (t < 6.4 || t > 13.1) return;
  const end = 12.55, out = 1 - eio(prog(t, end, .35));
  line(t, 'Every job is a [broadcast.]', W / 2, 220, { size: 68, start: 6.7, stagger: .1, end });
  line(t, 'It reaches everyone they tell.', W / 2, 308, { size: 50, color: C.ink2, start: 9.0, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  const OA = i => -Math.PI / 2 + i * Math.PI / 3, ox = i => BC[0] + BR * Math.cos(OA(i)), oy = i => BC[1] + BR * Math.sin(OA(i));
  [0, 1, 2, 3, 4, 5].forEach(i => {
    const lp = eio(prog(t, OUTER[i] - .35, .4)); if (lp <= 0) return;
    ctx.strokeStyle = C.faint; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.setLineDash([2, 12]);
    ctx.beginPath(); ctx.moveTo(BC[0], BC[1]); ctx.lineTo(lerp(BC[0], ox(i), lp), lerp(BC[1], oy(i), lp)); ctx.stroke(); ctx.setLineDash([]);
  });
  [0, 1, 2].forEach(k => ring(t, RIPPLE + k * .22, BC[0], BC[1] - 10, 50, 330, C.gold, .9, 9));
  OUTER.forEach((s, i) => {
    const p = eback(prog(t, s, .35)); if (p <= 0) return;
    person(ox(i), oy(i) + 6, p * 1.35, t > s + .15 ? C.goldL : '#FFFBF3');
    burst(t, s + .1, ox(i), oy(i), 7, 100 + i * 13, C.goldL, 300, .5);
  });
  const cp = eback(prog(t, CUST, .45));
  if (cp > 0) {
    person(BC[0], BC[1] + 10, 2.4 * cp, C.gold);
    ctx.save(); ctx.translate(BC[0] + 80 * cp, BC[1] - 80 * cp); ctx.scale(cp, cp);
    ctx.beginPath(); ctx.arc(0, 0, 26, 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill();
    ctx.beginPath(); ctx.moveTo(-11, 1); ctx.lineTo(-3, 9); ctx.lineTo(12, -9); ctx.strokeStyle = C.cream; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

/* ---------- S3 + S4: the flywheel, then it spins itself (13 – 26.8) ---------- */
const WC = [540, 690], WR = 215, ANG = [-90, 30, 150].map(a => a * Math.PI / 180);
const nodeXY = i => [WC[0] + WR * Math.cos(ANG[i]), WC[1] + WR * Math.sin(ANG[i])];
const spin = t => t < SPIN0 ? 0 : .5 * (t - SPIN0) + .32 * Math.pow(t - SPIN0, 2);
function nodeIcon(kind) {
  ctx.save(); ctx.strokeStyle = C.cream; ctx.fillStyle = C.cream; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (kind === 0) { ctx.beginPath(); ctx.moveTo(-20, 2); ctx.lineTo(-6, 16); ctx.lineTo(22, -16); ctx.stroke(); }
  else if (kind === 1) star(0, 2, 26, C.cream);
  else { ctx.beginPath(); ctx.moveTo(-16, 16); ctx.lineTo(16, -16); ctx.moveTo(-2, -16); ctx.lineTo(16, -16); ctx.lineTo(16, 2); ctx.stroke(); }
  ctx.restore();
}
function wheel(t, out) {
  const th = spin(t), rp = eio(prog(t, 12.8, .7));
  if (rp <= 0) return;
  ctx.save(); ctx.globalAlpha = out;
  const glow = eo(prog(t, DROP, .6));
  if (glow > 0) {
    const g = ctx.createRadialGradient(WC[0], WC[1], 40, WC[0], WC[1], 440); g.addColorStop(0, `rgba(221,182,95,${.55 * glow})`); g.addColorStop(1, 'rgba(221,182,95,0)');
    ctx.fillStyle = g; ctx.fillRect(0, WC[1] - 440, W, 880);
  }
  ctx.beginPath(); ctx.arc(WC[0], WC[1], WR, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * rp); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.save(); ctx.globalAlpha = out * rp; ctx.beginPath(); ctx.arc(WC[0], WC[1], WR - 3, 0, Math.PI * 2); ctx.fillStyle = 'rgba(58,52,44,0.06)'; ctx.fill();
  ctx.strokeStyle = 'rgba(58,52,44,0.28)'; ctx.lineWidth = 5; ctx.lineCap = 'round';
  for (let k = 0; k < 6; k++) { const a = th + k * Math.PI / 3; ctx.beginPath(); ctx.moveTo(WC[0] + Math.cos(a) * 44, WC[1] + Math.sin(a) * 44); ctx.lineTo(WC[0] + Math.cos(a) * (WR - 6), WC[1] + Math.sin(a) * (WR - 6)); ctx.stroke(); }
  ctx.beginPath(); ctx.arc(WC[0], WC[1], 44, 0, Math.PI * 2); ctx.fillStyle = t >= SPIN0 ? C.goldL : C.paper; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
  [0, 1, 2].forEach(i => {
    const ap = eio(prog(t, ARW[i], .7)); if (ap <= 0) return;
    const a0 = ANG[i] + .42, a1 = ANG[(i + 1) % 3] + (i === 2 ? Math.PI * 2 : 0) - .42, e = lerp(a0, a1, ap);
    ctx.beginPath(); ctx.arc(WC[0], WC[1], WR + 0, a0, e); ctx.lineWidth = 12; ctx.strokeStyle = C.gold; ctx.lineCap = 'round'; ctx.stroke();
    if (ap > .95) {
      const hx = WC[0] + WR * Math.cos(a1), hy = WC[1] + WR * Math.sin(a1), tx = -Math.sin(a1), ty = Math.cos(a1), nx = Math.cos(a1), ny = Math.sin(a1);
      ctx.beginPath(); ctx.moveTo(hx + tx * 26, hy + ty * 26); ctx.lineTo(hx - tx * 6 + nx * 22, hy - ty * 6 + ny * 22); ctx.lineTo(hx - tx * 6 - nx * 22, hy - ty * 6 - ny * 22); ctx.closePath(); ctx.fillStyle = C.gold; ctx.fill();
    }
  });
  if (th > 0) [0, 1, 2].forEach(k => {
    const a = -Math.PI / 2 + th + k * Math.PI * 2 / 3;
    ctx.beginPath(); ctx.arc(WC[0], WC[1], WR, a - .35, a); ctx.lineWidth = 12; ctx.strokeStyle = 'rgba(255,244,214,0.9)'; ctx.stroke();
    ctx.beginPath(); ctx.arc(WC[0] + WR * Math.cos(a), WC[1] + WR * Math.sin(a), 11, 0, Math.PI * 2); ctx.fillStyle = '#FFF4D6'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.ink; ctx.stroke();
  });
  ['DELIVERY', 'REPUTATION', 'OPPORTUNITY'].forEach((s, i) => {
    const [x, y] = nodeXY(i), p = eback(prog(t, NODE[i], .4)); if (p <= 0) return;
    ctx.save(); ctx.translate(x, y); ctx.scale(p, p);
    ctx.beginPath(); ctx.arc(0, 0, 62, 0, Math.PI * 2); ctx.fillStyle = i === 2 ? C.ink : C.gold; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
    nodeIcon(i); ctx.restore();
    label(s, i === 0 ? x : x + (i === 1 ? 105 : -105), i === 0 ? y - 84 : y + 100, out * eo(prog(t, NODE[i] + .15, .3)), i === 2 ? C.goldText : C.ink, 24);
  });
  ctx.restore();
}
function opportunities(t, out) {
  const SRC = [[110, 430], [970, 430], [80, 690], [1000, 690], [150, 930], [930, 930], [330, 380], [750, 380]];
  SRC.forEach(([sx, sy], i) => {
    const p = prog(t, OPP[i], .55); if (p <= 0 || p >= 1) return;
    const e = eio(p), x = lerp(sx, WC[0], e), y = lerp(sy, WC[1], e), s = 1.15 - .6 * e;
    ctx.save(); ctx.globalAlpha = out * (1 - eo(prog(p, .8, .2))); ctx.translate(x, y); ctx.scale(s, s);
    rr(-46, -32, 92, 64, 18); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.fillStyle = 'rgba(26,24,20,0.5)'; rr(-28, -14, 56, 9, 4); ctx.fill(); rr(-28, 5, 36, 9, 4); ctx.fill();
    ctx.restore();
  });
  ring(t, OPP[7] + .45, WC[0], WC[1], 50, 300, C.gold, .6, 8);
}
function scene34(t) {
  if (t < 12.6 || t > 26.9) return;
  const end = 26.35, out = 1 - eio(prog(t, end, .35));
  [['Delivery becomes', '[reputation.]', 13.0, 14.95], ['Reputation becomes', '[opportunity.]', 15.2, 16.95], ['Opportunity becomes', 'more [delivery.]', 17.2, 19.7]].forEach(([a, b, s, e]) => {
    line(t, a, W / 2, 220, { size: 74, start: s, stagger: .09, end: e });
    line(t, b, W / 2, 310, { size: 78, start: s + .45, stagger: .1, end: e });
  });
  line(t, 'You stop chasing.', W / 2, 220, { size: 80, start: 20.3, stagger: .1, end });
  line(t, '[Opportunity] chases you.', W / 2, 310, { size: fit('Opportunity chases you.', 880, 74, 'serif'), start: DROP, stagger: .12, end });
  const wob = 5 * Math.sin(t * 70) * eo(prog(t, 22.0, 1)) * (t < DROP ? 1 : 0);
  ctx.save(); ctx.translate(wob, 0); wheel(t, out); ctx.restore();
  opportunities(t, out);
  ring(t, DROP, WC[0], WC[1], 60, 560, C.gold, .8, 12);
  ring(t, DROP + .12, WC[0], WC[1], 40, 440, C.goldL, .7, 8);
  burst(t, DROP, WC[0], WC[1], 30, 313, C.goldL, 1000, .9);
}

/* ---------- S5: a wheel of glass (26.8 – 33.2) ---------- */
const SH = 14, GC = [540, 650], GR = 230;
function scene5(t) {
  if (t < 26.8 || t > 33.3) return;
  const end = 32.65, out = 1 - eio(prog(t, end, .35));
  line(t, 'A flywheel of [glass.]', W / 2, 220, { size: 80, start: 27.0, stagger: .1, end });
  line(t, 'One betrayal unwinds years.', W / 2, 308, { size: 52, color: C.ink2, start: CRACK + .1, stagger: .08, end });
  ctx.save(); ctx.globalAlpha = out;
  const gp = eback(prog(t, 27.1, .5)), dt = Math.max(0, t - SHATTER), fade = 1 - eo(prog(t, SHATTER + .6, 1.4));
  if (gp > 0 && fade > 0) for (let k = 0; k < SH; k++) {
    const a0 = k * Math.PI * 2 / SH, a1 = a0 + Math.PI * 2 / SH, am = (a0 + a1) / 2, v = 180 + 140 * rnd(k + 5);
    ctx.save(); ctx.globalAlpha = out * fade;
    ctx.translate(GC[0], GC[1]); ctx.scale(gp, gp);
    ctx.translate(Math.cos(am) * v * dt, Math.sin(am) * v * dt + 520 * dt * dt); ctx.rotate((rnd(k + 33) - .5) * 3 * dt);
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, GR, a0, a1); ctx.closePath();
    ctx.fillStyle = 'rgba(255,252,246,0.7)'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round'; ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, GR - 14, a0 + .08, a1 - .08); ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(221,182,95,0.7)'; ctx.stroke();
    ctx.restore();
  }
  const cr = eo(prog(t, CRACK, .35));
  if (cr > 0 && t < SHATTER) {
    ctx.save(); ctx.translate(GC[0] + 30, GC[1] - 40); ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    [[-1, 190], [.3, 200], [1.6, 180], [2.5, 190], [3.6, 210]].forEach(([a, len]) => {
      ctx.beginPath(); ctx.moveTo(0, 0); let x = 0, y = 0;
      for (let s = 1; s <= 5; s++) { const d = len * cr * s / 5, jx = (s % 2 ? 1 : -1) * 14; x = Math.cos(a) * d - Math.sin(a) * jx; y = Math.sin(a) * d + Math.cos(a) * jx; ctx.lineTo(x, y); }
      ctx.stroke();
    });
    ctx.restore();
  }
  ctx.restore();
  const pp = eback(prog(t, PHONE, .4)) * out;
  if (pp > 0) {
    ctx.save(); ctx.translate(540, 720); ctx.scale(pp, pp);
    rr(-62, -110, 124, 220, 22); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    rr(-46, -86, 92, 150, 8); ctx.fillStyle = 'rgba(58,52,44,0.10)'; ctx.fill();
    ctx.beginPath(); ctx.arc(0, 86, 9, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
    label('QUIET FOR A YEAR', 540, 880, out * eo(prog(t, PHONE + .2, .3)), C.ink2, 26);
  }
  ring(t, SHATTER, GC[0], GC[1], 40, 440, C.ink, .6, 10);
  burst(t, SHATTER, GC[0] + 30, GC[1] - 40, 24, 509, C.ink2, 900, .8);
}

/* ---------- S6: three rules (33.2 – 40.6) ---------- */
function ruleIcon(kind) {
  ctx.save(); ctx.strokeStyle = C.cream; ctx.fillStyle = C.cream; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (kind === 0) { ctx.beginPath(); ctx.moveTo(-14, 2); ctx.lineTo(-4, 12); ctx.lineTo(16, -12); ctx.stroke(); }
  else if (kind === 1) { rr(-20, -14, 40, 28, 5); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-10, -3); ctx.lineTo(10, -3); ctx.moveTo(-10, 5); ctx.lineTo(4, 5); ctx.stroke(); }
  else { ctx.beginPath(); ctx.arc(0, 0, 18, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -12); ctx.moveTo(0, 0); ctx.lineTo(9, 5); ctx.stroke(); }
  ctx.restore();
}
function scene6(t) {
  if (t < 33.2 || t > 40.7) return;
  const end = 40.15;
  label('THREE RULES', W / 2, 290, env(t, 33.5, end, .3), C.goldText, 26);
  ['[Overdeliver] the small stuff', 'Put your [name] on it', 'Reply the [same day]'].forEach((q, i) => {
    const s = RULES[i], y = 460 + i * 160;
    const np = eback(prog(t, s, .3)) * (1 - eio(prog(t, end, .3)));
    if (np > 0) {
      ctx.save(); ctx.translate(205, y - 22); ctx.scale(np, np);
      ctx.beginPath(); ctx.arc(0, 0, 40, 0, Math.PI * 2); ctx.fillStyle = i === 2 ? C.ink : C.gold; ctx.fill();
      ruleIcon(i); ctx.restore();
    }
    line(t, q, 270, y, { size: 56, align: 'left', start: s + .1, stagger: .06, end });
  });
}

/* ---------- S7: takeaway (40.6 – 46.85) ---------- */
function miniWheel(x, y, r, th, a) {
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.lineWidth = 4; ctx.strokeStyle = C.gold;
  for (let k = 0; k < 6; k++) { const an = th + k * Math.PI / 3; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * .25, y + Math.sin(an) * r * .25); ctx.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.stroke(); }
  ctx.beginPath(); ctx.arc(x, y, r * .25, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.restore();
}
function scene7(t) {
  if (t < 40.6 || t > 47) return;
  const end = 46.5;
  line(t, 'Do the work.', W / 2, 420, { size: 104, start: T0 + .1, stagger: .1, end });
  const r = line(t, '[Let them tell the story.]', W / 2, 550, { size: fit('Let them tell the story.', 900, 84, 'serif'), start: T0 + 1.4, stagger: .1, end });
  const u = eio(prog(t, T0 + 2.5, .4)) * (1 - eio(prog(t, end, .35)));
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 584, r.w * u, 9); }
  const wp = eback(prog(t, T0 + 3.2, .4)) * (1 - eio(prog(t, end, .35)));
  if (wp > 0) { ctx.save(); ctx.translate(W / 2, 780); ctx.scale(wp, wp); miniWheel(0, 0, 90, (t - T0 - 3.2) * 3, 1); ctx.restore(); }
  burst(t, T0 + 1.5, W / 2, 520, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S8: end card (46.85 – 53) ---------- */
function scene8(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const mp = eback(prog(t, E + .95, .4));
  if (mp > 0) { ctx.save(); ctx.translate(W / 2, 260); ctx.scale(mp, mp); ctx.strokeStyle = C.goldL; ctx.fillStyle = C.goldL; miniWheelEnd((t - E) * 2.4); ctx.restore(); }
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  line(t, '[Chapter 29: The Reputation Flywheel]', W / 2, 535, { size: fit('Chapter 29: The Reputation Flywheel', 900, 66, 'serif'), goldColor: C.goldL, start: E + 1.6, stagger: .06 });
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, 590, 140 * lp, 4);
  line(t, 'Full 7-minute episode — link in comments', W / 2, 680, { font: 'sans', size: 38, color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 22, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}
function miniWheelEnd(th) {
  ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0, 0, 56, 0, Math.PI * 2); ctx.stroke();
  for (let k = 0; k < 6; k++) { const an = th + k * Math.PI / 3; ctx.beginPath(); ctx.moveTo(Math.cos(an) * 14, Math.sin(an) * 14); ctx.lineTo(Math.cos(an) * 56, Math.sin(an) * 56); ctx.stroke(); }
  ctx.beginPath(); ctx.arc(0, 0, 14, 0, Math.PI * 2); ctx.fill();
}

const SCENES = [scene1, scene2, scene34, scene5, scene6, scene7];
const END_CARD = scene8;
