/* Level 07, Status: The Hidden Currency: a $40,000 watch that tells the same time, then "status moves more behavior than cash". */
const HOOK = "Why people buy $40,000 watches";
const EMPH = ['forty', 'thousand', 'time.', 'status', 'rank.', 'says.', 'nobody', 'currency,', 'behavior', 'cash'];

/* the watch costs forty thousand dollars */
icon('clock', T('watch'), T('it tells') - .05, { y: 1260, s: 1.7, enter: 'drop' });
counter(T('forty'), T('it tells') - .05, 0, 40000, { y: 1460, prefix: '$', size: 130, dur: .9 });

/* same time, forty-dollar one */
custom(T('it tells'), T('but') - .05, (t, p) => {
  [[-170, -.08, '$40,000', C.lime], [170, .08, '$40', C.white]].forEach(([dx, rot, price, fill], i) => {
    ctx.save(); ctx.translate(STAGE.cx + dx, 1230); ctx.rotate(rot); ctx.scale(p, p);
    ctx.save(); ctx.scale(.95, .95); ICONS.clock(); ctx.restore();
    ctx.translate(0, 150); chip(price, 0, -30, fill, C.ink, 34, 'center');
    ctx.restore();
  });
  const q = eback(prog(t, T('exactly'), .3)); ctx.save(); ctx.translate(STAGE.cx, 1230); ctx.scale(q, q); pill(-40, -40, 80, 80, C.ink, { r: 40, shadow: 0, lw: 0 }); stext('=', 0, 4, 60, { color: C.lime, stroke: 0, shadow: 0 }); ctx.restore();
});

/* nobody buys it for the time */
bg(T('but'), C.pink, { y: 1260 });
icon('clock', T('nobody'), T('so that') - .05, { y: 1270, s: 1.5 });
stamp('NOT FOR TIME', T('to know'), T('so that') - .05, { y: 1270, color: C.ink, rot: -.14, size: 84 });
icon('eye', T('so that'), T('the car') - .05, { x: 250, y: 1280, s: 1.2 });
arrowFx(T('you know'), T('the car') - .05, 340, 1280, 560, 1280, { color: C.ink });
icon('crown', T('they can'), T('the car') - .05, { x: 690, y: 1270, s: 1.2 });

/* the car, the handbag, the neighborhood, the job title */
bg(T('the car'), C.cyan, { y: 1260 });
[['CAR', 'car', C.lime], ['HANDBAG', 'handbag', C.pink], ['NEIGHBORHOOD', 'neighborhood', C.white], ['JOB TITLE', 'job', C.orange]].forEach(([txt, w, fill], i) =>
  custom(T(w), T('half') - .05, (t, p) => { ctx.translate(STAGE.cx + (i % 2 ? 40 : -40), 1110 + i * 120); ctx.rotate(i % 2 ? .04 : -.04); ctx.scale(p, p); chip(txt, 0, -40, fill, C.ink, 50, 'center'); }));
versus(T('half'), T('welcome') - .05, 'The thing', 'What it says', { y: 1270, ca: C.white, cb: C.lime, winner: 'b', tWin: T('says') });

/* the expensive game nobody admits */
bg(T('welcome'), C.ink, { y: 1290 });
icon('die', T('welcome') + .15, T('people', 2) - .05, { y: 1290, s: 1.5, enter: 'drop' });
[0, 1, 2].forEach(i => icon('coin', T('expensive') + i * .12, T('people', 2) - .05, { x: 250 + i * 200, y: 1130 - (i % 2) * 20, s: .6 }));
icon('lock', T('admits'), T('people', 2) - .05, { x: 540, y: 1340, s: 1.0, rot: .15 });

/* after the cut: status is a currency */
bg(T('people', 2) - .1, C.violet, { y: 1260, sfx: false });
icon('people', T('people', 2), T('real money') - .05, { y: 1280, s: 1.3 });
icon('coin', T('real money'), T('they will') - .05, { x: 250, y: 1280, s: 1.3 });
arrowFx(T('for imaginary'), T('they will') - .05, 360, 1280, 540, 1280, { color: C.lime });
icon('crown', T('imaginary'), T('they will') - .05, { x: 690, y: 1270, s: 1.3 });
counter(T('eighty'), T('they will', 2) - .02, 0, 80, { y: 1230, label: 'hour weeks', size: 220, dur: .6 });
icon('briefcase', T('title', 2) - .2, T('they will', 2) - .05, { y: 1440, s: .8 });
icon('chartDown', T('they will', 2) + .1, T('status') - .05, { x: 270, y: 1280, s: 1.3 });
icon('star', T('logo') - .1, T('status') - .05, { x: 640, y: 1280, s: 1.2 });
decode('STATUS', T('status'), T('it moves') - .05, { y: 1230, size: 170, bg: C.lime, dur: .6 });
icon('coin', T('currency'), T('it moves') - .05, { y: 1430, s: .9 });
meter(T('moves'), VOICE_END - .1, 'Status', 0, .95, { y: 1160, dur: .9 });
meter(T('cash'), VOICE_END - .1, 'Cash', 0, .4, { y: 1370, dur: .7, color: C.white });
shake(T('will', 4), 12); burstFx(T('will', 4), STAGE.cx, 1260);
