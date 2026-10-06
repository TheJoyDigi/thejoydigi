"""Clip prep for the Incentives, Decoded shorts. Run with the whisper venv: ~/.venvs/whisper/bin/python.

  prep.py --list N        print chapter N's turns with times (pick segments for clip.json from this)
  prep.py <episode-dir>   cut the clip: out/voice.wav + out/clip.js (words with speaker, clip-relative times)

Chapter word timings are cached in _engine/cache/chN.json (transcribed once, then aligned to the published transcript).
"""
import difflib, json, re, subprocess, sys, wave
from pathlib import Path

import numpy as np

ENGINE = Path(__file__).resolve().parent
ROOT = ENGINE.parents[2]
PODCAST = ROOT / "public" / "podcasts" / "incentives-decoded"
SR = 48000


def norm(w):
    return re.sub(r"[^a-z0-9']", "", w.lower().replace("’", "'"))


def feed_info(n):
    xml = (PODCAST / "feed.xml").read_text()
    for item in re.findall(r"<item>(.*?)</item>", xml, re.S):
        title = re.search(r"<title>(.*?)</title>", item, re.S).group(1)
        if re.search(rf"Chapter {n}:", title):
            dur = re.search(r"<itunes:duration>(.*?)</itunes:duration>", item).group(1)
            h, m, s = (int(x) for x in dur.split(":"))
            short = re.sub(r"^.*?Chapter \d+:\s*", "", title).replace("&#x27;", "'").replace("&amp;", "&")
            return short, h * 3600 + m * 60 + s
    raise SystemExit(f"chapter {n} not in feed")


def transcript_tokens(n):
    md = (PODCAST / "transcripts" / f"{n}.md").read_text()
    toks = []
    for turn, para in enumerate(p for p in md.split("\n\n") if p.strip()):
        m = re.match(r"\*\*([^*:]+):\*\*\s*(.*)", para.strip(), re.S)
        if not m:
            continue
        text = re.sub(r"\\(.)", r"\1", m.group(2))
        for w in text.split():
            toks.append({"w": w, "sp": m.group(1).strip(), "turn": turn})
    return toks


def chapter_words(n):
    """Whisper words for the whole chapter, aligned to the transcript for spelling and speaker."""
    cache = ENGINE / "cache" / f"ch{n}.json"
    if cache.exists():
        return json.loads(cache.read_text())
    import mlx_whisper

    r = mlx_whisper.transcribe(str(PODCAST / f"incentives-decoded-chapter-{n}.mp3"), path_or_hf_repo="mlx-community/whisper-large-v3-turbo", word_timestamps=True, language="en", condition_on_previous_text=False)
    heard = [{"w": w["word"].strip(), "s": round(w["start"], 3), "e": round(w["end"], 3)} for s in r["segments"] for w in s["words"] if w["word"].strip()]
    toks = transcript_tokens(n)
    a, b = [norm(w["w"]) for w in heard], [norm(t["w"]) for t in toks]
    # The transcript is the source of truth for text and speaker; Whisper only supplies timing.
    times = [None] * len(toks)
    matched = 0

    def spread(j1, j2, s, e):
        weights = [max(1, len(b[j])) for j in range(j1, j2)]
        total, at = sum(weights), s
        for j, wt in zip(range(j1, j2), weights):
            d = (e - s) * wt / total
            times[j] = (round(at, 3), round(at + d, 3))
            at += d

    for op, i1, i2, j1, j2 in difflib.SequenceMatcher(None, a, b, autojunk=False).get_opcodes():
        if op == "equal":
            matched += i2 - i1
            for k in range(i2 - i1):
                times[j1 + k] = (heard[i1 + k]["s"], heard[i1 + k]["e"])
        elif op == "replace":
            spread(j1, j2, heard[i1]["s"], heard[i2 - 1]["e"])
    # Words Whisper missed: fill the silence between their timed neighbours.
    j = 0
    while j < len(toks):
        if times[j] is not None:
            j += 1
            continue
        k = j
        while k < len(toks) and times[k] is None:
            k += 1
        s = times[j - 1][1] if j else 0.0
        e = times[k][0] if k < len(toks) else s + 0.3 * (k - j)
        if e - s > 0.35 * (k - j) * 3:  # a long gap is music, not a missed word: keep the words tight to the left
            e = s + 0.3 * (k - j)
        spread(j, k, s, max(e, s + 0.12 * (k - j)))
        j = k
    words = [{"w": t["w"], "s": s, "e": e, "sp": t["sp"], "turn": t["turn"]} for t, (s, e) in zip(toks, times)]
    cache.parent.mkdir(exist_ok=True)
    tmp = cache.with_suffix(".tmp")
    tmp.write_text(json.dumps({"chapter": n, "aligned": round(matched / max(1, len(toks)), 3), "words": words}))
    tmp.rename(cache)
    return json.loads(cache.read_text())


def turns(words):
    out = []
    for w in words:
        if not out or out[-1]["turn"] != w["turn"]:
            out.append({"turn": w["turn"], "sp": w["sp"], "s": w["s"], "e": w["e"], "words": []})
        out[-1]["e"] = w["e"]
        out[-1]["words"].append(w["w"])
    return out


def list_chapter(n):
    data = chapter_words(n)
    title, secs = feed_info(n)
    print(f"Chapter {n}: {title}  ({secs // 60}:{secs % 60:02d}, alignment {data['aligned']:.0%})")
    prev = 0
    for t in turns(data["words"]):
        gap = t["s"] - prev
        if gap > 2:
            print(f"   ~ {gap:.1f}s without speech (music) ~")
        print(f"T{t['turn']:<3} {t['s']:7.2f}-{t['e']:7.2f}  {t['sp']:<6} {' '.join(t['words'])}")
        prev = t["e"]


def decode_mp3(n):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(PODCAST / f"incentives-decoded-chapter-{n}.mp3"), "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).reshape(-1, 2)


def cut(ep):
    clip = json.loads((ep / "clip.json").read_text())
    n = clip["chapter"]
    words = chapter_words(n)["words"]
    title, secs = feed_info(n)
    audio = decode_mp3(n)
    pieces, out_words, joins, t0 = [], [], [], 0.0
    for k, seg in enumerate(clip["segments"]):
        if "turns" in seg:
            a, b = seg["turns"]
            ws = [w for w in words if a <= w["turn"] <= b]
        else:
            ws = [w for w in words if w["s"] >= seg["start"] - 0.05 and w["e"] <= seg["end"] + 0.05]
        if not ws:
            raise SystemExit(f"segment {k} has no words: {seg}")
        after = [w for w in words if w["s"] > ws[-1]["e"]]
        s = max(0.0, ws[0]["s"] - seg.get("padStart", 0.12))
        e = min(ws[-1]["e"] + seg.get("padEnd", 0.35), after[0]["s"] - 0.04 if after else 1e9)
        piece = audio[int(s * SR):int(e * SR)].copy()
        fade_in, fade_out = int((0.01 if k == 0 and s < 0.05 else 0.06) * SR), int(0.12 * SR)
        piece[:fade_in] *= np.linspace(0, 1, fade_in)[:, None]
        piece[-fade_out:] *= np.linspace(1, 0, fade_out)[:, None]
        if k:
            joins.append(round(t0, 3))
        for w in ws:
            out_words.append({"w": w["w"], "s": round(w["s"] - s + t0, 3), "e": round(w["e"] - s + t0, 3), "sp": w["sp"]})
        pieces.append(piece)
        t0 += len(piece) / SR
    voice = np.concatenate(pieces)
    out = ep / "out"
    out.mkdir(exist_ok=True)
    with wave.open(str(out / "voice.wav"), "wb") as f:
        f.setnchannels(2); f.setsampwidth(2); f.setframerate(SR)
        f.writeframes((np.clip(voice, -1, 1) * 32767).astype("<i2").tobytes())
    hop = SR // 30
    rms = np.sqrt(np.mean(voice[: len(voice) // hop * hop].mean(axis=1).reshape(-1, hop) ** 2, axis=1))
    env = np.clip(rms / (np.percentile(rms, 95) + 1e-9), 0, 1)
    data = {"chapter": n, "title": title, "episodeMinutes": -(-secs // 60), "duration": round(t0, 3), "joins": joins, "words": out_words, "env": [round(float(x), 2) for x in env]}
    (out / "clip.js").write_text("window.CLIP = " + json.dumps(data) + ";\n")
    print(f"clip: chapter {n} '{title}', {len(clip['segments'])} segment(s), {t0:.2f}s voice, {len(out_words)} words")


if __name__ == "__main__":
    if len(sys.argv) == 3 and sys.argv[1] == "--list":
        list_chapter(int(sys.argv[2]))
    elif len(sys.argv) == 2:
        cut(Path(sys.argv[1]).resolve())
    else:
        print(__doc__)
