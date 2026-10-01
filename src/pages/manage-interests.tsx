import { useEffect, useState } from 'react';
import MainLayout from './_layouts';

export default function ManageInterests() {
  const [topics, setTopics] = useState<string[]>([]);
  const [newTopic, setNewTopic] = useState('');

  const fetchTopics = async () => {
    try {
      const res = await fetch('/api/interests');
      if (res.ok) {
        const data = await res.json();
        setTopics(data.topics || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const addTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim()) return;
    await fetch('/api/interests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: newTopic.trim() })
    });
    setNewTopic('');
    fetchTopics();
  };

  const removeTopic = async (topic: string) => {
    await fetch('/api/interests', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic })
    });
    fetchTopics();
  };

  return (
    <MainLayout title="Manage Interests" noindex>
      <div className="container mx-auto px-4 py-8 max-w-xl">
        <h1 className="text-2xl font-bold mb-4">Manage Interest Topics</h1>
        <form onSubmit={addTopic} className="flex space-x-2 mb-6">
          <input
            type="text"
            className="flex-1 border rounded px-2 py-1"
            value={newTopic}
            onChange={e => setNewTopic(e.target.value)}
            placeholder="Add topic (e.g. AAPL, Bitcoin)"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded"
          >
            Add
          </button>
        </form>
        <ul className="space-y-2">
          {topics.map(t => (
            <li key={t} className="flex justify-between items-center border-b pb-1">
              <span>{t}</span>
              <button
                onClick={() => removeTopic(t)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
          {!topics.length && <li className="text-gray-500">No topics added.</li>}
        </ul>
      </div>
    </MainLayout>
  );
}
