/* Level 13, Goodhart's Law: cold open (three metrics that ate their goals) then the law itself. */
const HOOK = "Everyone games the number";
const EMPH = ['metric', 'metric.', 'goal.', 'number.', 'fake', 'target,', 'measure', 'measure.', 'collapses', 'dies.', "goodhart's", 'law'];

const tag = (t0, t1, text, x, y, fill, o = {}) => custom(t0, t1, (t, p) => {
  ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(Math.min(p, 1.1), Math.min(p, 1.1)); chip(text, 0, -30, fill, C.ink, o.size || 30, 'center');
});

/* 1: the factory */
icon('clock', .05, T('more') - .05, { y: 1350, s: 1.2 });
meter(T('output'), T('a', 2) - .05, 'Output per hour', 0, 1, { y: 1150, dur: 1.6, color: C.lime });
icon('coin', T('bonus'), T('and') - .05, { x: 450, y: 1290, s: 1 });
icon('lightning', T('run'), T('and') - .05, { x: 650, y: 1300, s: 1 });
meter(T('quality') - .1, T('a', 2) - .05, 'Quality', 1, 0, { y: 1420, dur: .7, color: C.pink });
icon('chartDown', T('collapses'), T('a', 2) - .05, { x: 450, y: 1265, s: .72 });

/* 2: the school */
bg(T('a', 2) - .1, C.pink, { y: 1260 });
custom(T('test'), T('real') - .05, (t, p) => {
  ctx.translate(STAGE.cx, 1230); ctx.rotate(-.05); ctx.scale(Math.min(p, 1.1), Math.min(p, 1.1));
  pill(-170, -130, 340, 260, C.white, { r: 26, shadow: 10, lw: 7 });
  stext('TEST', 0, -78, 56, { color: C.ink, stroke: 0, shadow: 0 });
  const g = t > T('higher') ? 'A+' : 'C';
  stext(g, 0, 20, 150, { color: t > T('higher') ? C.violet : C.ink, stroke: 0, shadow: 0 });
});
icon('coin', T('funding') - .3, T('real') - .05, { x: 660, y: 1130, s: .85 });
icon('target', T('teach'), T('real') - .05, { x: 220, y: 1430, s: .8 });
icon('thought', T('real'), T('wells') - .05, { y: 1350, s: 1.3 });
icon('cross', T('learning') + .1, T('wells') - .05, { x: 600, y: 1440, s: 1 });
stamp('DIES', T('dies') - .05, T('wells') - .05, { y: 1160, rot: -.1, color: C.ink });

/* 3: the bank */
bg(T('wells') - .1, C.ink, { y: 1250 });
icon('house', T('wells'), T('accounts'), { x: 450, y: 1260, s: 1.7 });
tag(T('wells') + .15, T('accounts'), 'WELLS FARGO', 450, 1450, C.lime);
icon('house', T('accounts'), T('opened', 2) + .3, { x: 220, y: 1490, s: .7, sfx: false });
custom(T('accounts'), T('every') - .05, (t, p) => {
  const n = t < T('opened', 2) ? Math.min(3, Math.floor((t - T('accounts')) / .25) + 1) : Math.min(12, 3 + Math.floor((t - T('opened', 2)) / .1));
  for (let i = 0; i < n; i++) {
    const x = STAGE.cx - 232 + (i % 4) * 155, y = 1140 + Math.floor(i / 4) * 115;
    ctx.save(); ctx.translate(x, y); ctx.rotate(((i * 37) % 7 - 3) * .018); ctx.scale(1.3, 1.3);
    pill(-50, -32, 100, 64, i < 3 ? C.white : C.lilac, { r: 12, shadow: 5, lw: 4 });
    ctx.fillStyle = C.violet; ctx.fillRect(-38, -16, 34, 12); ctx.fillStyle = C.ink; ctx.fillRect(-38, 6, 66, 6);
    ctx.restore();
  }
});
icon('coin', T('bigger', 2) + .1, T('so', 3) - .05, { x: 660, y: 1110, s: .7 });
stamp('FAKE', T('fake'), T('every') - .05, { y: 1450, x: 520, rot: -.12, color: C.pink });
shake(T('fake') + .05, 12);

/* 4: the metric eats the goal */
bg(T('every') - .1, C.violet, { y: 1260 });
icon('target', T('every'), T('goodhart\'s') - .1, { x: 560, y: 1300, s: 1.5 });
tag(T('reasonable'), T('and', 3) - .05, 'REASONABLE METRIC', 330, 1130, C.white, { rot: -.05, size: 28 });
icon('chartUp', T('metric'), T('goodhart\'s') - .1, { x: 250, y: 1300, s: 1.1 });
tag(T('goal') - .1, T("goodhart's") - .1, 'THE GOAL', 560, 1450, C.lime);
arrowFx(T('eating'), T('goodhart\'s') - .1, 340, 1300, 470, 1300, { color: C.lime });

/* after the cut: Goodhart's law */
bg(T("goodhart's") - .1, C.lime, { y: 1260, sfx: false });
decode("GOODHART'S", T("goodhart's"), T('measure') - .05, { y: 1150, size: 120, bg: C.violet, color: C.white, dur: .7 });
decode('LAW', T('law'), T('measure') - .05, { y: 1320, size: 150, bg: C.violet, color: C.white, dur: .5 });
icon('chartUp', T('measure'), T('ceases') - .1, { x: 230, y: 1300, s: 1.1 });
tag(T('measure') + .1, T('ceases') - .1, 'MEASURE', 230, 1430, C.white);
arrowFx(T('becomes'), T('ceases') - .1, 330, 1300, 470, 1300, { color: C.ink });
icon('target', T('target,') - .1, T('thing') - .05, { x: 640, y: 1300, s: 1.1 });
tag(T('target,') - .05, T('ceases') - .1, 'TARGET', 640, 1430, C.lime);
icon('cross', T('ceases'), T('people') - .05, { x: 640, y: 1190, s: .9 });
tag(T('good'), T('people') - .05, 'NOT GOOD', 640, 1430, C.pink);

bg(T('people') - .1, C.violet, { y: 1260 });
versus(T('people'), VOICE_END - .1, 'The thing', 'The number', { y: 1270, winner: 'b', tWin: T('number'), cb: C.lime });
shake(T('number') + .1, 14); burstFx(T('number') + .1, STAGE.cx, 1260);
