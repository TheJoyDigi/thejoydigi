/* Level 10, The Law of Least Effort: cold open (the remote control) then "laziness is not a flaw ... pave the path". */
const HOOK = "Laziness is not a flaw";
const EMPH = ['remote', 'effort', 'easiest', 'easiest.', 'laziness', 'predictable', 'designing', 'pave', 'path,', 'work.'];

function remote(s) {
  ctx.scale(s, s);
  pill(-46, -118, 92, 236, C.white, { r: 30, shadow: 10, lw: 7 });
  ctx.fillStyle = C.pink; ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, -80, 17, 0, 7); ctx.fill(); ctx.stroke();
  [[-22, -30, C.violet], [22, -30, C.cyan], [-22, 8, C.lime], [22, 8, C.orange]].forEach(([x, y, c]) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, 14, 0, 7); ctx.fill(); ctx.stroke(); });
  pill(-22, 40, 44, 64, C.lilac, { r: 14, shadow: 0, lw: 5 });
  ctx.fillStyle = C.ink; ctx.beginPath(); ctx.moveTo(0, 50); ctx.lineTo(10, 62); ctx.lineTo(-10, 62); ctx.fill(); ctx.beginPath(); ctx.moveTo(0, 94); ctx.lineTo(10, 82); ctx.lineTo(-10, 82); ctx.fill();
}

/* cold open: the remote */
custom(.05, T('why') - .05, (t, p) => {
  ctx.translate(STAGE.cx, 1280 + Math.sin(t * 2.4) * 8); ctx.rotate(-.12 + (1 - Math.min(p, 1)) * .8); remote(1.5 * Math.min(p, 1.15));
});
icon('question', T('why'), T('because') - .05, { y: 1280, s: 1.3 });

/* 1950s: standing up was too much work */
chip1950();
function chip1950() {
  custom(T('nineteen'), T('too much work') - .02, (t, p) => {
    ctx.translate(STAGE.cx, 1120); ctx.rotate(-.04); ctx.scale(Math.min(p, 1.1), Math.min(p, 1.1));
    pill(-170, -62, 340, 124, C.white, { r: 26, shadow: 10, lw: 6 });
    stext('THE 1950s', 0, 4, 76, { color: C.ink, stroke: 0, shadow: 0 });
  });
}
custom(T('someone'), T('twelve') - .05, (t, p) => {
  ctx.translate(620, 1340 + Math.sin(t * 2) * 6); ctx.rotate(.05); ctx.scale(Math.min(p, 1.1), Math.min(p, 1.1));
  pill(-120, -90, 240, 170, C.white, { r: 26, shadow: 10, lw: 7 });
  pill(-100, -72, 200, 128, C.cyan, { r: 14, shadow: 0, lw: 6 });
  pill(-40, 80, 80, 18, C.ink, { r: 6, shadow: 0, lw: 0 });
  ctx.fillStyle = C.violet; ctx.beginPath(); ctx.arc(0, -8, 26, 0, 7); ctx.fill();
  ctx.fillStyle = C.white; ctx.beginPath(); ctx.moveTo(-8, -22); ctx.lineTo(16, -8); ctx.lineTo(-8, 6); ctx.fill();
});
icon('pawn', T('standing'), T('twelve') - .05, { x: 290, y: 1290, s: 1.1 });
arrowFx(T('standing') + .2, T('too much work') - .02, 290, 1250, 290, 1160, { color: C.lime });
meter(T('too much work') - .05, T('twelve') - .05, 'Effort', 0, 1, { y: 1490, dur: .6, color: C.pink });
counter(T('twelve'), T('industry') - .1, 0, 12, { y: 1250, suffix: ' steps', dur: 1, color: C.lime });

/* an industry born from refusing to stand up */
bg(T('industry') - .35, C.pink, { y: 1250 });
icon('briefcase', T('industry'), T('most', 2) - .1, { x: 250, y: 1280, s: 1.3 });
icon('pawn', T('refusal'), T('most', 2) - .1, { x: 640, y: 1280, s: 1.3 });
stamp('REFUSED', T('stand') + .1, T('most', 2) - .1, { x: 640, y: 1340, rot: -.2, color: C.ink });
arrowFx(T('born'), T('refusal') + .3, 360, 1280, 540, 1280, { color: C.ink });

/* the most reliable force */
bg(T('most', 2) - .1, C.ink, { y: 1300 });
icon('lightning', T('force'), T('people') - .1, { x: 450, y: 1150, s: 1.5 });
decode('LEAST EFFORT', T('reliable'), T('people') - .1, { y: 1370, size: 110, dur: .8 });

/* best vs easiest */
versus(T('people'), T('every') - .05, 'What is best', 'What is easiest', { y: 1270, winner: 'b', tWin: T('easiest'), cb: C.lime });
stamp('EVERY TIME', T('every'), T('laziness') - .4, { y: 1180, rot: -.1, color: C.lime });
icon('check', T('every') + .25, T('laziness') - .4, { x: 450, y: 1400, s: .9 });

/* after the cut: laziness is not a flaw */
bg(T('laziness') - .1, C.lime, { y: 1260, sfx: false });
slam('LAZINESS', T('laziness'), T('most', 3) + .2, { y: 1160, bg: C.white });
stamp('NOT A FLAW', T('flaw') - .05, T('most', 3) + .2, { y: 1340, rot: -.08, color: C.violet });
meter(T('most', 3) + .2, T('and') - .05, 'Predictable force', 0, 1, { y: 1300, dur: .9, color: C.violet });
icon('target', T('predictable') + .1, T('and') - .05, { x: 450, y: 1470, s: .8 });

/* fighting it vs designing for it */
versus(T('and'), T('do not fight') - .05, 'Fighting it', 'Designing for it', { y: 1270, winner: 'b', tWin: T('designing'), cb: C.violet });
icon('chartUp', T('everything'), T('do not fight') - .05, { x: 450, y: 1480, s: .6 });

/* the payoff */
bg(T('do not fight') - .15, C.pink, { y: 1260 });
icon('people', T('do not fight'), T('pave') - .1, { x: 450, y: 1260, s: 1.2 });
stamp("DON'T FIGHT", T('fight') - .1, T('pave') - .1, { y: 1420, rot: -.12, color: C.ink });
decode('PAVE THE PATH', T('pave'), T('work', 2) + .3, { y: 1120, size: 84, bg: C.lime, dur: .8 });
custom(T('pave') + .2, VOICE_END - .1, (t, p) => {
  const g = Math.min(1, Math.max(0, (t - T('path,')) / (T('work', 2) - T('path,') + .1)));
  const pts = [[130, 1470], [300, 1380], [450, 1450], [610, 1370], [770, 1430]];
  const at = q => { const k = Math.min(3.999, q * 4), i = Math.floor(k), f = k - i; return [lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f)]; };
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  [[C.ink, 66, 8], [C.ink, 66, 0], [C.white, 44, 0]].forEach(([c, lw, o]) => {
    ctx.strokeStyle = c; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(pts[0][0] + o, pts[0][1] + o);
    for (let q = 0; q <= g; q += .02) { const [x, y] = at(q); ctx.lineTo(x + o, y + o); } const [x, y] = at(g); ctx.lineTo(x + o, y + o); ctx.stroke();
  });
  ctx.restore();
  const [px, py] = at(g); ctx.save(); ctx.translate(px, py - 70); ctx.scale(.75, .75); ICONS.pawn(); ctx.restore();
});
shake(T('laziness') + .05, 10); burstFx(T('work', 2) + .05, STAGE.cx, 1260);
