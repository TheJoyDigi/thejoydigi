# Series bible — Worth It

**Production:** Worth It is a production of The Joy Digi. Never credit an
individual on show material. Every video ends with the umbrella mark and wordmark.

## Mission
Teach young people to *see* how money is really made — so they stop playing
defense with their money and start playing offense. Every episode takes one
ordinary money moment, reveals the value hiding inside it, and hands the viewer
one move that puts them on the creating side.

```
THE MYTH     the common advice everyone repeats      (pattern interrupt)
THE REFRAME  where the value actually was            (see it)
THE FLIP     the better question                     (the turn)
THE MOVE     one action, under 5 minutes             (do it)
SIGN-OFF     "Worth it."
```

## One-line pitch
Thirty seconds that change how you see money: every episode finds the value
hiding inside an everyday moment, then shows you how to be the one creating it.

## Title
**Worth It.** Tagline: *See the value. Be the value.* Sign-off: *Worth it.*
(The sign-off is the verdict and the brand in one word.)

## Why this show exists (the positioning)
The money-advice genre talks to young people like prey to be protected
("don't get trapped") or marks to be sold a course ("get rich"). Nobody shows
them the honest mechanics: money moves toward problems solved, and they can be
the solver. This show is the *Value, Created* thesis in 30 seconds — offensive,
not defensive. See `audience.md` for who, the pain, and the value.

## Audience
20s, working, feels stuck. Not reckless — underserved. Everything they've been
told is "spend less"; none of it changed their life. They want the honest
game, not hype and not lectures. Full picture in `audience.md`.

## Promise to the viewer
1. **One idea** per video.
2. **One reframe** you can't unsee.
3. **One question** better than the one you were asking.
4. **One move** you can do today, in under 5 minutes.
5. **No hype, no shame, nothing for sale.**

## Format spec
- **Aspect:** 9:16. Design canvas 360x640 units; master 1080x1920, 30 fps,
  H.264, AAC 48 kHz.
- **Length:** 25 to 35 s, target 30 s (Ep 1 runs 30.8 s).
- **Safe box (hard rule):** everything the viewer must read lives inside
  **y 90 to 470** of the 360x640 canvas (x 40 to 320 above y 280, x 40 to 260
  below), composed in three bands: headline (96–220), hero (220–350), readout
  (350–470). Below 470 is decoration. Check every episode against the app UI
  on a real phone (`platform-guide.md`).
- **Text:** burned in, kinetic, part of the scene. The episode must work on
  mute — the text carries the message, the voice carries the feeling.
- **Voice:** one warm narrator. Lines echo what's on screen, never add new
  information. Spoken form, short sentences, 2–7 words per line.
- **Music:** a subtle warm bed, ducked low under the voice; a soft resolve on
  the sign-off. Feeling, never carrier.
- **Sound is a layer, never the carrier.** The mute test is a hard gate.

## Episode structure

```
0-4 s      MYTH       the common advice, on screen         [struck-through type]
4-16 s     REFRAME    the lens reveals where value was     [the Lens device]
16-24 s    FLIP       the better question                  [the Counter device]
24-30 s    MOVE       one action + "Worth it." + slate      [the Move Card]
```

The viewer should feel the click: first the myth breaks, then the value comes
into focus, then the question turns on them — in a good way.

## Series devices
- **The Lens:** a gold circle that settles over the ordinary object (cup, price
  tag, paycheck) and reveals the value inside it. The show's visual thesis.
- **The Counter:** a horizontal line — buy side below, create side above. The
  flip moment crosses it.
- **The Myth Strike:** the myth appears, then one strike line crosses it as the
  reframe lands. Satisfying, repeatable.
- **The Move Card:** the final card. One action, gold "DO THIS" tab, then the
  "Worth it." stamp and the Joy Digi slate.

## Season 1 plan
12 episodes in 5 movements: Seeing → Creating → Capturing → Scaling → Giving
(`../01-episodes/season-map.md`). Each episode dramatizes one *Value, Created*
chapter. Season 2 pulls from the remaining chapters.

## Release cadence
3 posts a week, ~4 weeks per season. Post order is by hook strength, not
chapter order — lead with Ep 1, Ep 5, Ep 3.

## Success metrics
Completion rate, average percent viewed, saves, shares, comments that restate
the reframe in the viewer's own words ("I never thought of it like that"),
and follows per movement. No platform publishes benchmarks — set our own
baseline from the first six posts. See `growth-plan.md`.

## Roles
- **Lola — series director.** Owns the content: season map, scripts, art
  direction, voice direction, QA sign-off. Manages Claude agent's production
  work. Reports to Long.
- **Claude agent — production worker.** Builds the animation and visual content
  from the director's scripts, per the art guideline (`visual-style.md`).
  Renders, packages. Reuses and restyles the deterministic engine in
  `02-engine/`.
- **Long — executive.** Approves scripts (5 min) and final cuts (10 min),
  device test on his phone, posts, reports the numbers back.
