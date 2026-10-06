/* Level 27, Align, Don't Fight: the exercise bike that became a coat rack vs the hiking group, then "change the game board". */
const HOOK = "Your exercise bike is a coat rack";
const EMPH = ['coat', 'rack?', 'fighting', 'never', 'aligned', 'easier', 'player.', 'board.'];

const pawnC = col => shape(P(() => { ctx.arc(0, -52, 34, 0, 7); ctx.moveTo(-26, -24); ctx.lineTo(26, -24); ctx.lineTo(40, 50); ctx.lineTo(66, 50); ctx.lineTo(66, 88); ctx.lineTo(-66, 88); ctx.lineTo(-66, 50); ctx.lineTo(-40, 50); ctx.closePath(); }), col);
/* stationary bike; jackets draped on seat, handlebar and flywheel */
function drawBike(jackets) {
  shape(P(() => { ctx.moveTo(-100, 92); ctx.lineTo(100, 92); ctx.moveTo(-34, 92); ctx.lineTo(-20, -30); ctx.moveTo(40, 92); ctx.lineTo(48, -56); ctx.lineTo(92, -64); }), null, { lw: 14 });
  shape(P(() => ctx.arc(30, 40, 46, 0, 7)), C.white);
  shape(P(() => ctx.roundRect(-64, -56, 70, 24, 10)), C.ink, { shadow: false, lw: 4 });
  if (jackets > 0) shape(P(() => ctx.roundRect(-52, -40, 52, 86, 14)), C.pink, { shadow: false, lw: 8 });
  if (jackets > 1) shape(P(() => ctx.roundRect(34, -60, 50, 90, 14)), C.cyan, { shadow: false, lw: 8 });
  if (jackets > 2) shape(P(() => ctx.roundRect(8, -30, 56, 76, 14)), C.orange, { shadow: false, lw: 8 });
}
function drawHike() {
  shape(P(() => { ctx.moveTo(-170, 90); ctx.lineTo(-50, -70); ctx.lineTo(10, 0); ctx.lineTo(70, -50); ctx.lineTo(170, 90); ctx.closePath(); }), C.lime);
  shape(P(() => { ctx.moveTo(-50, -70); ctx.lineTo(-50, -118); ctx.lineTo(-10, -104); ctx.lineTo(-50, -90); }), C.pink, { shadow: false, lw: 8 });
  [[-80, 62, C.pink], [-10, 62, C.cyan], [60, 62, C.orange]].forEach(([x, y, col]) => { ctx.save(); ctx.translate(x, y); ctx.scale(.34, .34); pawnC(col); ctx.restore(); });
}

/* cold open: the exercise bike */
icon('question', .1, T('exercise') - .05, { y: 1290, s: 1.3 });
custom(T('exercise'), T('you were') - .05, (t, p) => {
  ctx.translate(STAGE.cx, 1290); ctx.scale(p * 2.0, p * 2.0);
  drawBike(t > T('coat') + .3 ? 1 + (t > T('draped') ? 1 : 0) + (t > T('jackets') ? 1 : 0) : 0);
});
stamp('COAT RACK', T('rack'), T('months') - .1, { y: 1480, rot: -.08, color: C.lime });
icon('clock', T('months'), T('this is') - .05, { x: 220, y: 1130, s: .8, enter: 'drop' });
bubble(T('this is'), T('you were') - .05, 'This is the week.', { side: 'right', y: 1110 });

/* fighting yourself */
bg(T('you were') - .1, C.ink, { y: 1300 });
custom(T('you were'), T('your plan') - .05, (t, p) => {
  [[250, C.cyan, 1], [650, C.pink, -1]].forEach(([x, col, d]) => { ctx.save(); ctx.translate(x + d * (1 - Math.min(p, 1)) * -300 + d * 16 * Math.sin(t * 14), 1330); ctx.scale(-d * 1.6, 1.6); pawnC(col); ctx.restore(); });
});
icon('lightning', T('fighting'), T('your plan') - .05, { y: 1220, s: 1.2 });
versus(T('your plan'), T('a person') - .05, 'You', 'A different person', { y: 1270 });
icon('clock', T('six'), T('that person') - .05, { x: 450, y: 1290, s: 1.35 });
custom(T('six'), T('that person') - .05, (t, p) => { ctx.translate(450, 1450); ctx.scale(p, p); chip('6 AM', 0, -35, C.lime, C.ink, 40, 'center'); });
icon('heart', T('loves'), T('that person') - .05, { x: 680, y: 1150, s: .7, rot: .2 });
icon('clock', T('that person'), T('now') - .05, { x: 450, y: 1290, s: 1.35 });
stamp('NO SHOW', T('never'), T('now') - .05, { y: 1290, rot: -.14 });

/* the friend who aligned the game */
bg(T('now'), C.cyan, { y: 1300 });
icon('people', T('friend'), T('she did') - .05, { x: 330, y: 1290, s: 1.25 });
icon('medal', T('fit'), T('she did') - .05, { x: 620, y: 1280, s: 1.15 });
custom(T('she did'), T('she joined') - .05, (t, p) => { ctx.translate(STAGE.cx, 1290); ctx.scale(p * 1.8, p * 1.8); drawBike(3); });
stamp('NOPE', T('buy'), T('she joined') - .05, { y: 1300, rot: -.14, color: C.ink });
custom(T('hiking'), T('same'), (t, p) => { ctx.translate(STAGE.cx, 1290); ctx.scale(p * 1.7, p * 1.7); drawHike(); });
custom(T('hiking'), T('same'), (t, p) => { ctx.translate(STAGE.cx, 1515); ctx.scale(p, p); chip('HIKING GROUP', 0, -35, C.ink, C.lime, 36, 'center'); });
custom(T('same'), T('but now'), (t, p) => {
  ctx.save(); ctx.translate(250, 1300); ctx.scale(p * .6, p * .6); drawBike(0); ctx.restore();
  ctx.save(); ctx.translate(450, 1300); ctx.scale(p, p); stext('=', 0, 0, 150, { color: C.ink, stroke: 0, shadow: 0 }); ctx.restore();
  ctx.save(); ctx.translate(650, 1300); ctx.scale(p * .75, p * .75); drawHike(); ctx.restore();
});
icon('people', T('skipping'), T('she did not', 2), { x: 330, y: 1290, s: 1.25 });
icon('warning', T('letting'), T('she did not', 2), { x: 630, y: 1290, s: 1.2, enter: 'drop' });
icon('cross', T('she did not', 2), T('aligned') - .05, { y: 1290, s: 1.1 });
decode('ALIGNED', T('aligned'), T('the question') - .05, { y: 1220, size: 130, bg: C.ink, color: C.lime, dur: .5 });
icon('check', T('the game'), T('the question') - .05, { y: 1430, s: .9 });

/* payoff: change the game board */
bg(T('the question') - .1, C.violet, { sfx: false });
icon('question', T('question'), T('how do') - .05, { y: 1290, s: 1.3 });
icon('check', T('better choice'), T('you do not') - .05, { x: 330, y: 1150, s: .95 });
meter(T('how do'), T('you do not') - .05, 'Effort to choose it', 1, .12, { y: 1330, dur: 2 });
icon('pawn', T('you do not'), T('you change') - .05, { y: 1290, s: 1.3 });
stamp('NOPE', T('change'), T('you change') - .05, { y: 1290, rot: -.14 });
decode('THE GAME BOARD', T('you change'), VOICE_END - .1, { y: 1270, size: 100, bg: C.lime, dur: .8 });
shake(T('board') + .1, 14); burstFx(T('board') + .1, STAGE.cx, 1270);
