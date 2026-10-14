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
      <div className="container mx-auto max-w-xl px-4 py-16">
        <h1 className="font-bungee !py-0 !font-normal mb-6 text-3xl text-[#1B140D]">Manage <span className="joy-accent">interests</span></h1>
        <form onSubmit={addTopic} className="mb-8 flex gap-2">
          <input
            type="text"
            className="flex-1 rounded-full border border-[#1B140D]/20 bg-white px-4 py-2.5 text-[#1B140D] outline-none focus:border-[#1B140D]"
            value={newTopic}
            onChange={e => setNewTopic(e.target.value)}
            placeholder="Add topic (e.g. AAPL, Bitcoin)"
          />
          <button
            type="submit"
            className="btn-joy rounded-full bg-[#FFC94A] px-5 font-semibold text-[#0B0B0C] hover:bg-[#FFD86B]"
          >
            Add
          </button>
        </form>
        <ul className="space-y-2">
          {topics.map(t => (
            <li key={t} className="flex items-center justify-between border-b border-[#1B140D]/10 py-2 text-[#1B140D]">
              <span>{t}</span>
              <button
                onClick={() => removeTopic(t)}
                className="text-sm font-semibold text-[#C8106E] hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
          {!topics.length && <li className="text-[#6B5D4F]">No topics added.</li>}
        </ul>
      </div>
    </MainLayout>
  );
}
