/* EP01 — The Five-Dollar Coffee. Beat timings from the voiced track (30.79 s):
   MYTH 0–5.3 · REFRAME 5.3–17.6 · FLIP 17.6–24.9 · MOVE 24.9–28.9 · SLATE 28.9–30.79 */

var SCENES=[
  [0,'MYTH','the myth, struck'],
  [5.3,'REFRAME','the lens reveals value'],
  [17.6,'FLIP','crossing the counter'],
  [24.9,'MOVE','the move card'],
  [28.9,'SLATE','brand slate']
];
var DUR=30.79;

function draw(t){
  c.setTransform(SC,0,0,SC,0,0);
  if(t<5.3){
    wiPaper(t);
    wiTx('EP 1 · THE FIVE-DOLLAR COFFEE',180,150,12,t,{fam:F_U,wt:'700',fill:'rgba(27,36,64,.45)'});
    wiMythStrike(['Everyone says the','five-dollar coffee','is keeping you broke.'],180,225,27,t+.15,{w:330,stag:.015});
  }else if(t<17.6){
    wiPaper(t);
    wiLens(180,285,86,t-5.3,{
      draw:function(){wiCoffeeCup(180,285,1.3,t);},
      lines:['a warm cup','a place to sit','ten quiet minutes']
    });
  }else if(t<24.9){
    wiPaper(t);
    wiCounter(300,t-17.6,{question:['What can I make that someone','would pay five dollars for?']});
  }else if(t<28.9){
    wiPaper(t);
    wiMoveCard(['Write down one thing','people already ask you','for help with.'],t-24.9,{y:292,stampX:78,stampY:-20});
  }else{
    wiBrandSlate(t,t-28.9);
    var dk=sm(clamp((t-28.9)/.5,0,1));
    if(dk>0){
      c.save();c.globalAlpha=dk;
      c.fillStyle=WI.sand;c.font='500 9px '+F_U;c.textAlign='center';c.textBaseline='alphabetic';
      c.fillText('Educational only. Not financial advice.',180,356);
      c.restore();
    }
  }
}

function cues(S){
  S.pad(0.05,[48,55,64,72],5.2,.035);
  S.thump(0.55,.09);
  S.thump(1.3,.07);
  S.pad(5.4,[53,57,65,72],12,.03);
  S.pluck(6.3,84,.05);
  S.pluck(12.9,79,.04);
  S.pad(17.7,[48,60,67],7,.03);
  S.pluck(18.4,79,.05);
  S.pad(25.0,[53,60,65,72],5.5,.035);
  S.arp(29.2,[72,76,79,84],2.5,.2,0,.04);
}

function coverLockup(){wiCoverLockup();}
