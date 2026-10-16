---
description: Pixel-perfect delivery policy for implementation from design mockups.
alwaysApply: true
---

# Pixel-Perfect Delivery Policy

- For any layout implementation from design mockups, pixel-perfect fidelity is a mandatory quality gate before completion.
- Before implementation starts, always collect manual confirmation for:
  - target breakpoint set (for example `1440`, `1280`, mobile variants) — validate against the mockup **at these widths** unless the brief explicitly expands scope
  - typography contract (font family, size, weight, line-height, letter-spacing, and text case rules)
- Do not infer breakpoint and typography baselines silently; if they are not explicitly confirmed for the task, stop and request clarification.
- Validate visual fidelity for critical zones (see [`WORKFLOW.md`](../WORKFLOW.md) §1.2):
  - orientation/alignment of major layout groups
  - inner/outer spacing from spec or tokens (not ad-hoc “nearest Tailwind step” substitutions in critical zones)
  - typography sizing and line metrics
  - text casing and badge/chip label rendering
  - surface colors, radii, shadows, and borders versus mockup/token definitions
## Rendered reference

An approved design may be a **rendered UI** — a running page, a Figma Make preview, a coded prototype, or another live reference — not only a Figma file or a static export. That source is mockup-driven ([`WORKFLOW.md`](../WORKFLOW.md) §1.2). Extract Figma assets only when the task also takes vectors from a Figma file.

The contract is the **painted result** at the agreed viewport, not the class string in source.

- A utility present in markup is not the winner until the cascade says so. In one layer, the declaration that appears later in the stylesheet wins, regardless of attribute order. A component-layer declaration loses to a utilities-layer declaration.
- Read computed `font-size`, `font-weight`, `line-height`, `letter-spacing`, margins, and `getBoundingClientRect` on the reference **and** on the implementation at the same width. The pixel-perfect report cites those numbers.
- Resolve `rem` from the reference root `font-size`. The root may not be 16px, so a spacing step is not the default 4px.
- Visible gaps include the line box and the inline formatting context (baseline strut under an inline-level control), not only the margin utility.

**Verification:** the report quotes computed metrics from the live reference and the implementation. A class name copied from source, without a computed value, is not evidence of a match.

- Treat unresolved pixel-perfect mismatches as blocking defects, not polish TODOs.
- Include pixel-perfect status in final validation reporting alongside accessibility, performance, and asset integrity checks.
