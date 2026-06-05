#!/usr/bin/env node
/**
 * afterFileEdit hook: remind agent to sync docs/cursor-ru after .cursor edits.
 */
import { readFileSync } from "node:fs";

const input = JSON.parse(readFileSync(0, "utf8"));
const filePath = String(input.file_path ?? input.path ?? "").replace(/\\/g, "/");

if (/^\.cursor\//.test(filePath) || filePath.includes("/.cursor/")) {
  const payload = {
    additional_context:
      "`.cursor/` changed. Update the Russian mirror under `docs/cursor-ru/` per sync-cursor-bilingual-structure, then run `npm run check:cursor-mirror`.",
  };
  process.stdout.write(JSON.stringify(payload));
}

process.exit(0);
