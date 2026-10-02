#!/usr/bin/env python3
"""pick.py: blind, scored voice comparison.

  python3 02-engine/voice/pick.py <ep> [--voices Leda,Zephyr,...] [--judges gemini-3.8-flash,gemini-3.1-pro-preview] [--reuse 1]

Speaks the same representative lines in each candidate voice, concatenates them, relabels the clips with random
letters (so voice names cannot bias the judge), and asks audio-capable Gemini models to score each clip against the
character brief in voice.json ("pick"). Writes export/voice/pick/report.json and report.md.
A model's score is a screening tool, not a human ear: use it to narrow the field and to break ties.
"""
import base64, json, os, random, re, subprocess, sys, urllib.request, urllib.error
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import voice as V

def norm(label):
    return re.sub(r'^\s*clip\s*', '', label.strip(), flags=re.I).strip().upper()


CRITERIA = ['relatable_19yo', 'clarity_of_numbers', 'natural_not_robotic', 'energy_and_range', 'trustworthy_not_salesy', 'short_form_pace', 'clean_no_artifacts']


def judge(model, clips, brief, key):
    parts = [{'text': brief + '\n\nBelow are labelled clips. Each clip is the same three lines read by a different voice. Score every clip 1 to 10 on each criterion, then rank them. Be critical: use the whole scale. Note any mispronunciation, glitch, odd stress, or unnatural rhythm you actually hear. Return JSON only.'}]
    for label, path in clips:
        parts.append({'text': f'Clip {label}:'})
        parts.append({'inline_data': {'mime_type': 'audio/mp3', 'data': base64.b64encode(open(path, 'rb').read()).decode()}})
    schema = {'type': 'OBJECT', 'properties': {
        'clips': {'type': 'ARRAY', 'items': {'type': 'OBJECT', 'properties': dict(
            {'label': {'type': 'STRING'}, 'notes': {'type': 'STRING'}}, **{c: {'type': 'INTEGER'} for c in CRITERIA}), 'required': ['label', 'notes'] + CRITERIA}},
        'ranking': {'type': 'ARRAY', 'items': {'type': 'STRING'}}}, 'required': ['clips', 'ranking']}
    body = {'contents': [{'role': 'user', 'parts': parts}], 'generationConfig': {'responseMimeType': 'application/json', 'responseSchema': schema, 'temperature': 0.2}}
    url = f'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent'
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={'x-goog-api-key': key, 'Content-Type': 'application/json'})
    try:
        d = json.loads(urllib.request.urlopen(req, timeout=300).read())
    except urllib.error.HTTPError as e:
        sys.exit(f'judge {model} failed ({e.code}): {e.read()[:300]}')
    return json.loads(d['candidates'][0]['content']['parts'][0]['text'])


def main():
    a = sys.argv[1:]
    if not a:
        sys.exit(__doc__)
    opts = {a[i][2:]: a[i + 1] for i in range(1, len(a) - 1) if a[i].startswith('--')}
    ep, meta = V.ep_paths(a[0])
    cfg = json.load(open(os.path.join(ep, 'voice.json')))
    pick = cfg['pick']
    voices = (opts.get('voices') or ','.join(pick['voices'])).split(',')
    judges = (opts.get('judges') or ','.join(pick['judges'])).split(',')
    key = V.api_key()
    out = os.path.join(ep, 'export', 'voice', 'pick')
    os.makedirs(out, exist_ok=True)
    clips = {}
    for v in voices:
        wavs = [V.cached(ep, l['text'], v, (l['style'] + '; ' + cfg.get('pace', '')).strip('; '), key) for l in pick['lines']]
        lst = os.path.join(out, v + '.txt')
        sil = os.path.join(out, 'sil.wav')
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'lavfi', '-i', 'anullsrc=r=24000:cl=mono', '-t', '0.5', sil])
        open(lst, 'w').write(''.join(f"file '{w}'\nfile '{sil}'\n" for w in wavs))
        mp3 = os.path.join(out, v.lower() + '.mp3')
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', lst, '-af', 'loudnorm=I=-18:TP=-2', '-ar', '44100', '-b:a', '96k', mp3], check=True)
        clips[v] = mp3
        os.remove(lst)
        print(f'{v}: {V.dur(mp3):.1f} s')
    letters = list('ABCDEFGHIJKLMNOP')[:len(voices)]
    order = voices[:]
    random.Random(20261002).shuffle(order)
    label_of = dict(zip(order, letters))
    blind = [(label_of[v], clips[v]) for v in order]
    blind.sort()
    reports = {}
    saved = os.path.join(out, 'report.json')
    if opts.get('reuse') and os.path.exists(saved):
        reports = json.load(open(saved))['reports']  # re-score saved judgments without calling the judges again
    else:
        for m in judges:
            print('judging with', m, '...')
            reports[m] = judge(m, blind, pick['brief'], key)
    voice_of = {l: v for v, l in label_of.items()}
    totals = {v: [] for v in voices}
    for m, r in reports.items():
        for c in r['clips']:
            v = voice_of.get(norm(c['label']))
            if v:
                totals[v].append(sum(c[k] for k in CRITERIA) / len(CRITERIA))
    avg = {v: round(sum(x) / len(x), 2) for v, x in totals.items() if x}
    ranked = sorted(avg.items(), key=lambda kv: -kv[1])
    json.dump({'label_of': label_of, 'reports': reports, 'average': avg}, open(os.path.join(out, 'report.json'), 'w'), indent=1)
    md = ['# Voice pick', '', 'Average score (1 to 10) across judges and criteria. Voice names were hidden from the judges.', '', '| Rank | Voice | Score |', '|---|---|---|']
    md += [f'| {i + 1} | {v} | {s} |' for i, (v, s) in enumerate(ranked)]
    for m, r in reports.items():
        md += ['', f'## {m}', '']
        for c in sorted(r['clips'], key=lambda c: -sum(c[k] for k in CRITERIA)):
            md.append(f"- **{voice_of.get(norm(c['label']))}** ({sum(c[k] for k in CRITERIA) / len(CRITERIA):.1f}): {c['notes']}")
    open(os.path.join(out, 'report.md'), 'w').write('\n'.join(md) + '\n')
    print('\n'.join(md[:4 + len(ranked) + 2]))


if __name__ == '__main__':
    main()
