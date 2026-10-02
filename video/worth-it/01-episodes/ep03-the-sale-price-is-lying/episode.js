/* EP03 The Sale Price Is Lying. Lead Wren, narrator Leda. */
var EP={num:3,lead:'wren',title:'The Sale Price Is Lying',slug:'ep03-sale-price-anime',
  shots:[
    {type:'boss',from:0,hit:'m2',hud:'ILLUSTRATIVE',lines:['Everyone loves','a good sale.']},
    {type:'steps',from:'r1-0.25',hud:'ILLUSTRATIVE',stepAt:['r1+0.1','r2+0.2','r3+0.2'],
     steps:[{chip:'TAG',icon:'tag',title:'WAS $200*',sub:'*ILLUSTRATIVE',subSize:13},{chip:'RUMOR',icon:'tag',glitch:true,title:'NEVER REAL',sub:'A RUMOR ABOUT VALUE',subSize:15},{chip:'JACKET',icon:'jacket',title:'JACKET UNCHANGED',sub:'ONLY THE RUMOR MOVED',subSize:15}],
     poses:[['r1','think'],['r2','point'],['r3+0.4','joy']]},
    {type:'punch',from:'k1-0.1',slam2At:'k1+0.6',lines:['IGNORE','THE STICKER.'],x0:180,y0:228,size0:32,x1:180,y1:272,size1:26},
    {type:'shift',from:'f1-0.1',flipAt:'f3',typeAt:'f2-0.2',question:"What's it actually worth to you?",a:{icon:'tag',label:'THE RUMOR'},b:{icon:'jacket',label:'WHAT IT DOES'},poses:[['f1','think'],['f3','resolve']]},
    {type:'quest',from:'g1-0.1',levelAt:'g2',plateAt:'g3',lines:['Take one thing you own.','Price it by what it does,','not what you paid.']},
    {type:'outro',from:'g3.end+0.45',dur:3.1}
  ]};
