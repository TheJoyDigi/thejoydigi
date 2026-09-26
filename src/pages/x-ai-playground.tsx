import MainLayout from '../pages/_layouts'; // Adjusted import path
import React, { useState } from 'react';

function XAiPlaygroundPage() {
  const [apiKey, setApiKey] = useState('');
  const [modelName, setModelName] = useState('');
  const [systemMessage, setSystemMessage] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [liveSearchConfig, setLiveSearchConfig] = useState(''); // New state
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setResponse(''); // Clear previous response

    // Placeholder for API call logic
    console.log({
      apiKey,
      modelName,
      systemMessage,
      userMessage,
      liveSearchConfig, // Log new config
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setResponse('This is a placeholder response. API call logic to be implemented. Live search config logged.');
    setIsLoading(false);
  };

  return (
    <MainLayout
      title="X AI Playground"
      description="Test page for X AI API"
      noindex
    >
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>X AI API Test Page</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="apiKey" style={{ display: 'block', marginBottom: '5px' }}>API Key:</label>
            <input
              type="text"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="modelName" style={{ display: 'block', marginBottom: '5px' }}>Model Name:</label>
            <input
              type="text"
              id="modelName"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="systemMessage" style={{ display: 'block', marginBottom: '5px' }}>System Message:</label>
            <textarea
              id="systemMessage"
              value={systemMessage}
              onChange={(e) => setSystemMessage(e.target.value)}
              rows={4}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="userMessage" style={{ display: 'block', marginBottom: '5px' }}>User Message:</label>
            <textarea
              id="userMessage"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              rows={6}
              required
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>

          {/* New Live Search Configuration Section */}
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="liveSearchConfig" style={{ display: 'block', marginBottom: '5px' }}>Live Search Configuration (JSON):</label>
            <textarea
              id="liveSearchConfig"
              value={liveSearchConfig}
              onChange={(e) => setLiveSearchConfig(e.target.value)}
              rows={5}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'monospace' }}
              placeholder='e.g., { "param1": "value1", "param2": true }'
            />
            <small style={{ display: 'block', marginTop: '5px', color: '#555' }}>
              Enter JSON for live search parameters. Specific fields will be added if X AI documentation becomes available.
            </small>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{ padding: '10px 15px', backgroundColor: isLoading ? '#ccc' : '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </form>

        {response && (
          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #eee', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
            <h2>Response:</h2>
            <pre>{response}</pre>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default XAiPlaygroundPage;
