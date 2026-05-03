---
description: Pixel-perfect delivery policy for implementation from design mockups.
alwaysApply: true
---

# Pixel-Perfect Delivery Policy

- For any layout implementation from design mockups, pixel-perfect fidelity is a mandatory quality gate before completion.
- Before implementation starts, always collect manual confirmation for:
  - target breakpoint set (for example `1440`, `1280`, mobile variants)
  - typography contract (font family, size, weight, line-height, letter-spacing, and text case rules)
- Do not infer breakpoint and typography baselines silently; if they are not explicitly confirmed for the task, stop and request clarification.
- Validate visual fidelity for critical zones:
  - orientation/alignment of major layout groups
  - inner/outer spacing
  - typography sizing and line metrics
  - text casing and badge/chip label rendering
- Treat unresolved pixel-perfect mismatches as blocking defects, not polish TODOs.
- Include pixel-perfect status in final validation reporting alongside accessibility, performance, and asset integrity checks.
