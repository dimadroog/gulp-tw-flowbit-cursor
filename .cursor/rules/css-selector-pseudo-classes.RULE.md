---
description: Prefer plain CSS selectors and semantic classes over :where(), :is(), :not(), and :has() unless a documented cascade reason exists.
alwaysApply: true
globs:
  - app/css/**
---

# CSS Selectors — Plain Lists Over `:where` / `:is` / `:not` / `:has`

## Policy

- **Default:** write selectors as **normal comma-separated lists** of elements, classes, and attribute filters — e.g. `h1`, `h2`, `ul`, `a`, `.link-plain`, `blockquote cite`.
- **Do not use** **`:where()`**, **`:is()`**, **`:not()`**, or **`:has()`** “for convenience”, to exclude chrome from global element rules, or to mimic cascade resets.
- **Semantic classes** (`.btn`, `.link-plain`, BEM blocks) stay the primary way to scope component styles; bare element rules live in **`app/css/components.css`** (`@layer base`) or documented global base — see [`tailwind-usage-policy.RULE.md`](tailwind-usage-policy.RULE.md).

## Why (project-specific)

- **`:where()` zeroes specificity.** Tailwind Preflight uses plain element selectors (`h1`, `p`, `ul`, `ol`). A rule like `:where(h1) { font-size: 40px }` **loses** to `h1 { font-size: inherit }` even when it appears later in the file — typography will look “unapplied” in the browser.
- **`:is()`** changes specificity to the **most specific** argument in the list; it is easy to misread in reviews and does not replace a clear class or a short explicit selector list.
- **`:not()`** hides coupling inside the global selector (`a:not(.btn)`). Prefer **overriding on the component** (`.btn-primary { @apply text-white hover:text-white; }`) so bare `a` stays plain and button colors win on rest and `:hover`.
- **`:has()`** couples ancestors to descendant structure; brittle under markup changes and harder to review than an explicit class on the element that needs the style.

## When these pseudo-class wrappers are allowed

Use **`:where()` / `:is()` / `:not()` / `:has()`** only when **all** apply:

1. The task brief or an **inline CSS comment** states the cascade goal (e.g. “must not beat `.article-title` on `h1`” — prefer a **class on the header** instead when possible).
2. You verified in **compiled CSS** (DevTools or `dist/css/style.css`) that the rule **wins** over Preflight and component classes for the properties you set.
3. A plain selector list or a scoped class **cannot** achieve the same behavior without duplication.

If the goal is only “don’t override buttons with global `a` / `button` styles”, set colors (including **`:hover` / `dark:`**) on **`.btn` / `.btn-*` / `.btn-icon`** in `components.css`, not `:not(.btn)` on the element rule and not `:where(button)`.

**Exempt (not hand-authored element styling):** Tailwind **`@custom-variant`** / plugin selectors that require `:is()` (e.g. `dark (&:is([data-theme="winter"] *))` in `theme.css`).

## Authoring patterns (preferred)

```css
/* Good — plain elements + component overrides beat a / a:hover */
a {
  @apply text-crimson underline …;
}
.btn-primary {
  @apply bg-crimson text-white hover:text-white …;
}
.link-plain {
  @apply text-inherit no-underline …;
}

/* Avoid — :where loses to Preflight; :not hides button coupling in the link rule */
:where(h1) {
  @apply font-display text-[40px] …;
}
a:not(.btn, .btn-icon) {
  @apply text-crimson …;
}
```

## Verification (before marking CSS done)

- [ ] `rg ':where\\(|:is\\(|:not\\(|:has\\(' app/css` — **no matches**, or each match is an **allowed exception** (documented comment, or Tailwind `@custom-variant` exempt above).
- [ ] New global typography rules use **plain** `h1`–`h6`, `p`, `ul`/`ol`, `a`, `blockquote`, `table`; UI chrome links use **`.link-plain`**, UI lists use **`list-none`** in markup — not `:where(…)`, `:not(…)`, or `:has(…)`.
- [ ] `a.btn` / `a.btn-*` text color comes from **`.btn-*`** (including hover), not from excluding buttons in the `a` rule.
- [ ] `npm run build` completes; spot-check article body (bare `ul`/`ol`/`a`) and header/footer links if typography changed.

## Related rules

- [`css-inheritance-layout.RULE.md`](css-inheritance-layout.RULE.md) — inheritance vs repeating stacks on descendants.
- [`css-authoring.RULE.md`](css-authoring.RULE.md) — plain CSS in `app/css/`, Tailwind 4 entry via `style.css`.
