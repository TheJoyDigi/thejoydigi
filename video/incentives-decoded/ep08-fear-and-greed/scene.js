/* Level 08, Fear and Greed: buy the top, sell the bottom, then "greed up, fear down, they are the operating system". */
const HOOK = "You knew better. You did it anyway.";
const EMPH = ['overpriced.', 'crashes.', 'fear', 'greed', 'greed.', 'fear', 'mania.', 'system.', 'operating', 'bugs', 'better'];

const RISE = [[0, .9], [.18, .72], [.3, .78], [.5, .5], [.68, .38], [1, .06]];
const CRASH = [[0, .08], [.22, .16], [.45, .05], [.6, .1], [.8, .62], [1, .95]];
/* line chart on a white card that draws itself from tDraw */
function stockChart(t0, t1, pts, tDraw, dur, color) {
  custom(t0, t1, (t, p) => {
    ctx.translate(STAGE.cx, 1270); ctx.rotate(-.02); ctx.scale(p, p);
    pill(-280, -170, 560, 340, C.white, { r: 30, shadow: 12, lw: 6 });
    const g = eio(prog(t, tDraw, dur)), X = f => -230 + f * 460, Y = f => -120 + f * 240;
    ctx.save(); ctx.strokeStyle = '#E4E1EC'; ctx.lineWidth = 4;
    [-60, 0, 60].forEach(y => { ctx.beginPath(); ctx.moveTo(-240, y); ctx.lineTo(240, y); ctx.stroke(); });
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = color; ctx.lineWidth = 14; ctx.beginPath();
    let last = pts[0];
    pts.forEach(([f, v], i) => { if (i === 0) { ctx.moveTo(X(f), Y(v)); return; } const [pf, pv] = pts[i - 1]; if (g >= f) { ctx.lineTo(X(f), Y(v)); last = [f, v]; } else if (g > pf) { const k = (g - pf) / (f - pf); last = [g, lerp(pv, v, k)]; ctx.lineTo(X(last[0]), Y(last[1])); } });
    ctx.stroke();
    ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(X(last[0]), Y(last[1]), 14, 0, 7); ctx.fill();
    ctx.restore();
  });
}

/* the stock is up, everyone is buying */
icon('chartUp', T('stock'), T('everyone') - .05, { x: 270, y: 1280, s: 1.2 });
counter(T('three hundred'), T('everyone') - .05, 0, 300, { x: 600, y: 1260, prefix: '+', suffix: '%', size: 170, dur: .8 });
[['everyone', 250, 1220], ['neighbor', 450, 1320], ['barber', 650, 1220]].forEach(([w, x, y], i) =>
  icon('people', T(w), T('you know') - .05, { x, y, s: .85 }));
icon('coin', T('buying', 3) - .1, T('you know') - .05, { x: 450, y: 1470, s: .7 });

/* you buy anyway */
bg(T('you know') - .05, C.pink, { y: 1260 });
icon('warning', T('overpriced') - .1, T('you buy') - .05, { y: 1280, s: 1.4 });
icon('cursor', T('you buy'), T('because') - .05, { x: 520, y: 1280, s: 1.3 });
icon('coin', T('buy') + .15, T('because') - .05, { x: 330, y: 1300, s: 1.1 });
stockChart(T('what if'), T('what if', 2) - .05, RISE, T('what if') + .1, 1.4, C.violet);
icon('people', T('everyone', 2), T('two years') - .05, { x: 250, y: 1280, s: 1.0 });
icon('coin', T('rich'), T('two years') - .05, { x: 640, y: 1190, s: .8 });
icon('question', T('except'), T('two years') - .05, { x: 640, y: 1380, s: .8 });

/* crash */
bg(T('two years'), C.ink, { y: 1290 });
stockChart(T('two years'), T('everyone', 3) - .05, CRASH, T('later') - .1, .9, C.pink);
shake(T('crashes') + .1, 12);
icon('people', T('everyone', 3), T('panic') - .05, { x: 270, y: 1280, s: 1.1 });
icon('chartDown', T('selling'), T('panic') - .05, { x: 640, y: 1280, s: 1.1 });
icon('warning', T('panic'), T('headlines') - .05, { y: 1280, s: 1.5 });
icon('megaphone', T('headlines'), T('you sell') - .05, { y: 1280, s: 1.5 });
stamp('SOLD', T('bottom'), T('you knew') - .05, { y: 1290, color: C.pink, rot: -.12, size: 150 });

/* knowing vs doing */
bg(T('you knew'), C.cyan, { y: 1260 });
icon('thought', T('you knew'), T('but') - .05, { y: 1280, s: 1.4 });
versus(T('knowing'), T('and fear') - .05, 'Knowing', 'Doing', { y: 1270, ca: C.white, cb: C.lime });
icon('pawn', T('playing') - .3, T('every') - .05, { y: 1330, s: 1.3 });
custom(T('fear'), T('every') - .05, (t, p) => { ctx.translate(250, 1160); ctx.rotate(-.1); ctx.scale(p, p); chip('FEAR', 0, -30, C.pink, C.ink, 46, 'center'); });
custom(T('greed'), T('every') - .05, (t, p) => { ctx.translate(650, 1160); ctx.rotate(.1); ctx.scale(p, p); chip('GREED', 0, -30, C.lime, C.ink, 46, 'center'); });
arrowFx(T('playing'), T('every') - .05, 260, 1210, 390, 1300, { color: C.pink });
arrowFx(T('playing') + .15, T('every') - .05, 640, 1210, 510, 1300, { color: C.lime });

/* after the cut: the operating system */
bg(T('every') - .1, C.violet, { y: 1260, sfx: false });
[['chartUp', 'bubble', 250, 1170], ['chartDown', 'crash', 650, 1170], ['warning', 'panic', 250, 1400], ['fire', 'mania', 650, 1400]].forEach(([k, w, x, y]) =>
  icon(k, T(w, w === 'panic' ? 2 : 1), T('it is always') - .05, { x, y, s: .95 }));
icon('question', T('it is always'), T('greed', 2) - .05, { y: 1280, s: 1.3 });
versus(T('greed', 2), T('and they') - .05, 'Greed: up', 'Fear: down', { y: 1270, ca: C.lime, cb: C.pink });
icon('cross', T('not bugs') + .1, T('they are the') - .05, { x: 450, y: 1290, s: 1.3 });
decode('OPERATING', T('operating') - .1, VOICE_END - .1, { y: 1150, size: 140, bg: C.white, dur: .4 });
decode('SYSTEM', T('system', 2) - .5, VOICE_END - .1, { y: 1320, size: 190, bg: C.lime, dur: .5 });
shake(T('system', 2) + .1, 14); burstFx(T('system', 2) + .1, STAGE.cx, 1250);
