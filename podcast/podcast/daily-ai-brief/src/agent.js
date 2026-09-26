import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";
import OpenAI from "openai";

// Load environment variables
dotenv.config();

// Initialize OpenAI client with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Reads the script prompt from file
 * @returns {Promise<string>} The script prompt
 */
async function readScriptPrompt() {
  const promptPath = path.join(process.cwd(), "src", "agent_promt_input.txt");
  return await fs.readFile(promptPath, "utf8");
}

/**
 * Gets news articles and generates a script
 * @returns {Promise<{script: string}>}
 */
export async function getNewsAndScript() {
  // Get today's date in YYYY-MM-DD format
  const today = new Date();
  const dateString = today.toISOString().split("T")[0];

  // Read the prompt template
  const promptContent = await readScriptPrompt();

  // First API call to get web search results
  const response = await openai.responses.create({
    model: "gpt-4.1",
    tools: [{ type: "web_search_preview" }],
    input: promptContent,
  });

  const script = response.output_text;
  return { script };
}
