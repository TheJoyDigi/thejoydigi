/* Value, Created book promo (the whole audiobook): config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 0, KICKER = 'FREE AUDIOBOOK', KICKER_END = 56.4, BAR_END = 56.5;
const WARP = [[0, 0], [8, 5.6], [34, 23.8], [43, 30.1], [50.2, 35.14], [56.85, 39.8], [62.75, 44.8]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const OPEN = 4.2;
const STEPS = [8.5, 13.7, 18.9, 24.1, 29.3], NOTES = [60, 64, 67, 71, 76], LAND = .7;
const ROWS = [34.9, 35.9, 36.9], RULE = 38.0, DROP = 40.0;
const TILE0 = 43.9, TILE_DT = .07, TILE_END = TILE0 + 31 * TILE_DT + .3;
const CREATED = 51.9;
const SWIPES = [8, 34, 43];
const E = 56.6;
const IMPACTS = [[OPEN, 12], ...STEPS.map((s, i) => [s + LAND, i === 4 ? 11 : 3 + i]), ...ROWS.map(r => [r + .25, 4]), [DROP, 16], [DROP + .45, 5],
  [TILE_END, 9], [CREATED, 12], [E + 1.2, 7]];
const KB = [[0, 8], [8, 34], [34, 43], [43, E]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
cue(.05, 'thud');
[1.0, 1.15, 1.3].forEach(x => cue(x, 'tick', { f: 2 }));
cue(2.1, 'blip', { n: 64 });
[2.9, 3.25, 3.6].forEach((x, i) => cue(x, 'knock', { v: .6 + i * .2 }));
cue(OPEN - .6, 'riser', { d: .6 }); cue(OPEN, 'impact', { v: .9 }); cue(OPEN, 'chime', { n: 76 }); cue(OPEN + .1, 'pop', { f: 1.2 });
cue(5.5, 'pop', { f: 1 }); cue(6.9, 'blip', { n: 67 });
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
STEPS.forEach((s, i) => {
  cue(s + .1, 'whoosh', { v: .3 }); cue(s + .3, 'pop', { f: 1.2 }); cue(s + .45, 'thud');
  cue(s + LAND, 'blip', { n: NOTES[i] }); cue(s + LAND, 'tick', { f: 1 }); cue(s + 1.1, 'pop', { f: .9 });
});
cue(STEPS[4] + LAND, 'chime', { n: 79 }); cue(STEPS[4] + LAND, 'impact', { v: .8 });
cue(34.3, 'pop', { f: 1 });
ROWS.forEach((s, i) => { cue(s, 'whoosh', { v: .3 }); cue(s + .1, 'pop', { f: 1 }); cue(s + .25, 'thud'); cue(s + .3, 'blip', { n: [60, 64, 67][i] }); });
cue(RULE, 'swish'); cue(RULE - .2, 'riser', { d: DROP - RULE + .2 });
for (let x = 38.9, k = 0; x < DROP - .05; x += .13 - k * .006, k++) cue(x, 'tick', { f: k % 2 });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 }); cue(DROP + .45, 'thud');
cue(43.5, 'pop', { f: 1.2 });
for (let i = 0; i < 32; i += 4) cue(TILE0 + i * TILE_DT, 'tick', { f: (i / 4) % 2 });
for (let i = 0; i < 32; i += 8) cue(TILE0 + i * TILE_DT + .05, 'blip', { n: 55 + i * .4 | 0 });
cue(TILE_END, 'chime', { n: 79 }); cue(TILE_END, 'impact', { v: .8 }); cue(TILE_END + .3, 'pop', { f: 1.1 });
cue(50.5, 'pop', { f: 1.2 }); cue(CREATED - .6, 'riser', { d: .6 }); cue(CREATED, 'impact', { v: .9 }); cue(CREATED, 'chime', { n: 76 }); cue(CREATED + .1, 'pop', { f: 1.2 });
cue(CREATED + .7, 'swish'); [.5, 1.0, 1.5].forEach(x => cue(CREATED + x, 'tick', { f: 2 }));
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: 8, breakdown: RULE - .3, drop: DROP, end: E - .1 };

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
  const cx = W / 2, base = 840, bw = 300, bh = 170, od = t - OPEN, open = eback(prog(t, OPEN, .5)), mid = base - bh;
  ctx.save(); ctx.translate(cx, base); ctx.scale(p, p); ctx.translate(-cx, -base);
  const amp = od < 0 ? 8 * eo(prog(t, 2.8, 1.2)) : 0;
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
    const orp = eback(prog(od, .1, .5)), oy = mid - 30 - 120 * eo(prog(od, .1, .9)) + 7 * Math.sin(od * 3), tw = 1 + .07 * Math.sin(od * 6);
    spark(cx, oy, 66 * Math.max(0, orp) * tw);
    spark(cx + 84, oy - 52, 20 * Math.max(0, eback(prog(od, .5, .4))) * (1 + .2 * Math.sin(od * 8)));
    spark(cx - 92, oy + 18, 14 * Math.max(0, eback(prog(od, .65, .4))) * (1 + .2 * Math.sin(od * 8 + 2)));
  }
  ctx.save(); ctx.translate(Math.sin(t * 45) * amp * .35, 0);
  rr(cx - bw / 2, mid, bw, bh, 16); ctx.fillStyle = '#EDE4D2'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
  const qa = od < 0 ? eo(prog(t, 2.0, .3)) : 1 - eo(prog(od, 0, .15));
  if (qa > 0) { ctx.globalAlpha = qa; ctx.font = font('serif', 130); ctx.textAlign = 'center'; ctx.fillStyle = C.ink2; ctx.fillText('?', cx, base - 40); ctx.textAlign = 'left'; }
  ctx.restore();
  ctx.save(); ctx.translate(cx - bw / 2 - 12 + 190 * eo(prog(od, 0, .45)), mid - Math.abs(Math.sin(t * 30)) * amp * .8 - 20 * eo(prog(od, 0, .45)));
  ctx.rotate(od < 0 ? Math.sin(t * 45) * amp * .004 : -open * .3);
  rr(0, -42, bw + 24, 42, 10); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.restore();
  ctx.restore();
  ring(t, OPEN, cx, mid - 20, 40, 380, C.gold, .7, 10);
  burst(t, OPEN, cx, mid - 40, 26, 41, C.goldL, 1000, .9);
}
function scene1(t) {
  if (t >= 8) return;
  line(t, 'Everyone wants [money.]', W / 2, 215, { size: fit('Everyone wants money.', 900, 92), start: -.62, stagger: .12, end: 3.8 });
  line(t, 'Almost no one asks what it’s made of.', W / 2, 300, { size: fit('Almost no one asks what it’s made of.', 900, 52), color: C.ink2, start: .9, stagger: .07, end: 3.8 });
  line(t, '[Value.]', W / 2, 300, { size: 150, start: OPEN + .05 });
  const sq = 'Money is [created value,] frozen.';
  line(t, sq, W / 2, 395, { size: fit(sq, 900, 54), color: C.ink2, start: 5.5, stagger: .08 });
  box(t);
}

/* ---------- S2: the five-step staircase, built across five beats (8 – 34) ---------- */
const SW = 187.2, SX = i => 72 + i * SW, CX = i => SX(i) + SW / 2, STOP = i => 700 - 62 * i, GND = 900;
const TCOLS = [5, 5, 3, 4, 3];
const VERBS = ['SEE', 'CREATE', 'CAPTURE', 'SCALE', 'MASTER'], PARTS = [5, 9, 6, 7, 5];
const STEP_TEXT = [
  ['[See] it.', 'Value is not in things.', 'It is in people.'],
  ['[Create] it.', 'The creator’s job is not to invent.', 'It is to notice.'],
  ['[Capture] it.', 'Creation is abundant.', 'Capture is [scarce.]'],
  ['[Scale] it.', 'Leverage is doing more with less.'],
  ['[Master] it.', 'Teaching is the final leverage.']
];
function scene2(t) {
  if (t < 8 || t >= 34) return;
  STEP_TEXT.forEach(([h, ...subs], i) => {
    const s = STEPS[i], end = i === 4 ? 99 : s + 4.65, sz = Math.min(...subs.map(q => fit(q, 900, 52)));
    line(t, h, W / 2, 225, { size: 92, start: s + .3, stagger: .12, end });
    subs.forEach((q, k) => line(t, q, W / 2, 305 + k * 58, { size: sz, color: C.ink2, start: s + 1.1 + k * .6, stagger: .07, end }));
  });
}

/* the climber lands on each step as it rises, then bounces on the top step at the takeaway */
function marker(t, back) {
  let k = -1; STEPS.forEach((s, i) => { if (t >= s + .1) k = i; });
  if (k < 0) return;
  const x1 = k === 4 && back ? SX(4) + SW - 26 : CX(k), y1 = STOP(k), p = prog(t, STEPS[k] + .1, .6);
  let x = x1, y = y1, sc = 1, sy = 1;
  if (k === 0) sc = eback(p);
  else { const e = eio(p), x0 = CX(k - 1), y0 = STOP(k - 1); x = lerp(x0, x1, e); y = lerp(y0, y1, e) - 4 * p * (1 - p) * 120; }
  if (p >= 1) sy = 1 - .16 * Math.exp(-(t - STEPS[k] - .7) * 12);
  const dt = t - CREATED; if (k === 4 && dt > 0 && dt < 1.6) y -= 90 * Math.exp(-dt * 1.6) * Math.abs(Math.sin(Math.PI * dt / .5));
  if (sc > 0) person(x, y, .5 * sc, sy);
}

/* the staircase is one stepped silhouette: it builds in S2, returns full in S4 where chapter tiles sit on its treads, and stays through S5 */
function stairs(t) {
  const back = t >= 43;
  if (!back && (t < 8.2 || t >= 34)) return;
  if (t > E + .6) return;
  const lps = [0, 1, 2, 3, 4].map(i => back ? 1 : eback(prog(t, STEPS[i] + .15, .5))), hs = lps.map((lp, i) => (GND - STOP(i)) * Math.max(0, lp));
  const path = (full, close) => {
    ctx.beginPath(); ctx.moveTo(SX(0), GND);
    for (let i = 0; i < 5; i++) { const y = GND - (full ? GND - STOP(i) : hs[i]); ctx.lineTo(SX(i), y); ctx.lineTo(SX(i + 1), y); }
    ctx.lineTo(SX(5), GND); if (close) ctx.closePath();
  };
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const gh = back ? 0 : eo(prog(t, 8.2, .6));
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
  ctx.beginPath(); ctx.moveTo(SX(0) - 20, GND); ctx.lineTo(SX(5) + 20, GND); ctx.stroke();
  for (let i = 0; i < 5; i++) {
    const lp = lps[i];
    if (!back && lp < 1) label(VERBS[i], CX(i), STOP(i) + 48, .4 * gh * (1 - clamp(lp)), C.ink2, 26);
    if (lp <= 0) continue;
    ctx.save(); ctx.globalAlpha = .22; ctx.lineWidth = 3; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.moveTo(SX(i) + 14, STOP(i) + 12); ctx.lineTo(SX(i + 1) - 14, STOP(i) + 12); ctx.stroke(); ctx.restore();
    label(VERBS[i], CX(i), STOP(i) + 56, back ? 1 : eo(prog(t, STEPS[i] + .45, .3)), C.ink, 26);
    if (!back) {
      ring(t, STEPS[i] + LAND, CX(i), STOP(i) - 10, 30, 220, C.gold, .6, 8);
      burst(t, STEPS[i] + LAND, CX(i), STOP(i) - 20, 12, 90 + i * 17, C.goldL, 520, .6);
    }
  }
  if (back) {
    let n = 0;
    PARTS.forEach((c, g) => {
      let lastT = 0;
      for (let j = 0; j < c; j++) {
        const idx = n++, ts = TILE0 + idx * TILE_DT, p = eback(prog(t, ts, .3)); lastT = ts;
        if (p <= 0) continue;
        const nc = TCOLS[g], cx = SX(g) + (g === 4 ? 14 + 15 : (SW - (nc * 35 - 5)) / 2 + 15) + (j % nc) * 35, cy = STOP(g) - 19 - ((j / nc) | 0) * 35, sz = 30 * Math.max(0, p);
        rr(cx - sz / 2, cy - sz / 2, sz, sz, 6); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.ink; ctx.stroke();
      }
      ring(t, lastT + .1, CX(g), STOP(g) - 30, 20, 150, C.gold, .5, 6);
    });
  }
  marker(t, back);
}

/* ---------- S3: the book in one sentence (34 – 43) ---------- */
function icon(kind) {
  ctx.save(); ctx.strokeStyle = C.cream; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
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
  if (t < 34 || t >= 43) return;
  label('THE BOOK IN ONE SENTENCE', W / 2, 262, eo(prog(t, 34.3, .4)), C.goldText, 26);
  const dim = 1 - .5 * eo(prog(t, DROP + .3, .5)), TX = 230, YS = [390, 500, 610, 695], DY = [366, 476, 652];
  const texts = ['Find a [real problem.]', 'Solve it [well.]', 'Charge less than', 'the [pain it caused.]'];
  const sz = Math.min(70, ...texts.map(q => fit(q, 778, 70)));
  texts.forEach((q, i) => line(t, q, TX, YS[i], { size: sz, align: 'left', start: ROWS[Math.min(i, 2)] + .1 + (i === 3 ? .55 : 0), stagger: .07, alpha: dim }));
  const wob = 4 * Math.sin(t * 70) * eo(prog(t, RULE + .6, 1.2)) * (1 - eo(prog(t, DROP, .15)));
  DY.forEach((y, i) => {
    const np = eback(prog(t, ROWS[i], .35)); if (np <= 0) return;
    ctx.save(); ctx.globalAlpha = dim; ctx.translate(146 + wob, y); ctx.scale(np, np);
    ctx.beginPath(); ctx.arc(0, 0, 44, 0, Math.PI * 2); ctx.fillStyle = i === 2 ? C.ink : C.gold; ctx.fill(); icon(i); ctx.restore();
  });
  const rp = eio(prog(t, RULE, .6));
  ctx.fillStyle = C.ink; ctx.fillRect(102, 768, 876 * rp, 6);
  line(t, '[Value, created.]', W / 2, 880, { size: 104, start: DROP, stagger: .14 });
  ring(t, DROP, W / 2, 840, 60, 560, C.gold, .8, 12);
  ring(t, DROP + .12, W / 2, 840, 40, 440, C.goldL, .7, 8);
  burst(t, DROP, W / 2, 840, 30, 313, C.goldL, 1000, .9);
  burst(t, DROP + .1, W / 2, 780, 18, 377, C.gold, 800, .8);
}

/* ---------- S4: 32 chapters, 5 parts (43 – 50.2) ---------- */
function scene4(t) {
  if (t < 43 || t >= 50.2) return;
  line(t, '[32] chapters. 5 parts.', W / 2, 225, { size: fit('32 chapters. 5 parts.', 900, 92), start: 43.5, stagger: .1, end: 49.9 });
  line(t, 'About 4 hours. [Free.]', W / 2, 305, { size: fit('About 4 hours. Free.', 900, 58), color: C.ink2, start: TILE_END + .2, stagger: .1, end: 49.9 });
  burst(t, TILE_END + .3, W / 2, 290, 18, 505, C.goldL, 900, .8);
}

/* ---------- S5: takeaway (50.2 – 56.6) ---------- */
function scene5(t) {
  if (t < 50.2) return;
  const end = E - .25;
  line(t, 'Value is not found.', W / 2, 225, { size: fit('Value is not found.', 900, 92), start: 50.5, stagger: .1, end });
  const r = line(t, 'It is [created.]', W / 2, 335, { size: fit('It is created.', 900, 104), start: CREATED, stagger: .12, end });
  const u = eio(prog(t, CREATED + .7, .4)) * (1 - eio(prog(t, end, .35)));
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 358, r.w * u, 8); }
  burst(t, CREATED + .1, W / 2, 310, 24, 707, C.goldL, 1100, .9);
}

/* ---------- S6: end card ---------- */
function scene6(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  const u = eio(prog(t, E + .9, .9)), px = [0, 1, 2, 3, 4].flatMap(i => [[W / 2 - 140 + i * 56, 310 - 26 * i], [W / 2 - 140 + (i + 1) * 56, 310 - 26 * i]]);
  ctx.save(); ctx.strokeStyle = C.cream; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.globalAlpha = .85; ctx.beginPath(); ctx.moveTo(W / 2 - 140, 310);
  const segs = [[W / 2 - 140, 310, W / 2 - 140, 310]].concat(px.map((q, i) => [i ? px[i - 1][0] : W / 2 - 140, i ? px[i - 1][1] : 310, q[0], q[1]]));
  segs.slice(1).forEach(([x0, y0, x1, y1], k) => { const sp = clamp(u * (segs.length - 1) - k); if (sp > 0) ctx.lineTo(lerp(x0, x1, sp), lerp(y0, y1, sp)); });
  ctx.stroke(); ctx.restore();
  const sp = eback(prog(t, E + 1.45, .45)); if (sp > 0) spark(W / 2 + 112, 310 - 26 * 4 - 56, 28 * sp);
  ring(t, E + 1.3, W / 2 + 112, 190, 30, 300, C.goldL, .8, 8);
  line(t, 'Value, Created', W / 2, 440, { size: fit('Value, Created', 900, 104), color: C.cream, start: E + 1.15, stagger: .1 });
  line(t, '[A free audiobook in 32 chapters]', W / 2, 535, { size: fit('A free audiobook in 32 chapters', 900, 60), goldColor: C.goldL, start: E + 1.6, stagger: .06 });
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, 590, 140 * lp, 4);
  line(t, 'Listen free — link in comments', W / 2, 680, { font: 'sans', size: 44, color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 24, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene1, scene2, stairs, scene3, scene4, scene5];
const END_CARD = scene6;
