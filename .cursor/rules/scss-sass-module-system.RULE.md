---
description: Use Sass module system (@use / @forward) in SCSS — never deprecated @import.
alwaysApply: true
---

# SCSS And Sass Modules

- In project `.scss` files, **do not use** Sass **`@import`**. Dart Sass deprecates `@import`; use **`@use`** and **`@forward`** exclusively.
- Use **`@use "partial"`** (or **`@use "partial" as *`** only when intentionally exposing members without a namespace) to load partials and share variables, mixins, and functions.
- Use **`@forward`** when a barrel partial re-exports members for other entrypoints; avoid reintroducing global pollution patterns that `@import` encouraged.
- In Sass **entry files** assembled by gulp (`app/scss/*.scss`), place **every `@use` / `@forward` before any `@tailwind` directive or other emitted CSS rules** — required by Sass. Project pattern: typography lives in `_typography.scss` as `@layer base { ... }` and is `@use`d at the top of `style.scss` before `@tailwind`; layers merge correctly in the Tailwind postcss pipeline (`app/scss/style.scss`).
- **CSS custom properties:** do not leave **unused** `--tokens` in authored SCSS: if you write `var(--foo, fallback)` but `--foo` is never set on `:root`, a parent component, or via inline style in templates, **drop** the variable and use the resolved value (or define `--foo` where it is actually set). Avoid “placeholder” custom properties that never ship a setter.
- **Verification:** `rg '@import\\b' app/scss` returns no matches in authored SCSS; `npm run build` (or `gulp build`) completes without Sass `@import` deprecation warnings for project files; quick scan for `var(--` should not show dead custom properties without definitions.
