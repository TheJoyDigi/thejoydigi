/* EP07 Stop Trying to Be Original. Lead Wren, narrator Leda. */
var EP={num:7,lead:'wren',title:'Stop Trying to Be Original',slug:'ep07-be-original-anime',
  shots:[
    {type:'boss',from:0,hit:'m2',lines:['Be original.','Invent the never-seen.']},
    {type:'steps',from:'r1-0.25',stepAt:['r1+0.1','r1+1.7','r2+0.2'],bannerAt:'r3+0.1',banner:'INNOVATION IS REARRANGEMENT.',
     steps:[{chip:'TWO THINGS',icon:'pair',title:'CAMERA + PHONE',sub:'TWO OLD THINGS',subSize:15},{chip:'COMBINED',icon:'combo',title:'COMBINED',sub:'ONE DEVICE',subSize:15},{chip:'NEW VALUE',icon:'star',title:'NEW VALUE',sub:'NOT A NEW INVENTION',subSize:14}],
     poses:[['r1','think'],['r1+1.7','point'],['r2+0.2','joy']]},
    {type:'punch',from:'k1-0.1',slam2At:'k1+0.8',lines:["DON'T INVENT.",'REARRANGE.'],x0:180,y0:228,size0:28,x1:180,y1:272,size1:30},
    {type:'shift',from:'f1-0.1',flipAt:'f3',typeAt:'f2-0.2',question:"What two things do you know that nobody's combined?",
     a:{icon:'page',label:'BLANK PAGE'},b:{icon:'combo',label:'YOUR PIECES'},poses:[['f1','think'],['f3','resolve']]},
    {type:'quest',from:'g1-0.1',levelAt:'g2',plateAt:'g3',lines:['Write down one mashup','today. Most will be bad.','You need one.']},
    {type:'outro',from:'g3.end+0.45',dur:3.1}
  ]};
