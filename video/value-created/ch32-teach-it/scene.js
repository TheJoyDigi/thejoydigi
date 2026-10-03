/* Value, Created Ch 32 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 32, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [13.4, 9.5], [21.4, 15.2], [28, 19.9], [35.2, 25], [41, 29.1], [46.85, 33.2], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const TBL0 = .4, CR = 2.9, TREE = [3.95, 4.35, 4.75];
const TEACH = 7.2, NODES0 = 7.8, PULSE = 9.6;
const A0 = 14.2, BLK = 14.6, HAND = 15.4, DROP = 17.4;
const YES = [22.6, 23.2, 23.8, 24.4], NO = [25.0, 25.7, 26.4];
const RULES = [29.0, 30.3, 31.6];
const BOOK = 35.5, DOTS0 = 36.6;
const T0 = 41.0;
const SWIPES = [6.4, 21.4, 35.2];
const E = 46.85;
const IMPACTS = [[CR, 9], [TREE[0] + .1, 3], [TREE[2] + .1, 5], [TEACH + .1, 4], [PULSE + .5, 8], [BLK + .1, 3], [DROP, 16], [DROP + .45, 5],
  ...YES.map(s => [s + .15, 3]), [NO[2] + .1, 7], ...RULES.map((s, i) => [s + .15, 3 + i]), [BOOK + .2, 5], [DOTS0 + .5, 6], [T0 + 1.4, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 21.4], [21.4, 35.2], [35.2, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
[.8, 1.2, 1.6, 2.0].forEach(x => cue(x, 'scratch'));
[CR - .35, CR - .2, CR - .08].forEach((x, i) => cue(x, 'knock', { v: .5 + i * .2 }));
cue(CR, 'impact', { v: .9 }); cue(CR, 'drain', { d: 1.0 }); cue(3.9, 'pop', { f: 1.2 });
TREE.forEach((s, i) => { cue(s, 'whoosh', { v: .25 }); cue(s + .1, 'blip', { n: [60, 64, 67][i] }); });
cue(TREE[2] + .1, 'chime', { n: 76 });
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(TEACH, 'whoosh', { v: .3 }); cue(TEACH + .2, 'thud'); cue(TEACH + .22, 'blip', { n: 60 });
for (let i = 0; i < 5; i++) { cue(NODES0 + i * .15, 'tick', { f: 2 }); cue(NODES0 + i * .15 + .02, 'blip', { n: [55, 59, 62, 64, 67][i] }); }
cue(8.7, 'swish'); cue(PULSE - .3, 'riser', { d: .3 }); cue(PULSE, 'whoosh', { v: .5 });
for (let i = 0; i < 5; i++) cue(PULSE + .5 + i * .06, 'blip', { n: [67, 71, 74, 76, 79][i] });
cue(PULSE + .5, 'impact', { v: .8 }); cue(PULSE + .5, 'chime', { n: 76 });
cue(13.65, 'pop', { f: 1.2 });
cue(A0, 'pop', { f: 1 }); cue(BLK, 'whoosh', { v: .3 }); cue(BLK + .15, 'blip', { n: 64 }); cue(BLK + .2, 'thud');
cue(HAND, 'swish'); cue(16.0, 'riser', { d: DROP - 16.0 });
for (let x = 16.2, k = 0; x < DROP - .05; x += .16 - k * .006, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 });
[0, 1, 2, 3].forEach(i => cue(DROP + .2 + i * .1, 'blip', { n: [67, 71, 74, 79][i] }));
cue(21.1, 'swish'); cue(21.7, 'pop', { f: 1.2 });
YES.forEach((s, i) => { cue(s, 'whoosh', { v: .2 }); cue(s + .15, 'blip', { n: [60, 64, 67, 72][i] }); cue(s + .15, 'thud'); });
cue(YES[3] + .2, 'chime', { n: 79 });
cue(NO[0], 'whoosh', { v: .2 }); cue(NO[0] + .15, 'blip', { n: 57 }); cue(NO[1], 'swish'); cue(NO[1] + .2, 'blip', { n: 52 });
cue(NO[2] - .1, 'riser', { d: .15 }); cue(NO[2] + .1, 'impact', { v: .8 }); cue(NO[2] + .1, 'scratch');
cue(27.9, 'swish');
cue(28.3, 'pop', { f: 1.2 });
RULES.forEach((s, i) => { cue(s, 'whoosh', { v: .25 }); cue(s + .15, 'pop', { f: 1 }); cue(s + .2, 'blip', { n: [64, 67, 72][i] }); });
cue(RULES[2] + .2, 'chime', { n: 79 });
cue(35.5, 'pop', { f: 1.2 }); cue(BOOK + .1, 'thud'); cue(DOTS0 - .2, 'riser', { d: .2 });
for (let i = 0; i < 12; i++) cue(DOTS0 + i * .1, 'tick', { f: i % 2 ? 2 : 1 });
cue(DOTS0 + .5, 'impact', { v: .8 }); cue(DOTS0 + .5, 'chime', { n: 76 });
cue(T0 - .05, 'whoosh', { v: .35 }); cue(T0 + .1, 'thud'); cue(T0 + 1.4, 'impact', { v: .9 }); cue(T0 + 1.4, 'chime', { n: 76 });
cue(T0 + 2.5, 'swish'); cue(T0 + 3.1, 'pop', { f: .9 });
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: 6.4, breakdown: 16.0, drop: DROP, end: 46.75 };

function person(x, y, s, fill) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 4 / s; ctx.strokeStyle = C.ink; ctx.fillStyle = fill;
  ctx.beginPath(); ctx.arc(0, -18, 15, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 30, 31, Math.PI, 2 * Math.PI); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();
}
function star(x, y, r, col) {
  ctx.save(); ctx.translate(x, y); ctx.beginPath();
  for (let i = 0; i < 10; i++) { const rad = i % 2 ? r * .42 : r, an = i * Math.PI / 5 - Math.PI / 2; ctx.lineTo(Math.cos(an) * rad, Math.sin(an) * rad); }
  ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.restore();
}
/* the idea: a gold block with a star, centred on (x, y) */
function idea(x, y, s, a) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const g = ctx.createLinearGradient(0, -50, 0, 50); g.addColorStop(0, C.goldL); g.addColorStop(1, C.gold);
  rr(-50, -50, 100, 100, 18); ctx.fillStyle = g; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke(); star(0, 2, 28, C.cream); ctx.restore();
}

/* ---------- S1: furniture crumbles, hands live on (0 – 6.4) ---------- */
const TSEG = [[-190, 0, 190, 0, 24], [-160, 12, -160, 150, 16], [160, 12, 160, 150, 16], [-160, 96, 160, 96, 9]], TOP = 610;
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'Forty years', W / 2, 215, { size: 84, start: -.62, stagger: .12, end: 3.7 });
  line(t, 'of [furniture.]', W / 2, 305, { size: 84, start: -.4, stagger: .12, end: 3.7 });
  line(t, 'Trained hands build', W / 2, 215, { size: 80, start: 3.9, stagger: .1, end: 5.95 });
  line(t, 'for a [century.]', W / 2, 305, { size: 84, start: 4.2, stagger: .12, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35));
  if (t < CR + 1.1) {
    ctx.save(); ctx.translate(540, TOP); ctx.lineCap = 'round'; ctx.strokeStyle = C.ink;
    const dt = Math.max(0, t - CR), fa = 1 - eo(prog(t, CR + .5, .6));
    TSEG.forEach(([x0, y0, x1, y1, w], si) => {
      const dp = eio(clamp((t - TBL0) / 1.6 * TSEG.length - si)); if (dp <= 0) return;
      ctx.lineWidth = w;
      for (let k = 0; k < 4; k++) {
        const a = k / 4, b = (k + 1) / 4, q = clamp(dp * 4 - k); if (q <= 0) continue;
        const px0 = lerp(x0, x1, a), py0 = lerp(y0, y1, a), px1 = lerp(x0, x1, lerp(a, b, q)), py1 = lerp(y0, y1, lerp(a, b, q));
        const id = si * 4 + k, vx = (rnd(id + 3) - .5) * 260, vy = -80 - rnd(id + 9) * 120;
        ctx.save(); ctx.globalAlpha = fa;
        if (dt > 0) { ctx.translate(vx * dt, vy * dt + 700 * dt * dt); ctx.rotate((rnd(id + 21) - .5) * 5 * dt); }
        else ctx.translate(2 * Math.sin(t * 60 + id) * eo(prog(t, CR - .4, .4)), 0);
        ctx.beginPath(); ctx.moveTo(px0, py0); ctx.lineTo(px1, py1); ctx.stroke(); ctx.restore();
      }
    });
    ctx.restore();
    ctx.fillStyle = C.faint; ctx.fillRect(540 - 260, TOP + 168, 520, 4);
  }
  burst(t, CR, 540, TOP + 80, 26, 91, C.ink2, 700, .9);
  ctx.save(); ctx.globalAlpha = out;
  const lv = [[[540, 560]], [[400, 700], [680, 700]], [[300, 840], [500, 840], [620, 840], [780, 840]]];
  const parent = (l, i) => lv[l - 1][l === 1 ? 0 : (i / 2) | 0];
  lv.forEach((pts, l) => pts.forEach(([x, y], i) => {
    const p = eback(prog(t, TREE[l] + i * .08, .35)); if (p <= 0) return;
    if (l > 0) { const [px, py] = parent(l, i); ctx.strokeStyle = C.faint; ctx.lineWidth = 4; ctx.setLineDash([2, 10]); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(px, py + 30); ctx.lineTo(lerp(px, x, eo(p)), lerp(py + 30, y - 40, eo(p))); ctx.stroke(); ctx.setLineDash([]); }
    person(x, y, p * [1.4, 1.15, .95][l], l === 0 ? C.gold : C.goldL);
  }));
  ring(t, TREE[2] + .1, 540, 700, 40, 420, C.gold, .7, 10);
  ctx.restore();
}

/* ---------- S2: the final leverage (6.4 – 13.4) ---------- */
const NX = [145, 342, 540, 738, 935], NAMES = ['LEVERAGE', 'NETWORKS', 'COMPOUNDING', 'REPUTATION', 'GIVING'];
function scene2(t) {
  if (t < 6.4 || t > 13.5) return;
  const end = 12.85, out = 1 - eio(prog(t, end, .35));
  line(t, 'Teaching is the', W / 2, 220, { size: 76, start: 6.7, stagger: .1, end });
  line(t, '[final leverage.]', W / 2, 310, { size: 84, start: 7.1, stagger: .1, end });
  ctx.save(); ctx.globalAlpha = out;
  const tp = eback(prog(t, TEACH, .45));
  [0, 1, 2, 3, 4].forEach(i => {
    const lp = eio(prog(t, 8.5 + i * .06, .5)); if (lp > 0) {
      ctx.strokeStyle = C.faint; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.setLineDash([2, 12]);
      ctx.beginPath(); ctx.moveTo(540, 596); ctx.lineTo(lerp(540, NX[i], lp), lerp(596, 746, lp)); ctx.stroke(); ctx.setLineDash([]);
    }
    const pq = prog(t, PULSE, .5);
    if (pq > 0 && pq < 1) { const e = eio(pq); ctx.beginPath(); ctx.arc(lerp(540, NX[i], e), lerp(596, 746, e), 11, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.ink; ctx.stroke(); }
    const np = eback(prog(t, NODES0 + i * .15, .4)), hit = eback(prog(t, PULSE + .5 + i * .06, .4));
    if (np > 0) {
      ctx.save(); ctx.translate(NX[i], 790); ctx.scale(np * (1 + .45 * hit), np * (1 + .45 * hit));
      ctx.beginPath(); ctx.arc(0, 0, 44, 0, Math.PI * 2); ctx.fillStyle = hit > .5 ? C.goldL : '#FFFBF3'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
    }
    const la = out * eo(prog(t, NODES0 + i * .15 + .2, .3));
    if (la > 0) { ctx.save(); ctx.globalAlpha = la; ctx.font = font('sans', 24, 700); ctx.letterSpacing = '1px'; ctx.textAlign = 'center'; ctx.fillStyle = hit > .5 ? C.goldText : C.ink2; ctx.fillText(NAMES[i], NX[i] + 1, 892); ctx.restore(); }
  });
  if (tp > 0) {
    ctx.save(); ctx.translate(540, 520); ctx.scale(tp, tp);
    ctx.beginPath(); ctx.arc(0, 0, 78, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.font = font('serif', 36); ctx.textAlign = 'center'; ctx.fillStyle = C.cream; ctx.fillText('TEACH', 0, 13); ctx.restore();
  }
  ctx.restore();
  ring(t, PULSE + .5, 540, 790, 50, 520, C.gold, .8, 10);
  NX.forEach((x, i) => burst(t, PULSE + .5 + i * .06, x, 790, 8, 60 + i * 11, C.goldL, 400, .6));
}

/* ---------- S3: give it away and keep it (13.4 – 21.4) ---------- */
const AX = 300, BX = 780, PY = 720;
function scene3(t) {
  if (t < 13.4 || t > 21.5) return;
  const end = 20.85, out = 1 - eio(prog(t, end, .35));
  line(t, 'Teach a friend.', W / 2, 220, { size: 84, start: 13.65, stagger: .1, end });
  line(t, '[You still know it.]', W / 2, 310, { size: fit('You still know it.', 900, 78, 'serif'), start: DROP, stagger: .1, end });
  ctx.save(); ctx.globalAlpha = out;
  const gl = eo(prog(t, DROP, .6));
  if (gl > 0) [AX, BX].forEach(x => { const g = ctx.createRadialGradient(x, 600, 20, x, 600, 300); g.addColorStop(0, `rgba(221,182,95,${.5 * gl})`); g.addColorStop(1, 'rgba(221,182,95,0)'); ctx.fillStyle = g; ctx.fillRect(x - 300, 300, 600, 600); });
  const ap = eback(prog(t, A0, .45)), bp = eback(prog(t, A0 + .15, .45));
  if (ap > 0) person(AX, PY, 2.1 * ap, C.goldL);
  if (bp > 0) person(BX, PY, 2.1 * bp, t >= DROP ? C.goldL : '#FFFBF3');
  const hp = eio(prog(t, HAND, .6));
  if (hp > 0) {
    ctx.strokeStyle = C.faint; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.setLineDash([2, 14]);
    ctx.beginPath(); ctx.moveTo(AX + 90, 520); ctx.lineTo(lerp(AX + 90, BX - 90, hp), 520); ctx.stroke(); ctx.setLineDash([]);
  }
  const bob = 6 * Math.sin(t * 4), mast = t >= DROP ? 1 + .28 * eback(prog(t, DROP, .5)) : 1;
  idea(AX, 520 + bob, eback(prog(t, BLK, .4)) * mast, 1);
  const tr = prog(t, HAND, DROP - HAND);
  if (tr > 0 && tr < 1) idea(lerp(AX + 90, BX - 90, eio(tr)), 520 - 40 * Math.sin(Math.PI * tr), .55, .45);
  idea(BX, 520 + bob, eback(prog(t, DROP + .05, .5)), 1);
  ctx.restore();
  label('MASTERY', AX, 880, out * eo(prog(t, DROP + .5, .3)), C.goldText, 26);
  label('KNOWLEDGE', BX, 880, out * eo(prog(t, DROP + .6, .3)), C.goldText, 26);
  ring(t, DROP, BX, 520, 50, 560, C.gold, .8, 12);
  ring(t, DROP + .12, AX, 520, 40, 420, C.goldL, .7, 8);
  burst(t, DROP, BX, 520, 28, 313, C.goldL, 1000, .9);
  burst(t, DROP + .1, AX, 520, 18, 377, C.gold, 800, .8);
}

/* ---------- S4: the test (21.4 – 28) ---------- */
function scene4(t) {
  if (t < 21.4 || t > 28.1) return;
  const end = 27.45, out = 1 - eio(prog(t, end, .35)), PXs = [210, 410, 610, 810];
  line(t, 'Can your student', W / 2, 215, { size: 76, start: 21.7, stagger: .1, end });
  line(t, '[teach someone else?]', W / 2, 305, { size: fit('teach someone else?', 900, 80, 'serif'), start: 22.1, stagger: .1, end });
  ctx.save(); ctx.globalAlpha = out;
  label('YES · MULTIPLIED', 72, 410, eo(prog(t, YES[0] - .2, .3)), C.goldText, 24, 'left');
  YES.forEach((s, i) => {
    const p = eback(prog(t, s, .35)); if (p <= 0) return;
    if (i > 0) { const ap = eio(prog(t, s - .25, .25)); ctx.strokeStyle = C.gold; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(PXs[i - 1] + 60, 560); ctx.lineTo(lerp(PXs[i - 1] + 60, PXs[i] - 64, ap), 560); ctx.stroke(); }
    person(PXs[i], 570, p * 1.5, i === 0 ? C.gold : C.goldL);
    const bp = eback(prog(t, s + .12, .3)); if (bp > 0) idea(PXs[i], 465 - 12 * (1 - bp), .6 * bp, 1);
  });
  label('NO · PERFORMED', 72, 680, eo(prog(t, NO[0] - .2, .3)), C.ink2, 24, 'left');
  const t0 = eback(prog(t, NO[0] - .15, .35)), t1 = eback(prog(t, NO[0] + .1, .35));
  if (t0 > 0) person(PXs[0], 800, t0 * 1.5, C.gold);
  if (t1 > 0) person(PXs[1], 800, t1 * 1.5, C.faint);
  const a1 = eio(prog(t, NO[0] + .2, .3));
  if (a1 > 0) { ctx.strokeStyle = C.ink2; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(PXs[0] + 60, 790); ctx.lineTo(lerp(PXs[0] + 60, PXs[1] - 64, a1), 790); ctx.stroke(); }
  const a2 = eio(prog(t, NO[1], .5));
  if (a2 > 0) {
    ctx.strokeStyle = C.ink2; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath();
    for (let k = 0; k <= 24 * a2; k++) { const q = k / 24, x = (1 - q) * (1 - q) * 380 + 2 * q * (1 - q) * 310 + q * q * 240, y = (1 - q) * (1 - q) * 860 + 2 * q * (1 - q) * 960 + q * q * 860; k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.stroke();
    if (a2 > .95) { ctx.fillStyle = C.ink2; ctx.beginPath(); ctx.moveTo(236, 846); ctx.lineTo(214, 876); ctx.lineTo(258, 880); ctx.closePath(); ctx.fill(); }
  }
  const xp = eback(prog(t, NO[2], .3));
  if (xp > 0) {
    ctx.save(); ctx.translate(PXs[3], 800); ctx.scale(xp, xp); ctx.setLineDash([3, 12]); ctx.lineWidth = 5; ctx.strokeStyle = C.faint; ctx.beginPath(); ctx.arc(0, 0, 58, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    ctx.lineWidth = 12; ctx.strokeStyle = C.ink; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-26, -26); ctx.lineTo(26, 26); ctx.moveTo(26, -26); ctx.lineTo(-26, 26); ctx.stroke(); ctx.restore();
  }
  ctx.restore();
  ring(t, YES[3] + .2, PXs[3], 570, 40, 300, C.gold, .7, 9);
  ring(t, NO[2] + .1, PXs[3], 800, 30, 240, C.ink2, .6, 8);
}

/* ---------- S5: three rules (28 – 35.2) ---------- */
function ruleIcon(kind) {
  ctx.save(); ctx.strokeStyle = C.cream; ctx.fillStyle = C.cream; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (kind === 0) { ctx.font = font('serif', 46); ctx.textAlign = 'center'; ctx.fillText('?', 0, 16); }
  else if (kind === 1) { ctx.beginPath(); ctx.ellipse(0, 0, 22, 13, 0, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, 6, 0, Math.PI * 2); ctx.fill(); }
  else { rr(-22, -4, 30, 24, 4); ctx.stroke(); ctx.beginPath(); ctx.moveTo(2, -4); ctx.lineTo(22, -22); ctx.moveTo(10, -22); ctx.lineTo(22, -22); ctx.lineTo(22, -10); ctx.stroke(); }
  ctx.restore();
}
function scene5(t) {
  if (t < 28 || t > 35.3) return;
  const end = 34.65;
  line(t, 'Three [rules.]', W / 2, 250, { size: 88, start: 28.3, stagger: .12, end });
  ['[Why] before how', 'Make them [do] it', 'Give away the [whole] thing'].forEach((q, i) => {
    const s = RULES[i], y = 470 + i * 150, np = eback(prog(t, s, .3)) * (1 - eio(prog(t, end, .3)));
    if (np > 0) {
      ctx.save(); ctx.translate(205, y - 22); ctx.scale(np, np);
      ctx.beginPath(); ctx.arc(0, 0, 42, 0, Math.PI * 2); ctx.fillStyle = i === 2 ? C.ink : C.gold; ctx.fill(); ruleIcon(i); ctx.restore();
    }
    line(t, q, 270, y, { size: 56, align: 'left', start: s + .1, stagger: .07, end });
    ring(t, s + .15, 205, y - 22, 30, 150, C.gold, .6, 8);
  });
}

/* ---------- S6: a book is a teaching machine (35.2 – 41) ---------- */
function scene6(t) {
  if (t < 35.2 || t > 41.1) return;
  const end = 40.55, out = 1 - eio(prog(t, end, .35));
  line(t, 'A book is a', W / 2, 220, { size: 80, start: 35.45, stagger: .1, end });
  line(t, '[teaching machine.]', W / 2, 310, { size: fit('teaching machine.', 900, 84, 'serif'), start: 35.85, stagger: .1, end });
  ctx.save(); ctx.globalAlpha = out;
  const bp = eback(prog(t, BOOK, .45));
  if (bp > 0) {
    ctx.save(); ctx.translate(190, 640); ctx.scale(bp, bp); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round';
    [-1, 1].forEach(d => { ctx.beginPath(); ctx.moveTo(0, -70); ctx.lineTo(d * 90, -58); ctx.lineTo(d * 90, 78); ctx.lineTo(0, 90); ctx.closePath(); ctx.fillStyle = d < 0 ? '#FFFBF3' : C.goldL; ctx.fill(); ctx.stroke(); });
    ctx.strokeStyle = C.faint; ctx.lineWidth = 4; [-30, -8, 14, 36].forEach(yy => { ctx.beginPath(); ctx.moveTo(-72, yy); ctx.lineTo(-16, yy + 4); ctx.stroke(); });
    ctx.restore();
  }
  for (let r = 0; r < 8; r++) for (let c = 0; c < 12; c++) {
    const x = 335 + c * 59, y = 460 + r * 52, d = Math.hypot(x - 190, y - 640);
    const a = eo(prog(t, BOOK + .3, .4)), lp = eback(prog(t, DOTS0 + d * .0016, .3));
    ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fillStyle = `rgba(94,86,75,${.35 * a})`; ctx.fill();
    if (lp > 0) { ctx.beginPath(); ctx.arc(x, y, 14 * lp, 0, Math.PI * 2); ctx.fillStyle = (r + c) % 4 === 0 ? C.gold : C.goldL; ctx.fill(); }
  }
  ctx.restore();
  ring(t, DOTS0, 190, 640, 60, 900, C.gold, .9, 12);
}

/* ---------- S7: takeaway (41 – 46.85) ---------- */
function scene7(t) {
  if (t < 40.9 || t > 47) return;
  const end = 46.5;
  line(t, 'Teach one idea.', W / 2, 420, { size: 100, start: T0 + .1, stagger: .1, end });
  const r = line(t, '[To one person.]', W / 2, 550, { size: 100, start: T0 + 1.4, stagger: .1, end });
  const u = eio(prog(t, T0 + 2.4, .4)) * (1 - eio(prog(t, end, .35)));
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 586, r.w * u, 9); }
  line(t, 'This week.', W / 2, 740, { size: 56, color: C.ink2, start: T0 + 3.1, stagger: .09, end });
  burst(t, T0 + 1.5, W / 2, 520, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S8: end card (46.85 – 53) ---------- */
function scene8(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  [[0, 0, 15], [-34, 38, 11], [34, 38, 11], [-52, 76, 8], [-16, 76, 8], [16, 76, 8], [52, 76, 8]].forEach(([dx, dy, r], i) => {
    const p = eback(prog(t, E + .95 + (i < 1 ? 0 : i < 3 ? .12 : .24), .4)); if (p <= 0) return;
    if (i > 0) { const par = i < 3 ? [0, 0] : i < 5 ? [-34, 38] : [34, 38]; ctx.strokeStyle = C.cream; ctx.globalAlpha = .5; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(W / 2 + par[0], 215 + par[1]); ctx.lineTo(W / 2 + dx, 215 + dy); ctx.stroke(); ctx.globalAlpha = 1; }
    ctx.beginPath(); ctx.arc(W / 2 + dx, 215 + dy, r * p, 0, Math.PI * 2); ctx.fillStyle = i === 0 ? C.goldL : C.cream; ctx.globalAlpha = i === 0 ? 1 : .7; ctx.fill(); ctx.globalAlpha = 1;
  });
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  line(t, '[Chapter 32: Teach It]', W / 2, 535, { size: 66, goldColor: C.goldL, start: E + 1.6, stagger: .08 });
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, 590, 140 * lp, 4);
  line(t, 'Full 6-minute episode — link in comments', W / 2, 680, { font: 'sans', size: 38, color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 22, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene1, scene2, scene3, scene4, scene5, scene6, scene7];
const END_CARD = scene8;
