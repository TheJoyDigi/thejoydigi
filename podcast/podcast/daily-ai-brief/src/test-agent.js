import dotenv from "dotenv";
import { getNewsAndScript } from "./agent.js";

// Load environment variables
dotenv.config();

async function testAgent() {
  try {
    console.log("Testing getNewsAndScript function...");
    const result = await getNewsAndScript();
    console.log("Script generated successfully:");
    console.log(result.script);
  } catch (error) {
    console.error("Error testing agent:", error);
  }
}

testAgent();
