import Head from "next/head";
import Link from "next/link";

export default function UniverseWhisperTermsPage() {
  const lastUpdatedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Head>
        <title>The Universe Whisper - Terms of Service</title>
        <meta
          name="description"
          content="Terms of Service for The Universe Whisper TikTok App."
        />
      </Head>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
        <main className="max-w-4xl w-full bg-gray-800 p-8 rounded-lg shadow-xl">
          <h1 className="text-4xl font-bold mb-6 text-purple-400 text-center">
            The Universe Whisper - Terms of Service
          </h1>

          <p className="mb-4 text-gray-300">
            Welcome to The Universe Whisper! These Terms of Service ("Terms")
            govern your use of The Universe Whisper TikTok App (the "App"),
            which is operated by The Universe Whisper ("we", "us", or "our"). By
            accessing or using the App, you agree to be bound by these Terms. If
            you do not agree to these Terms, please do not use the App.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2 text-purple-300">
            1. Acceptance of Terms
          </h2>
          <p className="mb-4 text-gray-300">
            By accessing or using the App, you confirm that you are at least 13
            years old and have the legal capacity to enter into these Terms. If
            you are using the App on behalf of an organization, you represent
            that you have the authority to bind that organization to these
            Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2 text-purple-300">
            2. Description of Service
          </h2>
          <p className="mb-4 text-gray-300">
            The App provides features that integrate with TikTok, including but
            not limited to content discovery, interest management, and
            personalized recommendations. The App may require access to your
            TikTok account and certain permissions as described in our Privacy
            Policy.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2 text-purple-300">
            3. User Accounts & Eligibility
          </h2>
          <p className="mb-4 text-gray-300">
            You may be required to authenticate with TikTok to use certain
            features. You are responsible for maintaining the confidentiality of
            your account credentials and for all activities that occur under
            your account.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2 text-purple-300">
            4. User Content & Conduct
          </h2>
          <p className="mb-4 text-gray-300">
            You are solely responsible for any content you submit, share, or
            display through the App. You agree not to use the App for any
            unlawful, harmful, or abusive purposes, and to comply with all
            applicable laws and TikTok's terms of service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2 text-purple-300">
            5. TikTok Integration & Data Usage
          </h2>
          <p className="mb-4 text-gray-300">
            The App uses TikTok's API to access certain information from your
            TikTok account, such as your profile, videos, and interests. We only
            access, use, and store your data as described in our{" "}
            <Link
              href="/universe-whisper-privacy"
              className="underline text-purple-200"
            >
              Privacy Policy
            </Link>
            . We do not sell or share your TikTok data with third parties except
            as required to provide the App's functionality or as required by
            law.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2 text-purple-300">
            6. Intellectual Property
          </h2>
          <p className="mb-4 text-gray-300">
            All content, features, and functionality of the App (excluding
            TikTok content) are the exclusive property of The Universe Whisper
            or its licensors. TikTok trademarks and content are the property of
            TikTok and its respective owners.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2 text-purple-300">
            7. Disclaimers & Limitation of Liability
          </h2>
          <p className="mb-4 text-gray-300">
            The App is provided on an "AS IS" and "AS AVAILABLE" basis. We make
            no warranties, express or implied, regarding the App's operation or
            availability. To the fullest extent permitted by law, we disclaim
            all liability for any damages arising from your use of the App or
            TikTok integration.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2 text-purple-300">
            8. Termination
          </h2>
          <p className="mb-4 text-gray-300">
            We reserve the right to suspend or terminate your access to the App
            at any time, with or without notice, for any reason, including
            violation of these Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2 text-purple-300">
            9. Changes to Terms
          </h2>
          <p className="mb-4 text-gray-300">
            We may update these Terms from time to time. We will notify you of
            any material changes by updating the "Last Updated" date below. Your
            continued use of the App after changes are posted constitutes your
            acceptance of the new Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2 text-purple-300">
            10. Contact Information
          </h2>
          <p className="mb-4 text-gray-300">
            If you have any questions about these Terms, please contact us at{" "}
            <a
              href="mailto:support@thejoydigi.com"
              className="underline text-purple-200"
            >
              support@thejoydigi.com
            </a>
            .
          </p>

          <div className="mt-8 text-sm text-gray-500">
            <p>Last Updated: {lastUpdatedDate}</p>
          </div>

          <div className="mt-10 text-center">
            <Link href="/universe-whisper" legacyBehavior>
              <a className="text-purple-400 hover:text-purple-300 text-lg font-semibold">
                &larr; Back to The Universe Whisper
              </a>
            </Link>
          </div>
        </main>
        <footer className="w-full max-w-4xl text-center mt-8 text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} The Universe Whisper. All rights
            reserved.
          </p>
          <div className="mt-2 space-x-4">
            <Link href="/universe-whisper-terms" legacyBehavior>
              <a className="hover:text-gray-300">Terms of Service</a>
            </Link>
            <span>|</span>
            <Link href="/universe-whisper-privacy" legacyBehavior>
              <a className="hover:text-gray-300">Privacy Policy</a>
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
}
