# Series bible

**Production:** Trap or Treasure is a production of The Joy Digi (standing credit line, see `docs/brand/design-standard.md`). Never credit an individual on show material. Every video ends with the umbrella mark and wordmark.

## Mission
Show young people the traps built into the modern consumer and financial system, so they see them before they step in, and give them a clear path to financial success.

```
TRAP (name it)  ->  HOW IT WORKS (one picture + one number)  ->  PATH (the quest)
   awareness              understanding                           action
```

- **Traps** are designed-in: marketing, fees, defaults, interest, scams, social pressure. The viewer is never the problem.
- **The path** is the world order: basics, save, credit, debt, invest, protect.
- Every episode names one trap, draws it as a creature (a **Snare**), and ends on one way out. Traps are described by mechanism, never by company (`content-rules.md`).

## One-line pitch
Every video, a sly little creature has a trap set for your money. Mei (and her friend Rex) walk into it, you see exactly how it works and who profits, then you get the one move that beats it.

## Title
**Trap or Treasure.** Tagline: *Spot the trap. Find the treasure.* End-card catchphrase: *Level up!*
Considered and dropped: Pocket Quest, Money Maze, Wise Up. Trademark and handle availability not yet checked.

## Why this should win attention (and what is a hypothesis)
Almost everyone in this space is a talking head. We found no character-driven personal-finance short-form show aimed at this age (`evidence.md`; this is "none found", not proof). Our bets:

| Bet | Why | Evidence status |
|---|---|---|
| **A face in the first second** (Mei, proud then shocked) | A reacting face is the fastest emotional signal | hypothesis, tested by the Hook Lab |
| **A creature per trap** (the Snare) | Memorable, nameable, collectible, shareable. Replaces generic "evil bank" imagery. | hypothesis |
| **Receipts** (sources in the comments, no affiliates, corrections out loud) | Young people use social media for money tips but trust family more, and "I show my wins" cues are easy to fake (`evidence.md`) | partly evidence, partly bet |
| **Honest and kind** (no get-rich, no shame) | The category is full of hype | brand bet |
| **Built for sends and replays, not asks** | Instagram says its top signals are watch time, likes and sends; it will not recommend content that explicitly asks for shares, comments or tags | platform-stated |

Retention research found **no published effect sizes** for hook length, pacing or loops. Our pacing rules are working hypotheses and we test them (`growth-plan.md`).

## Audience
- **Core: ages 18 to 25**, US, first jobs, first cards, first apartments. Almost all the data we have is 18 and up.
- **16 and 17 year olds** are welcome and the show must be safe for them, but we have no evidence about their needs. Several traps (cards, loans, betting) are 18+ topics for them; scams, subscriptions and influencers reach them.
- Reading level: eighth grade or lower. Short words. No jargon without a picture.
- They scroll fast and may watch with sound off.

## Promise to the viewer
1. **One idea** per video.
2. **One picture** you can remember (the metaphor and the Snare).
3. **One number** you can check (illustrative if it is an example).
4. **One quest** you can do in under 5 minutes.
5. **No shame, no get-rich promises, nothing for sale.**

## Pillars
| Pillar | Meaning | Example |
|---|---|---|
| Visual first | Teach with a picture, not a lecture | The Snare's size is how much you still owe |
| Honest | Say what we do not know; no returns promised; sources shown | "Illustrative" tag, "Receipts in the comments" |
| Independent | No sponsors or affiliates from financial products; no product picks | `content-rules.md` |
| Kind | Mistakes are normal, recovery is the story | Rex is never humiliated |
| Persistent | Mei keeps going, so do you | Her XP bar carries across episodes |
| Collectible | Every solved trap is a card | The Trap Files binder |

## Format spec
- **Aspect:** 9:16. Design canvas 360x640 units; master 1080x1920, 30 fps, H.264, AAC 48 kHz (`platform-guide.md`).
- **Length:** 25 to 35 s, target 30 s (Ep 14 runs 28.6 s). Bonus shorts 12 to 20 s.
- **Safe box (hard rule):** everything the viewer must read (faces, numbers, headlines, disclaimers, the brand slate) lives inside **y 90 to 470, x 40 to 320 above y 280 and x 40 to 260 below it** of the 360x640 canvas, spread over three bands (headline 96 to 220, hero 220 to 350, readout 350 to 470). The strict ad-spec limit is y 416; we use 470 as an estimate for organic posts and confirm it on a phone (`platform-guide.md`). Below 470 is decoration. Check every episode with `sheet.js --safe`.
- **Text:** burned in, animated, part of the scene. The first frame already shows the hook.
- **Styles:** one style per beat (`visual-style.md`).
- **Sound is a layer, never the carrier.**

```
Picture       carries the message   the trap, the Snare, the money arrow
Burned text   carries the message   hook, the one number, the rule, the quest
Music + sfx   adds, never sole      tension in the trap, relief at the treasure, clicks and clinks on actions
Voice          adds, never sole      Mei's voice: Google Gemini TTS (see below)
```

- **Mute test:** with sound off, a viewer must be able to say the trap, the number and the quest.
- **Voice (decided 2026-10-01): Mei speaks with Google Gemini text-to-speech.** Every line only repeats what is already on screen, so the mute test still passes. About 14 short lines per episode, fitted to the beats, with the music ducked under them (`02-engine/voice/voice.py`). **Voice: Leda, chosen by the director** (`characters.md`, Mei: voice).
  - **Always keep a silent cut.** Rendering is cheap, and platform policy can change.
  - **Risks we accepted, with the mitigation:** YouTube's monetization policy bars "AI-generated podcast hosts offering financial guidance" and it is unclear for a cartoon host, so re-read it before turning on YouTube monetization; label the video as AI-generated wherever a platform offers the toggle (TikTok says generic text-to-speech does not need it, so this is a precaution); never imitate a real person's voice; and test voice vs no voice on completion (`growth-plan.md`).
- **Delivery:** MP4 for TikTok, Reels and Shorts. A 720p copy for review and Slack.

## Episode structure: one trap, then the treasure

```
0-1.9 s    HOOK       a face + the trap as a number, or the Snare in silhouette    [kinetic type, Mei close-up]
1.9-6 s    STEP IN    Mei (or Rex) walks into it; the Snare appears                [anime, red-tinted]
6-15.5 s   X-RAY      how it works, who profits, one number counting up            [Pearl print + draw-on]
15.5-24 s  TREASURE   colors open up; the Snare shrinks; the way out               [anime, green-gold, game UI]
24-28.6 s  QUEST      one action under 5 min + the solved Trap File card + slate   [flat card]
           LOOP       cut back to the hook
```

The viewer should feel the escape: tense and red in the trap, open and bright at the treasure. The X-ray shows the design of the trap and who profits, so the viewer sees the system, not their own failure.

## Hook Lab
Every episode gets **three openings**, because the first two seconds decide everything and no one publishes numbers on what works:

| Hook | What it is |
|---|---|
| **A** | Mei's face, proud then shocked, with the number |
| **B** | The Snare in silhouette, then the reveal |
| **C** | Text only |

Cheap to make: only the first 2 s differ. Rotate A, B and C across the first nine episodes and compare skip rate and completion (`growth-plan.md`). It is weak evidence, but it is real evidence from our own audience.

## Energy and attention (working hypotheses, not platform facts)
- **128 bpm.** Cuts land on the beat. A kick on every beat.
- **Frequent change:** a new word, pop, swipe, counter tick or camera move every second or two, except the 1.5 s quest-card hold, which is on purpose.
- **Punch on every hit:** the whole frame kicks in about 4% and settles. A small pulse rides each beat.
- **Open a question, answer it fast:** "WHERE DID THE $20 GO?" makes people stay for the answer.
- **Reward at the end:** the biggest number and the quest come last.
- **Make it sendable, never ask:** design a card or a number worth forwarding. Do not say "share this" or "comment X" on screen. End with an open question ("Which trap got you?").

## Series devices
- **The Snare:** each trap is a creature. Its size is how much you owe. It shrinks, then poofs. It has a weakness, and the weakness is the quest.
- **Trap Files:** a numbered stamp ("TRAP 14 / 24") and a collectible card per solved trap, 24 slots in the binder.
- **Follow-the-money arrow:** same shape and color every time, from your wallet to whoever profits.
- **Receipts:** sources in the pinned comment on every video.
- **Treasure card:** the final frame, built to be screenshotted.
- **Trap or Treasure? quizzes:** 12 to 15 s bonus shorts. An offer appears, viewers guess, then the reveal.
- **Mei's XP bar**, **Nickel the coin** (find-Nickel drives rewatches), **Pearl's Corner** (myth-busters), **world bosses** (a one-question quiz ending each world), and the catchphrase **"Level up!"**.

## Season 1 plan
24 traps in 6 worlds, ranked by evidence (`../01-episodes/episode-map.md`, `evidence.md`). Bonus shorts fill the gaps and carry the traps that did not make the 24.

## Release cadence
3 posts per week, about 8 weeks, produced a world at a time (4 videos) and posted over about 1.5 weeks while the next is built. Buffer's TikTok study (11.4M posts, within-account, Oct 2025) found 2 to 5 posts a week gave the biggest gain per post; it is correlational. **Post order is by hook strength, not curriculum order** (`growth-plan.md`).

## Series pages and platform features
Use YouTube Shorts series, Instagram "Watch Part 2" and TikTok Playlists. None has a published effect on growth. They match the numbered format.

## Success metrics
Skip or swiped-away rate, completion, sends per reach, saves, comments that name a trap, and followers per world. No platform publishes benchmarks, so we set our own baseline from the first six posts. See `growth-plan.md`.
