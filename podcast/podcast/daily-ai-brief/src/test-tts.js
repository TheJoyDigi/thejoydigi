import dotenv from "dotenv";
import { scriptToSpeech } from "./tts.js";

// Load environment variables
dotenv.config();

async function testTTS() {
  try {
    console.log("Starting TTS test...");

    // Test script with various content types and formatting
    const testScript = `Welcome to the AI Daily Brief test.

This is a test of our text-to-speech system with different content types:

1. Regular sentences with punctuation.
2. Numbers and dates: May 2nd, 2025
3. Technical terms: API, JSON, HTTP
4. Questions? Exclamations! And... pauses.
5. Abbreviations like NASA and ASAP.

Testing different tones:
- Excited: Wow! This is amazing!
- Calm: Take a deep breath and relax.
- Technical: The API endpoint returns a JSON response.
- Friendly: Thanks for listening to our test!`;

    const outputPath = "test-output.wav";

    console.log("Generating audio file...");
    await scriptToSpeech(testScript, outputPath);
    console.log(`Success! Audio file generated at: ${outputPath}`);

    // Test with a very short script
    console.log("\nTesting with short script...");
    await scriptToSpeech("Quick test.", "short-test.wav");
    console.log("Short test completed!");
  } catch (error) {
    console.error("Error in TTS test:", error);
    console.error("Error details:", error.message);
  }
}

// Run the test
testTTS();
