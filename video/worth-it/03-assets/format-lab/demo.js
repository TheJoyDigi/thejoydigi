/* Format Lab demo v2: Ep 1 (The Five-Dollar Coffee) staged as a gaming-style anime short. Beat times from the voiced track (30.79 s). */
var DUR=32.0;
var LAYERS={char:true,fx:true,ui:true,world:true};

var BEATS=[
  {id:'myth',name:'MYTH',t0:0,t1:5.3,job:'A boss appears: the belief everyone repeats. One critical hit breaks it.',
   onscreen:'Everyone says the five-dollar coffee is keeping you broke.',
   narr:'Everyone says the five-dollar coffee is keeping you broke. They’re wrong. The coffee was never the trap.',
   char:'Wren: shock (eyes wide), then a sharp, thinking look after the hit',
   device:'Boss alert: red hazard tab, myth in a boss panel, HP bar, slash, MYTH BROKEN',
   fx:'Hit-stop, white flash, burst lines and particles, shock rings, colour-split ghosting, one CRIT! word, zoom-punch and damped shake',
   camera:'Push in, with a 10% zoom-punch and damped shake on the hit',
   sound:'Low drone, alarm blips, a heavy hit with a crisp sting',
   hold:'Hit lands at 0.95 s. Boss text is readable by 0.5 s (cover frame)'},
  {id:'reframe',name:'REFRAME',t0:5.3,t1:15.6,job:'Identify the item and reveal the value it hides.',
   onscreen:'a warm cup / a place to sit / ten quiet minutes',
   narr:'Someone solved a problem. A warm cup, a place to sit, ten quiet minutes. And you gladly paid five dollars for it. Problem solved. Value paid.',
   char:'Wren (smaller): think, then point at the cup, joy at the payoff',
   device:'Identify scan, then a stepper: three step chips on top, one big card at a time (problem, solved, paid)',
   fx:'Scan beam, a whip transition between steps, soft focus lines',
   camera:'Slow push toward the item',
   sound:'Brighter pad, scan beeps, a pluck per row, coin clinks on the payoff, steady kick and bass',
   hold:'Cutaway scan while the narrator pauses; each step locks to its line'},
  {id:'flip',name:'FLIP',t0:15.6,t1:23.2,job:'Turn the viewer from buyer to maker with one better question.',
   onscreen:'What can I make that someone would pay five dollars for?',
   narr:'So stop asking, how do I spend less. Ask the better question. What can I make, that someone would pay five dollars for?',
   char:'Wren: think while she asks, resolve as the gate opens',
   device:'Trade-places diagram, then the level gate with the question typed in a dialogue box',
   fx:'Money arrow flips, typewriter text, gate turns green, NEW PATH UNLOCKED',
   camera:'Locked, then a small push as the gate opens',
   sound:'Falling plucks as money leaves, a rising sweep on the flip, typing ticks, a chime as the gate opens',
   hold:'Money flips on "ask the better question"; the question types out in time with the voice'},
  {id:'move',name:'MOVE',t0:23.2,t1:28.9,job:'Give exactly one action the viewer can do today.',
   onscreen:'NEW QUEST: Write down one thing people already ask you for help with. Reward +1 WORTH',
   narr:'Answer that, and you\u2019re not the customer anymore. You\u2019re on the other side of the counter. Worth it.',
   char:'Wren: resolve, then joy on the level-up',
   device:'Quest card: one action, reward line, then LEVEL UP and the Worth it. plate',
   fx:'Level-up rays, XP bar fills, LV 02',
   camera:'Locked off. Stillness is the device',
   sound:'Warm swell, plucks as lines appear, level-up arpeggio, stamp thump',
   hold:'Level-up lands on "other side of the counter"; the plate stamps on "Worth it."'},
  {id:'slate',name:'SLATE',t0:28.9,t1:32,job:'Credit The Joy Digi, in the show\u2019s arcade style, and show the disclaimer.',
   onscreen:'The Joy Digi / Worth It is a production of The Joy Digi / Educational only. Not financial advice.',
   narr:'(silence, music tail)',
   char:'None. The brand mark is the star',
   device:'Arcade outro: EPISODE COMPLETE tag, the Joy Digi mark assembles from particles, a teal title card holds the wordmark, credit and disclaimer',
   fx:'Gold flash into the card, particle assemble, shock ring, spinning mark, orbiting sparkles, light sweep, the racing floor keeps moving',
   camera:'Locked. The world keeps moving behind it',
   sound:'Whoosh, a riser into the mark landing, a boom and chime, a rising arpeggio, twinkles',
   hold:'About 3.1 s so the brand lands without feeling rushed'}
];

/* timed cues the live readout lists while active: [start, end, kind, label] */
var CUES=[
  [0,32,'fx','Moving world: parallax skyline, racing floor, light streaks'],
  [0,5.3,'text','Myth line in the boss panel (Russo One)'],
  [0,.9,'fx','Red alert pulse'],[.95,1.3,'fx','Hit: flash, burst, rings, slash'],[1.0,2.4,'fx','CRIT! sound-effect word'],
  [.95,1.6,'camera','Zoom punch + damped shake'],[.95,1.05,'camera','Hit-stop (1/12 s freeze): the world stops too'],[.95,1.2,'fx','Colour-split ghosting'],[0,5.3,'camera','Slow push in'],
  [0,5.3,'device','Boss alert + HP bar'],
  [.3,2.4,'fx','! emote'],
  [0,2.6,'char','Wren: shock'],[2.6,5.3,'char','Wren: think'],
  [5.3,6.5,'device','Identify scan'],[5.3,6.5,'char','Wren: point'],[5.3,6.5,'fx','Pendant glow + focus lines'],
  [6.5,13.7,'device','Stepper infographic'],[6.5,13.7,'text','Step card: problem, solved, paid'],
  [6.5,7.85,'char','Wren: think'],[7.85,11.3,'char','Wren: point'],[11.3,13.7,'char','Wren: joy'],
  [5.3,15.6,'camera','Slow push in'],
  [13.7,15.6,'text','Kinetic type: PROBLEM SOLVED. VALUE PAID.'],[13.75,14.8,'fx','Slam lines + particle burst'],[13.75,14.5,'camera','Two zoom punches on the slams'],[13.7,15.6,'fx','DING! + gold focus lines'],[13.7,15.6,'char','Wren: point'],
  [15.6,20.1,'device','Trade-places diagram'],[15.6,20.1,'text','BUY SIDE, then CREATE SIDE'],
  [15.6,18.5,'char','Wren: think'],[18.5,23.2,'char','Wren: shock, then resolve'],
  [18.5,19.4,'fx','Green burst when money flips'],
  [20.1,23.2,'device','Level gate + dialogue box'],[20.3,23.2,'text','Question typed, letter by letter'],
  [22.3,23.2,'fx','Gate turns green: NEW PATH UNLOCKED'],
  [23.2,28.9,'device','Quest card'],[23.2,28.9,'text','One action, three lines + reward'],
  [23.2,26.2,'char','Wren: resolve'],[26.2,28.9,'char','Wren: joy'],
  [26.2,28.9,'fx','LEVEL UP rays + particles'],[26.2,26.7,'camera','Big zoom punch + flash'],[28.05,28.9,'device','Worth it. plate'],
  [28.9,32,'device','Arcade outro card'],[29.0,29.7,'fx','Brand mark assembles from particles'],[29.6,32,'fx','Shock ring, spinning mark, orbiting sparkles, light sweep'],[29.4,32,'text','The Joy Digi wordmark, credit, disclaimer']
];

/* the moving world: speed keyframes [time, speed], integrated once into a distance table so scrubbing is exact */
var WSPEED=[[0,1.5],[.95,1.5],[1.0,0],[1.08,0],[1.1,2.6],[2.4,1.1],[5.2,1.1],[5.3,3.0],[6.6,1.2],[13.5,1.2],[13.75,3.0],[15,1.3],[15.55,1.0],[17.4,.4],[18.4,.4],[18.5,3.2],[19.6,1.3],[22.5,1.1],[22.6,3.0],[24,1.2],[26.15,1.2],[26.2,3.4],[27.6,1.5],[28.9,1.5],[29.6,2.6],[32,1.4]];
function worldSpeed(t){
  var k=WSPEED,i;if(t<=k[0][0])return k[0][1];
  for(i=1;i<k.length;i++)if(t<k[i][0]){var a=k[i-1],b=k[i],u=(t-a[0])/(b[0]-a[0]);return a[1]+(b[1]-a[1])*u;}
  return k[k.length-1][1];
}
var WTAB=(function(){var tab=[0],n=Math.ceil(DUR*60),i,dt=1/60;for(i=1;i<=n;i++)tab.push(tab[i-1]+worldSpeed((i-.5)*dt)*dt);return tab;})();
function worldPos(t){var f=clamp(t,0,DUR)*60,i=Math.floor(f);if(i>=WTAB.length-1)return WTAB[WTAB.length-1];return WTAB[i]+(WTAB[i+1]-WTAB[i])*(f-i);}
function worldOpt(t){return LAYERS.world?{pos:worldPos(t)}:{};}

function beatAt(t){var k=0;for(var i=0;i<BEATS.length;i++)if(t>=BEATS[i].t0)k=i;return BEATS[k];}
var PUNCH=[[.95,.10,7,.012],[5.3,.05,3,0],[6.55,.025,0,0],[7.85,.025,0,0],[11.3,.03,0,0],[13.75,.07,5,.008],[14.3,.06,4,.006],[18.5,.06,4,.01],[22.6,.05,3,0],[23.25,.03,0,0],[26.2,.09,6,.01],[28.05,.06,5,.008],[29.65,.05,3,0]];
var POPS=[[.95,.2],[2.6,.07],[5.3,.1],[7.85,.07],[11.3,.1],[13.75,.1],[18.5,.14],[22.6,.08],[26.2,.16],[28.05,.07]];
function leadDraw(x,y,s,pose,t,o){
  if(!LAYERS.char)return;
  if(!fxOn()){wiLead(x,y,s,pose,t,o);return;}
  var q=gSquash(t,POPS),wp=LAYERS.world?worldPos(t):0,bob=LAYERS.world?-Math.abs(Math.sin(wp*3.4))*1.8*clamp(worldSpeed(t)/1.2,0,1.4):0;
  c.save();c.translate(x,y+q[2]+bob);c.scale(q[0],q[1]);c.translate(-x,-y);wiLead(x,y,s,pose,t,o);c.restore();
}
function fxOn(){return LAYERS.fx;}
function uiOn(){return LAYERS.ui;}

function drawDemo(t){
  c.setTransform(SC,0,0,SC,0,0);
  var u,xp=Math.min(.78,t/26.2*.78),lv=1;
  if(t>=26.2){lv=2;xp=clamp((t-26.2)/1.3,0,1)*.25;}
  var punched=fxOn();
  if(punched)gPunchBegin(t,PUNCH,180,300);
  if(t<5.3){
    /* MYTH: boss panel + Wren + one emote; the hit adds the burst and one SFX word */
    gBg(t,(function(){var o=worldOpt(t);o.tint=G.red;return o;})());
    var ft=(fxOn()&&t>=.95&&t<1.04)?.95:t; /* hit-stop */
    wiCam(180,300,t,0,5.3,1.04,0);
    if(uiOn()){gHud(t,xp,lv,'EP 01');gBoss(ft,['Everyone says the','five-dollar coffee','is keeping you broke.'],{hit:.95});}
    if(fxOn()&&t<.9){c.save();c.strokeStyle='rgba(255,77,94,'+(.35+.35*Math.sin(t*14))+')';c.lineWidth=14;c.strokeRect(0,0,W,H);c.restore();}
    leadDraw(150,520,1.1,t<2.6?'shock':'think',ft);
    if(fxOn())wiEmote('bang',205,416,1.1,t,.3);
    c.restore();
    if(fxOn()){gImpact((t-.95)/.35,{x:180,y:230});gSfx('CRIT!',244,156,.16,t-1.0,G.red,30);gBurst(180,230,t-.95,[G.red,'#fff',G.gold],16,200,320);}
  }else if(t<15.6){
    u=t-5.3;
    gBg(t,(function(){var o=worldOpt(t);o.tint=t<6.5?G.cyan:G.violet;return o;})());
    wiCam(180,230,u,0,10.3,1.03,0);
    if(uiOn())gHud(t,xp,lv,'EP 01');
    if(t<6.5){
      /* A: the scan (a short cutaway while the narrator pauses) */
      if(fxOn()&&u>.3)wiSpeedLines(180,232,u,{r0:130,n:28,col:'rgba(47,227,208,.09)'});
      if(uiOn())gScan(180,232,64,u,{draw:function(){gCup(180,234,1.2,t);}});
      leadDraw(150,520,.9,'point',t);
      if(fxOn()){var gp=.5+.5*Math.sin(u*6);c.save();c.globalAlpha=.4*gp;c.fillStyle=G.gold;c.beginPath();c.arc(150,520-21*.9-3,9,0,6.3);c.fill();c.restore();}
    }else if(t<13.7){
      /* B: stepper infographic, one card at a time, locked to the narration */
      if(uiOn())iStepper(t-6.5,[0,1.35,4.8]);
      if(fxOn())gBurst(150,262,t-11.3,[G.gold,G.green],14,150,300);
      leadDraw(150,520,.8,t<7.85?'think':(t<11.3?'point':'joy'),t);
    }else{
      /* C: kinetic type */
      var w2=t-13.7;
      if(fxOn())wiSpeedLines(180,270,w2,{r0:130,n:30,col:'rgba(255,200,61,.12)'});
      if(uiOn()){gTx('PROBLEM SOLVED.',172,240,25,w2-.05,{glow:G.cyan,blur:14});gTx('VALUE PAID.',150,290,32,w2-.55,{fill:G.gold,glow:G.gold,blur:18});}
      leadDraw(150,520,.95,'point',t);
      if(fxOn()){gSfx('DING!',250,172,-.2,w2-.5,G.gold,28);var e1=Math.exp(-(t-13.75)*6),e2=Math.exp(-(t-14.3)*6);if(t>=13.75)wiSpeedLines(180,250,w2,{r0:60,n:34,col:'rgba(255,255,255,'+(.4*e1).toFixed(3)+')'});if(t>=14.3)wiSpeedLines(180,290,w2+.3,{r0:60,n:34,col:'rgba(255,200,61,'+(.4*e2).toFixed(3)+')'});gBurst(150,250,t-13.75,[G.gold,G.cyan,'#fff'],18,170,300);}
    }
    c.restore();
    if(fxOn()){gWhip(t-6.35,.3);gWhip(t-13.55,.3);}
  }else if(t<23.2){
    u=t-15.6;
    gBg(t,(function(){var o=worldOpt(t);o.tint=u<4.5?G.cyan:G.violet;return o;})());
    wiCam(180,300,u,0,7.6,1.02,0);
    if(u<4.5){
      /* A: trade places: buy side while "how do I spend less", flips on "ask the better question" */
      if(uiOn()){gHud(t,xp,lv,'ILLUSTRATIVE');iSwap(u,2.9,200);}
      leadDraw(150,520,.85,u<2.9?'think':'shock',t);
      if(fxOn()){if(u>2.85&&u<3.7)wiSpeedLines(180,200,u,{r0:80,n:22,col:'rgba(77,255,160,.18)'});wiEmote('ques',200,444,1,u,.4);}
    }else{
      /* B: dialogue + gate */
      var v2=u-4.5,lit=sm(clamp((v2-2.0)/.5,0,1));
      if(uiOn())gHud(t,xp,lv,'EP 01');
      if(fxOn()){c.save();c.globalAlpha=(.14+.05*Math.sin(v2*3))*(1-lit);c.font='400 150px '+F_RU;c.fillStyle=G.cyan;c.textAlign='center';c.textBaseline='middle';c.fillText('?',180,170);c.restore();}
      if(uiOn()){gGate(248,v2,{lit:lit});
        gDialog(40,296,220,100,'WREN',['What can I make that','someone would pay','five dollars for?'],v2-.2,{cps:30});
        if(fxOn()&&v2>2.1){c.save();c.globalAlpha=sm(clamp((v2-2.1)/.3,0,1));gTx('NEW PATH UNLOCKED',180,190,19,v2-2.1,{fill:G.green,glow:G.green,blur:14});c.restore();}}
      leadDraw(150,522,.75,v2<2.2?'think':'resolve',t);
    }
    c.restore();
    if(fxOn())gWhip(t-20.0,.3);
  }else if(t<28.9){
    u=t-23.2;
    gBg(t,(function(){var o=worldOpt(t);o.tint=G.gold;return o;})());
    if(uiOn()){gHud(t,xp,lv,'EP 01');
      gQuest(40,160,220,['Write down one thing','people already ask you','for help with.'],u);
      if(t>=26.2)gLevelUp(150,352,t-26.2);
      gWorthPlate(120,408,t-28.05);}
    leadDraw(232,520,.8,t<26.2?'resolve':'joy',t);
    if(fxOn()){gBurst(150,352,t-26.2,[G.gold,G.cyan,'#fff'],26,230,340);gBurst(120,408,t-28.05,[G.gold,'#fff'],12,150,300);}
  }else{
    /* OUTRO: arcade episode-complete card with the Joy Digi brand */
    u=t-28.9;
    gBg(t,(function(){var o=worldOpt(t);o.tint='#0B8FA8';o.low='#06303A';return o;})());
    if(fxOn()&&u<.25){c.save();c.globalAlpha=1-u/.25;c.fillStyle=G.gold;c.fillRect(0,0,W,H);c.restore();}
    if(uiOn())gOutro(u,1);
    leadDraw(150,520,.8,'joy',t);
    if(fxOn()&&u>.7)gBurst(150,262,u-.7,['#FF6B6B',G.gold,'#fff'],22,170,260);
  }
  if(punched){
    gGhost(t,.95,.25,6);gGhost(t,13.75,.18,4);gGhost(t,18.5,.2,4);gGhost(t,26.2,.22,5);
    c.restore();
    gFlash(t,5.3,G.cyan,.35,.25);gFlash(t,13.75,'#fff',.3,.18);gFlash(t,22.6,G.green,.3,.22);gFlash(t,26.2,G.gold,.45,.25);gFlash(t,28.05,G.gold,.25,.2);
  }
  if(uiOn())gScanlines();
}
