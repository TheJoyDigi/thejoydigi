import dotenv from "dotenv";
import { google } from "googleapis";
import fs from "node:fs";

// Load environment variables
dotenv.config();

/**
 * Uploads a video to YouTube
 * @param {string} videoPath - The path to the video file
 * @param {string} title - The title of the video
 * @param {string} description - The description of the video
 * @returns {Promise<void>}
 */
export async function uploadYouTube(videoPath, title, description) {
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
