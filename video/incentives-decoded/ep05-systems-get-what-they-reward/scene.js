/* Level 05, Systems Get What They Reward: the call-center metric that backfired, then "you get what you reward". */
const HOOK = "Why call centers hang up on you";
const EMPH = ['faster', 'shorter', 'collapses.', 'measured.', 'wrong', 'reward', 'reward.', 'exactly', 'perfectly.', 'fail.', 'goal.', 'truth.'];

/* a company wants faster calls */
icon('briefcase', T('company'), T('so they') - .05, { x: 270, y: 1290, s: 1.1 });
icon('lightning', T('faster'), T('so they') - .05, { x: 450, y: 1170, s: .75 });
icon('phone', T('customer'), T('so they') - .05, { x: 640, y: 1290, s: 1.15, enter: 'drop' });
icon('clock', T('measure'), T('shorter') - .05, { y: 1290, s: 1.5, spin: true });
icon('clock', T('shorter'), T('within') - .05, { x: 270, y: 1150, s: .8 });
meter(T('better'), T('within') - .05, 'Score', .15, .95, { y: 1370, dur: .7 });

/* it backfires */
bg(T('within') - .05, C.pink, { y: 1260 });
icon('people', T('agents'), T('the average') - .05, { x: 250, y: 1280, s: 1.2 });
icon('phone', T('hanging'), T('the average') - .05, { x: 650, y: 1260, s: 1.2, enter: 'drop' });
stamp('HUNG UP', T('hanging up') + .15, T('the average') - .05, { x: 650, y: 1440, color: C.ink, rot: -.1, size: 70 });
icon('warning', T('complicated'), T('the average') - .05, { x: 450, y: 1130, s: .8 });
meter(T('average call'), T('they got') - .05, 'Avg call time', .9, .1, { y: 1170, dur: .9 });
meter(T('customer satisfaction'), T('they got') - .05, 'Satisfaction', .9, .1, { y: 1380, dur: .9, color: C.pink });

/* exactly what they measured */
bg(T('they got'), C.ink, { y: 1290 });
icon('target', T('they got'), T('fast calls') - .05, { y: 1280, s: 1.4 });
versus(T('fast calls'), T('the system') - .05, 'Fast calls', 'Solved problems', { y: 1270, ca: C.lime, cb: C.white, winner: 'a', tWin: T('not solved') });
icon('chartUp', T('worked') , T('this is') - .05, { x: 630, y: 1280, s: 1.2 });
icon('check', T('perfectly'), T('it just') - .05, { x: 270, y: 1280, s: 1.2 });
icon('people', T('against'), T('this is') - .05, { x: 270, y: 1280, s: 1.2 });
arrowFx(T('against'), T('this is') - .05, 540, 1280, 380, 1280, { color: C.pink });

/* the system succeeds at the wrong goal */
bg(T('this is'), C.violet, { y: 1260 });
icon('chartDown', T('this is'), T('reward') - .05, { y: 1280, s: 1.3 });
icon('gift', T('reward'), T('the system', 2) - .05, { y: 1400, s: .95 });
decode('WRONG THING', T('wrong thing') - .2, T('the system', 2) - .05, { y: 1170, size: 120, bg: C.pink, dur: .6 });
icon('target', T('the system', 2) + .05, T('here is') - .05, { y: 1430, s: .95 });
stamp('NOT BROKEN', T('fail') - .15, T('it succeeds') - .05, { y: 1230, color: C.lime, rot: -.1, size: 90 });
slam('WRONG GOAL', T('wrong', 2), T('here is') - .05, { y: 1190, bg: C.pink, color: C.ink, size: 130, shake: 14 });

/* after the cut: you get what you reward */
bg(T('here is') - .1, C.lime, { y: 1260, sfx: false });
decode('DEEP', T('deep'), T('you do not') - .05, { y: 1150, size: 150, bg: C.white, dur: .3 });
decode('TRUTH', T('deep') + .2, T('you do not') - .05, { y: 1320, size: 170, bg: C.white, dur: .5 });
icon('thought', T('you do not'), T('do', 2) - .05, { x: 330, y: 1280, s: 1.3 });
icon('cross', T('hope') + .1, T('do', 2) - .05, { x: 640, y: 1170, s: .8 });
icon('scale', T('do', 2), T('get', 3) - .05, { x: 330, y: 1280, s: 1.3 });
icon('cross', T('deserve') - .5, T('get', 3) - .05, { x: 640, y: 1170, s: .8 });
icon('gift', T('get', 3), VOICE_END - .1, { x: 450, y: 1440, s: .85 });
decode('REWARD', T('what you reward') + .05, VOICE_END - .1, { y: 1220, size: 180, bg: C.violet, color: C.lime, dur: .5 });
burstFx(T('reward', 2), STAGE.cx, 1230); shake(T('reward', 2), 12);
