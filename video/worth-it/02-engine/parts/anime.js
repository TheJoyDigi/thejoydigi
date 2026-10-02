/* anime: the anime craft kit. Impact frame, speed/focus lines, emote marks, sparkle, camera push. Pure functions of time on `c`. */

  function aRand(n){var x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);}

  /* radial lines from (cx,cy): focus lines (inward) on realisation; the field redraws at 12 fps like hand-drawn cels */
  function wiSpeedLines(cx,cy,t,o){
    o=o||{};var n=o.n||46,r0=o.r0||70,r1=o.r1||420,col=o.col||'rgba(27,35,64,.55)',f=Math.floor(t*12),k;
    c.save();c.fillStyle=col;
    for(k=0;k<n;k++){
      var a=(k/n)*Math.PI*2+aRand(f*7+k)*.12,len=r0+(r1-r0)*(.55+.45*aRand(f*13+k*3)),w=.012+.02*aRand(k+f);
      var ia=r0+aRand(f+k*5)*30;
      c.beginPath();c.moveTo(cx+Math.cos(a-w)*len,cy+Math.sin(a-w)*len);c.lineTo(cx+Math.cos(a+w)*len,cy+Math.sin(a+w)*len);
      c.lineTo(cx+Math.cos(a)*ia,cy+Math.sin(a)*ia);c.closePath();c.fill();
    }
    c.restore();
  }

  /* impact frame: u = 0..1 over ~0.28 s. Flat ink field, cream burst, one diagonal slash. Reserved for the myth strike */
  function wiImpact(u,o){
    o=o||{};if(u<=0||u>=1)return;
    var f=Math.floor(u*6),inv=f%2===0,bg=inv?WI.ink:WI.paper,fg=inv?WI.paper:WI.ink,k;
    c.save();c.fillStyle=bg;c.fillRect(0,0,W,H);
    c.fillStyle=fg;
    for(k=0;k<28;k++){
      var a=k/28*Math.PI*2+aRand(f+k)*.1,w=.05+.05*aRand(k*3+f);
      c.beginPath();c.moveTo(180+Math.cos(a)*30,285+Math.sin(a)*30);c.lineTo(180+Math.cos(a-w)*520,285+Math.sin(a-w)*520);c.lineTo(180+Math.cos(a+w)*520,285+Math.sin(a+w)*520);c.closePath();c.fill();
    }
    c.strokeStyle=o.slash||WI.red;c.lineWidth=7;c.lineCap='round';
    var p=Math.min(1,u*3);c.beginPath();c.moveTo(-10,170);c.lineTo(-10+(380)*p,170+(250)*p*.55);c.stroke();
    c.restore();
  }

  /* emote marks: 'bang' '!', 'ques' '?', 'sweat' drop, 'spark' four-point. Pops in with a short overshoot */
  function wiEmote(kind,x,y,s,t,t0){
    var u=clamp((t-t0)/.22,0,1);if(u<=0)return;
    var sc=s*(u<1?(.4+.6*u+Math.sin(u*Math.PI)*.35):1);
    c.save();c.translate(x,y);c.scale(sc,sc);c.lineJoin='round';c.lineCap='round';
    if(kind==='bang'||kind==='ques'){
      c.fillStyle=G.white;c.strokeStyle=G.ink;c.lineWidth=5;c.font='400 26px '+F_RU;c.textAlign='center';c.textBaseline='middle';
      var ch=kind==='bang'?'!':'?';c.strokeText(ch,0,0);c.fillText(ch,0,0);
    }else if(kind==='sweat'){
      var p=new Path2D('M0 -9 C-6 0 -6 7 0 7 C6 7 6 0 0 -9 Z');c.fillStyle='#8fd3e8';c.fill(p);c.strokeStyle=WI.ink;c.lineWidth=1.4;c.stroke(p);
      c.fillStyle='#fff';c.beginPath();c.arc(-2,2,1.3,0,Math.PI*2);c.fill();
    }else{
      c.fillStyle=G.gold;star4(0,0,9,0);c.fill();c.strokeStyle=G.ink;c.lineWidth=1.2;c.stroke();
    }
    c.restore();
  }

  /* gold sparkle (brand four-point) that twinkles; value found */
  function wiSparkle(x,y,r,t,ph){
    var k=.5+.5*Math.sin(t*5+(ph||0));
    c.save();c.globalAlpha=.55+.45*k;c.fillStyle=WI.gold;star4(x,y,r*(.7+.4*k),Math.PI/4*0);c.fill();
    c.globalAlpha=1;c.fillStyle='#fff';star4(x,y,r*.35*(.7+.4*k),0);c.fill();c.restore();
  }

  /* camera push: wrap drawing in wiCam(...) .. c.restore(). z eases from 1 to zmax between t0 and t1 around (px,py) */
  function wiCam(px,py,t,t0,t1,zmax,shake){
    var u=sm(clamp((t-t0)/(t1-t0),0,1)),z=1+(zmax-1)*u,sx=shake?Math.sin(t*90)*shake:0,sy=shake?Math.cos(t*70)*shake:0;
    c.save();c.translate(px+sx,py+sy);c.scale(z,z);c.translate(-px,-py);
  }
