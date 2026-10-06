/* Level 29, Incentives for Yourself: you negotiate with someone who breaks promises (you), then "shrink the game". */
const HOOK = "Future you ignores your plans";
const EMPH = ['know', 'not', 'promises.', 'present', 'future', 'worst', 'fight', 'war.', 'handshake.', 'small', 'sillier'];

const pawnC = col => shape(P(() => { ctx.arc(0, -52, 34, 0, 7); ctx.moveTo(-26, -24); ctx.lineTo(26, -24); ctx.lineTo(40, 50); ctx.lineTo(66, 50); ctx.lineTo(66, 88); ctx.lineTo(-66, 88); ctx.lineTo(-66, 50); ctx.lineTo(-40, 50); ctx.closePath(); }), col);

/* you know what to do, and you are not doing it */
icon('question', .05, T('know') - .05, { y: 1290, s: 1.3 });
icon('thought', T('know'), T('and') - .05, { y: 1290, s: 1.4 });
icon('cross', T('and'), T('workout') - .05, { y: 1290, s: 1.4 });
list(T('knowledge') - .4, [['x:The workout', T('workout')], ['x:The savings', T('savings')], ['x:The book', T('book')]], { y: 1110, gap: 150 });
icon('thought', T('knowledge'), T('here') - .1, { x: 270, y: 1290, s: 1.0 });
icon('target', T('plan'), T('here') - .1, { x: 450, y: 1290, s: 1.0 });
icon('clock', T('time'), T('here') - .1, { x: 630, y: 1290, s: 1.0 });
stamp('STILL NOTHING', T('still'), T('here') - .1, { y: 1460, rot: -.1 });

/* negotiating with someone who does not keep promises */
bg(T('here') - .1, C.ink, { y: 1280 });
icon('warning', T('uncomfortable'), T('negotiating') - .05, { y: 1290, s: 1.4, enter: 'drop' });
custom(T('negotiating'), T('present') - .05, (t, p) => {
  const me = t > T('someone is you');
  [[270, C.cyan], [630, me ? C.cyan : C.pink]].forEach(([x, col], i) => {
    ctx.save(); ctx.translate(x + (i ? 1 : -1) * (1 - Math.min(p, 1)) * 300, 1390); ctx.scale(i ? -1.6 : 1.6, 1.6); pawnC(col); ctx.restore();
  });
  if (me) { ctx.save(); ctx.translate(630, 1130); ctx.scale(eback(prog(t, T('someone is you'), .3)), eback(prog(t, T('someone is you'), .3))); chip('YOU', 0, -35, C.lime, C.ink, 44, 'center'); ctx.restore(); }
});
icon('handshake', T('negotiating') + .3, T('keep promises'), { x: 450, y: 1230, s: 1.0 });
icon('cross', T('keep promises'), T('present') - .05, { x: 450, y: 1230, s: 1.0 });

/* present you vs future you */
bg(T('present') - .1, C.lime, { y: 1260 });
versus(T('present'), T('worst') - .05, 'Present you', 'Future you', { y: 1260 });
icon('cross', T('ignores'), T('worst') - .05, { x: 640, y: 1090, s: .6 });
icon('briefcase', T('worst'), T('your two') - .3, { y: 1280, s: 1.4 });
stamp('WORST', T('partnership'), T('your two') - .3, { y: 1300, rot: -.14 });

/* payoff: shrink the game */
bg(T('your two') - .1, C.pink, { y: 1260, sfx: false });
meter(T('your two'), T('get in') - .05, 'Selves fighting', .1, 1, { y: 1480, dur: 2.2, color: C.violet });
icon('thought', T('big'), T('get in') - .05, { y: 1190, s: 1.4 });
icon('question', T('vague'), T('get in') - .05, { x: 640, y: 1100, s: .7, rot: .2 });
versus(T('get in'), T('make the daily') - .05, 'Get in shape', 'Walk for ten minutes', { y: 1270, winner: 'b', tWin: T('handshake') });
stamp('WAR', T('war'), T('walk') - .05, { x: 270, y: 1130, rot: -.12 });
icon('handshake', T('handshake'), T('make the daily') - .05, { x: 640, y: 1090, s: .7 });

bg(T('make the daily') - .1, C.violet, { y: 1260 });
custom(T('daily'), T('sillier') - .05, (t, p) => {
  const s = lerp(2.2, .7, eio(prog(t, T('daily'), 1.0)));
  ctx.translate(STAGE.cx, 1230); ctx.scale(s * Math.min(p, 1.1), s * Math.min(p, 1.1)); pawnC(C.cyan);
});
decode('SO SMALL', T('small'), VOICE_END - .1, { y: 1450, size: 120, bg: C.lime, dur: .5 });
icon('cross', T('defecting'), T('sillier') - .05, { x: 640, y: 1140, s: .9 });
shake(T('sillier') + .05, 14); burstFx(T('sillier') + .05, STAGE.cx, 1300);
