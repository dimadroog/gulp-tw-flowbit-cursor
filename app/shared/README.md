# Mock data (JSON)

Gulp merges JSON into the Nunjucks context before each page renders.

## Layers (shallow merge, last wins)

1. `app/shared/*.json` — all files, alphabetical order (e.g. `site.json` for `lang`, `siteName`)
2. Co-located `app/<page>.json` — same basename as the page `.njk` (e.g. `home-page.json` next to `home-page.njk`)

Missing files are skipped.

## When to use JSON vs `{% set %}`

| Use | Where |
|-----|--------|
| Large page fixtures (arrays, nested objects) | `app/<page>.json` |
| Cross-page defaults | `app/shared/*.json` |
| 1–3 simple fields on a page | `{% set %}` in the page `.njk` is fine |
| Partials (`njk-parts/_*.njk`) | **`{% set %}` only** — no JSON |
| Mixins (`_mixins.njk`) | **`{% set %}` only** — layout constants |

`{% set %}` in a page template overrides the same key from JSON.

Do not duplicate the same top-level key across multiple `shared/*.json` files. Nested objects are replaced whole (shallow merge), not deep-merged.
