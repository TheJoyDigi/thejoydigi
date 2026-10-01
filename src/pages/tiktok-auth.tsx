import Head from 'next/head';
import { useEffect, useState } from 'react';

// Ensure you have NEXT_PUBLIC_TIKTOK_CLIENT_KEY and NEXT_PUBLIC_TIKTOK_SCOPES 
// set in your environment (e.g., .env.local file for development).
// Example .env.local:
// NEXT_PUBLIC_TIKTOK_CLIENT_KEY=your_actual_client_key
// NEXT_PUBLIC_TIKTOK_SCOPES=user.info.basic,user.account.type

// Read from environment variables
const TIKTOK_CLIENT_KEY = process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY;
// Read from environment variables with a default fallback
const TIKTOK_SCOPES = process.env.NEXT_PUBLIC_TIKTOK_SCOPES || 'user.info.basic';
// TODO: Ensure this matches the redirect URI configured in your TikTok app
const REDIRECT_URI = 'https://www.thejoydigi.com/api/tiktok/callback';

export default function TikTokAuthPage() {
  const [csrfState, setCsrfState] = useState('');

  useEffect(() => {
    // Generate a random string for CSRF protection
    const randomString = Math.random().toString(36).substring(2);
    setCsrfState(randomString);
    // Store it in localStorage to verify on callback
    localStorage.setItem('tiktok_csrf_state', randomString);
  }, []);

  const handleLogin = () => {
    if (!TIKTOK_CLIENT_KEY || !TIKTOK_SCOPES) {
      alert('TikTok client key or scopes are not configured. Please set NEXT_PUBLIC_TIKTOK_CLIENT_KEY and NEXT_PUBLIC_TIKTOK_SCOPES environment variables.');
      console.error('Missing TikTok environment variables: NEXT_PUBLIC_TIKTOK_CLIENT_KEY or NEXT_PUBLIC_TIKTOK_SCOPES');
      return;
    }

    if (!csrfState) {
      alert('CSRF token not generated yet. Please wait a moment and try again.');
      return;
    }

    let url = 'https://www.tiktok.com/v2/auth/authorize/';
    url += `?client_key=${TIKTOK_CLIENT_KEY}`;
    url += `&scope=${TIKTOK_SCOPES}`;
    url += '&response_type=code';
    url += `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    url += `&state=${csrfState}`;
    // Optional: Set to 1 to always show the authorization page, even if the user is already logged in
    // url += '&disable_auto_auth=1';

    window.location.href = url;
  };

  return (
    <>
      <Head>
        <title>TikTok Authorization</title>
        <meta name="description" content="Authorize TikTok to get access tokens" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <h1>Authorize with TikTok</h1>
        <p>Click the button below to authorize our application with your TikTok account.</p>
        <button 
          onClick={handleLogin} 
          disabled={!csrfState}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Continue with TikTok
        </button>
        {!csrfState && <p style={{color: 'red', marginTop: '10px'}}>Generating security token...</p>}
      </div>
    </>
  );
}
