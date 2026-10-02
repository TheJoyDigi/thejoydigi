/* scenes-common: helpers every episode shares (backgrounds, camera, hook text, Mei in her work look, lower third,
   set dressing for the ground band, Pearl and treasure backgrounds, silhouette). Episode scenes.js keeps only its own beats. */

  function bgGrad(a,b){var g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,a);g.addColorStop(1,b);c.fillStyle=g;c.fillRect(0,0,W,H);}
  function cam(tt,dur,z0,z1,cx,cy){var z=z0+(z1-z0)*clamp(tt/dur,0,1);c.translate(cx,cy);c.scale(z,z);c.translate(-cx,-cy);}
  function wob(tt,amp){return Math.sin(tt*2.1)*amp;}

  /* hook text: visible on frame 0, slams in a hair larger and settles */
  function hookText(str,x,y,size,t,t0,o){
    var tt=t-t0;if(tt<0)return;
    o=o||{};
    var k=clamp(tt/.12,0,1),sc=1+(1-k)*(1-k)*(o.from||.22);
    var shake=tt<.35?Math.sin(tt*90)*(1-tt/.35)*3:0;
    tx(str,x+shake,y,size,{fill:o.fill,stroke:o.stroke,sc:sc,sw:o.sw});
    if(t0>0&&tt>.04&&tt<.5){
      var rp=(tt-.04)/.46;
      c.save();c.strokeStyle='rgba(255,255,255,'+(1-rp)*.6+')';c.lineWidth=3*(1-rp)+1;
      c.beginPath();c.ellipse(x,y-size*.35,50+rp*260,16+rp*70,0,0,6.3);c.stroke();c.restore();
    }
  }

  /* layout rule: everything the viewer must read lives in the safe box, x 40-320 above y 280, x 40-260 from y 280 to 470,
     y 90-470, in three bands (headline, hero, readout); below y 470 is decoration only (02-engine/render/safezone.json) */
  var MEI={look:'work',d:.0,w:0,rim:'#ff9db0'};
  function mk(face,over){var o={lean:0,ht:-.05,nA:[-.1,-.2],fA:[.05,-.1],nL:[.03,-.03],fL:[-.03,.04],face:face,gz:[1,0],lid:0,wind:.12},k;if(over)for(k in over)o[k]=over[k];return o;}
  function meiAt(x,y,s,K,f,over){var e={},k;for(k in MEI)e[k]=MEI[k];if(over)for(k in over)e[k]=over[k];figAt(x,y,s,K,f,e);}
  function lowerThird(txt,sub,tt,x0,y){
    if(tt<0)return;
    var k=sm(tt/.25);c.font='400 12px '+F_T;var w=Math.max(c.measureText(txt).width+30,120);
    c.save();c.translate(x0-(w+x0)*(1-k),y);
    c.fillStyle=PC.paper;rrect(0,0,w,34,7);c.fill();c.strokeStyle=PC.navy;c.lineWidth=2.2;c.stroke();
    c.fillStyle=GR.body;rrect(0,0,9,34,4.5);c.fill();c.stroke();
    c.fillStyle=PC.red;c.font='700 9.5px '+F_U;c.textAlign='left';c.textBaseline='alphabetic';c.fillText(sub,17,12.5);
    c.fillStyle=PC.navy;c.font='400 12px '+F_T;c.fillText(txt,17,27);
    c.restore();
  }

  /* ---------- set dressing for the lower third (decor only; the app UI may cover it) ---------- */
  function floorBand(y0,c1,c2,edge){
    var g=c.createLinearGradient(0,y0,0,H);g.addColorStop(0,c1);g.addColorStop(1,c2);c.fillStyle=g;c.fillRect(0,y0,W,H-y0);
    c.fillStyle=edge;c.fillRect(0,y0-3,W,3);
    c.strokeStyle='rgba(255,255,255,.16)';c.lineWidth=1.6;
    for(var k=-6;k<=12;k++){c.beginPath();c.moveTo(W/2+(k-3)*24,y0);c.lineTo(W/2+(k-3)*110,H);c.stroke();}
    c.lineWidth=2;c.beginPath();c.moveTo(0,y0+30);c.lineTo(W,y0+30);c.moveTo(0,y0+70);c.lineTo(W,y0+70);c.moveTo(0,y0+125);c.lineTo(W,y0+125);c.stroke();
    c.fillStyle='rgba(255,90,120,.12)';c.beginPath();c.ellipse(W/2,y0+60,170,26,0,0,6.3);c.fill();
  }
  function pearlFooter(n,caseName){
    c.save();
    tx('FILE '+n,150,608,50,{fam:F_B,fill:'rgba(47,127,134,.24)',sw:0,shadow:false});
    c.fillStyle='rgba(47,127,134,.22)';
    [200,172,128].forEach(function(w,i){rrect(40,490+i*16,w,7,3.5);c.fill();});
    tx('CASE: '+caseName,40,630,11,{fam:F_U,wt:'700',fill:'rgba(47,127,134,.4)',sw:0,shadow:false,align:'left'});
    stamp(236,548,'OPEN',null,99,{w:72,h:30,rot:-.2,col:PC.rust,size:16,bg:'rgba(0,0,0,0)',alpha:.7});
    c.strokeStyle='rgba(47,127,134,.35)';c.lineWidth=3;c.lineCap='round';c.beginPath();c.moveTo(262,478);c.lineTo(262,510);c.quadraticCurveTo(262,518,254,518);c.lineTo(254,486);c.stroke();
    c.restore();
  }
  var PILE=[];(function(){var r,k,n,x0;for(r=0;r<9;r++){n=14-r;x0=180-(n-1)*11;for(k=0;k<n;k++)PILE.push([x0+k*22+(r%2?4:-4),616-r*15]);}})();
  function coinPile(frac,t){
    var cnt=Math.floor(PILE.length*clamp(frac,0,1)),k;
    for(k=0;k<cnt;k++)coin(PILE[k][0],PILE[k][1],11.5,'',PC.gold,0);
    if(cnt>0){var top=PILE[cnt-1];sparkles(top[0],top[1]-6,(t*1.3)%1,PC.paper,3,16);}
  }
  function binderStrip(tt,n,solvedCount){
    var k,cs=24,gap=3,x0=44,y0=500,solved=clamp((tt-1.2)/.3,0,1);
    for(k=0;k<24;k++){
      var cx=x0+(k%8)*(cs+gap),cy=y0+Math.floor(k/8)*(cs+gap),on=k===n-1;
      c.fillStyle=on?mix(PC.paper,PC.green,solved):'rgba(253,246,236,.08)';rrect(cx,cy,cs,cs,5);c.fill();
      c.strokeStyle=on?PC.green:'rgba(253,246,236,.2)';c.lineWidth=on?2:1;c.stroke();
      tx(on&&solved>.5?'OK':String(k+1),cx+cs/2,cy+cs/2+3.5,9,{fam:F_U,wt:'700',fill:on?PC.navy:'rgba(253,246,236,.5)',sw:0,shadow:false});
    }
    tx('TRAP FILES   '+(solvedCount||1)+' / 24 SOLVED',150,y0+3*(cs+gap)+14,10,{fam:F_U,wt:'700',fill:'rgba(253,246,236,.55)',sw:0,shadow:false});
  }

  /* silhouette: draw anything as a flat dark shape (the creature-reveal hook) */
  var silCv=null;
  function silhouette(fn){
    if(!silCv)silCv=document.createElement('canvas');
    if(silCv.width!==cv.width||silCv.height!==cv.height){silCv.width=cv.width;silCv.height=cv.height;}
    var main=c,sc=silCv.getContext('2d');
    sc.setTransform(1,0,0,1,0,0);sc.globalCompositeOperation='source-over';sc.clearRect(0,0,silCv.width,silCv.height);sc.setTransform(SC,0,0,SC,0,0);
    c=sc;fn();c=main;
    sc.setTransform(1,0,0,1,0,0);sc.globalCompositeOperation='source-in';sc.fillStyle='#14061a';sc.fillRect(0,0,silCv.width,silCv.height);sc.globalCompositeOperation='source-over';
    c.drawImage(silCv,0,0,W,H);
  }
  /* ---------- Pearl look background (the X-ray) ---------- */
  function pearlBg(t,title,tt){
    c.fillStyle=PC.cream;c.fillRect(0,0,W,H);
    halftone(PC.teal,.5,12);
    c.strokeStyle=PC.teal;c.lineWidth=3;c.strokeRect(10,10,W-20,H-20);
    var k=sm(tt/.3);
    c.save();c.translate(172,148);c.scale(k,k);
    c.font='400 16px '+F_B;var w=c.measureText(title).width+30;
    c.fillStyle=PC.rust;rrect(-w/2,-17,w,34,8);c.fill();c.strokeStyle=PC.navy;c.lineWidth=2.4;c.stroke();
    c.fillStyle=PC.cream;c.textAlign='center';c.textBaseline='middle';c.fillText(title,0,2);
    c.restore();
  }

  function treasureBg(t){
    bgGrad('#bff3dc','#6fdcb4');
    rays(170,320,t,'#fff3b0',.22,14);
    for(var k=0;k<4;k++){
      var x=((rr(k,1)*W+t*(8+k*3))%(W+120))-60,y=120+rr(k,2)*280;
      c.fillStyle='rgba(255,255,255,.6)';c.beginPath();c.ellipse(x,y,40+rr(k,3)*20,12,0,0,6.3);c.fill();c.beginPath();c.ellipse(x+18,y-7,26,11,0,0,6.3);c.fill();
    }
  }
  function grass(y0,t){
    var k;
    c.fillStyle='#2f7d5c';
    for(k=0;k<46;k++){var x=k*8+4,h=10+rr(k,2)*16,sw=Math.sin(t*2+k)*2.4;c.beginPath();c.moveTo(x-4,y0+2);c.lineTo(x+sw,y0-h);c.lineTo(x+4,y0+2);c.closePath();c.fill();}
    c.strokeStyle='rgba(255,255,255,.14)';c.lineWidth=2;
    for(k=1;k<5;k++){c.beginPath();c.moveTo(0,y0+k*34);c.lineTo(W,y0+k*34);c.stroke();}
    for(k=0;k<9;k++){var cx=20+rr(k,5)*320,cy=y0+26+rr(k,6)*110;coin(cx,cy,8,'',PC.gold,0);}
  }

  /* cover-only lockup: series name and umbrella credit for the uploaded cover image; never drawn into the video */
  function coverLockup(){
    c.save();
    c.font='400 10px '+F_T;var w1=c.measureText('TRAP OR TREASURE').width+13;c.font='500 9px '+F_DM;var w2=c.measureText('by The Joy Digi').width;
    c.fillStyle='rgba(20,6,26,.6)';rrect(34,86,Math.max(w1,w2)+20,36,10);c.fill();
    brandMark(49,98,5.5,PC.coral);
    c.fillStyle=PC.paper;c.font='400 10px '+F_T;c.textAlign='left';c.textBaseline='alphabetic';c.fillText('TRAP OR TREASURE',57,102);
    c.fillStyle=PC.sand;c.font='500 9px '+F_DM;c.fillText('by The Joy Digi',44,115);
    c.restore();
  }
