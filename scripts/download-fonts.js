"use strict";

/**
 * Downloads Google Fonts as WOFF2 files to app/fonts/
 * and generates app/scss/_fonts.scss with @font-face declarations.
 *
 * Usage:  npm run fonts:download
 *
 * To configure fonts for a project, edit FONT_FAMILIES below.
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

const FONTS_DIR = path.resolve(__dirname, "../app/fonts");
const FONTS_SCSS = path.resolve(__dirname, "../app/scss/_fonts.scss");

// ── Configure project fonts here ─────────────────────────────────────────────
const FONT_FAMILIES = [
  { family: "Manrope", weights: [400, 500, 600, 700, 800] },
  { family: "JetBrains Mono", weights: [400, 500] },
];
// ─────────────────────────────────────────────────────────────────────────────

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
  "AppleWebKit/537.36 (KHTML, like Gecko) " +
  "Chrome/124.0.0.0 Safari/537.36";

// ── HTTP helper ───────────────────────────────────────────────────────────────

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": UA } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return get(res.headers.location).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} → ${url}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

// ── CSS parser ────────────────────────────────────────────────────────────────

/**
 * Parses Google Fonts CSS into structured font-face descriptors.
 * Returns array of { subset, weight, url, unicodeRange }.
 */
function parseFontFaces(css) {
  const faces = [];

  // Match: optional "/* subset */" comment followed by @font-face { … }
  const re =
    /(?:\/\*\s*([^*\n]+?)\s*\*\/\s*)?@font-face\s*\{([^}]+)\}/g;
  let m;

  while ((m = re.exec(css)) !== null) {
    const subset = (m[1] || "latin").trim().replace(/\s+/g, "-");
    const block = m[2];

    const weightM = block.match(/font-weight:\s*(\d+)/);
    const urlM = block.match(
      /url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/
    );
    const unicodeM = block.match(/unicode-range:\s*([^;]+)/);

    if (weightM && urlM) {
      faces.push({
        subset,
        weight: weightM[1],
        url: urlM[1],
        unicodeRange: unicodeM ? unicodeM[1].trim() : null,
      });
    }
  }

  return faces;
}

// ── Filename builder ──────────────────────────────────────────────────────────

function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

function buildFilename(family, weight, subset) {
  return `${slugify(family)}-${weight}-${subset}.woff2`;
}

// ── @font-face generator ──────────────────────────────────────────────────────

function buildFontFaceBlock(family, weight, subset, filename, unicodeRange) {
  const src = `url("../fonts/${filename}") format("woff2")`;
  let block = `/* ${family} — ${weight} — ${subset} */\n`;
  block += `@font-face {\n`;
  block += `  font-family: "${family}";\n`;
  block += `  font-style: normal;\n`;
  block += `  font-weight: ${weight};\n`;
  block += `  font-display: swap;\n`;
  block += `  src: ${src};\n`;
  if (unicodeRange) {
    block += `  unicode-range: ${unicodeRange};\n`;
  }
  block += `}\n`;
  return block;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function downloadFamily({ family, weights }) {
  const encoded = encodeURIComponent(family);
  const wghts = weights.join(";");
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encoded}:wght@${wghts}&display=swap`;

  console.log(`\n  ${family} [${weights.join(", ")}]`);

  const css = (await get(cssUrl)).toString("utf8");
  const faces = parseFontFaces(css);

  if (!faces.length) {
    throw new Error(`No @font-face blocks parsed from CSS for "${family}"`);
  }

  const downloaded = [];

  for (const face of faces) {
    const filename = buildFilename(family, face.weight, face.subset);
    const dest = path.join(FONTS_DIR, filename);
    const data = await get(face.url);
    fs.writeFileSync(dest, data);
    process.stdout.write(`    ✔ ${filename}\n`);
    downloaded.push({ ...face, family, filename });
  }

  return downloaded;
}

async function main() {
  fs.mkdirSync(FONTS_DIR, { recursive: true });
  console.log("Downloading fonts from Google Fonts…");

  const allFaces = [];
  const failed = [];

  for (const entry of FONT_FAMILIES) {
    try {
      const faces = await downloadFamily(entry);
      allFaces.push(...faces);
    } catch (err) {
      failed.push({ family: entry.family, error: err.message });
    }
  }

  // Write _fonts.scss
  if (allFaces.length) {
    const blocks = allFaces
      .map((f) =>
        buildFontFaceBlock(f.family, f.weight, f.subset, f.filename, f.unicodeRange)
      )
      .join("\n");

    const scss =
      `/* stylelint-disable */\n` +
      `/* Auto-generated by scripts/download-fonts.js — do not edit manually */\n` +
      `/* Re-generate: npm run fonts:download */\n\n` +
      blocks;

    fs.writeFileSync(FONTS_SCSS, scss, "utf8");
    console.log(`\n✔ ${allFaces.length} file(s) downloaded to app/fonts/`);
    console.log(`✔ app/scss/_fonts.scss generated`);
    console.log(
      `\n  Next: uncomment @use "fonts" in app/scss/style.scss to activate.`
    );
  }

  if (failed.length) {
    console.error("\n✖ Could not download the following fonts:\n");
    failed.forEach(({ family, error }) => {
      console.error(`  ${family}\n    Reason: ${error}`);
    });
    console.error(`
─────────────────────────────────────────────────────────────
Please provide the missing font files manually:

  1. Obtain WOFF2 files for each failed family
     (Download from vendor or Google Fonts website)
  2. Place them in:  app/fonts/
  3. Name them:      <family-slug>-<weight>-<subset>.woff2
     Example:        manrope-400-latin.woff2
  4. Add @font-face rules manually to app/scss/_fonts.scss
  5. Re-run:         npm run build
─────────────────────────────────────────────────────────────
`);
    if (!allFaces.length) process.exit(1);
  }
}

main().catch((err) => {
  console.error("\n✖ Unexpected error:", err.message);
  console.error(
    "\nPlease provide font files manually in app/fonts/ and update app/scss/_fonts.scss."
  );
  process.exit(1);
});
