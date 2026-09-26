import Head from 'next/head';
import React, { useEffect, useState } from 'react';

interface Video {
  id: string;
  videoUrl: string;
  title?: string;
}

interface TikTokVideosData {
  videos: Video[];
  metadata: {
    total: number;
    bucketName: string;
    baseUrl: string;
    generatedAt: string;
  };
}

const TikTokContentPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [dialogStep, setDialogStep] = useState<'confirm' | 'success'>('confirm');
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

  const handleShareClick = (video: Video) => {
    setSelectedVideoUrl(video.videoUrl); // Optional, for context if needed
    setDialogStep('confirm'); // Start with confirmation step
    setShowDialog(true);
  };

  const handleConfirmShare = () => {
    setDialogStep('success'); // Move to success step
    // In a real app, actual sharing logic would go here BEFORE setting success
  };

  const handleCancelShare = () => {
    setShowDialog(false); // Close dialog
    setSelectedVideoUrl(null); // Clear selected video
  };

  const closeDialog = () => { // Used by success step and potentially cancel
    setShowDialog(false);
    setSelectedVideoUrl(null); // Clear selected video
  };

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        // The JSON file will be in public/data/tiktok-videos.json
        // Fetch relative to the public directory
        const response = await fetch('/data/tiktok-videos.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch videos: ${response.status} ${response.statusText}`);
        }
        const data: TikTokVideosData = await response.json();
        if (data && data.videos) {
          setVideos(data.videos);
        } else {
          throw new Error("Video data is not in the expected format.");
        }
      } catch (err: any) {
        setError(err.message);
        setVideos([]); // Clear videos on error
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <>
      <Head>
        <title>The Universe Whisper Video Library</title>
        <meta name="description" content="Browse and share videos from The Universe Whisper video library to TikTok." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1>The Universe Whisper Video Library</h1>
          <p>Explore our collection of videos. Select any video to share it with your audience on TikTok.</p>
        </header>

        {loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>Loading videos...</p>
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '20px', color: 'red', border: '1px solid red', borderRadius: '5px' }}>
            <h2>Error</h2>
            <p>Error loading videos: {error}</p>
            <p>Please ensure <code>public/data/tiktok-videos.json</code> exists and is correctly formatted.</p>
          </div>
        )}

        {!loading && !error && videos.length === 0 && (
          <div style={{ textAlign: 'center', padding: '20px', border: '1px solid #eee', borderRadius: '5px' }}>
            <p>No videos found. Please make sure <code>public/data/tiktok-videos.json</code> contains video data.</p>
          </div>
        )}

        {!loading && !error && videos.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {videos.map((video) => (
              <li
                key={video.id}
                style={{
                  marginBottom: '25px',
                  border: '1px solid #ddd',
                  padding: '15px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  backgroundColor: '#fff'
                }}
              >
                <h3 style={{ marginTop: 0, color: '#333' }}>{video.title || 'TikTok Video'}</h3>
                <p style={{ color: '#555' }}>
                  <strong>URL:</strong>
                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0070f3', textDecoration: 'none' }}
                  >
                    {' '}{video.videoUrl}
                  </a>
                </p>
                <button
                  onClick={() => handleShareClick(video)}
                  style={{
                    padding: '10px 15px',
                    cursor: 'pointer',
                    backgroundColor: '#fe2c55', // TikTok's brand color (approximate)
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e02146')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fe2c55')}
                >
                  Share to TikTok
                </button>
              </li>
            ))}
          </ul>
        )}

        {showDialog && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker backdrop
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1050, // Higher z-index
            backdropFilter: 'blur(3px)', // Optional: blur background
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '30px 40px', // More padding
              borderRadius: '12px', // More rounded corners
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)', // Enhanced shadow
              textAlign: 'center',
              minWidth: '320px', // Slightly wider
            maxWidth: '480px', // Max width
            boxSizing: 'border-box',
            }}>
              {dialogStep === 'confirm' && (
                <>
                  <h2 style={{ marginTop: '0', marginBottom: '15px', fontSize: '1.6em', color: '#333' }}>Confirm Share</h2>
                  <p style={{ marginBottom: '25px', fontSize: '1.05em', color: '#555', lineHeight: '1.5' }}>
                    Ready to share this video to TikTok?
                    {selectedVideoUrl &&
                      <span style={{ display: 'block', marginTop: '10px', fontSize: '0.9em', color: '#777', wordBreak: 'break-all' }}>
                        Video: {selectedVideoUrl}
                      </span>
                    }
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                    <button
                      onClick={handleCancelShare}
                      style={{
                        padding: '10px 20px',
                        fontSize: '1em',
                        cursor: 'pointer',
                        backgroundColor: '#6c757d', // Grey
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        fontWeight: '500',
                        transition: 'background-color 0.2s ease',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#5a6268')}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#6c757d')}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmShare}
                      style={{
                        padding: '10px 20px',
                        fontSize: '1em',
                        cursor: 'pointer',
                        backgroundColor: '#fe2c55', // TikTok Red
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        fontWeight: '600',
                        transition: 'background-color 0.2s ease',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e02146')}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fe2c55')}
                    >
                      Confirm
                    </button>
                  </div>
                </>
              )}
              {dialogStep === 'success' && (
                <>
                  <h2 style={{ marginTop: '0', marginBottom: '15px', fontSize: '1.75em', color: '#28a745' /* Green for success */ }}>Success!</h2>
                  <p style={{ marginBottom: '25px', fontSize: '1.1em', color: '#555' }}>
                    Video sent to TikTok successfully!
                  </p>
                  <button
                    onClick={closeDialog}
                    style={{
                      padding: '12px 25px',
                      fontSize: '1.1em',
                      cursor: 'pointer',
                      backgroundColor: '#007bff', // Standard blue
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: '600',
                      transition: 'background-color 0.2s ease',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TikTokContentPage;
