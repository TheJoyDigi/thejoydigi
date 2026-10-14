const EMAIL = "hello@thejoydigi.com";

const PrivacyPolicyComponent = () => {
  return (
    <div className="legal-prose">
      <h1>Privacy Policy</h1>
      <p>
        <em>Last updated: October 14, 2026</em>
      </p>
      <p>
        The Joy Digi (&quot;The Joy Digi&quot;, &quot;we&quot;, &quot;us&quot;) is where Long La builds joyful things with code and super intelligence
        (SI): products, podcasts, books, and experiments. This policy explains what we collect when you visit thejoydigi.com, listen to our shows,
        or join our email list, and what we do with it. The short version: we collect very little, we never sell it, and you can leave anytime.
      </p>

      <h2>1. What we collect</h2>
      <h3>Information you give us</h3>
      <ul>
        <li>
          <strong>Email list:</strong> when you sign up for The Joy Digi list or a show&apos;s updates, we collect your email address, the show(s)
          you chose, and your first name if you choose to share it.
        </li>
        <li>
          <strong>Messages:</strong> if you email us, we receive your email address and whatever you include in your message.
        </li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li>
          <strong>Analytics:</strong> on the live site we use PostHog, Microsoft Clarity, and Google Analytics to understand how pages are used:
          pages visited, clicks, approximate location (city or country), device and browser type, and referring site. Clarity and PostHog may
          record anonymized sessions (mouse movement, scrolling, clicks) to help us find confusing or broken parts of the site.
        </li>
        <li>
          <strong>Listening progress:</strong> the podcast player remembers where you stopped in an episode. This is saved only in your
          browser&apos;s local storage and is never sent to us.
        </li>
        <li>
          <strong>Cookies and similar tools:</strong> our analytics providers set cookies or local storage entries to recognize returning
          visitors. We do not use advertising cookies.
        </li>
      </ul>

      <h2>2. How we use it</h2>
      <ul>
        <li>To send you the emails you asked for: welcome notes, new episodes and chapters, and news about new shows and books.</li>
        <li>To reply when you write to us.</li>
        <li>To understand what people enjoy and fix what isn&apos;t working on the site.</li>
        <li>To keep the site secure and prevent abuse.</li>
      </ul>
      <p>We do not sell or rent your personal information, and we do not use it for third-party advertising.</p>

      <h2>3. Who we share it with</h2>
      <p>We share information only with the service providers that help us run The Joy Digi, and only for that purpose:</p>
      <ul>
        <li>
          <strong>Resend</strong> stores our email list and delivers our emails.
        </li>
        <li>
          <strong>PostHog, Microsoft Clarity, and Google Analytics</strong> provide site analytics.
        </li>
        <li>
          <strong>Vercel</strong> hosts the website and processes standard server logs.
        </li>
      </ul>
      <p>
        Podcast platforms such as Spotify, Apple Podcasts, and YouTube, and stores such as Amazon, have their own privacy policies that apply
        when you use them. We may also disclose information if the law requires it.
      </p>

      <h2>4. Your choices</h2>
      <ul>
        <li>
          <strong>Unsubscribe:</strong> every email has an unsubscribe link, or you can email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </li>
        <li>
          <strong>Opt out of analytics:</strong> visit any page with <code>?notrack=1</code> added to the address (for example{" "}
          {/* Full page load on purpose: analytics reads ?notrack only on startup. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/?notrack=1">thejoydigi.com/?notrack=1</a>) to stop PostHog tracking in that browser. You can also block cookies in your
          browser settings or use a tracking blocker.
        </li>
        <li>
          <strong>Access or delete your data:</strong> email us and we will tell you what we hold about you, correct it, or delete it.
        </li>
      </ul>

      <h2>5. California residents</h2>
      <p>
        If you live in California, you have the right to know what personal information we collect, to ask us to delete it, to correct it, and
        not to be discriminated against for using these rights. We do not sell or share personal information for cross-context behavioral
        advertising. To make a request, email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>

      <h2>6. How long we keep it</h2>
      <p>
        We keep your email address until you unsubscribe or ask us to delete it. Analytics data is kept according to each provider&apos;s
        retention settings. Messages you send us are kept as long as needed to respond and follow up.
      </p>

      <h2>7. Security</h2>
      <p>
        We use reputable providers and reasonable safeguards to protect your information, but no method of storage or transmission over the
        internet is completely secure.
      </p>

      <h2>8. Children</h2>
      <p>
        The Joy Digi is not directed to children under 13, and we do not knowingly collect personal information from them. If you believe a
        child has given us their information, email us and we will delete it.
      </p>

      <h2>9. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. When we do, we will change the date at the top of this page. If a change is significant,
        we will let email subscribers know.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about this policy or your information? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicyComponent;
