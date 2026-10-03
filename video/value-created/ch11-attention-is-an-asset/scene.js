/* Value, Created Ch 11 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 11, KICKER_END = 46.65, BAR_END = 46.75;
const WARP = [[0, 0], [6.4, 4.5], [10.9, 7.6], [16, 11.2], [20.7, 14.5], [27.6, 19.3], [33.1, 23.2], [40.3, 28.2], [47.1, 33], [53, 38]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const LIT0 = 1.7, LIT_DT = .03, LIT_N = 44, DRAIN = 3.9, DRAIN_DT = .02, ZERO = 4.6;
const RING0 = 7.0, RING_DUR = .9, AWAKE = 8.3, CARD0 = 8.5, CARD_DT = .065, CARD_N = 22, CARD_FLY = .6;
const PLAY_HIT = 12.3, MOON_HIT = 13.5;
const EARN0 = 16.9, EARN_DT = .11, STEAL0 = 16.9, STEAL_DT = .04, DRN = 18.7;
const CNT0 = 21.4, DROP = 23.6, HRS = 730;
const hoursAt = t => HRS * Math.pow(prog(t, CNT0, DROP - .05 - CNT0), 1.8);
const FILL = Array.from({ length: 30 }, (_, k) => CNT0 + (DROP - .05 - CNT0) * Math.pow(24 * (k + 1) / HRS, 1 / 1.8));
const SCAT0 = 28.3, FOCUS0 = 29.6, FOCUS_HIT = 31.0;
const QS = [33.5, 34.7, 35.9];
const SWIPES = [6.4, 20.7, 33.1];
const E = 46.85;
const IMPACTS = [[LIT0 + LIT_N * LIT_DT, 5], [DRAIN, 6], [ZERO, 11], [AWAKE, 8], [PLAY_HIT, 5], [MOON_HIT, 9], [EARN0 + 17 * EARN_DT, 4], [DRN, 7],
  [DROP, 16], [DROP + .45, 5], [FOCUS_HIT, 9], ...QS.map(s => [s + .1, 3]), [41.4, 12], [E + 1.2, 7]];
const KB = [[0, 6.4], [6.4, 20.7], [20.7, 33.1], [33.1, 46.8]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
[.5, .62, .74].forEach((x, i) => cue(x, 'blip', { n: [55, 59, 62][i] }));
for (let i = 0; i < LIT_N; i += 4) cue(LIT0 + i * LIT_DT, 'tick', { f: (i / 4) % 3 | 0 });
cue(LIT0 + LIT_N * LIT_DT, 'chime', { n: 72 }); cue(3.3, 'pop', { f: 1 });
cue(DRAIN - .1, 'whoosh', { v: .3 }); cue(DRAIN, 'drain', { d: 1 }); cue(ZERO, 'thud'); cue(ZERO, 'impact', { v: .8 }); cue(4.7, 'pop', { f: 1.1 });
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.65, 'pop', { f: 1.2 }); cue(7.2, 'pop', { f: .9 });
cue(RING0, 'swish'); cue(AWAKE, 'thud'); cue(AWAKE, 'chime', { n: 72 }); cue(AWAKE, 'impact', { v: .7 });
for (let i = 0; i < CARD_N; i += 2) cue(CARD0 + CARD_FLY + i * CARD_DT, 'tick', { f: (i / 2) % 2 });
cue(11.1, 'pop', { f: 1.2 }); cue(11.5, 'pop', { f: .9 });
cue(11.9, 'whoosh', { v: .3 }); cue(PLAY_HIT, 'thud'); cue(PLAY_HIT + .05, 'blip', { n: 62 });
cue(12.9, 'whoosh', { v: .4 }); cue(MOON_HIT, 'impact', { v: .8 }); cue(MOON_HIT, 'chime', { n: 76 }); cue(MOON_HIT + .1, 'blip', { n: 67 });
cue(15.9, 'whoosh', { v: .35 }); cue(16.2, 'pop', { f: 1.2 });
for (let i = 0; i < 18; i += 3) cue(EARN0 + i * EARN_DT, 'blip', { n: [60, 64, 67][(i / 3) % 3 | 0] });
for (let i = 0; i < 18; i += 6) cue(STEAL0 + i * STEAL_DT, 'tick', { f: 2 });
cue(19.0, 'pop', { f: .9 }); cue(DRN, 'drain', { d: .7 }); cue(DRN + .1, 'knock', { v: .8 });
cue(20.2, 'riser', { d: DROP - 20.2 }); cue(21.0, 'pop', { f: 1 });
FILL.forEach((x, k) => { if (k % 2) cue(x, 'tick', { f: (k / 2) % 3 | 0 }); });
cue(DROP, 'boom', { v: 1 }); cue(DROP, 'chime', { n: 79 }); cue(DROP, 'impact', { v: 1 }); cue(DROP + .2, 'whoosh', { v: .4 }); cue(DROP + .45, 'thud');
cue(27.8, 'pop', { f: 1.2 });
for (let i = 0; i < 9; i += 2) cue(SCAT0 + i * .12, 'tick', { f: 0 });
cue(SCAT0 + .5, 'blip', { n: 55 });
cue(FOCUS0, 'whoosh', { v: .3 }); cue(FOCUS_HIT - .6, 'riser', { d: .6 }); cue(FOCUS_HIT, 'impact', { v: .9 }); cue(FOCUS_HIT, 'chime', { n: 76 }); cue(FOCUS_HIT + .1, 'pop', { f: 1.2 });
cue(33.3, 'tick', { f: 2 });
QS.forEach((s, i) => { cue(s + .1, 'blip', { n: [64, 67, 71][i] }); cue(s + .1, 'pop', { f: 1 }); });
cue(40.0, 'whoosh', { v: .35 }); cue(40.45, 'thud'); cue(41.4, 'impact', { v: .9 }); cue(42.35, 'swish'); cue(43.4, 'pop', { f: .9 });
cue(44.3, 'whoosh', { v: .3 }); cue(45.0, 'blip', { n: 79 });
cue(E - .05, 'whoosh', { v: 1 });
[E + .95, E + 1.1].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 79][i] }));
cue(E + 1.2, 'boom', { v: .9 }); cue(E + 1.25, 'chime', { n: 72 });
cue(E + 2.55, 'pop', { f: .9 });
const MARKERS = { groove: 6.4, breakdown: 20.2, drop: DROP, end: 46.75 };

/* ---------- S1: the first banner ad (0 – 6.4) ---------- */
const gx = c => 130 + c * 44, gy = r => 480 + r * 44;
function scene1(t) {
  if (t > 6.6) return;
  line(t, 'The first banner ad.', W / 2, 215, { size: 84, start: -.62, stagger: .12, end: 3.7 });
  line(t, '[44%] clicked.', W / 2, 305, { size: 84, start: -.4, stagger: .12, end: 3.7 });
  line(t, 'Today: [0.05%.]', W / 2, 235, { size: 96, start: DRAIN, stagger: .12, end: 5.95 });
  line(t, 'Same rectangle.', W / 2, 325, { size: 60, color: C.ink2, start: 4.7, stagger: .1, end: 5.95 });
  const out = 1 - eio(prog(t, 5.95, .35));
  ctx.save(); ctx.globalAlpha = out;
  label('100 VIEWERS', 130, 448, eo(prog(t, .5, .3)), C.ink2, 24, 'left');
  for (let i = 0; i < 100; i++) {
    const c = i % 10, r = (i / 10) | 0, p = eback(prog(t, .45 + i * .008, .3)); if (p <= 0) continue;
    const lit = i < LIT_N && t >= LIT0 + i * LIT_DT && t < DRAIN + (LIT_N - 1 - i) * DRAIN_DT;
    const pop = i < LIT_N && t >= LIT0 + i * LIT_DT ? 1 + .35 * Math.exp(-(t - LIT0 - i * LIT_DT) * 14) : 1;
    ctx.beginPath(); ctx.arc(gx(c), gy(r), 15 * p * (lit ? pop : 1), 0, Math.PI * 2); ctx.fillStyle = lit ? C.gold : 'rgba(58,52,44,0.16)'; ctx.fill();
  }
  const bp = eback(prog(t, 1.0, .4));
  if (bp > 0) {
    ctx.save(); ctx.translate(800, 790); ctx.scale(bp, bp); rr(-110, -34, 220, 68, 10); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
    label('AD', 800, 799, bp > .6 ? 1 : 0, C.ink2, 24);
  }
  const cnt = Math.round(44 * eo(prog(t, LIT0, LIT_N * LIT_DT))), fa = eo(prog(t, LIT0, .3)) * (1 - eio(prog(t, DRAIN + .1, .4)));
  if (fa > 0) {
    const k = 1 + .12 * Math.exp(-(t - LIT0 - 1.3) * 12) * (t > LIT0 + 1.3 ? 1 : 0);
    ctx.save(); ctx.globalAlpha = out * fa; ctx.translate(800, 650); ctx.scale(k, k); ctx.font = font('serif', 130); ctx.textAlign = 'center'; ctx.fillStyle = C.goldText; ctx.fillText(cnt + '%', 0, 0); ctx.restore();
  }
  const zp = eback(prog(t, ZERO, .4));
  if (zp > 0) { ctx.save(); ctx.translate(800, 650); ctx.scale(zp, zp); ctx.font = font('serif', 84); ctx.textAlign = 'center'; ctx.fillStyle = C.ink; ctx.fillText('0.05%', 0, 0); ctx.restore(); }
  ring(t, ZERO, 800, 630, 40, 300, C.gold, .7, 10);
  burst(t, ZERO, 800, 630, 16, 41, C.faint, 600, .7);
  ring(t, LIT0 + LIT_N * LIT_DT, 330, 680, 40, 340, C.gold, .6, 8);
  ctx.restore();
}

/* ---------- S2: endless content, a fixed 16 hours (6.4 – 10.9) ---------- */
const DX = 540, DY = 660;
function scene2(t) {
  if (t < 6.4 || t > 11) return;
  const end = 10.45, out = 1 - eio(prog(t, end, .35));
  line(t, 'Content is [endless.]', W / 2, 220, { size: 76, start: 6.65, end });
  line(t, 'Your budget: [16 waking hours.]', W / 2, 310, { size: 50, color: C.ink2, start: 7.2, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  const p = eio(prog(t, RING0, RING_DUR));
  for (let k = 0; k < 24; k++) {
    const kp = clamp(p * 24 - k); if (kp <= 0) continue;
    const a0 = -Math.PI / 2 + k * Math.PI / 12 + .02, a1 = a0 + Math.PI / 12 - .04, ro = lerp(130, 190, eo(kp));
    ctx.beginPath(); ctx.arc(DX, DY, ro, a0, a1); ctx.arc(DX, DY, 130, a1, a0, true); ctx.closePath();
    ctx.fillStyle = k < 8 ? C.fill : (t >= AWAKE ? C.goldL : '#FFFBF3'); ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke();
  }
  const hp = eback(prog(t, AWAKE, .4));
  if (hp > 0) { ctx.save(); ctx.translate(DX, DY + 28); ctx.scale(hp, hp); ctx.font = font('serif', 86); ctx.textAlign = 'center'; ctx.fillStyle = C.goldText; ctx.fillText('16h', 0, 0); ctx.restore(); }
  for (let i = 0; i < CARD_N; i++) {
    const s = CARD0 + i * CARD_DT, q = prog(t, s, CARD_FLY); if (q <= 0) continue;
    const ang = -.12 * Math.PI + rnd(i + 5) * 1.24 * Math.PI, rad = lerp(580, 208, Math.pow(q, 1.5));
    const x = DX + Math.cos(ang) * rad, y = DY + Math.sin(ang) * rad;
    if (q < 1) {
      ctx.save(); ctx.translate(x, y); ctx.rotate(ang + rnd(i) * 2); ctx.scale(1 - .35 * q, 1 - .35 * q);
      rr(-32, -22, 64, 44, 8); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-20, -6); ctx.lineTo(20, -6); ctx.moveTo(-20, 8); ctx.lineTo(8, 8); ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
    }
    burst(t, s + CARD_FLY, DX + Math.cos(ang) * 208, DY + Math.sin(ang) * 208, 5, 300 + i * 7, C.ink2, 200, .35);
  }
  ring(t, AWAKE, DX, DY, 100, 330, C.gold, .7, 10);
  ctx.restore();
}

/* ---------- S3: Netflix competes with sleep (10.9 – 16) ---------- */
const mix = g => `rgb(${Math.round(lerp(255, 221, g))},${Math.round(lerp(251, 182, g))},${Math.round(lerp(243, 95, g))})`;
function hop(t, t0, t1, x0, y0, x1, y1, lift) {
  const q = eio(prog(t, t0, t1 - t0));
  return [lerp(x0, x1, q), lerp(y0, y1, q) - lift * Math.sin(Math.PI * clamp((t - t0) / (t1 - t0)))];
}
function scene3(t) {
  if (t < 10.9 || t > 16.1) return;
  const end = 15.55, out = 1 - eio(prog(t, end, .35));
  line(t, 'Netflix’s biggest rival?', W / 2, 220, { size: 66, start: 11.1, stagger: .08, end });
  line(t, '[Sleep.]', W / 2, 330, { size: 100, start: MOON_HIT - .1, end });
  const gPlay = eo(prog(t, PLAY_HIT, .2)) * (1 - eo(prog(t, 13.0, .3))), gMoon = eo(prog(t, MOON_HIT, .25));
  ctx.save(); ctx.globalAlpha = out;
  [[300, 11.3, gPlay], [780, 11.45, gMoon]].forEach(([x, s, g], i) => {
    const p = eback(prog(t, s, .45)); if (p <= 0) return;
    ctx.save(); ctx.translate(x, 650); ctx.scale(p, p);
    rr(-120, -120, 240, 240, 36); ctx.fillStyle = mix(g); ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke();
    if (i === 0) { ctx.beginPath(); ctx.moveTo(-34, -52); ctx.lineTo(56, 0); ctx.lineTo(-34, 52); ctx.closePath(); ctx.fillStyle = C.ink; ctx.fill(); }
    else {
      ctx.save(); ctx.beginPath(); ctx.arc(0, 0, 62, 0, Math.PI * 2); ctx.clip(); ctx.fillStyle = C.ink; ctx.fillRect(-70, -70, 140, 140);
      ctx.beginPath(); ctx.arc(30, -18, 54, 0, Math.PI * 2); ctx.fillStyle = mix(g); ctx.fill(); ctx.restore();
    }
    ctx.restore();
  });
  let tok = null;
  if (t < 11.9) tok = [540, 470, eback(prog(t, 11.5, .35))];
  else if (t < PLAY_HIT) { const [x, y] = hop(t, 11.9, PLAY_HIT, 540, 470, 300, 650, 90); tok = [x, y, 1 - .3 * prog(t, 12.15, .15)]; }
  else if (t >= 12.9 && t < MOON_HIT) { const [x, y] = hop(t, 12.9, MOON_HIT, 300, 650, 780, 650, 190); tok = [x, y, eback(prog(t, 12.9, .2)) * (1 - .3 * prog(t, 13.35, .15))]; }
  if (tok && tok[2] > 0) {
    ctx.save(); ctx.translate(tok[0], tok[1]); ctx.scale(tok[2], tok[2]); rr(-40, -40, 80, 80, 16); ctx.fillStyle = C.gold; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.font = font('serif', 38); ctx.textAlign = 'center'; ctx.fillStyle = C.ink; ctx.fillText('1h', 0, 13); ctx.restore();
  }
  ctx.restore();
  label('NETFLIX', 300, 840, out * eo(prog(t, 11.6, .3)), C.ink, 26);
  label('SLEEP', 780, 840, out * eo(prog(t, 11.75, .3)), C.goldText, 26);
  ring(t, PLAY_HIT, 300, 650, 40, 240, C.gold, .6, 8);
  ring(t, MOON_HIT, 780, 650, 40, 320, C.gold, .8, 12);
  burst(t, MOON_HIT, 780, 650, 22, 83, C.goldL, 900, .8);
}

/* ---------- S4: earned vs stolen attention (16 – 20.7) ---------- */
const RX = [300, 780], RY0 = 480, RS = 330;
const dotXY = (cx, k) => [cx - 115 + (k % 6) * 46, 600 + ((k / 6) | 0) * 70];
function scene4(t) {
  if (t < 16 || t > 20.8) return;
  const end = 20.25, out = 1 - eio(prog(t, end, .35));
  line(t, 'Earn it. [Never steal it.]', W / 2, 220, { size: 72, start: 16.2, stagger: .08, end });
  line(t, 'Stolen attention leaves.', W / 2, 305, { size: 52, color: C.ink2, start: 19.0, stagger: .07, end });
  ctx.save(); ctx.globalAlpha = out;
  RX.forEach((cx, i) => {
    const p = eback(prog(t, 16.3 + i * .12, .4)); if (p <= 0) return;
    ctx.save(); ctx.translate(cx, RY0 + RS / 2); ctx.scale(p, p); rr(-RS / 2, -RS / 2, RS, RS, 28); ctx.fillStyle = '#FFFBF3'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
  });
  for (let k = 0; k < 18; k++) {
    const [ex, ey] = dotXY(RX[0], k), ep = eback(prog(t, EARN0 + k * EARN_DT, .3));
    if (ep > 0) { ctx.beginPath(); ctx.arc(ex, ey + 4 * Math.sin(t * 4 + k), 17 * ep, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill(); }
    const [sx, sy] = dotXY(RX[1], k), sp = eback(prog(t, STEAL0 + k * STEAL_DT, .25)), dq = eio(prog(t, DRN + (17 - k) * .03, .5));
    if (sp > 0 && dq < 1) {
      ctx.save(); ctx.globalAlpha = out * (1 - dq); ctx.beginPath(); ctx.arc(sx + dq * 480 * (rnd(k) + .6), sy + dq * 90 * (rnd(k + 9) - .5), 17 * sp, 0, Math.PI * 2); ctx.fillStyle = C.fill; ctx.fill(); ctx.restore();
    }
  }
  ctx.restore();
  label('EARNED', RX[0], 455, out * eo(prog(t, 16.5, .3)), C.goldText, 26);
  label('STOLEN', RX[1], 455, out * eo(prog(t, 16.6, .3)), C.ink2, 26);
}

/* ---------- S5: two hours a day is a full month (20.7 – 27.6) ---------- */
function scene5(t) {
  if (t < 20.7 || t > 27.7) return;
  const end = 27.1, out = 1 - eio(prog(t, end, .35));
  line(t, 'Two hours of idle scrolling', W / 2, 215, { size: 56, color: C.ink2, start: 21.0, stagger: .08, end });
  line(t, 'A [full month] a year.', W / 2, 305, { size: 68, start: DROP, stagger: .12, end });
  ctx.save(); ctx.globalAlpha = out;
  const wob = 4 * Math.sin(t * 70) * eo(prog(t, 22.8, .7)) * (1 - eo(prog(t, DROP, .12)));
  for (let k = 0; k < 30; k++) {
    const c = k % 6, r = (k / 6) | 0, x = 90 + c * 78 + wob, y = 470 + r * 78, ip = eback(prog(t, 21.0 + k * .01, .3)); if (ip <= 0) continue;
    const fp = eback(prog(t, FILL[k], .25)), flash = t >= DROP ? Math.exp(-(t - DROP) * 5) : 0;
    ctx.save(); ctx.translate(x + 35, y + 35); ctx.scale(ip, ip);
    rr(-35, -35, 70, 70, 10); ctx.fillStyle = 'rgba(58,52,44,0.06)'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.faint; ctx.stroke();
    if (fp > 0) { ctx.scale(fp, fp); rr(-35, -35, 70, 70, 10); ctx.fillStyle = flash > .1 ? C.goldL : C.gold; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.ink; ctx.stroke(); }
    ctx.restore();
  }
  const h = t >= DROP ? HRS : Math.round(hoursAt(t)), kp = t >= DROP ? 1 + .3 * Math.exp(-(t - DROP) * 7) : 1;
  ctx.save(); ctx.translate(820, 690); ctx.scale(kp, kp); ctx.font = font('serif', 150); ctx.textAlign = 'center'; ctx.globalAlpha = out * eo(prog(t, 21.2, .3)); ctx.fillStyle = t >= DROP ? C.goldText : C.ink; ctx.fillText(h, 0, 0); ctx.restore();
  ctx.restore();
  label('HOURS', 820, 750, out * eo(prog(t, 21.3, .3)), C.ink2, 26);
  ring(t, DROP, 820, 640, 60, 520, C.gold, .8, 12);
  ring(t, DROP + .12, 820, 640, 40, 420, C.goldL, .7, 8);
  burst(t, DROP, 330, 650, 30, 313, C.goldL, 1000, .9);
  burst(t, DROP + .1, 820, 640, 18, 377, C.gold, 800, .8);
}

/* ---------- S6: guard your own (27.6 – 33.1) ---------- */
function scene6(t) {
  if (t < 27.6 || t > 33.2) return;
  const end = 32.65, out = 1 - eio(prog(t, end, .35));
  line(t, 'Guard your [attention.]', W / 2, 220, { size: 76, start: 27.8, stagger: .1, end });
  line(t, 'Long, unbroken focus.', W / 2, 310, { size: 50, color: C.ink2, start: 29.2, stagger: .08, end });
  ctx.save(); ctx.globalAlpha = out;
  const x0 = 110, w = 860, yS = 540, yF = 730, n = 9, gap = 16, cw = (w - gap * (n - 1)) / n;
  ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) {
    const p = eback(prog(t, SCAT0 + i * .12, .25)); if (p <= 0) continue;
    const cx = x0 + i * (cw + gap) + cw / 2, wd = cw * (.45 + .55 * rnd(i + 3));
    rr(cx - wd / 2 * p, yS - 22, wd * p, 44, 12); ctx.fillStyle = C.fill; ctx.fill();
    if (i < n - 1) { ctx.beginPath(); ctx.arc(cx + cw / 2 + gap / 2, yS - 44 * p - 8 * Math.abs(Math.sin(t * 5 + i)), 9 * p, 0, Math.PI * 2); ctx.lineWidth = 4; ctx.strokeStyle = C.ink2; ctx.stroke(); }
  }
  const fp = eio(prog(t, FOCUS0, FOCUS_HIT - FOCUS0));
  if (fp > 0) {
    const g = ctx.createLinearGradient(x0, 0, x0 + w, 0); g.addColorStop(0, C.gold); g.addColorStop(1, C.goldL);
    rr(x0, yF - 26, Math.max(10, w * fp), 52, 14); ctx.fillStyle = g; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
  }
  ctx.restore();
  label('SCATTERED', x0, yS - 70, out * eo(prog(t, SCAT0, .3)), C.ink2, 24, 'left');
  label('FOCUSED', x0, yF - 50, out * eo(prog(t, FOCUS0 - .1, .3)), C.goldText, 24, 'left');
  ring(t, FOCUS_HIT, x0 + w, yF, 40, 360, C.gold, .8, 10);
  burst(t, FOCUS_HIT, x0 + w, yF, 22, 604, C.goldL, 1000, .8);
}

/* ---------- S7: three rules (33.1 – 40.3) ---------- */
function icon(kind, t) {
  ctx.save(); ctx.strokeStyle = C.cream; ctx.fillStyle = C.cream; ctx.lineWidth = 4; ctx.lineCap = ctx.lineJoin = 'round';
  if (kind === 0) {
    rr(-17, -2, 34, 24, 4); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-20, -2); ctx.lineTo(20, -2); ctx.moveTo(0, -2); ctx.lineTo(0, 22); ctx.stroke();
    ctx.beginPath(); ctx.arc(-7, -10, 7, 0, Math.PI * 2); ctx.arc(7, -10, 7, 0, Math.PI * 2); ctx.stroke();
  } else if (kind === 1) {
    ctx.beginPath(); ctx.arc(0, 0, 19, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(t * 2 - 1.57) * 12, Math.sin(t * 2 - 1.57) * 12); ctx.moveTo(0, 0); ctx.lineTo(0, -8); ctx.stroke();
  } else {
    ctx.beginPath(); ctx.arc(0, 0, 18, 0, Math.PI * 2); ctx.moveTo(-13, -13); ctx.lineTo(13, 13); ctx.stroke();
  }
  ctx.restore();
}
function scene7(t) {
  if (t < 33.1 || t > 40.4) return;
  const qEnd = 39.85;
  label('THREE RULES', W / 2, 290, env(t, 33.3, qEnd, .3), C.goldText, 26);
  ['[Earn] it first.', '[Respect] it.', 'Never [steal] it.'].forEach((q, i) => {
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
  const end = 46.7, out = 1 - eio(prog(t, end, .35));
  line(t, 'Content is infinite.', W / 2, 410, { size: 72, start: 40.45, stagger: .1, end });
  const r = line(t, '[Attention is not.]', W / 2, 540, { size: 82, start: 41.4, stagger: .1, end });
  const u = eio(prog(t, 42.35, .4)) * out;
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 576, r.w * u, 9); }
  line(t, 'Earn it. Guard it.', W / 2, 700, { size: 54, color: C.ink2, start: 43.4, stagger: .1, end });
  const lp = eio(prog(t, 44.3, .9));
  if (lp > 0) {
    ctx.save(); ctx.globalAlpha = out; ctx.strokeStyle = C.ink2; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath();
    for (let a = 0; a <= Math.PI * 2 * lp; a += .05) { const d = 1 + Math.sin(a) * Math.sin(a); ctx.lineTo(380 + 100 * Math.cos(a) / d, 840 + 100 * Math.sin(a) * Math.cos(a) / d); }
    ctx.stroke();
    const dp = eback(prog(t, 45.0, .35));
    if (dp > 0) { ctx.beginPath(); ctx.arc(700, 840, 22 * dp, 0, Math.PI * 2); ctx.fillStyle = C.gold; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke(); }
    ctx.restore();
  }
  burst(t, 41.5, W / 2, 510, 24, 707, C.goldL, 1100, .9);
  burst(t, 45.0, 700, 840, 12, 515, C.goldL, 500, .7);
}

/* ---------- S9: end card (47.1 – 53) ---------- */
function scene9(t) {
  if (t < E - .05) return;
  const rp = eio(prog(t, E, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 600, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  [[68, .2], [44, .35], [20, .55]].forEach(([r, a], i) => {
    const p = eback(prog(t, E + .9 + i * .1, .4)); if (p <= 0) return;
    ctx.beginPath(); ctx.arc(W / 2, 270, r * p, 0, Math.PI * 2); ctx.lineWidth = 4; ctx.strokeStyle = C.cream; ctx.globalAlpha = a; ctx.stroke(); ctx.globalAlpha = 1;
  });
  const dp = eback(prog(t, E + 1.1, .4));
  if (dp > 0) { ctx.beginPath(); ctx.arc(W / 2, 270, 11 * dp, 0, Math.PI * 2); ctx.fillStyle = C.goldL; ctx.fill(); }
  ring(t, E + 1.2, W / 2, 270, 30, 300, C.goldL, .8, 8);
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: E + 1.15, stagger: .1 });
  const title = 'Chapter 11: Attention Is an Asset';
  line(t, '[' + title + ']', W / 2, 535, { size: fit(title, 900, 66, 'serif'), goldColor: C.goldL, start: E + 1.6, stagger: .06 });
  const lp = eio(prog(t, E + 2.15, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, 590, 140 * lp, 4);
  line(t, 'Full 10-minute episode — link in comments', W / 2, 680, { font: 'sans', size: 38, color: C.cream, start: E + 2.55, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, E + 3.35, .5));
  ctx.font = font('sans', 22, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8];
const END_CARD = scene9;
