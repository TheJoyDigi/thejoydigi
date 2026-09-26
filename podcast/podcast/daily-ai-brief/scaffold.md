---
# Joy Digi Daily AI Brief – Project Scaffold

Below is a minimal, production‑ready TypeScript/Node project laid out as a single repo.
Each code block is a full file ‑ copy them into the paths shown.
---

## /README.md

```md
# Joy Digi • Daily AI & Business‑Idea Brief

Automates a daily pipeline:

1. Gather fresh AI news + business‑idea stories.
2. Draft a 3‑minute narrated script.
3. Turn script → speech (OpenAI TTS).
4. Produce a simple video (still image + audio).
5. Publish audio to RSS (Spotify) & video to YouTube.

Scheduled to run at **10 AM America/Los_Angeles** every day via Vercel Cron.
```

---

## /.env.example

```env
# OpenAI
OPENAI_API_KEY=
OPENAI_ORG_ID=

# Google / YouTube OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
YOUTUBE_CHANNEL_ID=

# AWS S3 (audio storage & RSS feed)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-west-2
S3_BUCKET_NAME=joy-digi-podcast
BASE_AUDIO_URL=https://cdn.joydigi.com/audio
BASE_VIDEO_URL=https://cdn.joydigi.com/video
RSS_FEED_URL=https://cdn.joydigi.com/feed.xml

# Branding
BRAND_STILL_IMAGE=https://cdn.joydigi.com/branding/podcast-cover.jpg
VOICE_ID=alloy
```

---

## /package.json

```json
{
  "name": "joy-digi-daily-brief",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "ts-node src/handler.ts",
    "build": "tsc -p .",
    "start": "node dist/handler.js"
  },
  "dependencies": {
    "@aws-sdk/client-s3": "^3.550.0",
    "dotenv": "^16.4.5",
    "ffmpeg-static": "^5.1.0",
    "googleapis": "^133.0.0",
    "openai": "^4.45.0",
    "xmlbuilder2": "^4.9.2"
  },
  "devDependencies": {
    "@types/node": "^20.11.18",
    "ts-node": "^10.9.2",
    "typescript": "^5.4.2"
  }
}
```

---

## /vercel.json

```json
{
  "crons": [
    {
      "path": "api/handler",
      "schedule": "0 17 * * *" // 10:00 America/Los_Angeles = 17:00 UTC
    }
  ]
}
```

---

## /src/agent.ts

```ts
import OpenAI from "openai";
import type { NewsArticle } from "./types.js";
import { writeScript } from "./script.js";

const openai = new OpenAI();

export async function getNewsAndScript(): Promise<{
  news: NewsArticle[];
  script: string;
}> {
  const system = `You are a journalist preparing a concise daily brief on AI progress and business opportunities. Return JSON strictly in the schema.`;
  const user = `Fetch 6 fresh items (published in last 24h). Include big‑tech model updates, funding rounds, regulatory deadlines, and real‑life biz demand stories.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    tools: [
      { type: "web_search" },
      {
        type: "function",
        function: {
          name: "return_json",
          description: "Return gathered news as JSON",
          parameters: {
            type: "array",
            items: {
              type: "object",
              properties: {
                headline: { type: "string" },
                url: { type: "string", format: "uri" },
                date: { type: "string", format: "date" },
                summary: { type: "string" },
              },
              required: ["headline", "url", "summary", "date"],
            },
          },
        },
      },
    ],
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    temperature: 0.3,
  });

  const news: NewsArticle[] = JSON.parse(
    completion.choices[0].message.function_call!.arguments
  );
  const script = await writeScript(news);
  return { news, script };
}
```

---

## /src/script.ts

```ts
import OpenAI from "openai";
import type { NewsArticle } from "./types.js";
const openai = new OpenAI();

export async function writeScript(news: NewsArticle[]): Promise<string> {
  const bulletList = news
    .map((n) => `• ${n.headline} — ${n.summary}`)
    .join("\n");
  const prompt = `Compose a friendly 3‑minute audio brief (≈450 words) for Joy Digi listeners. Begin with: \"It's ${new Date().toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" }
  )}, and here are your AI updates…\" then present each bullet, and end with an inspirational sign‑off.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are a professional voiceover script writer.",
      },
      { role: "user", content: `${bulletList}\n\n${prompt}` },
    ],
    temperature: 0.65,
  });
  return completion.choices[0].message.content!;
}
```

---

## /src/tts.ts

```ts
import fs from "node:fs/promises";
import OpenAI from "openai";
const openai = new OpenAI();

export async function scriptToSpeech(script: string, outPath: string) {
  const response = await openai.audio.speech.create({
    model: "tts-1",
    voice: process.env.VOICE_ID || "alloy",
    input: script,
    format: "wav",
  });
  await fs.writeFile(outPath, Buffer.from(await response.arrayBuffer()));
}
```

---

## /src/video.ts

```ts
import { spawn } from "node:child_process";
import path from "node:path";

export async function makeVideo(audioPath: string, outPath: string) {
  const still = process.env.BRAND_STILL_IMAGE!;
  await new Promise<void>((resolve, reject) => {
    const ff = spawn("ffmpeg", [
      "-y",
      "-loop",
      "1",
      "-i",
      still,
      "-i",
      audioPath,
      "-shortest",
      "-c:v",
      "libx264",
      "-tune",
      "stillimage",
      "-c:a",
      "aac",
      "-pix_fmt",
      "yuv420p",
      "-vf",
      "scale=1280:720,format=yuv420p",
      outPath,
    ]);
    ff.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`ffmpeg exited ${code}`))
    );
  });
}
```

---

## /src/rss.ts

```ts
import { create } from "xmlbuilder2";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import fs from "node:fs/promises";

const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function updateFeed(
  dateLabel: string,
  audioURL: string,
  script: string
) {
  const bucket = process.env.S3_BUCKET_NAME!;
  const key = "feed.xml";
  const feedResp = await s3.send(
    new GetObjectCommand({ Bucket: bucket, Key: key })
  );
  const existingXML = feedResp.Body
    ? await feedResp.Body.transformToString()
    : null;

  const feed = existingXML
    ? create(existingXML)
    : create({ version: "1.0", encoding: "UTF-8" })
        .ele("rss", { version: "2.0" })
        .ele("channel");

  feed
    .ele("item")
    .ele("title")
    .txt(`AI Brief – ${dateLabel}`)
    .up()
    .ele("description")
    .txt(script.slice(0, 160))
    .up()
    .ele("enclosure", { url: audioURL, type: "audio/mpeg" })
    .up()
    .ele("pubDate")
    .txt(new Date().toUTCString())
    .up();

  const xml = feed.end({ prettyPrint: true });
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: xml,
      ContentType: "application/rss+xml",
    })
  );
}
```

---

## /src/youtube.ts

```ts
import { google } from "googleapis";
import fs from "node:fs";

export async function uploadYouTube(
  videoPath: string,
  title: string,
  description: string
) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "urn:ietf:wg:oauth:2.0:oob"
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
  const youtube = google.youtube({ version: "v3", auth: oauth2Client });

  await youtube.videos.insert({
    part: ["snippet", "status"],
    requestBody: {
      snippet: { title, description, categoryId: "28" },
      status: { privacyStatus: "public" },
    },
    media: { body: fs.createReadStream(videoPath) },
  });
}
```

---

## /src/handler.ts

```ts
import "dotenv/config";
import path from "node:path";
import { getNewsAndScript } from "./agent.js";
import { scriptToSpeech } from "./tts.js";
import { makeVideo } from "./video.js";
import { updateFeed } from "./rss.js";
import { uploadYouTube } from "./youtube.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: audioKey,
      Body: await fs.readFile(audioPath),
      ContentType: "audio/wav",
    })
  );
  const audioURL = `${process.env.BASE_AUDIO_URL}/${dateLabel}.wav`;

  await updateFeed(dateLabel, audioURL, script);
  await uploadYouTube(videoPath, `AI Brief – ${dateLabel}`, script);

  return Response.json({ ok: true, newsCount: news.length });
}
```

---

## /src/types.ts

```ts
export interface NewsArticle {
  headline: string;
  url: string;
  date: string;
  summary: string;
}
```

---

Happy hacking! Fill in your Secrets in `.env`, install deps with `npm i`, and run `npm run dev` to test locally.
