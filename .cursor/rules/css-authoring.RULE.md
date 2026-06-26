---
description: Plain CSS authoring in app/css — @layer, no Sass; Tailwind 4 entry via style.css.
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
- **Verification:** `npm run build` completes without PostCSS/Tailwind errors; grep `app/css` for dead `var(--` placeholders without definitions.
