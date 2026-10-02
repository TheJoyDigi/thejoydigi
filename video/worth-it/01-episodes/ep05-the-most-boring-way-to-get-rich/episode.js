/* EP05 The Most Boring Way to Get Rich. Lead Wren, narrator Leda. */
var EP={num:5,lead:'wren',title:'The Most Boring Way to Get Rich',slug:'ep05-boring-way-anime',
  shots:[
    {type:'boss',from:0,hit:'m2',lines:['You need a brilliant','idea to get rich.']},
    {type:'steps',from:'r1-0.25',stepAt:['r1+0.05','r1+1.4','r2+0.3'],bannerAt:'r2+2.2',banner:'MONEY FOLLOWS THE SOLUTION.',
     steps:[{chip:'WAIT',icon:'queue',title:'WAIT',sub:'ERASED'},{chip:'HASSLE',icon:'check',title:'HASSLE',sub:'REMOVED'},{chip:'VALUE',icon:'coin',title:'VALUE',sub:'CREATED'}],
     poses:[['r1','think'],['r1+1.4','point'],['r2+0.3','joy']]},
    {type:'punch',from:'k1-0.1',slam2At:'k1+0.8',lines:['STOP HUNTING','BIG IDEAS.'],x0:180,y0:228,size0:28,x1:180,y1:272,size1:28},
    {type:'shift',from:'f1-0.1',flipAt:'f1+0.7',typeAt:'f2-0.2',question:'What do the people around you complain about?',
     a:{icon:'bulb',label:'BIG IDEA'},b:{icon:'eraser',label:'TINY FIX'},poses:[['f1','think'],['f1+0.7','resolve']]},
    {type:'quest',from:'g1-0.1',levelAt:'g2',plateAt:'g3',lines:['Find one tiny friction.','Erase it for one person','this week.']},
    {type:'outro',from:'g3.end+0.35',dur:3.0}
  ]};
