# Experiments

Format trials kept as future options. Nothing here is in production.

| Folder | What | Status |
|---|---|---|
| `receipt/` | **The Receipt.** Ep 1 told on a thermal receipt that prints and scrolls out of a printer: red-marker myth, "MYTH: VOID" stamp, hidden value line items, "VALUE PAID" highlighter, the receipt tears and flips into "YOUR SHOP – MERCHANT COPY", "WORTH IT." stamp, Joy Digi footer. Lo-fi bed and printer, marker, stamp, tear sounds. Same Leda narration as production Ep 1. | Liked by Long (2026-10-02). Kept as a future option. |

Rebuild the Receipt: `python3 receipt/build.py` then `node ../../02-engine/episode/render_ep.js receipt` (from `03-assets/experiments`).
Needs the Ep 1 narration in `03-assets/format-lab/export/` (git-ignored; `format-lab/voice_build.py Leda` regenerates it).
Other ideas not built yet: "Two Sides of the Counter" (split screen buyer vs maker), "The Group Chat" (Wren and Kai argue the myth in a text thread).
