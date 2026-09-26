import { spawn } from "node:child_process";

/**
 * Creates a video from an audio file and a still image
 * @param {string} audioPath - The path to the audio file
 * @param {string} outPath - The path to save the video file to
 * @returns {Promise<void>}
 */
export async function makeVideo(audioPath, outPath) {
  const still = process.env.BRAND_STILL_IMAGE;
  await new Promise((resolve, reject) => {
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
