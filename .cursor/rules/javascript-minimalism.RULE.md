---
description: Framework-first JS; js-* hooks for classes and ids in custom JS; Preline data-API id exceptions.
alwaysApply: true
globs:
  - app/js/**
  - app/**/*.njk
---

# JavaScript Minimalism Policy

- Default interaction library for this project: **Preline** (`@preline/*`, MIT, modular).
- Before writing custom JS, check whether the required pattern exists in the chosen Preline module API.
- For accordion, modal, offcanvas, tabs, dropdown, and similar patterns, use Preline components first — wire the module via [`commands/add-preline-module.md`](../commands/add-preline-module.md) if not yet installed.
- Add custom JS only when Preline capabilities are clearly insufficient.

## Preline-First Coverage

- Use Preline `data-hs-*` attributes and `hs-*` markup as the default for: modal/drawer (`overlay`), dropdown, tabs, carousel, select, file-upload, accordion, collapse, tooltip (each via its `@preline/*` package when needed).
- Modules auto-init on `window.load`; avoid redundant manual `new HS*()` unless extending behavior.
- Keep custom wrappers/helpers small and reusable instead of page-local one-off scripts.

## Gaps Policy

- `scrollspy`: use the internal IntersectionObserver helper with `data-scrollspy-nav` before considering third-party add-ons.
- Searchable/custom select: do not add `@preline/select` globally by default — add per [`add-preline-module.md`](../commands/add-preline-module.md) only when a page requires it.
- When introducing select or other heavy modules, scope initialization by selector and document the reason.

## JS Hook Naming (classes and ids)

Applies to **custom JavaScript** in `app/js/**` and inline init scripts. Visual styling stays on semantic/BEM/Tailwind classes.

### Selectors in custom JS

- **Prefer `js-*` classes** — `querySelector('.js-…')`, delegation from a `js-*` root, or `closest('.js-…')` when this does not overcomplicate the code.
- **`id` with `js-` prefix** — use `getElementById('js-…')` / `#js-…` only when a class hook is awkward (e.g. no stable wrapper, strict pairing with `for`/`aria-*` on the same node).
- Do not use the same element as both a `js-*` class hook and a redundant parallel hook without reason.
- **`js-*` is for behavior only** — never style `js-*` or `#js-*` in CSS.

### When `id` without `js-` is allowed

| Case | Example | Condition |
|------|---------|-----------|
| Library / data-API contract | `id="site-search-modal"`, `data-hs-overlay="#site-search-modal"` | The id string appears in **Preline `data-hs-*` attributes**; **custom JS must not** select that node via `#site-search-modal` or `getElementById('site-search-modal')` |
| Accessibility / labels | `id="site-search-modal-title"`, `for="…"` | Not a JS behavior hook |
| Anchors / content | `id="…"` in `href` on the same page | Not referenced in `app/js`; stub cross-page links use `href="#"` per [`html-nunjucks-conventions.RULE.md`](html-nunjucks-conventions.RULE.md) § Link href |
| JS-only `<a>` (no navigation) | `href="javascript:;"` | Not `href="#"`; see html-nunjucks § Link href |

**Preline overlay pattern in this repo:** keep a stable **non-`js-` `id`** on the `hs-overlay` root for `data-hs-overlay="#…"` contracts; wire **custom** behavior via `js-*` classes — not `getElementById` on the overlay id.

### Verification

- Grep `app/js/**`: no `getElementById`, `querySelector('#…')`, or `` querySelector(`#${…}`) `` on ids **without** the `js-` prefix unless the task report documents an approved exception.
- Grep `app/css/**`: no selectors targeting `.js-` or `#js-`.
- Markup: custom JS hooks use `js-*` classes; ids without `js-` are not used as custom JS selectors.

## Decision Gate

1. Identify required interaction.
2. Confirm matching Preline module is installed (or run `add-preline-module`).
3. Implement with Preline API by default.
4. If custom JS is necessary, record why Preline behavior is insufficient.
