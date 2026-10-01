import Head from 'next/head';
import Link from 'next/link';

export default function UniverseWhisperLandingPage() {
  return (
    <>
      <Head>
        <title>The Universe Whisper - TikTok App</title>
        <meta name="description" content="Post captivating video content directly to your TikTok with The Universe Whisper." />
      </Head>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <main className="text-center space-y-6">
          <h1 className="text-5xl font-bold">The Universe Whisper</h1>
          <p className="text-xl text-gray-300">Post captivating video content directly to your TikTok.</p>
          <p className="text-md text-gray-400 max-w-md mx-auto">
            Connect your TikTok account and let The Universe Whisper share inspiring and
            thought-provoking video content effortlessly.
          </p>
          <Link href="/tiktok-auth" legacyBehavior>
            <a className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
              Connect to TikTok
            </a>
          </Link>
          <div className="mt-8 text-sm text-gray-500 space-x-4">
            <Link href="/universe-whisper-terms" legacyBehavior>
              <a className="hover:text-gray-300">Terms of Service</a>
            </Link>
            <span>|</span>
            <Link href="/universe-whisper-privacy" legacyBehavior>
              <a className="hover:text-gray-300">Privacy Policy</a>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
