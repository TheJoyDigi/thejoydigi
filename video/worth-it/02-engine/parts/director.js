/* director: the episode template. An episode is a config (EP) of shots timed from its narration plan; this turns it into
   draw(t) and a soundtrack. Shot types: boss, scan, stepper, compare, punch, swap, gate, lockon, quest, outro.
   Times in a shot may be a number or a narration reference: 'r1' (line start), 'r1.end', 'r1+0.4'. */

  /* ---------- new pictures ---------- */
  function gDiamond(x,y,s,t,dim){
    c.save();c.translate(x,y);c.scale(s,s);c.globalAlpha=dim?.45:1;
    var top=new Path2D('M-22 -8 L-12 -20 L12 -20 L22 -8 Z'),bot=new Path2D('M-22 -8 L22 -8 L0 22 Z');
    gGlow(dim?'rgba(0,0,0,0)':'#9FEFFF',dim?0:14,function(){c.fillStyle='#BDF6FF';c.fill(top);c.fillStyle='#6FD9F2';c.fill(bot);});
    c.strokeStyle='#E9FCFF';c.lineWidth=1.3;c.stroke(top);c.stroke(bot);
    c.beginPath();c.moveTo(-12,-20);c.lineTo(-6,-8);c.lineTo(0,22);c.moveTo(12,-20);c.lineTo(6,-8);c.lineTo(0,22);c.moveTo(-6,-8);c.lineTo(0,-20);c.lineTo(6,-8);c.stroke();
    if(!dim){c.fillStyle='#fff';star4(10,-14,4+1.5*Math.sin(t*5),t);c.fill();}
    c.restore();
  }
  function gWater(x,y,s,t,glow){
    c.save();c.translate(x,y);c.scale(s,s);
    var glass=new Path2D('M-15 -22 L15 -22 L11 22 C10 25 7 26 4 26 L-4 26 C-7 26 -10 25 -11 22 Z');
    c.save();c.clip(glass);var lv=-4+Math.sin(t*2.2)*1.2,wg=c.createLinearGradient(0,lv,0,26);wg.addColorStop(0,'#7FE3FF');wg.addColorStop(1,'#2F7BFF');c.fillStyle=wg;c.fillRect(-20,lv,40,40);
    c.fillStyle='rgba(255,255,255,.5)';c.fillRect(-20,lv,40,1.6);c.restore();
    gGlow(glow?G.gold:'#7FE3FF',glow?18:8,function(){c.strokeStyle=glow?G.gold:'#CFF6FF';c.lineWidth=2.4;c.stroke(glass);});
    c.fillStyle='rgba(255,255,255,.6)';c.fillRect(-10,-16,2.2,30);
    c.restore();
  }
  function gItem(kind,x,y,s,t,o){o=o||{};if(kind==='diamond')gDiamond(x,y,s,t,o.dim);else if(kind==='water')gWater(x,y,s,t,o.glow);else if(kind==='cup')gCup(x,y,s,t);else gIcon(kind,x,y,s*1.4,t,o);}

  /* COMPARE: two cards side by side; the winner glows gold. cfg = {cards:[{item,title,rows},{...}], win:1} */
  function iCompare(tt,cfg,o){
    o=o||{};var k,cards=cfg.cards,wt=o.winAt==null?99:o.winAt;
    for(k=0;k<2;k++){
      var a=tt-(o.cardAt?o.cardAt[k]:k*.7),kk=gBack(clamp(a/.38,0,1));if(a<0)continue;
      var x=k?188:40,y=150,w=132,h=128,won=tt>=wt&&k===cfg.win,lost=tt>=wt&&k!==cfg.win;
      c.save();c.globalAlpha=clamp(a/.2,0,1)*(lost?.55:1);c.translate(x+w/2,y+h/2);c.scale(.6+.4*kk,.6+.4*kk);c.translate(-(x+w/2),-(y+h/2));
      gPanel(x,y,w,h,won?G.gold:(lost?G.mute:G.cyan),.96);
      gItem(cards[k].item,x+w/2,y+34,.95,tt,{dim:lost,glow:won});
      gLabel(cards[k].title,x+w/2,y+80,15,won?G.gold:G.white,'center');
      gLabel(cards[k].rows[0],x+w/2,y+98,12.5,G.mute,'center');
      gLabel(cards[k].rows[1],x+w/2,y+115,12.5,won?G.green:G.mute,'center');
      c.restore();
      if(won){var wb=sm(clamp((tt-wt)/.25,0,1));c.save();c.globalAlpha=wb;gGlow(G.gold,12,function(){c.fillStyle=G.gold;c.fill(gChamfer(x+w/2-30,y-12,60,20,6));});c.fillStyle=G.ink;c.font='400 11px '+F_RU;c.textAlign='center';c.textBaseline='middle';c.fillText('WINS',x+w/2,y-1.5);c.restore();}
    }
    if(o.moveAt!=null){var mv=tt-o.moveAt;if(mv>0&&mv<1.6){var q;for(q=0;q<10;q++){var p=clamp((mv-q*.07)/.8,0,1);if(p<=0||p>=1)continue;var px=106+(254-106)*p,py=170-Math.sin(p*Math.PI)*46;c.save();c.globalAlpha=1-Math.abs(p-.5)*.8;c.fillStyle=G.gold;star4(px,py,3.5,p*6);c.fill();c.restore();}
      gLabel('VALUE MOVED',180,142,12,G.gold,'center',sm(clamp(mv/.2,0,1))*(1-sm(clamp((mv-1.2)/.4,0,1))));}}
  }

  /* LOCK-ON: a reticle starts on the thing, slides onto the person and locks */
  function gLockOn(tt,from,to,moveAt,o){
    o=o||{};var mv=sm(clamp((tt-moveAt)/.6,0,1)),x=from[0]+(to[0]-from[0])*mv,y=from[1]+(to[1]-from[1])*mv,r=(from[2]||46)+((to[2]||40)-(from[2]||46))*mv;
    var ap=sm(clamp(tt/.35,0,1)),locked=tt>moveAt+.6;
    c.save();c.globalAlpha=ap;var col=locked?G.gold:G.cyan;
    gGlow(col,10,function(){c.strokeStyle=col;c.lineWidth=2;c.setLineDash([9,7]);c.lineDashOffset=-tt*40;c.beginPath();c.arc(x,y,r,0,6.3);c.stroke();c.setLineDash([]);
      c.lineWidth=3;var q,b=r+9,L=12;for(q=0;q<4;q++){c.save();c.translate(x,y);c.rotate(q*Math.PI/2);c.beginPath();c.moveTo(-b,-b+L);c.lineTo(-b,-b);c.lineTo(-b+L,-b);c.stroke();c.restore();}});
    if(locked){var lp=clamp((tt-moveAt-.6)/.3,0,1);c.globalAlpha=lp*(1-lp)*3;c.strokeStyle=G.gold;c.lineWidth=3;c.beginPath();c.arc(x,y,r+lp*30,0,6.3);c.stroke();c.globalAlpha=1;}
    c.restore();
    gLabel(locked?(o.lockedLabel||'LOCKED ON'):(o.label||'SCANNING'),x,y-r-14,12,col,'center',ap);
  }


  /* ---------- icons for steps and shifts: neon line art, s = scale ---------- */
  function fitSize(str,size,maxw,fam){c.save();c.font='400 '+size+'px '+(fam||F_RU);var w=c.measureText(str).width;c.restore();return w>maxw?Math.floor(size*maxw/w*10)/10:size;}
  function wrapLine(str,max){var w=str.split(' '),out=[],cur='';w.forEach(function(x){if((cur+' '+x).trim().length>max){out.push(cur.trim());cur=x;}else cur=(cur+' '+x).trim();});if(cur)out.push(cur);return out;}
  function gIcon(kind,x,y,s,t,o){
    o=o||{};var col=o.col||G.white,dim=o.dim;
    c.save();c.translate(x,y);c.scale(s,s);c.globalAlpha=dim?.4:1;c.lineWidth=2;c.lineJoin='round';c.lineCap='round';
    function st(p,cc){gGlow(cc||col,dim?0:8,function(){c.strokeStyle=cc||col;c.stroke(p);});}
    if(kind==='tag'){var wob=o.glitch?0:Math.sin(t*3)*.12;c.rotate(wob);var p=new Path2D('M-14 -10 L6 -10 L16 0 L6 10 L-14 10 Z');c.fillStyle='rgba(255,200,61,.14)';c.fill(p);st(p,G.gold);c.beginPath();c.arc(7,0,2,0,6.3);c.stroke();
      c.font='400 8px '+F_RU;c.textAlign='center';c.textBaseline='middle';c.fillStyle=G.gold;if(o.glitch){for(var g=0;g<6;g++){c.globalAlpha=.4+.5*aRand(Math.floor(t*12)+g);c.fillRect(-12+aRand(g*3+Math.floor(t*12))*18,-6+aRand(g*7)*12,3,1.4);}c.globalAlpha=.35;}c.fillText('$200',-3,.5);}
    else if(kind==='jacket'){var p2=new Path2D('M-6 -14 L6 -14 L16 -8 L18 12 L10 12 L10 2 L10 14 L-10 14 L-10 2 L-10 12 L-18 12 L-16 -8 Z');c.fillStyle='rgba(47,227,208,.12)';c.fill(p2);st(p2,o.glow?G.gold:G.cyan);c.beginPath();c.moveTo(0,-14);c.lineTo(0,14);c.moveTo(-6,-14);c.lineTo(0,-6);c.lineTo(6,-14);c.stroke();}
    else if(kind==='clock'||kind==='check'||kind==='coin'||kind==='person'||kind==='seat'||kind==='shop'){c.scale(1/s,1/s);c.restore();iIcon(kind,x,y,s,col);return;}
    else if(kind==='bolt'){var p3=new Path2D('M3 -15 L-8 2 L-1 2 L-4 15 L8 -3 L1 -3 Z');c.fillStyle='rgba(255,200,61,.15)';c.fill(p3);st(p3,G.gold);}
    else if(kind==='skill'){var k;for(k=0;k<3;k++){var hh=6+k*6;c.strokeStyle=G.green;c.strokeRect(-12+k*9,12-hh,6,hh);}st(new Path2D('M-14 -6 L-2 -12 L10 -16 M4 -18 L10 -16 L8 -10'),G.green);}
    else if(kind==='meter'){var lv=o.level==null?.5:o.level;c.strokeStyle=col;c.strokeRect(-6,-16,12,32);var mc=lv>.5?G.green:G.red;c.fillStyle=mc;c.fillRect(-4,14-28*lv,8,28*lv);}
    else if(kind==='queue'){var n=o.n==null?5:o.n,k2;for(k2=0;k2<n;k2++){c.save();c.translate(-16+k2*8,0);c.scale(.5,.5);c.beginPath();c.arc(0,-6,5,0,6.3);c.moveTo(-9,12);c.quadraticCurveTo(0,-2,9,12);c.strokeStyle=col;c.lineWidth=3;c.stroke();c.restore();}}
    else if(kind==='bulb'){var bp=new Path2D('M0 -16 C-10 -16 -13 -6 -9 1 C-6 5 -5 7 -5 10 L5 10 C5 7 6 5 9 1 C13 -6 10 -16 0 -16 Z');c.fillStyle=dim?'rgba(255,200,61,.05)':'rgba(255,200,61,.3)';c.fill(bp);st(bp,G.gold);c.beginPath();c.moveTo(-4,13);c.lineTo(4,13);c.moveTo(-3,16);c.lineTo(3,16);c.stroke();}
    else if(kind==='eraser'){c.rotate(-.5);var ep=new Path2D('M-14 -6 L10 -6 L14 0 L10 6 L-14 6 Z');c.fillStyle='rgba(77,255,160,.18)';c.fill(ep);st(ep,G.green);c.beginPath();c.moveTo(-2,-6);c.lineTo(-2,6);c.stroke();c.rotate(.5);c.setLineDash([3,3]);c.strokeStyle='rgba(244,247,255,.5)';c.beginPath();c.moveTo(-18,14);c.lineTo(18,14);c.stroke();c.setLineDash([]);}
    else if(kind==='contract'){var cp=new Path2D('M-11 -15 L7 -15 L12 -10 L12 15 L-11 15 Z');c.fillStyle='rgba(244,247,255,.08)';c.fill(cp);st(cp,col);var r;for(r=0;r<4;r++){c.beginPath();c.moveTo(-7,-8+r*6);c.lineTo(8,-8+r*6);c.stroke();}c.beginPath();c.moveTo(-6,12);c.quadraticCurveTo(-2,8,2,12);c.stroke();}
    else if(kind==='handshake'){st(new Path2D('M-18 4 L-8 -4 L0 0 L8 -4 L18 4 M-8 -4 L-2 6 C0 9 4 8 4 5 L-1 -1 M0 0 L6 6 C8 8 11 6 9 3'),o.glow?G.gold:G.cyan);}
    else if(kind==='sheet'||kind==='sheettrust'){var sp=new Path2D('M-14 -17 L14 -17 L14 17 L-14 17 Z');c.fillStyle='rgba(244,247,255,.06)';c.fill(sp);st(sp,col);var r2;for(r2=0;r2<4;r2++){c.strokeStyle='rgba(143,155,214,.6)';c.beginPath();c.moveTo(-10,-10+r2*7);c.lineTo(10,-10+r2*7);c.stroke();}
      if(kind==='sheettrust'){c.fillStyle=G.gold;c.font='400 7px '+F_RU;c.textAlign='center';c.textBaseline='middle';gGlow(G.gold,10,function(){c.fillText('+ TRUST',0,1);});}}
    else if(kind==='drain'){c.scale(1/s,1/s);c.restore();gIcon('meter',x-14*s,y,s,t,{level:.08});gIcon('meter',x+14*s,y,s,t,{level:.04});return;}
    else if(kind==='grow'){c.scale(1/s,1/s);c.restore();gIcon('meter',x,y,s,t,{level:.55+.4*(.5+.5*Math.sin(t*1.5)),col:G.green});return;}
    c.restore();
  }

  /* STEPS: three chips on top, one big card at a time. steps=[{chip,icon,title,sub,meter}], at=[t1,t2,t3] absolute */
  function iSteps(t,steps,at,o){
    o=o||{};var cols=[G.cyan,G.gold,G.green],cur=t<at[1]?0:(t<at[2]?1:2),i,k0=sm(clamp((t-at[0]+.2)/.3,0,1));if(k0<=0)return;
    c.save();c.globalAlpha=k0;
    for(i=0;i<3;i++){var cx=40+i*76,on=i===cur,done=i<cur,col=cols[i];
      c.save();if(on){gGlow(col,10,function(){c.fillStyle=col;c.fill(gChamfer(cx,146,68,26,6));});}else{c.fillStyle='rgba(255,255,255,.06)';c.fill(gChamfer(cx,146,68,26,6));c.strokeStyle=done?col:'rgba(143,155,214,.5)';c.lineWidth=1.5;c.stroke(gChamfer(cx,146,68,26,6));}c.restore();
      gLabel(steps[i].chip,cx+34,164,fitSize(steps[i].chip,12,60,F_HD),on?G.ink:(done?col:G.mute),'center');if(i<2){c.fillStyle=G.mute;c.fillRect(cx+69,158,6,2);}}
    c.restore();
    var st=steps[cur],lt=t-at[cur],k=sm(clamp(lt/.35,0,1)),col2=cols[cur],x=40,y=186,w=220,h=190;
    c.save();c.globalAlpha=k;c.translate((1-gBack(clamp(lt/.35,0,1)))*24,0);
    gPanel(x,y,w,h,col2,.97);
    if(st.meter!=null){var lvl=st.meter>.5?clamp(.15+lt*.4,0,.95):clamp(.9-lt*.6,.06,.9);gIcon(st.icon,118,y+64,2.4,t,{col:col2});gIcon('meter',196,y+64,2.4,t,{level:lvl});}
    else gIcon(st.icon,150,y+64,2.8,t,{col:col2,glitch:st.glitch,n:st.icon==='queue'?Math.max(1,Math.round(5-lt*2.4)):5});
    var fs=fitSize(st.title,22,196);gLabel(st.title,150,y+140,fs,G.white,'center');
    if(st.sub)gLabel(st.sub,150,y+168,st.subSize||18,col2,'center');
    c.restore();
  }

  /* SHIFT: the old view dims or glitches, the new one lights up. from/to = {icon,label} */
  function iShift(t,s){
    var a=sm(clamp((t-s.t0)/.35,0,1)),f=sm(clamp((t-s.flipAt)/.45,0,1));
    c.save();c.globalAlpha=a;
    gPanel(40,150,132,112,f>0?G.mute:G.cyan,.95);
    gIcon(s.a.icon,106,194,2.0,t,{dim:f>.5,glitch:f>0&&s.a.icon==='tag'});
    gLabel(s.a.label,106,248,fitSize(s.a.label,13,120,F_HD),f>0?G.mute:G.white,'center');
    c.restore();
    if(t>=s.flipAt-.05){c.save();c.globalAlpha=f;var kb=.7+.3*gBack(clamp((t-s.flipAt)/.4,0,1));c.translate(254,206);c.scale(kb,kb);c.translate(-254,-206);
      gPanel(188,150,132,112,G.gold,.97);gIcon(s.b.icon,254,194,2.0,t,{glow:true,col:G.gold});gLabel(s.b.label,254,248,fitSize(s.b.label,13,120,F_HD),G.gold,'center');c.restore();
      gBurst(254,206,t-s.flipAt,[G.gold,'#fff'],14,150,280);}
    else{c.save();c.globalAlpha=a*.5;c.setLineDash([5,5]);c.strokeStyle=G.mute;c.lineWidth=1.5;c.stroke(gChamfer(188,150,132,112,10));c.setLineDash([]);gLabel('?',254,214,34,G.mute,'center');c.restore();}
  }

  /* ---------- the director ---------- */
  function makeEpisode(EP,PLAN){
    var L={},i;for(i=0;i<PLAN.length;i++)L[PLAN[i].id]=PLAN[i];
    function T(v){
      if(typeof v==='number')return v;var m=/^(\w+)(\.end)?([+-][\d.]+)?$/.exec(v);if(!m||!L[m[1]])return 0;
      return (m[2]?L[m[1]].end:L[m[1]].start)+(m[3]?parseFloat(m[3]):0);
    }
    var shots=EP.shots.map(function(s){var o={};for(var k in s)o[k]=s[k];o.t0=T(s.from);return o;});
    for(i=0;i<shots.length;i++)shots[i].t1=i+1<shots.length?shots[i+1].t0:shots[i].t0+(shots[i].dur||3.1);
    var DUR=shots[shots.length-1].t1,LEAD=EP.lead||'wren',NUM=EP.num||1,TAG='EP '+('0'+NUM).slice(-2);
    /* resolve every time-like field of a shot once */
    shots.forEach(function(s){['hit','winAt','moveAt','bannerAt','lockAt','levelAt','plateAt','slam2At','typeAt','flipAt','litAt'].forEach(function(f){if(s[f]!=null)s[f]=T(s[f]);});if(s.cardAt)s.cardAt=s.cardAt.map(T);if(s.stepAt)s.stepAt=s.stepAt.map(T);if(s.poses)s.poses=s.poses.map(function(p){return [T(p[0]),p[1]];});});
    /* events: drive camera punches, squash pops and the world's speed */
    var EV=[];
    shots.forEach(function(s){
      EV.push([s.t0,'cut',s.type]);
      if(s.hit!=null)EV.push([s.hit,'hit']);
      if(s.cardAt)s.cardAt.forEach(function(t){EV.push([t,'pop']);});
      if(s.stepAt)s.stepAt.forEach(function(t,k){EV.push([t,k===2?'win':'pop']);});
      if(s.type==='shift'&&s.flipAt!=null)EV.push([s.flipAt,'lock']);
      if(s.winAt!=null)EV.push([s.winAt,'win']);
      if(s.moveAt!=null)EV.push([s.moveAt,s.type==='lockon'?'swoop':'pop']);
      if(s.lockAt!=null)EV.push([s.lockAt,'lock']);
      if(s.bannerAt!=null)EV.push([s.bannerAt,'win']);
      if(s.type==='punch'){EV.push([s.t0,'slam']);EV.push([s.slam2At!=null?s.slam2At:s.t0+.55,'slam']);}
      if(s.levelAt!=null)EV.push([s.levelAt,'level']);
      if(s.plateAt!=null)EV.push([s.plateAt,'stamp']);
      if(s.type==='outro')EV.push([s.t0+.72,'land']);
    });
    var PZ={hit:[.10,7,.012],slam:[.07,5,.008],level:[.09,6,.01],stamp:[.06,5,.008],win:[.05,3,0],lock:[.05,4,.006],land:[.05,3,0],pop:[.025,0,0],cut:[.03,2,0],swoop:[.02,0,0]};
    var PQ={hit:.2,slam:.1,level:.16,stamp:.07,win:.1,lock:.12,land:0,pop:.05,cut:.06,swoop:0};
    var PUNCH=EV.map(function(e){var p=PZ[e[1]]||[0,0,0];return [e[0],p[0],p[1],p[2]];});
    var POPS=EV.map(function(e){return [e[0],PQ[e[1]]||0];});
    var hits=EV.filter(function(e){return e[1]==='hit';}).map(function(e){return e[0];});
    function shotAt(t){var s=shots[0];for(var k=0;k<shots.length;k++)if(t>=shots[k].t0)s=shots[k];return s;}
    function baseSpeed(t){var s=shotAt(t);if(s.type==='lockon'&&s.lockAt!=null&&t<s.lockAt)return .45;if(s.type==='shift'&&t<s.flipAt)return .45;return s.type==='boss'?1.5:(s.type==='outro'?1.4:1.15);}
    function wspeed(t){
      for(var k=0;k<hits.length;k++)if(t>=hits[k]&&t<hits[k]+.08)return 0;
      var v=baseSpeed(t);
      EV.forEach(function(e){var a=t-e[0];if(a>=0&&a<1.4&&/hit|slam|level|lock|win|cut|land/.test(e[1]))v+=1.9*Math.exp(-a*2.6)*(e[1]==='cut'?.6:1);});
      return v;
    }
    var WT=(function(){var tab=[0],n=Math.ceil(DUR*60),k;for(k=1;k<=n;k++)tab.push(tab[k-1]+wspeed((k-.5)/60)/60);return tab;})();
    function wpos(t){var f=clamp(t,0,DUR)*60,k=Math.floor(f);if(k>=WT.length-1)return WT[WT.length-1];return WT[k]+(WT[k+1]-WT[k])*(f-k);}
    function poseAt(s,t,def){var p=def;if(s.poses)s.poses.forEach(function(q){if(t>=q[0])p=q[1];});return p;}
    function lead(x,y,sc,pose,t){
      var q=gSquash(t,POPS),bob=-Math.abs(Math.sin(wpos(t)*3.4))*1.8*clamp(wspeed(t)/1.2,0,1.4);
      c.save();c.translate(x,y+q[2]+bob);c.scale(q[0],q[1]);c.translate(-x,-y);wiLead(x,y,sc,pose,t,{who:LEAD});c.restore();
    }
    function bg(t,tint,o){o=o||{};o.pos=wpos(t);o.tint=tint;gBg(t,o);}
    var XP_END=(function(){var q=shots.filter(function(s){return s.levelAt!=null;})[0];return q?q.levelAt:DUR;})();

    function draw(t){
      c.setTransform(SC,0,0,SC,0,0);
      var s=shotAt(t),u=t-s.t0,xp=t<XP_END?Math.min(.78,t/XP_END*.78):clamp((t-XP_END)/1.3,0,1)*.25,lv=t<XP_END?1:2;
      gPunchBegin(t,PUNCH,180,300);
      if(s.type==='boss'){
        var ft=(t>=s.hit&&t<s.hit+.09)?s.hit:t;
        bg(t,G.red);wiCam(180,300,t,s.t0,s.t1,1.04,0);
        gHud(t,xp,lv,s.hud||TAG);gBoss(ft,s.lines,{hit:s.hit});
        if(t<s.hit-.05){c.save();c.strokeStyle='rgba(255,77,94,'+(.35+.35*Math.sin(t*14))+')';c.lineWidth=14;c.strokeRect(0,0,W,H);c.restore();}
        lead(150,520,1.1,t<s.hit+1.6?'shock':'think',ft);
        wiEmote('bang',205,416,1.1,t,.3);
        c.restore();
        gImpact((t-s.hit)/.35,{x:180,y:230});gSfx(s.sfx||'CRIT!',244,156,.16,t-s.hit-.05,G.red,30);gBurst(180,230,t-s.hit,[G.red,'#fff',G.gold],16,200,320);
      }else if(s.type==='compare'){
        bg(t,s.tint||'#FF9A3D',s.sun===false?{}:{low:'#2A1630',sun:true});wiCam(180,230,u,0,s.t1-s.t0,1.03,0);
        gHud(t,xp,lv,s.hud||TAG);
        var c0=s.cardAt?s.cardAt[0]:s.t0+.4,est=clamp((c0-t)/.35,0,1)*sm(clamp(u/.3,0,1));
        if(est>0){c.save();c.globalAlpha=est;gItem(s.cards[0].item,118,226,2.0,t,{});gItem(s.cards[1].item,242,226,2.0,t,{});gLabel('VS',180,232,22,G.gold,'center');c.restore();}
        iCompare(t,s,{cardAt:s.cardAt,winAt:s.winAt,moveAt:s.moveAt});
        if(s.bannerAt!=null&&t>=s.bannerAt){gTx(s.banner,150,312,fitSize(s.banner,17,214),t-s.bannerAt,{fill:G.gold,glow:G.gold,blur:14});}
        lead(150,520,.85,poseAt(s,t,'think'),t);
        gBurst(254,190,t-s.winAt,[G.gold,'#fff'],14,150,280);
        c.restore();
        gWhip(t-s.t0+.15,.3);
      }else if(s.type==='steps'){
        bg(t,G.violet);wiCam(180,230,u,0,s.t1-s.t0,1.03,0);
        gHud(t,xp,lv,s.hud||TAG);
        iSteps(t,s.steps,s.stepAt);
        if(s.bannerAt!=null&&t>=s.bannerAt){gTx(s.banner,150,404,fitSize(s.banner,16,214),t-s.bannerAt,{fill:G.gold,glow:G.gold,blur:14});}
        lead(150,520,.8,poseAt(s,t,'think'),t);
        gBurst(150,262,t-s.stepAt[2],[G.gold,G.green],14,150,300);
        c.restore();gWhip(t-s.t0+.15,.3);
      }else if(s.type==='shift'){
        bg(t,G.violet);wiCam(180,300,u,0,s.t1-s.t0,1.02,0);
        gHud(t,xp,lv,s.hud||TAG);
        iShift(t,s);
        var qL=wrapLine(s.question,24);gDialog(40,284,220,30+qL.length*21,LEAD.toUpperCase(),qL,t-s.typeAt,{cps:26});
        lead(150,520,.9,poseAt(s,t,'think'),t);
        c.restore();gWhip(u+.15,.3);
      }else if(s.type==='punch'){
        var s2=s.slam2At!=null?s.slam2At:s.t0+.55;
        c.save();bg(t,G.violet);
        var e1=Math.exp(-(t-s.t0)*6),e2=Math.exp(-(t-s2)*6);
        wiSpeedLines(180,270,u,{r0:130,n:30,col:'rgba(255,200,61,.12)'});
        if(t>=s.t0)wiSpeedLines(180,250,u,{r0:60,n:34,col:'rgba(255,255,255,'+(.4*e1).toFixed(3)+')'});
        if(t>=s2)wiSpeedLines(180,290,u+.3,{r0:60,n:34,col:'rgba(255,200,61,'+(.4*e2).toFixed(3)+')'});
        gHud(t,xp,lv,s.hud||TAG);
        gTx(s.lines[0],s.x0||170,s.y0||240,s.size0||25,u-.05,{glow:G.cyan,blur:14});
        gTx(s.lines[1],s.x1||150,s.y1||290,s.size1||28,t-s2,{fill:G.gold,glow:G.gold,blur:18});
        lead(150,520,.95,'point',t);
        if(s.sfx)gSfx(s.sfx,250,172,-.2,t-s2+.05,G.gold,28);
        gBurst(150,250,u,[G.gold,G.cyan,'#fff'],18,170,300);
        c.restore();gWhip(u+.15,.3);
      }else if(s.type==='lockon'){
        var lit=sm(clamp((t-s.lockAt)/.5,0,1));
        bg(t,G.violet);wiCam(180,300,u,0,s.t1-s.t0,1.02,0);
        gHud(t,xp,lv,s.hud||TAG);
        gItem(s.item,180,190,1.4,t,{dim:t>=s.lockAt});
        var qW=s.question.length===1&&s.question[0].length>24?wrapLine(s.question[0],24):s.question;gDialog(40,262,220,32+qW.length*21,LEAD.toUpperCase(),qW,t-s.typeAt,{cps:24});
        lead(150,520,1.0,poseAt(s,t,'think'),t);
        gLockOn(t-s.t0,[180,190,46],[150,438,38],s.moveAt-s.t0,{label:s.label,lockedLabel:s.lockedLabel});
        c.restore();gWhip(u+.15,.3);
      }else if(s.type==='quest'){
        c.save();bg(t,G.gold);
        gHud(t,xp,lv,s.hud||TAG);
        gQuest(40,160,220,s.lines,u);
        if(t>=s.levelAt){gLevelUp(150,352,t-s.levelAt);}
        gWorthPlate(120,408,t-s.plateAt);
        lead(232,520,.8,t<s.levelAt?'resolve':'joy',t);
        gBurst(150,352,t-s.levelAt,[G.gold,G.cyan,'#fff'],26,230,340);gBurst(120,408,t-s.plateAt,[G.gold,'#fff'],12,150,300);
        c.restore();
      }else if(s.type==='outro'){
        c.save();bg(t,'#0B8FA8',{low:'#06303A'});
        if(u<.25){c.save();c.globalAlpha=1-u/.25;c.fillStyle=G.gold;c.fillRect(0,0,W,H);c.restore();}
        gOutro(u,NUM);
        lead(150,520,.8,'joy',t);
        if(u>.7)gBurst(150,262,u-.7,['#FF6B6B',G.gold,'#fff'],22,170,260);
        c.restore();
      }
      EV.forEach(function(e){if(e[1]==='hit')gGhost(t,e[0],.25,6);else if(e[1]==='slam'||e[1]==='level')gGhost(t,e[0],.2,4);});
      c.restore();
      EV.forEach(function(e){
        if(e[1]==='slam')gFlash(t,e[0],'#fff',.25,.18);else if(e[1]==='level')gFlash(t,e[0],G.gold,.45,.25);
        else if(e[1]==='lock')gFlash(t,e[0],G.gold,.25,.2);else if(e[1]==='stamp')gFlash(t,e[0],G.gold,.25,.2);else if(e[1]==='cut'&&e[2]==='compare')gFlash(t,e[0],'#FFB04D',.3,.25);
      });
      gScanlines();
    }

    /* soundtrack: S = bed (ducks under the voice), F = fx */
    function sound(S,F){
      var B=.46875,seed=7;function rnd(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
      function whoosh(at,len,vol){F.noise(at,len||.3,vol||.15,350,5200);}
      function roll(from,to,vol){var t=from,gap=.16;while(t<to-.02){F.snare(t,vol*(.5+.5*(t-from)/(to-from)));gap=Math.max(.045,gap*.82);t+=gap;}}
      function groove(from,to,o){var i=0;for(var b=from;b<to-.01;b+=B,i++){
        if(o.kick&&(!o.half||i%2===0))F.kick(b,o.kick);
        if(o.hat){F.hat(b+B/2,o.hat);if(o.hat16){F.hat(b+B/4,o.hat*.55);F.hat(b+B*.75,o.hat*.55);}}
        if(o.clap&&i%2===1)F.clap(b,o.clap);
        if(o.bass){var n=o.bass[i%o.bass.length];S.bass(b,n,B*.9,.065);S.bass(b+B/2,n,B*.4,.045);}
        if(o.arp){for(var q=0;q<4;q++)S.tone(b+q*B/4,o.arp[(i*4+q)%o.arp.length],B/4*1.8,'triangle',.026,2800);}}}
      for(var a=0;a<DUR+1;a+=5.5)S.pad(a,[33,40],6.6,.05);
      for(var a2=0;a2<DUR+1;a2+=5)S.noise(a2,6,.035,450,1100);
      for(var ct=1.3;ct<DUR-2;ct+=.6+rnd()*1.7)S.tone(ct,93+Math.floor(rnd()*3)*3,.05,'square',.012,3500,.002);
      var CH={boss:[45,52,57,60],compare:[53,57,60,64],scan:[53,57,60,64],stepper:[53,57,60,64],punch:[53,57,60,64],swap:[48,55,60,64],lockon:[48,55,60,64],gate:[48,55,60,64],quest:[53,60,65,69],outro:[60,64,67,72]};
      shots.forEach(function(s,ix){
        var t0=s.t0,t1=s.t1;S.pad(t0+.05,CH[s.type]||[53,57,60,64],t1-t0+.3,.032);
        if(ix>0&&s.type!=='outro')whoosh(t0-.1,.28,.14);
        if(s.type==='boss'){
          [0,.3,.58].forEach(function(d){F.tone(t0+.02+d,81,.12,'square',.05,3000);});
          S.bass(t0,33,1.0,.07);F.riser(Math.max(0,s.hit-.9),.9,.1);
          F.hit(s.hit,.7);F.noise(s.hit,.4,.2,6500,300);F.tone(s.hit+.05,88,.32,'sawtooth',.08,3800);F.clink(s.hit+.35,.13);
          groove(s.hit+.45,t1-.3,{kick:.2,half:true,hat:.02,bass:[33,33,36,33,40,33,36,31]});F.riser(t1-.55,.55,.09);
        }else if(s.type==='compare'){
          F.crash(t0,.14);F.kick(t0,.35);F.boom(t0,.2);
          (s.cardAt||[]).forEach(function(t,k){F.click(t,.13);F.pluck(t+.05,k?79:72,.07);});
          if(s.winAt!=null){F.coin(s.winAt,.09);F.clink(s.winAt+.15,.16);F.tone(s.winAt+.3,91,.25,'sine',.08,4000);}
          if(s.moveAt!=null){F.sweep(s.moveAt,.8,72,96,'triangle',.05,4000);[0,.12,.24].forEach(function(d,k){F.clink(s.moveAt+.4+d,.06+k*.02);});}
          if(s.bannerAt!=null){F.hit(s.bannerAt,.35);F.clink(s.bannerAt+.05,.2);}
          groove(t0+B*2,t1-.8,{kick:.22,hat:.028,hat16:true,clap:.11,bass:[41,41,48,45],arp:[65,69,72,76]});
          roll(t1-.8,t1,.16);F.riser(t1-.75,.75,.08);
        }else if(s.type==='steps'){
          F.crash(t0,.14);F.kick(t0,.35);F.boom(t0,.2);
          s.stepAt.forEach(function(t,k){F.click(t,.13);F.pluck(t+.05,[72,79,84][k],.08);if(k===2){F.coin(t+.1,.09);F.clink(t+.25,.16);}});
          if(s.bannerAt!=null){F.hit(s.bannerAt,.35);F.clink(s.bannerAt+.05,.2);}
          groove(t0+B*2,t1-.8,{kick:.22,hat:.028,hat16:true,clap:.11,bass:[41,41,48,45],arp:[65,69,72,76]});
          roll(t1-.8,t1,.16);F.riser(t1-.75,.75,.08);
        }else if(s.type==='shift'){
          S.bass(t0+.05,36,Math.max(.5,s.flipAt-t0),.06);
          for(var tk2=t0+.05;tk2<s.flipAt;tk2+=B)F.click(tk2,.03);
          F.riser(Math.max(t0,s.flipAt-.6),.6,.08);F.hit(s.flipAt,.45);F.clink(s.flipAt+.1,.22);F.arp(s.flipAt+.05,[67,72,76,79],4,.06,0,.06,'triangle');
          for(var k3=0;k3<s.question.length;k3+=2)F.click(s.typeAt+.35+k3/26,.034);
          groove(s.flipAt+.2,t1-.1,{kick:.2,half:true,hat:.022,clap:.08,bass:[36,36,43,41]});
        }else if(s.type==='punch'){
          var s2=s.slam2At!=null?s.slam2At:t0+.55;
          F.hit(t0,.55);F.boom(s2,.38);F.snare(s2,.28);F.clink(s2,.24);F.coin(s2,.1);
          groove(t0,t1,{kick:.22,hat:.03,clap:.12,bass:[41,41,48,45],arp:[65,69,72,76]});
        }else if(s.type==='lockon'){
          S.bass(t0+.05,36,Math.max(.5,s.moveAt-t0),.06);
          for(var tk=t0+.05;tk<s.moveAt;tk+=B)F.click(tk,.03);
          F.riser(Math.max(t0,s.moveAt-.55),.55,.08);F.sweep(s.moveAt,.6,60,84,'sawtooth',.05,4000);
          F.hit(s.lockAt,.45);F.clink(s.lockAt+.1,.22);F.tone(s.lockAt+.1,88,.5,'sine',.09,4500);
          var typed=s.question.join('').length;for(var k=0;k<typed;k+=2)F.click(s.typeAt+.35+k/24,.034);
          groove(s.lockAt+.2,t1-.1,{kick:.2,half:true,hat:.022,clap:.08,bass:[36,36,43,41]});
        }else if(s.type==='quest'){
          F.kick(t0+.05,.3);F.sweep(t0,.22,60,84,'square',.05,4000);F.click(t0+.1,.11);
          s.lines.forEach(function(l,k){F.pluck(t0+.4+k*.28,[72,76,79][k%3],.055);});F.clink(t0+1.3,.13);
          groove(t0+.1,s.levelAt-.6,{kick:.22,hat:.03,hat16:true,clap:.12,bass:[41,48,45,48],arp:[65,69,72,76]});
          roll(s.levelAt-.6,s.levelAt,.18);F.riser(s.levelAt-.62,.62,.09);
          F.hit(s.levelAt,.7);F.arp(s.levelAt,[72,76,79,84,88],5,.07,0,.075,'square');F.clink(s.levelAt+.3,.22);
          groove(s.levelAt+.1,s.plateAt-.05,{kick:.24,hat:.032,hat16:true,clap:.14,bass:[41,48,45,48],arp:[72,76,79,84]});
          F.hit(s.plateAt,.55);F.noise(s.plateAt,.12,.22,900,200);F.clink(s.plateAt+.05,.26);
        }else if(s.type==='outro'){
          F.crash(t0+.05,.1);F.riser(t0+.05,.7,.08);
          F.hit(t0+.72,.5);F.clink(t0+.77,.26);F.arp(t0+.77,[72,76,79,84,88,91],6,.08,0,.06,'triangle');
          F.clink(t0+1.65,.09);F.clink(t0+2.05,.08);F.clink(t0+2.5,.07);
        }
      });
    }
    return {DUR:DUR,draw:draw,sound:sound,shots:shots,events:EV};
  }
