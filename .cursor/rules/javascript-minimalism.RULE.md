---
description: Framework-first JS; js-* hooks for classes and ids in custom JS; Flowbite data-API id exceptions.
alwaysApply: false
globs:
  - app/js/**
  - app/**/*.njk
---

# JavaScript Minimalism Policy

- Default interaction library for this project: `Flowbite` (MIT, open-source).
- Before writing custom JS, check whether the required pattern exists in the chosen framework/library API.
- For accordion, modal, offcanvas, tabs, dropdown, and similar patterns, use framework-native components first.
- Add custom JS only when framework capabilities are clearly insufficient.

## Flowbite-First Coverage

- Use Flowbite data attributes/API as the default for: modal, collapse, accordion, drawer/offcanvas, dropdown, tabs, tooltip.
- Keep custom wrappers/helpers small and reusable instead of page-local one-off scripts.

## Gaps Policy

- `scrollspy`: use the internal IntersectionObserver helper with `data-scrollspy-nav` before considering third-party add-ons.
- Searchable/custom select: do not add a global select library by default.
- Add a lightweight select plugin only for pages/features where searchable select is a hard requirement.
- When introducing such plugin, scope initialization by selector and document the reason.

## JS Hook Naming (classes and ids)

Applies to **custom JavaScript** in `app/js/**` and inline init scripts. Visual styling stays on semantic/BEM/Tailwind classes.

### Selectors in custom JS

- **Prefer `js-*` classes** — `querySelector('.js-…')`, delegation from a `js-*` root, or `closest('.js-…')` when this does not overcomplicate the code.
- **`id` with `js-` prefix** — use `getElementById('js-…')` / `#js-…` only when a class hook is awkward (e.g. no stable wrapper, strict pairing with `for`/`aria-*` on the same node).
- Do not use the same element as both a `js-*` class hook and a redundant parallel hook without reason.
- **`js-*` is for behavior only** — never style `js-*` or `#js-*` in SCSS/CSS.

### When `id` without `js-` is allowed

| Case | Example | Condition |
|------|---------|-----------|
| Library / data-API contract | `id="site-search-modal"`, `data-modal-target="site-search-modal"` | The id string appears in **framework `data-*` attributes**; **custom JS must not** select that node via `#site-search-modal` or `getElementById('site-search-modal')` |
| Accessibility / labels | `id="site-search-modal-title"`, `for="…"` | Not a JS behavior hook |
| Anchors / content | `id="…"` in `href` on the same page | Not referenced in `app/js`; stub cross-page links use `href="#"` per [`html-nunjucks-conventions.RULE.md`](html-nunjucks-conventions.RULE.md) § Link href |
| JS-only `<a>` (no navigation) | `href="javascript:;"` | Not `href="#"`; see html-nunjucks § Link href |

**Flowbite pattern in this repo:** keep a stable **non-`js-` `id`** for `data-modal-*` / `data-drawer-*` contracts; wire **custom** behavior via `js-*` classes and/or `data-modal-hide` / `data-modal-toggle` triggers — not `getElementById` on the library id.

### Verification

- Grep `app/js/**`: no `getElementById`, `querySelector('#…')`, or `` querySelector(`#${…}`) `` on ids **without** the `js-` prefix unless the task report documents an approved exception.
- Grep `app/scss/**`: no selectors targeting `.js-` or `#js-`.
- Markup: custom JS hooks use `js-*` classes; ids without `js-` are not used as custom JS selectors.

## Decision Gate

1. Identify required interaction.
2. Confirm matching framework component or plugin.
3. Implement with framework API by default.
4. If custom JS is necessary, record why framework behavior is insufficient.
