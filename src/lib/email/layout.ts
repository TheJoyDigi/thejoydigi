import { JOY, SITE, STUDIO, type ShowTheme } from "./brand";

export type Cta = { label: string; href: string };

export type EmailContent = {
  theme: ShowTheme;
  /** Inbox preview line (~40–90 chars); hidden in the body. */
  preheader: string;
  kicker?: string;
  heading: string;
  /** Plain text, escaped here; `**bold**` for emphasis, `\n` for a line break. */
  paragraphs: string[];
  bullets?: string[];
  primary: Cta;
  secondary?: Cta;
  signoff: string;
  /** Why the reader is receiving this, shown in the footer. */
  reason: string;
};

export type EmailFooter = {
  /** Resend replaces this token with each recipient's hosted unsubscribe link. */
  unsubscribeUrl?: string;
  /** Required for chapter broadcasts; kept optional for existing welcome emails. */
  postalAddress?: string;
};

export const UNSUBSCRIBE_EMAIL = "hello@thejoydigi.com";

export const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const rich = (s: string) => escapeHtml(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>");
const plain = (s: string) => s.replace(/\*\*(.+?)\*\*/g, "$1");

export const unsubscribeHref = (theme: ShowTheme) =>
  `mailto:${UNSUBSCRIBE_EMAIL}?subject=${encodeURIComponent(`Unsubscribe from ${theme.name}`)}`;

/** RFC 8058-style header so Gmail/Apple Mail show a native "Unsubscribe" button. */
export const unsubscribeHeaders = (theme: ShowTheme) => ({ "List-Unsubscribe": `<${unsubscribeHref(theme)}>` });

// Table-based "bulletproof" button: renders as a real button in Outlook, Gmail and Apple Mail.
function button(cta: Cta, bg: string, fg: string, border: string) {
  return `<td class="jd-btn" style="padding:0 12px 12px 0;"><table role="presentation" class="jd-btn-t" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" bgcolor="${bg}" style="border-radius:999px;border:2px solid ${border};">
<a href="${cta.href}" target="_blank" style="display:inline-block;padding:13px 26px;font-family:${JOY.body};font-size:16px;line-height:20px;font-weight:700;color:${fg};text-decoration:none;border-radius:999px;white-space:nowrap;">${escapeHtml(cta.label)}</a>
</td></tr></table></td>`.replace(/\n/g, "");
}

export function renderEmail(c: EmailContent, footer: EmailFooter = {}): { html: string; text: string } {
  const t = c.theme;
  // Studio mail (STUDIO in brand.ts) has no feed and is the umbrella itself, so it skips the RSS box and show credit.
  const isStudio = t.slug === STUDIO.slug;
  const unsubscribeUrl = footer.unsubscribeUrl ?? unsubscribeHref(t);
  const addressHtml = footer.postalAddress
    ? `<p style="margin:8px 0 0;">${escapeHtml(footer.postalAddress)}</p>`
    : "";
  const p = (s: string) => `<p style="margin:0 0 16px;font-family:${JOY.body};font-size:16px;line-height:26px;color:${t.text};">${rich(s)}</p>`;
  const bullets = c.bullets?.length
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px;">${c.bullets
        .map(
          (b) =>
            `<tr><td valign="top" style="padding:0 10px 10px 0;font-family:${JOY.body};font-size:16px;line-height:24px;color:${t.accent};">&#10022;</td><td style="padding:0 0 10px;font-family:${JOY.body};font-size:16px;line-height:24px;color:${t.text};">${rich(b)}</td></tr>`
        )
        .join("")}</table>`
    : "";
  const rss = t.feedUrl
    ? `<tr><td class="jd-pad" style="padding:8px 36px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="${t.subtle}" style="background:${t.subtle};border-radius:12px;padding:14px 16px;font-family:${JOY.body};font-size:13px;line-height:20px;color:${t.muted};">
      Prefer another app? Add this RSS feed to Apple Podcasts, Overcast or Pocket Casts:<br>
      <a href="${t.feedUrl}" target="_blank" style="color:${t.text};word-break:break-all;">${t.feedUrl}</a>
    </td></tr></table>
  </td></tr>`
    : "";
  const joyLink = `<a href="${SITE}" target="_blank" style="color:${JOY.ink};font-weight:700;text-decoration:none;">The Joy Digi</a>`;
  const credit = isStudio
    ? `Every show and book here is a production of ${joyLink}: joyful things made with code and super intelligence (SI).`
    : `${escapeHtml(t.name)} is a production of ${joyLink}: joyful things made with code and super intelligence (SI).`;
  const buttons = `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 12px;"><tr>${button(c.primary, t.accent, t.onAccent, t.accent)}${
    c.secondary ? button(c.secondary, t.card, t.text, t.outline) : ""
  }</tr></table>`;

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${escapeHtml(c.heading)}</title>
<link href="${JOY.fontsHref}" rel="stylesheet">
<style>
  body { margin:0; padding:0; background:${JOY.sand}; }
  a { color:${t.accent}; }
  @media (max-width:620px) { .jd-pad { padding-left:20px !important; padding-right:20px !important; } .jd-h1 { font-size:28px !important; line-height:34px !important; } .jd-btn { display:block !important; width:100% !important; padding-right:0 !important; } .jd-btn-t { width:100% !important; } }
</style>
</head>
<body style="margin:0;padding:0;background:${JOY.sand};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${escapeHtml(c.preheader)}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${JOY.sand}" style="background:${JOY.sand};">
<tr><td align="center" style="padding:28px 12px 36px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">

<tr><td class="jd-pad" style="padding:0 8px 18px;">
  <a href="${SITE}" target="_blank" style="text-decoration:none;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
    <td valign="middle" style="padding-right:8px;"><img src="${JOY.mark}" width="18" height="18" alt="" style="display:block;border:0;"></td>
    <td valign="middle" style="font-family:${JOY.display};font-size:19px;line-height:22px;font-weight:600;color:${JOY.ink};letter-spacing:-0.3px;">The Joy Digi</td>
  </tr></table></a>
</td></tr>

<tr><td bgcolor="${t.card}" style="background:${t.card};border-radius:20px;border:1px solid ${t.outline};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr><td class="jd-pad" style="padding:32px 36px 8px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td valign="middle" style="padding-right:14px;"><img src="${t.cover}" width="64" height="64" alt="${escapeHtml(isStudio ? t.name : `${t.name} cover art`)}" style="display:block;border:0;border-radius:12px;"></td>
      <td valign="middle" style="font-family:${JOY.body};font-size:12px;line-height:16px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:${t.kicker};">${escapeHtml(c.kicker ?? t.name)}</td>
    </tr></table>
  </td></tr>
  <tr><td class="jd-pad" style="padding:20px 36px 4px;">
    <h1 class="jd-h1" style="margin:0 0 18px;font-family:${JOY.display};font-size:34px;line-height:40px;font-weight:600;color:${t.heading};">${escapeHtml(c.heading)}</h1>
    ${c.paragraphs.map(p).join("\n    ")}
    ${bullets}
    ${buttons}
  </td></tr>
  ${rss}
  <tr><td class="jd-pad" style="padding:22px 36px 32px;font-family:${JOY.body};font-size:16px;line-height:24px;color:${t.text};">${rich(c.signoff)}</td></tr>
  </table>
</td></tr>

<tr><td class="jd-pad" align="left" style="padding:24px 8px 0;font-family:${JOY.body};font-size:13px;line-height:20px;color:${JOY.inkSoft};">
  <p style="margin:0 0 8px;">${credit}</p>
  <p style="margin:0 0 8px;"><a href="${SITE}/podcasts" target="_blank" style="color:${JOY.ink};">All Joy Digi shows</a>${isStudio ? "" : ` &nbsp;&middot;&nbsp; <a href="${t.pageUrl}" target="_blank" style="color:${JOY.ink};">${escapeHtml(t.name)} on the web</a>`}</p>
  <p style="margin:0;">${escapeHtml(c.reason)} <a href="${unsubscribeUrl}" style="color:${JOY.ink};">Unsubscribe</a>.</p>
  ${addressHtml}
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    isStudio ? "THE JOY DIGI" : `THE JOY DIGI · ${t.name.toUpperCase()}`,
    "",
    c.heading,
    "",
    ...c.paragraphs.map(plain).flatMap((s) => [s, ""]),
    ...(c.bullets?.length ? [...c.bullets.map((b) => `* ${plain(b)}`), ""] : []),
    `${c.primary.label}: ${c.primary.href}`,
    ...(c.secondary ? [`${c.secondary.label}: ${c.secondary.href}`] : []),
    ...(t.feedUrl ? [`RSS feed: ${t.feedUrl}`] : []),
    "",
    plain(c.signoff),
    "",
    "--",
    isStudio ? `Every show and book here is a production of The Joy Digi (${SITE}).` : `${t.name} is a production of The Joy Digi (${SITE}).`,
    footer.unsubscribeUrl
      ? `${c.reason} Unsubscribe: ${footer.unsubscribeUrl}`
      : `${c.reason} Unsubscribe: email ${UNSUBSCRIBE_EMAIL} with the subject "Unsubscribe from ${t.name}".`,
    ...(footer.postalAddress ? [footer.postalAddress] : []),
  ].join("\n");

  return { html, text };
}
