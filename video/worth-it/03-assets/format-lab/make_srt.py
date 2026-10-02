#!/usr/bin/env python3
"""Write an SRT caption file from a narrator plan. usage: python3 make_srt.py <voice> <out.srt>"""
import json, os, sys
here = os.path.dirname(os.path.abspath(__file__))
voice, out = sys.argv[1].lower(), sys.argv[2]
plan = json.load(open(os.path.join(here, 'export', f'plan-{voice}.json')))
def ts(x):
    ms = int(round(x * 1000))
    return f'{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d},{ms % 1000:03d}'
with open(out, 'w', encoding='utf-8') as f:
    for i, l in enumerate(plan, 1):
        f.write(f"{i}\n{ts(l['start'])} --> {ts(max(l['end'], l['start'] + 0.8))}\n{l['text']}\n\n")
print('wrote', out)
