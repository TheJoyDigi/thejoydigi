import { exec } from "child_process";
import dotenv from "dotenv";
import fs from "fs";
import { OpenAI } from "openai";
import path from "path";
import { promisify } from "util";
import { getNewsAndScript } from "./agent.js";

// Load environment variables
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Directory paths
const MUSIC_DIR = path.join(process.cwd(), "assets", "music");
const OUTPUT_DIR = path.join(process.cwd(), "output");

// Promisify exec
const execAsync = promisify(exec);

/**
 * Extracts JSON from markdown code block
 * @param {string} markdown - The markdown string containing JSON
 * @returns {Object} The parsed JSON object
 */
function extractJsonFromMarkdown(markdown) {
  const jsonMatch = markdown.match(/```json\n([\s\S]*?)\n```/);
  if (!jsonMatch) {
    throw new Error("No JSON found in markdown");
  }
  return JSON.parse(jsonMatch[1]);
}

/**
 * Generates speech from text using OpenAI TTS
 * @param {string} text - The text to convert to speech
 * @returns {Promise<Buffer>} The audio buffer
 */
async function generateSpeech(text) {
  const response = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: text,
  });
  return Buffer.from(await response.arrayBuffer());
}

/**
 * Combines multiple audio files into one using ffmpeg
 * @param {string[]} inputFiles - Array of input file paths
 * @param {string} outputFile - Path to save the combined audio
 */
async function combineAudioFiles(inputFiles, outputFile) {
  console.log("\n=== Audio Combining Process ===");
  console.log(`Input files to combine (${inputFiles.length}):`);
  inputFiles.forEach((file, index) => {
    console.log(`${index + 1}. ${file}`);
  });
  console.log(`Output file: ${outputFile}`);

  // Create output directory if it doesn't exist
  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  console.log("Output directory created/verified");

  // Create a temporary file list for ffmpeg
  const fileListPath = path.join(outputDir, "filelist.txt");
  const fileListContent = inputFiles.map((file) => `file '${file}'`).join("\n");
  fs.writeFileSync(fileListPath, fileListContent);
  console.log(`Temporary file list created at: ${fileListPath}`);

  try {
    console.log("\nExecuting ffmpeg command...");
    const { stdout, stderr } = await execAsync(
      `ffmpeg -f concat -safe 0 -i "${fileListPath}" -c:a libmp3lame -b:a 192k "${outputFile}"`
    );
    console.log("ffmpeg stdout:", stdout);
    console.log("ffmpeg stderr:", stderr);

    // Verify the output file was created
    const stats = fs.statSync(outputFile);
    console.log(`\nSuccess! Output file created: ${outputFile}`);
    console.log(`File size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

    // Clean up the temporary file list
    fs.unlinkSync(fileListPath);
    console.log("Temporary file list cleaned up");
  } catch (error) {
    console.error("\nError during audio combination:");
    console.error("Error message:", error.message);
    if (error.stderr) {
      console.error("ffmpeg error output:", error.stderr);
    }
    throw error;
  }
}

/**
 * Saves the script JSON to a file for debugging
 * @param {Object} scriptJson - The script JSON object
 * @param {string} timestamp - The timestamp for the filename
 */
async function saveScriptJson(scriptJson, timestamp) {
  // Create output directory if it doesn't exist
  await fs.promises.mkdir(OUTPUT_DIR, { recursive: true });

  const scriptJsonPath = path.join(OUTPUT_DIR, `script-json-${timestamp}.json`);
  await fs.promises.writeFile(
    scriptJsonPath,
    JSON.stringify(scriptJson, null, 2),
    "utf8"
  );
  console.log(`Script JSON saved to: ${scriptJsonPath}`);
  return scriptJsonPath;
}

/**
 * Generates the final podcast by combining TTS and music
 * @returns {Promise<{podcastPath: string, scriptJsonPath: string}>} Paths to the generated files
 */
export async function generatePodcast() {
  try {
    // Create output directory if it doesn't exist
    await fs.promises.mkdir(OUTPUT_DIR, { recursive: true });

    console.log("Step 1: Getting news and generating script...");
    const { script } = await getNewsAndScript();

    console.log("Step 2: Extracting JSON from script...");
    const scriptJson = extractJsonFromMarkdown(script);

    // Save the script JSON for debugging
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const scriptJsonPath = await saveScriptJson(scriptJson, timestamp);

    const audioFiles = [];

    // Always start with intro music
    const introPath = path.join(MUSIC_DIR, "intro.mp3");
    if (!fs.existsSync(introPath)) {
      throw new Error("Intro music file not found");
    }
    audioFiles.push(introPath);

    // Process each step in the script, skipping intro/outro music steps
    for (const step of scriptJson.steps) {
      if (step.type === "text") {
        // Generate speech for text steps
        console.log(`Generating speech for step ${step.id}...`);
        const audioBuffer = await generateSpeech(step.content);
        const audioPath = path.join(
          OUTPUT_DIR,
          `tts-${step.id}-${timestamp}.mp3`
        );
        await fs.promises.writeFile(audioPath, audioBuffer);
        audioFiles.push(audioPath);
      } else if (step.type === "music") {
        // Skip intro/outro music steps from JSON
        if (step.mood === "intro" || step.mood === "outro") {
          console.log(`Skipping ${step.mood} music step from JSON`);
          continue;
        }
        // Get music file for the mood
        const musicPath = path.join(MUSIC_DIR, `${step.mood}.mp3`);
        if (!fs.existsSync(musicPath)) {
          console.warn(`Music file not found for mood: ${step.mood}`);
          continue;
        }
        audioFiles.push(musicPath);
      }
    }

    // Always end with outro music
    const outroPath = path.join(MUSIC_DIR, "outro.mp3");
    if (!fs.existsSync(outroPath)) {
      throw new Error("Outro music file not found");
    }
    audioFiles.push(outroPath);

    // Combine all audio files
    const finalPodcastPath = path.join(OUTPUT_DIR, `podcast-${timestamp}.mp3`);
    await combineAudioFiles(audioFiles, finalPodcastPath);

    // Return both the podcast path and the script JSON path
    return {
      podcastPath: finalPodcastPath,
      scriptJsonPath: scriptJsonPath,
    };
  } catch (error) {
    console.error("Error generating podcast:", error);
    throw error;
  }
}
