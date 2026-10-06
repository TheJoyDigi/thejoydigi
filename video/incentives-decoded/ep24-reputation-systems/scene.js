/* Level 24, Reputation Systems: trusting a stranger's car because of a number, then "stars are incentives made visible". */
const HOOK = "Why you trust a stranger's car";
const EMPH = ['ride', 'stars', 'thousand', 'machine', 'trust', 'visible', 'scalable', 'earned', 'apart'];
const J = CLIP.joins[0];

const car = col => {
  shape(P(() => ctx.roundRect(-60, -80, 120, 56, 18)), C.lilac);
  shape(P(() => ctx.roundRect(-110, -36, 220, 66, 20)), col);
  [-62, 62].forEach(x => { shape(P(() => ctx.arc(x, 34, 26, 0, 7)), C.ink, { shadow: false, lw: 6 }); shape(P(() => ctx.arc(x, 34, 10, 0, 7)), C.white, { shadow: false, lw: 3 }); });
};
const machine = (t, t0) => {
  ctx.save(); ctx.scale(1.4, 1.4);
  shape(P(() => ctx.roundRect(-150, -90, 300, 180, 28)), C.violet);
  stext('REPUTATION', 0, -20, 38, { color: C.white, stroke: 0, shadow: 0 });
  shape(P(() => ctx.roundRect(-90, 20, 180, 28, 10)), C.ink, { shadow: false, lw: 4 });
  const q = eo(prog(t, t0 + .2, .5)), y = lerp(10, -170, q);
  ctx.save(); ctx.translate(0, y); ctx.scale(.45, .45); ICONS.star(); ctx.restore();
  ctx.restore();
};
const starRow = (t, t0, y, n = 5) => {
  for (let i = 0; i < n; i++) {
    const q = eback(prog(t, t0 + i * .1, .25)); if (q <= 0) continue;
    ctx.save(); ctx.translate(200 + i * 125, y); ctx.scale(.6 * q, .6 * q); ctx.rotate((i - 2) * .08); ICONS.star(); ctx.restore();
  }
};

/* 1. a new city, a ride, a stranger's car, a number */
custom(T('new city'), T('you sleep') - .05, (t, p) => {
  const tR = T('need a ride');
  [[170, 170, C.cyan], [300, 240, C.lilac], [430, 150, C.white], [560, 260, C.cyan], [690, 200, C.lilac]].forEach(([x, h, col], i) => {
    const q = eo(prog(t, T('new city') + i * .08, .35)); ctx.save(); ctx.translate(x, 1530); ctx.scale(1, q); pill(-52, -h, 104, h, col, { r: 10, shadow: 6, lw: 5 }); ctx.restore();
  });
  if (t > tR) { ctx.save(); ctx.translate(lerp(-200, 450, eo(prog(t, tR, .7))), 1450 + Math.sin(t * 9) * 3); ctx.scale(1.5, 1.5); car(C.orange); ctx.restore(); }
});
icon('phone', T('app'), T('four point nine') - .05, { x: 450, y: 1140, s: 1.1 });
custom(T('four point nine'), T('you sleep') - .05, (t, p) => {
  ctx.translate(STAGE.cx, 1170); ctx.scale(Math.min(p, 1) * 1.9, Math.min(p, 1) * 1.9); ICONS.star(); stext('4.9', 0, 8, 62, { color: C.ink, stroke: 0, shadow: 0 });
});

/* 2. stars on a stranger's apartment, a thousand people on a restaurant */
bg(T('you sleep'), C.pink, { y: 1260 });
icon('house', T('apartment'), T('stars') - .05, { y: 1290, s: 1.4 });
custom(T('stars'), T('eat') - .05, (t, p) => starRow(t, T('stars'), 1290));
icon('eye', T('restaurant'), T('thousand') - .05, { y: 1290, s: 1.3 });
counter(T('thousand'), T('said it was good') + .3, 0, 1000, { y: 1260, label: 'people you will never meet', dur: .8, size: 190, color: C.white });
icon('check', T('said it was good'), T('none of this') - .05, { y: 1290, s: 1.5 });

/* 3. thirty years ago none of it worked; a machine made reputation visible */
bg(T('none of this'), C.ink, { y: 1260 });
counter(T('thirty'), T('what changed') - .05, 0, 30, { y: 1260, label: 'years ago', dur: .7, size: 200 });
stamp('NOT YET', T('thirty') + .5, T('what changed') - .05, { y: 1420, size: 90, rot: -.1 });
icon('question', T('what changed'), T('machine') - .05, { y: 1290, s: 1.5 });
custom(T('machine'), J - .05, (t, p) => {
  const apart = prog(t, T('machine apart'), .5);
  ctx.translate(STAGE.cx, lerp(1300, 1400, apart)); ctx.scale(Math.min(p, 1) * lerp(1, .8, apart), Math.min(p, 1) * lerp(1, .8, apart)); ctx.rotate(Math.sin(t * 11) * .015 * apart); machine(t, T('machine'));
});
icon('handshake', T('trust'), T('today') - .05, { x: 450, y: 1170, s: .8 });
decode('TAKE IT APART', T('take'), J - .05, { y: 1110, size: 100, dur: .7, bg: C.lime });
shake(T('apart'), 10);

/* 4. after the cut: the closest thing to scalable trust */
bg(J + .02, C.orange, { y: 1260, sfx: false });
icon('handshake', T('closest thing'), T('protect') - .05, { x: 450, y: 1260, s: 1.2 });
[0, 1, 2, 3, 4].forEach(i => icon('people', T('scalable') + i * .1, T('protect') - .05, { x: 170 + i * 140, y: 1470, s: .4 }));
custom(T('protect'), T('stars are') - .05, (t, p) => { ctx.translate(STAGE.cx, 1290); ctx.scale(Math.min(p, 1), Math.min(p, 1)); machine(t, T('protect')); });
icon('lock', T('protects'), T('stars are') - .05, { x: 650, y: 1190, s: .9 });

/* 5. stars are incentives made visible; make sure yours are earned */
bg(T('stars are'), C.violet, { y: 1260 });
custom(T('stars are'), VOICE_END - .1, (t, p) => starRow(t, T('stars are'), 1390));
custom(T('incentives'), T('made visible') - .05, (t, p) => { ctx.translate(STAGE.cx, 1230); ctx.scale(Math.min(p, 1), Math.min(p, 1)); chip('INCENTIVES', 0, -30, C.lime, C.ink, 40, 'center'); });
icon('eye', T('made visible'), T('make sure') - .05, { x: 450, y: 1230, s: 1.3 });
decode('EARNED', T('earned'), VOICE_END - .1, { y: 1130, size: 130, bg: C.lime, dur: .5 });
shake(T('earned') + .5, 14); burstFx(T('earned') + .5, STAGE.cx, 1300);
