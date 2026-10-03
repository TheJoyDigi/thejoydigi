#!/usr/bin/env python3
"""Build the Receipt experiment page (same narration as production Ep 1). usage: python3 build.py"""
import base64, json, os
here = os.path.dirname(os.path.abspath(__file__)); root = os.path.join(here, '..', '..', '..')
parts = os.path.join(root, '02-engine', 'parts'); lab = os.path.join(root, '03-assets', 'format-lab', 'export')
r = lambda p: open(p, encoding='utf-8').read()
plan = json.load(open(os.path.join(lab, 'plan-leda.json')))
voice = base64.b64encode(open(os.path.join(lab, 'narration-leda.mp3'), 'rb').read()).decode()
js = ["(function(){", "  var W=360,H=640,SC=(/[?&]hq=1/.test(location.search)?3:2);",
      "  var cv=document.createElement('canvas');cv.width=W*SC;cv.height=H*SC;var c=cv.getContext('2d');"]
js += [r(os.path.join(parts, p + '.js')) for p in ['core', 'music', 'worth', 'anime', 'game']]
js += [r(os.path.join(here, 'receipt.js')),
       "  var FONTS=Promise.all(['700 16px \"Space Mono\"','400 16px \"Space Mono\"','400 20px \"Permanent Marker\"','700 20px \"Fraunces\"'].map(function(f){return document.fonts.load(f,'Worth it $5');}));",
       "  window.WL={DUR:DUR,PLAN:" + json.dumps([{k: v for k, v in l.items() if k in ('id', 'text', 'start', 'end')} for l in plan]) + ",VOICE:" + json.dumps(voice) + ",makeSynth:makeSynth,sound:receiptSound,shots:[{hit:3.2}],fontsReady:FONTS,",
       "    frame:function(t,target){drawReceipt(t);target.getContext('2d').drawImage(cv,0,0,target.width,target.height);},",
       "    frameJpeg:function(t,q){drawReceipt(t);return cv.toDataURL('image/jpeg',q||.95).split(',')[1];},",
       "    framePng:function(t){drawReceipt(t);return cv.toDataURL('image/png').split(',')[1];}};", "})();"]
html = r(os.path.join(root, '02-engine', 'episode', 'page.html'))
html = html.replace('family=Bangers&', 'family=Bangers&family=Permanent+Marker&family=Space+Mono:wght@400;700&')
html = html.replace('{{TITLE}}', 'Worth It Ep 1: The Receipt (experiment)').replace('/*{{ENGINE}}*/', '\n'.join(js))
os.makedirs(os.path.join(here, 'dist'), exist_ok=True)
out = os.path.join(here, 'dist', 'ep01-receipt-exp.html'); open(out, 'w', encoding='utf-8').write(html)
print('built', out, round(len(html) / 1024), 'KB')
