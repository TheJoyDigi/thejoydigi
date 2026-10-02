#!/usr/bin/env python3
"""QA gate for one episode. Turns content-rules.md into checks.

usage: python3 02-engine/qa/qa.py 01-episodes/ep14-minimum-payment-trap
Exit code 1 if any FAIL. WARN means a human must look. Run it before every post.
"""
import json, os, re, subprocess, sys

root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
arg = sys.argv[1] if len(sys.argv) > 1 else sys.exit(__doc__)
ep = arg if os.path.isabs(arg) else (os.path.abspath(arg) if os.path.exists(os.path.join(arg, 'package.md')) else os.path.join(root, arg))

results = []


def check(level, name, detail=''):
    results.append((level, name, detail))


def read(*p):
    f = os.path.join(ep, *p)
    return open(f, encoding='utf-8').read() if os.path.exists(f) else None


meta = json.loads(read('page.json') or '{}')
src = json.loads(read('source.json') or '{}')   # new-format episodes point at their real source here
slug = meta.get('slug', 'ep')

# 1. files
if src:
    for f in ['script.md', 'claims.md', 'package.md', 'source.json']:
        check('PASS' if read(f) is not None else 'FAIL', f'file {f}')
    for sp in src.get('scene_sources', []):
        check('PASS' if os.path.exists(os.path.normpath(os.path.join(ep, sp))) else 'FAIL', f'scene source {sp}')
    for k in ['silent', 'cover', 'captions']:
        check('PASS' if src.get(k) and os.path.exists(os.path.join(ep, src[k])) else 'FAIL', f'{k} file {src.get(k, "")}')
else:
    for f in ['brief.md', 'script.md', 'claims.md', 'storyboard.md', 'scenes.js', 'page.json']:
        check('PASS' if read(f) is not None else 'FAIL', f'file {f}')
    check('PASS' if read('dist', slug + '.html') else 'FAIL', 'built page dist/' + slug + '.html')

# 2. claim ledger: every row has an exact URL and a verdict
claims = read('claims.md') or ''
check('PASS' if re.search(r'Verification date: 20\d\d-\d\d-\d\d', claims) else 'FAIL', 'claims.md has a verification date')
rows = [r for r in claims.splitlines() if re.match(r'\|\s*\d+\s*\|', r)]
bad = [r[:60] for r in rows if not re.search(r'https?://|`calc\.py`|\.py`', r) or not re.search(r'\b(keep|qualify|correct|remove)\b', r)]
check('PASS' if rows and not bad else 'FAIL', f'claim ledger rows have a source and verdict ({len(rows)} rows)', '; '.join(bad))

# 3. on-screen policy, from the scene source
js = '\n'.join(open(os.path.normpath(os.path.join(ep, sp)), encoding='utf-8').read() for sp in src['scene_sources'] if os.path.exists(os.path.normpath(os.path.join(ep, sp)))) if src else (read('scenes.js') or '')
strings = ' '.join(re.findall(r"'([^'\n]{2,})'", js))
need = [('Educational only. Not financial advice.', 'end-card disclaimer'), ('is a production of The Joy Digi', 'umbrella credit line')]
for text, name in need:
    check('PASS' if text in js else 'FAIL', 'on-screen ' + name)
has_numbers = bool(re.search(r'\$\d', strings))
check('PASS' if (not has_numbers or 'illustrative' in js.lower()) else 'FAIL', 'numbers carry an "Illustrative" label')

deny = ['visa', 'mastercard', 'amex', 'american express', 'discover card', 'chase', 'wells fargo', 'bank of america', 'citibank', 'capital one', 'klarna',
        'affirm', 'afterpay', 'sezzle', 'paypal', 'venmo', 'cash app', 'zelle', 'robinhood', 'coinbase', 'binance', 'fidelity', 'vanguard', 'schwab',
        'experian', 'equifax', 'transunion', 'fico', 'credit karma', 'nerdwallet', 'tiktok', 'instagram', 'youtube', 'apple', 'google', 'amazon',
        'netflix', 'spotify', 'draftkings', 'fanduel', 'bitcoin', 'ethereum']
hits = sorted({d for d in deny if re.search(r'\b' + re.escape(d) + r'\b', strings, re.I)})
check('PASS' if not hits else 'FAIL', 'no real company or product named on screen', ', '.join(hits))
bait = [m for m in re.findall(r"'([^'\n]*(?:comment the|share this|tag a|like and|follow for)[^'\n]*)'", js, re.I)]
check('PASS' if not bait else 'FAIL', 'no explicit engagement bait on screen (platforms down-rank it)', '; '.join(bait))

# 3b. the package: receipts, an open question, settings
pkg = read('package.md')
check('PASS' if pkg else 'FAIL', 'package.md exists')
if pkg:
    check('PASS' if re.search(r'Receipts', pkg) and re.search(r'https?://', pkg) else 'FAIL', 'package has a Receipts comment with source URLs')
    q = re.search(r'Pinned comment 2[^\n]*\n+```\n(.+?)\n```', pkg, re.S)
    ok = bool(q) and q.group(1).strip().endswith('?') and not re.search(r'comment|share|reply|tag', q.group(1), re.I)
    check('PASS' if ok else 'FAIL', 'pinned question is open-ended (no comment/share/reply/tag ask)')
    check('PASS' if re.search(r'Educational only', pkg) else 'FAIL', 'caption carries the disclaimer')
    unticked = len(re.findall(r'- \[ \]', pkg))
    check('PASS' if unticked == 0 else 'WARN', f'package settings and device test: {unticked} items still unticked')

if (read('voice.json') or src.get('voice')) and pkg:
    check('PASS' if re.search(r'synthetic|AI voice', pkg, re.I) else 'FAIL', 'package discloses the synthetic voice')

# 4. manual sign-offs written in script.md (the director ticks these, never production)
script = read('script.md') or ''
sec = script.split('## Director sign-off', 1)
if len(sec) == 2:
    boxes = re.findall(r'- \[( |x)\] (.+)', sec[1])
    open_ = [t for m, t in boxes if m != 'x']
    check('PASS' if boxes and not open_ else 'WARN', f'director sign-off: {len(boxes) - len(open_)} of {len(boxes)} ticked', '; '.join(open_))
else:
    for label in ['trap, number and quest are clear with sound off', 'every paused frame has one focal point']:
        m = re.search(r'- \[( |x)\] ' + re.escape(label), script, re.I)
        check('PASS' if m and m.group(1) == 'x' else 'WARN', 'manual sign-off: ' + label)

# 5. the rendered file
mp4 = os.path.join(ep, src['master']) if src else os.path.join(ep, 'export', slug + '.mp4')
if not os.path.exists(mp4):
    check('WARN', 'master not rendered yet (node 02-engine/render/render.js ...)')
else:
    p = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'stream=codec_name,width,height,r_frame_rate,duration,pix_fmt', '-of', 'json', mp4], capture_output=True, text=True)
    st = {s['codec_name']: s for s in json.loads(p.stdout)['streams']}
    v, a = st.get('h264'), st.get('aac')
    check('PASS' if v and (v['width'], v['height']) == (1080, 1920) else 'FAIL', 'video is 1080x1920 H.264')
    check('PASS' if v and v.get('pix_fmt') == 'yuv420p' else 'FAIL', 'pixel format yuv420p (not full-range yuvj420p)')
    dur = float(v['duration']) if v else 0
    check('PASS' if 20 <= dur <= 35 else 'WARN', f'duration {dur:.1f} s (target 25 to 35)')
    check('PASS' if a else 'FAIL', 'has an audio track')
    size = os.path.getsize(mp4) / 1048576
    check('PASS' if size < 60 else 'WARN', f'master size {size:.1f} MB')
    e = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', mp4, '-af', 'ebur128=peak=true', '-vn', '-f', 'null', '-'], capture_output=True, text=True).stderr
    lufs = re.findall(r'I:\s+(-?\d+\.?\d*) LUFS', e)
    peak = re.findall(r'Peak:\s+(-?\d+\.?\d*) dBFS', e)
    if lufs:
        i = float(lufs[-1])
        check('PASS' if -18 <= i <= -14 else 'WARN', f'loudness {i} LUFS (target about -16)')
    if peak:
        pk = float(peak[-1])
        check('PASS' if pk <= -1.0 else 'WARN', f'true peak {pk} dBTP (keep at or below -1)')

width = max(len(n) for _, n, _ in results)
for lvl, name, detail in results:
    print(f'{lvl:5} {name}' + (f'  <- {detail}' if detail else ''))
fails = sum(1 for r in results if r[0] == 'FAIL')
warns = sum(1 for r in results if r[0] == 'WARN')
print(f'\n{len(results)} checks: {fails} fail, {warns} warn')
sys.exit(1 if fails else 0)
