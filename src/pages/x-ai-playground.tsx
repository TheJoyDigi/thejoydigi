import MainLayout from '../pages/_layouts'; // Adjusted import path
import React, { useState } from 'react';

function XAiPlaygroundPage() {
  const [apiKey, setApiKey] = useState('');
  const [modelName, setModelName] = useState('');
  const [systemMessage, setSystemMessage] = useState('');
  const [userMessage, setUserMessage] = useState('');
  // New states for individual search parameters
  const [searchMode, setSearchMode] = useState('auto');
  const [domainList, setDomainList] = useState('');
  const [maxSearchResults, setMaxSearchResults] = useState('5');
  const [dateRange, setDateRange] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setResponse('');

    const searchParams: any = { mode: searchMode };

    if (domainList.trim() !== '') {
      searchParams.domain_list = domainList.split(',').map(d => d.trim()).filter(d => d !== '');
    }

    if (maxSearchResults.trim() !== '') {
      const numResults = parseInt(maxSearchResults, 10);
      if (!isNaN(numResults) && numResults >= 1 && numResults <= 50) {
        searchParams.max_search_results = numResults;
      } else {
        setResponse('Error: Max Search Results must be a number between 1 and 50.');
        setIsLoading(false);
        return;
      }
    } else {
      // If empty, we might choose to not send it or send a default.
      // For now, let's assume if it's empty, it's not sent, unless API requires it.
      // Based on previous logic, we'll assume 5 is a good default if not specified.
      // However, the instruction is "Include only if valid and not empty".
      // Let's stick to that and not send if empty. User can set it to 5.
    }

    if (dateRange.trim() !== '') {
      searchParams.date_range = dateRange;
    }

    const requestBody = {
      query: userMessage,
      search_parameters: searchParams,
    };

    // Log the constructed request body for debugging
    console.log("Request Body:", JSON.stringify(requestBody, null, 2));

    try {
      const apiResponse = await fetch('https://api.x.ai/v1/live-search', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await apiResponse.json();

      if (!apiResponse.ok) {
        setResponse(`API Error: ${apiResponse.status} ${apiResponse.statusText}\n${JSON.stringify(responseData, null, 2)}`);
      } else {
        setResponse(JSON.stringify(responseData, null, 2));
      }
    } catch (error) {
      setResponse('Error making API call: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout
      title="X AI Playground"
      description="Test page for X AI API"
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

          {/* New Individual Live Search Parameter Fields */}
          <div style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
            <h3 style={{ marginTop: '0', marginBottom: '10px' }}>Live Search Parameters</h3>

            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="searchMode" style={{ display: 'block', marginBottom: '5px' }}>Search Mode:</label>
              <select
                id="searchMode"
                value={searchMode}
                onChange={(e) => setSearchMode(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              >
                <option value="auto">Auto</option>
                <option value="on">On</option>
                <option value="off">Off</option>
              </select>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="domainList" style={{ display: 'block', marginBottom: '5px' }}>Domain List (comma-separated):</label>
              <input
                type="text"
                id="domainList"
                value={domainList}
                onChange={(e) => setDomainList(e.target.value)}
                placeholder="e.g., example.com, another.org"
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="maxSearchResults" style={{ display: 'block', marginBottom: '5px' }}>Max Search Results (1-50):</label>
              <input
                type="number"
                id="maxSearchResults"
                value={maxSearchResults}
                onChange={(e) => setMaxSearchResults(e.target.value)}
                min="1"
                max="50"
                placeholder="e.g., 5"
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="dateRange" style={{ display: 'block', marginBottom: '5px' }}>Date Range:</label>
              <input
                type="text"
                id="dateRange"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                placeholder="e.g., 2023-01-01_2023-12-31 or last_7_days"
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <small style={{ display: 'block', marginTop: '5px', color: '#555' }}>
                Format like YYYY-MM-DD_YYYY-MM-DD or relative like last_X_days/weeks/months.
              </small>
            </div>
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
