#!/usr/bin/env python3
"""Build one episode into a single HTML file.

usage: python3 build.py 01-episodes/ep14-minimum-payment-trap
Reads <ep>/scenes.js and <ep>/page.json (title, copy, body html), writes <ep>/dist/<slug>.html
"""
import json, os, re, sys

here = os.path.dirname(os.path.abspath(__file__))
root = os.path.dirname(here)
ep = sys.argv[1] if len(sys.argv) > 1 else sys.exit(__doc__)
ep_dir = os.path.join(root, ep) if not os.path.isabs(ep) else ep


def read(p):
    with open(p, encoding='utf-8') as f:
        return f.read()


meta = json.loads(read(os.path.join(ep_dir, 'page.json')))


def opt(name):
    p = os.path.join(ep_dir, name)
    return read(p) if os.path.exists(p) else ''

parts = ['core', 'rig-mei', 'infographics', 'music', 'scenes-common', 'worth']
js = ["(function(){", "  var W=360,H=640,SC=2;",
      "  var cv=document.getElementById('cv'),c=cv.getContext('2d');"]
js += [read(os.path.join(here, 'parts', p + '.js')) for p in parts]
js += [read(os.path.join(ep_dir, 'scenes.js')), read(os.path.join(here, 'parts', 'transport.js')), "})();"]
script = '\n'.join(js)

html = read(os.path.join(here, 'shell.html'))
dur = str(meta['dur'])
for k, v in {
    'TITLE': meta['title'], 'KICKER': meta['kicker'], 'HEADING': meta['heading'], 'SUB': meta['sub'],
    'ARIA': meta['aria'], 'DUR': dur, 'BODY': meta.get('body', '') + opt('feedback.html'), 'EXTRA_CSS': meta.get('css', '') + opt('feedback.css'), 'SCRIPT': script, 'EXTRA_JS': opt('feedback.js'),
}.items():
    html = html.replace('{{' + k + '}}', v)

def inline_audio(m):
    """{{AUDIO:export/...mp3}} becomes a data URI from the local render, so page.json stays small."""
    import base64
    f = os.path.join(ep_dir, m.group(1))
    if not os.path.exists(f):
        print('warning: missing', f, '(run the voice tools first)')
        return ''
    return 'data:audio/mpeg;base64,' + base64.b64encode(open(f, 'rb').read()).decode()


html = re.sub(r'\{\{AUDIO:([^}]+)\}\}', inline_audio, html)
out_dir = os.path.join(ep_dir, 'dist')
os.makedirs(out_dir, exist_ok=True)
out = os.path.join(out_dir, meta['slug'] + '.html')
with open(out, 'w', encoding='utf-8') as f:
    f.write(html)
print('built', out, round(len(html) / 1024), 'KB')


def fragment(h):
    head = re.search(r'<head>(.*?)</head>', h, re.S).group(1)
    body = re.search(r'<body>(.*?)</body>', h, re.S).group(1)
    head = re.sub(r'<meta[^>]*>\s*', '', head)
    title = re.search(r'<title>.*?</title>', head, re.S).group(0)
    return title + '\n' + head.replace(title, '').strip() + '\n' + body.strip() + '\n'


art = os.path.join(out_dir, meta['slug'] + '.artifact.html')
with open(art, 'w', encoding='utf-8') as f:
    f.write(fragment(html))
print('artifact fragment', art)
