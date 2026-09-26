import dotenv from "dotenv";
import fs from "fs";
import { OpenAI } from "openai";
import path from "path";
import { getNewsAndScript } from "./agent.js";

// Load environment variables
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Test the entire pipeline from news gathering to audio generation
 */
async function testPipeline() {
  try {
    console.log("\nStep 1: Getting news and generating script...");
    const { script } = await getNewsAndScript();

    // Save the script to a file
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const scriptPath = `output/script-${timestamp}.txt`;
    await fs.promises.writeFile(scriptPath, script, "utf8");
    console.log(`Script saved to: ${scriptPath}\n`);

    console.log("Step 2: Converting script to audio...");
    await generateAudioFromScript(script);
  } catch (error) {
    console.error("Error in pipeline test:", error);
    console.error("Error details:", error.message);
  }
}

async function generateAudioFromScript(scriptContent) {
  try {
    // Parse the script content
    const scriptJson = JSON.parse(scriptContent);

    const chunks = [];
    let currentChunk = "";
    let currentLength = 0;
    const maxChunkLength = 4000; // Leave some room for JSON formatting

    // Split the script into chunks based on text content
    for (const step of scriptJson.steps) {
      if (step.type === "text") {
        const stepContent = step.content;
        if (currentLength + stepContent.length > maxChunkLength) {
          if (currentChunk) {
            chunks.push(currentChunk);
            currentChunk = "";
            currentLength = 0;
          }
          // If a single step is too long, split it into smaller parts
          const words = stepContent.split(" ");
          let tempChunk = "";
          for (const word of words) {
            if (tempChunk.length + word.length + 1 > maxChunkLength) {
              chunks.push(tempChunk.trim());
              tempChunk = word;
            } else {
              tempChunk += (tempChunk ? " " : "") + word;
            }
          }
          if (tempChunk) {
            chunks.push(tempChunk.trim());
          }
        } else {
          currentChunk += (currentChunk ? "\n\n" : "") + stepContent;
          currentLength += stepContent.length;
        }
      }
    }
    if (currentChunk) {
      chunks.push(currentChunk);
    }

    console.log(`Split script into ${chunks.length} chunks`);

    // Create output directory if it doesn't exist
    await fs.promises.mkdir("output", { recursive: true });

    // Generate audio for each chunk
    for (let i = 0; i < chunks.length; i++) {
      console.log(`Generating audio for chunk ${i + 1}/${chunks.length}...`);
      const chunk = chunks[i];
      const response = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: chunk,
      });

      const buffer = Buffer.from(await response.arrayBuffer());
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const outputPath = path.join(
        "output",
        `audio-chunk-${i + 1}-${timestamp}.mp3`
      );
      await fs.promises.writeFile(outputPath, buffer);
      console.log(`Audio chunk ${i + 1} saved to: ${outputPath}`);
    }
  } catch (error) {
    console.error("Error generating audio:", error);
    throw error;
  }
}

// Run the test
testPipeline();
