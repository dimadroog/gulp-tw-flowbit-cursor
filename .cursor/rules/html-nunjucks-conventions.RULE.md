---
description: HTML and Nunjucks authoring conventions for reusable templates.
alwaysApply: true
---

# HTML And Nunjucks Conventions

- Use Nunjucks loops/macros/includes for repeated card/list/grid patterns.
- Keep template fragments small and purpose-based (section, card, nav, media).
- Prefer data-driven rendering over duplicated HTML blocks.
- Keep attribute naming and content structure consistent across loops.
- Add brief comments only when exceptions or non-obvious constraints exist.
- When an element has both visual and JS hook classes, place `js-*` classes after all visual classes in the `class` attribute.
- For utility-heavy markup, keep atomic classes in the canonical `prettier-plugin-tailwindcss` order.
- Keep heading hierarchy valid (`h1` -> `h2` -> `h3`) without skipping levels in document structure.
- Treat `section` and `article` as titled regions: include a meaningful heading inside each.
- Default page language is Russian: use `<html lang="ru">` unless the task explicitly requires another locale.
- Use only this viewport declaration: `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- Keep meta placeholders for new pages when final SEO content is not provided:
  - `<meta name="description" content="description">`
  - `<meta name="keywords" content="keywords">`
- Set `<title>` to match the page name used in the page registry (`app/index.html`) unless a different title is explicitly requested.

## Reuse Rules

- If a block appears more than once, extract to partial or macro.
- If only content varies, pass data instead of cloning markup.
