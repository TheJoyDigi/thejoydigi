import dotenv from "dotenv";
import fs from "node:fs/promises";
import OpenAI from "openai";

// Load environment variables
dotenv.config();

// Initialize OpenAI client with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Converts a script to speech using OpenAI's TTS API
 * @param {string} script - The script to convert to speech
 * @param {string} outPath - The path to save the audio file to
 * @returns {Promise<void>}
 */
export async function scriptToSpeech(script, outPath) {
  const response = await openai.audio.speech.create({
    model: "tts-1",
    voice: process.env.VOICE_ID || "alloy",
    input: script,
    format: "wav",
  });
  await fs.writeFile(outPath, Buffer.from(await response.arrayBuffer()));
}
