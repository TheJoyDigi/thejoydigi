/* Level 02, The World Is a Game: cold open (promoted without the work, chess vs poker) then "the best game choosers". */
const HOOK = "Why they got promoted, not you";
const EMPH = ['game', 'game.', 'seen', 'chess.', 'poker.', 'choosers.', 'players.', 'winners.'];

/* "someone get promoted who did less work than you" */
icon('question', .15, T('watched') - .05, { y: 1280, s: 1.3 });
icon('people', T('watched'), T('promoted') - .1, { y: 1290, s: 1.2 });
icon('medal', T('promoted'), T('and it stings') - .05, { x: 450, y: 1190, s: 1.15, enter: 'drop' });
meter(T('did less'), T('and it stings') - .05, 'Work done', .9, .3, { y: 1430, color: C.pink });
icon('lightning', T('and it'), T('because you thought') - .05, { y: 1280, s: 1.3 });
icon('thought', T('because you thought'), T('do great work') - .05, { y: 1280, s: 1.3 });

/* the game you thought you were in */
bubble(T('do great work'), T('never the game') - .05, '"Do great work"', { side: 'left', y: 1220 });
icon('trophy', T('do great work'), T('never the game') - .05, { x: 640, y: 1420, s: 1.1, rot: .15 });
stamp('WRONG GAME', T('never the game') - .1, T('the game was be') - .05, { y: 1230, color: C.pink });

/* the real game: be seen */
bg(T('the game was be'), C.pink, { y: 1260 });
decode('BE SEEN', T('be seen'), T('different rules') - .1, { y: 1170, size: 130, bg: C.white, dur: .6 });
icon('eye', T('doing great work'), T('different rules') - .1, { y: 1420, s: 1.0 });
icon('scale', T('different rules'), T('different winners') - .05, { y: 1290, s: 1.3 });
icon('trophy', T('different winners'), T('you were playing') - .05, { y: 1290, s: 1.3, enter: 'drop' });

/* chess vs poker */
versus(T('you were playing'), T('and here is') - .05, 'You: chess', 'Them: poker', { y: 1270, ca: C.white, cb: C.lime });
bg(T('and here is'), C.ink, { y: 1300 });

/* always in a game */
icon('die', T('you are always'), T('you just do not') - .05, { y: 1280, s: 1.4, spin: true });
[[250, 1150], [650, 1160], [450, 1450]].forEach(([x, y], i) =>
  icon('question', T('just do not') + i * .2, T('which one') + .9, { x, y, s: .7, rot: i % 2 ? .2 : -.2 }));

/* payoff: the best game choosers */
bg(T('the most successful'), C.violet, { y: 1260 });
icon('crown', T('the most'), T('not the best') - .05, { y: 1280, s: 1.4 });
icon('pawn', T('not the best'), T('they are the best') - .05, { y: 1280, s: 1.2 });
stamp('NOT THIS', T('best players'), T('they are the best') - .05, { y: 1290, color: C.pink });
decode('GAME', T('best game'), VOICE_END - .1, { y: 1120, size: 130, bg: C.lime, dur: .4 });
decode('CHOOSERS', T('best game') + .2, VOICE_END - .1, { y: 1270, size: 150, bg: C.lime, dur: .6 });
shake(T('choosers') + .1, 14); burstFx(T('choosers') + .1, STAGE.cx, 1230);
icon('cursor', T('pick'), T('can win') - .05, { y: 1400, s: 1.0 });
icon('trophy', T('can win'), VOICE_END - .1, { x: 230, y: 1470, s: .75, rot: -.12 });
icon('coin', T('payoffs'), VOICE_END - .1, { x: 450, y: 1480, s: .8 });
icon('handshake', T('opponents'), VOICE_END - .1, { x: 670, y: 1470, s: .75, rot: .1 });
