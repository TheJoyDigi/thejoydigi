import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function TikTokTokensPage() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (router.isReady) {
      const { access_token, refresh_token, error } = router.query;

      if (error) {
        setMessage(`Error: ${error}`);
        return;
      }

      if (access_token && typeof access_token === 'string') {
        setAccessToken(access_token);
      } else {
        if (!error) setMessage(prev => prev + 'Access token not found. ');
      }

      if (refresh_token && typeof refresh_token === 'string') {
        setRefreshToken(refresh_token);
      } else {
         if (!error) setMessage(prev => prev + 'Refresh token not found.');
      }
    }
  }, [router.isReady, router.query]);

  const copyToClipboard = (text: string, tokenName: string) => {
    if (!navigator.clipboard) {
      setMessage('Clipboard API not available. Please copy manually.');
      return;
    }
    navigator.clipboard.writeText(text)
      .then(() => setMessage(`${tokenName} copied to clipboard!`))
      .catch(err => {
        console.error('Failed to copy text: ', err);
        setMessage(`Failed to copy ${tokenName}. Please copy manually.`);
      });
  };

  return (
    <>
      <Head>
        <title>TikTok Tokens</title>
        <meta name="description" content="Display TikTok Access and Refresh Tokens" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px' }}>
        <h1>TikTok Tokens</h1>
        {message && <p style={{ color: message.startsWith('Error') || message.startsWith('Failed') ? 'red' : 'green' }}>{message}</p>}

        {accessToken && (
          <div style={{ margin: '10px 0', width: '100%', maxWidth: '600px' }}>
            <h2>Access Token</h2>
            <textarea
              readOnly
              value={accessToken}
              rows={5}
              style={{ width: '100%', padding: '10px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'monospace' }}
            />
            <button 
              onClick={() => copyToClipboard(accessToken, 'Access Token')}
              style={{ padding: '8px 15px', cursor: 'pointer' }}
            >
              Copy Access Token
            </button>
          </div>
        )}

        {refreshToken && (
          <div style={{ margin: '10px 0', width: '100%', maxWidth: '600px' }}>
            <h2>Refresh Token</h2>
            <textarea
              readOnly
              value={refreshToken}
              rows={5}
              style={{ width: '100%', padding: '10px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'monospace' }}
            />
            <button 
              onClick={() => copyToClipboard(refreshToken, 'Refresh Token')}
              style={{ padding: '8px 15px', cursor: 'pointer' }}
            >
              Copy Refresh Token
            </button>
          </div>
        )}

        {!accessToken && !refreshToken && !router.query.error && (
          <p>Loading tokens or no tokens provided...</p>
        )}

        <p style={{ marginTop: '20px', fontSize: '0.9em', color: '#555', textAlign: 'center' }}>
          <strong>Security Reminder:</strong> These tokens grant access to your TikTok account.
          Do not share them. For production applications, tokens should be stored securely
          and not displayed directly to users in this manner.
        </p>
        <button 
            onClick={() => router.push('/tiktok-auth')}
            style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
        >
            Authorize Again
        </button>
      </div>
    </>
  );
}
