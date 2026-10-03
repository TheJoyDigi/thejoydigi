/* EP11 The Most Expensive Choice. Lead Wren, narrator Leda. */
var EP={num:11,lead:'wren',title:'The Most Expensive Choice',slug:'ep11-expensive-choice-anime',
  shots:[
    {type:'boss',from:0,hit:'m2',lines:['Self-made means','doing it all yourself.']},
    {type:'compare',from:'r1-0.25',tint:'#7B5CFF',sun:false,cardAt:['r1+0.2','r2+0.2'],winAt:'r2+1.6',win:1,badge:'LEVERAGE',
     cards:[{item:'hourglass',title:'DO IT ALL',rows:['most','expensive']},{item:'handshake',title:'TRADE',rows:['first','leverage']}],
     poses:[['r1','think'],['r2','point'],['r2+1.6','resolve']]},
    {type:'punch',from:'k1-0.1',slam2At:'k1+0.8',lines:['DOING IT ALL','COSTS THE MOST.'],x0:180,y0:228,size0:28,x1:180,y1:272,size1:26},
    {type:'shift',from:'f1-0.1',flipAt:'f1+0.7',typeAt:'f2-0.2',question:"What's your one thing, and what will you trade for?",
     a:{icon:'task',label:'ONE TASK'},b:{icon:'coin',label:'TRADED'},poses:[['f1','think'],['f1+0.7','resolve']]},
    {type:'quest',from:'g1-0.1',levelAt:'g2',plateAt:'g3',lines:['Trade away one task','this week instead','of doing it.']},
    {type:'outro',from:'g3.end+0.45',dur:3.1}
  ]};
