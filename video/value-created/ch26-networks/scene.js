/* Value, Created Ch 26 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 26, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [10.9, 7.6], [16, 11.2], [20.7, 14.5], [27.6, 19.3], [33.1, 23.2], [40.3, 28.2], [47.1, 33], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const WIRE = [.2, 1.2], PULSES = [1.5, 2.2, 2.9], PAIR = 5.4;
const CLUSTER_T = 8.0;
const RING_T = 11.5, NEW_T = 12.7, SPOKES = 12.95;
const OLD_T = 16.5, CROWD_T = 21.3;
const DROP = 23.6;
const NZ = [29.6, 30.3, 31.0, 31.7];
const QS = [33.5, 34.6, 35.7];
const SWIPES = [6.4, 20.7, 33.1];
const E = 46.85;
const IMPACTS = [[PAIR + .1, 6], [NEW_T + .25, 6], [DROP, 16], [DROP + .45, 5], ...NZ.map((s, i) => [s + .35, 4 + i * 2]),
  ...QS.map(s => [s + .1, 3]), [41.4, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 20.7], [20.7, 33.1], [33.1, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
cue(.3, 'whoosh', { v: .3 }); [.45, .6].forEach((x, i) => cue(x + .1, 'blip', { n: [55, 62][i] }));
PULSES.forEach((x, i) => { cue(x, 'tick', { f: 2 }); cue(x + .5, 'blip', { n: [64, 67, 71][i] }); });
cue(3.9, 'pop', { f: 1 }); cue(4.0, 'thud'); cue(4.7, 'pop', { f: 1.2 }); cue(5.0, 'pop', { f: 1 }); cue(5.05, 'whoosh', { v: .3 });
cue(PAIR, 'chime', { n: 76 }); cue(PAIR, 'impact', { v: .8 }); cue(PAIR + .05, 'blip', { n: 79 });
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(7.2, 'pop', { f: .9 }); cue(7.4, 'thud'); cue(7.4, 'blip', { n: 55 });
for (let i = 0; i < 10; i++) cue(CLUSTER_T + i * .07, 'tick', { f: i % 3 });
cue(8.75, 'swish'); cue(9.3, 'chime', { n: 72 }); cue(9.3, 'thud');
cue(11.1, 'pop', { f: 1.2 }); cue(11.6, 'pop', { f: .9 });
for (let i = 0; i < 6; i++) cue(RING_T + i * .1, 'tick', { f: i % 2 });
cue(12.0, 'swish'); cue(NEW_T, 'pop', { f: 1.2 }); cue(NEW_T + .1, 'thud');
for (let i = 0; i < 6; i++) cue(SPOKES + i * .1 + .3, 'blip', { n: [60, 64, 67, 71, 74, 76][i] });
cue(NEW_T + .25, 'chime', { n: 79 }); cue(NEW_T + .25, 'impact', { v: .6 });
cue(16.2, 'pop', { f: 1.2 });
for (let i = 0; i < 7; i++) cue(OLD_T + i * .12, 'blip', { n: [50, 53, 55, 50, 53, 48, 52][i] });
cue(18.5, 'drain', { d: 1.2 });
cue(20.2, 'riser', { d: DROP - 20.2 }); cue(21.0, 'pop', { f: 1 });
for (let i = 0; i < 7; i++) { cue(CROWD_T + i * .18, 'whoosh', { v: .2 }); cue(CROWD_T + i * .18 + .4, 'blip', { n: 55 + i * 2 }); }
for (let x = 22.6, k = 0; x < DROP - .05; x += .12 - k * .003, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 }); cue(DROP + .45, 'thud');
cue(DROP + .9, 'pop', { f: 1 });
cue(27.8, 'pop', { f: 1.2 }); cue(28.0, 'swish'); cue(29.2, 'pop', { f: 1 });
for (let i = 0; i < 9; i++) cue(28.05 + i * .06, 'tick', { f: i % 3 });
NZ.forEach((s, i) => { cue(s - .1, 'whoosh', { v: .25 }); cue(s + .35, 'knock', { v: .8 }); cue(s + .35, 'blip', { n: [64, 60, 57, 53][i] }); });
cue(NZ[3] + .4, 'scratch');
cue(33.3, 'tick', { f: 2 });
QS.forEach((s, i) => { cue(s + .1, 'blip', { n: [67, 71, 74][i] }); cue(s + .1, 'pop', { f: 1 }); });
cue(40.0, 'whoosh', { v: .35 }); cue(40.45, 'thud'); cue(41.4, 'impact', { v: .9 }); cue(42.35, 'swish');
for (let i = 0; i < 5; i++) cue(44.2 + i * .25, 'blip', { n: [60, 64, 67, 71, 76][i] });
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: 6.4, breakdown: 20.2, drop: DROP, end: 46.75 };

const pairs = (pts, maxD) => {
  const o = [];
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) if (Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]) < maxD) o.push([i, j]);
  return o;
};

/* node: grey when asleep, gold and glowing when awake */
function node(x, y, r, wake, s) {
  if (s <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (wake > 0) {
    const g = ctx.createRadialGradient(0, 0, r * .6, 0, 0, r * 2.6);
    g.addColorStop(0, `rgba(221,182,95,${.55 * wake})`); g.addColorStop(1, 'rgba(221,182,95,0)');
    ctx.fillStyle = g; ctx.fillRect(-r * 2.6, -r * 2.6, r * 5.2, r * 5.2);
  }
  ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fillStyle = C.faint; ctx.fill();
  ctx.save(); ctx.globalAlpha *= wake; ctx.fillStyle = C.goldL; ctx.fill(); ctx.restore();
  ctx.lineWidth = 5; ctx.strokeStyle = wake > .5 ? C.ink : C.ink2; ctx.stroke(); ctx.restore();
}
function link(x1, y1, x2, y2, p, a, lw, col) {
  if (p <= 0 || a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col || C.gold; ctx.lineWidth = lw || 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(lerp(x1, x2, p), lerp(y1, y2, p)); ctx.stroke(); ctx.restore();
}
function spike(x, y, r, s, t) {
  if (s <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(t * 1.6); ctx.scale(s, s); ctx.beginPath();
  for (let i = 0; i < 12; i++) { const rad = i % 2 ? r * .5 : r, an = i * Math.PI / 6; ctx.lineTo(Math.cos(an) * rad, Math.sin(an) * rad); }
  ctx.closePath(); ctx.fillStyle = C.ink; ctx.fill(); ctx.restore();
}

/* ---------- S1: the telegraph and the paperweight (0 – 6.4) ---------- */
const AX = [230, 850], AY = 650;
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'One wire. Two places.', W / 2, 215, { size: fit('One wire. Two places.', 900, 84), start: -.62, stagger: .12, end: 3.7 });
  line(t, 'Worth [almost nothing.]', W / 2, 305, { size: fit('Worth almost nothing.', 900, 84), start: -.4, stagger: .12, end: 3.7 });
  line(t, 'A lone fax is a paperweight.', W / 2, 220, { size: fit('A lone fax is a paperweight.', 900, 76), start: 3.9, stagger: .08, end: 5.95 });
  line(t, 'Until a [second] one sells.', W / 2, 310, { size: fit('Until a second one sells.', 900, 70), start: 4.7, stagger: .1, end: 5.95 });
  const aOut = 1 - eio(prog(t, 3.65, .3));
  if (aOut > 0) {
    ctx.save(); ctx.globalAlpha = aOut;
    link(AX[0], AY, AX[1], AY, eio(prog(t, WIRE[0], WIRE[1] - WIRE[0])), 1, 6, C.ink);
    PULSES.forEach((s, i) => {
      const p = prog(t, s, .55); if (p <= 0 || p >= 1) return;
      const x = lerp(AX[i % 2], AX[1 - i % 2], eio(p));
      ctx.beginPath(); ctx.arc(x, AY, 13, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill();
    });
    AX.forEach((x, i) => node(x, AY, 50, .35, eback(prog(t, .45 + i * .15, .4))));
    label('WASHINGTON', AX[0], AY + 95, eo(prog(t, 1.0, .3)), C.ink2, 24);
    label('BALTIMORE', AX[1], AY + 95, eo(prog(t, 1.15, .3)), C.ink2, 24);
    label('1844', W / 2, AY - 85, eo(prog(t, 1.4, .4)), C.goldText, 30);
    ctx.restore();
  }
  const bOut = 1 - eio(prog(t, 5.95, .35));
  if (t >= 3.9 && bOut > 0) {
    ctx.save(); ctx.globalAlpha = bOut;
    const BX = [380, 700], wk = eo(prog(t, PAIR, .3));
    link(BX[0], AY, BX[1], AY, eio(prog(t, 5.05, .35)), 1, 7, C.gold);
    node(BX[0], AY, 72, wk, eback(prog(t, 3.95, .4)));
    node(BX[1], AY, 72, wk, eback(prog(t, 5.0, .4)));
    label('THE FIRST', BX[0], AY + 140, eo(prog(t, 4.2, .3)), C.ink2, 24);
    label('THE SECOND', BX[1], AY + 140, eo(prog(t, 5.15, .3)), C.ink2, 24);
    ctx.restore();
    ring(t, PAIR, W / 2, AY, 40, 300, C.gold, .7, 10);
    burst(t, PAIR, W / 2, AY, 20, 91, C.goldL, 900, .8);
  }
}

/* ---------- S2: one subscriber is a sculpture, a crowd is a necessity (6.4 – 10.9) ---------- */
const CLN = [];
for (let i = 0; i < 7; i++) CLN.push([740 + 140 * Math.cos(i * 2 * Math.PI / 7 - Math.PI / 2), 690 + 140 * Math.sin(i * 2 * Math.PI / 7 - Math.PI / 2)]);
for (let i = 0; i < 3; i++) CLN.push([740 + 55 * Math.cos(i * 2 * Math.PI / 3 + .5), 690 + 55 * Math.sin(i * 2 * Math.PI / 3 + .5)]);
const CLL = pairs(CLN, 215);
function scene2(t) {
  if (t < 6.4 || t > 11) return;
  const end = 10.45, out = 1 - eio(prog(t, end, .35));
  line(t, 'Value lives in the [connections.]', W / 2, 220, { size: fit('Value lives in the connections.', 900, 76), start: 6.65, end });
  line(t, 'Same device. Different crowd.', W / 2, 305, { size: 50, color: C.ink2, start: 7.2, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  const dp = eio(prog(t, 7.0, .5));
  ctx.strokeStyle = C.faint; ctx.lineWidth = 3; ctx.setLineDash([2, 14]); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(440, 480); ctx.lineTo(440, lerp(480, 860, dp)); ctx.stroke(); ctx.setLineDash([]);
  node(230, 690, 44, .15, eback(prog(t, 7.4, .4)));
  CLL.forEach(([a, b], k) => link(CLN[a][0], CLN[a][1], CLN[b][0], CLN[b][1], eo(prog(t, 8.75 + (k % 9) * .05, .4)), .55, 3.5, C.gold));
  CLN.forEach(([x, y], i) => node(x, y, 20, eo(prog(t, 8.75 + i * .05, .5)), eback(prog(t, CLUSTER_T + i * .07, .35))));
  ctx.restore();
  label('SCULPTURE', 230, 800, out * eo(prog(t, 7.7, .3)), C.ink2, 28);
  label('NECESSITY', 740, 890, out * eo(prog(t, 9.3, .3)), C.goldText, 28);
  ring(t, 9.3, 740, 690, 40, 300, C.gold, .7, 9);
}

/* ---------- S3: every newcomer enriches everyone (10.9 – 16.1) ---------- */
const R3 = Array.from({ length: 6 }, (_, i) => [540 + 185 * Math.cos(i * Math.PI / 3 - Math.PI / 2), 620 + 185 * Math.sin(i * Math.PI / 3 - Math.PI / 2)]);
const R3L = pairs(R3, 400);
function scene3(t) {
  if (t < 10.9 || t > 16.1) return;
  const end = 15.55, out = 1 - eio(prog(t, end, .35));
  line(t, 'Newcomers enrich [everyone.]', W / 2, 220, { size: fit('Newcomers enrich everyone.', 900, 80), start: 11.1, end });
  line(t, 'The hundredth makes ninety-nine richer.', W / 2, 305, { size: fit('The hundredth makes ninety-nine richer.', 900, 48), color: C.ink2, start: 11.6, stagger: .06, end });
  ctx.save(); ctx.globalAlpha = out;
  R3L.forEach(([a, b], k) => link(R3[a][0], R3[a][1], R3[b][0], R3[b][1], eo(prog(t, 12.0 + k * .02, .4)), .4, 3, C.ink2));
  R3.forEach(([x, y], i) => {
    const ts = SPOKES + i * .1 + .3, bump = t > ts ? 1 + .3 * Math.exp(-(t - ts) * 9) : 1;
    link(540, 620, x, y, eio(prog(t, SPOKES + i * .1, .35)), 1, 5.5, C.gold);
    node(x, y, 34, lerp(.15, 1, eo(prog(t, ts, .3))), eback(prog(t, RING_T + i * .1, .35)) * bump);
  });
  const np = eback(prog(t, NEW_T, .4));
  if (np > 0) {
    ctx.save(); ctx.translate(540, 620); ctx.scale(np, np);
    ctx.beginPath(); ctx.arc(0, 0, 38, 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill();
    ctx.strokeStyle = C.cream; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(14, 0); ctx.moveTo(0, -14); ctx.lineTo(0, 14); ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
  label('ONE NEW USER', 540, 890, out * eo(prog(t, NEW_T + .1, .3)), C.goldText, 26);
  ring(t, NEW_T + .25, 540, 620, 40, 330, C.gold, .7, 10);
  burst(t, NEW_T + .25, 540, 620, 14, 140, C.goldL, 700, .7);
}

/* ---------- S4 + S5: the fax machines sleep, a crowd joins, they wake (16 – 27.6) ---------- */
const OLD = [[160, 560], [360, 700], [200, 840], [560, 560], [620, 800], [850, 590], [900, 810]];
const CROWD = [[260, 650], [470, 630], [430, 830], [740, 680], [760, 870], [720, 540], [110, 720]];
const FAX = OLD.concat(CROWD), FAXL = pairs(FAX, 250);
function scene4(t) {
  if (t < 16 || t > 20.8) return;
  const end = 20.25;
  line(t, 'Sold. Nobody to fax.', W / 2, 220, { size: fit('Sold. Nobody to fax.', 900, 82), start: 16.2, end });
}
function scene5(t) {
  if (t < 16.4 || t > 27.7) return;
  const end = 27.1, out = 1 - eio(prog(t, end, .35));
  if (t >= 20.7) {
    line(t, 'Then a crowd joined.', W / 2, 220, { size: fit('Then a crowd joined.', 900, 80), start: 21.0, end });
    line(t, '[Old machines woke up.]', W / 2, 310, { size: fit('Old machines woke up.', 900, 84), start: DROP, stagger: .1, end });
    line(t, 'No update. No new feature.', W / 2, 395, { size: 46, color: C.ink2, start: DROP + .9, stagger: .06, end });
  }
  const wob = 5 * Math.sin(t * 70) * eo(prog(t, 22.6, .9)) * (1 - eo(prog(t, DROP, .15)));
  const pos = i => {
    if (i < OLD.length) return [OLD[i][0] + wob, OLD[i][1]];
    const k = i - OLD.length;
    return [CROWD[k][0], lerp(1010, CROWD[k][1], eo(prog(t, CROWD_T + k * .18, .5)))];
  };
  ctx.save(); ctx.globalAlpha = out;
  FAXL.forEach(([a, b], k) => {
    if (a >= OLD.length && t < CROWD_T) return;
    const pa = pos(a), pb = pos(b);
    link(pa[0], pa[1], pb[0], pb[1], eo(prog(t, DROP + .05 + (k % 10) * .025, .45)), 1, 4.5, C.gold);
  });
  FAX.forEach((_, i) => {
    const p = pos(i), isOld = i < OLD.length, k = i - OLD.length;
    const s = isOld ? eback(prog(t, OLD_T + i * .12, .35)) : eback(prog(t, CROWD_T + k * .18, .3));
    node(p[0], p[1], isOld ? 40 : 26, eo(prog(t, DROP + (isOld ? 0 : .15), .4)), s);
  });
  ctx.restore();
  ring(t, DROP, W / 2, 700, 60, 560, C.gold, .8, 12);
  ring(t, DROP + .12, W / 2, 700, 40, 440, C.goldL, .7, 8);
  burst(t, DROP, W / 2, 700, 30, 313, C.goldL, 1000, .9);
}

/* ---------- S6: more users, less value (27.6 – 33.1) ---------- */
const LX = [300, 540, 780], LY = [520, 690, 860];
const LAT = LY.flatMap(y => LX.map(x => [x, y]));
const LATL = pairs(LAT, 200);
const CELLS = [[420, 605, -80], [660, 605, 1160], [420, 775, -80], [660, 775, 1160]];
function scene6(t) {
  if (t < 27.6 || t > 33.2) return;
  const end = 32.65, out = 1 - eio(prog(t, end, .35));
  line(t, 'More users, [less value.]', W / 2, 220, { size: fit('More users, less value.', 900, 84), start: 27.8, stagger: .12, end });
  line(t, 'When arrivals bring noise.', W / 2, 305, { size: 54, color: C.ink2, start: 29.2, stagger: .07, end });
  const d = NZ.reduce((a, s) => a + eo(prog(t, s + .3, .5)), 0) / 4;
  ctx.save(); ctx.globalAlpha = out;
  LATL.forEach(([a, b], k) => link(LAT[a][0], LAT[a][1], LAT[b][0], LAT[b][1], eo(prog(t, 28.2 + k * .03, .4)), 1 - .85 * d, 5, C.gold));
  LAT.forEach(([x, y], i) => {
    const sh = 3 * d * Math.sin(t * 40 + i * 2);
    node(x + sh, y, 36, (1 - .8 * d) * eo(prog(t, 28.0 + i * .06, .4)), eback(prog(t, 28.0 + i * .06, .35)));
  });
  NZ.forEach((s, i) => {
    const [cx, cy, sx] = CELLS[i], p = eo(prog(t, s, .5)); if (p <= 0) return;
    const x = lerp(sx, cx, p);
    if (p >= 1) [[-120, -85], [120, -85], [-120, 85], [120, 85]].forEach(([dx, dy]) => link(cx, cy, cx + dx, cy + dy, eo(prog(t, s + .5, .25)), .7, 3.5, C.ink));
    spike(x, cy, 36, 1, t);
  });
  ctx.restore();
}

/* ---------- S7: three rules (33.1 – 40.3) ---------- */
function icon(kind) {
  ctx.save(); ctx.strokeStyle = C.cream; ctx.fillStyle = C.cream; ctx.lineWidth = 4; ctx.lineCap = 'round';
  if (kind === 0) {
    [-15, 15].forEach(x => { ctx.beginPath(); ctx.arc(x, 0, 7, 0, Math.PI * 2); ctx.fill(); });
    ctx.beginPath(); ctx.moveTo(-8, 0); ctx.lineTo(8, 0); ctx.stroke();
  } else if (kind === 1) {
    [[0, 0], [-16, -12], [14, -14], [-12, 13], [16, 12]].forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill(); });
  } else {
    [[-14, 12], [0, 22], [14, 32]].forEach(([x, h]) => { rr(x - 5, 16 - h, 10, h, 3); ctx.fill(); });
  }
  ctx.restore();
}
function scene7(t) {
  if (t < 33.1 || t > 40.4) return;
  const qEnd = 39.85;
  label('THREE RULES', W / 2, 290, env(t, 33.3, qEnd, .3), C.goldText, 26);
  ['Build for the [second] user.', 'Seed where people gather.', 'Protect the [signal.]'].forEach((q, i) => {
    const s = QS[i], y = 460 + i * 160;
    const np = eback(prog(t, s, .3)) * (1 - eio(prog(t, qEnd, .3)));
    if (np > 0) {
      ctx.save(); ctx.translate(205, y - 22); ctx.scale(np, np);
      ctx.beginPath(); ctx.arc(0, 0, 40, 0, Math.PI * 2); ctx.fillStyle = i === 2 ? C.ink : C.gold; ctx.fill();
      icon(i); ctx.restore();
    }
    line(t, q, 270, y, { size: fit(q, 730, 58), align: 'left', start: s + .1, stagger: .06, end: qEnd });
  });
}

/* ---------- S8: takeaway (40.3 – 47.1) ---------- */
function scene8(t) {
  if (t < 40.3 || t > 47.1) return;
  const end = 46.7, out = 1 - eio(prog(t, end, .35));
  line(t, 'Not a product used alone.', W / 2, 330, { size: fit('Not a product used alone.', 900, 80), start: 40.45, stagger: .08, end });
  line(t, '[A place people]', W / 2, 450, { size: 92, start: 41.4, stagger: .08, end });
  const r = line(t, '[bring each other.]', W / 2, 560, { size: fit('bring each other.', 900, 92), start: 41.9, stagger: .08, end });
  const u = eio(prog(t, 42.7, .4)) * out;
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 596, r.w * u, 9); }
  ctx.save(); ctx.globalAlpha = out;
  const cx = i => 540 + (i - 2) * 120;
  for (let i = 0; i < 4; i++) link(cx(i), 780, cx(i + 1), 780, eio(prog(t, 44.3 + i * .25, .25)), 1, 5, C.gold);
  for (let i = 0; i < 5; i++) node(cx(i), 780, 26, eo(prog(t, 44.25 + i * .25, .3)), eback(prog(t, 44.2 + i * .25, .3)));
  ctx.restore();
  burst(t, 41.5, W / 2, 545, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S9: end card (47.1 – 53) ---------- */
function scene9(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const T = [[W / 2, 190], [W / 2 - 62, 292], [W / 2 + 62, 292]];
  [[0, 1], [1, 2], [2, 0]].forEach(([a, b], i) => {
    ctx.save(); ctx.globalAlpha = .7; ctx.strokeStyle = C.cream; ctx.lineWidth = 4; ctx.lineCap = 'round';
    const p = eio(prog(t, E + 1.0 + i * .1, .35));
    ctx.beginPath(); ctx.moveTo(T[a][0], T[a][1]); ctx.lineTo(lerp(T[a][0], T[b][0], p), lerp(T[a][1], T[b][1], p)); ctx.stroke(); ctx.restore();
  });
  T.forEach(([x, y], i) => {
    const p = eback(prog(t, E + .95 + i * .08, .4)); if (p <= 0) return;
    ctx.beginPath(); ctx.arc(x, y, 18 * p, 0, Math.PI * 2); ctx.fillStyle = i === 0 ? C.goldL : C.cream; ctx.fill();
  });
  ring(t, E + 1.2, W / 2, 190, 20, 260, C.goldL, .8, 8);
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  line(t, '[Chapter 26: Networks]', W / 2, 535, { size: fit('Chapter 26: Networks', 900, 60), goldColor: C.goldL, start: E + 1.6, stagger: .06 });
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
