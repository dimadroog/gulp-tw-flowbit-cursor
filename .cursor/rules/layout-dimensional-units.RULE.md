---
description: Layout dimensional units — custom spacing, container tokens, and flex-basis arbitrary values use px, not rem.
alwaysApply: true
globs:
  - app/css/**
  - tailwind.config.js
---

# Layout Dimensional Units (px)

Use **pixels (`px`)** for **custom layout dimensions** so values stay aligned with mockup exports and are readable without a `16px` mental conversion. This complements [`layout-sizing-and-flex.RULE.md`](layout-sizing-and-flex.RULE.md) (how to size) and [`tailwind-usage-policy.RULE.md`](tailwind-usage-policy.RULE.md) (semantic components).

## In scope — must use `px`

- **Arbitrary Tailwind spacing** in `app/css/` or templates: `p-[…]`, `m-[…]`, `gap-[…]`, `pt-[…]`, `pb-[…]`, `mt-[…]`, etc. when the value is not a standard scale utility (`py-16`, `gap-10`, …).
- **Arbitrary width / height / min-max** on layout shells: `w-[…]`, `h-[…]`, `min-w-[…]`, `max-w-[…]`, `rounded-[…]` when tied to mockup geometry.
- **Flex shorthand basis** in arbitrary form: `flex-[0_0_24px]`, not `flex-[0_0_1.5rem]` — see [`layout-sizing-and-flex.RULE.md`](layout-sizing-and-flex.RULE.md) § Flex shorthand syntax.
- **Theme layout tokens** in `tailwind.config.js` that define content width or fixed rails — e.g. `maxWidth.content` for `.container` / `max-w-content` — express as **`1234px`**, not `77.125rem`.
- **`calc()` operands** that encode layout gutters or rails from the mockup — e.g. `max-w-[calc(100%-87px)]`, not `calc(100% - 5.4375rem)`.

## Out of scope — keep as-is

- **Standard Tailwind scale utilities** (`py-16`, `gap-8`, `size-6`, `text-xl`, `leading-7`) — do not rewrite to arbitrary `px` unless the brief requires a non-scale value.
- **Typography for user-entered text** — `text-base` / `1rem` policy in [`tailwind-usage-policy.RULE.md`](tailwind-usage-policy.RULE.md) § Form Controls.
- **`em` / `%` / `0%`** where they express flex distribution (`flex-[1_1_0%]`) or relative typography — not mockup literal boxes.

## Authoring

- Take the **pixel value from the mockup or Figma inspect** and use it directly: `pb-[100px]`, `w-[133px]`, `flex-[0_0_24px]`.
- Do **not** convert mockup `px` → `rem` for arbitrary layout classes (`6.25rem` instead of `100px`).
- When a dimension is already on the Tailwind scale and matches the mockup, prefer the **scale utility** over an arbitrary duplicate (`pt-40` instead of `pt-[160px]` when both mean 160px at default config).

## Verification

- `rg '\[[^\]]*rem\]' app/css tailwind.config.js` — **zero matches** for new/changed layout arbitrary values (existing scale utilities like `text-base` in prose are fine).
- `maxWidth.content` (or equivalent) in `tailwind.config.js` is **`px`**, not `rem`.
- Flex-basis arbitrary values in `app/css/` use **`px`** when the basis is a fixed mockup box.
