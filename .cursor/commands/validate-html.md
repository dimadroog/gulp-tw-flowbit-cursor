# validate-html

Formal HTML validation on **built** `dist/**/*.html` before closing layout tasks. This project uses a single mandatory gate via the npm package **`html-validate`** (part of `npm run qa` after build).

## When to run

- After `npm run build`, always run **`npm run qa`** (includes HTML validation + lint + a11y), or run the validator directly:
  - `npm run validate:html`

## Commands

HTML validation (local, offline, npm-only):

```bash
npm run validate:html
```

Full QA (build + lint + HTML validation + a11y):

```bash
npm run qa
```

## Tooling

- **`html-validate`** ([`.htmlvalidate.json`](../../.htmlvalidate.json)) — local WHATWG HTML conformance checks; no Java, no network, no external services.
- Validates against the WHATWG HTML Living Standard (not a byte-for-byte Nu Html Checker). Some Nu-specific edge cases (certain embedded SVG / duplicate `id` warnings) may differ.

After bulk Figma SVG imports under `app/img/layout-shell/`, run **`npm run normalize:svg-layout`**, then build, before validation.

## Blocking rule

- Any **error** from `html-validate` blocks delivery.

## Reporting

- Record `pass|fail`, command used (`validate:html` or `qa`), file paths, and error messages on failure.
