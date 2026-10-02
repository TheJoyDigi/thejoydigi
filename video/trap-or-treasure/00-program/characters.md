# Characters (v2, director's cut)

**Principle:** one idea per video, so the cast is small and every character has a job in the four-beat format. Nobody is decoration. Each one must be cheap to animate.

```
   MEI    hero, 19        spots the trap, takes it apart, finds the way out
   REX    her friend      falls for it first ("it's only $8!"): the viewer's stand-in
   SNARE  the trap        one creature per trap: a MECHANISM drawn as a character, never a company
   NICKEL a coin          never speaks; reacts; the find-me Easter egg
   PEARL  the archivist   keeps the Trap Files; Pearl's Corner and the X-ray pages (to redraw)
```

Cast sheet (live, look at it first): `03-assets/cast/` (build: `python3 02-engine/build.py 03-assets/cast`).

## Who does what in a 30 s episode

| Beat | Who is on screen | Why |
|---|---|---|
| HOOK (0 to 1.9 s) | Mei's **face** (close-up) or the Snare in silhouette, plus the number | A face reacting is the fastest way to make a viewer feel something. The creature reveal is a curiosity hook. |
| STEP IN | Whoever falls: Mei or Rex. The Snare appears. | The viewer sees themselves fall. |
| X-RAY | The Snare, the coin, the money arrow. Mei and Rex step out. | The mechanism is the star. Pearl look. |
| TREASURE | Mei, Nickel, the Snare shrinking | The escape, the payoff. |
| QUEST | The solved Trap File card, Nickel peeking | The collectible, the action. |

**Who falls:** Rex falls in the "it's only $8!" traps (Pay in 4, subscriptions, betting, impulse buys). Mei falls where the mistake feels responsible (the minimum payment). Either way the next beat shows the way out. Rex is never humiliated. He is us on a bad day.

## Mei: the hero
- **Who:** 19, first job, first apartment. Not the smartest or fastest. Keeps going, keeps learning. Dry humor, never preachy. "Okay. Let's figure it out."
- **Look (v2):** black ponytail with a red ribbon, **butter-yellow jacket** (the series anchor color), white tee, **jeans, white sneakers, work lanyard with a badge** (the first-job signal), coral backpack. Soft brown eyes.
- **Why v2:** the first rig was a school uniform (pleated skirt, socks, bow). That reads as a high-schooler, younger than our 16 to 25 audience and wrong for a story about a first job and an apartment. Same body and face, new clothes.
- **Voice:** Google Gemini TTS, **Leda** ("Youthful"), fast and snappy, lines of 2 to 7 words that only repeat what is on screen. Chosen by the director on 2026-10-01 by a blind comparison: 8 candidate voices read the same three lines, two audio-capable Gemini models scored them without knowing the voice names, and Leda had the best average (8.5 of 10) and was the only voice in both judges' top two. Others swung between judges (Aoede 8.9 vs 5.7, Callirrhoe 6.9 vs 8.9). Runner-up: Callirrhoe (7.9). Ruled out: Sadachbia (a male voice). A faster and a more "understated" delivery were also tested; the current one scored best and fits the beat timing. **This is a screening method, not a human ear:** the one recorded risk is that Leda can sound slightly performative. Re-run with `python3 02-engine/voice/pick.py <ep>`.
- **Faces:** calm, joy, sad, resolve, shout, **shock** (new: raised brows, small pupils, round mouth).
- **Rig:** `02-engine/parts/rig-mei.js`, `env.look = 'work'`. Poses: walk, run, sit, slump, bend, victory. To add: phone-check, pointing, counting coins.

## Rex: the friend
- **Who:** buys first, thinks later. Funny, warm, loyal. Learns by the end of each world, but not every episode.
- **Look:** coral hoodie, **headphones**, spiky dark hair, dark jeans, yellow sneakers. Built on Mei's rig (`env.look = 'rex'`), so he costs almost nothing to animate.
- **Line:** "It's only $8!" It is never only $8.
- **Voice:** Google Gemini TTS, **Umbriel** ("Easy-going"). Chosen on 2026-10-01 by the same blind test as Mei's: 8 male-leaning voices, two audio-capable judges, names hidden; Umbriel had the best average (8.1) and scored well with both judges (8.9 and 7.4). Runner-up: Sadachbia (one judge heard it as too mature). First episode: 16.
- **Rule:** never humiliated.
- **Face pass (done, first round):** heavier brows and a lighter lid line so he does not read as Mei with different hair. Revisit after his first episode is seen.

## The Snares: the traps as creatures
- **What:** every episode's trap is a small, sly creature. It stands for **one mechanism** (minimum payments, urgency, auto-renew), **never a company and never "all lenders"**. Borrowing has a fair price; the Snare is the trick, not the loan.
- **Why:** a trap you can see is a trap you remember. A creature is a character people can name, share, collect and draw. It also replaces generic "bank buildings" that can read as "banks are evil", which is neither accurate nor fair.
- **Design language (all Snares):** Snare violet body (`#C04FD0`), big pointed ears, a tail with an arrow tip (it points at your wallet), a prop that shows the mechanism, sly not scary. Four moods: **smug**, **gulp** (eats your interest), **scared** (you paid extra), **dizzy** (debt cleared).
- **Size = how much you still owe.** It shrinks as the debt shrinks, and poofs when you beat it. This is the show's visual signature.
- **Weakness = the quest.** Every Snare has one. The Treadmill Gremlin's weakness is "a fixed payment": the minimum shrinks as you pay, so a payment that stays the same beats it.
- **The Trap File card:** a collectible card per Snare (number, name, type, move, weakness) with a SOLVED stamp. 24 slots in the binder.
- **Rig:** `gremlin()` in `02-engine/parts/infographics.js` is the base. A new Snare is the same body with a different prop, ears and accessory, about a day each.

Working names (proposals, trap number = episode number; to be confirmed as each episode is scripted):

| # | Snare | Prop | # | Snare | Prop |
|---|---|---|---|---|---|
| 1 | Price-Tag Chameleon | tag that hides the hours | 13 | Snowball Yeti | rolling snowball |
| 2 | Renewal Leech | ticking calendar | 14 | **Treadmill Gremlin** (done) | remote and coin sack |
| 3 | Gross Gnome | oversized paycheck | 15 | Fine-Print Fox | magnifier for tiny print |
| 4 | Drip Imp | leaky tap | 16 | Quad Imp | four invoices |
| 5 | Later Lizard | "later" sign | 17 | Shrink-Ray Bot | ray gun |
| 6 | Bill Bat | surprise envelope | 18 | Late-Start Sloth | clock stuck at 0 |
| 7 | Dust Bunny | cash in a sock | 19 | Hype Hawk | winning screenshots |
| 8 | Fee Moth | holes in a wallet | 20 | Unclaimed Ghost | uncollected coins |
| 9 | Shadow Score | hidden meter | 21 | Bait Fish | fishing lure |
| 10 | Locked-Box Imp | padlocked box | 22 | Payday Piranha | coin turnstile |
| 11 | Max Ogre | maxed-out gauge | 23 | Jackpot Jester | slot lever |
| 12 | Clock Leech | ticking clock | 24 | Drift Fog | no map |

Parked Snares (their episodes moved to bonus shorts): Flash-Sale Sprite, Someday Snail, Debt Hydra, One-Basket Raccoon, Imposter Imp, Shame Shadow.

## Nickel: the coin
- **Who:** a small gold coin with a face and tiny arms. Never speaks. Emotes with eyes and bounces. Worried, happy, ok.
- **Job:** the emotional reaction in the corner, the "find Nickel" Easter egg that drives rewatches, and the series' mascot on the quest card.
- **Rig:** `nickel()` in `infographics.js`. Done.

## Pearl: the archivist
- **Who:** the warm mid-century office legend from the popcorn film. In v2 she is **the keeper of the Trap Files**, which gives the cream-and-teal "Pearl look" a reason to exist: every X-ray page is a page from her archive.
- **Use:** Pearl's Corner shorts (definitions, myth-busters) and X-ray cutaways. Not in every episode. Gen Z often prefers a peer to an elder, so she supports and never lectures.
- **Rig status:** front-facing rig exists in `reference/popcorn-vertical.html` and is **not yet ported**. To do: `rig-pearl.js`, hold-up-sign, chalkboard and shrug poses. Her wall sign reads "The Joy Digi". Never reintroduce any other company name.

## Voice and text
- Short, honest, a little funny. Eighth-grade words. No jargon without a picture.
- On-screen text carries the message (mute test). A voiceover, if tested, only echoes it. See `series-bible.md`.

## Consistency rules
- Same palette and outline weight for every character in every style.
- Mei's yellow jacket is the anchor color. The Snare violet is only for Snares.
- Semantic colors hold: green is good, red is cost or danger. Never swap them.
- Keep a pose sheet per character in `03-assets/`.
- A Snare never represents a real company. Show the fair side of borrowing too.
- The cast should look like the audience: new supporting characters (coworkers, a landlord, a cashier) should vary in age, background and body type.
