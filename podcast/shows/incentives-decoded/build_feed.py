#!/usr/bin/env python3
"""Build public/podcasts/incentives-decoded/feed.xml from Lola's final MP3s.

Usage: python3 podcast/shows/incentives-decoded/build_feed.py <dir with ch{N}-final.mp3> [--date 2026-10-04]
Copies each MP3 into public/podcasts/incentives-decoded/ and measures real byte size and duration.
"""

import argparse
import datetime as dt
import json
import shutil
import subprocess
from html import escape
from pathlib import Path

SLUG = "incentives-decoded"
SITE = "https://www.thejoydigi.com"
ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / "public" / "podcasts" / SLUG
TITLES = [
    "The Iron Law", "The World Is a Game", "Stated vs. Revealed", "Follow the Money",
    "Systems Get What They Reward", "Self-Interest Isn't Selfish", "Status: The Hidden Currency",
    "Fear and Greed", "Belonging and Tribes", "The Law of Least Effort", "Your Own Hidden Incentives",
    "The Principal-Agent Problem", "Goodhart's Law", "The Cobra Effect", "Tragedy of the Commons",
    "Signaling", "Zero-Sum vs. Positive-Sum", "The Tournament", "Who Writes the Rules Wins",
    "Reading the Room", "Negotiation: Find Their Payoff", "Designing Incentives", "Skin in the Game",
    "Reputation Systems", "Choosing Your Games", "Defecting Wisely", "Align, Don't Fight",
    "Win-Win Design", "Incentives for Yourself", "Teaching the Game", "The Meta-Game", "Play Beautiful Games",
]
PACIFIC = dt.timezone(dt.timedelta(hours=-7))


def duration(mp3: Path) -> int:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(mp3)],
        check=True, capture_output=True, text=True,
    )
    return round(float(out.stdout.strip()))


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("mp3_dir", type=Path)
    parser.add_argument("--date", default="2026-10-04", help="release day (Pacific); chapters are a minute apart")
    args = parser.parse_args()

    copy = json.loads((Path(__file__).parent / "descriptions.json").read_text())
    day = dt.datetime.fromisoformat(args.date).replace(hour=9, tzinfo=PACIFIC)
    items = []
    for n, title in enumerate(TITLES, 1):
        src = args.mp3_dir / f"ch{n}-final.mp3"
        dest = OUT / f"{SLUG}-chapter-{n}.mp3"
        shutil.copyfile(src, dest)
        secs = duration(dest)
        # RFC 822 with an explicit zone: the chapter-email validator and podcast-guard both require it.
        pub = (day + dt.timedelta(minutes=n)).strftime("%a, %d %b %Y %H:%M:%S %z")
        items.append(f"""<item>
<title>{escape(f"Incentives, Decoded — Chapter {n}: {title}")}</title>
<description>{escape(copy["chapters"][str(n)])}</description>
<pubDate>{pub}</pubDate>
<enclosure url="{SITE}/podcasts/{SLUG}/{dest.name}" length="{dest.stat().st_size}" type="audio/mpeg"/>
<guid isPermaLink="false">id-ch{n}-{args.date}</guid>
<itunes:author>The Joy Digi</itunes:author>
<itunes:episode>{n}</itunes:episode>
<itunes:duration>{secs // 3600}:{secs // 60 % 60:02d}:{secs % 60:02d}</itunes:duration>
<itunes:episodeType>full</itunes:episodeType>
</item>""")

    show = escape(copy["show"])
    feed = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>Incentives, Decoded</title>
<link>{SITE}/podcasts/{SLUG}</link>
<language>en-us</language>
<description>{show}</description>
<itunes:author>The Joy Digi</itunes:author>
<itunes:summary>{show}</itunes:summary>
<itunes:owner>
<itunes:name>The Joy Digi</itunes:name>
<itunes:email>hello@thejoydigi.com</itunes:email>
</itunes:owner>
<itunes:image href="{SITE}/podcasts/{SLUG}/cover.jpg"/>
<itunes:category text="Education"/>
<itunes:explicit>false</itunes:explicit>
<itunes:type>serial</itunes:type>
<managingEditor>hello@thejoydigi.com (The Joy Digi)</managingEditor>
<atom:link href="{SITE}/podcasts/{SLUG}/feed.xml" rel="self" type="application/rss+xml"/>

""" + "\n\n".join(items) + "\n\n</channel>\n</rss>\n"
    (OUT / "feed.xml").write_text(feed, encoding="utf-8")
    print(f"Wrote {len(items)} chapters to {OUT / 'feed.xml'}")


if __name__ == "__main__":
    main()
