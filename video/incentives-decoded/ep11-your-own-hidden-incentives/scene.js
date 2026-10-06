/* Level 11, Your Own Hidden Incentives: cold open (the streak that died on day six) then "you have an incentive problem". */
const HOOK = "Why you quit on day six";
const EMPH = ['incentives.', 'incentive', 'lazy.', 'weak.', 'different', 'streak', 'six.', 'see'];

/* 30-day grid: `filled` squares lime, `crossIdx` gets a cross, `dead` greys the rest */
function grid(t, p, filled, crossIdx, dead) {
  ctx.translate(STAGE.cx, 1290); ctx.scale(Math.min(p, 1.08), Math.min(p, 1.08));
  for (let i = 0; i < 30; i++) {
    const x = -296 + (i % 10) * 60 + 26, y = -86 + Math.floor(i / 10) * 60 + 26;
    const on = i < filled, bad = i === crossIdx;
    ctx.save(); ctx.translate(x, y);
    pill(-26, -26, 52, 52, bad ? C.pink : on ? C.lime : C.white, { r: 12, shadow: on || bad ? 5 : 0, lw: 5 });
    if (!on && !bad && dead) { ctx.fillStyle = 'rgba(14,13,18,.35)'; ctx.beginPath(); ctx.roundRect(-26, -26, 52, 52, 12); ctx.fill(); }
    if (bad) { ctx.strokeStyle = C.ink; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-12, -12); ctx.lineTo(12, 12); ctx.moveTo(12, -12); ctx.lineTo(-12, 12); ctx.stroke(); }
    ctx.restore();
  }
}

/* the language app + the 30-day streak goal */
icon('phone', .1, T('thirty-day') - .05, { y: 1290, s: 1.6, enter: 'drop' });
custom(T('thirty-day'), T('day') - .05, (t, p) => {
  grid(t, p, 0, -1, false);
  chip('30-DAY STREAK', 0, -150, C.lime, C.ink, 30, 'center');
});
icon('trophy', T('fluent'), T('day') - .05, { x: 450, y: 1480, s: .75 });

/* day forty: the reminder gets swiped */
counter(T('day'), T('sends') - .05, 0, 40, { prefix: 'DAY ', y: 1230, dur: .9 });
icon('bell', T('sends'), T('swipe') + .7, { x: 400, y: 1300, s: 1.5 });
arrowFx(T('swipe'), T('swipe') + .7, 330, 1470, 700, 1470, { color: C.pink });

/* the streak died on day six */
custom(T('streak', 2), T('and') - .05, (t, p) => {
  const n = Math.min(6, Math.floor((t - T('streak', 2)) / .13) + 1), died = t > T('six');
  grid(t, p, died ? 5 : n, died ? 5 : -1, died);
  if (!died) return;
});
stamp('DIED', T('died'), T('and') - .05, { y: 1470, rot: -.1, color: C.lime });

/* not lazy, not weak: responding to incentives */
bg(T('and') - .15, C.pink, { y: 1250 });
list(T('responding') - .1, [['x:Lazy', T('lazy')], ['x:Weak', T('weak')]], { y: 1230, gap: 140 });
decode('INCENTIVES', T('responding') + .1, T('just') - .05, { y: 1150, size: 120, bg: C.lime, dur: .8 });
icon('magnet', T('responding') + .2, T('just') - .05, { x: 250, y: 1370, s: 1.1 });
icon('pawn', T('responding') + .3, T('just') - .05, { x: 650, y: 1370, s: 1.1 });
arrowFx(T('responding') + .4, T('just') - .05, 560, 1380, 380, 1380, { color: C.ink });
icon('thought', T('just'), T('because') - .05, { y: 1260, s: 1.8 });
icon('magnet', T('ones') - .6, T('because') - .05, { x: 410, y: 1230, s: .6, rot: 0.1 });
icon('cross', T('ones'), T('because') - .05, { x: 600, y: 1420, s: .9 });

/* two different people */
bg(T('because') - .15, C.ink, { y: 1300 });
versus(T('because') + .3, T('same') - .05, 'Downloaded the app', 'Practice at six', { y: 1270 });
icon('people', T('same'), T('want') + 1.3, { y: 1220, s: 1.3 });
custom(T('same') + .1, T('want') - .05, (t, p) => {
  ctx.translate(STAGE.cx, 1450); ctx.scale(Math.min(p, 1.1) * 1.4, Math.min(p, 1.1) * 1.4);
  ctx.lineCap = 'round'; ctx.strokeStyle = C.ink; ctx.lineWidth = 34;
  [[-1, -22], [-1, 22], [0, 0]].slice(0, 2).forEach(([, y]) => { ctx.beginPath(); ctx.moveTo(-60, y + 5); ctx.lineTo(60, y + 5); ctx.stroke(); });
  ctx.beginPath(); ctx.moveTo(-34, 58); ctx.lineTo(34, -48); ctx.stroke();
  ctx.strokeStyle = C.lime; ctx.lineWidth = 20;
  [-22, 22].forEach(y => { ctx.beginPath(); ctx.moveTo(-60, y); ctx.lineTo(60, y); ctx.stroke(); });
  ctx.strokeStyle = C.pink; ctx.beginPath(); ctx.moveTo(-34, 53); ctx.lineTo(34, -53); ctx.stroke();
});
arrowFx(T('want'), T('want') + 1.3, 400, 1470, 160, 1470, { color: C.pink });
arrowFx(T('want') + .1, T('want') + 1.3, 500, 1470, 740, 1470, { color: C.cyan });

/* after the cut: incentive problem */
bg(T('you do not have') - .1, C.lime, { y: 1260, sfx: false });
icon('question', T('you do not have'), T('motivation') - .05, { y: 1280, s: 1.3 });
slam('MOTIVATION', T('motivation'), T('you have') - .05, { y: 1170, bg: C.white });
stamp('NOT THIS', T('problem') - .1, T('you have') - .05, { y: 1340, rot: -.1, color: C.pink });
bg(T('you have') - .1, C.violet, { y: 1260 });
decode('INCENTIVE', T('have', 2) + .2, VOICE_END - .1, { y: 1170, size: 130, bg: C.lime, dur: .8 });
shake(T('problem', 2) + .2, 14); burstFx(T('problem', 2) + .2, STAGE.cx, 1260);
icon('eye', T('now'), VOICE_END - .1, { x: 450, y: 1400, s: 1.5 });
