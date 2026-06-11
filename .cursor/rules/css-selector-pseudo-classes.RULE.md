---
description: Prefer plain CSS selectors and semantic classes over :where() and :is() unless a documented cascade reason exists.
alwaysApply: true
globs:
  - app/scss/**
---

# CSS Selectors — Plain Lists Over `:where` / `:is`

## Policy

- **Default:** write selectors as **normal comma-separated lists** of elements, classes, and attribute filters — e.g. `h1`, `h2`, `ul`, `a`, `.link-plain`, `blockquote cite`.
- **Do not wrap** selectors in **`:where()`** or **`:is()`** “for convenience” or to mimic zero-specificity resets.
- **Semantic classes** (`.btn`, `.link-plain`, BEM blocks) stay the primary way to scope component styles; bare element rules live in **`app/scss/_typography.scss`** (`@layer base`) or documented global base — see [`tailwind-usage-policy.RULE.md`](tailwind-usage-policy.RULE.md).

## Why (project-specific)

- **`:where()` zeroes specificity.** Tailwind Preflight uses plain element selectors (`h1`, `p`, `ul`, `ol`). A rule like `:where(h1) { font-size: 40px }` **loses** to `h1 { font-size: inherit }` even when it appears later in the file — typography will look “unapplied” in the browser.
- **`:is()`** changes specificity to the **most specific** argument in the list; it is easy to misread in reviews and does not replace a clear class or a short explicit selector list.

## When pseudo-class wrappers are allowed

Use **`:where()` / `:is()`** only when **all** apply:

1. The task brief or an **inline SCSS comment** states the cascade goal (e.g. “must not beat `.article-title` on `h1`” — prefer a **class on the header** instead when possible).
2. You verified in **compiled CSS** (DevTools or `dist/css/style.css`) that the rule **wins** over Preflight and component classes for the properties you set.
3. A plain selector list or a scoped class **cannot** achieve the same behavior without duplication.

If the goal is only “don’t override buttons with global `button` styles”, use **`.btn`** / form classes from `_components.scss`, not `:where(button)`.

## Authoring patterns (preferred)

```scss
/* Good — @layer base, plain elements, later in the bundle than Preflight */
h1 {
  @apply font-display text-[40px] …;
}
a {
  @apply text-blue-700 underline …;
}
.link-plain {
  @apply text-inherit no-underline …;
}

/* Avoid — loses to Preflight for font-size, margins, list-style */
:where(h1) {
  @apply font-display text-[40px] …;
}
```

## Verification (before marking SCSS done)

- [ ] `rg ':where\\(|:is\\(' app/scss` — **no matches**, or each match has a **comment** citing the allowed exception and property checked in DevTools.
- [ ] New global typography rules use **plain** `h1`–`h6`, `p`, `ul`/`ol`, `a`, `blockquote`, `table`; UI chrome links use **`.link-plain`**, UI lists use **`list-none`** in markup — not `:where(…)`.
- [ ] `npm run build` completes; spot-check article body (bare `ul`/`ol`/`a`) and header/footer links if typography changed.

## Related rules

- [`css-inheritance-layout.RULE.md`](css-inheritance-layout.RULE.md) — inheritance vs repeating stacks on descendants.
- [`scss-sass-module-system.RULE.md`](scss-sass-module-system.RULE.md) — `@use` order with `@tailwind` and `_typography.scss`.
