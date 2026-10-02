/* EP06 The Invisible Dividend. Lead Kai, narrator Puck. */
var EP={num:6,lead:'kai',title:'The Invisible Dividend',slug:'ep06-invisible-dividend-anime',
  shots:[
    {type:'boss',from:0,hit:'m2',lines:['Trust is soft.','Only numbers are real.']},
    {type:'compare',from:'r1-0.25',tint:'#7B5CFF',sun:false,cardAt:['r1+0.2','r2+0.1'],winAt:'r2+1.3',bannerAt:'r3+0.6',banner:'THE LINE ITEM NO SHEET SHOWS.',win:1,
     cards:[{item:'contract',title:'NO TRUST',rows:['contracts, lawyers,','checking up']},{item:'handshake',title:'TRUST',rows:['cheaper','faster']}],
     poses:[['r1','think'],['r2','point'],['r3+0.6','resolve']]},
    {type:'punch',from:'k1-0.1',slam2At:'k1+0.8',lines:['TRUST IS','THE DIVIDEND.'],x0:180,y0:228,size0:32,x1:180,y1:272,size1:26},
    {type:'shift',from:'f1-0.1',flipAt:'f3',typeAt:'f2-0.2',question:'Who trusts you, and what does that save them?',
     a:{icon:'sheet',label:'BALANCE SHEET'},b:{icon:'sheettrust',label:'REAL NET WORTH'},poses:[['f1','think'],['f3','resolve']]},
    {type:'quest',from:'g1-0.1',levelAt:'g2',plateAt:'g3',lines:['Keep one small promise','today, out loud,','where they can see.']},
    {type:'outro',from:'g3.end+0.45',dur:3.1}
  ]};
