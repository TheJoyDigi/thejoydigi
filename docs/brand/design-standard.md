# The Joy Digi — Design Standard

Every show is a production **of** The Joy Digi. The umbrella is always present and always the same; a show's own look lives *inside* it and never replaces it.

```
┌─ The Joy Digi frame (never changes) ───────────────┐
│ ✦ The Joy Digi                        ← wordmark    │
│ ┌─ Show card (the show owns this) ───────────────┐ │
│ │ [cover] SHOW KICKER                             │ │
│ │ Heading · body · bullets · CTAs · RSS · signoff │ │
│ └─────────────────────────────────────────────────┘ │
│ "<Show> is a production of The Joy Digi" · links    │
│ why you got this · Unsubscribe                      │
└─────────────────────────────────────────────────────┘
```

Code source of truth: `src/lib/email/brand.ts` (tokens) and `src/lib/email/layout.ts` (the frame). If this doc and the code disagree, fix one to match the other in the same PR.

## 1. Umbrella brand (The Joy Digi)

| Token | Hex | Use |
|---|---|---|
| Deep Teal (ink) | `#003B49` | Wordmark, primary text, links on sand, site buttons |
| Soft Sand | `#FDF6EC` | Canvas / page and email background |
| Coral | `#FF6B6B` | The ✦ mark, accents, active states |
| Sun | `#FFC94A` | Highlight accent (site footer emphasis) |
| Sky | `#4ABEFF` | Optional fresh accent, glows |
| Mint | `#7EE0C3` | Optional accent (site illustrations) |
| Ink Soft | `#4D7580` | Secondary text on sand (4.69:1, the lightest allowed) |

- **Type:** Fraunces (display, headings, wordmark) + DM Sans (body, UI). Email fallbacks: Georgia and Helvetica/Arial.
- **Mark:** the four-point coral sparkle ✦ (email PNG at `public/email/joydigi-mark.png`). Always paired with the "The Joy Digi" wordmark in Deep Teal.
- **App/web icon:** the coral ✦ with a small Sun sparkle on a Deep Teal rounded tile (`public/icon.svg`, the source; `favicon.ico`, `apple-touch-icon.png` and `icon-192/512.png` are rendered from it). The one place the mark appears without the wordmark.
- **Voice:** warm, clear, a little playful, never corporate. "Let's make something joyful." Plain words, short sentences, no hype.
- **Credit line:** "Produced by The Joy Digi" or "<Show> is a production of The Joy Digi". Never "written by Long La" on show material (standing rule, 2026-09-26).

## 2. Show sub-brands

A show owns: card colours, its cover art, its kicker, its heading/CTA wording and tone. A show never changes: the frame, the type families, the layout skeleton, the footer. (Exceptions: Incentives, Decoded uses Bricolage Grotesque + Space Mono on its web pages only; The OC Pack uses Titan One + Nunito on its web pages and social kit (`docs/brand/social/oc-pack/README.md`). Both shows' emails and OG cards stay on Fraunces + DM Sans.)

| Show | Card | Text | Heading | Accent (button) | On accent | Tone |
|---|---|---|---|---|---|---|
| Value, Created | `#0C1130` | `#F4EEDD` | `#FFD47E` | `#F2A81D` | `#0C1130` | Timeless hardcover, quietly luxurious |
| Money, Mastered | `#060E1A` | `#EFE6D2` | `#F3DE9E` | `#D9B56A` | `#060E1A` | Classic, confident course |
| The OC Pack | `#FFF4DA` | `#6B3410` | `#6B3410` | `#B8431F` | `#FFFFFF` | Sunny, friendly, local, emoji welcome |
| Anthropic Blogcast | `#101418` | `#F4EFE6` | `#F4EFE6` | `#E2725B` | `#101418` | Smart, warm tech-editorial, independent |
| Incentives, Decoded | `#5B3DF5` | `#FFFFFF` | `#D4FF3A` | `#D4FF3A` | `#0E0D12` | Playful game zine for younger listeners: chunky ink outlines, hard shadows, sticker game pieces |
| The Joy Digi (studio) | `#003B49` | `#FDF6EC` | `#FDF6EC` | `#FFC94A` | `#003B49` | Warm, plain-spoken studio voice; for mail that isn't about one show |

Full token sets (muted, kicker, outline, subtle) live in `THEMES` (and `STUDIO` for the studio) in `brand.ts`.

**Note:** OC Pack's web accent is `#FC7F46`/`#FF6F61`. In email it's `#B8431F` because the brighter orange fails contrast for 16px button text (3.5:1). Keep the brighter orange for large display art only.

**Incentives, Decoded:** web uses Bricolage Grotesque + Space Mono, ink `#0E0D12` outlines with hard offset shadows, and accents Pink `#FF5CA8`, Cyan `#4FE0E8`, Orange `#FF8A3D` for level tiles. Chapters are called "levels" on the site and in emails after first mentioning "32 chapters"; feed titles stay "Chapter N". Lime text only on violet or ink (it fails on paper).

**Anthropic Blogcast:** never use Anthropic's or Claude's logo, wordmark, starburst or mascot. Always say it's independent and not affiliated.

**Platform marks (Spotify, YouTube):** official glyphs only (`react-icons/si`), full colour, at least 21px, never redrawn. Show pages use `PlatformLinks` in `src/components/podcast/common.tsx`.

## 3. Email rules

### Structure (enforced by `renderEmail`)
1. Hidden preheader (40–90 chars) that adds to the subject, not repeats it.
2. Umbrella header: ✦ + "The Joy Digi", linking to the site.
3. Show card: cover (64px, rounded) + kicker, one H1, 1–3 short paragraphs, optional ✦ bullets (≤5), a primary CTA and at most one secondary, RSS box (skipped for studio mail, which has no feed), signoff from "Alex & Jordan".
4. Umbrella footer: production credit, "All Joy Digi shows" + show page links, why they got it, visible **Unsubscribe**.

### Hard requirements (checked by `node scripts/email-brand-check.cjs`)
- **Contrast (WCAG AA):** 4.5:1 for all text under 18.66px bold, including button labels, kicker, muted and footer text. 3:1 for the 34px heading and for outline-button borders.
- 600px max width, table layout, inline styles only; no `<script>`, no web fonts required to read it.
- Every `<img>` has `alt`, and every image is absolute `https://` (served from `public/email/`, not full-size covers).
- Links are `https://` or `mailto:` only. Every email has a plain-text part.
- Unsubscribe: visible footer link plus a `List-Unsubscribe` header (`unsubscribeHeaders()`).
- User input (names) is always HTML-escaped: pass it raw to the template, never pre-build HTML.
- HTML stays well under Gmail's ~102 KB clip limit (target < 90 KB; current ~7 KB).
- Sender is `"<Show name> <hello@thejoydigi.com>"`.

### Content
- One idea per email, one primary action. Subject ≤ 50 chars.
- Write like a person: "Hi Sam," not "Dear Subscriber". A signoff, not a signature block.
- Numbers and claims match the show's feed and page (chapter counts, cadence). Don't promise what the show doesn't do.
- No money clichés on Value, Created / Money, Mastered (no $ signs, coins or charts in imagery).

### Chapter broadcast launch gate
- **Postal address:** CAN-SPAM requires a physical postal address in commercial email. Set `NEWSLETTER_POSTAL_ADDRESS` to a street address or PO Box before enabling chapter broadcasts; `layout.ts` includes it in the footer.
- **Unsubscribe:** chapter broadcasts use Resend's hosted unsubscribe link; welcome emails still use the existing mailto unsubscribe.

## 4. Social share cards

- Every show page and episode page has a 1200×630 share card (`og:image`), built at deploy by `src/app/og/podcasts/[show]/[card]/route.tsx` at `/og/podcasts/<slug>/show.png` and `/og/podcasts/<slug>/<n>.png`.
- Colours come from the show's `THEMES` entry; Fraunces for the title, DM Sans for everything else.
- Every card carries the credit "Produced by The Joy Digi". Anthropic Blogcast cards add "Not affiliated with Anthropic".
- A new show needs a `THEMES` entry before it gets cards.
- Show social kits (profile art, banners, post templates) live in `docs/brand/social/<show>/`. The OC Pack's is the first.
- Known exception: the existing Money, Mastered cover art shows coins and banknotes, and the cards show it. Swap the cover, not the card, if that changes.

## 5. Adding a new show or email

1. Add the show to `THEMES` in `brand.ts`. Start from its web palette, then adjust until the brand check passes.
2. Add a 240×240 cover to `public/email/<slug>-cover.jpg` (from the live feed cover).
3. There is one welcome email for the whole Joy Digi list (`welcome.ts`, studio theme `STUDIO` in `brand.ts`: no RSS box, footer credit "Every show and book here is a production of The Joy Digi", cover is the site icon at `public/email/joy-digi-cover.png`). If the show has a signup form, add its one-line interest note and secondary button there. Other show mail gets a builder that calls `renderEmail`. Never hand-write a new HTML shell.
4. Run `node scripts/email-brand-check.cjs` (must pass) and `node scripts/email-preview.cjs`, then look at the previews at 600px and 375px.
5. Ask the **joydigi-design** agent (`.claude/agents/joydigi-design.md`) to review before merging.
