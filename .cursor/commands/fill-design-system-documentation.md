# fill-design-system-documentation

Review and progressively populate **`app/design-system.njk`** — the live design-system showcase page — for the sections below.

## Source of truth

- Primary source: `app/design-system.njk`
- Optional build check: `dist/design-system.html`

## Task

Produce structured documentation for each section with:

1. Short section purpose
2. Related UI elements and classes
3. Usage examples (at least one)
4. Constraints, states, and accessibility notes

## Sections to cover

1. Color palette
2. Spacing system
3. Typography:
   - Fonts
     - Families (accent, primary)
     - Sizes
     - Weights
   - Headings (`h1`-`h6`)
   - Paragraphs
   - Lists (ordered, unordered)
   - Quotes (`blockquote`)
   - Tables
4. Links
5. Buttons
6. Input elements:
   - Fields
   - Selects
   - Checkboxes
   - Radio controls
   - `range-sliders`
7. Image aspect ratios

## Writing rules

- Document only what is confirmed in `design-system.njk` (or `design-system.html` after build).
- If a section is only partially represented, add `TODO` entries and list missing data.
- For tables, explicitly state that the example is commented out in current `design-system.njk`, and add a `TODO` for an active example.
- For font settings, do not invent values; if `design-system.njk` has no explicit token/family data, add `TODO` and point to required source (`app/css/fonts.css` or design tokens).
- Add concise a11y notes for each interactive element (label, focus, `aria`, state behavior).

## Expected output

- Updated **`app/design-system.njk`** with live HTML examples and section headings for all areas below (build → `dist/design-system.html`).
- In the task report, each section includes a status:
  - `complete` - fully documented from `design-system.njk`
  - `partial` - partly documented, with explicit `TODO`
  - `missing` - no source data in `design-system.njk`

## Acceptance criteria

- All 7 requested sections are present.
- Each section has at least one example.
- All data gaps are marked as `TODO` without assumptions.
