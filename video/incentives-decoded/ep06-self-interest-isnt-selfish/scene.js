/* Level 06, Self-Interest Isn't Selfish: two people called selfish for wanting more, then "self-interest is a constant, like gravity: you build with it". */
const HOOK = "Is wanting more actually selfish?";
const EMPH = ['selfish', 'selfish.', 'selfish,', 'constant.', 'gravity.', 'build', 'truth.', 'more', 'worth.', 'flaw.'];

/* her raise */
icon('handshake', T('negotiated'), T('asked') - .05, { y: 1280, s: 1.4 });
counter(T('twenty'), T('got it') - .05, 0, 20, { y: 1260, suffix: '%', label: 'more pay', size: 220, dur: .9 });
icon('check', T('got it'), T('and') + .05, { y: 1280, s: 1.4 });

/* "selfish" */
bg(T('and') - .05, C.pink, { y: 1260 });
icon('people', T('someone'), T('paid') - .15, { x: 260, y: 1300, s: 1.1 });
bubble(T('called'), T('paid') - .15, '"Selfish."', { side: 'right', y: 1180 });
icon('coin', T('paid') - .1, T('he left') - .05, { x: 270, y: 1280, s: 1.2 });
icon('scale', T('what she'), T('he left') - .05, { x: 640, y: 1280, s: 1.2 });
icon('check', T('worth') + .1, T('he left') - .05, { x: 640, y: 1130, s: .7 });

/* his leap */
bg(T('he left') - .05, C.cyan, { y: 1260 });
icon('lock', T('stable'), T('wanted') - .05, { x: 250, y: 1290, s: 1.2 });
arrowFx(T('to start'), T('wanted') - .05, 360, 1290, 560, 1290, { color: C.pink });
icon('house', T('business'), T('wanted') - .05, { x: 690, y: 1290, s: 1.2 });
icon('key', T('freedom') - .15, T('selfish', 2) - .05, { x: 300, y: 1280, s: 1.3 });
icon('chartUp', T('upside') - .15, T('selfish', 2) - .05, { x: 630, y: 1280, s: 1.2 });

/* the label */
bg(T('selfish', 2) - .05, C.ink, { y: 1290 });
bubble(T('selfish', 2), T('thinking') + .3, '"Selfish."', { side: 'left', y: 1200 });
icon('pawn', T('thinking'), T('as if') - .05, { x: 640, y: 1330, s: 1.2 });
icon('thought', T('only'), T('as if') - .05, { x: 330, y: 1400, s: .9 });
icon('heart', T('wanting'), T('here is') - .05, { x: 330, y: 1280, s: 1.3 });
stamp('NOT A FLAW', T('character'), T('here is') - .05, { x: 520, y: 1260, color: C.lime, rot: -.1, size: 100 });

/* after the cut: a constant, like gravity */
bg(T('here is') - .1, C.violet, { y: 1260, sfx: false });
decode('THE TRUTH', T('deeper'), T('self-interest') - .05, { y: 1260, size: 140, bg: C.white, dur: .6 });
versus(T('self-interest'), T('it is a') - .05, 'Good', 'Bad', { y: 1270, ca: C.lime, cb: C.pink });
stamp('NEITHER', T('not good'), T('it is a') - .05, { y: 1450, color: C.white, rot: -.08, size: 100 });
decode('CONSTANT', T('constant'), T('like') - .05, { y: 1260, size: 130, bg: C.lime, dur: .6 });
bg(T('like'), C.pink, { y: 1260 });
arrowFx(T('gravity'), T('you do not') + .8, 450, 1090, 450, 1430, { color: C.lime });
icon('coin', T('gravity'), T('you do not') + .8, { x: 450, y: 1280, s: 1.3, enter: 'drop' });
icon('megaphone', T('moralize') - .15, T('you do not', 2) - .05, { x: 260, y: 1280, s: 1.1 });
icon('cross', T('moralize') + .1, T('you do not', 2) - .05, { x: 640, y: 1280, s: 1.0 });
bubble(T('you do not', 2) + .15, T('you build') - .05, '"Selfish?"', { side: 'right', y: 1150 });
[[250, 1380], [450, 1420], [650, 1380]].forEach(([x, y], i) => icon('coin', T('things') + i * .12, T('you build') - .05, { x, y, s: .8, enter: 'drop' }));
bg(T('you build') - .1, C.lime, { y: 1260 });
icon('house', T('build'), VOICE_END - .1, { y: 1420, s: 1.0, enter: 'drop' });
slam('BUILD', T('build'), VOICE_END - .1, { y: 1180, bg: C.violet, color: C.lime, size: 190, shake: 14 });
burstFx(T('with it') + .1, STAGE.cx, 1250);
