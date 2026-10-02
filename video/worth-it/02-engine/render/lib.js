/* shared helpers for the render tools: find playwright and an already-installed headless browser. */
const fs = require('fs'), os = require('os'), path = require('path');

function loadPlaywright() {
  try { return require('playwright'); } catch (e) {}
  const base = path.join(os.homedir(), '.npm', '_npx');
  for (const d of fs.existsSync(base) ? fs.readdirSync(base) : []) {
    const p = path.join(base, d, 'node_modules', 'playwright');
    if (fs.existsSync(p)) return require(p);
  }
  throw new Error('playwright not found. Run: npx playwright --version once, or npm i -g playwright');
}

async function launch() {
  const { chromium } = loadPlaywright();
  const envExe = process.env.WI_CHROME || process.env.CHROME_PATH;
  if (envExe && fs.existsSync(envExe)) return chromium.launch({ executablePath: envExe });
  const cache = path.join(os.homedir(), 'Library', 'Caches', 'ms-playwright'), shells = [];
  for (const d of fs.existsSync(cache) ? fs.readdirSync(cache) : []) {
    if (!d.startsWith('chromium_headless_shell-')) continue;
    for (const sub of fs.readdirSync(path.join(cache, d))) {
      const exe = path.join(cache, d, sub, 'chrome-headless-shell');
      if (fs.existsSync(exe)) shells.push([parseInt(d.split('-')[1], 10), exe]);
    }
  }
  shells.sort((a, b) => b[0] - a[0]);
  return chromium.launch(shells.length ? { executablePath: shells[0][1] } : {});
}

const FONTS = ['400 20px "Dela Gothic One"', '700 20px "Caveat"', '400 20px "Bowlby One"', '400 20px "Pacifico"', '700 20px "Fraunces"', '500 20px "DM Sans"', '700 20px "Figtree"', '700 20px "Space Grotesk"'];

async function openEpisode(browser, epDir, slug, query) {
  const page = await browser.newPage({ viewport: { width: 480, height: 900 } });
  page.on('pageerror', e => console.error('page error:', e.message));
  await page.goto('file://' + path.join(epDir, 'dist', slug + '.html') + (query || '?t=0'));
  await page.evaluate(() => TT.stop());
  await page.waitForFunction(f => f.every(x => document.fonts.check(x)), FONTS, { timeout: 30000 });
  return page;
}
/* an episode folder given relative to the current directory or to video/trap-or-treasure */
function resolveEp(arg) {
  const root = path.resolve(__dirname, '..', '..');
  if (path.isAbsolute(arg)) return arg;
  const here = path.resolve(process.cwd(), arg);
  return fs.existsSync(path.join(here, 'page.json')) ? here : path.resolve(root, arg);
}
module.exports = { loadPlaywright, launch, openEpisode, resolveEp, FONTS };
