# HavenHostKit Quality Audit and Perfection Pass

Mandate (shareholder, 2026-11-21): "The product needs to be perfect and it needs to be valuable."
Scope: flagship welcome book (32 pp), host signs pack (12 pp), turnover checklist (7 pp). Method: every PDF rendered to PNG with pdftoppm and visually inspected (cover, welcome, at-a-glance, kitchen, neighborhood divider, local-guide pages, FAQ, checkout, thank-you, back cover, all sign types, all checklist parts including tables), plus full text extraction to catch leaks and placeholder drift. Grades: BLOCKER = would embarrass the shop or mislead a buyer; SHOULD-FIX = visibly amateur; POLISH = small refinement.

## Headline verdict on v1

V1 was a proof of content, not a product. The words are good; the rendering broke its own design system on almost every page type. Five blockers, any one of which would justify a refund request or a one-star review from a design-conscious host.

## BLOCKERS

1. **The cover headline reads "Cover."** The v1 renderer used the page's section label as the cover title, so the premium full-bleed ink cover (flagship p.1) is headlined with the literal word "Cover" and the actual title, "Welcome to [Property Name]," is demoted to small terracotta body text. First impression of the flagship product is a production artifact.
2. **Internal production text leaks into the turnover checklist.** Checklist p.1 prints the source file's internal "Design bar" production line verbatim, including the full design brief and raw hex color codes on the page itself ("Design bar (if you format this as a printed PDF): US Letter, 0.75 in margins. Fraunces for headings, Inter or DM Sans for body. Ink #1A2E28 text on warm cream #FAF6F0. Terracotta #C67B5C checkboxes, sage #8A9B8E dividers, muted gold #C9A86A small labels."). A buyer is reading our build instructions and color codes, not a checklist. (Independently confirmed by the listing-images build, 2026-11-21.)
3. **Local-guide pages leak "Column 1" and "Column 2" as printed text, and there are no columns.** On flagship pp. 20, 21, 24, 25 (and the pattern repeats), the source's two-column layout markers are printed as body lines and all place cards run in a single left column. The signature pages of the book, the ones hosts buy it for, ignore the two-column card layout the design system specifies.
4. **Checklist tables are raw pipe text.** The restock/par table (checklist Part 2) and the maintenance and lost-and-found logs (Part 4) render as literal markdown: "Bath towels | Linen closet | 2 per guest | [ ] | Below par" with visible pipe characters and a literal "[ ]" instead of a checkbox. Unusable as a printed form.
5. **Wrong fonts throughout, against the listings' own description.** The design system and the (now corrected) listing copy specify Fraunces headings and Inter body. V1 uses Times for headings and Helvetica for body. The generic serif/sans pairing is the single biggest reason v1 looks like a word-processor export instead of a designed product.

## SHOULD-FIX

6. **Stray "***" artifact at the bottom of flagship content pages** (visible pp. 2, 3, 19, 20, 31 and throughout), the rendered remains of the source's horizontal rules.
7. **Hierarchy is inverted on content pages.** The page title (e.g. "A Warm Welcome") is set large while the actual guest-facing headline ("We are so glad you are here") sits as a small line under the rule. The design system intends the headline to be the page title at 30 pt.
8. **None of the specified page furniture exists.** No icons in headers, no sage callout boxes (quick-start steps p.3, WiFi credentials p.4, note of thanks p.7, plumbing warning p.11, fire steps p.17, 911 block p.18), no at-a-glance label/value table (p.3 renders as a plain run-on list with a duplicated intro line), no gold small-caps section labels, no inset gold border on the thank-you page (p.31).
9. **Signs are sparse, top-anchored, and too small to read across a room.** Sign content occupies roughly the top third of a US Letter page at body-text size, leaving about 60 percent of the page blank below. Signs are wall/frame pieces: type must be large, content vertically centered, key values (WiFi password, 911, checkout time) oversized. Sign 8 (pool) center-aligns its bullet list, producing ragged, hard-to-scan lines with hyphen markers; Sign 3 renders checkboxes as literal "[ ]" text characters.
10. **Placeholder styling is inconsistent.** Placeholders appear variously as plain body text, bold, and inside instruction sentences ("[Choose one and delete the other:]", "[Include if applicable:]") with no visual system. A host cannot scan a page and see at a glance what they must fill in. Instruction-to-host text should be visually distinct from guest-facing copy, and fill-in placeholders should share one consistent style.
11. **Checklist header block repeats the leak pattern** and the intro paragraph on checklist p.1 addresses the formatter, not the cleaner. Also the v1 checklist title wraps awkwardly ("Short-Term Rental Turnover and Cleaning / Checklist") at an oversized weight with cramped leading.

## POLISH

12. Page numbers exist (flagship, sage, centered, per spec) but sit very close to the page edge and there is no footer treatment tying pages to the property ([Property Name]) as the design implies.
13. Widow/orphan control is absent: several pages end with a single short line or a dangling "***" (see 6).
14. The welcome letter (p.2) specifies a Fraunces italic sign-off; v1 sets it in Helvetica.
15. The back cover (p.32) in v1 inherits the generic cover treatment rather than the centered contact block with gold rule and "Stay well." line the source specifies.
16. In the signs pack, the footer reads "HavenHostKit - Host Signs Pack" on guest-facing signs. Guests should see the property's name, not our brand; the source design specifies an optional [Property Name] footer.

## Content fixes logged during the audit (applied in v2)

- Flagship p.3: duplicated intro ("The essentials, all in one place" followed by "Everything you are most likely to look for first.") kept once, as the intro line under the headline.
- Flagship p.19: page headline is "Discover [Neighborhood Name]"; v1 had promoted the section title "Welcome to the Neighborhood" to the headline slot. V2 uses the specified headline and treats the page as the neighborhood section divider the layout note calls for (large terracotta numeral, generous white space).
- Checklist p.1: internal design-brief paragraph removed from the printed product (it belongs in the source file only).
- Local-guide pages: "Column 1 / Column 2" markers removed from printed output and implemented as actual columns.
- All "***" separators removed from printed output.
- Placeholder census taken for the personalization guide: the kit uses 300+ distinct bracket strings in raw form, most of them repeated per-card fields in the local guide ([Distance], [Hours], [Short Description], [Favorite Order]). The quick-start guide's checklist consolidates these into fill-once details plus per-place repeating fields, which is how a host actually completes the book.

## V2 rebuild and final assessment (completed 2026-11-21)

**Fonts.** Real Fraunces (Regular, SemiBold, Bold, Italic, SemiBold Italic) and Inter (Regular, Medium, SemiBold, Bold, Italic) downloaded from the Google Fonts distribution (open license) into ~/workspace/.fonts/ and embedded in every v2 PDF; pdffonts confirms embedded subsets of both families in all four files. Build script preserved at publish-package/build_v2.py (fpdf2, fonts from ~/workspace/.pylibs and ~/workspace/.fonts).

**What changed in v2, blocker by blocker**
1. Cover rebuilt to spec: full-bleed ink page, gold-ruled HK monogram, "WELCOME TO" letterspaced gold kicker, the real headline "Welcome to [Property Name]" in Fraunces 41 pt cream in the lower third, gold rule, italic subtitle, terracotta property block. The word "Cover" appears nowhere.
2. Checklist production text deleted from the printed product. Title page now opens with the guest-facing intro and a clean Property / Cleaner / Date / checkout header block.
3. Local-guide pages are real two-column place cards: Fraunces card names, gold small-caps category with distance, hairline rules, group headings on the dinner page, bottom callouts. "Column 1 / Column 2" appear nowhere.
4. All checklist tables are real tables: shaded header rows with gold small-caps labels, hairline row rules, and drawn terracotta checkbox squares in the Count column. Maintenance and lost-and-found logs included.
5. Typography is the specified system throughout: Fraunces headlines at 25 to 27 pt, gold letterspaced kickers naming each section, Inter body at 9.2 to 10.5 pt (auto-fit per page), sage rules, page footers with [Property Name] and page number.
- Also fixed: "***" artifacts gone; headline hierarchy corrected (the guest-facing headline is now the page title); callouts built where the design calls for them (quick-start steps p.3, WiFi panel p.4 and Sign 1, emergency banner p.18); at-a-glance is a proper label/value table with hairlines; thank-you page carries the inset gold border; welcome letter signs off in Fraunces italic; back cover is the specified centered ink contact page ending "STAY WELL."; signs are vertically centered with oversized key values (WiFi credentials in a gold-bordered sage panel at 20 pt Fraunces, "Call 911" at 21 pt terracotta), drawn checkboxes on the checkout sign, left-aligned lists on the pool sign, and the guest-facing footer is now [Property Name], not our brand.
- Page counts verified with pdfinfo, unchanged: flagship 32, signs 12, checklist 7, all US Letter. The new quick-start personalization guide is 2 pages.

**Production-artifact sweep (per the follow-up defect report).** Full text of all four v2 PDFs was extracted and searched for: hex color codes (pattern #[0-9A-Fa-f]{6}), "Design bar", "Design note", "Layout note", "Column 1/2", "***", "Canva", placeholder-production terms (Lorem, TODO, XXX), and em dashes. Result: zero matches on every pattern, in every file. No production or design notes exist anywhere in the v2 renders.

**Samples for shareholder sign-off** (publish-package/samples/, 150 dpi): flagship-cover-01.png, flagship-local-guide-20.png, sign-wifi-01.png, checklist-page-1-1.png, guide-page-1-1.png. They show, in order: the premium ink cover as a buyer first sees it; the two-column local guide with placeholder styling a host will fill; the WiFi sign with its oversized credential panel; the checklist's clean working first page; and the free guide's 30-minute personalization walkthrough.

**Value add shipped.** quick-start-personalization-guide.pdf (2 pp) now goes inside every product: a timed 30-minute personalization path, both fill-in methods (PDF reader vs print and write) stated honestly, and a 38-row placeholder checklist consolidating every bracket in the kit (fill-once details grouped by Property and Host, Access and Arrival, Around the Home, Safety and Local, plus the per-place and per-room repeating fields), each with where it appears and a blank column to write it once. This is the piece that makes a static template feel made for the host's own property and location.

**Remaining known weaknesses, stated honestly**
- No line-icon set yet. The design system specifies a consistent terracotta line icon beside each headline; v2 uses typographic ornaments (a small terracotta diamond on signs, the monogram on the cover) instead. Icons are the single clearest remaining upgrade and need a licensed icon set drawn or sourced, not faked.
- No photography. The design allows one warm photo per major section; v2 is purely typographic. It looks intentional and premium, but a future v3 with real property-style photography would raise perceived value further.
- Dense pages auto-fit down to 9.2 pt body (house rules and FAQ pages). Still comfortably readable in print, but tighter than the 10.5 pt ideal.
- Sign 11 (emergency contacts) runs its contact lines as flowing paragraphs with bold lead-ins rather than a label/value table; scannable, but the least designed page in the signs pack.
- Fraunces and Inter are embedded as static weights; the variable-font optical sizing of the original Fraunces design is not used. At these sizes the difference is invisible in print.
- The placeholder system still asks hosts to find brackets with their PDF reader's search; until a form-field edition exists, the quick-start guide is the bridge, and it is now a good one.
