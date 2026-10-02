# Content rules — Worth It

This show teaches how value works. Getting it right matters more than getting
it fast, and honesty is the product. Many rules are checked by the director at
QA; the automated checks live in `02-engine/qa/`.

## Rules
1. **Every episode must earn its chapter.** The director names the *Value,
   Created* chapter the episode dramatizes. If the reframe doesn't hold up to
   the chapter, the script is rewritten.
2. **Education, not advice.** Say "one way" or "common guidance", never "you
   should" about a specific product, amount, or investment for the viewer.
3. **No promises.** No returns promised, no income implied, no "you will earn".
   Growth examples are labeled **illustrative** on screen.
4. **No stock, fund, crypto, or product picks.** Categories only, never names.
5. **No shaming.** The myth gets struck, never the person. People are stuck
   because the game was hidden from them, not because they're foolish.
6. **No hype.** No "get rich", no luxury signifiers, no urgency tricks. The
   show's confidence comes from clarity, not volume.
7. **Claims need sources.** Any number or factual claim gets a row in the
   episode's `claims.md` (template: `podcast/shared/CLAIMS_TEMPLATE.md`):
   exact URL, primary sources first, verdict keep/qualify/correct/remove.
   **No source, no airtime.** This show uses fewer numbers than most — that's
   fine; a number without a source never ships.
8. **US rules by default.** Label them. Other countries get their own cut.
9. **Plain words.** Eighth-grade reading level. If a word needs a definition,
   the picture defines it.
10. **Disclaimer on the end card:** "Educational only. Not financial advice."
11. **Brand safety.** No real company, lender, bank, app, retailer, coin,
    creator, or product — on screen or in captions. Fictional/generic only.
    The Joy Digi is the only brand that appears.
12. **Independence.** No sponsors, affiliate links, referral codes, or paid
    placements. If the show ever takes money, the source is stated on screen
    and in the caption.
13. **Corrections out loud.** If something is wrong: fix it, pin a correction,
    log it in the episode's `claims.md` under "Corrected".
14. **No engagement bait.** Never "share this", "comment X", "tag a friend" —
    on screen or in captions. End with the move, not a command. (Instagram
    will not recommend explicit ask-content.)
15. **Made for kids.** Keep kid-targeting out of titles, tags, thumbnails. Set
    "not made for kids" on YouTube at channel and video level; check after the
    first upload.
16. **AI disclosure.** The voice is synthetic; label it wherever a platform
    offers the toggle. Never imitate a real person's voice. Keep a silent cut
    of every episode.

## Review checklist (every episode, before post)
Director (human):
- [ ] The one idea is stated in one sentence
- [ ] The reframe earns its chapter — the philosophy check
- [ ] The myth is struck, never the person
- [ ] The move is concrete: no "a little", "more", or "try to" without saying what
- [ ] The move is safe, free, and under 5 minutes
- [ ] **Mute test:** with sound off, the myth, reframe, and move are clear
- [ ] **Freeze-frame test:** every paused frame has one focal point
- [ ] **Safe-box test:** nothing important outside y 90–470
- [ ] **Device test:** private draft on a real phone, app UI showing
- [ ] Spelling and punctuation correct everywhere on screen
- [ ] The voice echoes the screen text — no new information in audio only
- [ ] End card: disclaimer + "Worth It is a production of The Joy Digi"

Automated (`qa.py`): claim rows have sources and verdicts; disclaimer and
credit present; "illustrative" on growth numbers; no company/product names;
no engagement bait; 1080x1920 H.264, 25–35 s, loudness near -16 LUFS,
true peak at or below -1 dBTP.
