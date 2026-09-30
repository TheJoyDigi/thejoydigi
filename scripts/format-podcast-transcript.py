#!/usr/bin/env python3
"""Turn a TTS script into the Markdown stored beside a published episode."""

import argparse
import re
from pathlib import Path


TURN = re.compile(r"^([A-Za-z][A-Za-z .'-]*):\s*(.+)$")


def format_script(script: str) -> str:
    paragraphs = []
    for line_number, line in enumerate(script.splitlines(), 1):
        if not line.strip():
            continue
        match = TURN.fullmatch(line.strip())
        if not match:
            raise ValueError(f"line {line_number} is not a speaker turn: {line[:80]}")
        speaker, speech = match.groups()
        # Scripts are plain speech. Escape Markdown syntax so the published text
        # remains the words the speakers said.
        speech = re.sub(r"([\\`*_{}\[\]<>])", r"\\\1", speech)
        paragraphs.append(f"**{speaker}:** {speech}")
    if not paragraphs:
        raise ValueError("script has no speaker turns")
    return "\n\n".join(paragraphs) + "\n"


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("script", type=Path, help="source script.txt")
    parser.add_argument("output", type=Path, help="public/podcasts/<slug>/transcripts/<N>.md")
    args = parser.parse_args()
    transcript = format_script(args.script.read_text(encoding="utf-8"))
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(transcript, encoding="utf-8")


if __name__ == "__main__":
    main()
