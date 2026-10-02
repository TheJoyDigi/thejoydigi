/* Cast sheet: t 0-2 = pose grid, t 2-4 = hero close-up. */
var SCENES=[[0,'GRID','seven poses'],[2,'HERO','close-up'],[4,'SHOT','mock anime shot']];
var DUR=9;
var CAST=[['stand','Stand'],['shock','Shock'],['think','Think'],['point','Point'],['joy','Joy'],['resolve','Resolve'],['shrug','Shrug']];
function draw(t){
  c.setTransform(SC,0,0,SC,0,0);
  wiPaper(t);
  if(t<2){
    var k,col,row;
    for(k=0;k<CAST.length;k++){
      col=k%2;row=Math.floor(k/2);
      var cx=90+col*180,cy=150+row*140;
      wiLead(cx,cy,.95,CAST[k][0],t);
      wiTx(CAST[k][1].toUpperCase(),cx,cy+22,9,t,{fam:F_U,wt:'700',fill:'rgba(27,36,64,.5)'});
    }
  }else if(t<4){
    wiLead(180,520,4.6,'calm',t,{face:'calm'});
  }else{
    var u=t-4;
    if(u<2.2){ /* MYTH lands: shock + impact + strike */
      wiCam(180,330,u,0,2.2,1.12,u<.9?(.9-u)*3:0);
      wiMythStrike(['Everyone says the','five-dollar coffee','is keeping you broke.'],180,150,25,u+.15,{w:330,stag:.015});
      wiLead(180,400,1.9,'shock',u);
      wiEmote('bang',250,300,1,u,.2);wiEmote('sweat',112,290,1,u,.5);
      c.restore();
      wiImpact((u-.15)/.3);
    }else if(u<5){ /* REFRAME: think, then the Lens */
      var v=u-2.2;
      wiCam(180,300,v,0,2.8,1.15,0);
      wiSpeedLines(180,320,v,{r0:110,n:40,col:'rgba(27,35,64,.18)'});
      wiLead(180,400,1.9,v<1.1?'think':'point',v);
      wiEmote('ques',250,300,1,v,.1);
      if(v>1.1){wiSparkle(248,262,9,v,0);wiSparkle(120,250,6,v,2);wiSparkle(262,330,5,v,4);}
      c.restore();
    }
  }
}
function cues(S){}
function coverLockup(){wiCoverLockup();}
