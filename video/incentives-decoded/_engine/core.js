/* Incentives, Decoded shorts engine (9:16). An episode's scene.js sets HOOK/EMPH and registers stage elements; see README.md. */
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const W = 1080, H = 1920, END_LEN = 3.8;
const C = { ink: '#0E0D12', paper: '#F6F4EE', violet: '#5B3DF5', lime: '#D4FF3A', pink: '#FF5CA8', cyan: '#4FE0E8', orange: '#FF8A3D', white: '#FFFFFF', lilac: '#F1EEFF' };
/* text must stay in this box (TikTok/Reels/Shorts UI); below SAFE.splitY the right edge is SAFE.rightLow */
const SAFE = { top: 270, bottom: 1560, left: 120, right: 960, rightLow: 780, splitY: 840 };
const STAGE = { cx: 450, top: 1010, bottom: 1540, w: 640 };

const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const prog = (t, a, d) => clamp((t - a) / d);
const eo = x => 1 - Math.pow(1 - clamp(x), 3);
const eio = x => { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
const eback = x => { x = clamp(x); const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const spring = x => { x = clamp(x); return 1 - Math.exp(-6 * x) * Math.cos(10 * x); };
const lerp = (a, b, p) => a + (b - a) * p;
const rnd = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const norm = w => w.toLowerCase().replace(/’/g, "'").replace(/[^a-z0-9']/g, '');

/* ---------- clip words + timing lookups ---------- */
const WORDS = CLIP.words, VOICE_END = CLIP.duration, DUR = VOICE_END + END_LEN;
/* start time of the nth (1-based) clip word matching `word` (case/punctuation-insensitive); a phrase matches consecutive words */
function T(word, n = 1, edge = 's') {
  const parts = word.split(/\s+/).map(norm);
  let seen = 0;
  for (let i = 0; i + parts.length <= WORDS.length; i++) {
    if (parts.every((p, k) => norm(WORDS[i + k].w) === p) && ++seen === n) return edge === 's' ? WORDS[i].s : WORDS[i + parts.length - 1].e;
  }
  throw new Error(`T("${word}", ${n}): not in the clip`);
}
const TE = (word, n = 1) => T(word, n, 'e');

/* ---------- sound cues + camera hits ---------- */
const CUES = [], IMPACTS = [], BG = [[0, C.violet]];
const cue = (t, type, o) => CUES.push(Object.assign({ t, type }, o || {}));
const shake = (t, amp) => IMPACTS.push([t, amp]);
function bg(t, color, o = {}) { BG.push([t, color, o.x ?? W / 2, o.y ?? 1250]); BG.sort((a, b) => a[0] - b[0]); if (o.sfx !== false) cue(t - .12, 'whoosh', { v: .7 }); }

/* ---------- fonts + text ---------- */
const font = (size, weight = 800, kind = 'display') => kind === 'mono' ? `700 ${size}px "Space Mono"` : `${weight} ${size}px "Bric"`;
function fit(str, maxW, size, weight = 800, kind = 'display', track = 0) {
  ctx.save(); ctx.letterSpacing = track + 'px';
  let px = size;
  for (; px > 14; px--) { ctx.font = font(px, weight, kind); if (ctx.measureText(str).width <= maxW) break; }
  ctx.restore(); return px;
}
/* split str into lines no wider than maxW */
function wrap(str, maxW, size, weight = 800) {
  ctx.save(); ctx.font = font(size, weight);
  const lines = [];
  for (const w of str.split(' ')) {
    const cur = lines[lines.length - 1];
    if (cur && ctx.measureText(cur + ' ' + w).width <= maxW) lines[lines.length - 1] = cur + ' ' + w; else lines.push(w);
  }
  ctx.restore(); return lines;
}
/* chunky sticker text: ink outline + hard drop shadow behind the fill */
function stext(str, x, y, size, o = {}) {
  ctx.save();
  ctx.font = font(size, o.weight || 800, o.kind); ctx.letterSpacing = (o.track || 0) + 'px';
  ctx.textAlign = o.align || 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
  const sw = o.stroke ?? size * .14, sh = o.shadow ?? size * .07;
  if (sw > 0) {
    ctx.strokeStyle = o.strokeColor || C.ink; ctx.lineWidth = sw;
    if (sh) { ctx.fillStyle = o.strokeColor || C.ink; ctx.strokeText(str, x + sh, y + sh); ctx.fillText(str, x + sh, y + sh); }
    ctx.strokeText(str, x, y);
  }
  ctx.fillStyle = o.color || C.white; ctx.fillText(str, x, y);
  ctx.restore();
}
function pill(x, y, w, h, fill, o = {}) {
  ctx.save();
  const r = o.r ?? h / 2, sh = o.shadow ?? 7;
  if (sh) { ctx.fillStyle = o.shadowColor || C.ink; ctx.beginPath(); ctx.roundRect(x + sh, y + sh, w, h, r); ctx.fill(); }
  ctx.fillStyle = fill; ctx.strokeStyle = C.ink; ctx.lineWidth = o.lw ?? 5;
  ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill(); if (ctx.lineWidth) ctx.stroke();
  ctx.restore();
}
function chip(str, x, y, fill, color = C.ink, size = 30, align = 'left') {
  ctx.save(); ctx.font = font(size, 700, 'mono'); ctx.letterSpacing = '3px';
  const w = ctx.measureText(str).width + 44, h = size + 30, x0 = align === 'center' ? x - w / 2 : x;
  pill(x0, y, w, h, fill, { shadow: 6, lw: 4 });
  ctx.fillStyle = color; ctx.textBaseline = 'middle'; ctx.textAlign = 'center';
  ctx.fillText(str, x0 + w / 2 + 1.5, y + h / 2 + 2); ctx.restore();
  return w;
}

/* ---------- element registry: scene.js registers, draw() plays ---------- */
const ELS = [];
function el(t0, t1, drawFn, layer = 0) { ELS.push({ t0, t1, drawFn, layer }); ELS.sort((a, b) => a.layer - b.layer); }
/* in/out envelope: pin (0..1 with overshoot) and pout (0..1) */
const life = (t, t0, t1, din = .32, dout = .22) => ({ pin: prog(t, t0, din), pout: t1 == null ? 0 : prog(t, t1, dout) });
function popXform(t, t0, t1, x, y, o = {}) {
  const { pin, pout } = life(t, t0, t1);
  if (pin <= 0 || pout >= 1) return false;
  const s = lerp(.2, 1, o.enter === 'drop' ? eo(pin) : eback(pin)) * (1 - eio(pout)) * (o.s || 1);
  const bob = o.bob === false ? 0 : Math.sin((t - t0) * 2.4 + (o.seed || 0)) * 8;
  const dy = o.enter === 'drop' ? (1 - eo(pin)) * -500 : (1 - eo(pin)) * 60;
  ctx.translate(x, y + dy + bob);
  ctx.rotate((o.rot || 0) + (1 - eo(pin)) * (o.spin ? 6.28 : .5) * (o.seed % 2 ? 1 : -1) + eio(pout) * .6);
  ctx.scale(s, s);
  ctx.globalAlpha = clamp(pin * 3) * (1 - pout);
  return true;
}

/* ---------- icons (drawn in a 200x200 box around 0,0) ---------- */
function shape(path, fill, o = {}) {
  ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  if (o.shadow !== false) { ctx.save(); ctx.translate(11, 11); ctx.fillStyle = C.ink; path(); ctx.fill(); if (o.strokeOnly) { ctx.strokeStyle = C.ink; ctx.lineWidth = o.lw || 10; ctx.stroke(); } ctx.restore(); }
  path(); if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  ctx.strokeStyle = C.ink; ctx.lineWidth = o.lw || 10; ctx.stroke(); ctx.restore();
}
const P = f => () => { ctx.beginPath(); f(); };
const glyph = (str, x, y, size, color = C.ink) => { ctx.save(); ctx.font = font(size, 800); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = color; ctx.fillText(str, x, y + size * .04); ctx.restore(); };
const ICONS = {
  phone: () => { shape(P(() => ctx.roundRect(-58, -96, 116, 192, 24)), C.white); shape(P(() => ctx.roundRect(-42, -74, 84, 128, 10)), C.violet, { shadow: false, lw: 6 }); shape(P(() => ctx.arc(0, 76, 9, 0, 7)), C.ink, { shadow: false, lw: 2 }); },
  coin: () => { shape(P(() => ctx.arc(0, 0, 86, 0, 7)), C.lime); ctx.save(); ctx.setLineDash([12, 12]); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.arc(0, 0, 60, 0, 7); ctx.stroke(); ctx.restore(); glyph('+1', 0, 2, 74); },
  clock: () => { shape(P(() => ctx.arc(0, 0, 86, 0, 7)), C.white); for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(Math.cos(a) * 64, Math.sin(a) * 64, i % 3 ? 4 : 7, 0, 7); ctx.fill(); } shape(P(() => { ctx.moveTo(0, 0); ctx.lineTo(0, -48); ctx.moveTo(0, 0); ctx.lineTo(36, 18); }), null, { shadow: false, lw: 11 }); },
  bell: () => { shape(P(() => { ctx.moveTo(-70, 50); ctx.quadraticCurveTo(-58, 30, -58, -10); ctx.quadraticCurveTo(-58, -78, 0, -80); ctx.quadraticCurveTo(58, -78, 58, -10); ctx.quadraticCurveTo(58, 30, 70, 50); ctx.closePath(); }), C.orange); shape(P(() => ctx.arc(0, 66, 18, 0, 7)), C.orange, { shadow: false }); shape(P(() => ctx.arc(56, -66, 30, 0, 7)), C.pink, { shadow: false, lw: 7 }); glyph('1', 56, -64, 38, C.white); },
  heart: () => shape(P(() => { ctx.moveTo(0, 80); ctx.bezierCurveTo(-120, 0, -80, -95, 0, -40); ctx.bezierCurveTo(80, -95, 120, 0, 0, 80); }), C.pink),
  eye: () => { shape(P(() => { ctx.moveTo(-95, 0); ctx.quadraticCurveTo(0, -95, 95, 0); ctx.quadraticCurveTo(0, 95, -95, 0); }), C.white); shape(P(() => ctx.arc(0, 0, 36, 0, 7)), C.violet, { shadow: false, lw: 7 }); shape(P(() => ctx.arc(0, 0, 14, 0, 7)), C.ink, { shadow: false, lw: 2 }); },
  trophy: () => { shape(P(() => { ctx.moveTo(-60, -80); ctx.lineTo(60, -80); ctx.lineTo(52, -10); ctx.quadraticCurveTo(40, 30, 0, 32); ctx.quadraticCurveTo(-40, 30, -52, -10); ctx.closePath(); }), C.orange); shape(P(() => { ctx.moveTo(-18, 32); ctx.lineTo(18, 32); ctx.lineTo(22, 62); ctx.lineTo(-22, 62); ctx.closePath(); }), C.orange, { shadow: false }); shape(P(() => ctx.roundRect(-52, 60, 104, 28, 8)), C.lime, { shadow: false }); shape(P(() => { ctx.moveTo(-58, -64); ctx.quadraticCurveTo(-100, -60, -66, -8); ctx.moveTo(58, -64); ctx.quadraticCurveTo(100, -60, 66, -8); }), null, { shadow: false, lw: 10 }); },
  crown: () => { shape(P(() => { ctx.moveTo(-90, 60); ctx.lineTo(-90, -50); ctx.lineTo(-45, 0); ctx.lineTo(0, -75); ctx.lineTo(45, 0); ctx.lineTo(90, -50); ctx.lineTo(90, 60); ctx.closePath(); }), C.lime); [[-90, -50], [0, -75], [90, -50]].forEach(([x, y]) => shape(P(() => ctx.arc(x, y, 12, 0, 7)), C.pink, { shadow: false, lw: 6 })); },
  lock: () => { shape(P(() => { ctx.moveTo(-46, -10); ctx.lineTo(-46, -40); ctx.arc(0, -40, 46, Math.PI, 0); ctx.lineTo(46, -10); }), null, { strokeOnly: true, lw: 22 }); shape(P(() => { ctx.moveTo(-46, -10); ctx.lineTo(-46, -40); ctx.arc(0, -40, 46, Math.PI, 0); ctx.lineTo(46, -10); }), null, { shadow: false, lw: 12 }); shape(P(() => ctx.roundRect(-72, -14, 144, 104, 18)), C.orange); shape(P(() => ctx.arc(0, 30, 13, 0, 7)), C.ink, { shadow: false, lw: 2 }); },
  chartUp: () => { shape(P(() => ctx.roundRect(-90, -90, 180, 180, 26)), C.white); shape(P(() => { ctx.moveTo(-60, 50); ctx.lineTo(-18, 6); ctx.lineTo(12, 28); ctx.lineTo(60, -40); }), null, { shadow: false, lw: 14 }); shape(P(() => { ctx.moveTo(62, -42); ctx.lineTo(28, -40); ctx.lineTo(60, -8); ctx.closePath(); }), C.ink, { shadow: false, lw: 8 }); },
  chartDown: () => { shape(P(() => ctx.roundRect(-90, -90, 180, 180, 26)), C.white); shape(P(() => { ctx.moveTo(-60, -40); ctx.lineTo(-18, 4); ctx.lineTo(12, -18); ctx.lineTo(60, 50); }), null, { shadow: false, lw: 14 }); shape(P(() => { ctx.moveTo(62, 52); ctx.lineTo(28, 50); ctx.lineTo(60, 18); ctx.closePath(); }), C.pink, { shadow: false, lw: 8 }); },
  megaphone: () => { shape(P(() => { ctx.moveTo(-70, -26); ctx.lineTo(50, -80); ctx.lineTo(50, 80); ctx.lineTo(-70, 26); ctx.closePath(); }), C.cyan); shape(P(() => ctx.roundRect(-96, -30, 30, 60, 10)), C.white, { shadow: false }); shape(P(() => { ctx.moveTo(-50, 26); ctx.lineTo(-36, 80); ctx.lineTo(-10, 80); ctx.lineTo(-18, 36); }), C.white, { shadow: false }); },
  target: () => { shape(P(() => ctx.arc(0, 0, 88, 0, 7)), C.pink); shape(P(() => ctx.arc(0, 0, 58, 0, 7)), C.white, { shadow: false }); shape(P(() => ctx.arc(0, 0, 28, 0, 7)), C.pink, { shadow: false }); },
  house: () => { shape(P(() => { ctx.moveTo(-85, -5); ctx.lineTo(0, -85); ctx.lineTo(85, -5); ctx.lineTo(66, -5); ctx.lineTo(66, 84); ctx.lineTo(-66, 84); ctx.lineTo(-66, -5); ctx.closePath(); }), C.cyan); shape(P(() => ctx.roundRect(-20, 24, 40, 60, 6)), C.lime, { shadow: false }); },
  briefcase: () => { shape(P(() => ctx.roundRect(-34, -84, 68, 40, 10)), null, { strokeOnly: true, lw: 14 }); shape(P(() => ctx.roundRect(-90, -54, 180, 134, 18)), C.orange); shape(P(() => { ctx.moveTo(-90, 0); ctx.lineTo(90, 0); }), null, { shadow: false, lw: 8 }); shape(P(() => ctx.roundRect(-16, -12, 32, 26, 6)), C.lime, { shadow: false, lw: 6 }); },
  people: () => { shape(P(() => { ctx.arc(-38, -36, 30, 0, 7); }), C.pink); shape(P(() => { ctx.moveTo(-96, 70); ctx.quadraticCurveTo(-96, 6, -38, 6); ctx.quadraticCurveTo(20, 6, 20, 70); ctx.closePath(); }), C.pink); shape(P(() => ctx.arc(40, -26, 30, 0, 7)), C.cyan); shape(P(() => { ctx.moveTo(-18, 84); ctx.quadraticCurveTo(-18, 18, 40, 18); ctx.quadraticCurveTo(98, 18, 98, 84); ctx.closePath(); }), C.cyan); },
  gift: () => { shape(P(() => ctx.roundRect(-80, -30, 160, 112, 12)), C.pink); shape(P(() => ctx.roundRect(-90, -62, 180, 40, 10)), C.pink, { shadow: false }); shape(P(() => ctx.rect(-14, -62, 28, 144)), C.lime, { shadow: false, lw: 7 }); shape(P(() => { ctx.ellipse(-28, -78, 26, 16, -.5, 0, 7); ctx.moveTo(56, -78); ctx.ellipse(28, -78, 26, 16, .5, 0, 7); }), C.lime, { shadow: false, lw: 7 }); },
  die: () => { shape(P(() => ctx.roundRect(-82, -82, 164, 164, 34)), C.pink); [[-40, -40], [40, -40], [0, 0], [-40, 40], [40, 40]].forEach(([x, y]) => { ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(x, y, 14, 0, 7); ctx.fill(); }); },
  pawn: () => shape(P(() => { ctx.arc(0, -52, 34, 0, 7); ctx.moveTo(-26, -24); ctx.lineTo(26, -24); ctx.lineTo(40, 50); ctx.lineTo(66, 50); ctx.lineTo(66, 88); ctx.lineTo(-66, 88); ctx.lineTo(-66, 50); ctx.lineTo(-40, 50); ctx.closePath(); }), C.cyan),
  star: () => shape(P(() => { for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 40 : 92; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.closePath(); }), C.orange),
  cursor: () => shape(P(() => { ctx.moveTo(-50, -86); ctx.lineTo(62, 2); ctx.lineTo(10, 12); ctx.lineTo(40, 70); ctx.lineTo(16, 82); ctx.lineTo(-14, 24); ctx.lineTo(-50, 58); ctx.closePath(); }), C.white),
  check: () => { shape(P(() => ctx.arc(0, 0, 86, 0, 7)), C.lime); shape(P(() => { ctx.moveTo(-42, 2); ctx.lineTo(-10, 36); ctx.lineTo(46, -34); }), null, { shadow: false, lw: 20 }); },
  cross: () => { shape(P(() => ctx.arc(0, 0, 86, 0, 7)), C.pink); shape(P(() => { ctx.moveTo(-36, -36); ctx.lineTo(36, 36); ctx.moveTo(36, -36); ctx.lineTo(-36, 36); }), null, { shadow: false, lw: 20 }); },
  question: () => { shape(P(() => ctx.arc(0, 0, 86, 0, 7)), C.white); glyph('?', 0, 4, 130, C.violet); },
  warning: () => { shape(P(() => { ctx.moveTo(0, -88); ctx.lineTo(94, 76); ctx.lineTo(-94, 76); ctx.closePath(); }), C.orange); glyph('!', 0, 14, 110); },
  lightning: () => shape(P(() => { ctx.moveTo(20, -96); ctx.lineTo(-60, 14); ctx.lineTo(-6, 14); ctx.lineTo(-24, 96); ctx.lineTo(62, -18); ctx.lineTo(8, -18); ctx.closePath(); }), C.lime),
  fire: () => { shape(P(() => { ctx.moveTo(0, -96); ctx.bezierCurveTo(70, -30, 84, 20, 60, 56); ctx.quadraticCurveTo(30, 92, 0, 92); ctx.quadraticCurveTo(-30, 92, -60, 56); ctx.bezierCurveTo(-84, 20, -40, -10, -30, -40); ctx.quadraticCurveTo(-10, -10, 0, -96); }), C.orange); shape(P(() => { ctx.moveTo(0, 0); ctx.quadraticCurveTo(36, 30, 28, 60); ctx.quadraticCurveTo(14, 80, 0, 80); ctx.quadraticCurveTo(-14, 80, -28, 60); ctx.quadraticCurveTo(-30, 30, 0, 0); }), C.lime, { shadow: false, lw: 7 }); },
  snake: () => { const p = P(() => { ctx.moveTo(-80, 70); ctx.bezierCurveTo(-20, 110, 40, 40, 0, 0); ctx.bezierCurveTo(-40, -40, 10, -100, 60, -60); }); ctx.save(); ctx.translate(10, 10); ctx.strokeStyle = C.ink; ctx.lineWidth = 46; ctx.lineCap = 'round'; p(); ctx.stroke(); ctx.restore(); ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.ink; ctx.lineWidth = 46; p(); ctx.stroke(); ctx.strokeStyle = C.lime; ctx.lineWidth = 30; p(); ctx.stroke(); ctx.restore(); shape(P(() => ctx.ellipse(66, -64, 34, 26, -.4, 0, 7)), C.lime, { shadow: false }); ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(76, -72, 6, 0, 7); ctx.fill(); shape(P(() => { ctx.moveTo(96, -56); ctx.lineTo(116, -48); ctx.moveTo(96, -56); ctx.lineTo(112, -36); }), null, { shadow: false, lw: 5 }); },
  fish: () => { shape(P(() => { ctx.ellipse(-10, 0, 70, 46, 0, 0, 7); ctx.moveTo(56, 0); ctx.lineTo(96, -40); ctx.lineTo(96, 40); ctx.closePath(); }), C.cyan); ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(-46, -8, 8, 0, 7); ctx.fill(); },
  scale: () => { shape(P(() => { ctx.moveTo(0, -80); ctx.lineTo(0, 76); ctx.moveTo(-86, -50); ctx.lineTo(86, -50); ctx.moveTo(-40, 80); ctx.lineTo(40, 80); }), null, { lw: 12 }); shape(P(() => { ctx.moveTo(-120, 10); ctx.quadraticCurveTo(-86, 54, -52, 10); ctx.closePath(); }), C.lime, { shadow: false }); shape(P(() => { ctx.moveTo(52, 10); ctx.quadraticCurveTo(86, 54, 120, 10); ctx.closePath(); }), C.pink, { shadow: false }); shape(P(() => { ctx.moveTo(-86, -50); ctx.lineTo(-112, 10); ctx.moveTo(-86, -50); ctx.lineTo(-60, 10); ctx.moveTo(86, -50); ctx.lineTo(60, 10); ctx.moveTo(86, -50); ctx.lineTo(112, 10); }), null, { shadow: false, lw: 5 }); },
  magnet: () => { shape(P(() => { ctx.moveTo(-76, -60); ctx.lineTo(-76, 10); ctx.arc(0, 10, 76, Math.PI, 0, true); ctx.lineTo(76, -60); ctx.lineTo(36, -60); ctx.lineTo(36, 10); ctx.arc(0, 10, 36, 0, Math.PI); ctx.lineTo(-36, -60); ctx.closePath(); }), C.pink); shape(P(() => { ctx.rect(-76, -84, 40, 28); ctx.rect(36, -84, 40, 28); }), C.white, { shadow: false }); },
  hourglass: () => { shape(P(() => { ctx.moveTo(-60, -86); ctx.lineTo(60, -86); ctx.lineTo(8, 0); ctx.lineTo(60, 86); ctx.lineTo(-60, 86); ctx.lineTo(-8, 0); ctx.closePath(); }), C.white); shape(P(() => { ctx.moveTo(-34, 70); ctx.lineTo(34, 70); ctx.lineTo(0, 30); ctx.closePath(); }), C.orange, { shadow: false, lw: 5 }); },
  key: () => { shape(P(() => { ctx.arc(-46, 0, 42, 0, 7); }), C.lime); shape(P(() => { ctx.rect(-6, -14, 104, 28); ctx.rect(62, 14, 16, 26); ctx.rect(84, 14, 14, 18); }), C.lime); ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(-46, 0, 14, 0, 7); ctx.fill(); },
  thought: () => { shape(P(() => { ctx.ellipse(10, -14, 86, 60, 0, 0, 7); }), C.white); shape(P(() => ctx.arc(-60, 64, 18, 0, 7)), C.white, { shadow: false }); shape(P(() => ctx.arc(-86, 92, 10, 0, 7)), C.white, { shadow: false }); [-30, 10, 50].forEach(x => { ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(x, -14, 10, 0, 7); ctx.fill(); }); },
  arrow: () => shape(P(() => { ctx.moveTo(-90, -24); ctx.lineTo(20, -24); ctx.lineTo(20, -66); ctx.lineTo(96, 0); ctx.lineTo(20, 66); ctx.lineTo(20, 24); ctx.lineTo(-90, 24); ctx.closePath(); }), C.lime),
  medal: () => { shape(P(() => { ctx.moveTo(-40, -96); ctx.lineTo(-6, -20); ctx.lineTo(-30, -14); ctx.lineTo(-62, -90); ctx.closePath(); ctx.moveTo(40, -96); ctx.lineTo(6, -20); ctx.lineTo(30, -14); ctx.lineTo(62, -90); ctx.closePath(); }), C.cyan); shape(P(() => ctx.arc(0, 28, 62, 0, 7)), C.lime); glyph('1', 0, 30, 70); },
  handshake: () => { shape(P(() => { ctx.moveTo(-96, -20); ctx.lineTo(-40, -50); ctx.lineTo(10, -30); ctx.lineTo(-20, 0); ctx.lineTo(10, 30); ctx.lineTo(-30, 40); ctx.lineTo(-96, 20); ctx.closePath(); }), C.orange); shape(P(() => { ctx.moveTo(96, -20); ctx.lineTo(40, -50); ctx.lineTo(-14, -20); ctx.lineTo(16, 10); ctx.lineTo(-10, 40); ctx.lineTo(40, 50); ctx.lineTo(96, 20); ctx.closePath(); }), C.cyan); },
};

/* ---------- stage primitives (scene.js calls these at load) ---------- */
/* sticker icon: name from ICONS; o: {x, y, s, rot, enter:'pop'|'drop', spin, sfx} */
function icon(name, t0, t1, o = {}) {
  if (!ICONS[name]) throw new Error('unknown icon ' + name);
  const x = o.x ?? STAGE.cx, y = o.y ?? 1280, seed = ELS.length;
  if (o.sfx !== false) cue(t0, o.enter === 'drop' ? 'thud' : 'pop', { f: 1 + rnd(seed) * .5 });
  el(t0, t1, t => { ctx.save(); if (popXform(t, t0, t1, x, y, { ...o, s: (o.s ?? 1) * 1.2, seed })) ICONS[name](); ctx.restore(); }, o.layer || 1);
}
/* big word block that slams onto the stage with a shake */
function slam(text, t0, t1, o = {}) {
  const y = o.y ?? 1280, x = o.x ?? STAGE.cx, maxW = o.maxW ?? STAGE.w - 60;
  const size = fit(text, maxW - 60, o.size || 120), fill = o.bg || C.lime, color = o.color || C.ink, rot = o.rot ?? -.04;
  if (o.sfx !== false) { cue(t0, 'impact', { v: .8 }); shake(t0 + .05, o.shake ?? 10); }
  el(t0, t1, t => {
    const { pin, pout } = life(t, t0, t1, .26);
    if (pin <= 0 || pout >= 1) return;
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); const s = lerp(2.4, 1, eo(pin)) * (1 - eio(pout)); ctx.scale(s, s); ctx.globalAlpha = clamp(pin * 4) * (1 - pout);
    ctx.font = font(size); const w = ctx.measureText(text).width + 60, h = size * 1.25;
    pill(-w / 2, -h / 2, w, h, fill, { r: 26, shadow: 12, lw: 7 });
    stext(text, 0, 4, size, { color, stroke: 0, shadow: 0 });
    ctx.restore();
  }, o.layer || 2);
}
/* two options face off; winner ('a'|'b') gets a check at tWin, loser greys out */
function versus(t0, t1, a, b, o = {}) {
  const y = o.y ?? 1270, cw = 300, ch = 240;
  cue(t0, 'whoosh', { v: .8 }); cue(t0 + .18, 'pop', { f: 1.1 }); cue(t0 + .32, 'pop', { f: 1.4 });
  if (o.winner) cue(o.tWin, 'chime', { n: 76 });
  el(t0, t1, t => {
    const sides = [[a, STAGE.cx - 172, o.ca || C.white, -.05, 0], [b, STAGE.cx + 172, o.cb || C.cyan, .05, .14]];
    sides.forEach(([txt, x, fill, rot, d], k) => {
      const { pin, pout } = life(t, t0 + d, t1);
      if (pin <= 0 || pout >= 1) return;
      const lose = o.winner && t > o.tWin && (o.winner === 'a' ? k === 1 : k === 0), win = o.winner && t > o.tWin && !lose;
      ctx.save(); ctx.translate(x + (1 - eo(pin)) * (k ? 500 : -500), y); ctx.rotate(rot + (win ? Math.sin((t - o.tWin) * 8) * .03 * Math.exp(-(t - o.tWin) * 2) : 0));
      const s = (1 - eio(pout)) * (win ? 1 + .08 * eback(prog(t, o.tWin, .3)) : 1); ctx.scale(s, s); ctx.globalAlpha = lose ? .45 : 1;
      pill(-cw / 2, -ch / 2, cw, ch, fill, { r: 28, shadow: 10, lw: 6 });
      const lines = wrap(txt, cw - 90, 54), size = Math.min(54, ...lines.map(l => fit(l, cw - 90, 54)));
      lines.slice(0, 3).forEach((l, i) => stext(l, 0, (i - (Math.min(3, lines.length) - 1) / 2) * size * 1.05 + 4, size, { color: C.ink, stroke: 0, shadow: 0 }));
      ctx.restore();
      if (win) { ctx.save(); ctx.translate(x + 110, y - 110); const q = eback(prog(t, o.tWin, .3)); ctx.scale(q * .45, q * .45); ICONS.check(); ctx.restore(); }
      if (lose) { ctx.save(); ctx.translate(x + 110, y - 110); const q = eback(prog(t, o.tWin, .3)); ctx.scale(q * .45, q * .45); ICONS.cross(); ctx.restore(); }
    });
    const { pin, pout } = life(t, t0 + .25, t1);
    if (pin > 0 && pout < 1) { ctx.save(); ctx.translate(STAGE.cx, y); ctx.rotate(-.1); const s = eback(pin) * (1 - eio(pout)); ctx.scale(s, s); pill(-44, -44, 88, 88, C.ink, { r: 44, shadow: 0, lw: 0 }); stext('VS', 0, 4, 40, { color: C.lime, stroke: 0, shadow: 0 }); ctx.restore(); }
  }, o.layer || 2);
}
/* number that counts from→to with ticks; label under it */
function counter(t0, t1, from, to, o = {}) {
  const y = o.y ?? 1250, d = o.dur ?? 1.2, ticks = Math.min(14, Math.abs(to - from));
  for (let i = 0; i < ticks; i++) cue(t0 + d * eo(i / ticks), 'tick', { f: i % 3 });
  cue(t0 + d, 'pop', { f: 1.6 });
  el(t0, t1, t => {
    const { pin, pout } = life(t, t0, t1);
    if (pin <= 0 || pout >= 1) return;
    const v = Math.round(lerp(from, to, eo(prog(t, t0, d))));
    ctx.save(); ctx.translate(STAGE.cx, y); const s = eback(pin) * (1 - eio(pout)); ctx.scale(s, s); ctx.globalAlpha = 1 - pout;
    const str = (o.prefix || '') + v.toLocaleString('en-US') + (o.suffix || ''), size = fit(str, STAGE.w - 40, o.size || 190);
    stext(str, 0, 0, size, { color: o.color || C.lime });
    if (o.label) stext(o.label.toUpperCase(), 0, size * .72, fit(o.label.toUpperCase(), STAGE.w - 40, 40, 700, 'mono', 3), { kind: 'mono', track: 3, color: C.white, stroke: 8, shadow: 4 });
    ctx.restore();
  }, o.layer || 2);
}
/* checklist: items = [[text, t], ...]; each row pops with a check (or cross if text starts with "x:") */
function list(t1, items, o = {}) {
  const y0 = o.y ?? 1090, gap = o.gap ?? 128;
  items.forEach(([raw, t], i) => {
    const bad = raw.startsWith('x:'), text = raw.replace(/^x:/, ''), y = y0 + i * gap;
    cue(t, 'pop', { f: 1 + i * .15 });
    el(t, t1, tt => {
      const { pin, pout } = life(tt, t, t1);
      if (pin <= 0 || pout >= 1) return;
      ctx.save(); ctx.translate(STAGE.cx + (1 - eo(pin)) * -300, y); ctx.globalAlpha = clamp(pin * 3) * (1 - pout);
      const size = fit(text, STAGE.w - 190, 58), w = STAGE.w - 40;
      pill(-w / 2, -48, w, 96, o.fill || C.white, { r: 22, shadow: 8, lw: 5 });
      ctx.save(); ctx.translate(-w / 2 + 52, 0); ctx.scale(.3 * eback(prog(tt, t + .1, .3)), .3 * eback(prog(tt, t + .1, .3))); (bad ? ICONS.cross : ICONS.check)(); ctx.restore();
      stext(text, -w / 2 + 104, 3, size, { align: 'left', color: C.ink, stroke: 0, shadow: 0 });
      ctx.restore();
    }, o.layer || 2);
  });
}
/* chat bubble on the stage; side 'left' (pink) or 'right' (lime) */
function bubble(t0, t1, text, o = {}) {
  const right = o.side === 'right', y = o.y ?? 1200, maxW = 520;
  cue(t0, 'blip', { n: right ? 79 : 74 });
  el(t0, t1, t => {
    const { pin, pout } = life(t, t0, t1, .28);
    if (pin <= 0 || pout >= 1) return;
    const lines = wrap(text, maxW - 60, 50), w = Math.min(maxW, Math.max(...lines.map(l => { ctx.font = font(50); return ctx.measureText(l).width; })) + 64), h = lines.length * 58 + 44;
    const x = right ? STAGE.cx + STAGE.w / 2 - w - 10 : STAGE.cx - STAGE.w / 2 + 10;
    ctx.save(); ctx.translate(x + (right ? w : 0), y); const s = eback(pin) * (1 - eio(pout)); ctx.scale(s, s); ctx.translate(-(right ? w : 0), 0); ctx.globalAlpha = 1 - pout;
    pill(0, 0, w, h, o.fill || (right ? C.lime : C.pink), { r: 30, shadow: 8, lw: 5 });
    lines.forEach((l, i) => stext(l, 32, 22 + 29 + i * 58, 50, { align: 'left', color: C.ink, stroke: 0, shadow: 0, weight: 700 }));
    ctx.restore();
  }, o.layer || 2);
}
/* scrambled text that decodes left to right (the show's signature move) */
function decode(text, t0, t1, o = {}) {
  const y = o.y ?? 1280, dur = o.dur ?? .9, size = fit(text, STAGE.w - 40, o.size || 110), G = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789$%#?';
  for (let i = 0; i < 8; i++) cue(t0 + i * dur / 8, 'tick', { f: i % 3 });
  cue(t0 + dur, 'chime', { n: 81 });
  el(t0, t1, t => {
    const { pin, pout } = life(t, t0, t1, .15);
    if (pin <= 0 || pout >= 1) return;
    const solved = Math.floor(prog(t, t0, dur) * text.length), frameN = Math.floor(t * 20);
    const s = text.split('').map((c, i) => i < solved || c === ' ' ? c : G[Math.floor(rnd(i * 31 + frameN) * G.length)]).join('');
    ctx.save(); ctx.globalAlpha = 1 - pout; ctx.translate(STAGE.cx, y); const sc = 1 + .12 * Math.exp(-(t - t0 - dur) * 8) * (t > t0 + dur);
    ctx.scale(sc, sc);
    if (o.bg) { ctx.font = font(size); const w = ctx.measureText(text).width + 60; pill(-w / 2, -size * .65, w, size * 1.3, o.bg, { r: 22, shadow: 10, lw: 6 }); }
    stext(s, 0, 4, size, { color: o.color || (o.bg ? C.ink : C.lime), stroke: o.bg ? 0 : undefined, shadow: o.bg ? 0 : undefined });
    ctx.restore();
  }, o.layer || 2);
}
/* horizontal meter filling from→to (0..1) with a label */
function meter(t0, t1, label, from, to, o = {}) {
  const y = o.y ?? 1300, w = STAGE.w - 40, d = o.dur ?? 1;
  cue(t0, 'riser', { d: d });
  el(t0, t1, t => {
    const { pin, pout } = life(t, t0, t1);
    if (pin <= 0 || pout >= 1) return;
    const v = lerp(from, to, eio(prog(t, t0 + .1, d)));
    ctx.save(); ctx.translate(STAGE.cx, y); ctx.globalAlpha = clamp(pin * 3) * (1 - pout); ctx.scale(lerp(.6, 1, eback(pin)), lerp(.6, 1, eback(pin)));
    stext(label.toUpperCase(), -w / 2, -70, fit(label.toUpperCase(), w, 40, 700, 'mono', 3), { align: 'left', kind: 'mono', track: 3, color: C.white, stroke: 8, shadow: 4 });
    pill(-w / 2, -32, w, 64, C.white, { r: 32, shadow: 8, lw: 5 });
    if (v > .02) pill(-w / 2 + 8, -24, (w - 16) * v, 48, o.color || C.lime, { r: 24, shadow: 0, lw: 0 });
    ctx.restore();
  }, o.layer || 2);
}
/* rubber stamp that thunks on at an angle */
function stamp(text, t0, t1, o = {}) {
  const x = o.x ?? STAGE.cx, y = o.y ?? 1280, color = o.color || C.pink, size = fit(text, 520, o.size || 96);
  cue(t0, 'knock', { v: 1 }); shake(t0, 6);
  el(t0, t1, t => {
    const { pin, pout } = life(t, t0, t1, .18);
    if (pin <= 0 || pout >= 1) return;
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? -.18); const s = lerp(1.8, 1, eo(pin)); ctx.scale(s, s); ctx.globalAlpha = clamp(pin * 4) * (1 - pout);
    ctx.font = font(size); const w = ctx.measureText(text).width + 56, h = size * 1.3;
    ctx.strokeStyle = color; ctx.lineWidth = 10; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 16); ctx.stroke();
    stext(text, 0, 4, size, { color, stroke: 0, shadow: 0 });
    ctx.restore();
  }, o.layer || 3);
}
/* chunky arrow drawn from (x1,y1) to (x2,y2) */
function arrowFx(t0, t1, x1, y1, x2, y2, o = {}) {
  cue(t0, 'swish');
  el(t0, t1, t => {
    const { pout } = life(t, t0, t1), p = eo(prog(t, t0, .4));
    if (p <= 0 || pout >= 1) return;
    const xe = lerp(x1, x2, p), ye = lerp(y1, y2, p), a = Math.atan2(y2 - y1, x2 - x1);
    ctx.save(); ctx.globalAlpha = 1 - pout; ctx.lineCap = 'round';
    for (const [col, lw, off] of [[C.ink, 34, 8], [C.ink, 34, 0], [o.color || C.lime, 20, 0]]) {
      ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x1 + off, y1 + off); ctx.lineTo(xe + off, ye + off); ctx.stroke();
    }
    ctx.translate(xe, ye); ctx.rotate(a); shape(P(() => { ctx.moveTo(30, 0); ctx.lineTo(-24, -34); ctx.lineTo(-24, 34); ctx.closePath(); }), o.color || C.lime, { lw: 7 });
    ctx.restore();
  }, o.layer || 1);
}
/* sticker confetti burst */
function burstFx(t, x = STAGE.cx, y = 1260, o = {}) {
  cue(t, 'pop', { f: 1.8 }); cue(t + .04, 'chime', { n: 84 });
  const n = o.n || 18, cols = [C.lime, C.pink, C.cyan, C.orange, C.white];
  el(t, t + 1.4, tt => {
    const dt = tt - t; if (dt < 0 || dt > 1.4) return;
    for (let i = 0; i < n; i++) {
      const a = rnd(i + t) * 6.28, sp = 700 + 600 * rnd(i * 3 + t), d = sp * (1 - Math.exp(-dt * 4)) / 4;
      ctx.save(); ctx.translate(x + Math.cos(a) * d, y + Math.sin(a) * d + 500 * dt * dt); ctx.rotate(dt * (4 + i)); ctx.globalAlpha = 1 - dt / 1.4;
      ctx.fillStyle = cols[i % cols.length]; ctx.strokeStyle = C.ink; ctx.lineWidth = 4;
      ctx.beginPath(); if (i % 3 === 0) ctx.arc(0, 0, 14, 0, 7); else if (i % 3 === 1) ctx.rect(-12, -12, 24, 24); else { ctx.moveTo(0, -16); ctx.lineTo(15, 12); ctx.lineTo(-15, 12); ctx.closePath(); }
      ctx.fill(); ctx.stroke(); ctx.restore();
    }
  }, o.layer || 4);
}
/* free-form: draw(t, p) with p = in-progress (0..1, overshoot) inside your own transform */
function custom(t0, t1, drawFn, o = {}) {
  el(t0, t1, t => { const { pin, pout } = life(t, t0, t1); if (pin <= 0 || pout >= 1) return; ctx.save(); ctx.globalAlpha = 1 - pout; drawFn(t, eback(pin), pout); ctx.restore(); }, o.layer || 1);
}

/* ---------- background ---------- */
const dots = (() => { const c = document.createElement('canvas'); c.width = c.height = 44; const g = c.getContext('2d'); g.fillStyle = 'rgba(255,255,255,0.17)'; g.beginPath(); g.arc(22, 22, 2.6, 0, 7); g.fill(); return c; })();
const dotsDark = (() => { const c = document.createElement('canvas'); c.width = c.height = 44; const g = c.getContext('2d'); g.fillStyle = 'rgba(14,13,18,0.13)'; g.beginPath(); g.arc(22, 22, 2.6, 0, 7); g.fill(); return c; })();
const isLight = col => [C.lime, C.cyan, C.white, C.paper, C.orange, C.pink, C.lilac].includes(col);
function bgAt(t) { let cur = BG[0]; for (const b of BG) if (b[0] <= t) cur = b; return cur; }
function background(t) {
  let base = BG[0];
  for (let i = 1; i < BG.length; i++) {
    const b = BG[i], p = prog(t, b[0], .45);
    if (p <= 0) break;
    if (p >= 1) { base = b; continue; }
    ctx.fillStyle = base[1]; ctx.fillRect(0, 0, W, H); paintDots(base[1], t);
    ctx.save(); ctx.beginPath(); ctx.arc(b[2], b[3], eio(p) * 2300, 0, 7); ctx.clip(); ctx.fillStyle = b[1]; ctx.fillRect(0, 0, W, H); paintDots(b[1], t); ctx.restore();
    return;
  }
  ctx.fillStyle = base[1]; ctx.fillRect(0, 0, W, H); paintDots(base[1], t);
}
function paintDots(col, t) { ctx.save(); ctx.fillStyle = ctx.createPattern(isLight(col) ? dotsDark : dots, 'repeat'); ctx.translate(-(t * 10) % 44, -(t * 16) % 44); ctx.fillRect(0, 0, W + 44, H + 44); ctx.restore(); }
/* faint drifting shapes for life in empty space */
function ambient(t) {
  ctx.save();
  for (let i = 0; i < 9; i++) {
    const x = (rnd(i) * W + t * (12 + 10 * rnd(i + 5))) % (W + 200) - 100, y = 1000 + rnd(i + 9) * 620 + Math.sin(t + i) * 20;
    ctx.globalAlpha = .1; ctx.translate(x, y); ctx.rotate(t * .3 + i);
    ctx.strokeStyle = C.white; ctx.lineWidth = 5; ctx.beginPath();
    if (i % 3 === 0) ctx.arc(0, 0, 22, 0, 7); else if (i % 3 === 1) ctx.rect(-18, -18, 36, 36); else { ctx.moveTo(0, -22); ctx.lineTo(20, 14); ctx.lineTo(-20, 14); ctx.closePath(); }
    ctx.stroke(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  ctx.restore();
}

/* ---------- camera ---------- */
function camera(t) {
  let sx = 0, sy = 0, z = 1 + .025 * Math.sin(t * .35);
  IMPACTS.forEach(([ti, amp]) => {
    const dt = t - ti; if (dt < 0 || dt > .6) return;
    const e = Math.exp(-dt * 10);
    sx += amp * e * Math.sin(dt * 80); sy += amp * e * Math.cos(dt * 66); z += amp * .003 * Math.exp(-dt * 14);
  });
  ctx.translate(W / 2 + sx, H / 2 + sy); ctx.scale(z, z); ctx.translate(-W / 2, -H / 2);
}

/* ---------- HUD: show chip, level chip, XP bar ---------- */
function hud(t) {
  const a = 1 - prog(t, VOICE_END - .1, .3); if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a;
  const w = chip('LEVEL ' + String(CLIP.chapter).padStart(2, '0'), SAFE.left, 286, C.lime, C.ink, 28);
  chip('INCENTIVES, DECODED', SAFE.left + w + 18, 286, C.white, C.ink, 28);
  const bx = SAFE.left, by = 376, bw = SAFE.right - SAFE.left, p = clamp(t / VOICE_END);
  pill(bx, by, bw, 22, 'rgba(255,255,255,0.25)', { r: 11, shadow: 0, lw: 4 });
  if (p > .01) pill(bx + 4, by + 4, (bw - 8) * p, 14, C.lime, { r: 7, shadow: 0, lw: 0 });
  ctx.restore();
}
/* hook headline: on screen from frame 0 (it is the thumbnail), stays as the title */
function hook(t) {
  const a = 1 - prog(t, VOICE_END - .1, .3); if (a <= 0 || !HOOK) return;
  const maxW = SAFE.right - SAFE.left - 40;
  let size = 76, lines = wrap(HOOK, maxW, size);
  while (lines.length > 2 && size > 50) { size -= 4; lines = wrap(HOOK, maxW, size); }
  const h = lines.length * size * 1.08 + 44, w = Math.min(maxW + 40, Math.max(...lines.map(l => { ctx.font = font(size); return ctx.measureText(l).width; })) + 60);
  const s = 1 + .06 * (1 - eo(prog(t, 0, .5))), y = 430;
  ctx.save(); ctx.globalAlpha = a; ctx.translate(W / 2, y + h / 2); ctx.rotate(-.018); ctx.scale(s, s);
  pill(-w / 2, -h / 2, w, h, C.white, { r: 26, shadow: 10, lw: 6 });
  lines.forEach((l, i) => stext(l, 0, (i - (lines.length - 1) / 2) * size * 1.08 + 4, size, { color: C.ink, stroke: 0, shadow: 0 }));
  ctx.restore();
}

/* ---------- captions: word-by-word, speaker tag, active-word highlight ---------- */
const CAP = { y: 700, size: 92, maxW: SAFE.right - SAFE.left - 20, lines: 2 };
let CHUNKS = [];
function capLines(ws) {
  const gap = CAP.size * .36; let n = 1, lw = 0;
  ws.forEach((w, i) => { ctx.font = font(CAP.size * (w.emph ? 1.08 : 1)); const ww = ctx.measureText(w.w).width; if (i && lw + gap + ww > CAP.maxW) { n++; lw = ww; } else lw += (i ? gap : 0) + ww; });
  return n;
}
function buildChunks() {
  const emph = new Set((typeof EMPH !== 'undefined' ? EMPH : []).map(norm));
  WORDS.forEach((w, i) => { w.i = i; w.emph = emph.has(norm(w.w)); if (w.emph) cue(w.s, 'pop', { f: 1.3 + (i % 3) * .1, v: .6 }); });
  ctx.font = font(CAP.size);
  let cur = null;
  WORDS.forEach((w, i) => {
    const prev = WORDS[i - 1];
    const breakHere = !cur || w.sp !== cur.sp || w.s - prev.e > .45 || CLIP.joins.some(j => prev.e <= j && w.s >= j - .01) ||
      (/[.?!:]$/.test(prev.w) && cur.words.length >= 2) || cur.words.length >= 7;
    if (!breakHere) {
      if (capLines(cur.words.concat(w)) > CAP.lines) { CHUNKS.push(cur); cur = null; }
    } else if (cur) { CHUNKS.push(cur); cur = null; }
    if (!cur) cur = { sp: w.sp, words: [] };
    cur.words.push(w);
  });
  if (cur) CHUNKS.push(cur);
  CHUNKS.forEach(c => { c.t0 = c.words[0].s - .05; });
  CHUNKS.forEach((c, k) => { const nx = CHUNKS[k + 1]; c.t1 = Math.min(nx ? nx.t0 : 1e9, c.words[c.words.length - 1].e + .8); });
  /* lay out words once, with generous gaps so highlight pills never touch */
  CHUNKS.forEach(c => {
    const gap = CAP.size * .36, wd = w => { ctx.font = font(CAP.size * (w.emph ? 1.08 : 1)); return ctx.measureText(w.w).width; };
    const lines = [[]];
    let lw = 0;
    c.words.forEach(w => { const ww = wd(w); if (lines[lines.length - 1].length && lw + gap + ww > CAP.maxW) { lines.push([]); lw = 0; } lw += (lines[lines.length - 1].length ? gap : 0) + ww; lines[lines.length - 1].push(w); w.ww = ww; });
    lines.forEach((ln, li) => {
      const total = ln.reduce((a, w) => a + w.ww, 0) + gap * (ln.length - 1);
      let x = W / 2 - total / 2;
      ln.forEach(w => { w.cx = x + w.ww / 2; w.line = li; w.nlines = lines.length; x += w.ww + gap; });
    });
    c.nlines = lines.length;
  });
}
const SPEAKER = { Alex: C.pink, Jordan: C.cyan };
function captions(t) {
  const c = CHUNKS.find(c => t >= c.t0 && t < c.t1); if (!c || t > VOICE_END) return;
  const light = isLight(bgAt(t)[1]), out = prog(t, c.t1 - .12, .12);
  /* speaker tag */
  const sp = c.sp, flip = eback(prog(t, c.t0, .25));
  ctx.save(); ctx.translate(W / 2, CAP.y - 6); ctx.scale(1, CHUNKS[CHUNKS.indexOf(c) - 1]?.sp === sp ? 1 : flip);
  ctx.font = font(30, 700, 'mono'); ctx.letterSpacing = '4px'; const tw = ctx.measureText(sp.toUpperCase()).width + 100;
  pill(-tw / 2, -30, tw, 60, C.ink, { r: 30, shadow: 0, lw: 4 });
  ctx.fillStyle = SPEAKER[sp] || C.lime; ctx.beginPath(); ctx.arc(-tw / 2 + 32, 0, 15, 0, 7); ctx.fill();
  ctx.fillStyle = C.white; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillText(sp.toUpperCase(), -tw / 2 + 58, 2);
  ctx.restore();
  /* words */
  const baseY = CAP.y + 100;
  c.words.forEach(w => {
    const p = prog(t, w.s - .04, .2); if (p <= 0) return;
    const nx = WORDS[w.i + 1], active = t >= w.s - .02 && t < Math.min(w.e + .06, nx ? nx.s - .02 : 1e9), y = baseY + w.line * CAP.size * 1.12 - out * 40;
    const size = CAP.size * (w.emph ? 1.08 : 1), s = lerp(.55, 1, eback(p)) * (active ? 1.06 : 1);
    ctx.save(); ctx.translate(w.cx, y + (1 - eo(p)) * 30); ctx.scale(s, s); ctx.globalAlpha = clamp(p * 3) * (1 - out);
    if (active) { ctx.save(); ctx.rotate(-.03); pill(-w.ww / 2 - 13, -size * .62, w.ww + 26, size * 1.2, light ? C.ink : C.lime, { r: 18, shadow: 6, lw: 4, shadowColor: light ? C.violet : C.ink }); ctx.restore(); }
    const color = active ? (light ? C.lime : C.ink) : w.emph ? (light ? C.violet : C.lime) : (light ? C.ink : C.white);
    stext(w.w, 0, 4, size, { color, stroke: active || light ? 0 : size * .14, shadow: active || light ? 0 : size * .07 });
    ctx.restore();
  });
}

/* ---------- segment joins: ink + lime swipe ---------- */
function joins(t) {
  CLIP.joins.forEach(tc => {
    const q = prog(t, tc - .3, .6); if (q <= 0 || q >= 1) return;
    const xL = lerp(-2.0 * W, 1.25 * W, eio(q)), wd = 1.7 * W, sk = .3 * W;
    const poly = (x0, x1, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x0 + sk, 0); ctx.lineTo(x1 + sk, 0); ctx.lineTo(x1, H); ctx.lineTo(x0, H); ctx.closePath(); ctx.fill(); };
    poly(xL, xL + wd, C.ink); poly(xL + wd - 10, xL + wd + 40, C.lime); poly(xL - 30, xL + 4, C.pink);
  });
}

/* ---------- end card ---------- */
function endCard(t) {
  const t0 = VOICE_END; if (t < t0 - .05) return;
  const p = prog(t, t0, .5);
  ctx.save(); ctx.beginPath(); ctx.arc(W / 2, 1150, eio(p) * 2300, 0, 7); ctx.clip();
  ctx.fillStyle = C.lime; ctx.fillRect(0, 0, W, H); paintDots(C.lime, t);
  const n = String(CLIP.chapter).padStart(2, '0');
  const pop = (d, f) => { const q = prog(t, t0 + d, .35); if (q <= 0) return; ctx.save(); ctx.globalAlpha = clamp(q * 3); f(eback(q)); ctx.restore(); };
  pop(.15, q => { ctx.translate(W / 2, 330); ctx.scale(q, q); chip('INCENTIVES, DECODED', 0, -30, C.violet, C.white, 34, 'center'); });
  pop(.3, q => {
    const lines = wrap(CLIP.title, 820, 104), size = Math.min(104, ...lines.map(l => fit(l, 820, 104)));
    ctx.translate(W / 2, 470 + (lines.length === 1 ? 50 : 0)); ctx.rotate(-.02); ctx.scale(q, q);
    lines.slice(0, 2).forEach((l, i) => stext(l, 0, i * size * 1.05 + size / 2, size, { color: C.white }));
  });
  pop(.55, q => { ctx.translate(W / 2, 760); ctx.scale(q, q); chip(`FULL ${CLIP.episodeMinutes}-MIN EPISODE · FREE`, 0, -34, C.ink, C.lime, 32, 'center'); });
  pop(.75, q => { ctx.translate(W / 2, 830); ctx.scale(q, q); stext('link in bio', 0, 0, 60, { color: C.ink, stroke: 0, shadow: 0 }); });
  pop(.4, q => { /* level coin: decorative, can sit behind the button column */
    ctx.translate(W / 2, 1180 + Math.sin(t * 3) * 10); ctx.rotate(Math.sin(t * 2) * .08); ctx.scale(q * 1.7, q * 1.7);
    shape(P(() => ctx.arc(0, 0, 92, 0, 7)), C.pink); ctx.save(); ctx.setLineDash([12, 12]); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.arc(0, 0, 68, 0, 7); ctx.stroke(); ctx.restore();
    glyph('LEVEL', 0, -36, 24); glyph(n, 0, 18, 80);
  });
  ['die', 'pawn', 'star'].forEach((k, i) => pop(.6 + i * .12, q => { ctx.translate([250, 830, 300][i] + Math.sin(t * 2 + i) * 8, [1080, 1260, 1420][i]); ctx.rotate([-.3, .25, .15][i]); ctx.scale(q * .55, q * .55); ICONS[k](); }));
  pop(.9, q => { ctx.globalAlpha *= q > 0 ? 1 : 0; ctx.font = font(26, 700, 'mono'); ctx.letterSpacing = '4px'; ctx.textAlign = 'center'; ctx.fillStyle = C.ink; ctx.fillText('PRODUCED BY THE JOY DIGI', STAGE.cx, 1540); });
  ctx.restore();
}

/* ---------- host avatars: fill the stage whenever nothing else is on it ---------- */
const level = t => (CLIP.env || [])[Math.floor(t * 30)] || 0;
const speakerAt = t => { let sp = WORDS[0].sp; for (const w of WORDS) { if (w.s > t + .05) break; sp = w.sp; } return sp; };
/* busy if a stage element is on, starts within 1 s, or ended under 0.5 s ago: avatars only fill real gaps */
const busyAt = t => ELS.some(e => e.layer >= 1 && !e.ambient && t >= e.t0 - 1 && (e.t1 == null || t <= e.t1 + .5));
let hostVis = 0, hostLast = -1;
function hosts(t) {
  /* visibility eases so avatars never pop in for a single frame between beats */
  const target = busyAt(t) || t > VOICE_END ? 0 : 1;
  if (hostLast < 0 || Math.abs(t - hostLast) > .2) { let v = 0; for (let k = 18; k >= 0; k--) v = lerp(v, busyAt(t - k / 30) || t - k / 30 > VOICE_END ? 0 : 1, .22); hostVis = v; }
  else hostVis = lerp(hostVis, target, .22);
  hostLast = t;
  if (hostVis < .02) return;
  const sp = speakerAt(t), lv = level(t);
  [['Alex', C.pink, 'A', STAGE.cx - 170], ['Jordan', C.cyan, 'J', STAGE.cx + 170]].forEach(([name, col, letter, x], i) => {
    const on = name === sp, s = (on ? 1.12 + lv * .1 : .82) * eback(hostVis), y = 1270 + Math.sin(t * 2.2 + i * 2) * 10;
    ctx.save(); ctx.translate(x, y); ctx.globalAlpha = hostVis * (on ? 1 : .7); ctx.scale(s, s);
    if (on) for (let r = 0; r < 3; r++) { const ph = (t * 1.6 + r / 3) % 1; ctx.save(); ctx.globalAlpha *= (1 - ph) * .5 * (.4 + lv); ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, 0, 112 + ph * 70, 0, 7); ctx.stroke(); ctx.restore(); }
    shape(P(() => ctx.arc(0, 0, 105, 0, 7)), col);
    glyph(letter, 0, 2, 120);
    ctx.translate(0, 150); chip(name.toUpperCase(), 0, -30, on ? C.lime : C.white, C.ink, 26, 'center');
    ctx.restore();
  });
}

/* ---------- frame ---------- */
function draw(t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.letterSpacing = '0px';
  background(t);
  ctx.save(); camera(t);
  ambient(t);
  hosts(t);
  ELS.forEach(e => { if (t >= e.t0 - .05 && (e.t1 == null || t <= e.t1 + .5)) e.drawFn(t); });
  ctx.restore();
  hud(t); hook(t); captions(t);
  joins(t);
  endCard(t);
}
function safeOverlay() {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.fillStyle = 'rgba(220,40,40,0.3)';
  ctx.fillRect(0, 0, W, SAFE.top); ctx.fillRect(0, SAFE.bottom, W, H - SAFE.bottom);
  ctx.fillRect(0, SAFE.top, SAFE.left, SAFE.bottom - SAFE.top);
  ctx.fillRect(SAFE.right, SAFE.top, W - SAFE.right, SAFE.splitY - SAFE.top);
  ctx.fillRect(SAFE.rightLow, SAFE.splitY, W - SAFE.rightLow, SAFE.bottom - SAFE.splitY);
}
function boot() {
  buildChunks();
  /* auto sound: joins + end card sting */
  CLIP.joins.forEach(j => cue(j - .3, 'whoosh', { v: 1 }));
  cue(VOICE_END - .15, 'whoosh', { v: 1 }); cue(VOICE_END + .3, 'boom', { v: .7 }); cue(VOICE_END + .35, 'sting', {});
  window.DUR = DUR;
  window.cues = () => ({ dur: DUR, voiceEnd: VOICE_END, cues: CUES.slice().sort((a, b) => a.t - b.t) });
  window.frame = (t, type, q, safe) => { draw(t); if (safe) safeOverlay(); return cv.toDataURL(type || 'image/jpeg', q || .95).split(',')[1]; };
  window.ready = Promise.all(['800 20px "Bric"', '700 20px "Bric"', '700 20px "Space Mono"'].map(f => document.fonts.load(f))).then(() => draw(0));
  let t0 = null;
  if (!/render/.test(location.search)) requestAnimationFrame(function loop(ts) { if (t0 === null) t0 = ts; draw(((ts - t0) / 1000) % DUR); requestAnimationFrame(loop); });
}
