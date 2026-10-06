/* Level 15, Tragedy of the Commons: cold open (fridge, printer, group chat) then the commons definition and the ruin. */
const HOOK = "Why nobody cleans the office fridge";
const EMPH = ['fridge.', 'nobody', "nobody's", "everybody's", 'destroyed.', 'tragedy', 'commons', 'shared', 'grab', 'ruin.', 'noise.'];

const tag = (t0, t1, text, x, y, fill, o = {}) => custom(t0, t1, (t, p) => {
  ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(Math.min(p, 1.1), Math.min(p, 1.1)); chip(text, 0, -30, fill, C.ink, o.size || 30, 'center');
});
function fridge(s) {
  ctx.scale(s, s);
  pill(-80, -140, 160, 280, C.white, { r: 22, shadow: 10, lw: 7 });
  ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-80, -40); ctx.lineTo(80, -40); ctx.stroke();
  pill(52, -110, 12, 50, C.ink, { r: 5, shadow: 0, lw: 0 }); pill(52, -20, 12, 70, C.ink, { r: 5, shadow: 0, lw: 0 });
  [[-48, -100, C.pink], [-20, -88, C.cyan], [-44, -64, C.lime]].forEach(([x, y, c]) => { ctx.fillStyle = c; ctx.strokeStyle = C.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(x - 11, y - 11, 22, 22, 4); ctx.fill(); ctx.stroke(); });
}
function printer(s, jam) {
  ctx.scale(s, s);
  pill(-80, -110, 160, 60, C.lilac, { r: 8, shadow: 8, lw: 6 });
  pill(-130, -50, 260, 120, C.white, { r: 20, shadow: 10, lw: 7 });
  pill(-90, 20, 180, 14, C.ink, { r: 6, shadow: 0, lw: 0 });
  ctx.fillStyle = C.lime; ctx.strokeStyle = C.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(95, -22, 11, 0, 7); ctx.fill(); ctx.stroke();
  ctx.save(); ctx.translate(0, 24);
  if (jam) { shape(P(() => { ctx.moveTo(-60, 0); ctx.lineTo(-30, 40); ctx.lineTo(0, 6); ctx.lineTo(28, 46); ctx.lineTo(60, 8); ctx.lineTo(60, 70); ctx.lineTo(-60, 70); ctx.closePath(); }), C.white, { lw: 5, shadow: false }); }
  else shape(P(() => ctx.rect(-60, 0, 120, 70)), C.white, { lw: 5, shadow: false });
  ctx.restore();
}
function lake(t, n, p) {
  ctx.translate(STAGE.cx, 1340); ctx.scale(Math.min(p, 1.08), Math.min(p, 1.08));
  shape(P(() => ctx.ellipse(0, 0, 290, 120, 0, 0, 7)), C.cyan);
  ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 6; ctx.lineCap = 'round';
  [[-170, -40, 60], [120, 50, 70], [10, -75, 50]].forEach(([x, y, w]) => { ctx.beginPath(); ctx.moveTo(x, y + Math.sin(t * 3 + x) * 3); ctx.quadraticCurveTo(x + w / 2, y - 10, x + w, y); ctx.stroke(); });
  ctx.restore();
  const pos = [[-150, -10], [-40, 30], [70, -30], [160, 20], [-80, -50], [30, 55]];
  for (let i = 0; i < Math.min(6, Math.ceil(n)); i++) { ctx.save(); ctx.translate(pos[i][0], pos[i][1] + Math.sin(t * 2.5 + i) * 5); ctx.rotate(i % 2 ? .15 : -.15); const q = Math.min(1, n - i); ctx.scale(.42 * q, .42 * q); ICONS.fish(); ctx.restore(); }
}

/* the office fridge */
custom(.05, T('nobody'), (t, p) => { ctx.translate(STAGE.cx - 90, 1290); ctx.rotate(-.04); fridge(1.25 * Math.min(p, 1.1)); });
tag(T('office') + .05, T('nobody'), 'OFFICE FRIDGE', 450, 1500, C.lime, { size: 34 });
icon('fish', T('fish'), T('nobody'), { x: 650, y: 1190, s: 1 });
custom(T('yogurt'), T('nobody'), (t, p) => {
  ctx.translate(650, 1380); ctx.scale(Math.min(p, 1.1), Math.min(p, 1.1));
  shape(P(() => { ctx.moveTo(-60, -50); ctx.lineTo(60, -50); ctx.lineTo(44, 60); ctx.lineTo(-44, 60); ctx.closePath(); }), C.white);
  shape(P(() => ctx.roundRect(-66, -72, 132, 26, 8)), C.pink, { shadow: false });
  stext('2019', 0, 10, 40, { color: C.violet, stroke: 0, shadow: 0 });
});
bg(T('nobody') - .1, C.pink, { y: 1260 });

/* everybody's job, nobody's job */
custom(T('nobody'), T('the shared') - .05, (t, p) => { ctx.translate(190, 1340); ctx.rotate(-.04); fridge(.85 * Math.min(p, 1.1)); });
icon('people', T("everybody's"), T("nobody's") - .05, { x: 600, y: 1300, s: 1.4 });
tag(T("everybody's"), T("nobody's") - .05, "EVERYBODY'S JOB", 450, 1130, C.lime, { rot: -.03 });
stamp("NOBODY'S JOB", T("nobody's"), T('the shared') - .05, { x: 430, y: 1290, rot: -.1, color: C.ink });
icon('cross', T("nobody's") + .1, T('the shared') - .05, { x: 640, y: 1150, s: .9 });

/* the printer */
bg(T('the shared') - .1, C.cyan, { y: 1260 });
custom(T('printer'), T('everyone') - .05, (t, p) => { ctx.translate(STAGE.cx, 1250); ctx.rotate(-.03); printer(1.35 * Math.min(p, 1.1), t > T('jammed')); });
stamp('JAMMED', T('jammed'), T('everyone') - .05, { y: 1130, rot: -.1, color: C.ink });
meter(T('out'), T('everyone') - .05, 'Toner', 1, 0, { y: 1450, dur: .9, color: C.violet });
[0, 1, 2].forEach(i => { icon('pawn', T('everyone') + i * .15, T('group') - .05, { x: 220 + i * 230, y: 1420, s: .7 }); arrowFx(T('everyone') + .3 + i * .1, T('no one') - .1, 220 + i * 230, 1340, 300 + i * 150, 1240, { color: C.ink }); });
stamp('NO ONE', T('no one') + .1, T('group') - .05, { y: 1180, rot: -.1, color: C.ink });

/* the group chat */
bg(T('group') - .1, C.ink, { y: 1260 });
icon('phone', T('group'), T('everyone', 2) - .05, { x: 450, y: 1400, s: 1.2 });
counter(T('one hundred'), T('everyone', 2) - .05, 0, 100, { y: 1170, dur: 1.1, label: 'Unread', color: C.lime });
[0, 1, 2].forEach(i => icon('megaphone', T('everyone', 2) + i * .2, T('signal') - .05, { x: 230 + i * 220, y: 1440, s: .75, rot: (i - 1) * .2 }));
icon('eye', T('nobody', 2), T('signal') - .05, { x: 450, y: 1210, s: 1.2 });
icon('cross', T('reads'), T('signal') - .05, { x: 590, y: 1170, s: .7, sfx: false });
icon('lightning', T('signal'), T('different') - .05, { y: 1290, s: 1.4 });
custom(T('drowns'), T('different') - .05, (t, p) => {
  const n = Math.floor((t - T('drowns')) * 60);
  for (let i = 0; i < Math.min(n, 40); i++) {
    const x = STAGE.cx - 300 + rnd(i * 3 + 1) * 600, y = 1120 + rnd(i * 5 + 2) * 340, a = rnd(i * 7 + 3) * 6.28, L = 40 + rnd(i) * 60;
    ctx.strokeStyle = [C.white, C.pink, C.cyan, C.orange][i % 4]; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.globalAlpha = .9;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * L, y + Math.sin(a) * L); ctx.stroke();
  }
});

/* different places, same pattern */
bg(T('different') - .1, C.violet, { y: 1260, sfx: false });
custom(T('different'), T('when') - .05, (t, p) => {
  ctx.save(); ctx.translate(170, 1290); fridge(.8 * Math.min(p, 1.1)); ctx.restore();
  ctx.save(); ctx.translate(450, 1300); printer(1 * Math.min(p, 1.1), false); ctx.restore();
  ctx.save(); ctx.translate(730, 1290); ctx.scale(1.2 * Math.min(p, 1.1), 1.2 * Math.min(p, 1.1)); ICONS.phone(); ctx.restore();
  if (t > T('same')) [310, 590].forEach(x => { ctx.save(); ctx.translate(x, 1296); ctx.scale(Math.min(1, (t - T('same')) * 5), 1); ctx.fillStyle = C.lime; ctx.strokeStyle = C.ink; ctx.lineWidth = 5; [-12, 12].forEach(y => { ctx.beginPath(); ctx.roundRect(-20, y - 6, 40, 12, 5); ctx.fill(); ctx.stroke(); }); ctx.restore(); });
});
versus(T('when'), T('and') - .05, 'Everyone owns it', 'No one does', { y: 1270, winner: 'b', tWin: T('no one', 2), cb: C.lime });
icon('fire', T('what'), T('tragedy') - .1, { y: 1250, s: 1.4 });
stamp('DESTROYED', T('destroyed') - .15, T('tragedy') - .1, { y: 1400, rot: -.1, color: C.pink });

/* after the cut: the tragedy of the commons */
bg(T('tragedy') - .15, C.lime, { y: 1260, sfx: false });
decode('TRAGEDY', T('tragedy'), T('when', 2) - .05, { y: 1150, size: 130, bg: C.violet, color: C.white, dur: .6 });
decode('THE COMMONS', T('commons'), T('when', 2) - .05, { y: 1300, size: 96, bg: C.violet, color: C.white, dur: .6 });
custom(T('resource'), T('takes') - .05, (t, p) => lake(t, 6, p));
tag(T('shared', 2), T('takes') - .05, 'SHARED', 450, 1160, C.white, { rot: -.04 });
icon('key', T('nobody owns') + .15, T('takes') - .05, { x: 640, y: 1170, s: .9 });
icon('cross', T('nobody owns') + .45, T('takes') - .05, { x: 740, y: 1230, s: .6, sfx: false });

custom(T('takes') - .05, T('incentive') - .05, (t, p) => lake(t, Math.max(0, 6 - (t - T('takes')) * 3.2), 1));
[[170, 1160], [730, 1160]].forEach(([x, y], i) => { icon('pawn', T('everyone', 4) + i * .12, T('incentive') - .05, { x, y, s: .7 }); arrowFx(T('takes') + i * .12, T('takes') + .9 + i * .1, x + (i ? -50 : 50), y + 60, 450, 1290, { color: C.ink }); });

/* the incentive is to grab first */
icon('fish', T('grab') - .3, T('and', 3) - .05, { x: 450, y: 1290, s: 1.3 });
icon('pawn', T('incentive'), T('and', 3) - .05, { x: 150, y: 1290, s: .9 });
icon('pawn', T('incentive') + .1, T('and', 3) - .05, { x: 750, y: 1290, s: .9 });
arrowFx(T('grab'), T('and', 3) - .05, 240, 1290, 360, 1290, { color: C.pink });
arrowFx(T('grab') + .05, T('and', 3) - .05, 660, 1290, 540, 1290, { color: C.cyan });
tag(T('before'), T('and', 3) - .05, 'GRAB FIRST', 450, 1450, C.lime, { size: 36 });

/* the result is ruin */
bg(T('and', 3) - .1, C.ink, { y: 1260 });
icon('chartDown', T('result'), VOICE_END - .1, { x: 450, y: 1410, s: 1.2 });
slam('RUIN', T('ruin'), VOICE_END - .1, { y: 1180, bg: C.pink, color: C.ink, size: 150 });
