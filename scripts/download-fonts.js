"use strict";

const { mkdir, writeFile, readdir, unlink } = require("fs/promises");
const { createWriteStream } = require("fs");
const https = require("https");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const FONT_DIR = path.join(ROOT, "app", "fonts");
const FONTS_CSS = path.join(ROOT, "app", "css", "fonts.css");

// Project font setup — change before running `npm run fonts:download`.
const FAMILY = "Montserrat";
const WEIGHTS = [400, 500, 600, 700, 800];
const SUBSETS = "cyrillic,latin,latin-ext";

const CSS_URL = `https://fonts.googleapis.com/css2?family=${FAMILY}:wght@${WEIGHTS.join(";")}&display=swap&subset=${SUBSETS}`;

const WOFF2_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function fetchText(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers }, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          fetchText(response.headers.location, headers).then(resolve, reject);
          return;
        }

        if (response.statusCode !== 200) {
          reject(new Error(`HTTP ${response.statusCode} for ${url}`));
          return;
        }

        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      })
      .on("error", reject);
  });
}

function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          downloadFile(response.headers.location, destination).then(resolve, reject);
          return;
        }

        if (response.statusCode !== 200) {
          reject(new Error(`HTTP ${response.statusCode} for ${url}`));
          return;
        }

        const stream = createWriteStream(destination);
        response.pipe(stream);
        stream.on("finish", resolve);
        stream.on("error", reject);
      })
      .on("error", reject);
  });
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseFontFaces(css) {
  const faces = [];
  const pattern = /\/\*\s*([^*]+)\s*\*\/\s*@font-face\s*{([^}]+)}/g;
  let match;

  while ((match = pattern.exec(css)) !== null) {
    const subset = slugify(match[1]);
    const block = match[2];
    const weight = block.match(/font-weight:\s*(\d+)/)?.[1];
    const style = block.match(/font-style:\s*(\w+)/)?.[1];
    const url = block.match(/url\((https:[^)]+)\)\s*format\('woff2'\)/)?.[1];
    const unicodeRange = block.match(/unicode-range:\s*([^;]+);/)?.[1]?.trim();

    if (!weight || !style || !url || !unicodeRange) {
      continue;
    }

    faces.push({ subset, weight, style, url, unicodeRange });
  }

  return faces;
}

async function removeLegacyFontFiles() {
  const entries = await readdir(FONT_DIR, { withFileTypes: true });

  await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".woff2"))
      .map((entry) => unlink(path.join(FONT_DIR, entry.name)))
  );
}

async function main() {
  await mkdir(FONT_DIR, { recursive: true });

  const css = await fetchText(CSS_URL, { "User-Agent": WOFF2_USER_AGENT });
  const faces = parseFontFaces(css);

  if (!faces.length) {
    throw new Error("No @font-face blocks returned from Google Fonts CSS");
  }

  await removeLegacyFontFiles();

  const urlToFileName = new Map();

  for (const face of faces) {
    if (urlToFileName.has(face.url)) {
      continue;
    }

    const fileName = `${slugify(FAMILY)}-${face.subset}.woff2`;
    const filePath = path.join(FONT_DIR, fileName);

    await downloadFile(face.url, filePath);
    process.stdout.write(`Downloaded ${fileName}\n`);
    urlToFileName.set(face.url, fileName);
  }

  const cssOutput = faces
    .map(({ weight, style, url, unicodeRange }) => {
      const fileName = urlToFileName.get(url);

      return `@font-face {
  font-family: ${FAMILY};
  font-style: ${style};
  font-weight: ${weight};
  font-display: swap;
  src: url("../fonts/${fileName}") format("woff2");
  unicode-range: ${unicodeRange};
}`;
    })
    .join("\n\n");

  await writeFile(FONTS_CSS, `${cssOutput}\n`, "utf8");
  process.stdout.write(`Wrote ${path.relative(ROOT, FONTS_CSS)}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
