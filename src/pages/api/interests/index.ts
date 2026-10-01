import { NextApiRequest, NextApiResponse } from 'next';
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const region = process.env.AWS_REGION;
const bucket = process.env.S3_BUCKET_NAME;
const key = process.env.INTERESTS_KEY || 'interests.json';

const s3 = new S3Client({ region });

async function loadTopics(): Promise<string[]> {
  try {
    const resp = await s3.send(
      new GetObjectCommand({ Bucket: bucket, Key: key })
    );
    const body = await resp.Body?.transformToString();
    if (!body) return [];
    const parsed = JSON.parse(body);
    return Array.isArray(parsed.topics) ? parsed.topics : [];
  } catch (err: any) {
    if (err.name === 'NoSuchKey') return [];
    throw err;
  }
}

async function saveTopics(topics: string[]) {
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: JSON.stringify({ topics }),
      ContentType: 'application/json'
    })
  );
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!bucket || !region) {
    return res.status(500).json({ message: 'S3 configuration missing' });
  }

  try {
    if (req.method === 'GET') {
      const topics = await loadTopics();
      return res.status(200).json({ topics });
    }

    if (req.method === 'POST') {
      const { topic } = req.body;
      if (!topic || typeof topic !== 'string') {
        return res.status(400).json({ message: 'Invalid topic' });
      }
      const topics = await loadTopics();
      if (!topics.includes(topic)) topics.push(topic);
      await saveTopics(topics);
      return res.status(200).json({ topics });
    }

    if (req.method === 'DELETE') {
      const { topic } = req.body;
      if (!topic || typeof topic !== 'string') {
        return res.status(400).json({ message: 'Invalid topic' });
      }
      const topics = await loadTopics();
      const updated = topics.filter(t => t !== topic);
      await saveTopics(updated);
      return res.status(200).json({ topics: updated });
    }

    res.setHeader('Allow', 'GET,POST,DELETE');
    return res.status(405).end('Method Not Allowed');
  } catch (err) {
    console.error('Interests API error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
