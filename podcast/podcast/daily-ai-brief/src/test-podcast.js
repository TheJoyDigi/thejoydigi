import fs from "fs";
import path from "path";
import { generatePodcast } from "./generate-podcast.js";

async function cleanupOutput() {
  const outputDir = path.join(process.cwd(), "output");
  if (fs.existsSync(outputDir)) {
    const files = await fs.promises.readdir(outputDir);
    for (const file of files) {
      await fs.promises.unlink(path.join(outputDir, file));
    }
  }
}

async function testPodcastGeneration() {
  try {
    console.log("Starting podcast generation test...");

    // Clean up any existing output files
    await cleanupOutput();

    // Generate the podcast
    const { podcastPath, scriptJsonPath } = await generatePodcast();

    console.log("\nTest completed successfully!");
    console.log(`Podcast saved to: ${podcastPath}`);
    console.log(`Script JSON saved to: ${scriptJsonPath}`);
  } catch (error) {
    console.error("Error in podcast generation test:", error);
    console.error("Error details:", error.message);
  }
}

// Run the test
testPodcastGeneration();
