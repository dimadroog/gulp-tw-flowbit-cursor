---
description: Plain CSS authoring in app/css — @layer, no Sass; Tailwind 4 entry via style.css; URL-encoded SVG data URIs for CSS icons.
alwaysApply: true
globs:
  - app/css/**
---

# CSS Authoring

- Project styles live in **`app/css/`** as plain CSS. **Do not** add Sass/SCSS to this repo.
- Single PostCSS entry: **`app/css/style.css`** (`@import "tailwindcss"`, `@source`, `@config`, section `@import`s).
- Section files (`components.css`, `header.css`, `motion.css`, …) use **`@layer base`** / **`@layer components`** and **`@apply`** where appropriate.
- **Preline variants:** when a module is wired, import only `variants.css` from `@preline/*` in `style.css` — not `theme.css`.
- **CSS custom properties:** do not leave unused `--tokens`; if `var(--foo)` has no setter on `:root`, a parent, or inline in templates, use the resolved value or define `--foo` where it is set.

## Simple SVG icons in CSS

Use when the glyph is drawn **only through CSS** (`background-image`, `mask-image`, `::before`/`::after`, custom checkbox/radio mark). Inline markup for structural icons: [`figma-asset-integrity.RULE.md`](figma-asset-integrity.RULE.md) § Simple vector icons (markup).

- Format: `url("data:image/svg+xml,<encoded-svg>")`.
- **Encode the full SVG markup** — do not paste raw XML inside `url(...)`.
  - Minimum: `%3C` / `%3E` for `<` / `>`; `%23` for `#` in hex colors (e.g. `fill='%23FFF9F5'`).
  - Prefer **single-quoted** attribute values inside the SVG fragment to reduce escaping.
  - Strip unnecessary whitespace; a trailing `%0A` after the closing `%3E%3C/svg%3E` is acceptable.
- **Forbidden:** unencoded `<svg`, unencoded `"` wrapping SVG tags, raw `#` in color values, or external `url("…/icon.svg")` for simple glyphs that belong in a data URI.
- Path geometry must match the design export; only encoding and quote style may differ.

## Verification

- `npm run build` completes without PostCSS/Tailwind errors; grep `app/css` for dead `var(--` placeholders without definitions.
- After adding CSS icon data URIs: `rg 'data:image/svg\+xml,[^%]*<' app/css` — **zero matches**; `rg 'data:image/svg\+xml,.*#' app/css` — **zero matches** for unencoded `#` in hex fills/strokes.
