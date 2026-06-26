---
description: HTML/Nunjucks conventions — reuse via macros; images per delivery rule; link stubs href="#"; JS anchors href="javascript:;"; partial extraction threshold.
alwaysApply: true
globs:
  - app/**/*.njk
  - app/**/*.html
---

# HTML And Nunjucks Conventions

- Use Nunjucks loops/macros/includes for repeated card/list/grid patterns.
- Keep template fragments small and purpose-based (section, card, nav, media).
- Prefer data-driven rendering over duplicated HTML blocks.
- Keep attribute naming and content structure consistent across loops.
- Add brief comments only when exceptions or non-obvious constraints exist.
- When an element has both visual and JS hook classes, place `js-*` classes after all visual classes in the `class` attribute.
- For `id` used as custom JS hooks, use the `js-` prefix; ids without `js-` for library `data-*` contracts only — see [`javascript-minimalism.RULE.md`](javascript-minimalism.RULE.md) § JS Hook Naming.
- For utility-heavy markup, keep atomic classes in the canonical `prettier-plugin-tailwindcss` order.
- Keep heading hierarchy valid (`h1` -> `h2` -> `h3`) without skipping levels in document structure.
- Treat `section` and `article` as titled regions: include a meaningful heading inside each.
- Treat site shell as layout-level responsibility: keep global `header`/`sidebar` in root layout + shared partials, not page templates.
- Keep page templates focused on page content: default to `{% extends "njk-layouts/_main.njk" %}` and render only `{% block content %}`.
- Introduce an additional layout only when a confirmed structural divergence exists (not for one-off page tweaks).
- Default page language is Russian: use `<html lang="ru">` unless the task explicitly requires another locale.
- Use only this viewport declaration: `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- Keep meta placeholders for new pages when final SEO content is not provided:
  - `<meta name="description" content="description">`
  - `<meta name="keywords" content="keywords">`
- Set `<title>` to match the page name used in the page registry (`app/index.html`) unless a different title is explicitly requested.

## Contact links (email and phone)

- When an **email address** is shown in visible markup (footer, contacts block, article byline, etc.), output it as `<a href="mailto:address@example.com">…</a>`. Use the real address in `href` (URL-encoded if needed); link text is the address unless the task specifies a different label.
- When a **phone number** is shown in visible markup, output it as `<a href="tel:…">…</a>`. Put a dialable URI in `href` (prefer E.164: `+` and digits only, e.g. `tel:+74950000000`); the visible text may keep spaces, parentheses, and local formatting.
- **Do not** leave contact email or phone as plain text inside list items or paragraphs when they are meant to be actionable for the user.
- Decorative or non-contact mentions (copy, examples in docs) are out of scope unless they are real contact details.
- **Verification:** `rg` on `app/**/*.njk` for visible `@` or phone patterns in contact blocks shows matching `mailto:` / `tel:` on the same nodes; `npm run build` succeeds.

## Link href (page stubs and JS)

- **Real navigation:** `href` points to an existing built page (`*.html`), valid `mailto:` / `tel:`, or an in-page fragment (`#id`) that exists on the **same** document.
- **Page stub (target not built yet):** use `href="#"`. Do **not** invent cross-page hash URLs (`other-page.html#section`) or slug hashes on the home page when no matching `id` exists in `dist/`.
- **JS-only anchor (no navigation):** use `href="javascript:;"`. Do **not** use `href="#"` for behavior-only controls. Add `role="button"` and keyboard support when the control is action-only (see [`accessibility-and-w3c.RULE.md`](accessibility-and-w3c.RULE.md)).
- **Forbidden as stubs:** `href="javascript:void(0)"` unless matching a third-party snippet; fake `home-page.html#…` when the fragment or target page is not implemented.

**Verification:**

- Review new/changed `<a href=` in `app/**/*.njk`: stubs → `#`; JS handlers → `javascript:;`; real targets → existing files or documented anchors on the same page.
- `rg 'href="[^"]*\.html#' app/` — only matches where the fragment `id` exists on that built page (or fix to `#`).
- `npm run build` succeeds after markup changes.

## Site shell layout (sticky footer)

- The root layout must keep the global footer at the **bottom of the viewport** when page content is shorter than the viewport; on long pages the footer follows content after scroll.
- **DOM order** in `_main.njk`: `header` (partial) → `main` → `footer` (partial). Do not move the footer inside `main` unless the task brief requires a different shell.
- **CSS contract:** `body` is a column flex container with at least full viewport height (`min-h-screen` or agreed equivalent); `main` uses `flex-1` (Tailwind `grow`) so it consumes remaining space between header and footer.
- Implement via `@apply` in project CSS (`app/css/components.css` `@layer base` for `body`, `.main` — see [`tailwind-usage-policy.RULE.md`](tailwind-usage-policy.RULE.md)), not repeated utility strings on `<body>` in Nunjucks.
- **Do not** use `position: fixed` / `sticky` on the site footer solely to pin it to the viewport bottom; sticky header (`site-header`) remains independent.
- **Verification:** on a short page (`index.html` / empty `home-page`), DevTools shows the footer adjacent to the bottom edge of the viewport with no large white gap below; on a long page, document scroll height exceeds the viewport and the footer appears after content. `npm run build` succeeds.

## Images in templates (media)

Sizing, formats, `picture`/`srcset`, and PageSpeed gates are defined in [`image-delivery-and-optimization.RULE.md`](image-delivery-and-optimization.RULE.md). `alt` and non-text accessibility: [`accessibility-and-w3c.RULE.md`](accessibility-and-w3c.RULE.md). Figma import paths and SVG integrity: [`figma-asset-integrity.RULE.md`](figma-asset-integrity.RULE.md).

- Every `<img>` in `app/**/*.njk` must set `loading="lazy"` or `loading="eager"` explicitly.
- When displayed size is known from layout, set `width` and `height` (or reserve space with equivalent CSS `aspect-ratio`) on `<img>` to limit CLS; values reflect **rendered** CSS pixels, not the full source file size.
- Use `picture`/`srcset` in markup when the slot’s rendered width changes by breakpoint; keep each candidate within **intrinsic ≤ rendered × 2.0** for that breakpoint (see image-delivery rule).
- Reference raster files only via project-local paths (for example `app/img/...`); do not leave Figma MCP or other temporary remote URLs in templates.
- For repeated image slots (cards, galleries, avatars), prefer a macro or shared partial that centralizes `src`/`srcset`, `sizes`, `loading`, `width`/`height`, and `alt` — do not copy diverging `<img>` blocks across loops.
- In data-driven loops, pass image fields (`src`, optional `srcset`/`sizes`, dimensions, `alt`, `loading`) in fixture `{% set %}` literals; avoid hard-coding oversized assets in markup when the macro can select the correct file.
- Decorative images: `alt=""` and `role="presentation"` only when appropriate per accessibility rule; informative images need descriptive `alt` from data or copy.

**Verification:**

- `rg '<img' app/**/*.njk` — each tag has `loading=` and `alt`; LCP/hero candidates use `loading="eager"` where intended.
- New or changed raster under `app/img/` meets image-delivery rule (≤ 2× rendered); run `performance-checklist` and confirm PSI **“Properly size images”** is green for touched pages.
- `npm run build` succeeds; built `dist/**/*.html` has no empty `src` or broken image paths.

## Reuse Rules

- If a block appears more than once, extract to partial or macro.
- If only content varies, pass data instead of cloning markup.

## Fixture and mock data

Hybrid policy: page-level mock may live in JSON; partials and mixins stay in `{% set %}`. This is not production data storage.

### JSON (pages and shared defaults)

- **Large page fixtures** (arrays, nested objects, long copy) → co-located `app/<page>.json` next to `app/<page>.njk` (same basename). Gulp merges automatically when the file exists.
- **Cross-page defaults** (`lang`, `siteName`, etc.) → `app/shared/*.json`. Shallow merge: all `shared/*.json` in alphabetical order, then co-located page JSON (page wins on top-level key conflicts).
- **Small page fields** (1–3 simple values such as `title`, flags) — `{% set %}` at the top of the page `.njk` is still allowed.
- **`{% set %}` on a page overrides** the same key from JSON (intentional override; avoid duplicating without need).
- **Shallow merge only:** do not expect nested objects to merge across `shared/` and page JSON — nested keys are replaced whole.
- Do not duplicate the same top-level key across multiple `shared/*.json` files.
- See [`app/shared/README.md`](../../app/shared/README.md) for the layer order.

### `{% set %}` (partials, mixins, small page fields)

- **Partials (`njk-parts/_*.njk`):** mock data **only** via `{% set %}` — **no** JSON for partials (partials are not gulp HTML entry points; co-located partial JSON is not loaded).
- **Mixins (`_mixins.njk`):** layout constants (sizes, class strings) **only** via `{% set %}` — **no** JSON.
- **Close to consumption (preferred for partials):** declare data in the partial or include file that contains the markup and loops.
- **Parent before include (allowed):** when the same markup is included multiple times with different content, you may `{% set %}` in the caller **immediately before** `{% include %}`. Use full literals, not picks from a shared list by index or indirect reference.
- **Include modifier (preferred for minor differences):** when the same partial differs only in presentation (extra class, layout variant), pass an explicit parameter at include time — `{% set %}` immediately before `{% include %}`, or `{% include … with { … } %}` (string, flag, short enum). Keep one simple branch in the partial; no fake counters. Duplicate the whole partial only when markup structure meaningfully differs.
- **Avoid for prototypes:** master catalog in root layout wired by index/key; data-only partials; index/modulo tricks for visual alternation instead of an explicit modifier.
- **Scope:** `{% set %}` inside `{% include %}` does not leak to the parent.
- **Do not** add partials whose sole purpose is `{% set %}`: `{% set %}` inside `{% include %}` does **not** export variables to the parent scope.
- **Do not** use `manageEnv` / `addGlobal` in gulp for fixtures — see [`gulpfile-universal-starter.RULE.md`](gulpfile-universal-starter.RULE.md).
- **Formatting `{% set %}` literals (required):** use expanded, readable structure — not one-line object blobs.
  - Opening `[` on the same line as `{% set name =`; each array element on its own line.
  - Each object literal `{ ... }` is **multiline**: one key–value pair per line, **2-space indent** per nesting level (array → object → nested array).
  - Nested arrays (e.g. `tags`) are multiline with one item per line when there are two or more items.
  - Trailing comma after the last element is allowed; keep a blank line before `] %}` only when it aids readability in large fixtures.
  - **Do not** squeeze an entire record into a single line when it has more than two fields.
- **Prettier:** the Nunjucks/HTML parser **must not** reformat multiline fixture `{% set %}` blocks (it collapses objects into unreadable wrapped lines). List those templates in [`.prettierignore`](../../.prettierignore). Do **not** run `prettier --write` on ignored files; hand-format per the rules above.
- **Verification:** `gulpData(getTemplateData)` in [`gulpfile.js`](../../gulpfile.js); no domain-specific `require()` of fixture JSON and no `manageEnv`/`addGlobal`; fixture `{% set %}` blocks follow the multiline layout above; `app/shared/*.json` and co-located `app/*.json` pass `format:check`; after `npm run build`, data-driven blocks in `dist/*.html` render non-empty content.

## Partial Extraction Threshold (do not over-split)

- **Do not create** a new `app/njk-parts/_*.njk` partial when the markup is included from **exactly one** parent and there is **no confirmed second consumer** in the current task scope.
- **Keep markup inline** in the parent template when the block is **tightly coupled** to that parent (e.g. a search modal opened only from the site header, a single-use drawer tied to one toolbar).
- **Extract to a partial or macro** when at least one of these applies:
  - the same markup is (or will imminently be) `{% include %}`’d or imported from **two or more** templates or layouts;
  - the block is a **reusable product unit** (card, breadcrumb trail, ad slot) driven by data/macros across pages;
  - the parent file becomes hard to navigate **and** the chunk is a **named, testable region** (not a one-off subsection of a single component).
- **Do not extract** “for cleanliness” alone: a partial with a single `{% include %}` in one file adds indirection without reuse benefit.
- **Prefer a macro** over a partial when the pattern repeats with different data in the same or several files but the outer wrapper stays in the caller.
- **Shell partials** (`_header.njk`, `_footer.njk`, layouts) remain valid: they are included from the root layout and represent global chrome, not single-use fragments.
- **Verification:** before adding `_something.njk`, state the **include sites** (file paths). If there is only one, inline unless the task brief or an approved plan explicitly requires a separate file (e.g. parallel ownership, generated include list).

## Tailwind class names in markup (content scan)

- **Do not** build Tailwind or project component class names by interpolating Nunjucks variables into the `class` attribute (for example `site-footer-column-{{ loop.index }}`, `{{ column.modifierClass }}`, or `{{ classes[loop.index0] }}`). Tailwind’s content scanner reads **literal** strings in `app/**/*.njk`; dynamic fragments are invisible at build time, so matching `@apply` rules in SCSS may be purged and styles silently missing in `dist/css`.
- **Do** keep loops for **data** (labels, links, copy); bind **layout/modifier** classes with explicit literals the scanner can see:
  - a fixed `{% if %} / {% elif %}` branch per known modifier (`site-footer-column-1`, `site-footer-column-2`, …);
  - separate markup blocks when structure differs;
  - or atomic Tailwind utilities composed in markup when the set is truly dynamic (see [`tailwind-usage-policy.RULE.md`](tailwind-usage-policy.RULE.md)).
- **Do not** paper over missing literals with `safelist` in `tailwind.config.js` when the fix belongs in templates — reserve safelist for third-party or generated markup outside `app/**/*.njk`.
- Pair each authored modifier class in markup with a named rule in project SCSS (`@layer components`, `@apply` per [`tailwind-usage-policy.RULE.md`](tailwind-usage-policy.RULE.md)); do not replace `@apply` with raw CSS solely to dodge purge — fix class literals in templates instead.
- **Verification:** new/changed modifier classes appear as **full literal substrings** in `app/**/*.njk` (`rg 'site-footer-column-[123]' app/**/*.njk` or project-specific names); `npm run build` succeeds; built `dist/css/*.css` contains the modifier selectors; no new `safelist` entries for classes that should be visible in templates.
