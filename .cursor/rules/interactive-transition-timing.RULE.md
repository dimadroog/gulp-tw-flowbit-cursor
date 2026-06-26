---
description: Standard transition duration (~0.2s) for hover/focus states; capped smooth motion for expand/collapse surfaces.
alwaysApply: true
globs:
  - app/css/**
  - app/js/**
---

# Interactive Transition Timing

- **Hover / focus-visible:** project-authored surfaces that change **`color`**, **`background-color`**, **`border-color`**, **`opacity`**, or **`box-shadow`** (including focus rings) on **`:hover`**, **`:focus`**, or **`:focus-visible`** must animate with a **default duration of ~0.2s** (**`200ms`**, **`ease-in-out`**) unless the task brief mandates instant feedback (explicitly documented).
- Implement via Tailwind (**`transition-colors duration-200 ease-in-out`**) or equivalent scoped utilities on **`app/css/components.css`** (`.btn`, `.form-control`, `.form-check-input`, etc.) and **prose/links** in **`components.css`**. Preserve **`prefers-reduced-motion`** respect when adding custom animation layers (suppress or shorten motion when `@media (prefers-reduced-motion: reduce)` applies — see `motion.css`).

## Expand / reveal interactions

- **Collapsible / disclosure / overlay open-close** animations (panels, drawers, accordion bodies, dropdown visibility, modal entry/exit authored in project CSS or Tailwind) must feel **smooth** but **short**: target **≤300ms**, with **200ms–300ms** as the repo default bracket; avoid **>400ms** durations for repetitive UI reveals unless waived in the brief.
- Preline open states: prefer **`hs-*-open:`** variants from `@preline/*/variants.css` with authored **`duration-*`** / **`transition-*`** utilities.

## Exceptions

- **Third-party primitives** (Preline bundled transitions) inherit library defaults unless a task replaces them — document one line in the report when library timing diverges intentionally.
- **Verification:** authored interactive classes expose **`duration-200`** (**`0.2s`**) lineage for hover/focus color/border/opacities; expandable patterns document **≤300ms** timing in CSS/HTML notes or Tailwind **`duration-*`**.
