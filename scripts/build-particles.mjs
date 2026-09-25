// Bakes the 3D-character renders into point clouds for the landing's Three.js scene.
// Usage: node scripts/build-particles.mjs  →  public/me/points/{hero,desk,wave}.bin
import fs from "fs";
import path from "path";
import sharp from "sharp";

const N = 42000;
const RASTER = 720;
const DEPTH = 0.42;
const OUT = path.join(process.cwd(), "public", "me", "points");

const POSES = [
  { name: "hero", src: "public/me/long-3d-hero.webp", maxH: 2.1, maxW: 1.6 },
  { name: "desk", src: "public/me/long-3d-desk-alpha.webp", maxH: 1.8, maxW: 2.45 },
  { name: "wave", src: "public/me/long-3d-wave.webp", maxH: 2.1, maxW: 1.9 },
];

function rng(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/** Two-pass chamfer (3-4) distance to the nearest transparent pixel. */
function distance(mask, w, h) {
  const INF = 1e9;
  const d = new Float32Array(w * h).map((_, i) => (mask[i] ? INF : 0));
  const at = (x, y) => (x < 0 || y < 0 || x >= w || y >= h ? 0 : d[y * w + x]);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      if (!d[i]) continue;
      d[i] = Math.min(d[i], at(x - 1, y) + 3, at(x, y - 1) + 3, at(x - 1, y - 1) + 4, at(x + 1, y - 1) + 4);
    }
  for (let y = h - 1; y >= 0; y--)
    for (let x = w - 1; x >= 0; x--) {
      const i = y * w + x;
      if (!d[i]) continue;
      d[i] = Math.min(d[i], at(x + 1, y) + 3, at(x, y + 1) + 3, at(x + 1, y + 1) + 4, at(x - 1, y + 1) + 4);
    }
  return d;
}

async function bake(pose, seed) {
  const img = sharp(pose.src).ensureAlpha().resize({ width: RASTER, height: RASTER, fit: "inside" });
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const mask = new Uint8Array(w * h);
  const opaque = [];
  let minX = w, minY = h, maxX = 0, maxY = 0;
  for (let i = 0; i < w * h; i++) {
    if (data[i * 4 + 3] > 140) {
      mask[i] = 1;
      opaque.push(i);
      const x = i % w, y = (i / w) | 0;
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }
  }
  const dist = distance(mask, w, h);
  let dmax = 0;
  for (const i of opaque) dmax = Math.max(dmax, dist[i]);

  const bw = maxX - minX, bh = maxY - minY;
  const scale = Math.min(pose.maxH / bh, pose.maxW / bw);
  const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
  const rand = rng(seed);

  const pts = [];
  for (let n = 0; n < N; n++) {
    // Stratified along scan order so coverage is even (random sampling leaves clumps and holes).
    const i = opaque[Math.min(opaque.length - 1, Math.floor(((n + rand()) * opaque.length) / N))];
    const px = (i % w) + rand() - 0.5, py = ((i / w) | 0) + rand() - 0.5;
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const z = Math.sqrt(dist[i] / dmax) * DEPTH + (lum - 0.5) * 0.04 + (rand() - 0.5) * 0.015;
    pts.push([(px - cx) * scale, -(py - cy) * scale, z, r, g, b]);
  }
  pts.sort((a, b) => b[1] - a[1]);

  const pos = new Int16Array(N * 3);
  const col = new Uint8Array(N * 3);
  pts.forEach(([x, y, z, r, g, b], k) => {
    pos.set([Math.round(x * 10000), Math.round(y * 10000), Math.round(z * 10000)], k * 3);
    col.set([r, g, b], k * 3);
  });
  const buf = Buffer.concat([Buffer.from(pos.buffer), Buffer.from(col.buffer)]);
  fs.writeFileSync(path.join(OUT, `${pose.name}.bin`), buf);
  return { name: pose.name, bytes: buf.length, raster: `${w}x${h}`, opaque: opaque.length };
}

fs.mkdirSync(OUT, { recursive: true });
const results = [];
for (const [k, pose] of POSES.entries()) results.push(await bake(pose, 1000 + k));
fs.writeFileSync(path.join(OUT, "meta.json"), JSON.stringify({ count: N, poses: POSES.map((p) => p.name) }));
console.table(results);
