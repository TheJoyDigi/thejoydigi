/* demo-worth scenes: the four signature devices + three everyday objects.
   Pure function of t; nothing here is episode-specific. */

  var SCENES=[
    [0,'MYTH','Myth Strike'],
    [5,'LENS','the Lens reveals value'],
    [11,'COUNTER','crossing the counter'],
    [16,'MOVE','the Move Card'],
    [22,'OBJECTS','price tag, knot to line'],
    [26,'SLATE','brand slate']
  ];
  var DUR=30;

  function draw(t){
    c.setTransform(SC,0,0,SC,0,0);
    if(t<5){
      wiPaper(t);
      wiMythStrike(['The five-dollar coffee','is keeping you broke.'],180,205,30,t+.25,{w:296,stag:.018});
      wiTx('EP 1',180,120,13,t,{fam:F_U,wt:'700',fill:'rgba(27,36,64,.45)'});
    }else if(t<11){
      wiPaper(t);
      wiLens(180,282,88,t-5,{
        draw:function(){wiCoffeeCup(180,282,1.35,t);},
        lines:['a warm cup','a place to sit','ten quiet minutes']
      });
    }else if(t<16){
      wiPaper(t);
      wiCounter(300,t-11,{question:['What can I make that someone','would pay five dollars for?']});
    }else if(t<22){
      wiPaper(t);
      wiMoveCard(['Write down one thing people','already ask you for help with.'],t-16,{y:296});
    }else if(t<26){
      wiPaper(t);
      wiPriceTag(105,296,1.1,'$5');
      wiTx('price tag',105,392,12,t-22,{fam:F_U,wt:'600',fill:'rgba(27,36,64,.6)'});
      wiKnot(258,296,1.0,clamp((t-22)/3.4,0,1));
      wiTx('knot to a line',258,392,12,t-22,{fam:F_U,wt:'600',fill:'rgba(27,36,64,.6)'});
    }else{
      wiBrandSlate(t,t-26);
    }
  }

  function cues(S){
    S.pad(0.05,[48,55,64,72],5,.04);
    S.thump(0.9,.10);
    S.pluck(5.6,84,.06);
    S.thump(11.5,.08);
    S.pluck(16.5,79,.06);
    S.thump(17.4,.10);
    S.pad(22,[53,60,65],4,.035);
    S.arp(26.4,[72,76,79],3,.22,0,.05);
  }

  function coverLockup(){wiCoverLockup();}
