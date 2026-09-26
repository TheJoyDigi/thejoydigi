import Head from 'next/head';
import React, { useState } from 'react';

const XAiTestPage: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [modelName, setModelName] = useState('');
  const [systemMessage, setSystemMessage] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [liveSearchConfig, setLiveSearchConfig] = useState('{\n  "max_results": 5\n}');
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setApiResponse(null);
    setError(null);

    let parsedLiveSearchConfig: any = null;
    if (liveSearchConfig.trim() !== '') {
      try {
        parsedLiveSearchConfig = JSON.parse(liveSearchConfig);
      } catch (e: any) {
        setError(`Error parsing Live Search Configuration JSON: ${e.message}`);
        setIsLoading(false);
        return;
      }
    }

    const requestBody: {
      model: string;
      system_prompt: string;
      user_prompt: string;
      live_search?: any;
    } = {
      model: modelName,
      system_prompt: systemMessage,
      user_prompt: userMessage,
    };

    if (parsedLiveSearchConfig) {
      requestBody.live_search = parsedLiveSearchConfig;
    }

    try {
      const response = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setApiResponse(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>X AI API Test Page</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-center">X AI API Test Page</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form onSubmit={handleSubmit} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    id="apiKey"
                    name="apiKey"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="API Key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="apiKey"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    API Key
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="modelName"
                    name="modelName"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Model Name"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="modelName"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Model Name
                  </label>
                </div>
                <div className="relative">
                  <textarea
                    id="systemMessage"
                    name="systemMessage"
                    className="peer placeholder-transparent h-20 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="System Message"
                    value={systemMessage}
                    onChange={(e) => setSystemMessage(e.target.value)}
                  />
                  <label
                    htmlFor="systemMessage"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    System Message
                  </label>
                </div>
                <div className="relative">
                  <textarea
                    id="userMessage"
                    name="userMessage"
                    className="peer placeholder-transparent h-20 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="User Message"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="userMessage"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    User Message
                  </label>
                </div>
                <div className="relative">
                  <textarea
                    id="liveSearchConfig"
                    name="liveSearchConfig"
                    className="peer placeholder-transparent h-20 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder='e.g., { "max_results": 5 }'
                    value={liveSearchConfig}
                    onChange={(e) => setLiveSearchConfig(e.target.value)}
                  />
                  <label
                    htmlFor="liveSearchConfig"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Live Search Configuration (JSON)
                  </label>
                </div>
                <div className="relative">
                  <button type="submit" className="bg-blue-500 text-white rounded-md px-6 py-2" disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>

              {isLoading && <div className="text-center">Loading...</div>}

              {error && (
                <div className="mt-6 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
                  <h3 className="font-semibold">Error:</h3>
                  <pre className="whitespace-pre-wrap">{error}</pre>
                </div>
              )}

              {apiResponse && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold">API Response:</h3>
                  <pre className="bg-gray-100 p-4 rounded mt-2 whitespace-pre-wrap text-sm">
                    {JSON.stringify(apiResponse, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default XAiTestPage;
