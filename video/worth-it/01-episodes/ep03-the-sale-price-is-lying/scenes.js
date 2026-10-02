/* EP03 — The Sale Price Is Lying. Beat timings from the voiced track (34.25 s):
   MYTH 0–3.2 · REFRAME 3.2–15.7 (wobble tag 3.2–9.0, lens 9.0–15.7) ·
   FLIP 15.7–21.1 · MOVE 21.1–29.4 · SLATE 29.4–34.25 */

var SCENES=[
  [0,'MYTH','the myth, struck'],
  [3.2,'REFRAME','the rumor wobbles'],
  [9.0,'REFRAME','the lens reveals value'],
  [15.7,'FLIP','crossing the counter'],
  [21.1,'MOVE','the move card'],
  [29.4,'SLATE','brand slate']
];
var DUR=34.25;

function draw(t){
  c.setTransform(SC,0,0,SC,0,0);
  if(t<3.2){
    wiPaper(t);
    wiTx('EP 3 · THE SALE PRICE IS LYING',180,150,12,t,{fam:F_U,wt:'700',fill:'rgba(27,36,64,.45)'});
    wiMythStrike(['Everyone loves','a good sale.','50% OFF!'],180,215,30,t+.15,{w:300,stag:.2});
  }else if(t<9.0){
    /* the rumor wobbles: shaky, unserious — a small extension of wiPriceTag */
    wiPaper(t);
    wiTx('The sale price is lying to you.',180,150,22,t-3.2,{});
    var wob=Math.sin((t-3.2)*6.3)*.07*clamp((t-3.2)/.5,0,1);
    c.save();c.translate(180,300);c.rotate(wob);c.translate(-180,-300);
    wiPriceTag(180,300,1.15,'$200');
    c.restore();
    wiTx('was $200 — never real',180,412,17,t-4.4,{fam:F_H,wt:'700',fill:'rgba(27,36,64,.7)'});
    wiTx('Illustrative example.',180,438,10,t-4.8,{fam:F_U,wt:'600',fill:'rgba(27,36,64,.5)'});
  }else if(t<15.7){
    wiPaper(t);
    wiTx('Price is a rumor about value.',180,140,22,t-9.0,{});
    wiLens(180,292,82,t-9.0,{
      draw:function(){wiPriceTag(180,292,1.0,'$200');},
      lines:["the jacket didn't change.",'Only the rumor did.']
    });
  }else if(t<21.1){
    wiPaper(t);
    wiCounter(300,t-15.7,{question:["What's it actually worth",'to you?']});
  }else if(t<29.4){
    wiPaper(t);
    wiMoveCard(['Price one thing you own','by what it does,','not what you paid.'],t-21.1,{y:292,stampX:78,stampY:-20});
  }else{
    wiBrandSlate(t,t-29.4);
    var dk=sm(clamp((t-29.4)/.5,0,1));
    if(dk>0){
      c.save();c.globalAlpha=dk;
      c.fillStyle=WI.sand;c.font='500 9px '+F_U;c.textAlign='center';c.textBaseline='alphabetic';
      c.fillText('Educational only. Not financial advice.',180,356);
      c.restore();
    }
  }
}

function cues(S){
  S.pad(0.05,[48,55,64,72],3.1,.035);
  S.thump(0.55,.09);
  S.thump(1.5,.08);
  S.pad(3.3,[53,57,65],5.6,.03);
  S.pluck(4.2,76,.045);
  S.pad(9.1,[55,62,67,74],6.5,.03);
  S.pluck(9.9,84,.05);
  S.pad(15.8,[48,60,67],5.2,.03);
  S.pluck(16.5,79,.05);
  S.pad(21.2,[53,60,65,72],12.6,.035);
  S.arp(33.2,[72,76,79,84],2.4,.2,0,.04);
}

function coverLockup(){wiCoverLockup();}
