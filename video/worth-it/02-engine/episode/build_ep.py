#!/usr/bin/env python3
"""Build an episode page from its config. usage: python3 02-engine/episode/build_ep.py <episode dir>
Inlines engine parts + director + <ep>/episode.js + the narration (export/voice/) into <ep>/dist/<slug>.html."""
import base64, json, os, re, sys
here = os.path.dirname(os.path.abspath(__file__)); parts = os.path.join(here, '..', 'parts')
ep = os.path.abspath(sys.argv[1])
r = lambda p: open(p, encoding='utf-8').read()
cfg = r(os.path.join(ep, 'episode.js'))
slug = re.search(r"slug:'([^']+)'", cfg).group(1); title = re.search(r"title:'([^']+)'", cfg).group(1); num = re.search(r'num:(\d+)', cfg).group(1)
plan = json.load(open(os.path.join(ep, 'export', 'voice', 'plan.json')))
voice = base64.b64encode(open(os.path.join(ep, 'export', 'voice', 'narration.mp3'), 'rb').read()).decode()
js = ["(function(){", "  var W=360,H=640,SC=(/[?&]hq=1/.test(location.search)?3:2);",
      "  var cv=document.createElement('canvas');cv.width=W*SC;cv.height=H*SC;var c=cv.getContext('2d');"]
js += [r(os.path.join(parts, p + '.js')) for p in ['core', 'music', 'worth', 'lead', 'anime', 'game', 'info', 'director']]
js += [cfg, "  var PLAN=" + json.dumps(plan['lines']) + ";", "  var E=makeEpisode(EP,PLAN);",
       "  window.WL={DUR:E.DUR,PLAN:PLAN,VOICE:" + json.dumps(voice) + ",makeSynth:makeSynth,sound:E.sound,shots:E.shots,",
       "    frame:function(t,target){E.draw(t);target.getContext('2d').drawImage(cv,0,0,target.width,target.height);},",
       "    frameJpeg:function(t,q){E.draw(t);return cv.toDataURL('image/jpeg',q||.95).split(',')[1];},",
       "    framePng:function(t){E.draw(t);return cv.toDataURL('image/png').split(',')[1];}};", "})();"]
html = r(os.path.join(here, 'page.html')).replace('{{TITLE}}', f'Worth It Ep {num}: {title}').replace('/*{{ENGINE}}*/', '\n'.join(js))
os.makedirs(os.path.join(ep, 'dist'), exist_ok=True)
out = os.path.join(ep, 'dist', slug + '.html'); open(out, 'w', encoding='utf-8').write(html)
print('built', out, round(len(html) / 1024), 'KB')
