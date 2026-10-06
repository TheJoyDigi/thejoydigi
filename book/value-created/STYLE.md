# Value, Created — book style guide

The Kindle edition turns the 32 audiobook transcripts (`public/podcasts/value-created/transcripts/N.md`, a two-host dialogue between Alex and Jordan) into a single-voice nonfiction book. `manuscript/01.md` is the reference chapter: match its voice, structure and length.

## Voice
- One warm, clear narrator speaking to "you". Use "we" sparingly, for things the reader and narrator do together ("Let's go back to the riddle").
- Plain words, short sentences, concrete examples. A little playful, never hype. No business jargon the transcript doesn't explain.
- Natural contractions (it's, you're, don't). The transcripts avoid them for text-to-speech; the book should not.
- Numbers as a reader expects them: "1776", "1 percent", "ten slices". Spell out one to nine in running prose; use numerals for years, percentages and 10+ (except at a sentence start).
- American English. Curly quotes and real em dashes (—) are fine; use em dashes sparingly (at most 2–3 per chapter).

## What to keep, cut and add
- **Keep** every idea, story, example, analogy and objection the chapter makes. The book may be tighter than the audio, never thinner.
- **Cut** podcast scaffolding: host names (Alex, Jordan), "welcome to", "I am", "this is chapter N", "thanks for listening", "next time", "somebody listening might think", sponsor-style credits ("produced by The Joy Digi"), and the back-and-forth "Exactly!" / "Right." filler. Merge points the two hosts split between them into single paragraphs.
- **Replace** listener framing with reader framing ("somebody listening might think" → "You might be thinking").
- **Add** only connective tissue: transitions, a sharper heading, a clearer sentence order. You may add one short "Try this" exercise drawn directly from the chapter's own advice.
- **Never add** new facts: no new statistics, dates, studies, quotes, names, companies or historical claims that aren't in the transcript. If the transcript states a fact loosely or wrongly, soften it to what's well established (e.g. "made famous by Adam Smith") and record the change in `manuscript/NOTES.md` under the chapter number.
- No real private people, no author byline. The book is credited to The Joy Digi; never write "Long" or "Long La". Don't mention Nextdoor or The Blue Sock.
- Cross-references to *Money, Mastered* stay (it's the companion book).

## Chapter structure (Markdown)
```
# What Value Actually Means            ← chapter title from the curriculum, exactly

Opening hook paragraphs (no heading): the chapter's riddle or story.

## A short section heading                ← 3 to 5 H2 sections, 2–6 words each, sentence case
Body paragraphs.

> One pull quote: the chapter's single most quotable line, verbatim from your prose.

{{infographic}}                            ← exactly once, where the picture best lands (usually after the core idea)

## The takeaways                           ← always this heading, always last but one
1. **Bold lead sentence.** One or two sentences of explanation.
2. ...
3. ...                                    ← the transcript's own wrap-up points, 3 of them (or as many as it gives)

## Try this                                ← optional, 1 short paragraph or a 2–4 item list

A single closing paragraph that bridges into the next chapter by idea, not by "next time". The last chapter ends on the book's final line instead.
```
- Allowed Markdown only: `#`, `##`, paragraphs, `**bold**`, `*italic*`, numbered and bulleted lists, one `>` pull quote, the `{{infographic}}` marker. No tables, no images, no links, no HTML, no `###`.
- Do not write "Chapter N" in the file: the build adds the chapter number and part openers.
- Length: the transcript's word count ±20% (chapters run about 900–2,100 words). Never pad a short transcript.

## Infographic (`infographics/NN.json`)
One per chapter. It should teach the chapter's core idea on its own, at a glance, in grayscale (Kindle e-ink). Render with `node tools/infographics.mjs NN`; the command fails on text that is too long or clipped. Look at the PNG in `out/images/chNN.png` before you call it done. See `tools/examples.json` for one example of every type.

Common fields: `type`, `title` (≤44 chars), optional `subtitle` (≤90), `takeaway` (≤80, the line under the gold rule), optional `highlight` (index of the key item, 0-based). Item `label` ≤26 chars, `note` ≤70 chars. Keep notes short: aim for ≤45 characters.

| type | Use for | Fields |
|---|---|---|
| `equation` | Ingredients that combine into a result | `terms` [2–4 {label, note}], `ops` (e.g. ["+","×"]), `result` {label, note} |
| `flow` | A process or sequence | `steps` [3–5 {label, note}], `highlight` |
| `ladder` | Levels that build on each other (first item = bottom step) | `steps` [3–5], `highlight` |
| `compare` | Two ideas contrasted point by point | `left`, `right` (≤22), `rows` [3–5 pairs of strings ≤46] |
| `cycle` | A loop or flywheel | `nodes` [3–5], `center` (≤18), `highlight` |
| `bars` | Relative amounts that are not money (values −100…100) | `bars` [3–7 {label ≤16, value, note ≤32}], `axis` (≤30), `highlight` |
| `matrix` | Two dimensions, four cases | `x` and `y` {label, low, high}, `quadrants` {tl, tr, bl, br: {label, note}}, `highlight` ("tr") |
| `grid` | 3–5 parallel ideas | `items` [3–5], `highlight` |

Rules: no dollar signs, coins, price tags or financial charts (brand rule for Value, Created). Wording comes from the chapter. Vary the type across a part; don't use one type for every chapter.

## Checklist before a chapter is done
- [ ] Every idea in the transcript is present; nothing new is invented.
- [ ] No host names, no podcast phrasing, no "Long".
- [ ] Structure and Markdown subset as above; exactly one `{{infographic}}` and one `>` quote.
- [ ] `node tools/infographics.mjs NN` passes and the PNG reads well.
- [ ] Any fact you softened is logged in `manuscript/NOTES.md`.
