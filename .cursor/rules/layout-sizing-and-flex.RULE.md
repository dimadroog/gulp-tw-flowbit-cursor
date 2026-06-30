---
description: Layout sizing and flex — prefer flex over grid; avoid fixed width/height except images; padding-based controls; flex-[grow_shrink_basis] shorthand.
alwaysApply: true
globs:
  - app/**/*
---

# Layout Sizing and Flex

Prefer **content-driven, adaptive box sizing** over fixed pixel dimensions. This complements [`css-inheritance-layout.RULE.md`](css-inheritance-layout.RULE.md): non-inherited properties are set **on the element that needs them**, not copied as fixed `width`/`height` from a mockup export when flex, padding, or flow can achieve the same visual result.

## Avoid explicit width and height

- Do **not** set fixed `width` / `height` / `min-w-*` / `max-w-*` / `min-h-*` / `max-h-*` / `size-*` on generic layout or text elements unless there is a concrete reason.
- **Allowed without extra justification:**
  - **`img`** / **`picture`** / video placeholders — intrinsic sizing, CLS reservation (see [`image-delivery-and-optimization.RULE.md`](image-delivery-and-optimization.RULE.md), [`html-nunjucks-conventions.RULE.md`](html-nunjucks-conventions.RULE.md)).
  - **Content belt** — `.container` / `max-w-content` per [`tailwind-usage-policy.RULE.md`](tailwind-usage-policy.RULE.md).
  - **Icons** / decorative assets with a defined hit or glyph box when design mandates a fixed glyph size.
  - **Aspect-ratio locks** (`aspect-*`, `aspect-ratio`) for media slots — prefer over raw height when the slot is image-like.
- When mockup-driven work needs a dimension, **translate** exported pixels into tokens, padding stacks, flex basis, or `gap` — do not paste `w-[254px] h-[48px]` on every sibling because Figma shows those numbers (see **Mockup translation** below).

## Interactive controls — height via padding

For **buttons** (`.btn`), **nav/menu items**, **tabs**, and **native inputs** (`.form-control`, `.form-check-input`):

- Prefer **`padding`** / **`py-*` `px-*`** (inside `@apply` bases in `components.css` or markup utilities) to establish vertical rhythm and hit area — **not** a fixed `h-*` unless the brief documents a non-negotiable fixed control height.
- Align with existing semantic bases in [`tailwind-usage-policy.RULE.md`](tailwind-usage-policy.RULE.md) (`.btn` uses `inline-flex items-center` + padding, not `h-12` alone).

## Mockup translation (adaptive over literal copy)

- Do **not** copy fixed width/height from a design reference **as-is** when content can vary (longer labels, localization, dynamic counts).
- Match **visual outcome** at contract breakpoints ([`WORKFLOW.md`](../WORKFLOW.md) §1.2, [`pixel-perfect-delivery.RULE.md`](pixel-perfect-delivery.RULE.md)) using spacing tokens, flex distribution, and wrapping — not by freezing every box to export pixels.
- Fixed dimensions from the mockup are **hints** for gap, padding, and flex-basis choices, not mandatory literal `width`/`height` on every node.

## Flex before grid

- **Default:** build layout regions with **flex** (`flex`, `inline-flex`, `flex-col`, `flex-wrap`, `gap`, alignment utilities) when the structure is a single-axis flow or can be expressed as nested flex containers.
- **Do not** reach for **grid** (`grid`, `grid-cols-*`, `grid-rows-*`, `col-span-*`, `row-span-*`) when the same visual and responsive behavior is achievable with flex without fragile workarounds.
- **Use grid only when flex cannot** — for example:
  - a true **two-dimensional track template** (explicit rows **and** columns that must stay aligned independently of source order),
  - **overlapping** or named **grid areas** that would require absolute positioning or duplicate markup in flex,
  - **dense** tile/masonry-like placement where row/column spanning is simpler and more stable in grid than nested flex + calculated widths.
- Nested layout: prefer an outer flex shell with inner flex children; add an inner grid **only** on the subtree that needs 2D tracks — do not default the whole page shell to grid.
- When grid is justified, document the reason in a one-line CSS comment or task report (what flex could not express).

## Flex children — flex props before width

When an element participates in a **flex** row/column:

1. **Default:** omit `width` / `min-width` / `max-width` unless the layout breaks without them.
2. **Prefer** `flex-grow`, `flex-shrink`, and `flex-basis` (Tailwind: `grow`, `shrink`, `basis-*`, or the shorthand below) to express how the item shares space.
3. Use `width` / `min-w-*` / `max-w-*` only when flex alone cannot satisfy the design (e.g. true fixed sidebar rail, truncate column with `min-w-0` for overflow).

## Flex shorthand syntax (Tailwind)

- **Prefer** arbitrary flex shorthand **`flex-[<grow>_<shrink>_<basis>]`** — e.g. `flex-[0_0_254px]`, `flex-[1_1_0%]` — over separate `grow`, `shrink`, `shrink-0`, `basis-*` utilities on the same element.
- Underscores in the arbitrary value represent spaces in CSS (`flex: 0 0 254px`).
- **Basis unit:** fixed mockup boxes in the shorthand use **`px`** — see [`layout-dimensional-units.RULE.md`](layout-dimensional-units.RULE.md).
- Use separate `grow` / `shrink-*` / `basis-*` only when a single axis or breakpoint variant needs a different primitive — keep the default pattern on one shorthand class where possible.

## Verification

- [ ] New markup/CSS does not add gratuitous `w-*` / `h-*` / `size-*` on text blocks, flex children, or controls without a noted exception.
- [ ] Buttons, nav items, tabs, and form controls size via padding / `.btn` / `.form-control` bases, not isolated fixed heights.
- [ ] Flex participants use `flex-[*_*_*]` or flex distribution before `width` constraints.
- [ ] Mockup-derived pixel boxes were translated to adaptive layout, not pasted as fixed dimensions on every element.
- [ ] New layout uses flex where a flex construction suffices; `grid` / `grid-*` appears only where flex cannot meet the requirement (reason noted).
- [ ] Custom arbitrary spacing, container tokens, and flex-basis use **`px`** per [`layout-dimensional-units.RULE.md`](layout-dimensional-units.RULE.md).
