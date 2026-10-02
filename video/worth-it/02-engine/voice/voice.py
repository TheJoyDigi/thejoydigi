#!/usr/bin/env python3
"""voice.py: add a synthetic voice to a rendered episode (Gemini text-to-speech).

  python3 02-engine/voice/voice.py audition <ep> [--line "text"] [--voices Leda,Zephyr,...]
  python3 02-engine/voice/voice.py build <ep> [--voice Leda] [--suffix -voice]

Reads <ep>/voice.json: {"voice": "Leda", "music_gain": 2.4, "duck_ratio": 6, "lines": [{"id","text","style","at"}]}
  - text is spoken verbatim (the model treats it as a transcript), so write numbers as words
  - style is a short delivery note ("shocked, quick") passed as speech metadata; "pace" is appended to every line
  - at is the start time in seconds in the final video
Generates every line, fits each to the gap before the next line (a slight speed-up if needed), mixes it over
the music with ducking, loudness-normalizes, and muxes onto export/<slug>.mp4 without re-encoding the picture.
Needs the Gemini API key in your interactive shell (NANOBANANA_GEMINI_API_KEY or GEMINI_API_KEY). The key is never printed.
Lines are cached by content, so re-running only pays for lines that changed.
"""
import base64, hashlib, json, os, re, subprocess, sys, time, urllib.error, urllib.request

_calls = []  # timestamps of recent API calls, to stay under the per-minute limit
CALLS_PER_MIN = 8

MODEL = 'gemini-3.8-flash-tts'
URL = 'https://generativelanguage.googleapis.com/v1beta/interactions'
MAX_SPEEDUP = 1.12


def api_key():
    for name in ('NANOBANANA_GEMINI_API_KEY', 'GEMINI_API_KEY'):
        if os.environ.get(name):
            return os.environ[name]
    out = subprocess.run(['zsh', '-ic', 'printf "KEY:%s:END" "${NANOBANANA_GEMINI_API_KEY:-$GEMINI_API_KEY}"'], capture_output=True, text=True).stdout
    m = re.search(r'KEY:(.*?):END', out, re.S)
    if not m or not m.group(1):
        sys.exit('No Gemini API key found. Set NANOBANANA_GEMINI_API_KEY or GEMINI_API_KEY in your shell.')
    return m.group(1)


def speak(text, voice, style, key):
    """one line of speech as WAV bytes (24 kHz mono)"""
    ann = [{'type': 'speech_metadata', 'style': style}] if style else []
    body = {'model': MODEL,
            'input': [{'type': 'user_input', 'content': [{'type': 'text', 'text': text, **({'annotations': ann} if ann else {})}]}],
            'response_format': {'type': 'audio', 'mime_type': 'audio/wav', 'sample_rate': 24000},
            'generation_config': {'speech_config': [{'voice': voice}]}}
    req = urllib.request.Request(URL, data=json.dumps(body).encode(), headers={'x-goog-api-key': key, 'Content-Type': 'application/json'})
    for attempt in range(6):
        now = time.time()
        while _calls and now - _calls[0] > 60:
            _calls.pop(0)
        if len(_calls) >= CALLS_PER_MIN:
            time.sleep(60 - (now - _calls[0]) + 0.5)
        _calls.append(time.time())
        try:
            d = json.loads(urllib.request.urlopen(req, timeout=180).read())
            for step in d.get('steps', []):
                for c in step.get('content', []):
                    if c.get('type') == 'audio':
                        return base64.b64decode(c['data'])
            raise RuntimeError('no audio in response: ' + json.dumps(d)[:200])
        except urllib.error.HTTPError as e:
            msg = e.read()[:300]
            if e.code in (429, 500, 503) and attempt < 5:
                time.sleep(12 + attempt * 6)
                continue
            sys.exit(f'TTS failed ({e.code}): {msg}')
    sys.exit('TTS failed')


def dur(path):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path], capture_output=True, text=True).stdout.strip())


def ep_paths(arg):
    root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    ep = arg if os.path.isabs(arg) else (os.path.abspath(arg) if os.path.exists(os.path.join(arg, 'page.json')) else os.path.join(root, arg))
    meta = json.load(open(os.path.join(ep, 'page.json')))
    return ep, meta


def cached(ep, text, voice, style, key):
    d = os.path.join(ep, 'export', 'voice', 'cache')
    os.makedirs(d, exist_ok=True)
    h = hashlib.sha1(json.dumps([MODEL, voice, style, text]).encode()).hexdigest()[:16]
    raw = os.path.join(d, h + '.wav')
    f = os.path.join(d, h + '-t.wav')
    if not os.path.exists(raw):
        open(raw, 'wb').write(speak(text, voice, style, key))
    if not os.path.exists(f):  # cut leading and trailing silence so lines land exactly where we place them
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', raw, '-af',
                        'silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.02,areverse,silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.04,areverse', f], check=True)
    return f


def audition(ep, args):
    cfg = json.load(open(os.path.join(ep, 'voice.json')))
    line = args.get('line') or cfg['audition']['text']
    style = cfg['audition'].get('style', '')
    voices = (args.get('voices') or ','.join(cfg['audition']['voices'])).split(',')
    key = api_key()
    out = os.path.join(ep, 'export', 'voice', 'audition')
    os.makedirs(out, exist_ok=True)
    for v in voices:
        f = cached(ep, line, v, style, key)
        mp3 = os.path.join(out, v.lower() + '.mp3')
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f, '-af', 'loudnorm=I=-16:TP=-1.5', '-ar', '44100', '-b:a', '96k', mp3])
        print(f'{v}: {dur(mp3):.2f} s -> {mp3}')


def build(ep, meta, args):
    cfg = json.load(open(os.path.join(ep, 'voice.json')))
    voice = args.get('voice') or cfg['voice']
    suffix = args.get('suffix', '-voice')
    slug = meta['slug']
    key = api_key()
    lines = sorted(cfg['lines'], key=lambda l: l['at'])
    total = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', os.path.join(ep, 'export', slug + '.mp4')], capture_output=True, text=True).stdout)
    plan = []
    for i, l in enumerate(lines):
        f = cached(ep, l['text'], voice, (l.get('style', '') + '; ' + cfg.get('pace', '')).strip('; '), key)
        d = dur(f)
        limit = (lines[i + 1]['at'] if i + 1 < len(lines) else total - 0.3) - 0.08
        room = limit - l['at']
        tempo = 1.0
        if d > room:
            tempo = min(MAX_SPEEDUP, d / room)
        end = l['at'] + d / tempo
        plan.append({'id': l['id'], 'at': l['at'], 'raw': round(d, 2), 'tempo': round(tempo, 3), 'end': round(end, 2), 'limit': round(limit, 2), 'file': f})
        flag = ' OVERLAP' if end > limit + 0.02 else ''
        print(f"{l['id']:12} at {l['at']:5.2f}  len {d:4.2f}  tempo {tempo:.2f}  ends {end:5.2f}  (next at {limit + .08:5.2f}){flag}")
    music = os.path.join(ep, 'export', slug + '.wav')
    outdir = os.path.join(ep, 'export', 'voice')
    inputs = ['-i', music] + sum([['-i', p['file']] for p in plan], [])
    chains, labels = [], []
    for i, p in enumerate(plan):
        ms = int(p['at'] * 1000)
        chains.append(f"[{i + 1}:a]aresample=48000,atempo={p['tempo']},pan=stereo|c0=c0|c1=c0,adelay={ms}|{ms},volume=1.15[v{i}]")
        labels.append(f'[v{i}]')
    chains.append(f"{''.join(labels)}amix=inputs={len(plan)}:normalize=0:duration=longest,apad=whole_dur={total:.3f}[vo]")
    chains.append('[vo]asplit=2[vo1][vo2]')
    chains.append(f"[0:a]volume={cfg.get('music_gain', 2.4)}[m]")
    chains.append(f"[m][vo1]sidechaincompress=threshold={cfg.get('duck_threshold', 0.02)}:ratio={cfg.get('duck_ratio', 6)}:attack=12:release=250[duck]")
    chains.append('[duck][vo2]amix=inputs=2:normalize=0:duration=first[mix]')
    premix = os.path.join(outdir, 'premix.wav')
    r = subprocess.run(['ffmpeg', '-y', '-loglevel', 'error'] + inputs + ['-filter_complex', ';'.join(chains), '-map', '[mix]', '-t', f'{total:.3f}', premix], capture_output=True, text=True)
    if r.returncode:
        sys.exit('ffmpeg premix failed: ' + r.stderr[-600:])
    meas = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', premix, '-af', 'loudnorm=I=-14:TP=-1.5:LRA=7:print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
    L = json.loads(meas[meas.rindex('{'):meas.rindex('}') + 1])
    norm = f"loudnorm=I=-14:TP=-1.5:LRA=7:measured_I={L['input_i']}:measured_TP={L['input_tp']}:measured_LRA={L['input_lra']}:measured_thresh={L['input_thresh']}:offset={L['target_offset']}:linear=true"
    mp4 = os.path.join(ep, 'export', slug + suffix + '.mp4')
    cmd = ['ffmpeg', '-y', '-loglevel', 'error', '-i', premix, '-i', os.path.join(ep, 'export', slug + '.mp4'),
           '-filter_complex', f'[0:a]{norm},aresample=48000[a]', '-map', '1:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', '-t', f'{total:.3f}', mp4]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode:
        sys.exit('ffmpeg failed: ' + r.stderr[-600:])
    share = os.path.join(ep, 'export', slug + suffix + '-share.mp4')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', mp4, '-vf', 'scale=720:1280:flags=lanczos', '-c:v', 'libx264', '-preset', 'medium', '-crf', '24', '-pix_fmt', 'yuv420p', '-c:a', 'copy', '-movflags', '+faststart', share])
    json.dump({'voice': voice, 'model': MODEL, 'plan': [{k: v for k, v in p.items() if k != 'file'} for p in plan]}, open(os.path.join(outdir, 'plan.json'), 'w'), indent=1)
    def ts(x):
        ms = int(round(x * 1000))
        return f'{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d},{ms % 1000:03d}'
    srt = os.path.join(ep, 'export', slug + suffix + '.srt')
    with open(srt, 'w') as fh:
        for i, (l, p) in enumerate(zip(lines, plan)):
            fh.write(f"{i + 1}\n{ts(p['at'])} --> {ts(max(p['end'], p['at'] + 0.8))}\n{l['text']}\n\n")
    print(f'wrote {srt} (caption file for platform upload)')
    print(f'wrote {mp4} ({os.path.getsize(mp4) / 1048576:.1f} MB)')
    print(f'wrote {share} ({os.path.getsize(share) / 1048576:.1f} MB)')


if __name__ == '__main__':
    a = sys.argv[1:]
    if len(a) < 2 or a[0] not in ('audition', 'build'):
        sys.exit(__doc__)
    opts = {a[i][2:]: a[i + 1] for i in range(2, len(a) - 1) if a[i].startswith('--')}
    ep, meta = ep_paths(a[1])
    (audition(ep, opts) if a[0] == 'audition' else build(ep, meta, opts))
