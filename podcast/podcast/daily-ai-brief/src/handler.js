import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import "dotenv/config";
import fs from "node:fs/promises";
import { getNewsAndScript } from "./agent.js";
import { updateFeed } from "./rss.js";
import { scriptToSpeech } from "./tts.js";
import { makeVideo } from "./video.js";
import { uploadYouTube } from "./youtube.js";

/**
 * Main handler function that orchestrates the entire process
 * @returns {Promise<{ok: boolean, newsCount: number}>}
 */
export default async function handler() {
  const dateLabel = new Date().toISOString().slice(0, 10);
  const { news, script } = await getNewsAndScript();

  const audioPath = `/tmp/${dateLabel}.wav`;
  await scriptToSpeech(script, audioPath);

  const videoPath = `/tmp/${dateLabel}.mp4`;
  await makeVideo(audioPath, videoPath);

  // upload audio to S3
  const s3 = new S3Client({ region: process.env.AWS_REGION });
  const audioKey = `audio/${dateLabel}.wav`;
  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: audioKey,
      Body: await fs.readFile(audioPath),
      ContentType: "audio/wav",
    })
  );
  const audioURL = `${process.env.BASE_AUDIO_URL}/${dateLabel}.wav`;

  await updateFeed(dateLabel, audioURL, script);

  await uploadYouTube(videoPath, `AI Brief – ${dateLabel}`, script);

  return { ok: true, newsCount: news.length };
}
