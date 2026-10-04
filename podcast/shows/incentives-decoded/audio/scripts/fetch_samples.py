"""Download the CC0 recordings the kit is built from (about 70 MB) into scripts/samples/."""
import json, os, urllib.parse, urllib.request, concurrent.futures as cf
HERE = os.path.dirname(os.path.abspath(__file__))
SETS = {
    'vcsl': ('sgossner/VCSL', ['Kalimba, Kenya', 'Marimba', 'Conga', 'Shaker, Small', 'Shaker, Large', 'Woodblock', 'Cajon', 'Cabasa', 'Slit Drum', 'Tambourine 1']),
    'vsco': ('sgossner/VSCO-2-CE', ['Solo Contrabass/Pizz']),
}

def tree(repo):
    with urllib.request.urlopen(f'https://api.github.com/repos/{repo}/git/trees/master?recursive=1') as r:
        return json.load(r)['tree']

jobs = []
for key, (repo, dirs) in SETS.items():
    for f in tree(repo):
        p = f['path']
        if f['type'] == 'blob' and p.lower().endswith('.wav') and '/Legacy/' not in p and any(f'/{d}/' in f'/{p}' for d in dirs):
            jobs.append((f'https://raw.githubusercontent.com/{repo}/master/{urllib.parse.quote(p)}', os.path.join(HERE, 'samples', key, p)))

def get(job):
    url, dst = job
    if os.path.exists(dst): return
    os.makedirs(os.path.dirname(dst), exist_ok=True); urllib.request.urlretrieve(url, dst)

with cf.ThreadPoolExecutor(12) as ex: list(ex.map(get, jobs))
print(f'{len(jobs)} samples in {os.path.join(HERE, "samples")}')
