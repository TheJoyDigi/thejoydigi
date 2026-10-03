/* EP12 Give It Away. Season finale: Wren and Kai share the frame. Narrator Puck. */
var EP={num:12,lead:'kai',duo:true,outroLabel:'SEASON 1 COMPLETE',title:'Give It Away',slug:'ep12-give-it-away-anime',
  shots:[
    {type:'boss',from:0,hit:'m2',lines:['Protect what you know.','Keep your secrets.']},
    {type:'steps',from:'r1-0.25',stepAt:['r1+0.2','r2+0.3','r2+2.2'],bannerAt:'r3+1.0',banner:'NOT CHARITY. STRATEGY.',
     steps:[{chip:'GIVE',icon:'hand',title:'GIVE',sub:'COSTS NOTHING'},{chip:'REPUTATION',icon:'star',title:'REPUTATION',sub:'GROWS'},{chip:'OPPORTUNITY',icon:'door',title:'OPPORTUNITY',sub:'OPENS'}],
     poses:[['r1','think'],['r2','point'],['r2+2.2','joy']]},
    {type:'punch',from:'k1-0.1',slam2At:'k1+0.7',lines:['GIVE IT','AWAY.'],x0:180,y0:228,size0:32,x1:180,y1:272,size1:34},
    {type:'shift',from:'f1-0.1',flipAt:'f3',typeAt:'f2-0.2',question:'What can you give that costs you nothing?',
     a:{icon:'lock',label:'KEEP IT'},b:{icon:'gift',label:'GIVE IT'},poses:[['f1','think'],['f3','joy']]},
    {type:'quest',from:'g1-0.1',levelAt:'g2',plateAt:'g3',lines:['Give one useful thing','away today.','No strings.']},
    {type:'outro',from:'g3.end+0.35',dur:3.0}
  ]};
