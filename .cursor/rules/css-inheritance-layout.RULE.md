---
description: CSS inheritance hierarchy for layout — set typography on ancestors, override only deltas, explicit box model on each element.
alwaysApply: false
globs:
  - app/scss/**
---

# CSS Inheritance for Layout

Use the cascade so **descendants pick up typography and color from ancestors** instead of repeating the same utilities or `@apply` bundles on every nested selector.

## Project baseline (level 1)

- **Document root:** `html { font-size: var(--font-size); }` in `app/scss/_components.scss` (`@layer base`).
- **Body defaults:** `body` sets `font-sans`, `text-foreground`, `background`, `antialiased` once — all in-page text inherits unless overridden.
- **Heading scale:** `h1`–`h4` in `@layer base` override only size/weight/line-height where the design contract differs from body; do not re-declare `font-family` on each heading if it matches body.
- **Tokens:** colors and type sizes come from `app/scss/_variables.scss` and `tailwind.config.js` — prefer inheritance + token utilities over hard-coded hex on every child.

## What inherits (set high, override low)

Typical **inherited** properties — declare on the **nearest meaningful ancestor** (body, section wrapper, BEM block root, `.card`, `table`, `form`):

- `font-family`, `font-size`, `font-weight`, `font-style`
- `color`, `line-height`, `text-align`
- `letter-spacing`, `word-spacing`, `text-transform`
- `opacity`, `visibility`, `cursor` (when intentional for the whole subtree)

**Override only the delta** on descendants (e.g. `h2` darker `color`, link `text-brand`, active nav `text-brand`).

## What does not inherit (always explicit)

Set on **each element** that needs them — never assume propagation:

- `margin`, `padding`
- `border` (and radius when not using a shared utility on the element itself)
- `width`, `height`, `min-*`, `max-*`
- `background` / `background-color`
- `display`, `position`, `flex`/`grid` layout, `gap`
- `box-shadow`

## Levels (authoring order)

1. **Global** — `body` / `@layer base` in `_components.scss`.
2. **Layout belt** — `.container` (width/padding only; typography inherits from body).
3. **Component block** — BEM root (e.g. `.site-header`, `.card`): set shared `font-family`, `color`, `font-size`, `line-height` **once** on the block if the whole subtree shares them.
4. **Elements** — headings, links, labels inside the block: change only what differs; avoid repeating inherited text properties.

## Forms and replaced elements

- Native controls (`input`, `select`, `textarea`) may **not** inherit font/size from parent in all browsers — when they must match the surrounding text context, use **`font-family: inherit`**, **`font-size: inherit`**, **`color: inherit`** (or project **`.form-control`** / **`text-base`** per [`tailwind-usage-policy.RULE.md`](tailwind-usage-policy.RULE.md)).
- Do not rely on inheritance alone for **focus rings**, **borders**, or **padding** on controls.

## `inherit` and `initial`

- **`inherit`** — child should match parent explicitly (e.g. link color inside a tinted card when design requires it).
- **`initial`** — reset to UA default only when inheritance causes a bug; document the reason in a short SCSS comment.

## Tailwind / `@apply` in this repo

- Prefer **plain selector lists** and semantic classes over `:where()` / `:is()` unless a documented cascade exception applies — see [`css-selector-pseudo-classes.RULE.md`](css-selector-pseudo-classes.RULE.md).
- Prefer **one** `@apply` text stack on a **parent** semantic class; children use modifiers (`.is-active`, `.site-header-logo-dot`) for deltas.
- Do not paste identical `text-14 text-neutral-800` (or equivalent) on every nested `a`/`span` if they already sit under a block that set the same values.
- Utility strings in Nunjucks are for **layout and exceptions**, not for re-stating inherited typography on each node.

## Verification (before marking section done)

- [ ] Base typography lives on `body` / block root, not duplicated on three+ nested selectors without a design reason.
- [ ] Spacing and borders are set on the elements that own the box, not assumed from parents.
- [ ] New SCSS does not repeat `font-family` / `font-size` / `color` / `line-height` on children that already inherit the same values from an ancestor in the same block.
- [ ] Form fields either use `.form-control` / documented utilities or explicit `inherit` where matching parent text is required.
