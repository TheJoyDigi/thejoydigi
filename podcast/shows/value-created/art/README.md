# Value, Created — art

Generated with Codex image generation from `originals/codex-brief.md` (edit the brief and re-run to iterate).

| File | Use |
|---|---|
| `../../../../public/podcasts/value-created/cover-v2.jpg` | Live podcast cover (3000x3000 JPEG, upscaled from `originals/cover-codex-1254.png`) |
| `youtube-banner-2560x1440.png` | YouTube channel banner, artwork shrunk and recentred to sit inside the safe area |
| `originals/youtube-banner-upscaled-unadjusted.png` | Plain 2560x1440 upscale of Codex's output (artwork sits low; its ripples get cropped on phones) |
| `originals/banner-safe-area-check.png` | Banner with the YouTube safe area (1546x423, centred) outlined in green |

## Cover refresh rule
Podcast apps cache artwork by URL. To change a cover, add a NEW filename (`cover-v3.jpg`, ...) and point
the feed's channel `<itunes:image href>` at it; overwriting `cover.jpg` in place will not refresh Apple/Spotify.

## YouTube banner rules
- Upload size 2560x1440, max 6 MB. Only the centred 1546x423 band is guaranteed visible on every device.
- No text on purpose: overlay the channel name in the safe area.

## Palette
Navy `#0C1130`, gold `#F2A81D` / `#FFD47E` / `#9A6B1E`, water blue `#57B6D9`, cream `#F4EEDD`.
