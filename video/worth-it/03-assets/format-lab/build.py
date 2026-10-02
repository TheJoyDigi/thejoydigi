#!/usr/bin/env python3
"""Build the Format Lab artifact: engine parts + demo + wrapper inlined into lab.html. usage: python3 build.py"""
import os
here=os.path.dirname(os.path.abspath(__file__))
parts=os.path.join(os.path.dirname(os.path.dirname(here)),'02-engine','parts')
def r(p):
    with open(p,encoding='utf-8') as f:return f.read()
js=["(function(){","  var W=360,H=640,SC=2;","  var cv=document.createElement('canvas');cv.width=720;cv.height=1280;var c=cv.getContext('2d');"]
js+=[r(os.path.join(parts,p+'.js')) for p in ['core','music','worth','lead','anime','game','info']]
js+=[r(os.path.join(here,'demo.js')),r(os.path.join(here,'sound.js')),r(os.path.join(here,'wrapper.js')),"})();"]
engine='\n'.join(js)
import base64,json,glob
voices={}
for f in sorted(glob.glob(os.path.join(here,'export','narration-*.mp3'))):
    name=os.path.basename(f)[len('narration-'):-4]
    plan=os.path.join(here,'export','plan-'+name+'.json')
    if not os.path.exists(plan):continue
    voices[name]={'b64':base64.b64encode(open(f,'rb').read()).decode(),'plan':json.load(open(plan))}
voices_js='window.VOICES='+json.dumps(voices)+';'
html=r(os.path.join(here,'lab.html')).replace('/*{{ENGINE}}*/',engine).replace('/*{{VOICES}}*/',voices_js)
os.makedirs(os.path.join(here,'dist'),exist_ok=True)
out=os.path.join(here,'dist','format-lab.html')
with open(out,'w',encoding='utf-8') as f:f.write(html)
print('built',out,round(len(html)/1024),'KB')
