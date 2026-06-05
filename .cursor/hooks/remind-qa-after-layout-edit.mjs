#!/usr/bin/env node
/**
 * afterFileEdit hook: remind agent to run npm run qa after layout source edits.
 */
import { readFileSync } from "node:fs";

const input = JSON.parse(readFileSync(0, "utf8"));
const filePath = String(input.file_path ?? input.path ?? "");

const layoutPattern = /\.(njk|scss|js|html)$/i;
const inApp = /^app\//.test(filePath) || /[/\\]app[/\\]/.test(filePath);

if (inApp && layoutPattern.test(filePath)) {
  const payload = {
    additional_context:
      "Layout source changed. Before marking the task complete, run `npm run qa` in the project root and record pass/fail evidence in the gate report.",
  };
  process.stdout.write(JSON.stringify(payload));
}

process.exit(0);
