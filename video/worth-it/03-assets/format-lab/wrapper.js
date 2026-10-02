/* wrapper: exposes the engine to the page as window.WL. Everything draws on the one shared engine canvas, then is copied to a visible canvas. */
var POSE_NAMES=['stand','shock','think','point','joy','resolve','shrug'];
var FACE_NAMES=['calm','shock','think','resolve','joy','sad'];

var CUPD=function(t){gCup(180,234,1.2,t);};
var DEVICES=[
  {id:'world',title:'Moving world',poster:1.2,dur:4,box:[0,90,360,450],
   what:'Always in motion: a perspective floor racing toward you, two parallax skylines and light streaks. Speed follows the story.',
   rule:'Stops on the hit, surges on every slam. Low contrast so panels stay readable.',
   draw:function(t){var pos=t*1.5+Math.sin(t*2)*.2;gWorld(t,pos,{});wiLead(180,520,1.0,'point',t);}},
  {id:'outro',title:'Outro card',poster:2.4,dur:3.2,box:[0,100,360,330],
   what:'The Joy Digi brand in the show\u2019s style: the mark assembles from particles, a teal title card holds the wordmark and credit.',
   rule:'Brand colours and mark stay. Credit and disclaimer always inside the safe box.',
   draw:function(t){gOutro(t,1);}},
  {id:'boss',title:'Boss alert',poster:2.2,dur:3.2,box:[20,138,320,176],
   what:'The myth shows up as a boss: red hazard tab, panel, HP bar. One critical hit breaks it.',
   rule:'Red marks the myth only. Never Wren or the viewer.',
   draw:function(t){gBoss(t,['Everyone says the','five-dollar coffee','is keeping you broke.'],{hit:1.2});if(t>1.2)gImpact((t-1.2)/.35,{x:180,y:230});}},
  {id:'scan',title:'Identify scan',poster:5.2,dur:6,box:[20,150,320,300],
   what:'A reticle locks onto an everyday item and its hidden value reads out as stat bars.',
   rule:'Gold means value found. One item per episode.',
   draw:function(t){gScan(180,232,64,t,{draw:function(){CUPD(t);}});gStats(40,312,220,t-1.5,[['a warm cup',.9,'+COMFORT'],['a place to sit',.72,'+SPACE'],['ten quiet minutes',1,'+TIME']]);}},
  {id:'gate',title:'Level gate',poster:5,dur:5.4,box:[20,212,320,200],
   what:'Buy side below, create side above. The better question plays as a typed dialogue box and opens the gate.',
   rule:'The flip always crosses the gate.',
   draw:function(t){gGate(248,t,{lit:sm(clamp((t-3.4)/.5,0,1))});gDialog(40,296,220,100,'WREN',['What can I make that','someone would pay','five dollars for?'],t-.3,{cps:26});}},
  {id:'quest',title:'Quest + level up',poster:4.2,dur:4.8,box:[20,140,320,300],
   what:'One action on a quest card with a reward, then LEVEL UP and the Worth it. plate.',
   rule:'One action. Hold still before the level-up.',
   draw:function(t){gQuest(40,160,220,['Write down one thing','people already ask you','for help with.'],t);if(t>1.7)gLevelUp(150,352,t-1.7);gWorthPlate(120,408,t-2.1);}},
  {id:'punch',title:'Punch motion',poster:.35,dur:1.6,box:[0,120,360,360],
   what:'Hit-stop, a zoom-punch with damped shake and roll, colour-split ghosting, a flash and a particle burst.',
   rule:'Only on hits and slams. Quick attack, fast decay.',
   draw:function(t){gPunchBegin(t,[[.3,.12,8,.014]],180,300);gBoss(1.4,['Everyone says the','five-dollar coffee','is keeping you broke.'],{hit:.3});wiLead(150,520,1.1,'shock',t);gBurst(180,230,t-.3,[G.red,'#fff',G.gold],18,200,320);gGhost(t,.3,.25,6);c.restore();gFlash(t,.3,'#fff',.4,.2);}},
  {id:'hit',title:'Hit frame',poster:.16,dur:1.2,box:[0,126,360,300],
   what:'White flash, burst lines, shock rings and a slash the instant the myth is struck.',
   rule:'Reserved for the myth strike.',
   draw:function(t){gBoss(.95+t*0,['Everyone says the','five-dollar coffee','is keeping you broke.'],{hit:.95});gImpact(t/.35,{x:180,y:230});}},
  {id:'damage',title:'Damage pops',poster:1.1,dur:2.4,box:[30,140,300,150],
   what:'Numbers and words that pop, rise and fade: +25 XP, +1 PERSPECTIVE.',
   rule:'Use sparingly, one per beat at most. Gold or green only.',
   draw:function(t){gDamage(90,230,'+25 XP',t-.1,G.gold,22);gDamage(220,250,'+1 PERSPECTIVE',t-.6,G.green,16);}},
  {id:'sfx',title:'Sound-effect words',poster:.5,dur:1.6,box:[30,120,300,200],
   what:'Comic-style onomatopoeia on a starburst: CRIT!, DING!, LV UP! Pops, wobbles, fades.',
   rule:'One per hit. Red for the myth, gold for value.',
   draw:function(t){gSfx('CRIT!',110,200,.18,t,G.red,38);gSfx('DING!',230,230,-.2,t-.4,G.gold,34);}},
  {id:'flow',title:'Stepper infographic',poster:3.2,dur:6.2,box:[30,138,240,250],
   what:'Three small step chips on top and one big card at a time: problem, solved, paid.',
   rule:'One idea per card. Icon first, then words. Max three rows.',
   draw:function(t){iStepper(t);}},
  {id:'swap',title:'Trade places',poster:3.2,dur:4,box:[20,130,320,200],
   what:'You and the shop trade places; the money flips direction and turns green.',
   rule:'Colour changes only on the flip.',
   draw:function(t){iSwap(t,1.6,200);}},
  {id:'hud',title:'XP bar + level',poster:2.6,dur:3.4,box:[28,86,304,44],
   what:'A top HUD that fills across the episode and flips to the next level on the move.',
   rule:'Always inside the safe box. Never covers a face.',
   draw:function(t){gHud(t,clamp(t/2.6,0,1),t>2.7?2:1,'EP 01');}},
  {id:'emote',title:'Emote marks',poster:2,dur:3,box:[40,250,280,150],
   what:'Small pop-in symbols for what a face cannot say: surprise, doubt, nerves, a good idea.',
   rule:'One mark per beat. Never stacked.',
   draw:function(t){wiEmote('bang',85,325,2.1,t,.2);wiEmote('ques',152,325,2.1,t,.6);wiEmote('sweat',220,325,2.1,t,1);wiEmote('spark',285,325,2.4,t,1.4);}},
  {id:'lines',title:'Focus lines',poster:1,dur:2,box:[20,130,320,250],
   what:'Radial lines redrawn at 12 fps like hand-drawn cels, on a realisation.',
   rule:'Cyan or gold. Never red.',
   draw:function(t){wiSpeedLines(180,285,t,{r0:90,n:40,col:'rgba(47,227,208,.35)'});wiLead(180,340,1.4,'shock',t);}},
  {id:'push',title:'Camera push',poster:1.6,dur:3,box:[0,110,360,330],
   what:'A slow zoom toward what matters, with shake only on a hit.',
   rule:'Ease in-out. Never jitter without a hit.',
   draw:function(t){wiCam(180,215,t,0,2.8,1.3,0);gScan(180,215,56,t+1.4,{draw:function(){CUPD(t);}});c.restore();}}
];

function copyOut(target,box){
  var tc=target.getContext('2d');
  tc.clearRect(0,0,target.width,target.height);
  tc.drawImage(cv,box[0]*SC,box[1]*SC,box[2]*SC,box[3]*SC,0,0,target.width,target.height);
}
function sizeTo(target,box,k){var w=Math.round(box[2]*(k||2)),h=Math.round(box[3]*(k||2));if(target.width!==w)target.width=w;if(target.height!==h)target.height=h;}

window.WL={
  makeSynth:makeSynth,soundCues:SOUND,
  DUR:DUR,BEATS:BEATS,CUES:CUES,LAYERS:LAYERS,POSE_NAMES:POSE_NAMES,FACE_NAMES:FACE_NAMES,DEVICES:DEVICES,beatAt:beatAt,
  palette:G,
  frame:function(t,target){drawDemo(t);var tc=target.getContext('2d');tc.drawImage(cv,0,0,target.width,target.height);},
  poseShot:function(target,name,t){
    var box=[85,215,190,215];sizeTo(target,box,2);
    c.setTransform(SC,0,0,SC,0,0);gBg(0,{tint:G.violet});wiLead(180,400,1.6,name,t||1);copyOut(target,box);},
  faceShot:function(target,face,t){
    var box=[110,205,140,130];sizeTo(target,box,2);
    c.setTransform(SC,0,0,SC,0,0);gBg(0,{tint:G.violet});wiLead(180,480,2.6,'stand',t||1,{face:face,gz:[0,0]});copyOut(target,box);},
  deviceShot:function(target,id,t){
    var d=null,i;for(i=0;i<DEVICES.length;i++)if(DEVICES[i].id===id)d=DEVICES[i];
    if(!d)return;sizeTo(target,d.box,2);
    c.setTransform(SC,0,0,SC,0,0);gBg(t,{tint:G.violet});d.draw(t);copyOut(target,d.box);}
};
