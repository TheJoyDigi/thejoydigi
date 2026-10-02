/* info: infographic motion kit. Icons, flow diagrams, the money-swap diagram, whip transitions. Pure functions of time on `c`. */

  function iIcon(kind,x,y,s,col){
    c.save();c.translate(x,y);c.scale(s,s);c.lineWidth=2;c.lineJoin='round';c.lineCap='round';c.strokeStyle=col||G.white;c.fillStyle=col||G.white;
    if(kind==='person'){c.beginPath();c.arc(0,-6,5,0,6.3);c.stroke();c.beginPath();c.moveTo(-10,10);c.quadraticCurveTo(0,-4,10,10);c.stroke();}
    else if(kind==='shop'){c.beginPath();c.moveTo(-11,-3);c.lineTo(-8,-10);c.lineTo(8,-10);c.lineTo(11,-3);c.closePath();c.stroke();c.beginPath();c.moveTo(-9,-3);c.lineTo(-9,10);c.lineTo(9,10);c.lineTo(9,-3);c.stroke();c.strokeRect(-3,2,6,8);}
    else if(kind==='cup'){c.beginPath();c.moveTo(-7,-5);c.lineTo(-6,7);c.lineTo(5,7);c.lineTo(6,-5);c.closePath();c.stroke();c.beginPath();c.arc(8,0,4,-1.2,1.2);c.stroke();c.beginPath();c.moveTo(-3,-9);c.quadraticCurveTo(-1,-12,1,-9);c.stroke();}
    else if(kind==='seat'){c.beginPath();c.moveTo(-7,-9);c.lineTo(-7,3);c.lineTo(7,3);c.stroke();c.beginPath();c.moveTo(-7,3);c.lineTo(-8,10);c.moveTo(7,3);c.lineTo(8,10);c.stroke();}
    else if(kind==='clock'){c.beginPath();c.arc(0,0,9,0,6.3);c.stroke();c.beginPath();c.moveTo(0,-5);c.lineTo(0,0);c.lineTo(4,3);c.stroke();}
    else if(kind==='coin'){c.beginPath();c.arc(0,0,10,0,6.3);c.fillStyle=G.gold;c.fill();c.strokeStyle=G.ink;c.stroke();c.fillStyle=G.ink;c.font='400 13px '+F_RU;c.textAlign='center';c.textBaseline='middle';c.fillText('$',0,1);}
    else if(kind==='check'){c.beginPath();c.moveTo(-8,0);c.lineTo(-2,6);c.lineTo(9,-7);c.stroke();}
    else if(kind==='q'){c.font='400 18px '+F_RU;c.textAlign='center';c.textBaseline='middle';c.fillText('?',0,1);}
    c.restore();
  }

  /* node card: icon + title (+ optional body rows [[icon,label],...]); slides up and fades in at time `at` */
  function iNode(x,y,w,h,col,icon,title,tt,rows,rowStart){
    var k=sm(clamp(tt/.35,0,1));if(k<=0)return;
    c.save();c.globalAlpha=k;c.translate(0,(1-k)*10);
    gPanel(x,y,w,h,col,.96);
    iIcon(icon,x+22,y+(rows?20:h/2),1.05,col);
    gLabel(title,x+42,y+(rows?25:h/2+5),13,col);
    c.restore();
    if(rows){var i;for(i=0;i<rows.length;i++){var rt=tt-(rowStart||.4)-i*.6;if(rt<=0)continue;var ra=sm(clamp(rt/.3,0,1));
      c.save();c.globalAlpha=ra;c.translate((1-ra)*-8,0);iIcon(rows[i][0],x+22,y+50+i*26,.85,G.white);gLabel(rows[i][1],x+42,y+55+i*26,14,G.white);
      iIcon('check',x+w-20,y+50+i*26,.6,G.green);c.restore();}}
  }
  /* animated down-arrow with a travelling pulse and an optional label */
  function iArrowDown(x,y0,y1,tt,col,label){
    var k=sm(clamp(tt/.35,0,1));if(k<=0)return;var y=y0+(y1-y0)*k;
    gGlow(col,8,function(){c.strokeStyle=col;c.lineWidth=3;c.lineCap='round';c.setLineDash([6,5]);c.lineDashOffset=-tt*40;c.beginPath();c.moveTo(x,y0);c.lineTo(x,y);c.stroke();c.setLineDash([]);
      if(k>=1){c.fillStyle=col;c.beginPath();c.moveTo(x-7,y1-6);c.lineTo(x+7,y1-6);c.lineTo(x,y1+3);c.closePath();c.fill();}});
    if(k>=1){var pp=(tt*1.4)%1;c.fillStyle='#fff';c.beginPath();c.arc(x,y0+(y1-y0)*pp,2.4,0,6.3);c.fill();}
    if(label&&k>=1)gLabel(label,x+14,(y0+y1)/2+4,11,col);
  }

  /* THE SWAP: you and the shop trade places. fp = time of the flip. Coin flows buy-side (you -> shop) then create-side (customer -> you) */
  function iSwap(tt,fp,yy0){
    var f=sm(clamp((tt-fp)/.7,0,1)),k=sm(clamp(tt/.35,0,1));if(k<=0)return;
    var xL=98,xR=262,yy=yy0||200,col=f<.5?G.mute:G.green;
    c.save();c.globalAlpha=k;
    var pX=xL+(xR-xL)*f,sX=xR+(xL-xR)*f;
    function node(cx,icon,label,colr){gPanel(cx-52,yy-52,104,104,colr,.96);iIcon(icon,cx,yy-10,2.0,colr);gLabel(label,cx,yy+40,15,colr,'center');}
    node(pX,'person',f<.5?'YOU':'CUSTOMER',f<.5?G.white:G.mute);
    node(sX,'shop',f<.5?'SHOP':'YOU',f<.5?G.mute:G.gold);
    var dir=f<.5?1:-1,ax0=xL+58,ax1=xR-58;
    gGlow(col,8,function(){c.strokeStyle=col;c.lineWidth=3;c.setLineDash([7,6]);c.lineDashOffset=-tt*50*dir;c.beginPath();c.moveTo(ax0,yy);c.lineTo(ax1,yy);c.stroke();c.setLineDash([]);
      c.fillStyle=col;c.beginPath();if(dir>0){c.moveTo(ax1,yy);c.lineTo(ax1-9,yy-6);c.lineTo(ax1-9,yy+6);}else{c.moveTo(ax0,yy);c.lineTo(ax0+9,yy-6);c.lineTo(ax0+9,yy+6);}c.closePath();c.fill();});
    var i;for(i=0;i<2;i++){var p=((tt*.9+i/2)%1),px=dir>0?ax0+(ax1-ax0)*p:ax1-(ax1-ax0)*p;iIcon('coin',px,yy-16,.75,G.gold);}
    gLabel(f<.5?'BUY SIDE':'CREATE SIDE',180,yy+84,18,col,'center');
    c.restore();
  }

  /* whip transition: a fast cyan wipe + flash over `dur` seconds, tt = time since it started */
  function gWhip(tt,dur){
    dur=dur||.3;if(tt<0||tt>dur)return;var u=tt/dur,k;
    c.save();
    var x=-60+(W+120)*u;
    for(k=0;k<14;k++){var yy=aRand(k*3.3)*H,hh=6+aRand(k*7.1)*26,len=120+aRand(k)*220;c.globalAlpha=(1-Math.abs(u-.5)*1.6)*.9;c.fillStyle=k%2?G.cyan:G.white;c.fillRect(x-len,yy,len,hh);}
    c.globalAlpha=Math.max(0,.5-Math.abs(u-.5))*.9;c.fillStyle='#fff';c.fillRect(0,0,W,H);
    c.restore();
  }

  /* STEPPER: problem -> solved -> paid, one big card at a time under three small step chips. tt = time since the flow started */
  function iStepper(tt,starts0){
    var steps=[['person','PROBLEM',G.cyan],['cup','SOLVED',G.gold],['coin','PAID',G.green]],starts=starts0||[0,1.5,4.2],cur=tt<starts[1]?0:(tt<starts[2]?1:2),i;
    var k0=sm(clamp(tt/.3,0,1));if(k0<=0)return;
    c.save();c.globalAlpha=k0;
    for(i=0;i<3;i++){
      var cx=40+i*76,done=i<cur,on=i===cur,col=steps[i][2];
      c.save();
      if(on){gGlow(col,10,function(){c.fillStyle=col;c.fill(gChamfer(cx,146,68,26,6));});}
      else{c.fillStyle='rgba(255,255,255,.06)';c.fill(gChamfer(cx,146,68,26,6));c.strokeStyle=done?col:'rgba(143,155,214,.5)';c.lineWidth=1.5;c.stroke(gChamfer(cx,146,68,26,6));}
      c.restore();
      gLabel(steps[i][1],cx+34,164,12,on?G.ink:(done?col:G.mute),'center');
      if(i<2){c.fillStyle=G.mute;c.fillRect(cx+69,158,6,2);}
    }
    c.restore();
    var lt=tt-starts[cur],k=sm(clamp(lt/.35,0,1)),col2=steps[cur][2],x=40,y=186,w=220,h=190;
    c.save();c.globalAlpha=k;c.translate((1-gBack(clamp(lt/.35,0,1)))*24,0);
    gPanel(x,y,w,h,col2,.97);
    if(cur===0){
      iIcon('person',150,y+68,3.4,col2);
      gLabel('SOMEONE HAS',150,y+140,22,G.white,'center');gLabel('A PROBLEM',150,y+166,22,G.white,'center');
    }else if(cur===1){
      gLabel('SOMEONE SOLVES IT',x+16,y+28,16,col2);
      var rows=[['cup','a warm cup'],['seat','a place to sit'],['clock','ten quiet minutes']],j;
      for(j=0;j<3;j++){var rt=lt-.3-j*.6;if(rt<=0)continue;var ra=sm(clamp(rt/.3,0,1));
        c.save();c.globalAlpha=ra;c.translate((1-ra)*-10,0);iIcon(rows[j][0],x+34,y+66+j*44,1.5,G.white);gLabel(rows[j][1],x+60,y+72+j*44,18,G.white);iIcon('check',x+w-20,y+66+j*44,.8,G.green);c.restore();}
    }else{
      iIcon('coin',150,y+66,3.4,G.gold);
      gLabel('YOU PAY.',150,y+138,24,G.white,'center');gLabel('GLADLY.',150,y+166,24,G.green,'center');
      var bt=sm(clamp((lt-.5)/.25,0,1));if(bt>0){c.save();c.globalAlpha=bt;iIcon('check',x+w-30,y+34,1.4,G.green);c.restore();}
    }
    c.restore();
  }
