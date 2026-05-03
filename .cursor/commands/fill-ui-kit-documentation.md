# fill-ui-kit-documentation

Review `app/ui-kit.html` and progressively populate project documentation for the sections below.

## Source of truth

- Primary source: `app/ui-kit.html`
- Optional build check: `dist/ui-kit.html`

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

- Document only what is confirmed in `ui-kit.html`.
- If a section is only partially represented, add `TODO` entries and list missing data.
- For tables, explicitly state that the example is commented out in current `ui-kit.html`, and add a `TODO` for an active example.
- For font settings, do not invent values; if `ui-kit.html` has no explicit token/family data, add `TODO` and point to required source (`scss` or design tokens).
- Add concise a11y notes for each interactive element (label, focus, `aria`, state behavior).

## Expected output

- One markdown document with a table of contents covering all sections.
- Each section must include a status:
  - `complete` - fully documented from `ui-kit.html`
  - `partial` - partly documented, with explicit `TODO`
  - `missing` - no source data in `ui-kit.html`

## Acceptance criteria

- All 7 requested sections are present.
- Each section has at least one example.
- All data gaps are marked as `TODO` without assumptions.
