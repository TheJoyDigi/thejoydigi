import Link from "next/link";
import React from "react";

const EMAIL = "hello@thejoydigi.com";

const TermsOfUseComponent: React.FC = () => {
  return (
    <div className="legal-prose">
      <h1>Terms of Use</h1>
      <p>
        <em>Last updated: October 14, 2026</em>
      </p>
      <p>
        Welcome to The Joy Digi. These terms apply to thejoydigi.com and to the podcasts, books, emails, and experiments we publish there
        (together, &quot;The Joy Digi&quot;). By using The Joy Digi, you agree to these terms. If you do not agree, please do not use it.
      </p>

      <h2>1. What The Joy Digi is</h2>
      <p>
        The Joy Digi is where Long La builds joyful things with code and super intelligence (SI): products, podcasts, books, and experiments.
        Most of what we publish is free to read, watch, or listen to. Books are sold through third-party stores such as Amazon, and those
        purchases are governed by the store&apos;s own terms.
      </p>

      <h2>2. Information, not advice</h2>
      <p>
        Our podcasts, books, and articles are for education and entertainment. Shows such as <em>Money, Mastered</em> and{" "}
        <em>Value, Created</em> discuss money, investing, and business, and <em>The OC Pack</em> discusses pet care, but nothing we publish is
        financial, investment, legal, tax, veterinary, or medical advice. Talk to a qualified professional about your own situation. Local
        details such as events, prices, and opening hours can change, so confirm them with the source before you rely on them.
      </p>

      <h2>3. How we make things</h2>
      <p>
        We build with super intelligence tools. Some of our shows use synthesized voices, and some writing, images, and code are created with
        SI assistance and then reviewed by a person. We work to keep everything accurate and fact-checked, but mistakes can happen. If you spot
        one, please tell us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>

      <h2>4. Independent shows</h2>
      <p>
        Some shows talk about other companies and their products. <em>Anthropic Blogcast</em>, for example, is an independent show and is not
        affiliated with, endorsed by, or sponsored by Anthropic. Third-party names and trademarks belong to their owners.
      </p>

      <h2>5. Using The Joy Digi</h2>
      <p>You are welcome to read, listen, share links, and quote short excerpts with credit to The Joy Digi. Please do not:</p>
      <ul>
        <li>copy, republish, or resell our episodes, books, artwork, or other content without permission;</li>
        <li>attempt to break, overload, scrape at scale, or gain unauthorized access to the site or its services;</li>
        <li>sign up other people for our emails without their consent, or use our forms to send spam;</li>
        <li>use The Joy Digi for anything unlawful.</li>
      </ul>

      <h2>6. Our content</h2>
      <p>
        The Joy Digi name, logo, artwork, episodes, books, and site content are owned by The Joy Digi unless noted otherwise, and are protected
        by copyright and trademark law. Podcast feeds are provided for personal listening in podcast apps.
      </p>

      <h2>7. Emails</h2>
      <p>
        If you join our email list, we will send you the updates you signed up for. You can unsubscribe at any time using the link in any
        email. How we handle your email address is described in our <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2>8. Links to other sites</h2>
      <p>
        We link to other sites and platforms, such as Spotify, YouTube, Apple Podcasts, and Amazon. We are not responsible for their content,
        products, or policies.
      </p>

      <h2>9. No warranty</h2>
      <p>
        The Joy Digi is provided &quot;as is&quot; and &quot;as available&quot;. We do not promise that it will always be available, error free,
        or complete.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, The Joy Digi is not liable for any indirect, incidental, or consequential damages, or for any
        loss arising from your use of The Joy Digi or your reliance on anything we publish.
      </p>

      <h2>11. Changes</h2>
      <p>
        We may update these terms from time to time and will change the date at the top of this page when we do. Continuing to use The Joy Digi
        after a change means you accept the updated terms.
      </p>

      <h2>12. Governing law</h2>
      <p>These terms are governed by the laws of the State of California, United States.</p>

      <h2>13. Contact</h2>
      <p>
        Questions about these terms? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    </div>
  );
};

export default TermsOfUseComponent;
