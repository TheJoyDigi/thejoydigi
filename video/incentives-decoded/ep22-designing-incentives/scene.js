/* Level 22, Designing Incentives: the restaurant that rewarded fast exits, then "design the payoff and the behavior follows". */
const HOOK = "You get exactly what you pay for";
const EMPH = ['faster', 'timing', 'metric', 'won', 'lost', 'exactly', 'payoff', 'behavior', 'purpose'];
const J = CLIP.joins[0];

const plate = () => {
  shape(P(() => ctx.arc(0, 0, 90, 0, 7)), C.white);
  shape(P(() => ctx.arc(0, 0, 58, 0, 7)), C.lilac, { shadow: false, lw: 5 });
  shape(P(() => { ctx.moveTo(0, 0); ctx.arc(0, 0, 40, -.6, 1.0); ctx.closePath(); }), C.orange, { shadow: false, lw: 6 });
};

/* 1. a restaurant starts timing stays; shorter stays score better */
icon('house', T('restaurant'), T('timing') - .05, { y: 1290, s: 1.4 });
icon('clock', T('timing'), T('within weeks') - .05, { x: 450, y: 1210, s: 1.0 });
meter(T('shorter'), T('within weeks') - .05, 'staff score', .1, .95, { y: 1450, dur: 1.2 });

/* 2. servers rush guests through dessert */
bg(T('within weeks'), C.pink, { y: 1260 });
icon('people', T('within weeks') + .2, T('rushing') - .05, { x: 450, y: 1290, s: 1.2 });
icon('arrow', T('rushing'), T('clearing') - .05, { x: 450, y: 1290, s: 1.4 });
icon('people', T('guests'), T('dining') - .05, { x: 250, y: 1300, s: .9 });
custom(T('clearing'), T('dining') - .05, (t, p) => {
  const q = prog(t, T('still') - .1, .5);
  ctx.translate(lerp(600, 600 + 700, eio(q)), 1300); ctx.scale(Math.min(p, 1) * 1.3, Math.min(p, 1) * 1.3); ctx.rotate(q * 1.5); plate();
});
icon('warning', T('frantic'), T('table turnover improves') - .05, { y: 1290, s: 1.5 });
shake(T('frantic'), 10);

/* 3. the metric looks great, regulars leave */
bg(T('table turnover improves'), C.ink, { y: 1260 });
icon('chartUp', T('improves'), T('regulars') - .05, { y: 1290, s: 1.4 });
icon('check', T('looks great'), T('regulars') - .05, { x: 640, y: 1170, s: .7 });
icon('people', T('regulars'), T('they were not') - .05, { y: 1300, s: 1.2 });
icon('cross', T('stop coming'), T('they were not') - .05, { x: 620, y: 1180, s: .8 });
custom(T('they were not'), T('the restaurant got') - .05, (t, p) => { ctx.translate(STAGE.cx, 1085); ctx.scale(Math.min(p, 1), Math.min(p, 1)); chip('REWARDED FOR', 0, -30, C.lime, C.ink, 30, 'center'); });
versus(T('they were not'), T('the restaurant got') - .05, 'Happy guests', 'Fast exits', { y: 1290, winner: 'b', tWin: T('fast exits'), ca: C.white, cb: C.lime });
icon('house', T('the restaurant got'), T('faster tables') - .05, { y: 1280, s: 1.3 });
[[260, 1180], [640, 1180], [450, 1440]].forEach(([x, y], i) => icon('coin', T('paid for') - .5 + i * .15, T('faster tables') - .05, { x, y, s: .6, rot: i * .15 - .1 }));

/* 4. faster tables, emptier restaurant: the metric won, the business lost */
bg(T('faster tables'), C.violet, { y: 1260 });
icon('chartUp', T('faster tables'), T('emptier') - .05, { y: 1290, s: 1.4 });
icon('house', T('emptier'), T('metric won') - .05, { x: 330, y: 1290, s: 1.2 });
icon('chartDown', T('emptier') + .2, T('metric won') - .05, { x: 610, y: 1290, s: 1.2 });
versus(T('metric won'), J - .05, 'The metric', 'The business', { y: 1280, winner: 'a', tWin: T('metric won') + .3, ca: C.lime, cb: C.white });

/* 5. after the cut: design the payoff, behavior follows */
bg(J + .02, C.orange, { y: 1260, sfx: false });
icon('coin', T('design the payoff'), T('already') - .05, { x: 230, y: 1330, s: 1.3 });
icon('people', T('behavior'), T('already') - .05, { x: 650, y: 1330, s: 1.3 });
arrowFx(T('follows') - .1, T('already') - .05, 330, 1330, 540, 1330, { color: C.violet });
bg(T('already'), C.violet, { y: 1260 });
icon('target', T('already'), VOICE_END - .1, { x: 450, y: 1430, s: 1.1 });
icon('question', T('question'), T('on purpose') - .05, { x: 450, y: 1230, s: 1.2 });
decode('ON PURPOSE', T('on purpose'), VOICE_END - .1, { y: 1180, size: 120, bg: C.lime, dur: .55 });
shake(T('purpose') + .1, 14); burstFx(T('purpose') + .1, STAGE.cx, 1290);
