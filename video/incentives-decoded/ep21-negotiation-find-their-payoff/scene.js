/* Level 21, Negotiation: Find Their Payoff: the car you "won" (the salesman's real want was speed), then end arguments by feeding the payoff. */
const HOOK = "You won the haggle. You lost.";
const EMPH = ['five', 'won', 'volume', 'margin', 'thousand', 'wrong', 'payoff', 'payoff.', 'end', 'price', 'hunting'];
const J = CLIP.joins[0];

const car = col => {
  shape(P(() => ctx.roundRect(-60, -80, 120, 56, 18)), C.lilac);
  shape(P(() => ctx.roundRect(-110, -36, 220, 66, 20)), col);
  [-62, 62].forEach(x => { shape(P(() => ctx.arc(x, 34, 26, 0, 7)), C.ink, { shadow: false, lw: 6 }); shape(P(() => ctx.arc(x, 34, 10, 0, 7)), C.white, { shadow: false, lw: 3 }); });
};

/* 1. used car, five hundred dollars to haggle over */
custom(T('used car'), T('and the salesman') - .05, (t, p) => {
  const big = 1 - eio(prog(t, T('haggle') - .3, .5));
  ctx.translate(lerp(-300, STAGE.cx, eo(prog(t, T('used car'), .6))), lerp(1470, 1330, big) + Math.sin(t * 9) * 3); const sc = lerp(1.0, 1.6, big); ctx.scale(sc, sc); car(C.orange);
});
icon('eye', T('researched'), T('haggle') + .3, { x: 450, y: 1130, s: .8 });
counter(T('five hundred'), T('and the salesman') - .05, 0, 500, { y: 1230, label: 'dollars to haggle over', dur: .8, size: 200 });

/* 2. he gives it in four minutes, you feel great, you won */
bg(T('and the salesman'), C.pink, { y: 1260 });
icon('briefcase', T('salesman'), T('four minutes') - .05, { x: 330, y: 1290, s: 1.2 });
icon('coin', T('five hundred', 2), T('four minutes') - .05, { x: 600, y: 1290, s: 1.2 });
counter(T('four minutes'), T('you feel great') - .05, 0, 4, { y: 1260, label: 'minutes', dur: .5, size: 200, color: C.white });
icon('heart', T('you feel great'), T('you won') - .05, { y: 1290, s: 1.4 });
icon('trophy', T('you won'), T('you did not win') + .15, { y: 1290, s: 1.4, enter: 'drop' });

/* 3. you did not win: he wanted speed */
bg(T('you did not win'), C.ink, { y: 1260 });
stamp('NOT A WIN', T('you did not win') + .15, T('he wanted') - .05, { y: 1290, size: 110, rot: -.1 });
custom(T('he wanted'), T('his bonus') - .05, (t, p) => {
  ctx.translate(lerp(STAGE.cx, 1000, eio(prog(t, T('move the car'), 1.2))), 1380); ctx.scale(1.3, 1.3); car(C.orange);
});
icon('clock', T('today'), T('his bonus') - .05, { x: 450, y: 1170, s: 1.1 });
versus(T('his bonus'), T('dropped') - .05, 'Volume', 'Margin', { y: 1270, winner: 'a', tWin: T('margin') + .1, ca: C.lime, cb: C.white });
counter(T('dropped'), T('wrong thing') - .05, 0, 1000, { y: 1260, label: 'he would have dropped', dur: .8, size: 190 });
stamp('WRONG THING', T('wrong thing'), T('never asked') - .05, { y: 1290, size: 100, rot: -.08, color: C.pink });
icon('question', T('never asked'), J - .05, { y: 1290, s: 1.5 });
icon('thought', T('what he actually'), J - .05, { x: 640, y: 1180, s: .8 });

/* 4. negotiation is about finding the payoff */
versus(T('negotiation is not'), J - .05, 'Winning the argument', 'Finding the payoff', { y: 1270, winner: 'b', tWin: T('finding the payoff'), ca: C.white, cb: C.lime });
icon('handshake', T('finding the payoff') + .2, J - .05, { x: 450, y: 1470, s: .7 });

/* 5. after the cut: end arguments by feeding the payoff first */
bg(J + .02, C.orange, { y: 1260, sfx: false });
icon('handshake', T('negotiators'), T('win arguments') + .1, { x: 450, y: 1300, s: 1.2 });
list(T('by finding') - .05, [['x:Win arguments', T('win arguments')], ['End them', T('end them')]], { y: 1130, gap: 140 });
icon('coin', T('finding the payoff', 2), T('stop haggling') - .05, { x: 240, y: 1390, s: 1.1 });
icon('people', T('feeding'), T('stop haggling') - .05, { x: 650, y: 1390, s: 1.1 });
arrowFx(T('feeding'), T('stop haggling') - .05, 340, 1390, 560, 1390, { color: C.violet });

/* 6. stop haggling over price, start hunting for the payoff */
bg(T('stop haggling'), C.violet, { y: 1260 });
icon('cross', T('stop haggling'), T('start hunting') - .05, { y: 1290, s: 1.5 });
custom(T('price', 2), T('start hunting') - .05, (t, p) => { ctx.translate(STAGE.cx, 1450); ctx.scale(p, p); chip('THE PRICE', 0, -30, C.white, C.ink, 32, 'center'); });
icon('target', T('start hunting'), VOICE_END - .1, { y: 1420, s: 1.0 });
decode('THE PAYOFF', T('start hunting'), VOICE_END - .1, { y: 1150, size: 120, bg: C.lime, dur: .55 });
shake(T('payoff', 3) + .0, 14); burstFx(T('payoff', 3), STAGE.cx, 1290);
