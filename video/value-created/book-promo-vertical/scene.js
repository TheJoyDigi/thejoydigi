/* Value, Created book promo, vertical 9:16: same story and timing as ../book-promo, laid out for the tall frame inside the platform safe zone (design time; WARP maps real time onto it). */
const CHAPTER = 0, KICKER = 'FREE AUDIOBOOK', KICKER_END = -1, BAR_END = 56.5;
const WARP = [[0, 0], [5, 3], [24.7, 14.82], [34.7, 20.82], [40.15, 24.09], [45.98, 27.59]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const OPEN = 3.0;
const SWIPES = [5, 24.7, 34.7];
const STEPS = [5.3, 9.0, 12.7, 16.4, 20.1], NOTES = [60, 64, 67, 71, 76], LAND = .6;
const ROWS = [25.1, 26.4, 27.9], RULE = 29.5, DROP = 31.0;
const TILE0 = 35.2, TILE_DT = .06, TILE_END = TILE0 + 31 * TILE_DT + .3;
const CREATED = TILE_END + .1;
const E = 39.9;
const IMPACTS = [[OPEN, 12], ...STEPS.map((s, i) => [s + LAND, i === 4 ? 11 : 3 + i]), ...ROWS.map(r => [r + .25, 4]), [DROP, 16], [DROP + .45, 5],
  [TILE_END, 9], [E + 1.2, 7]];
const KB = [[0, SWIPES[0]], [SWIPES[0], SWIPES[1]], [SWIPES[1], SWIPES[2]], [SWIPES[2], E]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
[1.5, 1.8, 2.1, 2.4].forEach((x, i) => cue(x, 'knock', { v: .5 + i * .17 }));
cue(OPEN - .5, 'riser', { d: .5 }); cue(OPEN, 'impact', { v: .9 }); cue(OPEN, 'chime', { n: 76 }); cue(OPEN + .1, 'pop', { f: 1.2 });
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
STEPS.forEach((s, i) => {
  cue(s + .1, 'whoosh', { v: .3 }); cue(s + .3, 'pop', { f: 1.2 }); cue(s + .3, 'thud');
  cue(s + LAND, 'blip', { n: NOTES[i] }); cue(s + LAND, 'tick', { f: 1 }); cue(s + .9, 'pop', { f: .9 });
});
cue(STEPS[4] + LAND, 'chime', { n: 79 }); cue(STEPS[4] + LAND, 'impact', { v: .8 });
ROWS.forEach((s, i) => { cue(s, 'whoosh', { v: .3 }); cue(s + .1, 'pop', { f: 1 }); cue(s + .25, 'thud'); cue(s + .3, 'blip', { n: [60, 64, 67][i] }); });
cue(RULE, 'swish'); cue(RULE - .2, 'riser', { d: DROP - RULE + .2 });
for (let x = DROP - 1.0, k = 0; x < DROP - .05; x += .13 - k * .008, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 }); cue(DROP + .45, 'thud');
cue(SWIPES[2] + .3, 'pop', { f: 1.2 });
for (let i = 0; i < 32; i += 4) cue(TILE0 + i * TILE_DT, 'tick', { f: (i / 4) % 2 });
for (let i = 0; i < 32; i += 8) cue(TILE0 + i * TILE_DT + .05, 'blip', { n: 55 + i * .4 | 0 });
cue(TILE_END, 'chime', { n: 79 }); cue(TILE_END, 'impact', { v: .8 }); cue(TILE_END + .1, 'pop', { f: 1.2 });
[.5, 1.0, 1.5].forEach(x => cue(CREATED + x, 'tick', { f: 2 }));
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: SWIPES[0], breakdown: RULE - .3, drop: DROP, end: E - .1 };

/* safe box: x 135 to 935 above y 840, x 135 to 765 below it (platform UI covers the rest, see _engine/README.md) */
const LX = 135, TW = 800, LOW_W = 630, CXL = LX + LOW_W / 2;
const sizeFor = (rows, maxW, size) => Math.min(...rows.map(q => fit(q, maxW, size)));

function kicker2(t) {
  const a = env(t, -.2, E - .2, .6, .3); if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.font = font('sans', 26, 700); ctx.letterSpacing = '5px';
  ctx.fillStyle = C.goldText; ctx.fillText('VALUE, CREATED', LX, 330);
  const w = ctx.measureText('VALUE, CREATED').width;
  ctx.fillStyle = C.gold; ctx.fillRect(LX + w + 6, 319, 9, 3);
  ctx.fillStyle = C.ink2; ctx.fillText('FREE AUDIOBOOK', LX + w + 26, 330);
  ctx.restore();
}

/* four-point spark: concave sides, anchored at its centre */
function spark(x, y, R, a) {
  ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= a == null ? 1 : a; ctx.beginPath();
  for (let k = 0; k < 4; k++) {
    const t0 = k * Math.PI / 2, t1 = (k + 1) * Math.PI / 2, m = (t0 + t1) / 2;
    if (k === 0) ctx.moveTo(R * Math.cos(t0), R * Math.sin(t0));
    ctx.quadraticCurveTo(.12 * R * Math.cos(m), .12 * R * Math.sin(m), R * Math.cos(t1), R * Math.sin(t1));
  }
  ctx.closePath(); const g = ctx.createRadialGradient(0, 0, 2, 0, 0, R); g.addColorStop(0, '#FFF1C9'); g.addColorStop(1, C.goldL);
  ctx.fillStyle = g; ctx.fill(); ctx.lineWidth = Math.max(3, R * .07); ctx.lineJoin = 'round'; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
}
/* small ink person, anchored at the feet */
function person(x, y, s, sy) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s * (sy || 1)); ctx.lineWidth = 7 / s; ctx.strokeStyle = C.ink; ctx.fillStyle = C.ink; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-36, 0); ctx.bezierCurveTo(-36, -40, -20, -54, 0, -54); ctx.bezierCurveTo(20, -54, 36, -40, 36, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, -86, 27, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();
}

/* ---------- S1: the question and the sealed box (0 – 8) ---------- */
function box(t) {
  const p = eback(prog(t, -.3, .5)); if (p <= 0) return;
  const S = 1.2, cx = CXL, base = 1300, bw = 300, bh = 170, od = t - OPEN, open = eback(prog(t, OPEN, .5)), mid = base - bh;
  ctx.save(); ctx.translate(cx, base); ctx.scale(p * S, p * S); ctx.translate(-cx, -base);
  const amp = od < 0 ? 8 * eo(prog(t, 1.2, 1.5)) : 0;
  if (od >= 0) {
    const ga = eo(prog(t, OPEN, .4)), g = ctx.createRadialGradient(cx, mid, 20, cx, mid, 340);
    g.addColorStop(0, `rgba(221,182,95,${.7 * ga})`); g.addColorStop(1, 'rgba(221,182,95,0)');
    ctx.fillStyle = g; ctx.fillRect(cx - 340, mid - 340, 680, 340);
    ctx.save(); ctx.strokeStyle = C.goldL; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.globalAlpha = .75 * ga;
    for (let i = 0; i < 9; i++) {
      const a = -Math.PI * (.12 + .76 * i / 8) + Math.sin(od * .8) * .05, r0 = 150, r1 = 150 + 40 * eo(prog(od, .1, .5)) + 12 * Math.sin(od * 4 + i);
      ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r0, mid - 30 + Math.sin(a) * r0); ctx.lineTo(cx + Math.cos(a) * r1, mid - 30 + Math.sin(a) * r1); ctx.stroke();
    }
    ctx.restore();
    const orp = eback(prog(od, .1, .5)), oy = mid - 30 - 150 * eo(prog(od, .1, .9)) + 7 * Math.sin(od * 3), tw = 1 + .07 * Math.sin(od * 6);
    spark(cx, oy, 66 * Math.max(0, orp) * tw);
    spark(cx + 84, oy - 52, 20 * Math.max(0, eback(prog(od, .5, .4))) * (1 + .2 * Math.sin(od * 8)));
    spark(cx - 92, oy + 18, 14 * Math.max(0, eback(prog(od, .65, .4))) * (1 + .2 * Math.sin(od * 8 + 2)));
  }
  ctx.save(); ctx.translate(Math.sin(t * 45) * amp * .35, 0);
  rr(cx - bw / 2, mid, bw, bh, 16); ctx.fillStyle = '#EDE4D2'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
  const qa = od < 0 ? eo(prog(t, .3, .3)) : 1 - eo(prog(od, 0, .15));
  if (qa > 0) { ctx.globalAlpha = qa; ctx.font = font('serif', 130); ctx.textAlign = 'center'; ctx.fillStyle = C.ink2; ctx.fillText('?', cx, base - 40); ctx.textAlign = 'left'; }
  ctx.restore();
  ctx.save(); ctx.translate(cx - bw / 2 - 12 + 60 * eo(prog(od, 0, .45)), mid - Math.abs(Math.sin(t * 30)) * amp * .8 - 20 * eo(prog(od, 0, .45)));
  ctx.rotate(od < 0 ? Math.sin(t * 45) * amp * .004 : -open * .3);
  rr(0, -42, bw + 24, 42, 10); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.restore();
  ctx.restore();
  ring(t, OPEN, cx, mid - 20, 40, 300, C.gold, .7, 10);
  burst(t, OPEN, cx, mid - 40, 26, 41, C.goldL, 800, .9);
}
function scene1(t) {
  if (t >= SWIPES[0]) return;
  const s1 = sizeFor(['Everyone wants', 'money.'], TW, 112), s2 = sizeFor(['What’s it made of?'], TW, 70);
  line(t, 'Everyone wants', LX, 470, { size: s1, align: 'left', start: -.8, stagger: .12, end: OPEN - .3 });
  line(t, '[money.]', LX, 470 + s1 * 1.05, { size: s1, align: 'left', start: -.6, stagger: .12, end: OPEN - .3 });
  line(t, 'What’s it made of?', LX, 720, { size: s2, align: 'left', color: C.ink2, start: -.8, stagger: .07, end: OPEN - .3 });
  line(t, '[Value.]', LX, 540, { size: sizeFor(['Value.'], TW, 200), align: 'left', start: OPEN + .05 });
  box(t);
}

/* ---------- S2: the five-step staircase, built across five beats (8 – 34) ---------- */
const SW = 126, SX = i => LX + i * SW, CX = i => SX(i) + SW / 2, STOP = i => 1230 - 95 * i, GND = 1480;
const TCOLS = [3, 3, 3, 3, 2];
const RANGES = ['1–5', '6–14', '15–20', '21–27', '28–32'], PARTS = [5, 9, 6, 7, 5];
const STEP_TEXT = [
  ['[See] it.', 'Value is in people.'],
  ['[Create] it.', 'Don’t invent. Notice.'],
  ['[Capture] it.', 'Capture is [scarce.]'],
  ['[Scale] it.', 'More with less.'],
  ['[Master] it.', 'Teaching is the', 'final leverage.']
];
function scene2(t) {
  if (t < SWIPES[0] || t >= SWIPES[1]) return;
  const hs = sizeFor(STEP_TEXT.map(r => r[0]), TW, 124), ss = sizeFor(STEP_TEXT.flatMap(r => r.slice(1)), TW, 72);
  STEP_TEXT.forEach(([h, ...subs], i) => {
    const s = STEPS[i], end = i === 4 ? 99 : STEPS[i + 1] - .55;
    line(t, h, LX, 480, { size: hs, align: 'left', start: s + .3, stagger: .1, end });
    subs.forEach((q, k) => line(t, q, LX, 580 + k * 82, { size: ss, align: 'left', color: C.ink2, start: s + .9 + k * .4, stagger: .06, end }));
  });
}

/* the climber lands on each step as it rises, then bounces on the top step at the takeaway */
function marker(t, back) {
  let k = -1; STEPS.forEach((s, i) => { if (t >= s + .1) k = i; });
  if (k < 0) return;
  const x1 = k === 4 && back ? SX(4) + SW - 30 : CX(k), y1 = STOP(k), p = prog(t, STEPS[k] + .1, .6);
  let x = x1, y = y1, sc = 1, sy = 1;
  if (k === 0) sc = eback(p);
  else { const e = eio(p), x0 = CX(k - 1), y0 = STOP(k - 1); x = lerp(x0, x1, e); y = lerp(y0, y1, e) - 4 * p * (1 - p) * 110; }
  if (p >= 1) sy = 1 - .16 * Math.exp(-(t - STEPS[k] - .7) * 12);
  const dt = t - CREATED; if (k === 4 && dt > 0 && dt < 1.6) y -= 60 * Math.exp(-dt * 1.6) * Math.abs(Math.sin(Math.PI * dt / .5));
  if (sc > 0) person(x, y, .62 * sc, sy);
}

/* the staircase is one stepped silhouette: it builds in S2, returns full in S4 where chapter tiles sit on its treads, and stays through S5 */
function stairs(t) {
  const back = t >= SWIPES[2];
  if (!back && (t < SWIPES[0] + .2 || t >= SWIPES[1])) return;
  if (t > E + .6) return;
  const lps = [0, 1, 2, 3, 4].map(i => back ? 1 : eback(prog(t, STEPS[i] + .15, .5))), hs = lps.map((lp, i) => (GND - STOP(i)) * Math.max(0, lp));
  const path = (full, close) => {
    ctx.beginPath(); ctx.moveTo(SX(0), GND);
    for (let i = 0; i < 5; i++) { const y = GND - (full ? GND - STOP(i) : hs[i]); ctx.lineTo(SX(i), y); ctx.lineTo(SX(i + 1), y); }
    ctx.lineTo(SX(5), GND); if (close) ctx.closePath();
  };
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const gh = back ? 0 : eo(prog(t, SWIPES[0] + .2, .6));
  if (gh > 0) { ctx.save(); ctx.globalAlpha = .45 * gh; ctx.setLineDash([10, 10]); ctx.lineWidth = 3; ctx.strokeStyle = C.ink2; path(true, false); ctx.stroke(); ctx.restore(); }
  ctx.save(); path(false, true); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.clip();
  for (let i = 0; i < 5; i++) {
    if (hs[i] <= 1) continue;
    const pt = CREATED + .2 + i * .18, glow = t > pt ? Math.exp(-(t - pt) * 3.2) : 0, y0 = GND - hs[i];
    const g = ctx.createLinearGradient(0, y0, 0, GND); g.addColorStop(0, `rgba(221,182,95,${Math.min(1, .6 + .35 * glow)})`); g.addColorStop(1, `rgba(221,182,95,${.16 + .3 * glow})`);
    ctx.fillStyle = g; ctx.fillRect(SX(i), y0, SW, hs[i]);
  }
  ctx.restore();
  path(false, false); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(SX(0), GND); ctx.lineTo(SX(5), GND); ctx.stroke();
  for (let i = 0; i < 5; i++) {
    const lp = lps[i];
    if (!back && lp < 1) label(RANGES[i], CX(i), STOP(i) + 52, .4 * gh * (1 - clamp(lp)), C.ink2, 24);
    if (lp <= 0) continue;
    ctx.save(); ctx.globalAlpha = .22; ctx.lineWidth = 3; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.moveTo(SX(i) + 10, STOP(i) + 12); ctx.lineTo(SX(i + 1) - 10, STOP(i) + 12); ctx.stroke(); ctx.restore();
    label(RANGES[i], CX(i), STOP(i) + 56, back ? 1 : eo(prog(t, STEPS[i] + .45, .3)), C.ink, 24);
    if (!back) {
      ring(t, STEPS[i] + LAND, CX(i), STOP(i) - 10, 30, 170, C.gold, .6, 8);
      burst(t, STEPS[i] + LAND, CX(i), STOP(i) - 20, 12, 90 + i * 17, C.goldL, 420, .6);
    }
  }
  if (back) {
    let n = 0;
    PARTS.forEach((c, g) => {
      let lastT = 0;
      for (let j = 0; j < c; j++) {
        const idx = n++, ts = TILE0 + idx * TILE_DT, p = eback(prog(t, ts, .3)); lastT = ts;
        if (p <= 0) continue;
        const nc = TCOLS[g], cx = SX(g) + (g === 4 ? 12 + 14 : (SW - (nc * 33 - 5)) / 2 + 14) + (j % nc) * 33, cy = STOP(g) - 18 - ((j / nc) | 0) * 33, sz = 28 * Math.max(0, p);
        rr(cx - sz / 2, cy - sz / 2, sz, sz, 6); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.ink; ctx.stroke();
      }
      ring(t, lastT + .1, CX(g), STOP(g) - 30, 20, 120, C.gold, .5, 6);
    });
  }
  marker(t, back);
}

/* ---------- S3: the book in one sentence (34 – 43) ---------- */
function icon(kind) {
  ctx.save(); ctx.scale(1.15, 1.15); ctx.strokeStyle = C.cream; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (kind === 0) {
    ctx.beginPath(); ctx.arc(-5, -5, 14, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(6, 6); ctx.lineTo(19, 19); ctx.stroke();
  } else if (kind === 1) {
    ctx.beginPath(); ctx.moveTo(-17, 1); ctx.lineTo(-6, 13); ctx.lineTo(17, -13); ctx.stroke();
  } else {
    ctx.beginPath(); ctx.moveTo(0, -19); ctx.lineTo(0, 17); ctx.moveTo(-10, 17); ctx.lineTo(10, 17); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-19, -3); ctx.lineTo(19, -13); ctx.stroke();
    ctx.beginPath(); ctx.arc(-19, 5, 8, 0, Math.PI); ctx.moveTo(11, -5); ctx.arc(19, -5, 8, 0, Math.PI); ctx.stroke();
  }
  ctx.restore();
}
function scene3(t) {
  if (t < SWIPES[1] || t >= SWIPES[2]) return;
  const dim = 1 - .5 * eo(prog(t, DROP + .3, .5)), TX = 262, YS = [510, 630, 750, 830], DY = [480, 600, 775];
  const texts = ['Find a [real problem.]', 'Solve it [well.]', 'Charge less than', 'the [pain it caused.]'];
  const sz = Math.min(68, ...texts.map(q => fit(q, LX + TW - TX, 68)));
  texts.forEach((q, i) => line(t, q, TX, YS[i], { size: sz, align: 'left', start: ROWS[Math.min(i, 2)] + .1 + (i === 3 ? .3 : 0), stagger: .06, alpha: dim }));
  const wob = 4 * Math.sin(t * 70) * eo(prog(t, RULE + .3, 1.0)) * (1 - eo(prog(t, DROP, .15)));
  DY.forEach((y, i) => {
    const np = eback(prog(t, ROWS[i], .35)); if (np <= 0) return;
    ctx.save(); ctx.globalAlpha = dim; ctx.translate(LX + 50 + wob, y); ctx.scale(np, np);
    ctx.beginPath(); ctx.arc(0, 0, 50, 0, Math.PI * 2); ctx.fillStyle = i === 2 ? C.ink : C.gold; ctx.fill(); icon(i); ctx.restore();
  });
  const rp = eio(prog(t, RULE, .5));
  ctx.fillStyle = C.ink; ctx.fillRect(LX, 915, LOW_W * rp, 6);
  const ds = sizeFor(['Value,', 'created.'], LOW_W - 10, 150);
  line(t, '[Value,]', LX, 1085, { size: ds, align: 'left', start: DROP, stagger: .14 });
  line(t, '[created.]', LX, 1085 + ds * 1.05, { size: ds, align: 'left', start: DROP + .15, stagger: .1 });
  ring(t, DROP, CXL, 1150, 60, 330, C.gold, .8, 12);
  ring(t, DROP + .12, CXL, 1150, 40, 270, C.goldL, .7, 8);
  burst(t, DROP, CXL, 1150, 30, 313, C.goldL, 800, .9);
  burst(t, DROP + .1, CXL, 1100, 18, 377, C.gold, 650, .8);
}

/* ---------- S4: 32 chapters, free (34.7 – E) ---------- */
function scene4(t) {
  if (t < SWIPES[2]) return;
  const end = E - .25, sz = sizeFor(['32 chapters.', 'Free.'], TW, 124);
  line(t, '[32] chapters.', LX, 480, { size: sz, align: 'left', start: SWIPES[2] + .3, stagger: .1, end });
  line(t, 'About 4 hours.', LX, 480 + sz * .75, { size: sizeFor(['About 4 hours.'], TW, 72), align: 'left', color: C.ink2, start: TILE0 + .9, stagger: .08, end });
  line(t, '[Free.]', LX, 480 + sz * .75 + sz * 1.08, { size: sz, align: 'left', start: TILE_END, end });
  burst(t, TILE_END + .1, 300, 700, 22, 505, C.goldL, 900, .8);
}

/* ---------- S6: end card ---------- */
function scene6(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, H / 2, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const OY = 130;
  const u = eio(prog(t, E + .9, .9)), px = [0, 1, 2, 3, 4].flatMap(i => [[LX + i * 56, 500 + OY - 26 * i], [LX + (i + 1) * 56, 500 + OY - 26 * i]]);
  ctx.save(); ctx.strokeStyle = C.cream; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.globalAlpha = .85; ctx.beginPath(); ctx.moveTo(LX, 500 + OY);
  const segs = [[LX, 500 + OY, LX, 500 + OY]].concat(px.map((q, i) => [i ? px[i - 1][0] : LX, i ? px[i - 1][1] : 500 + OY, q[0], q[1]]));
  segs.slice(1).forEach(([x0, y0, x1, y1], k) => { const sp = clamp(u * (segs.length - 1) - k); if (sp > 0) ctx.lineTo(lerp(x0, x1, sp), lerp(y0, y1, sp)); });
  ctx.stroke(); ctx.restore();
  const sp = eback(prog(t, E + 1.45, .45)); if (sp > 0) spark(LX + 4 * 56 + 44, 500 + OY - 26 * 4 - 56, 28 * sp);
  ring(t, E + 1.3, LX + 4 * 56 + 44, 420 + OY, 30, 220, C.goldL, .8, 8);
  line(t, 'Value, Created', LX, 650 + OY, { size: sizeFor(['Value, Created'], TW, 116), align: 'left', color: C.cream, start: E + 1.15, stagger: .1 });
  const gs = sizeFor(['Free audiobook', '32 chapters'], LOW_W, 68);
  line(t, '[Free audiobook]', LX, 745 + OY, { size: gs, align: 'left', goldColor: C.goldL, start: E + 1.6, stagger: .06 });
  line(t, '[32 chapters]', LX, 745 + OY + gs * 1.1, { size: gs, align: 'left', goldColor: C.goldL, start: E + 1.9, stagger: .06 });
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(LX, 905 + OY, 140 * lp, 4);
  line(t, 'Listen free —', LX, 990 + OY, { font: 'sans', size: 48, align: 'left', color: C.cream, start: E + 2.55, stagger: .05 });
  line(t, 'link in bio', LX, 1052 + OY, { font: 'sans', size: 48, align: 'left', color: C.cream, start: E + 2.8, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 24, 700); ctx.letterSpacing = '5px'; ctx.fillStyle = C.cream;
  ctx.fillText('PRODUCED BY THE JOY DIGI', LX, 1150 + OY);
  ctx.restore();
}

const SCENES = [kicker2, scene1, scene2, stairs, scene3, scene4];
const END_CARD = scene6;
