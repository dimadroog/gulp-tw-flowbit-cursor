"use strict";

/**
 * Runs axe-core accessibility audit (WCAG 2.1 AA) against all dist/*.html files.
 * Uses JSDOM — no browser required. Fast, CI-friendly.
 *
 * Limitations:
 *  - color-contrast rules require real CSS layout → excluded here, check manually
 *    using DevTools / WebAIM Contrast Checker.
 *
 * Usage:  npm run a11y
 */

const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const axe = require("axe-core");

const DIST_DIR = path.resolve(__dirname, "../dist");

// WCAG 2.1 AA tag set
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21aa"];

// color-contrast requires real CSS rendering — skip in jsdom
const DISABLED_RULES = { "color-contrast": { enabled: false } };

// ── helpers ───────────────────────────────────────────────────────────────────

function walkHtml(dir) {
  const results = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walkHtml(full));
    else if (entry.name.endsWith(".html")) results.push(full);
  }
  return results;
}

// ── per-file audit ────────────────────────────────────────────────────────────

async function auditFile(filePath) {
  const html = fs.readFileSync(filePath, "utf8");

  // Inject axe-core source into jsdom so it runs in the same window context
  const dom = new JSDOM(html, {
    url: "http://localhost",
    runScripts: "dangerously",
  });

  const script = dom.window.document.createElement("script");
  script.textContent = axe.source;
  dom.window.document.head.appendChild(script);

  return dom.window.axe.run(dom.window.document, {
    runOnly: { type: "tag", values: WCAG_TAGS },
    rules: DISABLED_RULES,
  });
}

// ── reporter ──────────────────────────────────────────────────────────────────

function printViolations(violations) {
  for (const v of violations) {
    const impact = v.impact ? `[${v.impact}] ` : "";
    console.error(`\n      ${impact}${v.id}: ${v.description}`);
    console.error(`      Help: ${v.helpUrl}`);
    for (const node of v.nodes) {
      console.error(`        → ${node.target.join(", ")}`);
      if (node.failureSummary) {
        const summary = node.failureSummary.split("\n")[0].replace(/^Fix\s+/, "");
        console.error(`          ${summary}`);
      }
    }
  }
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  const files = walkHtml(DIST_DIR);

  if (!files.length) {
    console.error("✖  No HTML files found in dist/ — run npm run build first");
    process.exit(1);
  }

  console.log(`\nAccessibility audit (WCAG 2.1 AA) — ${files.length} file(s)\n`);

  let totalViolations = 0;

  for (const file of files) {
    const rel = path.relative(DIST_DIR, file);
    let results;

    try {
      results = await auditFile(file);
    } catch (err) {
      console.error(`  ✖ ${rel} — audit error: ${err.message}`);
      totalViolations++;
      continue;
    }

    const count = results.violations.length;

    if (!count) {
      console.log(`  ✔ ${rel}`);
    } else {
      console.error(`  ✖ ${rel} — ${count} violation(s)`);
      printViolations(results.violations);
      totalViolations += count;
    }
  }

  console.log();

  if (totalViolations) {
    console.error(`✖  ${totalViolations} accessibility violation(s) found`);
    console.error(
      `   ℹ  color-contrast must be verified manually (DevTools / WebAIM)\n`
    );
    process.exit(1);
  } else {
    console.log(`✔  No WCAG 2.1 AA violations found`);
    console.log(
      `   ℹ  color-contrast must be verified manually (DevTools / WebAIM)\n`
    );
  }
}

main().catch((err) => {
  console.error("\n✖  Unexpected error:", err.message);
  process.exit(1);
});
