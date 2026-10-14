# Rebrand brief: thejoydigi.com → P7 "Op-Art Swirl" (LOCAL PREVIEW ONLY)

You are working in ~/workspace/joydigi-rebrand/, a fully local copy of the
thejoydigi.com Next.js site (fresh local git repo, branch rebrand-p7-local,
baseline commit already made). The main checkout elsewhere is NOT your concern.

## HARD RULES

- LOCAL ONLY. No git push, no remotes (none exist; do not add any), no PR, no
  deploy, no external publishing of any kind. Commit locally on
  rebrand-p7-local when done.
- Keep ALL content, routes, and functionality identical. No copy changes except
  where the old sparkle mark or old logo appears in web UI.
- Zero em dashes or en dashes in anything you write (code comments, docs, text).
- OUT OF SCOPE, do not touch: src/lib/email/**, scripts/email-*, src/app/og/**
  (social share cards), public/email/**, podcast cover art under
  public/podcasts/**, docs/brand/design-standard.md, and the individual podcast
  show pages' own colour themes (src/pages/podcasts/<show>.tsx palettes and
  the book page's own navy/gold theme in src/pages/books/value-created.tsx).
  The umbrella chrome those pages sit in IS in scope.
- Readability beats novelty in every tie. The logo is the loud element; the
  site frames it. This must still look premium, never a rainbow mess.

## THE NEW BRAND: P7 "Op-Art Swirl"

Psychedelic wordmark: stacked THE / JOY / DIGI in Bungee, JOY in Sun gold and
enlarged, inside a medallion of ~30 concentric spectrum ripples that swirl
outward from behind JOY, on near-black. Horizontal lockups put the medallion
beside the wordmark. Source assets (outlined SVG paths, no live text):

- ~/workspace/joydigi-logo/psych2/svg/psych-7-horizontal-dark.svg
- ~/workspace/joydigi-logo/psych2/svg/psych-7-horizontal-light.svg
- ~/workspace/joydigi-logo/psych2/svg/psych-7-stacked-dark.svg
- ~/workspace/joydigi-logo/psych2/svg/psych-7-stacked-light.svg
- ~/workspace/joydigi-logo/final/thejoydigi-avatar-p7-1080.png (stacked dark, 1080px)
- Bungee TTF + license: ~/workspace/joydigi-logo/psych2/fonts/

### New palette (website tokens)

- Near-black ground: #0B0B0C (the medallion's dark ground; header and footer)
- Soft Sand: #FDF6EC (page ground, unchanged; also the letter colour on dark)
- Ink (primary text on sand, replaces Deep Teal #003B49): #1B140D
  (warm near-black; must hold 4.5:1 on sand, it is about 15:1)
- Sun gold (primary action/accent, replaces Coral #FF6B6B in that role): #FFC94A
  - Gold is for fills, underlines, large display accents. Buttons: gold
    background with near-black text.
  - For SMALL text accents or links on sand, gold fails contrast; use deep
    gold #9A6B00 (about 4.6:1 on sand) instead.
- Spectrum accents, used sparingly (a few signature places only, e.g. a thin
  spectrum gradient rule under the header, hover flourishes, kickers):
  pink #FF2E88, magenta #C8106E, orange #E64A00, green #14A03A,
  cyan #0A86B0, violet #5A189A.
- Muted text on sand: warm gray-brown derived from the ink, e.g. #6B5D4F
  (must stay 4.5:1 on sand).

## WHAT TO BUILD

### 1. Logo placement

- Copy the P7 SVGs into public/brand/ (logo-horizontal-dark.svg,
  logo-horizontal-light.svg, logo-stacked-dark.svg, logo-stacked-light.svg).
- Header (src/components/marketing/site-chrome.tsx, Logo + SiteHeader):
  the header bar becomes near-black #0B0B0C and the logo becomes the P7
  horizontal DARK lockup as an <img> (its baked ground is #0B0B0C, so it sits
  seamlessly). Nav links become sand on near-black; the active/hover underline
  becomes Sun gold; the "Say hi" button becomes gold with near-black text.
  Mobile menu matches. Size the lockup so the wordmark reads clearly at
  header height (about 44 to 52 px tall); keep the home link and aria-label.
- Footer (SiteFooter in the same file): background becomes near-black
  #0B0B0C (from Deep Teal). Add the P7 horizontal dark lockup in the brand
  column (above or below the headline, your judgment, well spaced). Keep the
  "Let's make something joyful." headline; its gold <em> stays gold. Footer
  link hovers go gold. The sand pill button stays sand or becomes gold, your
  call, contrast first.
- Find any other web-UI spot showing the old sparkle mark or the text wordmark
  as a logo (search for the sparkle path, ✦ characters, logo.svg references in
  src/) and update consistently. public/logo.svg is a legacy unrelated file;
  leave the file, but if src references it as the site logo, fix the reference.
- OG default image public/og-the-joy-digi.png: leave it, note it in your
  summary as a follow-up.

### 2. Icons

- public/icon.svg: replace with the P7 stacked dark artwork.
- Regenerate from the stacked art (source:
  ~/workspace/joydigi-logo/final/thejoydigi-avatar-p7-1080.png):
  public/icon-192.png (192), public/icon-512.png (512),
  public/apple-touch-icon.png (180), and public/favicon.ico (16/32/48
  multi-size). Python3 with PIL is available. Keep the near-black ground.
- public/site.webmanifest: theme_color #0B0B0C, background_color #0B0B0C.
- src/pages/_document.tsx: theme-color meta becomes #0B0B0C.

### 3. Theme tokens (follow the codebase's own patterns)

- tailwind.config.ts: evolve the palette: bgDark to near-black, primary
  action colour toward gold/spectrum where the config drives web UI; keep the
  scale structure. Do not break classes used by out-of-scope pages more than
  necessary; the config is shared, so prefer changing token VALUES over
  renaming tokens.
- src/components/landing-art/primitives.tsx: update the exported constants
  (INK, CORAL, SKY, SUN, CREAM, MINT) to the new system: INK #1B140D, the
  coral role becomes Sun gold, keep CREAM as Soft Sand. Components importing
  these should inherit the new look.
- Site-wide sweep for the umbrella hexes in WEB UI code only (src/pages,
  src/components; NOT src/lib/email, NOT src/app/og, NOT show-page own-theme
  files listed out of scope): #003B49 -> new ink or near-black as context
  demands (text on sand -> ink #1B140D; dark section grounds -> #0B0B0C),
  #FF6B6B coral accents -> Sun gold fills or deep gold for small text,
  #4D7580 muted teal -> warm muted #6B5D4F. Use judgment per context; contrast
  rules above are binding. Homepage sections (src/components/home/*,
  landing-art, marketing/kit.tsx) are the priority surface after chrome.
- src/styles/globals.css: body background stays sand family (#FDF6EC or the
  existing #f9f5eb); brand-coloured heading/link/marker colours in
  .blogContainer move from teal/coral to ink/gold per the same rules.

### 4. Type

- Add Bungee in src/components/marketing/fonts.ts via next/font/google
  (variable --font-bungee), following the existing Fraunces/DM Sans pattern.
  If the build cannot fetch Google Fonts in this sandbox, fall back to
  next/font/local with the TTF copied from
  ~/workspace/joydigi-logo/psych2/fonts/ into the repo (include its license).
- Bungee is for big display moments ONLY: the home hero headline, and section
  kickers on home / podcasts index if tasteful. Body and UI stay DM Sans /
  existing stacks. Editorial headings (blog, books) may stay Fraunces.
- Expose a Tailwind utility the codebase way (e.g. extend fontFamily with
  bungee: ["var(--font-bungee)", ...]) so usage is a class, not inline styles.

### 5. Pages that must look right (content unchanged)

- Home (src/pages/index.tsx + home components): hero with Bungee headline,
  new chrome, gold actions, spectrum used at most in 1 or 2 signature spots.
- /podcasts index (src/pages/podcasts/index.tsx): new chrome + token look;
  show cards keep each show's own colours.
- One show page and /books/value-created: inherit chrome only; their own
  themes stay untouched.

## PROCESS

1. npm install (package-lock.json exists; npm ci is fine if it works).
2. Implement the above. Work in small steps; keep the site compiling.
3. npm run build MUST pass. Fix anything you broke (types, lint in build).
4. Commit locally on rebrand-p7-local with a clear message.
5. Final summary to stdout: design tokens chosen, files changed (grouped),
   logo/icon placements, font loading method used, build result, and the
   follow-ups you deliberately left (email frame, OG cards, design-standard
   doc, show themes).
