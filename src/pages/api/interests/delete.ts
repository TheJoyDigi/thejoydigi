import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { NextApiRequest, NextApiResponse } from "next";

const region = process.env.AWS_REGION;
const bucket = process.env.S3_BUCKET_NAME;
const key = process.env.INTERESTS_KEY || "interests.json";

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
    if (err.name === "NoSuchKey") return [];
    throw err;
  }
}

async function saveTopics(topics: string[]) {
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: JSON.stringify({ topics }),
      ContentType: "application/json",
    })
  );
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      //get topics from request body
      const { topics } = req.body;
      if (!Array.isArray(topics) || topics.length === 0) {
        return res
          .status(400)
          .json({ message: "Invalid or empty array of topics provided." });
      }
      // Load existing topics
      const existingTopics = await loadTopics();
      // remove topics from existing topics
      const updatedTopics = existingTopics.filter(
        (topic) => !topics.includes(topic)
      );
      // Save updated topics back to S3
      await saveTopics(updatedTopics);
      res.status(200).json({ topics: updatedTopics });
    } catch (error) {
      console.error("Error deleting interests:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
