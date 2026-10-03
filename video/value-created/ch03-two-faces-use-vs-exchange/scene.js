/* Value, Created Ch 3 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 3, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [10.9, 7.6], [16, 11.2], [20.7, 14.5], [27.6, 19.3], [33.1, 23.2], [40.3, 28.2], [47.1, 33], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const TAKE = 4.3, FLIP = 7.5;
const MEDALS = [11.6, 12.4];
const RING_IN = 16.6, DRAIN = 18.5;
const FILL_A = 21.3, CUP_A = 22.6, DROP = 23.6;
const EYE_IN = 28.3, WATCH_IN = 28.7, CLOSE = 30.5;
const HOPS = [35.5, 36.2, 36.9, 37.6, 38.3];
const SWIPES = [6.4, 20.7, 33.1];
const E = 46.85;
const IMPACTS = [[TAKE + .35, 8], [FLIP + .45, 9], ...MEDALS.map((s, i) => [s + .3, 4 + i]), [DRAIN + .3, 6], [DROP, 16], [DROP + .45, 5],
  [CLOSE + .25, 9], ...HOPS.slice(0, 2).map(s => [s + .15, 4]), [41.4, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 20.7], [20.7, 33.1], [33.1, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
[.45, .65].forEach((x, i) => { cue(x, 'whoosh', { v: .25 }); cue(x + .15, 'blip', { n: [55, 62][i] }); });
for (let x = 1.2; x < 3.8; x += .22) cue(x, 'tick', { f: 0 });
cue(3.9, 'pop', { f: 1.2 }); cue(TAKE - .1, 'whoosh', { v: .35 }); cue(TAKE + .35, 'thud'); cue(TAKE + .35, 'chime', { n: 72 }); cue(4.9, 'pop', { f: 1.1 });
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(7.2, 'pop', { f: 1 });
cue(FLIP - .1, 'swish'); cue(FLIP + .45, 'thud'); cue(FLIP + .45, 'chime', { n: 76 }); cue(8.8, 'pop', { f: .9 });
cue(11.1, 'pop', { f: 1.2 }); cue(11.5, 'pop', { f: .9 });
MEDALS.forEach((s, i) => { cue(s, 'whoosh', { v: .3 }); cue(s + .3, 'thud'); cue(s + .35, 'blip', { n: [60, 67][i] }); cue(s + .4, 'tick', { f: 1 }); });
cue(14.0, 'chime', { n: 72 });
cue(16.2, 'pop', { f: 1.2 }); cue(RING_IN, 'whoosh', { v: .3 }); cue(RING_IN + .35, 'blip', { n: 64 }); cue(RING_IN + .35, 'chime', { n: 79 }); cue(17.9, 'pop', { f: 1 });
cue(DRAIN, 'drain', { d: 1.2 }); cue(DRAIN + .3, 'thud');
cue(20.2, 'riser', { d: DROP - 20.2 }); cue(21.0, 'pop', { f: 1 }); cue(22.3, 'pop', { f: 1 });
for (let x = FILL_A; x < 23.3; x += .1) cue(x, 'tick', { f: 1 });
cue(CUP_A, 'blip', { n: 67 }); cue(CUP_A + .5, 'blip', { n: 72 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 }); cue(DROP + .45, 'thud'); cue(25.4, 'pop', { f: .9 });
cue(27.8, 'pop', { f: 1.2 }); cue(28.4, 'pop', { f: 1 }); cue(EYE_IN, 'swish'); cue(WATCH_IN, 'blip', { n: 67 }); cue(WATCH_IN, 'chime', { n: 76 });
cue(CLOSE - .6, 'riser', { d: .6 }); cue(CLOSE, 'swish'); cue(CLOSE + .25, 'thud'); cue(CLOSE + .25, 'knock', { v: 1 }); cue(CLOSE + .25, 'impact', { v: .8 });
cue(31.3, 'pop', { f: 1.2 });
cue(33.3, 'pop', { f: 1 }); cue(34.0, 'pop', { f: 1.2 });
HOPS.forEach((h, i) => { cue(h, 'tick', { f: 2 }); cue(h + .02, 'blip', { n: [64, 69, 64, 69, 76][i] }); });
cue(40.0, 'whoosh', { v: .35 }); cue(40.45, 'thud'); cue(41.4, 'impact', { v: .9 }); cue(42.35, 'swish'); cue(43.4, 'pop', { f: .9 });
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

/* coat, certificate: anchored at their bottom centre */
function coat(x, y, s, fill) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 6 / s; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.strokeStyle = C.ink;
  ctx.beginPath(); ctx.moveTo(-50, -150); ctx.lineTo(-104, -66); ctx.lineTo(-80, -46); ctx.lineTo(-50, -92); ctx.lineTo(-50, 0); ctx.lineTo(50, 0); ctx.lineTo(50, -92); ctx.lineTo(80, -46); ctx.lineTo(104, -66); ctx.lineTo(50, -150);
  ctx.lineTo(22, -150); ctx.lineTo(0, -112); ctx.lineTo(-22, -150); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, -112); ctx.lineTo(0, 0); ctx.moveTo(-40, -36); ctx.lineTo(-14, -36); ctx.moveTo(40, -36); ctx.lineTo(14, -36); ctx.lineWidth = 4 / s; ctx.stroke();
  ctx.restore();
}
function cert(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 6 / s; ctx.lineJoin = 'round'; ctx.strokeStyle = C.ink;
  rr(-68, -176, 136, 176, 8); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.stroke();
  rr(-56, -164, 112, 152, 4); ctx.lineWidth = 2.5 / s; ctx.strokeStyle = C.faint; ctx.stroke();
  ctx.lineWidth = 4 / s; ctx.strokeStyle = C.ink2; ctx.lineCap = 'round'; ctx.beginPath();
  [[-132, 36], [-108, 44], [-84, 28]].forEach(([yy, hw]) => { ctx.moveTo(-hw, yy); ctx.lineTo(hw, yy); }); ctx.stroke();
  ctx.lineWidth = 6 / s; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.moveTo(-14, -34); ctx.lineTo(-22, 6); ctx.lineTo(-8, -2); ctx.lineTo(0, 10); ctx.moveTo(14, -34); ctx.lineTo(22, 6); ctx.lineTo(8, -2); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, -46, 24, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.stroke();
  ctx.restore();
}
/* kind 0 = use (flame), 1 = exchange (swap arrows) */
function medallion(kind, r, t, ink, fill) {
  ctx.save(); ctx.lineWidth = r * .05; ctx.strokeStyle = ink; ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fillStyle = fill; ctx.fill(); ctx.stroke();
  if (kind === 0) coat(0, r * .5, r / 135, C.goldL);
  else {
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = r * .09; ctx.beginPath();
    ctx.moveTo(-r * .45, -r * .2); ctx.lineTo(r * .45, -r * .2); ctx.moveTo(r * .22, -r * .42); ctx.lineTo(r * .45, -r * .2); ctx.lineTo(r * .22, 0);
    ctx.moveTo(r * .45, r * .25); ctx.lineTo(-r * .45, r * .25); ctx.moveTo(-r * .22, r * .03); ctx.lineTo(-r * .45, r * .25); ctx.lineTo(-r * .22, r * .47); ctx.stroke();
  }
  ctx.restore();
}

/* ---------- S1 and S2: coat or certificate (0 – 10.9) ---------- */
const OB = [[330, 790], [750, 790]];
function scene1(t) {
  if (t > 6.6) return;
  line(t, '2 a.m. Freezing.', W / 2, 215, { size: 84, start: -.62, stagger: .1, end: 3.7 });
  line(t, 'A coat or a certificate?', W / 2, 305, { size: 54, color: C.ink2, start: 1.0, stagger: .08, end: 3.7 });
  line(t, 'You take the', W / 2, 220, { size: 84, start: 3.9, stagger: .1, end: 5.95 });
  line(t, '[coat.]', W / 2, 310, { size: 92, start: 4.9, stagger: .12, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35));
  ctx.save(); ctx.globalAlpha = out;
  ctx.strokeStyle = C.faint; ctx.lineWidth = 4; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(100, 640); ctx.lineTo(380, 450); ctx.lineTo(660, 640); ctx.moveTo(400, 640); ctx.lineTo(700, 420); ctx.lineTo(980, 640); ctx.stroke();
  ctx.beginPath(); ctx.arc(900, 420, 30, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = 'rgba(94,86,75,0.4)';
  for (let i = 0; i < 40; i++) { const y = 340 + ((rnd(i + 50) * 480 + t * (40 + 40 * rnd(i + 9))) % 480), x = (rnd(i) * W + 20 * Math.sin(t * 1.5 + i)) % W; ctx.beginPath(); ctx.arc(x, y, 3 + 3 * rnd(i + 3), 0, Math.PI * 2); ctx.fill(); }
  const rp = eio(prog(t, .35, .5));
  ctx.beginPath(); ctx.ellipse(540, 796, 330 * rp, 34, 0, 0, Math.PI * 2); ctx.fillStyle = 'rgba(58,52,44,0.14)'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
  const cp = eback(prog(t, .45, .4)), xp = eback(prog(t, .65, .4)), win = eo(prog(t, TAKE, .45));
  const shiv = 4 * Math.sin(t * 55) * eo(prog(t, 1.0, .4)) * (1 - eio(prog(t, TAKE - .2, .3)));
  if (cp > 0) {
    glow(OB[0][0], OB[0][1] - 110, 260 * win, .8 * win);
    ctx.save(); ctx.translate(OB[0][0] + shiv, OB[0][1]); ctx.scale(cp, cp); coat(0, 0, 2.0 + .15 * win, C.goldL); ctx.restore();
  }
  if (xp > 0) { ctx.save(); ctx.globalAlpha = out * lerp(1, .35, win); ctx.translate(OB[1][0], OB[1][1]); ctx.scale(xp, xp); cert(0, 0, 1.55); ctx.restore(); }
  ring(t, TAKE + .35, OB[0][0], OB[0][1] - 120, 40, 300, C.gold, .7, 10);
  burst(t, TAKE + .35, OB[0][0], OB[0][1] - 140, 20, 17, C.goldL, 900, .8);
  ctx.restore();
}
function scene2(t) {
  if (t < 6.4 || t > 11) return;
  const end = 10.45, out = 1 - eio(prog(t, end, .35));
  line(t, 'A warm office.', W / 2, 220, { size: 84, start: 6.65, stagger: .1, end });
  line(t, 'The [certificate] wins.', W / 2, 310, { size: 76, start: 7.2, stagger: .1, end });
  line(t, 'Nothing about them changed.', W / 2, 905, { size: 46, color: C.ink2, start: 8.8, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  const wp = eo(prog(t, 6.5, .5));
  ctx.strokeStyle = C.faint; ctx.lineWidth = 4; rr(110, 400, 180 * wp, 170 * wp, 8); ctx.stroke();
  if (wp > .9) { ctx.beginPath(); ctx.moveTo(200, 400); ctx.lineTo(200, 570); ctx.moveTo(110, 485); ctx.lineTo(290, 485); ctx.stroke(); }
  ctx.beginPath(); ctx.arc(900, 440, 30, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.stroke();
  const rp = eio(prog(t, 6.5, .5));
  ctx.beginPath(); ctx.ellipse(540, 796, 330 * rp, 34, 0, 0, Math.PI * 2); ctx.fillStyle = 'rgba(58,52,44,0.14)'; ctx.fill(); ctx.lineWidth = 6; ctx.stroke();
  const f = eback(prog(t, FLIP, .5));
  glow(OB[1][0], OB[1][1] - 110, 260 * f, .8 * f);
  ctx.save(); ctx.globalAlpha = out * lerp(1, .4, f); ctx.translate(OB[0][0], OB[0][1]); ctx.scale(lerp(1, .7, f), lerp(1, .7, f)); coat(0, 0, 2.1, f > .5 ? '#CDBFA7' : C.goldL); ctx.restore();
  ctx.save(); ctx.translate(OB[1][0], OB[1][1]); ctx.scale(lerp(1, 1.15, f), lerp(1, 1.15, f)); cert(0, 0, 1.55); ctx.restore();
  star(OB[1][0] + 130, OB[1][1] - 200, 22, (.5 + .5 * Math.sin(t * 5)) * clamp(f));
  star(OB[1][0] - 100, OB[1][1] - 230, 15, (.5 + .5 * Math.sin(t * 5 + 2)) * clamp(f));
  ctx.restore();
  ring(t, FLIP + .45, OB[1][0], OB[1][1] - 130, 40, 300, C.gold, .7, 10);
  burst(t, FLIP + .45, OB[1][0], OB[1][1] - 140, 20, 29, C.goldL, 900, .8);
}

/* ---------- S3: two faces (10.9 – 16) ---------- */
const MX = [300, 780], MY = 640, MR = 130;
function scene3(t) {
  if (t < 10.9 || t > 16.1) return;
  const end = 15.55, out = 1 - eio(prog(t, end, .35));
  line(t, 'Every valuable thing', W / 2, 220, { size: 76, start: 11.1, stagger: .09, end });
  line(t, 'has [two faces.]', W / 2, 310, { size: 84, start: 11.5, stagger: .12, end });
  ctx.save(); ctx.globalAlpha = out;
  [0, 1].forEach(i => {
    const p = eback(prog(t, MEDALS[i], .5)); if (p <= 0) return;
    ctx.save(); ctx.translate(MX[i], MY); ctx.scale(p, p);
    glow(0, 0, 230, .45 * clamp(p));
    medallion(i, MR, t, C.ink, i === 0 ? '#FFFBF3' : C.goldL);
    ctx.restore();
  });
  ctx.restore();
  ['USE', 'EXCHANGE'].forEach((s, i) => label(s, MX[i], MY + MR + 66, out * eo(prog(t, MEDALS[i] + .25, .3)), i === 0 ? C.goldText : C.ink, 30));
  ['what it does', 'what it fetches'].forEach((s, i) => {
    const a = out * eo(prog(t, MEDALS[i] + .45, .3)); if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a; ctx.font = font('sans', 44, 500); ctx.textAlign = 'center'; ctx.fillStyle = C.ink2; ctx.fillText(s, MX[i], MY + MR + 122); ctx.restore();
  });
  const lp = eio(prog(t, MEDALS[1] + .3, .5)) * out;
  if (lp > 0) { ctx.strokeStyle = C.gold; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.setLineDash([2, 16]); ctx.beginPath(); ctx.moveTo(MX[0] + MR + 14, MY); ctx.lineTo(MX[0] + MR + 14 + (MX[1] - MX[0] - 2 * MR - 28) * lp, MY); ctx.stroke(); ctx.setLineDash([]); }
  ring(t, MEDALS[1] + .3, MX[1], MY, 40, 300, C.gold, .7, 10);
  burst(t, MEDALS[1] + .3, MX[1], MY, 16, 41, C.goldL, 700, .8);
}

/* ---------- S4: the ring (16 – 20.7) ---------- */
function ring2(x, y, s, a, tone) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(0, 0, 110, 0, Math.PI * 2); ctx.lineWidth = 30 / s; ctx.strokeStyle = tone > .5 ? C.goldL : C.faint; ctx.stroke();
  ctx.lineWidth = 5 / s; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.arc(0, 0, 125, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, 95, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-34, -146); ctx.lineTo(-20, -178); ctx.lineTo(20, -178); ctx.lineTo(34, -146); ctx.lineTo(0, -112); ctx.closePath(); ctx.fillStyle = tone > .5 ? C.goldL : '#CDBFA7'; ctx.fill(); ctx.stroke();
  ctx.restore();
}
function scene4(t) {
  if (t < 16 || t > 20.8) return;
  const end = 20.25, out = 1 - eio(prog(t, end, .35));
  line(t, 'Grandma’s ring.', W / 2, 220, { size: 84, start: 16.2, stagger: .1, end });
  line(t, 'A pawnbroker buys metal. Not memories.', W / 2, 310, { size: 44, color: C.ink2, start: 17.9, stagger: .06, end });
  const p = eback(prog(t, RING_IN, .5)), drain = eio(prog(t, DRAIN, 1.2));
  ctx.save(); ctx.globalAlpha = out;
  if (p > 0) {
    glow(540, 640, 300 * clamp(p), .75 * (1 - drain));
    ring2(540, 660, 1.45 * p, 1, drain > .5 ? 0 : 1);
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4 + t * .8, r = 210 + 14 * Math.sin(t * 3 + i), al = (1 - drain) * eo(prog(t, RING_IN + .3, .4));
      star(540 + Math.cos(a) * r, 660 + Math.sin(a) * r * .9, 12 + 6 * rnd(i), al);
    }
  }
  ctx.restore();
  ring(t, RING_IN + .35, 540, 660, 40, 340, C.gold, .8, 10);
}

/* ---------- S5: the gap (20.7 – 27.6) ---------- */
function bucketPath(x, y0, top, bot, h, off) { ctx.beginPath(); ctx.moveTo(x - top / 2, y0 - h + off); ctx.lineTo(x + top / 2, y0 - h + off); ctx.lineTo(x + bot / 2, y0); ctx.lineTo(x - bot / 2, y0); ctx.closePath(); }
const BKX = 340, CPX = 760, VB = 830, BH = 290, CH = 110;
function vessel(x, top, bot, h, frac, t, handle) {
  ctx.save();
  bucketPath(x, VB, top, bot, h, 0); ctx.fillStyle = 'rgba(58,52,44,0.10)'; ctx.fill();
  ctx.save(); bucketPath(x, VB, top, bot, h, 0); ctx.clip();
  const fh = h * frac, g = ctx.createLinearGradient(0, VB - fh, 0, VB); g.addColorStop(0, C.goldL); g.addColorStop(1, C.gold);
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - 200, VB);
  for (let k = 0; k <= 40; k++) ctx.lineTo(x - 200 + k * 10, VB - fh + 4 * Math.sin(t * 4 + k * .7 + x));
  ctx.lineTo(x + 200, VB); ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round'; bucketPath(x, VB, top, bot, h, 0); ctx.stroke();
  if (handle) { ctx.beginPath(); ctx.arc(x, VB - h, top / 2 - 10, Math.PI, 2 * Math.PI); ctx.stroke(); }
  ctx.restore();
}
function scene5(t) {
  if (t < 20.7 || t > 27.7) return;
  const end = 27.1, out = 1 - eio(prog(t, end, .35));
  line(t, 'Create the [bucket.]', W / 2, 220, { size: 80, start: 21.0, stagger: .1, end: 23.45 });
  line(t, 'Capture the [cup.]', W / 2, 310, { size: 80, start: 22.3, stagger: .1, end: 23.45 });
  line(t, 'The [gap] is where', W / 2, 220, { size: 80, start: DROP, stagger: .1, end });
  line(t, '[businesses live.]', W / 2, 310, { size: 84, start: DROP + .35, stagger: .1, end });
  line(t, 'No gap, no business.', W / 2, 395, { size: 46, color: C.ink2, start: 25.4, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.lineCap = 'round'; const gp = eio(prog(t, 20.9, .4));
  ctx.beginPath(); ctx.moveTo(W / 2 - (W / 2 - 72) * gp, VB); ctx.lineTo(W / 2 + (W / 2 - 72) * gp, VB); ctx.stroke();
  const bp = eback(prog(t, 21.1, .45)), cpp = eback(prog(t, 22.2, .45));
  if (bp > 0) { ctx.save(); ctx.translate(BKX, VB); ctx.scale(clamp(bp), clamp(bp)); ctx.translate(-BKX, -VB); vessel(BKX, 230, 180, BH, .92 * eio(prog(t, FILL_A, 2.0)), t, true); ctx.restore(); }
  if (cpp > 0) { ctx.save(); ctx.translate(CPX, VB); ctx.scale(clamp(cpp), clamp(cpp)); ctx.translate(-CPX, -VB); vessel(CPX, 120, 86, CH, .9 * eio(prog(t, CUP_A, .8)), t, false); ctx.restore(); }
  const ga = eo(prog(t, DROP, .35)), top = VB - BH, ctop = VB - CH;
  if (ga > 0) {
    ctx.save(); ctx.strokeStyle = C.goldText; ctx.lineWidth = 5; ctx.setLineDash([3, 12]);
    ctx.beginPath(); ctx.moveTo(BKX + 125, top); ctx.lineTo(BKX + 125 + (905 - BKX - 125) * ga, top); ctx.stroke(); ctx.setLineDash([]);
    ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(905, top); ctx.lineTo(905, lerp(top, ctop, ga)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(885, top); ctx.lineTo(925, top); ctx.moveTo(885, ctop); ctx.lineTo(925, ctop); ctx.stroke();
    ctx.fillStyle = 'rgba(221,182,95,0.35)'; ctx.fillRect(CPX - 60, top, 120, (ctop - top) * ga);
    ctx.restore();
  }
  ctx.restore();
  label('USE VALUE', BKX, VB + 44, out * eo(prog(t, 22.0, .3)), C.ink2, 24);
  label('EXCHANGE VALUE', CPX, VB + 44, out * eo(prog(t, 22.8, .3)), C.ink2, 24);
  const lp = 1 + .4 * Math.exp(-Math.max(0, t - DROP) * 7) * (t > DROP ? 1 : 0);
  ctx.save(); ctx.translate(905, (top + ctop) / 2 + 40); ctx.scale(lp, lp); ctx.rotate(0); label('THE GAP', -52, 0, out * eo(prog(t, DROP + .1, .3)), C.goldText, 28, 'right'); ctx.restore();
  ring(t, DROP, 760, (top + ctop) / 2, 50, 480, C.gold, .8, 12);
  ring(t, DROP + .12, 760, (top + ctop) / 2, 30, 380, C.goldL, .7, 8);
  burst(t, DROP, 760, (top + ctop) / 2, 30, 313, C.goldL, 1000, .9);
}

/* ---------- S6: the signal test (27.6 – 33.1) ---------- */
function watch(x, y, s, lit, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 6 / s; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round';
  rr(-42, -190, 84, 110, 12); ctx.fillStyle = lit ? C.goldL : '#CDBFA7'; ctx.fill(); ctx.stroke();
  rr(-42, 80, 84, 110, 12); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, 100, 0, Math.PI * 2); ctx.fillStyle = lit ? C.goldL : '#CDBFA7'; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, 76, 0, Math.PI * 2); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 3 / s; ctx.stroke();
  ctx.lineCap = 'round'; ctx.lineWidth = 5 / s;
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; ctx.beginPath(); ctx.moveTo(Math.cos(a) * 62, Math.sin(a) * 62); ctx.lineTo(Math.cos(a) * 70, Math.sin(a) * 70); ctx.stroke(); }
  ctx.lineWidth = 7 / s; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(t * .9 - 1.57) * 54, Math.sin(t * .9 - 1.57) * 54); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(t * .12 - 1.57) * 36, Math.sin(t * .12 - 1.57) * 36); ctx.stroke();
  ctx.restore();
}
function eye(x, y, open, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s * Math.max(.04, open)); ctx.lineWidth = 6 / s; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-120, 0); ctx.quadraticCurveTo(0, -120, 120, 0); ctx.quadraticCurveTo(0, 120, -120, 0); ctx.closePath(); ctx.fillStyle = '#FFFBF3'; ctx.fill();
  ctx.save(); ctx.clip(); ctx.beginPath(); ctx.arc(0, 0, 46, 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill(); ctx.beginPath(); ctx.arc(-14, -14, 12, 0, Math.PI * 2); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.restore();
  ctx.stroke(); ctx.restore();
}
function scene6(t) {
  if (t < 27.6 || t > 33.2) return;
  const end = 32.65, out = 1 - eio(prog(t, end, .35));
  line(t, 'Would you still buy it', W / 2, 220, { size: 76, start: 27.8, stagger: .08, end });
  line(t, 'if nobody saw?', W / 2, 310, { size: 76, start: 28.4, stagger: .1, end });
  line(t, 'No? You bought the [signal.]', W / 2, 895, { size: 56, start: 31.3, stagger: .08, end });
  ctx.save(); ctx.globalAlpha = out;
  const ep = eback(prog(t, EYE_IN, .45)), wp = eback(prog(t, WATCH_IN, .45)), close = eio(prog(t, CLOSE, .35)), dim = close;
  if (ep > 0) { const open = clamp(ep) * (1 - close * .98); eye(540, 480, open, 1.1 * clamp(ep)); }
  if (close > .9) { ctx.strokeStyle = C.ink; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(420, 484); ctx.quadraticCurveTo(540, 520, 660, 484); ctx.stroke(); for (let i = 0; i < 5; i++) { const lx = 450 + i * 45; ctx.beginPath(); ctx.moveTo(lx, 500 + 8 * Math.sin(i / 4 * Math.PI)); ctx.lineTo(lx - 6, 520 + 8 * Math.sin(i / 4 * Math.PI)); ctx.stroke(); } }
  if (wp > 0) {
    glow(540, 690, 260 * clamp(wp), .7 * (1 - dim));
    ctx.save(); ctx.translate(540, 690); ctx.scale(clamp(wp) * .7, clamp(wp) * .7); ctx.translate(-540, -690); watch(540, 690, 1, dim < .5, t); ctx.restore();
    star(690, 570, 20, (.5 + .5 * Math.sin(t * 6)) * (1 - dim) * clamp(wp)); star(400, 600, 14, (.5 + .5 * Math.sin(t * 6 + 2)) * (1 - dim) * clamp(wp)); star(700, 760, 12, (.5 + .5 * Math.sin(t * 6 + 4)) * (1 - dim) * clamp(wp));
  }
  ctx.restore();
  ring(t, CLOSE + .25, 540, 480, 40, 330, C.ink, .6, 8);
}

/* ---------- S7: which face (33.1 – 40.3) ---------- */
function scene7(t) {
  if (t < 33.1 || t > 40.4) return;
  const end = 39.85, out = 1 - eio(prog(t, end, .35));
  line(t, 'Before every trade, ask:', W / 2, 225, { size: 52, color: C.ink2, start: 33.3, stagger: .07, end });
  const q = 'Which face am I looking at?', qs = fit(q, 936, 72, 'serif');
  line(t, 'Which [face] am I looking at?', W / 2, 325, { size: qs, start: 34.0, stagger: .09, end });
  const mx = [300, 780], my = 680;
  ctx.save(); ctx.globalAlpha = out;
  [0, 1].forEach(i => { const p = eback(prog(t, 34.4 + i * .15, .45)); if (p <= 0) return; ctx.save(); ctx.translate(mx[i], my); ctx.scale(p, p); medallion(i, 120, t, C.ink, i === 0 ? '#FFFBF3' : C.goldL); ctx.restore(); });
  const hi = HOPS.filter(h => t >= h).length - 1;
  if (hi >= 0) {
    const cur = hi % 2, prev = hi === 0 ? 0 : (hi - 1) % 2, q2 = hi === 0 ? 1 : eio(prog(t, HOPS[hi], .25));
    const px = lerp(mx[prev], mx[cur], q2), py = my - 190 - 40 * Math.sin(Math.PI * q2), sp = eback(prog(t, HOPS[0], .3));
    ctx.beginPath(); ctx.arc(px, my, 150 * clamp(sp), 0, Math.PI * 2); ctx.lineWidth = 7; ctx.strokeStyle = C.goldText; ctx.stroke();
    ctx.save(); ctx.translate(px, py); ctx.scale(sp, sp); ctx.font = font('serif', 80); ctx.textAlign = 'center'; ctx.fillStyle = C.goldText; ctx.fillText('?', 0, 28); ctx.restore();
  }
  ctx.restore();
  ['USE', 'EXCHANGE'].forEach((s, i) => label(s, mx[i], my + 190, out * eo(prog(t, 34.8 + i * .15, .3)), i === 0 ? C.goldText : C.ink, 28));
}

/* ---------- S8: takeaway (40.3 – 47.1) ---------- */
function scene8(t) {
  if (t < 40.3 || t > 47.1) return;
  const end = 46.7, out = 1 - eio(prog(t, end, .35));
  ctx.save(); ctx.globalAlpha = out;
  [0, 1].forEach(i => { const p = eback(prog(t, 40.45 + i * .12, .4)); if (p <= 0) return; ctx.save(); ctx.translate(540 + (i ? 100 : -100), 320); ctx.scale(p, p); medallion(i, 62, t, C.ink, i === 0 ? '#FFFBF3' : C.goldL); ctx.restore(); });
  const lp = eio(prog(t, 40.9, .4)); ctx.strokeStyle = C.gold; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.setLineDash([2, 12]); ctx.beginPath(); ctx.moveTo(540 - 24 * lp, 320); ctx.lineTo(540 + 24 * lp, 320); ctx.stroke(); ctx.setLineDash([]);
  ctx.restore();
  line(t, 'Get the face', W / 2, 520, { size: 100, start: 40.65, stagger: .1, end });
  const r = line(t, '[right.]', W / 2, 645, { size: 100, start: 41.4, stagger: .1, end });
  const u = eio(prog(t, 42.35, .4)) * out;
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 681, r.w * u, 9); }
  line(t, 'The confusion tax disappears.', W / 2, 800, { size: 50, color: C.ink2, start: 43.4, stagger: .07, end });
  burst(t, 41.5, W / 2, 615, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S9: end card (47.1 – 53) ---------- */
function scene9(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const gp = eio(prog(t, E + .9, .4));
  ctx.fillStyle = C.cream; ctx.globalAlpha = .7; ctx.fillRect(W / 2 - 120 * gp, 186, 240 * gp, 4); ctx.globalAlpha = 1;
  [0, 1].forEach(i => {
    const p = eback(prog(t, E + .95 + i * .1, .4)); if (p <= 0) return;
    ctx.save(); ctx.translate(W / 2 + (i ? 62 : -62), 290); ctx.scale(clamp(p), clamp(p)); ctx.globalAlpha = i ? 1 : .6;
    medallion(i, 40, t, C.cream, C.night); ctx.restore();
  });
  ring(t, E + 1.2, W / 2 + 62, 290, 30, 300, C.goldL, .8, 8);
  const rows = ['Chapter 3:', 'Two Faces — Use vs. Exchange'], sz = Math.min(...rows.map(r => fit(r, 900, 72, 'serif'))), ry = 520 + rows.length * 78 - 30;
  line(t, 'Value, Created —', W / 2, 430, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  rows.forEach((r, i) => line(t, '[' + r + ']', W / 2, 520 + i * 78, { size: sz, goldColor: C.goldL, start: E + 1.6 + i * .2, stagger: .06 }));
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, ry, 140 * lp, 4);
  line(t, 'Full 12-minute episode — link in comments', W / 2, ry + 90, { font: 'sans', size: fit('Full 12-minute episode — link in comments', 936, 44, 'sans'), color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 24, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8];
const END_CARD = scene9;
