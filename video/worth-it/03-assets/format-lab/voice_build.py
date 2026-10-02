#!/usr/bin/env python3
"""Build the narrator track for the Format Lab. usage: python3 voice_build.py <Voice> [<Voice> ...]
Uses the show's Gemini TTS helpers (02-engine/voice/voice.py). Writes export/narration-<voice>.mp3 and export/plan-<voice>.json. Never prints the key."""
import hashlib, importlib.util, json, os, subprocess, sys
here = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('voicetool', os.path.join(here, '..', '..', '02-engine', 'voice', 'voice.py'))
vt = importlib.util.module_from_spec(spec); spec.loader.exec_module(vt)
cfg = json.load(open(os.path.join(here, 'voice.json')))
out = os.path.join(here, 'export'); os.makedirs(os.path.join(out, 'cache'), exist_ok=True)
MAXT = 1.12

def line_wav(text, voice, style, key):
    h = hashlib.sha1(json.dumps([vt.MODEL, voice, style, text]).encode()).hexdigest()[:16]
    raw = os.path.join(out, 'cache', h + '.wav'); f = os.path.join(out, 'cache', h + '-t.wav')
    if not os.path.exists(raw):
        open(raw, 'wb').write(vt.speak(text, voice, style, key))
    if not os.path.exists(f):
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', raw, '-af', 'silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.02,areverse,silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.04,areverse', f], check=True)
    return f

def build(voice):
    key = vt.api_key()
    lines = sorted(cfg['lines'], key=lambda l: l['at'])
    plan, prev_end = [], 0.0
    for i, l in enumerate(lines):
        style = (l.get('style', '') + '; ' + cfg.get('pace', '')).strip('; ')
        f = line_wav(l['text'], voice, style, key)
        d = vt.dur(f)
        start = max(l['at'], prev_end + 0.10)
        nxt = lines[i + 1]['at'] if i + 1 < len(lines) else 99
        room = nxt - start - 0.05
        tempo = min(MAXT, d / room) if d > room and room > 0.3 else 1.0
        end = start + d / tempo
        plan.append({'id': l['id'], 'text': l['text'], 'anchor': l['at'], 'start': round(start, 2), 'end': round(end, 2), 'tempo': round(tempo, 3), 'raw': round(d, 2), 'file': f})
        prev_end = end
        late = ' LATE' if start > l['at'] + 0.3 else ''
        print(f"{voice:7} {l['id']:3} anchor {l['at']:5.2f} start {start:5.2f} end {end:5.2f} (raw {d:4.2f} tempo {tempo:.2f}){late}")
    inputs = sum([['-i', p['file']] for p in plan], [])
    chains, labels = [], []
    for i, p in enumerate(plan):
        ms = int(p['start'] * 1000)
        chains.append(f"[{i}:a]aresample=44100,atempo={p['tempo']},adelay={ms}|{ms},volume=1.1[v{i}]"); labels.append(f'[v{i}]')
    chains.append(f"{''.join(labels)}amix=inputs={len(plan)}:normalize=0:duration=longest,loudnorm=I=-15:TP=-1.5:LRA=7[mix]")
    mp3 = os.path.join(out, f'narration-{voice.lower()}.mp3')
    r = subprocess.run(['ffmpeg', '-y', '-loglevel', 'error'] + inputs + ['-filter_complex', ';'.join(chains), '-map', '[mix]', '-ac', '1', '-ar', '44100', '-b:a', '80k', mp3], capture_output=True, text=True)
    if r.returncode: sys.exit('ffmpeg failed: ' + r.stderr[-500:])
    json.dump([{k: v for k, v in p.items() if k != 'file'} for p in plan], open(os.path.join(out, f'plan-{voice.lower()}.json'), 'w'), indent=1)
    print(f'wrote {mp3} {os.path.getsize(mp3)/1024:.0f} KB, {vt.dur(mp3):.1f} s')

for v in sys.argv[1:]:
    build(v)
