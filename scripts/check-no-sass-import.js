"use strict";

/**
 * Checks that no SCSS file in app/scss/ uses the deprecated Sass @import.
 * Runs as part of `npm run lint:styles`.
 */

const fs = require("fs");
const path = require("path");

const SCSS_DIR = path.resolve(__dirname, "../app/scss");
const IMPORT_RE = /^\s*@import\b/m;

function scanDir(dir) {
  let violations = [];
  let entries;

  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return violations;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      violations = violations.concat(scanDir(fullPath));
    } else if (entry.name.endsWith(".scss")) {
      const content = fs.readFileSync(fullPath, "utf8");
      if (IMPORT_RE.test(content)) {
        violations.push(path.relative(process.cwd(), fullPath));
      }
    }
  }

  return violations;
}

const violations = scanDir(SCSS_DIR);

if (violations.length) {
  console.error(
    "\n✖  Deprecated Sass @import detected. Use @use or @forward instead.\n"
  );
  violations.forEach((f) => console.error("   " + f));
  console.error(
    "\n   See: https://sass-lang.com/documentation/at-rules/use/\n"
  );
  process.exit(1);
}
