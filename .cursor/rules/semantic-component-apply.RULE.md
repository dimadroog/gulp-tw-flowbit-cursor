---
description: Compose buttons, form labels, form controls (.form-control/.form-check-*), and .container belt with @apply-backed classes.
alwaysApply: true
---

# Semantic Components (`@apply`)

Aligned with **`_typography.scss`**: project tokens expressed as Tailwind utilities, grouped in SCSS **`@layer components`** via **`@apply`** (`app/scss/_components.scss`). Markup prefers **semantic classes** instead of repeating long utility strings on every control.

## Buttons

- **`button`** (and `a`/`input` acting as buttons) use base **`.btn`** plus a variant: **`.btn-primary`**, **`.btn-outline`**, **`.btn-muted`**, or future **`.btn-*`** modifiers defined next to the base in `_components.scss`.
- **Label presentation:** text inside **`.btn` / `.btn-*`** must **not** be underlined (including when the control is an **`a`** inheriting global link styles). Enforce in the **`.btn`** base **`@apply`** in **`_components.scss`** with **`no-underline`** (do not re-enable **`underline`** / **`decoration-*`** on button classes in templates unless the task brief documents an explicit “link-styled” exception outside the button system).
- **Verification:** **`_components.scss`** `.btn` includes **`no-underline`**; new **`a class="btn`** markup carries no extra underline utilities; grep for **`btn` + `underline`** in **`app/`** should be empty aside from documented exceptions.

## Form controls (native inputs)

- **Native form input elements** include **`input`** with **any** `type` (therefore also **`checkbox`** and **`radio`**), plus **`select`** and **`textarea`**. Use **`fieldset` / `legend`** when grouping makes sense and wire **`aria-invalid` / `aria-describedby`** consistently.
- **`label`** for stacked **`.form-control`** fields (**`input`/`select`/`textarea`**) must use **`.form-label`** (**`@apply`** next to controls in **`_components.scss`**). **`label`** paired with **`.form-check-input`** rows must use **`.form-check-label`**. Do not paste replicated Tailwind typography/spacing bundles on **`label`** elements in authored templates unless the brief documents an exception.
- **`.form-control`** (the **`@apply`** shell in **`_components.scss`**) is **only** for **text-like `input`**, **`select`**, and **`textarea`**. **`checkbox`** and **`radio`** must use **`.form-check-input`** (**`@apply`** in the same file). Add **`mt-1`** next to `.form-check-input` on checkbox rows when the label wrapper uses **`items-start`** alignment.
- **Error state:** **`.form-control[aria-invalid="true"]`** and **`.form-check-input[aria-invalid="true"]`** — derive invalid chrome from **`aria-invalid="true"`** only; do not duplicate red-border utility strings per template.
- **Verification:** labels use **`form-label`** / **`form-check-label`** as above; text/select/textarea use **`form-control`** + **`aria-invalid`** when invalid; **`checkbox`** / **`radio`** use **`form-check-input`** + **`aria-invalid`** when invalid (never `form-control`).

## Content belt

- Main page content that should share the standard content width is wrapped in **`.container`** (`app/scss/_components.scss`: **`max-w-5xl`**, horizontal padding Tailwind **`px-4`**, **`mx-auto`**). The built-in Tailwind **`container`** utility is **disabled** (`corePlugins.container: false`) so only this semantic class emits.
- Root layout wraps **`{% block content %}`** in **`.container`** (`app/njk-layouts/_main.njk`); inner pages should not nest a second full-width container unless the design requires it.

## Authoring flow

- When adjusting **`.btn-*`**, **`.form-label`**, **`.form-check-label`**, **`.form-control`**, or **`.form-check-input`**, change **`_components.scss`** only — do not fork divergent utility stacks in templates.
- **Third-party caveat:** if Flowbite or external markup requires raw utilities, document a one-line exception in the task report and keep the default pattern for project-authored controls.
