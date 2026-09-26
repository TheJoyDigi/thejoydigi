import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { create } from "xmlbuilder2";

// Load environment variables
dotenv.config();

const s3 = new S3Client({ region: process.env.AWS_REGION });

/**
 * Updates the RSS feed with a new episode
 * @param {string} dateLabel - The date label for the episode
 * @param {string} audioURL - The URL of the audio file
 * @param {string} script - The script content
 * @returns {Promise<void>}
 */
export async function updateFeed(dateLabel, audioURL, script) {
  const bucket = process.env.S3_BUCKET_NAME;
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
