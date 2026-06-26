---
description: Tailwind utility-first policy, @apply extraction criteria, thin-modifier avoidance, and required semantic components (.btn, .form-*, .container).
alwaysApply: true
globs:
  - app/**/*
  - tailwind.config.js
---

# Tailwind Usage Policy

- Use utility-first Tailwind classes as the default styling approach.
- Prefer tokenized spacing, typography, radius, and color utilities over ad-hoc values.
- Compose sections with reusable utility patterns before introducing custom CSS.
- For typography and color inside component trees, follow [`css-inheritance-layout.RULE.md`](css-inheritance-layout.RULE.md): set inheritable properties on ancestors, override only deltas.
- For layout mode, width/height, flex distribution, and control sizing, follow [`layout-sizing-and-flex.RULE.md`](layout-sizing-and-flex.RULE.md): flex before grid, padding-based controls, `flex-[*_*_*]` shorthand.

## When To Use `@apply` Vs Atomic Utilities

**Empirical rule:** repeats + semantic role + needs centralized updates → extract; unique, highly variable, or context-bound → keep atomic.

### Use `@apply` (named component class)

- **Repeatability:** the same utility stack appears in **≥2–3** places — extract to a class.
- **Semantics:** give the set a meaningful name (`.btn`, `.card`, `.form-field`) for clarity and consistency; avoid visual names (`.blue-button`).
- **Maintainability:** colors, spacing, and states should change in one place (`app/css/components.css`).
- **Stable variations:** base stack is stable; variants via modifiers (`.btn-primary`, `.btn--outline`) or scoped utilities in markup.
- **Coherent blocks:** utilities form a logical unit (layout shell, control chrome, visual token).
- **Markup length:** long class lists hurt readability — extract the base set.

### Do not use `@apply` (keep atomic utilities)

- **One-off styling:** unique to a single place and unlikely to repeat.
- **Many small variations:** each instance differs strongly — atomic utilities stay flexible.
- **Context-dependent combos:** classes change dynamically in templates (conditional Nunjucks utilities).
- **Cascade debugging:** seeing exact utilities in markup helps trace specificity issues.
- **Tailwind variant caveats:** responsive/state utilities and Preline custom variants (`hs-dropdown-open:`, etc.) belong in markup or plain CSS — not Sass `@screen` / `@variants`.
- **Small deltas:** a variant that differs from its base by **≤2 utilities** stays in markup — see **CSS modifiers** below; do not add a CSS class for it.

### CSS modifiers — markup utilities for small deltas

- When a **variant** of a semantic block differs from its base by **≤2 Tailwind utility classes** (one color tweak, one spacing step, `hidden`, a single alignment utility), **do not** add a new CSS modifier — append the utilities **in markup** next to the base class (e.g. `class="site-header-nav-link text-brand"`, not `.site-header-nav-link-active { @apply text-brand; }`).
- **Forbidden thin wrappers:** do **not** create a custom class whose `@apply` is **only one utility** (or one trivial alias). If extraction would yield only `@apply text-brand` or `@apply mt-4`, keep the utility in templates.
- **Use CSS modifier classes** (`.btn-primary`, `.is-active`, hyphen modifiers on block roots) when the delta is a **multi-utility stack**, needs **stateful selectors** (`:hover`, `[aria-invalid]`, `aria-expanded`), or the **same delta repeats in ≥2–3** places — per **Use `@apply`** above.
- **Mandatory semantic components** (`.btn`, `.form-control`, `.container`, …) keep their contract classes; this section governs **new** ad-hoc variants, not replacing required bases.
- **Exception:** pseudo-class / attribute selectors that markup alone cannot express (e.g. `.form-control[aria-invalid="true"]`) stay in CSS.

### Practical recipe

- Track repeats: at **2–3** occurrences, create a class; when unsure, extract.
- Name semantically (`.btn`, `.card`, `.kbd`, `.form-input`), not by color.
- Extract **only the base** stack; small per-instance deltas (**≤2 utilities**) stay as markup utilities — not new CSS modifiers (see **CSS modifiers** above).
- Prefer **Tailwind theme tokens** (`theme.extend`, project CSS variables) over hard-coded values inside `@apply`.
- Group new classes in **`@layer components`** in `components.css` with short section comments.
- For responsive/state: use Tailwind variants in markup/CSS, or combine a semantic base with utilities in markup.

### Example

```css
/* app/css/components.css — illustrative */
.btn {
  @apply inline-flex items-center justify-center rounded-lg px-4 py-2 text-base font-medium;
}
.btn-primary {
  @apply btn bg-primary text-primary-foreground hover:opacity-90;
}
```

In markup: `class="btn btn-primary"` instead of repeating the full utility string.

### Verification (`@apply` extractions)

- New `@apply` classes use **semantic** names, not visual ones (`rg '\.(blue|red)-' app/css/components.css` — no new matches).
- Templates do not duplicate long utility stacks where `components.css` already defines the semantic class.
- `npm run build` (or `gulp build`) completes without PostCSS/Tailwind `@apply` errors.
- Modifier/component classes used in markup must appear as **literal** strings in `app/**/*.njk` so Tailwind content scan retains matching `@apply` rules — see [`html-nunjucks-conventions.RULE.md`](html-nunjucks-conventions.RULE.md) § Tailwind class names in markup.
- No new CSS class with a **single-utility** `@apply` only (`rg -P '@apply\\s+\\w+(-[\\w\\[\\]%]+)?;\\s*\\}' app/css/components.css` — review hits; thin wrappers belong in markup).
- Variants that differ by **≤2 utilities** from an existing base use markup utilities, not a new modifier in `components.css`.

## Required Semantic Components (`@apply`)

Aligned with **typography in `components.css`**: project tokens as Tailwind utilities, grouped in **`@layer components`** via **`@apply`** (`app/css/components.css`). Markup prefers **semantic classes** instead of repeating long utility strings on every control. These are **mandatory** project contracts — not ad-hoc BEM escapes.

### Buttons

- **`button`** (and `a`/`input` acting as buttons) use base **`.btn`** plus a variant: **`.btn-primary`**, **`.btn-outline`**, **`.btn-dark`**, or future **`.btn-*`** modifiers defined next to the base in `app/css/components.css`.
- **Label presentation:** text inside **`.btn` / `.btn-*`** must **not** be underlined (including when the control is an **`a`** inheriting global link styles). Enforce in the **`.btn`** base **`@apply`** in **`app/css/components.css`** with **`no-underline`** (do not re-enable **`underline`** / **`decoration-*`** on button classes in templates unless the task brief documents an explicit “link-styled” exception outside the button system).
- **Verification:** **`app/css/components.css`** `.btn` includes **`no-underline`**; new **`a class="btn`** markup carries no extra underline utilities; grep for **`btn` + `underline`** in **`app/`** should be empty aside from documented exceptions.

### Form controls (native inputs)

- **Native form input elements** include **`input`** with **any** `type` (therefore also **`checkbox`** and **`radio`**), plus **`select`** and **`textarea`**. Use **`fieldset` / `legend`** when grouping makes sense and wire **`aria-invalid` / `aria-describedby`** consistently.
- **`label`** for stacked **`.form-control`** fields (**`input`/`select`/`textarea`**) must use **`.form-label`** (**`@apply`** next to controls in **`app/css/components.css`**). **`label`** paired with **`.form-check-input`** rows must use **`.form-check-label`**. Do not paste replicated Tailwind typography/spacing bundles on **`label`** elements in authored templates unless the brief documents an exception.
- **`.form-control`** (the **`@apply`** shell in **`app/css/components.css`**) is **only** for **text-like `input`**, **`select`**, and **`textarea`**. **`checkbox`** and **`radio`** must use **`.form-check-input`** (**`@apply`** in the same file). Add **`mt-1`** next to `.form-check-input` on checkbox rows when the label wrapper uses **`items-start`** alignment.
- **Error state:** **`.form-control[aria-invalid="true"]`** and **`.form-check-input[aria-invalid="true"]`** — derive invalid chrome from **`aria-invalid="true"`** only; do not duplicate red-border utility strings per template.
- **Verification:** labels use **`form-label`** / **`form-check-label`** as above; text/select/textarea use **`form-control`** + **`aria-invalid`** when invalid; **`checkbox`** / **`radio`** use **`form-check-input`** + **`aria-invalid`** when invalid (never `form-control`).

### Content belt

- Main page content that should share the standard content width is wrapped in **`.container`** (`app/css/components.css`: **`max-w-content`**, **`px-6`**, **`mx-auto`**). The built-in Tailwind **`container`** utility is **disabled** (`corePlugins.container: false`) so only this semantic class emits.
- Root layout wraps **`{% block content %}`** in **`.container`** (`app/njk-layouts/_main.njk`); inner pages should not nest a second full-width container unless the design requires it.

### Authoring flow

- When adjusting **`.btn-*`**, **`.form-label`**, **`.form-check-label`**, **`.form-control`**, or **`.form-check-input`**, change **`app/css/components.css`** only — do not fork divergent utility stacks in templates.
- **Third-party caveat:** if Preline or external markup requires raw utilities, document a one-line exception in the task report and keep the default pattern for project-authored controls.

## BEM And Custom CSS Exceptions

- Other BEM/custom classes are allowed only when utility composition cannot satisfy the requirement (see **When To Use `@apply`** above for new extractions).
- When using BEM/custom CSS, add a short reason in code comments or PR notes.
- Keep exception scope minimal and local to the problematic component.

## Custom CSS Property Order

- In custom CSS blocks, sort properties from global layout impact to local styling details.
- Recommended order:
  1. Positioning and flow: `position`, `top/right/bottom/left`, `float`, `clear`, `z-index`.
  2. Box size and spacing: `width/height`, `margin`, `padding`.
  3. Border and related edge properties.
  4. Content and behavior: `list-style`, `overflow`, and similar properties.
  5. Visual and typography styling: `background`, `color`, `font`, and decorative properties.
- Use the guiding principle: from general/high-impact to local/less critical details.

## Atomic Class Order In Markup

- Keep utility classes ordered according to the canonical `prettier-plugin-tailwindcss` sorting logic.
- Treat plugin order as the source of truth; avoid maintaining parallel custom sort rules.
- Even when the plugin is not installed, write class lists in the same canonical order for consistency.
- Keep `js-*` classes as behavior hooks and place them after utility classes when this does not conflict with automatic formatting.
- **Hover/focus and expand motion durations** for project-authored surfaces follow [`rules/interactive-transition-timing.RULE.md`](interactive-transition-timing.RULE.md).

## Form Controls — Entered Text (1rem)

- Prefer **`.form-control`** on text-like `input` / `select` / `textarea` (see **Form controls** above) rather than repeating the full utility string; it enforces **`text-base` (~1rem)** for typed/selected text or placeholder.
- Otherwise, for native controls where **the user-visible value or placeholder typography** applies (text-like `input` types*, `select`, `textarea`), set **`font-size: 1rem`** (blocking for layout work unless the brief documents an intentional exception).
- If not using `.form-control`, use **`text-base`** while this repo keeps the default `theme.fontSize` scale where `base === 1rem`; do **not** use smaller/larger typography utilities (`text-sm`, `text-lg`, etc.) solely to resize typed text in those controls.
- If `tailwind.config.js` ever changes `fontSize.base` away from `1rem`, reconcile by restoring `base` to `1rem` for typed controls or applying an explicit **`text-[1rem]`** on those controls so this policy stays satisfied.

*`type` values where the policy targets **glyph-sized** user text, not the intrinsic control chrome: e.g. **`range`**, **`file`**, **`checkbox`**, **`radio`**, **`button`**, **`submit`** follow layout/a11y grouping in **Form controls** above but do **not** use `.form-control`; size their hit targets and labels per component rules, not the **1rem typed-text** requirement.
