/* Value, Created Ch 7 LinkedIn infographic: chapter config and scenes for ../_engine (design time; WARP maps real time onto it). */
const CHAPTER = 7, KICKER_END = 47.1, BAR_END = 47.4;
const WARP = [[0, 0], [6.5, 4.7], [10.5, 7.4], [15.5, 10.7], [20.5, 14.0], [27.1, 18.6], [33, 22.6], [41, 28.6], [47.6, 33.3], [53.5, 38.3]];
/* ---------- timeline constants shared by visuals and cues ---------- */
const TIME_A = 11.4, TIME_D = 3.4;
const timeRem = t => 24 * (1 - eio(prog(t, TIME_A, TIME_D)));
/* design time at which each hour cell k leaves (rem crosses k + .5) */
const TICKS = Array.from({ length: 24 }, (_, k) => {
  let lo = TIME_A, hi = TIME_A + TIME_D;
  for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (timeRem(m) > k + .5) lo = m; else hi = m; }
  return lo;
}).reverse();
const STEPS = [29.6, 30.05, 30.45, 30.8, 31.15];
const SKILL_POP = 24.3, Y5_SLAM = 36.85, SUDDEN = 39.22;
const SWIPES = [6.5, 27.1, 41.0];
const IMPACTS = [[3.85, 7], [7.1, 3], [7.32, 3], [7.54, 3], [14.85, 4], [19.85, 4], [SKILL_POP, 16], [27.7, 4],
  ...STEPS.map((s, i) => [s + .12, i === 4 ? 13 : 4 + i]), [33.75, 4], [Y5_SLAM, 14], [SUDDEN, 11], [41.45, 5], [42.75, 5], [44.05, 10], [48.15, 7]];
const KB = [[0, 6.5], [6.5, 27.1], [27.1, 41], [41, 47.6]];

cue(0, 'impact', { v: .6 }); cue(.02, 'pop', { f: 1 });
[.5, .9, 1.3, 1.7].forEach(x => cue(x, 'scratch'));
cue(1.0, 'pop', { f: 1.25 });
[3.35, 3.7, 4.05, 4.4, 4.75].forEach((x, i) => cue(x, 'knock', { v: 1 - i * .17 }));
cue(3.85, 'thud'); cue(3.85, 'chime', { n: 76 });
cue(5.15, 'pop', { f: 1.1 });
SWIPES.forEach(x => cue(x - .3, 'whoosh', { v: 1 }));
cue(6.7, 'pop', { f: 1 }); cue(7.15, 'pop', { f: 1.3 });
[7.1, 7.32, 7.54].forEach((x, i) => cue(x + .05, 'blip', { n: [60, 64, 67][i] }));
cue(10.45, 'whoosh', { v: .45 }); cue(10.7, 'pop', { f: 1 });
TICKS.forEach((x, i) => cue(x, 'tick', { f: i % 2 }));
cue(14.85, 'thud');
cue(15.45, 'whoosh', { v: .45 }); cue(15.7, 'pop', { f: .95 });
cue(16.4, 'drain', { d: 3.4 });
cue(19.85, 'thud');
cue(20.45, 'whoosh', { v: .45 }); cue(20.7, 'pop', { f: 1.3 });
cue(21.6, 'riser', { d: SKILL_POP - 21.6 });
cue(SKILL_POP, 'boom', { v: 1 }); cue(SKILL_POP, 'chime', { n: 79 });
cue(27.7, 'thud'); cue(28.9, 'pop', { f: 1.3 });
STEPS.forEach((s, i) => cue(s + .1, 'blip', { n: [64, 67, 69, 72, 76][i] }));
cue(STEPS[4] + .12, 'impact', { v: .8 });
cue(33.2, 'pop'); cue(33.75, 'thud');
cue(36.05, 'whoosh', { v: .45 }); cue(36.3, 'pop', { f: 1.2 });
cue(Y5_SLAM, 'boom', { v: .85 });
for (let i = 0; i < 40; i += 2) cue(37.3 + i * .028 + .1, 'tick', { f: 2 });
cue(38.9, 'pop'); cue(SUDDEN, 'impact', { v: 1 });
cue(41.45, 'thud'); cue(42.75, 'thud'); cue(44.05, 'impact', { v: .85 }); cue(45.0, 'swish');
cue(47.2, 'whoosh', { v: 1 });
[47.9, 48.02, 48.14].forEach((x, i) => cue(x + .1, 'blip', { n: [72, 76, 79][i] }));
cue(48.15, 'boom', { v: .9 }); cue(48.2, 'chime', { n: 72 });
cue(49.6, 'pop', { f: .9 });
const MARKERS = { groove: 6.5, breakdown: 21.6, drop: SKILL_POP, end: 47.4 };

/* ---------- S1: two carpenters (0 – 6.5) ---------- */
function chair(cx, base, drawP, good, wob) {
  const segs = [[[-55, 0], [-72, -300], 9], [[56, good ? 0 : -16], [56, -140], 9], [[-74, -140], [78, -140], 12], [[-55, -48], [56, -48], 6]];
  ctx.save();
  ctx.translate(cx - 55, base); ctx.rotate(wob); ctx.translate(55, 0);
  ctx.lineCap = 'round';
  const n = segs.length;
  for (let i = 0; i < n; i++) {
    const p = eio(clamp(drawP * n - i));
    if (p <= 0) continue;
    const [a, b, w] = segs[i];
    ctx.strokeStyle = good && i === 2 && drawP >= 1 && goodOn ? C.gold : C.ink;
    ctx.lineWidth = w;
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(lerp(a[0], b[0], p), lerp(a[1], b[1], p)); ctx.stroke();
  }
  ctx.restore();
}
let goodOn = false;

function scene1(t) {
  if (t > 6.9) return;
  line(t, 'Two carpenters.', W / 2, 250, { size: 92, start: -.62, stagger: .14, end: 6.05 });
  line(t, 'Same wood. Same tools. Same hours.', W / 2, 330, { font: 'sans', size: 46, color: C.ink2, start: 1.0, stagger: .1, end: 6.05 });

  const out = 1 - eio(prog(t, 6.05, .35));
  ctx.save(); ctx.globalAlpha = out;
  const drawP = prog(t, .45, 1.5);
  const wob = prog(t, 3.3, .2) * .085 * Math.sin((t - 3.3) * 9.5) * Math.exp(-Math.max(0, t - 4.6) * 1.2);
  ctx.strokeStyle = C.faint; ctx.lineWidth = 3;
  [330, 750].forEach(x => { const p = eo(prog(t, .35, .6)); ctx.beginPath(); ctx.moveTo(x - 140 * p, 782); ctx.lineTo(x + 140 * p, 782); ctx.stroke(); });
  goodOn = t >= 3.85;
  const pop = goodOn ? 1 + .12 * Math.exp(-(t - 3.85) * 9) : 1;
  chair(330, 780, drawP, false, wob);
  ctx.save(); ctx.translate(750, 780); ctx.scale(pop, pop); ctx.translate(-750, -780);
  chair(750, 780, drawP, true, 0);
  ctx.restore();
  const gp = eo(prog(t, 3.85, .35));
  if (gp > 0) { ctx.fillStyle = C.gold; ctx.fillRect(750 - 140 * gp, 779, 280 * gp, 6); }
  ring(t, 3.85, 750, 640, 40, 260, C.gold, .7, 10);
  burst(t, 3.85, 750, 640, 18, 31, C.goldL, 900, .8);
  ctx.restore();
  line(t, 'Wobbles.', 330, 860, { font: 'sans', size: 40, weight: 700, color: C.ink2, start: 3.4, end: 6.05 });
  line(t, '[Lasts decades.]', 750, 860, { font: 'sans', size: 40, weight: 700, start: 3.95, stagger: .12, end: 6.05 });
}

/* ---------- S2–S5: the three meters (6.5 – 27) ---------- */
const MX = [300, 540, 780], MW = 150, MTOP = 500, MBOT = 840;
function meterBox(x, top, a, glow) {
  ctx.save(); ctx.globalAlpha = a;
  if (glow > 0) { ctx.shadowColor = `rgba(221,182,95,${.8 * glow})`; ctx.shadowBlur = 60 * glow; }
  rr(x - MW / 2, top, MW, MBOT - top, 22);
  ctx.fillStyle = 'rgba(255,252,246,0.7)'; ctx.fill();
  ctx.shadowBlur = 0;
  ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.restore();
}

function meters(t) {
  if (t < 6.8 || t > 27.6) return;
  const out = 1 - eio(prog(t, 26.75, .4));
  const focus = t < 10.6 ? -1 : t < 15.6 ? 0 : t < 20.6 ? 1 : 2;
  const fly = [];

  MX.forEach((x, i) => {
    const inP = eback(prog(t, 7.1 + i * .22, .45));
    if (inP <= 0) return;
    const dim = focus < 0 || focus === i ? 1 : lerp(1, .28, eo(prog(t, [10.6, 15.6, 20.6][focus], .3)));
    const a = clamp(inP) * out * dim;
    const focPop = focus === i ? 1 + .06 * Math.exp(-(t - [10.6, 15.6, 20.6][i]) * 8) : 1;
    ctx.save();
    ctx.translate(x, MBOT); ctx.scale(focPop, inP * focPop); ctx.translate(-x, -MBOT);

    const skillGrow = i === 2 ? eback(prog(t, SKILL_POP, .5)) : 0;
    const top = MTOP - 70 * skillGrow;
    const glow = i === 2 ? skillGrow * (1 + .6 * Math.exp(-(t - SKILL_POP) * 4)) : 0;
    meterBox(x, top, a, glow);
    const ix = x - MW / 2 + 12, iw = MW - 24, itop = top + 12, ibot = MBOT - 12, ih = ibot - itop;

    ctx.save(); ctx.globalAlpha = a;
    rr(x - MW / 2 + 2, top + 2, MW - 4, MBOT - top - 4, 20); ctx.clip();
    if (i === 0) {
      const rem = timeRem(t), gap = 4, sh = (ih - gap * 23) / 24;
      for (let k = 0; k < 24; k++) {
        const ry = ibot - (k + 1) * sh - k * gap;
        if (rem > k + .5) { rr(ix, ry, iw, sh, 4); ctx.fillStyle = C.ink; ctx.fill(); }
        const tk = TICKS[23 - k];
        if (t >= tk && t < tk + .55 && focus === 0) fly.push([ix, ry, iw, sh, (t - tk) / .55, k]);
      }
    } else if (i === 1) {
      const dp = prog(t, 16.4, 3.4), L = lerp(1, .05, eio(dp));
      const amp = 5 + 14 * Math.sin(Math.PI * dp);
      const sy = ibot - ih * L;
      ctx.beginPath(); ctx.moveTo(ix, ibot);
      for (let px = 0; px <= iw; px += 5) ctx.lineTo(ix + px, sy + Math.sin(px * .055 + t * 7) * amp * (L > .03 ? 1 : .2));
      ctx.lineTo(ix + iw, ibot); ctx.closePath();
      ctx.fillStyle = C.fill; ctx.fill();
    } else {
      const p = prog(t, 21.6, SKILL_POP - 21.6 + .1);
      const L = .1 * Math.pow(10, Math.pow(p, 1.6));
      const sh2 = ih * clamp(L), sy = ibot - sh2;
      const g = ctx.createLinearGradient(0, sy, 0, ibot);
      g.addColorStop(0, C.goldL); g.addColorStop(1, C.gold);
      rr(ix, sy, iw, sh2, 10); ctx.fillStyle = g; ctx.fill();
      if (t > 21.6 && t < 26.8) {
        ctx.fillStyle = '#FFF4D6';
        for (let s = 0; s < 14; s++) {
          const ph = (t * 1.3 + rnd(s)) % 1;
          ctx.globalAlpha = a * (1 - ph) * .9;
          ctx.beginPath(); ctx.arc(ix + 10 + rnd(s + 40) * (iw - 20), sy + 20 + (ibot - sy) * (1 - ph) - 20, 2.5 + 3 * rnd(s + 9), 0, Math.PI * 2); ctx.fill();
        }
      }
    }
    ctx.restore();
    ctx.restore();

    label(['TIME', 'EFFORT', 'SKILL'][i], x, MBOT + 58, a, i === 2 ? C.goldText : C.ink);

    ctx.save(); ctx.globalAlpha = a * eo(prog(t, 7.5 + i * .22, .4));
    ctx.font = font('sans', 36, 700); ctx.textAlign = 'center'; ctx.fillStyle = C.ink2;
    if (i === 0) {
      const tk = TICKS.filter(x => x <= t).pop(), kp = tk ? 1 + .25 * Math.exp(-(t - tk) * 14) : 1;
      ctx.translate(x, MTOP - 42); ctx.scale(kp, kp);
      ctx.fillText(Math.max(0, Math.round(timeRem(t) - .001)) + 'h', 0, 12);
    }
    if (i === 1) {
      const hr = 9 + Math.floor(9 * eio(prog(t, 16.4, 3.4)) + .0001);
      ctx.fillText((hr > 12 ? hr - 12 : hr) + (hr >= 12 ? ' PM' : ' AM'), x, MTOP - 30);
    }
    if (i === 2) {
      const y = top - 44 - 10 * Math.abs(Math.sin(t * 6)) * prog(t, 21.6, .3);
      ctx.fillStyle = C.goldText; ctx.beginPath();
      ctx.moveTo(x, y - 14); ctx.lineTo(x + 16, y + 8); ctx.lineTo(x - 16, y + 8); ctx.closePath(); ctx.fill();
    }
    ctx.restore();
  });

  /* spent hour cells fly off the TIME meter */
  fly.forEach(([fx, fy, fw, fh, e, k]) => {
    ctx.save(); ctx.globalAlpha = (1 - e) * out;
    const dir = -1, spread = rnd(k) * 120;
    ctx.translate(fx + fw / 2 + dir * (90 + (160 + spread) * eo(e)), fy + fh / 2 - (60 + spread * .6) * eo(e) + 320 * e * e);
    ctx.rotate(dir * e * 1.6);
    rr(-fw / 2, -fh / 2, fw, fh, 4); ctx.fillStyle = C.ink; ctx.fill();
    ctx.restore();
  });
  ring(t, SKILL_POP, MX[2], MTOP - 70, 30, 330, C.gold, .8, 12);
  burst(t, SKILL_POP, MX[2], MTOP - 60, 30, 77, C.goldL, 1300, 1.1);
}

function scene2to5(t) {
  line(t, 'Everything you make', W / 2, 230, { size: 74, start: 6.7, end: 10.3 });
  line(t, 'costs [three inputs.]', W / 2, 320, { size: 74, start: 7.1, end: 10.3 });

  line(t, '[Time] is capped.', W / 2, 250, { size: 84, start: 10.7, end: 15.3 });
  line(t, '24 hours. Spent once.', W / 2, 330, { font: 'sans', size: 46, color: C.ink2, start: 11.5, stagger: .12, end: 15.3 });

  line(t, '[Effort] runs dry.', W / 2, 250, { size: 84, start: 15.7, end: 20.3 });
  line(t, 'Empty by dinner.', W / 2, 330, { font: 'sans', size: 46, color: C.ink2, start: 16.5, stagger: .12, end: 20.3 });

  line(t, '[Skill] compounds.', W / 2, 230, { size: 84, start: 20.7, end: 26.7 });
  line(t, 'The only input that grows', W / 2, 310, { font: 'sans', size: 46, color: C.ink2, start: 21.5, stagger: .08, end: 26.7 });
  line(t, 'as you spend it.', W / 2, 368, { font: 'sans', size: 46, color: C.ink2, start: 22.0, stagger: .08, end: 26.7 });
  meters(t);
}

/* ---------- S6: the multiplier (27 – 33) ---------- */
function scene6(t) {
  if (t < 27.2 || t > 33.3) return;
  line(t, 'Time and effort are the base.', W / 2, 240, { size: 62, start: 27.3, stagger: .07, end: 32.75 });
  line(t, '[Skill is the multiplier.]', W / 2, 330, { size: 76, start: 28.9, stagger: .1, end: 32.75 });

  const out = 1 - eio(prog(t, 32.75, .4));
  const m = 1 + STEPS.filter(s => t >= s + .12).length;
  const sw = 108, gap = 12, n = 6, total = n * sw + (n - 1) * gap, x0 = (W - total) / 2, by = 600, bh = 120;
  const baseP = eback(prog(t, 27.6, .35));
  ctx.save(); ctx.globalAlpha = out;
  if (baseP > 0) { ctx.save(); ctx.translate(x0 + sw / 2, by + bh / 2); ctx.scale(baseP, baseP); rr(-sw / 2, -bh / 2, sw, bh, 12); ctx.fillStyle = C.fill; ctx.fill(); ctx.restore(); }
  for (let k = 1; k < n; k++) {
    const s = STEPS[k - 1], p = prog(t, s, .2);
    if (p <= 0) continue;
    const yo = -260 * (1 - eo(p)) * (1 - eo(p));
    const sq = t > s + .12 ? 1 - .25 * Math.exp(-(t - s - .12) * 14) : 1;
    const g = ctx.createLinearGradient(0, by, 0, by + bh); g.addColorStop(0, C.goldL); g.addColorStop(1, C.gold);
    ctx.save(); ctx.globalAlpha = out * clamp(p * 3);
    ctx.translate(x0 + k * (sw + gap) + sw / 2, by + bh + yo); ctx.scale(1 / sq, sq);
    rr(-sw / 2, -bh, sw, bh, 12); ctx.fillStyle = g; ctx.fill(); ctx.restore();
    burst(t, s + .12, x0 + k * (sw + gap) + sw / 2, by + bh, 8, 200 + k * 13, C.gold, 500, .45);
  }
  ctx.restore();
  label('TIME + EFFORT', x0 + sw / 2 + 85, by - 30, out * clamp(baseP), C.ink2, 26);
  const lastStep = STEPS.filter(s => t >= s + .12).pop();
  const kp = lastStep ? 1 + .45 * Math.exp(-(t - lastStep - .12) * 10) : 1;
  ctx.save(); ctx.globalAlpha = out * eo(prog(t, 29.4, .3));
  ctx.translate(W / 2, by + bh + 150); ctx.scale(kp, kp);
  ctx.font = font('serif', 124); ctx.textAlign = 'center'; ctx.fillStyle = C.goldText;
  ctx.fillText('×' + m, 0, 40);
  ctx.restore();
  label('SKILL', W / 2, by + bh + 240, out * eo(prog(t, 29.4, .3)), C.goldText, 26);
  ring(t, STEPS[4] + .12, W / 2, by + bh / 2, 60, 520, C.gold, .7, 10);
}

/* ---------- S7: silent, then sudden (33 – 41) ---------- */
function cells(x, y, w, h, cols, rows, t, start, color) {
  const g = 6, cw = (w - g * (cols - 1)) / cols, ch = (h - g * (rows - 1)) / rows;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const i = r * cols + c, p = eback(prog(t, start + i * .028, .22));
    if (p <= 0) continue;
    const cx = x + c * (cw + g) + cw / 2, cy = y + r * (ch + g) + ch / 2;
    rr(cx - cw * p / 2, cy - ch * p / 2, cw * p, ch * p, 3); ctx.fillStyle = color; ctx.fill();
  }
}
function scene7(t) {
  if (t < 33 || t > 41.4) return;
  line(t, '[Year 1:] almost identical.', W / 2, 260, { size: 72, start: 33.2, end: 36.0 });
  const aA = env(t, 33.6, 36.0, .3, .3);
  if (aA > 0) {
    ctx.save(); ctx.globalAlpha = aA;
    const s = 130 * eback(prog(t, 33.6, .35));
    rr(W / 2 - 170 - s / 2, 560 - s / 2, s, s, 10); ctx.fillStyle = C.gold; ctx.fill();
    rr(W / 2 + 170 - s / 2, 560 - s / 2, s, s, 10); ctx.fillStyle = C.fill; ctx.fill();
    ctx.font = font('serif', 70); ctx.textAlign = 'center'; ctx.fillStyle = C.ink2; ctx.fillText('≈', W / 2, 582);
    ctx.restore();
    label('MASTER', W / 2 - 170, 700, aA, C.goldText, 26);
    label('BEGINNER', W / 2 + 170, 700, aA, C.ink2, 26);
  }
  line(t, '[Year 5:] one hour = one week.', W / 2, 260, { size: 68, start: 36.3, stagger: .08, end: 40.9 });
  const aB = 1 - eio(prog(t, 40.9, .35));
  if (t > 36.6) {
    const bw = 300, bh = 220, by = 420, cx = W / 2 - 210, cy = by + bh / 2;
    const p = prog(t, Y5_SLAM - .2, .2);
    ctx.save(); ctx.globalAlpha = aB;
    if (p > 0) {
      const s = lerp(2.2, 1, eo(p)) * (t > Y5_SLAM ? 1 + .06 * Math.exp(-(t - Y5_SLAM) * 10) * Math.cos((t - Y5_SLAM) * 30) : 1);
      const g = ctx.createLinearGradient(0, by, 0, by + bh); g.addColorStop(0, C.goldL); g.addColorStop(1, C.gold);
      ctx.save(); ctx.globalAlpha = aB * clamp(p * 4); ctx.translate(cx, cy); ctx.scale(s, s);
      rr(-bw / 2, -bh / 2, bw, bh, 12); ctx.fillStyle = g; ctx.fill(); ctx.restore();
    }
    cells(W / 2 + 210 - bw / 2, by, bw, bh, 8, 5, t, 37.3, C.fill);
    ctx.globalAlpha = aB * eo(prog(t, 37.0, .3));
    ctx.font = font('serif', 80); ctx.textAlign = 'center'; ctx.fillStyle = C.ink2; ctx.fillText('=', W / 2, by + bh / 2 + 26);
    ctx.restore();
    ring(t, Y5_SLAM, cx, cy, 100, 420, C.gold, .7, 12);
    burst(t, Y5_SLAM, cx, cy, 24, 501, C.goldL, 1100, .9);
    label('MASTER · 1 HOUR', cx, by + bh + 56, aB * eo(prog(t, 37.0, .3)), C.goldText, 24);
    label('BEGINNER · 1 WEEK', W / 2 + 210, by + bh + 56, aB * eo(prog(t, 37.6, .3)), C.ink2, 24);
  }
  line(t, 'Silent, then [sudden.]', W / 2, 880, { size: 74, start: 38.9, stagger: .16, end: 40.9 });
  ctx.save(); ctx.globalAlpha = .55 * env(t, 33.5, 40.9);
  ctx.font = font('sans', 20, 500); ctx.textAlign = 'right'; ctx.fillStyle = C.ink2; ctx.fillText('Illustrative', W - 72, 1010);
  ctx.restore();
}

/* ---------- S8: the takeaway (41 – 47.5) ---------- */
function scene8(t) {
  if (t < 41 || t > 47.8) return;
  const end = 47.0;
  label('THE TAKEAWAY', W / 2, 230, env(t, 41.2, end, .3), C.goldText, 24);
  line(t, 'Time you spend once.', W / 2, 400, { size: 78, start: 41.4, stagger: .07, end });
  line(t, 'Effort you spend daily.', W / 2, 540, { size: 78, start: 42.7, stagger: .07, end });
  const r = line(t, '[Skill you build forever.]', W / 2, 680, { size: 78, start: 44.0, stagger: .1, end });
  const u = eio(prog(t, 45.0, .4)) * (1 - eio(prog(t, end, .35)));
  if (u > 0) { ctx.fillStyle = C.gold; ctx.fillRect(r.x0, 714, r.w * u, 8); }
  burst(t, 44.05, W / 2, 660, 22, 808, C.goldL, 1000, .9);
}

/* ---------- S9: end card (47.5 – 53.5) ---------- */
function scene9(t) {
  if (t < 47.2) return;
  const rp = eio(prog(t, 47.25, .55));
  ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(W / 2, 700, 1300 * rp, 0, Math.PI * 2); ctx.fill();
  if (rp < 1) return;
  [[-46, 46, C.cream], [0, 46, C.cream], [46, 112, C.goldL]].forEach(([dx, h, col], i) => {
    const hh = h * eback(prog(t, 47.9 + i * .12, .4));
    if (hh <= 0) return;
    rr(W / 2 + dx - 15, 300 - hh, 30, hh, 6); ctx.fillStyle = col; ctx.globalAlpha = i < 2 ? .55 : 1; ctx.fill(); ctx.globalAlpha = 1;
  });
  ring(t, 48.15, W / 2 + 46, 250, 30, 300, C.goldL, .8, 8);
  line(t, 'Value, Created —', W / 2, 440, { size: 88, color: C.cream, start: 48.1, stagger: .1 });
  line(t, '[Chapter 7: The Inputs]', W / 2, 535, { size: 66, goldColor: C.goldL, start: 48.55, stagger: .08 });
  const lp = eio(prog(t, 49.1, .45));
  ctx.fillStyle = C.goldL; ctx.fillRect(W / 2 - 70 * lp, 590, 140 * lp, 4);
  line(t, 'Full 10-minute episode — link in comments', W / 2, 680, { font: 'sans', size: 38, color: C.cream, start: 49.5, stagger: .05 });
  ctx.save(); ctx.globalAlpha = .6 * eo(prog(t, 50.3, .5));
  ctx.font = font('sans', 22, 700); ctx.letterSpacing = '5px'; ctx.textAlign = 'center'; ctx.fillStyle = C.cream;
  ctx.fillText('A FREE AUDIOBOOK · PRODUCED BY THE JOY DIGI', W / 2 + 2.5, 980);
  ctx.restore();
}

const SCENES = [scene1, scene2to5, scene6, scene7, scene8];
const END_CARD = scene9;
