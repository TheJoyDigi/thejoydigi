# Anthropic Blogcast — art

Generated with Codex image generation from `codex-brief.md` (edit the brief and re-run to iterate).

| File | Use |
|---|---|
| `../../../../public/podcasts/anthropic-blogcast/cover.jpg` | Live podcast cover (3000x3000 JPEG, upscaled from `originals/cover-codex-1254.png`) |
| `youtube-banner-2560x1440.png` | YouTube channel banner (upscaled from `originals/youtube-banner-codex-1672x941.png`) |
| `originals/banner-safe-area-check.png` | Banner with the YouTube safe area (1546x423, centred) outlined in green |

## YouTube banner rules
- Upload size 2560x1440, max 6 MB. Only the centred 1546x423 band is guaranteed visible on every device.
- The banner has no text on purpose: overlay the channel name in the safe area.
- No Anthropic/Claude logo, wordmark, starburst or mascot — this is an independent show.

## Palette
Ink `#101418`, Paper `#F4EFE6`, Coral `#E2725B`, Amber `#E9B44C` (same as `src/pages/podcasts/anthropic-blogcast.tsx`).

## Cover refresh rule
Podcast apps cache artwork by URL. The live cover is `public/podcasts/anthropic-blogcast/cover-v2.jpg`
(the feed points there). To change it again, add a NEW filename and update the feed's `<itunes:image href>`;
overwriting a file in place will not refresh Apple/Spotify.
