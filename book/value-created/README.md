# Value, Created — Kindle edition

The book version of the 32-chapter audiobook (`podcast/shows/value-created/`): the dialogue transcripts rewritten as single-narrator prose, with one infographic per chapter, packaged as a validated EPUB 3 for Amazon KDP.

```
transcripts/N.md ──rewrite (STYLE.md)──► manuscript/NN.md ─┐
infographics/NN.json ──tools/infographics.mjs──► PNG ───────┼──► tools/build.mjs ──► out/value-created.epub ──► KDP
public/.../cover-v3.jpg ──tools/cover.mjs──► out/cover.jpg ─┘                         (EPUBCheck)
```

| Path | What |
|---|---|
| `book.json` | Title, subtitle, author, parts (with part intros), metadata |
| `STYLE.md` | How a transcript becomes a chapter, and the infographic schema |
| `manuscript/` | `introduction.md`, `01.md`–`32.md`, `conclusion.md`, `back.md`, `NOTES.md` (facts softened during the rewrite) |
| `infographics/` | `00.json` (the whole book, in the conclusion) and `01.json`–`32.json` |
| `tools/` | `infographics.mjs`, `cover.mjs`, `build.mjs` (EPUB), `print.mjs` + `print-cover.mjs` (paperback), `lib.mjs` (shared Markdown rendering), `lint.mjs`, `examples.json` |
| `kdp-listing.md` | Paste-ready KDP fields: description, keywords, categories, pricing, AI disclosure |
| `out/` | Build output, git-ignored: the EPUB, cover, images, contact sheet |

## Build
```
cd book/value-created
npm install
node tools/infographics.mjs      # out/images/chNN.png + out/images/sheet.png; fails on clipped or too-long text
node tools/cover.mjs             # out/cover.jpg (1600×2560); needs network for Google Fonts (Cinzel, Cormorant Garamond)
node tools/build.mjs             # out/value-created.epub, then EPUBCheck if installed
node tools/print.mjs             # paperback interior: out/print/value-created-interior.pdf (6x9 in, B&W, Paged.js)
node tools/print-cover.mjs       # paperback wraparound cover: out/print/value-created-cover.pdf (spine from page count)
```
EPUBCheck (needs Java): download `epubcheck-5.2.1.zip` from github.com/w3c/epubcheck/releases and unzip it into `out/tools/`.

## Editions
| Edition | Store | Status (2026-10-10) |
|---|---|---|
| Kindle eBook | KDP, $9.99, 70% royalty, not in KDP Select | Live: [B0HMFPCCHK](https://www.amazon.com/dp/B0HMFPCCHK) |
| Paperback | KDP, $14.99, ISBN 9798160611600, 6x9 B&W white, matte | Live: [B0HMFV4457](https://www.amazon.com/dp/B0HMFV4457) |
| Apple Books | Apple Books for Authors | Waiting on Apple account verification + Paid Books Agreement |

The EPUB is store-neutral (no store names in the back matter) so the same file works on Apple Books and other stores.

## Rules kept
- Credited to The Joy Digi, never a personal byline.
- No new facts beyond the transcripts; anything softened is logged in `manuscript/NOTES.md`.
- Infographics: no dollar signs, coins, price tags or financial charts; cream, ink and gold, legible in grayscale on e-ink.
- The cover is uploaded to KDP separately and is not inside the EPUB.
