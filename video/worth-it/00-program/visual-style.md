# Art guideline — Worth It

**Feeling:** warm editorial, not cartoon. A beautifully designed page come
alive. Confident, calm, adult — for people who are done being talked down to.
This show is a voice you trust, not a sugar rush.

## Canvas and layout (hard rules)
- 9:16. Design in 360x640 units; master 1080x1920, 30 fps.
- **Safe box:** y 90 to 470; x 40–320 above y 280, x 40–260 below. Compose in
  three bands — headline (96–220), hero (220–350), readout (350–470).
  Below 470 is decoration only. Verify on a real phone (`platform-guide.md`).
- **Freeze-frame test:** pause anywhere — one focal point, the eye knows where
  to go.
- **One idea per card.** Max ~8 words on screen at once. Never stack two new
  ideas in one beat.
- Frame 0 already shows the hook (it becomes the cover).

## Palette

| Role | Hex | Use |
|---|---|---|
| Paper cream | `#F6EEDC` | backgrounds — the show lives on paper, not on screens |
| Ink | `#1B2340` | type, lines, outlines |
| Worth gold | `#F5B83D` | value revealed — the Lens, the key number, the Move Card tab |
| Deep teal | `#0E4D5C` | secondary fields, the Counter line |
| Signal red | `#E4574D` | the myth only — struck-through, then gone. Never for people, never lingering |
| Growth green | `#3FA97C` | the flip and the move — the way forward |

**Semantic rule:** gold always means value found. Red only ever marks the
myth being broken. Green only ever marks the way forward. Never swap them.

## Typography (3 families, no more)
| Role | Voice | Use |
|---|---|---|
| Statement | Space Grotesk 700, ink on cream | the myth, the reframe lines, the move |
| Margin note | Caveat (handwriting), ink | the flip question — personal, like a note to yourself |
| Caption | Figtree 600 | small labels, disclaimers |

Type motion: words land with weight (firm ease-out, short settle), not bounce.
The myth slams in; the strike line draws across it in one motion; reframe lines
arrive as the Lens settles.

## Signature devices (build once, reuse every episode)
1. **The Lens** — a gold ring that sweeps in and settles over the ordinary
   object (cup, tag, paycheck). Inside the ring, the value is revealed: the
   problems solved, listed simply. The show's visual thesis.
2. **The Counter** — a horizontal teal line. Buy side below, create side above.
   The flip moment crosses it — the camera or the type moves up through the line.
3. **The Myth Strike** — the myth appears in ink (red-tinted wash behind it);
   one confident strike line crosses it out as the reframe lands.
4. **The Move Card** — cream card, ink border, gold "DO THIS" tab. One action.
   Then the "Worth it." stamp lands, then the Joy Digi slate.

## The everyday objects (one per episode, drawn simply)
Coffee cup, price tag, paycheck, phone (free app), hourglass (skill), tangled
knot → straight line (friction), handshake (trust), two shapes combining
(remix), megaphone/price label (raise), pie being sliced (capture), key/deed
(ownership), two arrows trading places (trade), open hands (give). Flat,
ink-outlined, paper-textured. No mascots, no faces, no characters — the
objects and the words are the cast.

## Motion rules
1. Calm confidence. Slower cutting than hype content — holds on the key line
   so it lands. Ease in-out everywhere.
2. **Show it before you say it.** The picture arrives, then the words confirm.
3. The Lens settles → the value list writes on → the Counter crosses → the
   Move Card holds still for a full beat (the action must be readable).
4. 0.5 s of stillness before the Move Card so the action lands.
5. Grain: one subtle paper grain overlay on everything, shared across episodes.

## Brand slate (end card)
Deep teal `#003B49` background, coral four-point sparkle mark `#FF6B6B`
(drawn in code), "The Joy Digi" in Fraunces, Soft Sand `#FDF6EC`. Credit line:
"Worth It is a production of The Joy Digi" in DM Sans 500, 10 units, Soft Sand.
Inside the safe box (about y 430–470). See `docs/brand/design-standard.md`.

## What NOT to do
- No creatures, mascots, anime faces, or characters of any kind.
- No red/green "trap vs treasure" grading, no fake phone UIs, no game UI.
- No hype aesthetics: no "$$$", no rockets, no luxury signifiers.
- Never punch down at the viewer. The myth gets struck, never the person.
- Never decorate a beat that should be still. Stillness is a device.

## For Claude agent (build notes)
- The deterministic engine in `02-engine/` is reused: kinetic type, Lens/Counter/
  Strike/Card as parameterized parts, `render.js` for MP4, `sheet.js --safe`
  for the safe-box check. Restyle parts to this palette and type spec; retire
  the Snare/creature rigs (parked, not deleted).
- New builds needed: Lens, Counter, Myth Strike, Move Card, the 12 everyday
  objects, paper grain overlay.
