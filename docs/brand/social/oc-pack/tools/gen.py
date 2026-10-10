#!/usr/bin/env python3
"""One on-brand OC Pack image via Codex image_generation; pass the logo as -r to keep the mascots consistent."""
import argparse, pathlib, subprocess, sys, time

STYLE = pathlib.Path(__file__).with_name("codex-style.txt").read_text()

ap = argparse.ArgumentParser()
ap.add_argument("name"); ap.add_argument("subject")
ap.add_argument("-o", "--outdir", type=pathlib.Path, required=True)
ap.add_argument("-r", "--ref", action="append", default=[])
ap.add_argument("--shape", default="square 1024x1024")
a = ap.parse_args()
out = a.outdir.resolve(); out.mkdir(parents=True, exist_ok=True)
refs = ""
if a.ref:
    refs = ("\n\nREFERENCE IMAGES are attached. Match their character design, line weight, "
            "palette and lettering exactly; they are the approved brand. Do not copy their layout "
            "unless asked.")
prompt = (
    "Generate ONE image with your built-in `image_generation` tool. Do NOT write Python and do NOT "
    f"call any external image API.\n\nCANVAS: {a.shape}.\n\nIMAGE:\n{a.subject}{refs}\n\n"
    f"STYLE IS MANDATORY:\n{STYLE}\n\n"
    "Then copy the PNG your image tool just wrote (under ~/.codex/work/generated_images/<this session id>/) "
    f"to {out}/{a.name}.png, confirm the file exists, print 'OK' and stop. Create no other files.")
cmd = ["codex", "exec", "--cd", str(out), "--skip-git-repo-check", "-m", "gpt-5.6-sol",
       "-c", "model_reasoning_effort=low"]
for r in a.ref: cmd += ["-i", str(pathlib.Path(r).resolve())]
cmd += ["-"]
t = time.time()
p = subprocess.run(cmd, input=prompt, text=True, capture_output=True)
f = out / f"{a.name}.png"
print(f"{a.name}: {'OK' if f.exists() else 'FAILED'} {time.time()-t:.0f}s")
if not f.exists(): print(p.stdout[-1500:], p.stderr[-1500:])
sys.exit(0 if f.exists() else 1)
