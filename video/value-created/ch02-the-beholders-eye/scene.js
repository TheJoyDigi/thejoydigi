/* Value, Created Ch 2 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 2, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [10.9, 7.6], [16, 11.2], [20.7, 14.5], [27.6, 19.3], [33.1, 23.2], [40.3, 28.2], [47.1, 33], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const SLICE0 = .45, SLICE_DT = .12, LIFT = 3.9;
const BARS = [7.0, 11.4, 12.2, 13.0, 13.8, 17.2];
const TOTALS = [21.3, 21.8], DROP = 23.6;
const PEOPLE0 = 28.4, WALK = 29.9, EDGE = 30.6;
const PLATES = [33.8, 34.3], SLICE_IN = 35.2;
const SWIPES = [6.4, 20.7, 33.1];
const E = 46.85;
const IMPACTS = [[LIFT + .3, 5], [BARS[0] + .5, 8], ...BARS.slice(1, 5).map((s, i) => [s + .3, 3 + i]), [BARS[5] + .4, 9],
  ...TOTALS.map(s => [s + .45, 4]), [DROP, 16], [DROP + .45, 5], [EDGE, 11], [SLICE_IN + .4, 10], [41.4, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 20.7], [20.7, 33.1], [33.1, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
for (let i = 0; i < 6; i++) { cue(SLICE0 + i * SLICE_DT, 'tick', { f: 2 }); cue(SLICE0 + i * SLICE_DT + .03, 'blip', { n: [55, 57, 59, 60, 62, 64][i] }); }
cue(1.5, 'pop', { f: .9 }); cue(LIFT, 'pop', { f: 1.2 }); cue(LIFT, 'whoosh', { v: .3 }); cue(LIFT + .3, 'chime', { n: 76 }); cue(4.7, 'pop', { f: 1.2 });
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(7.2, 'pop', { f: 1 });
cue(BARS[0], 'whoosh', { v: .35 }); cue(BARS[0] + .5, 'thud'); cue(BARS[0] + .5, 'chime', { n: 79 });
cue(11.1, 'pop', { f: 1.2 });
BARS.slice(1, 5).forEach((s, i) => { cue(s, 'swish'); cue(s + .3, 'blip', { n: [72, 67, 62, 57][i] }); cue(s + .3, 'tick', { f: 1 }); });
cue(15.9, 'pop', { f: 1.2 }); cue(16.6, 'pop', { f: 1 });
cue(BARS[5] - .2, 'drain', { d: 1.1 }); cue(BARS[5] + .4, 'thud'); cue(BARS[5] + .4, 'blip', { n: 48 });
cue(18.9, 'pop', { f: .9 });
cue(20.2, 'riser', { d: DROP - 20.2 }); cue(21.0, 'pop', { f: 1 });
TOTALS.forEach((s, i) => { cue(s, 'whoosh', { v: .3 }); cue(s + .45, 'thud'); cue(s + .45, 'blip', { n: [60, 55][i] }); });
for (let x = 22.6, k = 0; x < DROP - .05; x += .12 - k * .003, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 }); cue(DROP + .45, 'thud');
cue(27.8, 'pop', { f: 1.2 }); cue(28.0, 'swish');
for (let i = 0; i < 9; i++) cue(PEOPLE0 + i * .1, 'tick', { f: i % 2 });
cue(WALK, 'swish'); cue(EDGE - .6, 'riser', { d: .6 }); cue(EDGE, 'impact', { v: .9 }); cue(EDGE, 'chime', { n: 76 }); cue(EDGE + .1, 'pop', { f: 1.2 }); cue(EDGE + .35, 'knock', { v: 1 });
cue(33.3, 'pop', { f: 1.2 });
PLATES.forEach((s, i) => { cue(s, 'whoosh', { v: .25 }); cue(s + .3, 'thud'); cue(s + .35, 'blip', { n: [60, 55][i] }); });
cue(35.0, 'pop', { f: 1 }); cue(SLICE_IN - .2, 'swish'); cue(SLICE_IN + .4, 'thud'); cue(SLICE_IN + .4, 'chime', { n: 79 });
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
/* pie slice from the pizza's centre (0,0); a0 to a1 in radians */
function wedge(r, a0, a1, lw) {
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r, a0, a1); ctx.closePath(); ctx.fillStyle = C.goldL; ctx.fill();
  ctx.lineJoin = 'round'; ctx.lineWidth = lw; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, r - lw * .9, a0 + .03, a1 - .03); ctx.lineWidth = lw * 1.5; ctx.strokeStyle = C.gold; ctx.lineCap = 'butt'; ctx.stroke();
  const m = (a0 + a1) / 2;
  ctx.fillStyle = C.ink2; [[.5, 0], [.72, .1], [.72, -.1]].forEach(([d, o]) => { ctx.beginPath(); ctx.arc(Math.cos(m + o) * r * d, Math.sin(m + o) * r * d, r * .06, 0, Math.PI * 2); ctx.fill(); });
}
function sliceIcon(x, y, s, a) {
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-Math.PI / 2 - .3);
  wedge(46, 0, .6, 3); ctx.restore();
}

/* ---------- S1: six slices (0 – 6.4) ---------- */
const PZ = [540, 650], PR = 205;
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'Six slices of pizza.', W / 2, 215, { size: 84, start: -.62, stagger: .1, end: 3.7 });
  line(t, 'You’re starving.', W / 2, 305, { size: 56, color: C.ink2, start: 1.0, stagger: .08, end: 3.7 });
  line(t, 'How much is', W / 2, 220, { size: 84, start: LIFT, stagger: .1, end: 5.95 });
  line(t, 'each [slice] worth?', W / 2, 310, { size: 84, start: 4.7, stagger: .12, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35));
  ctx.save(); ctx.globalAlpha = out;
  const lift = eback(prog(t, LIFT, .45));
  for (let i = 0; i < 6; i++) {
    const p = eback(prog(t, SLICE0 + i * SLICE_DT, .4)); if (p <= 0) continue;
    const a0 = -Math.PI / 2 + i * Math.PI / 3, a1 = a0 + Math.PI / 3, m = (a0 + a1) / 2, ex = i === 0 ? 26 * lift : 8;
    ctx.save(); ctx.translate(PZ[0] + Math.cos(m) * ex, PZ[1] + Math.sin(m) * ex); ctx.scale(p, p);
    if (i === 0) glow(Math.cos(m) * PR * .5, Math.sin(m) * PR * .5, 230, .7 * lift);
    wedge(PR, a0, a1, 6); ctx.restore();
    label(String(i + 1), PZ[0] + Math.cos(m) * (PR + 44 + ex), PZ[1] + Math.sin(m) * (PR + 44 + ex) + 9, p > 0 ? clamp(p) * (i === 0 ? 1 : .6) : 0, i === 0 ? C.goldText : C.ink2, 28);
  }
  ring(t, LIFT + .3, PZ[0] + 60, PZ[1] - 110, 40, 260, C.gold, .7, 10);
  burst(t, LIFT + .3, PZ[0] + 60, PZ[1] - 110, 16, 17, C.goldL, 800, .8);
  ctx.restore();
}

/* ---------- S2 to S4: each slice is worth less (6.4 – 20.7) ---------- */
const BASE = 650, HS = [270, 216, 162, 104, 45, -56], BXS = i => 175 + i * 146;
function scene2(t) {
  if (t < 6.4 || t > 20.8) return;
  const end = 20.25, out = 1 - eio(prog(t, end, .35));
  line(t, 'Slice one:', W / 2, 220, { size: 84, start: 6.65, stagger: .1, end: 10.45 });
  line(t, '[transcendent.]', W / 2, 310, { size: 84, start: 7.2, stagger: .12, end: 10.45 });
  line(t, 'Each one worth [less.]', W / 2, 235, { size: 84, start: 11.1, stagger: .1, end: 15.55 });
  line(t, 'Slice six:', W / 2, 220, { size: 84, start: 15.9, stagger: .1, end });
  const s6 = 'worth less than nothing.';
  line(t, '[' + s6 + ']', W / 2, 310, { size: fit(s6, 936, 74, 'serif'), start: 16.6, stagger: .08, end });
  ctx.save(); ctx.globalAlpha = out;
  const bp = eo(prog(t, 6.5, .5));
  ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(W / 2 - (W / 2 - 72) * bp, BASE); ctx.lineTo(W / 2 + (W / 2 - 72) * bp, BASE); ctx.stroke();
  for (let i = 0; i < 6; i++) {
    const p = eio(prog(t, BARS[i], i === 5 ? .6 : .55)), pop = eback(prog(t, BARS[i], .45)), h = HS[i] * p, x = BXS(i);
    if (p > 0) {
      const neg = h < 0, y = neg ? BASE : BASE - h, hh = Math.abs(h);
      ctx.save(); ctx.translate(x, BASE); ctx.scale(1, 1); ctx.translate(-x, -BASE);
      rr(x - 50, y, 100, hh, 14); ctx.fillStyle = neg ? C.fill : i === 0 ? C.gold : C.goldL; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
    }
    if (pop > 0) { sliceIcon(x, 765, 1.6 * clamp(pop), clamp(pop)); label(String(i + 1), x, 845, clamp(pop) * .8, i === 0 ? C.goldText : C.ink2, 26); }
  }
  label('80%', BXS(1), BASE - HS[1] - 22, out * eo(prog(t, BARS[1] + .5, .3)), C.ink2, 24);
  ctx.restore();
  ring(t, BARS[0] + .5, BXS(0), BASE - 270, 40, 280, C.gold, .7, 10);
  burst(t, BARS[0] + .5, BXS(0), BASE - 270, 20, 41, C.goldL, 900, .8);
  ring(t, BARS[5] + .4, BXS(5), BASE + 56, 30, 240, C.ink, .6, 8);
}

/* ---------- S5: the next one sets the price (20.7 – 27.6) ---------- */
const GB = 780, GX = [330, 750];
function scene5(t) {
  if (t < 20.7 || t > 27.7) return;
  const end = 27.1, out = 1 - eio(prog(t, end, .35));
  line(t, 'Total says [water.]', W / 2, 220, { size: 84, start: 21.0, stagger: .1, end });
  const s = 'The next one sets the price.';
  line(t, '[' + s + ']', W / 2, 315, { size: fit(s, 936, 76, 'serif'), start: DROP, stagger: .1, end });
  ctx.save(); ctx.globalAlpha = out;
  ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.lineCap = 'round'; const bp = eio(prog(t, 21.1, .4));
  ctx.beginPath(); ctx.moveTo(W / 2 - (W / 2 - 72) * bp, GB); ctx.lineTo(W / 2 + (W / 2 - 72) * bp, GB); ctx.stroke();
  const bars = [[GX[0] - 105, 340, TOTALS[0], 'T'], [GX[1] - 105, 52, TOTALS[1], 'T'], [GX[0] + 15, 28, DROP, 'N'], [GX[1] + 15, 330, DROP + .12, 'N']];
  bars.forEach(([x, h, s0, k]) => {
    const p = k === 'N' ? eback(prog(t, s0, .55)) : eio(prog(t, s0, .55)); if (p <= 0) return;
    const hh = Math.max(4, h * (k === 'N' ? clamp(p) : p));
    rr(x, GB - hh, 90, hh, 12); ctx.fillStyle = k === 'T' ? C.fill : C.gold; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
  });
  const bump = 1 + .3 * Math.exp(-Math.max(0, t - DROP) * 7) * (t > DROP ? 1 : 0);
  [0, 1].forEach(i => {
    label('TOTAL', GX[i] - 62, GB + 36, out * eo(prog(t, TOTALS[i] + .3, .3)), C.ink2, 24);
    ctx.save(); ctx.translate(GX[i] + 60, GB + 36); ctx.scale(bump, bump); label('NEXT', 0, 0, out * eo(prog(t, DROP + .2, .3)), C.goldText, 24); ctx.restore();
    label(['WATER', 'DIAMOND'][i], GX[i], GB + 86, out * eo(prog(t, TOTALS[i] + .2, .3)), C.ink, 28);
  });
  ctx.restore();
  ring(t, DROP, GX[1] + 60, GB - 330, 50, 480, C.gold, .8, 12);
  ring(t, DROP + .12, GX[1] + 60, GB - 330, 30, 380, C.goldL, .7, 8);
  burst(t, DROP, GX[1] + 60, GB - 300, 30, 313, C.goldL, 1000, .9);
}

/* ---------- S6: the person on the fence (27.6 – 33.1) ---------- */
function pawn(x, y, s, head, body) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 5 / s; ctx.strokeStyle = C.ink;
  ctx.beginPath(); ctx.moveTo(-34, 0); ctx.bezierCurveTo(-34, -40, -18, -52, 0, -52); ctx.bezierCurveTo(18, -52, 34, -40, 34, 0); ctx.closePath(); ctx.fillStyle = body; ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, -82, 26, 0, Math.PI * 2); ctx.fillStyle = head; ctx.fill(); ctx.stroke(); ctx.restore();
}
function scene6(t) {
  if (t < 27.6 || t > 33.2) return;
  const end = 32.65, out = 1 - eio(prog(t, end, .35)), FY = 760;
  line(t, 'The price is set at the [edge.]', W / 2, 220, { size: 72, start: 27.8, stagger: .08, end });
  line(t, 'By the person on the fence.', W / 2, 315, { size: 56, color: C.ink2, start: EDGE - .05, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  const walk = eio(prog(t, WALK, .6));
  for (let i = 0; i < 9; i++) {
    const p = eback(prog(t, PEOPLE0 + i * .1, .4)); if (p <= 0) continue;
    const x = 140 + i * 100;
    if (i === 5) {
      const gp = eback(prog(t, EDGE, .4)), up = 46 * clamp(gp);
      if (gp > 0) glow(x, FY - 130 - up, 200, .7 * clamp(gp));
      pawn(x, FY - up, 1.45 * clamp(p), gp > 0 ? C.goldL : C.paper, gp > 0 ? C.goldL : 'rgba(58,52,44,0.12)');
    } else if (i > 5) {
      ctx.save(); ctx.globalAlpha = out * lerp(1, .3, walk); pawn(x + 60 * walk, FY, 1.45 * clamp(p), C.paper, 'rgba(58,52,44,0.12)'); ctx.restore();
    } else pawn(x, FY, 1.45 * clamp(p), C.fill, C.fill);
  }
  ctx.strokeStyle = C.ink; ctx.lineWidth = 7; ctx.lineCap = 'round';
  const fp = eio(prog(t, 28.2, .6));
  [FY - 22, FY + 20].forEach(y => { ctx.beginPath(); ctx.moveTo(72, y); ctx.lineTo(72 + (W - 144) * fp, y); ctx.stroke(); });
  for (let i = 0; i < 10; i++) { const x = 90 + i * 100; if (fp * 10 > i) { ctx.beginPath(); ctx.moveTo(x, FY - 40); ctx.lineTo(x, FY + 60); ctx.stroke(); } }
  ctx.restore();
  label('THRILLED', 330, FY + 120, out * eo(prog(t, PEOPLE0 + .8, .3)), C.ink2, 24);
  label('WALK AWAY', 890, FY + 120, out * eo(prog(t, WALK + .3, .3)), C.ink2, 24);
  label('ON THE FENCE', 620, FY + 120, out * eo(prog(t, EDGE + .3, .3)), C.goldText, 24);
  ring(t, EDGE, 640, FY - 170, 40, 330, C.gold, .8, 10);
  burst(t, EDGE, 640, FY - 170, 22, 604, C.goldL, 1000, .8);
}

/* ---------- S7: the empty plate (33.1 – 40.3) ---------- */
function plate(x, y, a) {
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y);
  ctx.beginPath(); ctx.arc(0, 0, 150, 0, Math.PI * 2); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, 105, 0, Math.PI * 2); ctx.lineWidth = 3; ctx.strokeStyle = C.faint; ctx.stroke(); ctx.restore();
}
function scene7(t) {
  if (t < 33.1 || t > 40.4) return;
  const end = 39.85, out = 1 - eio(prog(t, end, .35)), PY = 700, PXS = [300, 780];
  line(t, 'Find the [empty plate.]', W / 2, 220, { size: 80, start: 33.3, stagger: .1, end });
  line(t, 'Not the one who just ate six slices.', W / 2, 305, { size: 46, color: C.ink2, start: 35.0, stagger: .06, end });
  ctx.save(); ctx.globalAlpha = out;
  PXS.forEach((x, i) => {
    const p = eback(prog(t, PLATES[i], .45)); if (p <= 0) return;
    ctx.save(); ctx.translate(x, PY); ctx.scale(p, p); ctx.translate(-x, -PY); plate(x, PY, 1); ctx.restore();
  });
  const cp = eback(prog(t, PLATES[1] + .3, .5));
  if (cp > 0) {
    ctx.save(); ctx.globalAlpha = out * .7; ctx.translate(PXS[1], PY); ctx.scale(cp, cp);
    for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3 + .4; ctx.beginPath(); ctx.arc(Math.cos(a) * 60, Math.sin(a) * 60, 26, a - 1.2, a + 1.2); ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.strokeStyle = C.faint; ctx.stroke(); }
    ctx.restore();
  }
  const q = eio(prog(t, SLICE_IN - .55, .6));
  if (q > 0 && q <= 1) {
    const sx = lerp(PXS[0] + 330, PXS[0], q), sy = lerp(PY - 280, PY, q);
    glow(PXS[0], PY, 260 * clamp(q), .75);
    ctx.save(); ctx.translate(sx, sy + 60); ctx.rotate(-Math.PI / 2 + .7 * (1 - q)); wedge(120, -.3, .3, 5); ctx.restore();
  }
  ctx.restore();
  label('STARVING', PXS[0], PY + 220, out * eo(prog(t, PLATES[0] + .3, .3)), C.goldText, 26);
  label('FULL', PXS[1], PY + 220, out * eo(prog(t, PLATES[1] + .3, .3)), C.ink2, 26);
  ring(t, SLICE_IN + .4, PXS[0], PY, 40, 320, C.gold, .8, 10);
  burst(t, SLICE_IN + .4, PXS[0], PY, 22, 707, C.goldL, 1000, .8);
}

/* ---------- S8: takeaway (40.3 – 47.1) ---------- */
function scene8(t) {
  if (t < 40.3 || t > 47.1) return;
  const end = 46.7, out = 1 - eio(prog(t, end, .35));
  ctx.save(); ctx.globalAlpha = out;
  [105, 84, 63, 45, 30, 18].forEach((h, i) => {
    const p = eback(prog(t, 40.45 + i * .08, .35)); if (p <= 0) return;
    const x = 540 + (i - 2.5) * 78;
    rr(x - 28, 390 - h * clamp(p), 56, h * clamp(p), 8); ctx.fillStyle = i === 5 ? C.gold : C.faint; ctx.fill();
  });
  ctx.restore();
  const hp = eo(prog(t, 41.5, .4)) * out; if (hp > 0) glow(540 + 2.5 * 78, 375, 80, .8 * hp);
  line(t, 'The last unit', W / 2, 520, { size: 100, start: 40.65, stagger: .1, end });
  const r = line(t, '[decides.]', W / 2, 645, { size: 100, start: 41.4, stagger: .1, end });
  const u = eio(prog(t, 42.35, .4)) * out;
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 681, r.w * u, 9); }
  line(t, 'Totals impress. Margins decide.', W / 2, 800, { size: 50, color: C.ink2, start: 43.4, stagger: .07, end });
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
  for (let i = 0; i < 6; i++) {
    const p = eback(prog(t, E + .95 + i * .07, .4)); if (p <= 0) continue;
    ctx.save(); ctx.translate(W / 2 + (i - 2.5) * 62, 290); ctx.scale(clamp(p), clamp(p)); ctx.globalAlpha = i === 0 ? 1 : .5 - i * .05;
    ctx.rotate(-Math.PI / 2 - .3); ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 52, 0, .6); ctx.closePath(); ctx.fillStyle = i === 0 ? C.goldL : C.cream; ctx.fill(); ctx.restore();
  }
  ring(t, E + 1.2, W / 2 - 155, 250, 30, 300, C.goldL, .8, 8);
  const rows = ['Chapter 2:', 'The Beholder’s Eye'], sz = Math.min(...rows.map(r => fit(r, 900, 72, 'serif'))), ry = 520 + rows.length * 78 - 30;
  line(t, 'Value, Created —', W / 2, 430, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  rows.forEach((r, i) => line(t, '[' + r + ']', W / 2, 520 + i * 78, { size: sz, goldColor: C.goldL, start: E + 1.6 + i * .2, stagger: .06 }));
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, ry, 140 * lp, 4);
  line(t, 'Full 10-minute episode — link in comments', W / 2, ry + 90, { font: 'sans', size: fit('Full 10-minute episode — link in comments', 936, 44, 'sans'), color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 24, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene1, scene2, scene5, scene6, scene7, scene8];
const END_CARD = scene9;
