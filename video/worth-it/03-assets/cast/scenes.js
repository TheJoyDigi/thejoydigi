/* cast sheet: static pages of the characters, 9 s each. Not an episode. */

  var DUR=36,PAGE=9;
  var SCENES=[[0,'Mei','Before and after'],[9,'Lineup','Cast, side by side'],[18,'Trap creature','The Treadmill Gremlin, four moods'],[27,'Trap Files','The collectible binder']];
  function cues(S){}
  function label(str,x,y,size,col,align){tx(str,x,y,size||11,{fam:F_U,wt:'700',fill:col||'#e8ecf4',sw:0,shadow:false,align:align||'center'});}
  function stage(){bgGrad('#171d33','#0d1017');c.fillStyle='rgba(255,255,255,.05)';c.fillRect(0,0,W,1);}
  function floor(y){c.fillStyle='rgba(255,255,255,.08)';c.fillRect(0,y,W,1.5);}
  var CAL={lean:0,ht:-.05,nA:[-.1,-.2],fA:[.05,-.1],nL:[.03,-.03],fL:[-.03,.04],face:'calm',gz:[1,0],lid:0,wind:.12};
  function K(face,over){var o={};for(var k in CAL)o[k]=CAL[k];o.face=face;if(over)for(var j in over)o[j]=over[j];return o;}

  function pageMei(t){
    stage();
    label('MEI: BEFORE AND AFTER',W/2,112,15,'#ffffff');
    var f=Math.floor(t*8);
    figAt(96,346,1.38,K('calm'),f,{d:0,w:.1,bag:true});
    figAt(262,346,1.38,K('calm'),f,{d:0,w:.1,bag:true,look:'work'});
    floor(346);
    label('BEFORE: reads as a high-schooler',96,368,10.5,'#9aa5b8');
    label('AFTER: 19, first job, jeans, lanyard',262,368,10.5,PC.gold);
    label('EXPRESSIONS (AFTER)',W/2,412,12,'#ffffff');
    var ex=[['calm',K('calm')],['shock',K('shock')],['sad',K('sad')],['resolve',K('resolve')],['joy',K('joy')]];
    ex.forEach(function(e,i){var x=40+i*70;figAt(x,520,.72,e[1],f,{d:0,w:.1,bag:true,look:'work'});label(e[0],x,542,9.5,'#9aa5b8');});
    floor(520);
  }
  function pageLineup(t){
    stage();
    label('THE CAST, TO SCALE',W/2,112,15,'#ffffff');
    var f=Math.floor(t*8),by=360;
    floor(by);
    figAt(62,by,1.25,K('calm'),f,{d:0,w:.1,bag:true,look:'work'});
    figAt(150,by,1.3,K('joy',{ht:-.1}),f,{d:0,w:.1,bag:false,look:'rex'});
    gremlin(236,by,1.9,t,{mood:'smug',remote:true,ph:2});
    nickel(318,by-26,1.0,t,'happy',{ph:1});
    label('MEI',62,by+22,12,PC.gold);label('hero, 19',62,by+36,9.5,'#9aa5b8');
    label('REX',150,by+22,12,'#ff8d8d');label('falls for it',150,by+36,9.5,'#9aa5b8');
    label('SNARE',236,by+22,12,'#e08cf0');label('one per trap',236,by+36,9.5,'#9aa5b8');
    label('NICKEL',318,by+22,12,PC.gold);label('never speaks',318,by+36,9.5,'#9aa5b8');
    label('ROLES',W/2,430,12,'#ffffff');
    label('Mei spots the trap. Rex falls for it. Nickel reacts.',W/2,450,10.5,'#cfd6e6');
    label('The Snare is the trap, drawn as a creature: a mechanism, never a company.',W/2,468,10.5,'#cfd6e6');
    label('Pearl (the archivist) keeps the Trap Files: coming next.',W/2,486,10.5,'#9aa5b8');
  }
  function pageGremlin(t){
    stage();
    label('TRAP 14: THE TREADMILL GREMLIN',W/2,112,14,'#ffffff');
    var moods=[['smug','smug: sets the pace'],['gulp','gulp: eats your interest'],['scared','scared: you paid extra'],['dizzy','dizzy: debt cleared']];
    moods.forEach(function(m,i){
      var cx=95+(i%2)*170,cy=235+Math.floor(i/2)*160;
      gremlin(cx,cy,1.9,t,{mood:m[0],remote:m[0]==='smug',gulp:m[0]==='gulp'?(Math.sin(t*6)*.5+.5):0,ph:i});
      label(m[1],cx,cy+22,10,'#cfd6e6');
    });
    var sizes=[1,.7,.45,.25];
    label('SIZE = HOW MUCH YOU STILL OWE',W/2,500,11,PC.gold);
    sizes.forEach(function(z,i){gremlin(66+i*76,570,1.2*z+.15,t,{mood:z<.3?'scared':'smug',ph:i});});
  }
  function pageFiles(t){
    stage();
    label('THE TRAP FILES: GOTTA SOLVE THEM ALL',W/2,112,13,'#ffffff');
    trapCard(88,136,184,236,{n:14,type:'DEBT',name:'TREADMILL GREMLIN',move:'Interest Siphon',weak:'A fixed payment',solT:Math.max(0,t-1.2)},t);
    var cols=8,rows=3,gx=20,gy=396,cs=36,gap=5,k;
    for(k=0;k<24;k++){
      var cx=gx+(k%cols)*(cs+gap),cy=gy+Math.floor(k/cols)*(cs+gap),on=k===13;
      c.fillStyle=on?PC.paper:'rgba(255,255,255,.07)';rrect(cx,cy,cs,cs,7);c.fill();
      c.strokeStyle=on?PC.red:'rgba(255,255,255,.16)';c.lineWidth=on?2.4:1.2;c.stroke();
      tx(String(k+1),cx+cs/2,cy+cs/2+5,on?15:13,{fill:on?PC.red:'rgba(255,255,255,.4)',sw:0,shadow:false});
    }
    label('1 of 24 solved. Collect the rest.',W/2,516,10.5,'#cfd6e6');
  }
  function draw(t){
    c.setTransform(SC,0,0,SC,0,0);
    var pg=Math.min(3,Math.floor(t/PAGE)),lt=t-pg*PAGE;
    if(pg===0)pageMei(t);else if(pg===1)pageLineup(t);else if(pg===2)pageGremlin(t);else pageFiles(lt);
    grain(t,.05);
  }
