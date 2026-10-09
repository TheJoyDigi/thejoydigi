"""One-shot API deploy: ~/workspace/founder-files -> video/founder-files.
Opens a PR and leaves it open for review (--no-merge)."""
import sys, os, base64
sys.path.insert(0, os.path.expanduser("~/workspace/skills/github/bin"))
from deploy_dir import api

OWNER, REPO = "TheJoyDigi", "thejoydigi"
LOCAL = os.path.expanduser("~/workspace/founder-files")
BRANCH = "video/founder-files-director-package"
TITLE = "Founder Files: director package (show bible + 3 scripts + Claude handoff)"

def main():
    r = f"/repos/{OWNER}/{REPO}"
    repo_info = api("GET", r)
    default_branch = repo_info["default_branch"]
    ref = api("GET", f"{r}/git/ref/heads/{default_branch}")
    base_sha = ref["object"]["sha"]

    items = []
    for root, _, files in os.walk(LOCAL):
        for fn in sorted(files):
            full = os.path.join(root, fn)
            rel = os.path.relpath(full, LOCAL)
            with open(full, "rb") as f:
                content = base64.b64encode(f.read()).decode()
            blob = api("POST", f"{r}/git/blobs",
                       {"content": content, "encoding": "base64"})
            items.append({"path": f"video/founder-files/{rel}",
                          "mode": "100644", "type": "blob",
                          "sha": blob["sha"]})
    print(f"{len(items)} files")
    new_tree = api("POST", f"{r}/git/trees",
                   {"base_tree": base_sha, "tree": items})
    commit = api("POST", f"{r}/git/commits",
                 {"message": TITLE, "tree": new_tree["sha"],
                  "parents": [base_sha]})
    print(f"commit {commit['sha'][:8]}")
    try:
        api("POST", f"{r}/git/refs",
            {"ref": f"refs/heads/{BRANCH}", "sha": commit["sha"]})
    except Exception:
        api("PATCH", f"{r}/git/refs/heads/{BRANCH}",
            {"sha": commit["sha"], "force": True})
    pr = api("POST", f"{r}/pulls",
             {"title": TITLE, "head": BRANCH, "base": default_branch,
              "body": "Director package for the new Founder Files reel series (Long greenlit 2026-10-08).\n\n- Show bible: format, hook rules, visual/motion direction, sourcing rule\n- 3 fact-checked scripts: Airbnb cereal (Ch4), Spanx (Ch6), Liquid Death (Ch19)\n- Claude handoff: produce Ep01 as pilot, return for Long's review\n\nDocs/scripts only — no production commits. Left open for review."})
    print("PR #" + str(pr["number"]) + ": " + pr["html_url"])

main()
