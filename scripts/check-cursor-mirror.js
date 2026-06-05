#!/usr/bin/env node
/**
 * Verify structural parity between .cursor/ (EN agent source) and docs/cursor-ru/ (RU human mirror).
 * Exit 0 when aligned; exit 1 with a readable report when drift is found.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const CURSOR = path.join(ROOT, ".cursor");
const MIRROR = path.join(ROOT, "docs", "cursor-ru");

const SKIP_DIRS = new Set(["hooks", "plans"]);
const SKIP_FILES = new Set(["hooks.json"]);

function walk(dir, base = dir) {
  const entries = [];
  if (!fs.existsSync(dir)) return entries;
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    if (name.name.startsWith(".")) continue;
    const full = path.join(dir, name.name);
    const rel = path.relative(base, full).replace(/\\/g, "/");
    if (name.isDirectory()) {
      if (SKIP_DIRS.has(name.name)) continue;
      entries.push(...walk(full, base));
    } else {
      entries.push(rel);
    }
  }
  return entries;
}

function toMirrorRel(cursorRel) {
  if (SKIP_FILES.has(cursorRel)) {
    return "hooks.README.md";
  }
  if (cursorRel.startsWith("rules/") && cursorRel.endsWith(".RULE.md")) {
    return cursorRel.replace(/\.RULE\.md$/, ".md");
  }
  return cursorRel;
}

function main() {
  const errors = [];
  const cursorFiles = walk(CURSOR).filter((rel) => !SKIP_FILES.has(rel));
  const expectedMirror = new Set();

  for (const rel of cursorFiles) {
    const mirrorRel = toMirrorRel(rel);
    expectedMirror.add(mirrorRel);
    const mirrorPath = path.join(MIRROR, mirrorRel);
    if (!fs.existsSync(mirrorPath)) {
      errors.push(`missing mirror: docs/cursor-ru/${mirrorRel} (source: .cursor/${rel})`);
    }
  }

  const mirrorFiles = walk(MIRROR);
  for (const rel of mirrorFiles) {
    if (rel === "hooks.README.md") {
      if (!fs.existsSync(path.join(CURSOR, "hooks.json"))) {
        errors.push("orphan mirror: docs/cursor-ru/hooks.README.md (no .cursor/hooks.json)");
      }
      continue;
    }
    if (!expectedMirror.has(rel)) {
      errors.push(`orphan mirror: docs/cursor-ru/${rel} (no matching .cursor source)`);
    }
  }

  if (errors.length) {
    console.error("cursor mirror parity check: FAIL\n");
    for (const line of errors) console.error(`  - ${line}`);
    console.error(`\n${errors.length} issue(s). Run sync-cursor-bilingual-structure and update docs/cursor-ru/.`);
    process.exit(1);
  }

  console.log(`cursor mirror parity check: pass (${cursorFiles.length} source paths, ${mirrorFiles.length} mirror paths)`);
}

main();
