#!/usr/bin/env python3
"""Narrator for one episode (template pipeline). usage: python3 02-engine/episode/voice_ep.py <episode dir>
Reads <ep>/voice.json {voice, pace, lines:[{id,text,style,gap}]}. Each line starts `gap` seconds after the previous one ends
(the first starts at `at`). Writes <ep>/export/voice/plan.json and narration.mp3. The picture is timed from plan.json."""
import hashlib, importlib.util, json, os, subprocess, sys
here = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('voicetool', os.path.join(here, '..', 'voice', 'voice.py'))
vt = importlib.util.module_from_spec(spec); spec.loader.exec_module(vt)
ep = os.path.abspath(sys.argv[1])
cfg = json.load(open(os.path.join(ep, 'voice.json')))
out = os.path.join(ep, 'export', 'voice'); os.makedirs(os.path.join(out, 'cache'), exist_ok=True)
voice = cfg['voice']; key = vt.api_key()

def line_wav(text, style, v=None):
    v = v or voice
    h = hashlib.sha1(json.dumps([vt.MODEL, v, style, text]).encode()).hexdigest()[:16]
    raw = os.path.join(out, 'cache', h + '.wav'); f = os.path.join(out, 'cache', h + '-t.wav')
    if not os.path.exists(raw):
        tmp = raw + '.part'; open(tmp, 'wb').write(vt.speak(text, v, style, key)); os.replace(tmp, raw)  # atomic: a killed run never leaves a broken cache file
    if not os.path.exists(f):
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', raw, '-af', 'silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.02,areverse,silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.04,areverse', f], check=True)
    return f

plan, t = [], None
for l in cfg['lines']:
    style = (l.get('style', '') + '; ' + cfg.get('pace', '')).strip('; ')
    if l.get('voices'):  # a shared line: every listed voice says it together
        fs = [line_wav(l['text'], style, v) for v in l['voices']]
        f = os.path.join(out, 'cache', 'shared-' + hashlib.sha1(json.dumps(fs).encode()).hexdigest()[:12] + '.wav')
        if not os.path.exists(f):
            subprocess.run(['ffmpeg', '-y', '-loglevel', 'error'] + sum([['-i', x] for x in fs], []) + ['-filter_complex', f"amix=inputs={len(fs)}:normalize=0:duration=longest,volume=0.8", f], check=True)
    else:
        f = line_wav(l['text'], style, l.get('voice'))
    d = vt.dur(f)
    start = l.get('at', 0.25) if t is None else t + l.get('gap', 0.15)
    plan.append({'id': l['id'], 'text': l['text'], 'start': round(start, 2), 'end': round(start + d, 2), 'voice': '+'.join(l.get('voices') or [l.get('voice') or voice]), 'file': f})
    t = start + d
    print(f"{l['id']:3} {start:5.2f}-{t:5.2f}  [{plan[-1]['voice']}] {l['text']}")
inputs = sum([['-i', p['file']] for p in plan], [])
chains = [f"[{i}:a]aresample=44100,adelay={int(p['start']*1000)}|{int(p['start']*1000)},volume=1.1[v{i}]" for i, p in enumerate(plan)]
chains.append(''.join(f'[v{i}]' for i in range(len(plan))) + f"amix=inputs={len(plan)}:normalize=0:duration=longest,loudnorm=I=-15:TP=-1.5:LRA=7[mix]")
mp3 = os.path.join(out, 'narration.mp3')
r = subprocess.run(['ffmpeg', '-y', '-loglevel', 'error'] + inputs + ['-filter_complex', ';'.join(chains), '-map', '[mix]', '-ac', '1', '-ar', '44100', '-b:a', '80k', mp3], capture_output=True, text=True)
if r.returncode: sys.exit(r.stderr[-400:])
json.dump({'voice': voice, 'lines': [{k: v for k, v in p.items() if k != 'file'} for p in plan]}, open(os.path.join(out, 'plan.json'), 'w'), indent=1)
print(f'narration ends {t:.2f} s -> {mp3}')
