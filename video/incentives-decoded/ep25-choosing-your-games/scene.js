/* Level 25, Choosing Your Games: same degree, different life; the game you choose beats the effort you put in. */
const HOOK = "Same degree. Same grades. Different life.";
const EMPH = ['same', 'thriving', 'stuck', 'game', 'efficient', 'losing', 'choosing', 'right', 'worth'];
const J = CLIP.joins[0];

/* 1. two graduates, identical on paper */
[[300, 'pawn'], [600, 'pawn']].forEach(([x, k], i) => icon(k, T('graduate') + i * .12, T('ten years') - .05, { x, y: 1270, s: 1.2 }));
custom(T('same degree'), T('ten years') - .05, (t, p) => {
  const tags = [['SAME DEGREE', T('same degree')], ['SAME GRADES', T('same grades')], ['SAME TALENT', T('same talent')]];
  tags.forEach(([txt, tt], i) => {
    const q = eback(prog(t, tt, .25)); if (q <= 0) return;
    ctx.save(); ctx.translate(STAGE.cx, 1110 + i * 0 + 0); ctx.restore();
    ctx.save(); ctx.translate(STAGE.cx, 1410 + (i - 1) * 0 + (i === 0 ? 0 : 0)); ctx.restore();
  });
  const cur = tags.filter(([, tt]) => t >= tt).pop();
  if (cur) { const q = eback(prog(t, cur[1], .25)); ctx.save(); ctx.translate(STAGE.cx, 1450); ctx.scale(q, q); chip(cur[0], 0, -30, C.lime, C.ink, 34, 'center'); ctx.restore(); }
});
bg(T('ten years'), C.pink, { y: 1260 });
counter(T('ten years'), T('thriving') - .05, 0, 10, { y: 1250, label: 'years later', dur: .6, size: 210, color: C.white });
icon('chartUp', T('thriving'), T('the difference') - .05, { x: 290, y: 1290, s: 1.3 });
icon('hourglass', T('stuck'), T('the difference') - .05, { x: 620, y: 1290, s: 1.3 });

/* 2. the difference is not effort, it is the game */
bg(T('the difference'), C.ink, { y: 1260 });
versus(T('the difference'), T('growing') - .05, 'Effort', 'The game', { y: 1280, winner: 'b', tWin: T('game they chose'), ca: C.white, cb: C.lime });
icon('chartUp', T('growing'), T('shrinking') - .05, { x: 450, y: 1290, s: 1.5 });
icon('chartDown', T('shrinking'), T('hard work') - .05, { x: 450, y: 1250, s: 1.3 });
[[230, 1450], [450, 1470], [670, 1450]].forEach(([x, y], i) => icon('people', T('everyone fights') + i * .12, T('hard work') - .05, { x, y, s: .5, rot: (i - 1) * .2 }));
icon('fire', T('hard work'), T('efficient') - .05, { y: 1290, s: 1.4 });
slam('EFFICIENT LOSING', T('efficient'), T('today') - .05, { y: 1290, bg: C.pink, color: C.ink, size: 100 });

/* 3. choosing the game itself */
bg(T('today'), C.violet, { y: 1260 });
icon('die', T('today'), J - .05, { y: 1430, s: 1.1 });
decode('CHOOSE THE GAME', T('choosing'), J - .05, { y: 1150, size: 110, dur: .8, bg: C.lime });
shake(T('game itself'), 10);

/* 4. after the cut: a good player in the right game */
bg(J + .02, C.orange, { y: 1260, sfx: false });
icon('crown', T('you do not'), T('best player') + .2, { y: 1290, s: 1.4 });
list(T('stop asking') - .05, [['x:Best player in the world', T('best player')], ['Good player, right game', T('good player')]], { y: 1120, gap: 140 });
icon('target', T('right game'), T('stop asking') - .05, { y: 1440, s: 1.0 });

/* 5. stop asking how do I win, start asking if it is worth winning */
bg(T('stop asking'), C.violet, { y: 1260 });
bubble(T('stop asking'), T('start asking') - .05, 'How do I win?', { side: 'left', y: 1180 });
icon('cross', T('stop asking') + .5, T('start asking') - .05, { x: 640, y: 1160, s: .8 });
icon('scale', T('start asking'), VOICE_END - .1, { y: 1430, s: 1.1 });
decode('WORTH IT?', T('worth winning'), VOICE_END - .1, { y: 1170, size: 130, bg: C.lime, dur: .5 });
shake(T('worth winning') + .5, 14); burstFx(T('worth winning') + .5, STAGE.cx, 1290);
