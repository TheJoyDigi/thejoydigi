/* EP05 — The Most Boring Way to Get Rich. Beat timings from the voiced track (33.6 s):
   MYTH 0–2.9 · REFRAME 2.9–17.5 (knot 2.9–8.5, lens 8.5–17.5) · FLIP 17.5–24.5 ·
   MOVE 24.5–29.3 · SLATE 29.3–33.6 */

var SCENES=[
  [0,'MYTH','the myth, struck'],
  [2.9,'REFRAME','the knot untangles'],
  [8.5,'REFRAME','the lens reveals value'],
  [17.5,'FLIP','crossing the counter'],
  [24.5,'MOVE','the move card'],
  [29.3,'SLATE','brand slate']
];
var DUR=33.6;

function draw(t){
  c.setTransform(SC,0,0,SC,0,0);
  if(t<2.9){
    wiPaper(t);
    wiTx('EP 5 · THE MOST BORING WAY TO GET RICH',180,150,11,t,{fam:F_U,wt:'700',fill:'rgba(27,36,64,.45)'});
    wiMythStrike(['You need a brilliant idea','to get rich.'],180,225,28,t+.15,{w:320,stag:.015});
  }else if(t<8.5){
    wiPaper(t);
    wiTx('The most boring fortunes',180,150,22,t-2.9,{});
    wiTx('were built on shorter lines',180,178,22,t-3.2,{});
    wiTx('and fewer clicks.',180,206,22,t-3.5,{});
    wiKnot(180,340,1.0,clamp((t-2.9)/5.2,0,1));
  }else if(t<17.5){
    wiPaper(t);
    wiLens(180,280,80,t-8.5,{
      draw:function(){wiKnot(180,280,0.85,1);},
      lines:['a wait erased','a hassle removed']
    });
  }else if(t<24.5){
    wiPaper(t);
    wiCounter(300,t-17.5,{question:['What do the people around you','complain about?']});
  }else if(t<29.3){
    wiPaper(t);
    wiMoveCard(['Erase one tiny friction','for one person','this week.'],t-24.5,{y:292,stampX:78,stampY:-20});
  }else{
    wiBrandSlate(t,t-29.3);
    var dk=sm(clamp((t-29.3)/.5,0,1));
    if(dk>0){
      c.save();c.globalAlpha=dk;
      c.fillStyle=WI.sand;c.font='500 9px '+F_U;c.textAlign='center';c.textBaseline='alphabetic';
      c.fillText('Educational only. Not financial advice.',180,356);
      c.restore();
    }
  }
}

function cues(S){
  S.pad(0.05,[48,55,64,72],2.8,.035);
  S.thump(0.55,.09);
  S.thump(1.25,.07);
  S.pad(3.0,[53,57,65,72],5.4,.03);
  S.pad(8.6,[55,62,67,74],8.8,.03);
  S.pluck(9.4,84,.05);
  S.pluck(13.2,79,.04);
  S.pad(17.6,[48,60,67],6.8,.03);
  S.pluck(18.3,79,.05);
  S.pad(24.6,[53,60,65,72],8.6,.035);
  S.arp(32.6,[72,76,79,84],2.4,.2,0,.04);
}

function coverLockup(){wiCoverLockup();}
