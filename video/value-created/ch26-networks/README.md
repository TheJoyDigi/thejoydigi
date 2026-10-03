# Value, Created — Chapter 26: Networks (LinkedIn cut)

The social video for sharing Chapter 26. It teaches the whole idea on screen, so it works with the sound off: a product's value is who else is on it, because every new user makes it better for everyone already there.

| | |
|---|---|
| File | `value-created-ch26-networks.mp4` (approved by Long, 2026-10-03) |
| Format | 1080 × 1080, 30 fps, H.264 + AAC, 38.0 s, about 8.8 MB, -14.7 LUFS |
| Thumbnail | `thumbnail.png` (the takeaway frame), for LinkedIn's custom thumbnail |
| Source | `public/podcasts/value-created/transcripts/26.md` |
| Use | Post the video, put the episode link in the first comment |

## Beats
| Time | On screen |
|---|---|
| 0–4.5 s | One wire. Two places. Worth almost nothing. (1844 telegraph, Washington to Baltimore) / A lone fax is a paperweight. Until a second one sells. (one grey node, a second arrives, both turn gold) |
| 4.5–7.6 | Value lives in the connections. Same device. Different crowd. (one lonely node: SCULPTURE, a linked cluster: NECESSITY) |
| 7.6–11.2 | Newcomers enrich everyone. The hundredth makes ninety-nine richer. (a "+" node lands in a ring of six and links to each, which light up) |
| 11.2–14.5 | Sold. Nobody to fax. (seven grey, sleeping nodes) |
| 14.5–19.3 | Then a crowd joined. Old machines woke up. No update. No new feature. (crowd nodes rise in, riser, then every old node and link lights gold on the drop) |
| 19.3–23.2 | More users, less value. When arrivals bring noise. (a gold lattice; spiky ink nodes arrive and the links and nodes dim) |
| 23.2–28.2 | Three rules: Build for the second user. / Seed where people gather. / Protect the signal. |
| 28.2–33.0 | Not a product used alone. A place people bring each other. (a chain of nodes grows, each bringing the next) |
| 33.0–38.0 | Value, Created — Chapter 26: Networks / Full 7-minute episode — link in comments |

Copy rules kept: no hashtags, no emojis, no hard sell, no author byline, no Blue Sock. About 85 words on screen before the end card (headlines and sub-lines; about 100 with the small caps labels). The drop (real 16.5 s) is the old machines waking up. No dollar signs, coins, price tags or financial charts; the node graphs have no axes.

Copy notes:
- "Same device. Different crowd." paraphrases "The same machine. Completely different value." (telephone, sculpture vs necessity).
- "Sold. Nobody to fax." and "Then a crowd joined." compress the fax story (buyers complained there was nobody to fax; large companies then bought in bulk). "No update. No new feature." is the transcript's wording.
- "More users, less value." paraphrases "more users, less value" (the transcript's own phrase for noise); the spiky nodes are a generic stand-in for spam, scams and cruelty.
- Takeaway lines are the transcript's: "not a product people use alone ... a place people bring each other".
- The end card says "7-minute" per the team brief's table; the feed's `itunes:duration` was not re-checked.

## Re-render
```
cd video/value-created
node _engine/render.js ch26-networks --sheet 2,6,11,15,19,24,30   # stills + out/sheet.png (real seconds; add --design for design time)
node _engine/render.js ch26-networks                             # out/<slug>.mp4 + checks (about 90 s)
```
`scene.js` holds this chapter's scenes, `WARP` pacing and sound cues; everything else is the shared engine (`../_engine/README.md`). Copy the MP4 here only once it's approved.
