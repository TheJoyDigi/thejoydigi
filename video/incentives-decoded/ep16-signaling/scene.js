/* Level 16, Signaling: cold open (the peacock's useless tail, "we just call it a Porsche") then "the cost is the point". */
const HOOK = "A Porsche is a peacock's tail";
const EMPH = ['peacock', "peacock's", 'tail.', 'tail,', 'signal.', 'signal', 'waste', 'proof.', 'porsche.', 'expensive', 'hidden.', 'cost', 'point.'];

const tag = (t0, t1, text, x, y, fill, o = {}) => custom(t0, t1, (t, p) => {
  ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(Math.min(p, 1.1), Math.min(p, 1.1)); chip(text, 0, -30, fill, C.ink, o.size || 30, 'center');
});

/* a peacock: fan of eyed feathers behind a small body */
function peacock(t, s) {
  ctx.scale(s, s);
  const cols = [C.cyan, C.violet, C.lime, C.pink, C.cyan, C.violet, C.lime, C.pink, C.cyan, C.violet, C.lime];
  cols.forEach((c, i) => {
    const a = Math.PI * (1.08 + i * .084) + Math.sin(t * 2 + i) * .012, R = 175 + (i % 2) * 14, x = Math.cos(a) * R, y = 20 + Math.sin(a) * R;
    ctx.lineCap = 'round';
    ctx.strokeStyle = C.ink; ctx.lineWidth = 38; ctx.beginPath(); ctx.moveTo(8, 38); ctx.lineTo(x + 8, y + 8); ctx.stroke();
    ctx.strokeStyle = c; ctx.lineWidth = 26; ctx.beginPath(); ctx.moveTo(0, 30); ctx.lineTo(x, y); ctx.stroke();
    ctx.fillStyle = C.orange; ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(x, y, 18, 0, 7); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.violet; ctx.beginPath(); ctx.arc(x, y, 8, 0, 7); ctx.fill();
  });
  shape(P(() => ctx.ellipse(0, 50, 40, 62, 0, 0, 7)), C.cyan);
  shape(P(() => ctx.arc(0, -26, 24, 0, 7)), C.cyan);
  ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-8, -48); ctx.lineTo(-12, -68); ctx.moveTo(0, -50); ctx.lineTo(0, -72); ctx.moveTo(8, -48); ctx.lineTo(12, -68); ctx.stroke();
  ctx.fillStyle = C.orange; ctx.beginPath(); ctx.moveTo(-5, -22); ctx.lineTo(5, -22); ctx.lineTo(0, -10); ctx.fill();
  ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(-8, -30, 4, 0, 7); ctx.arc(8, -30, 4, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-14, 108); ctx.lineTo(-14, 140); ctx.moveTo(14, 108); ctx.lineTo(14, 140); ctx.stroke();
}
function car(s) {
  ctx.scale(s, s);
  shape(P(() => { ctx.moveTo(-70, -30); ctx.lineTo(-40, -78); ctx.lineTo(40, -78); ctx.lineTo(74, -30); ctx.closePath(); }), C.cyan);
  pill(-120, -40, 240, 74, C.pink, { r: 26, shadow: 10, lw: 7 });
  [-70, 70].forEach(x => { ctx.save(); ctx.translate(x, 36); shape(P(() => ctx.arc(0, 0, 30, 0, 7)), C.ink, { shadow: false }); ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(0, 0, 11, 0, 7); ctx.fill(); ctx.restore(); });
}
const pcScale = t => 1.05 + .3 * eo((t - T('bigger')) / 1.2);

/* the peacock and its tail */
custom(.05, T('because') - .05, (t, p) => { ctx.translate(STAGE.cx, 1335); ctx.rotate(Math.sin(t * 1.5) * .02); peacock(t, pcScale(t) * Math.min(p, 1.1)); });
counter(T('six'), T('heavy') - .05, 0, 6, { y: 1065, suffix: ' FEET', size: 100, dur: 1.2, color: C.lime });
arrowFx(T('heavy'), T('flying') + .5, 730, 1130, 730, 1400, { color: C.pink });
stamp('USELESS', T('useless'), T('flashing') - .05, { y: 1390, rot: -.1, color: C.ink });
custom(T('flashing'), T('evolution') - .05, (t, p) => {
  ctx.translate(360, 1085); ctx.rotate(-.04); ctx.scale(Math.min(p, 1.1), Math.min(p, 1.1));
  const on = Math.sin((t - T('flashing')) * 14) > -.3;
  pill(-190, -52, 380, 104, on ? C.lime : C.lilac, { r: 22, shadow: 10, lw: 7 });
  stext('DINNER', 0, 4, 64, { color: C.ink, stroke: 0, shadow: 0 });
});
icon('eye', T('predators') - .1, T('evolution') - .05, { x: 720, y: 1100, s: .8 });

/* evolution should have killed it; peahens love it */
bg(T('evolution') - .1, C.pink, { y: 1260 });
tag(T('evolution'), T('instead'), 'EVOLUTION', 450, 1090, C.white, { rot: -.03, size: 36 });
icon('cross', T('killed'), T('instead'), { x: 450, y: 1290, s: 1.7 });
tag(T('peahens'), T('because') - .05, 'PEAHENS', 450, 1090, C.lime, { size: 36 });
[[170, 1190, T('love')], [730, 1200, T('bigger')], [160, 1420, T('better')], [740, 1410, T('mate')]].forEach(([x, y, t0], i) =>
  icon('heart', t0, T('because') - .05, { x, y, s: .7 + i * .08, rot: (i % 2 ? .2 : -.2) }));

/* the tail is a signal */
bg(T('because') - .1, C.ink, { y: 1260 });
decode('SIGNAL', T('signal'), T('only') - .05, { y: 1160, size: 140, bg: C.lime, dur: .6 });
icon('megaphone', T('because') + .15, T('only') - .05, { x: 450, y: 1390, s: 1.3 });

/* only a healthy peacock can afford it */
icon('heart', T('healthy'), T('the waste') - .05, { x: 200, y: 1260, s: 1.1 });
icon('coin', T('afford'), T('the waste') - .05, { x: 450, y: 1260, s: 1.1 });
custom(T('grow'), T('the waste') - .05, (t, p) => { ctx.translate(690, 1270); peacock(t, .75 * Math.min(p, 1.1)); });
arrowFx(T('afford') + .1, T('the waste') - .05, 280, 1260, 360, 1260, { color: C.pink });
arrowFx(T('grow'), T('the waste') - .05, 530, 1260, 600, 1260, { color: C.lime });

/* the waste is the proof */
slam('WASTE', T('waste'), T('and') - .05, { y: 1170, bg: C.white });
stamp('PROOF', T('proof'), T('and') - .05, { y: 1350, rot: -.1, color: C.lime });
icon('check', T('proof') + .15, T('and') - .05, { x: 450, y: 1470, s: .8 });

/* humans do the same: a Porsche */
bg(T('and') - .1, C.cyan, { y: 1260 });
icon('people', T('humans'), T('we') - .05, { x: 190, y: 1290, s: 1.1 });
custom(T('same'), T('we') - .05, (t, p) => {
  ctx.translate(345, 1290); ctx.scale(Math.min(p, 1.1), Math.min(p, 1.1)); ctx.lineCap = 'round';
  [-16, 16].forEach(y => { ctx.strokeStyle = C.ink; ctx.lineWidth = 30; ctx.beginPath(); ctx.moveTo(-34, y + 5); ctx.lineTo(34, y + 5); ctx.stroke(); ctx.strokeStyle = C.lime; ctx.lineWidth = 18; ctx.beginPath(); ctx.moveTo(-34, y); ctx.lineTo(34, y); ctx.stroke(); });
});
custom(T('same'), T('we') - .05, (t, p) => { ctx.translate(630, 1310); peacock(t, .7 * Math.min(p, 1.1)); });
custom(T('porsche'), CLIP.joins[0] - .05, (t, p) => { ctx.translate(STAGE.cx, 1300); ctx.rotate(-.04); car(1.9 * Math.min(p, 1.1)); });
tag(T('porsche') + .05, CLIP.joins[0] - .05, 'PORSCHE', 450, 1490, C.lime, { size: 40 });

/* after the cut: what a signal is */
bg(T('signal', 2) - .1, C.lime, { y: 1260, sfx: false });
decode('SIGNAL', T('signal', 2), T('expensive') - .05, { y: 1180, size: 150, bg: C.violet, color: C.white, dur: .5 });
icon('coin', T('expensive'), T('you') - .05, { x: 230, y: 1280, s: 1.3 });
tag(T('expensive'), T('you') - .05, 'EXPENSIVE', 230, 1450, C.white, { size: 32 });
arrowFx(T('proves'), T('you') - .05, 320, 1280, 540, 1280, { color: C.ink });
icon('lock', T('something', 3) - .1, T('you') - .05, { x: 650, y: 1280, s: 1.3 });
tag(T('hidden'), T('you') - .05, 'HIDDEN', 650, 1450, C.pink, { size: 32 });

/* you cannot see intelligence ... diploma; wealth ... car */
icon('eye', T('cannot'), T('so') - .05, { x: 450, y: 1250, s: 1.3 });
icon('cross', T('see') + .1, T('so') - .05, { x: 580, y: 1190, s: .8, sfx: false });
tag(T('intelligence'), T('so') - .05, 'INTELLIGENCE', 450, 1420, C.white, { size: 34 });
custom(T('so'), T('you', 3) - .05, (t, p) => {
  ctx.translate(STAGE.cx, 1280); ctx.rotate(-.05); ctx.scale(Math.min(p, 1.1) * 1.2, Math.min(p, 1.1) * 1.2);
  pill(-150, -80, 300, 160, C.white, { r: 14, shadow: 10, lw: 7 });
  ctx.fillStyle = C.ink; [-40, -10, 20].forEach(y => ctx.fillRect(-110, y, 220, 8));
  ctx.fillStyle = C.pink; ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(100, 58, 24, 0, 7); ctx.fill(); ctx.stroke();
  chip('DIPLOMA', 0, 100, C.lime, C.ink, 30, 'center');
});
icon('eye', T('cannot', 2), T('so', 2) - .05, { x: 450, y: 1250, s: 1.3 });
icon('cross', T('see', 2) + .1, T('so', 2) - .05, { x: 580, y: 1190, s: .8, sfx: false });
tag(T('wealth'), T('so', 2) - .05, 'WEALTH', 450, 1420, C.white, { size: 34 });
custom(T('car') - .35, T('cost') - .05, (t, p) => { ctx.translate(STAGE.cx, 1290); ctx.rotate(-.04); car(1.9 * Math.min(p, 1.1)); });

/* the cost is the point */
bg(T('cost') - .35, C.violet, { y: 1260 });
slam('THE COST', T('cost'), VOICE_END - .1, { y: 1170, bg: C.lime });
icon('target', T('point'), VOICE_END - .1, { x: 450, y: 1400, s: 1.3 });
shake(T('point') + .05, 14); burstFx(T('point') + .05, STAGE.cx, 1280);
