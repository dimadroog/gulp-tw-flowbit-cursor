---
description: For mockup-driven tasks, completion is forbidden while visual placeholders or deferred fidelity TODOs remain.
alwaysApply: true
---

# Mockup-Driven No-Placeholder Completion Policy

- For mockup-driven page/section tasks, do not mark the task done if key visual elements are placeholders.
- Key visual elements include: icons, logos, decorative graphics, badges/chips states, and other fidelity-critical assets.
- **Critical layout zones** (header, sidebar, footer, hero, primary CTAs, flagship cards): completion is forbidden while spacing, typography, color, radius, or shadow visibly diverges from the approved mockup at the declared breakpoint, unless the task brief documents an explicit waiver.
- Do not finish with phrases like "next step", "can be done later", or "will finalize afterwards" when blocking visual gates are still open.
- If pixel-perfect or asset integrity checks are not `pass`, completion is forbidden.
- If required fidelity inputs are missing (breakpoints/typography), pause completion and request clarification.

## Blocking examples

- Remote temporary asset URLs are still present in templates.
- Placeholder text/boxes are used instead of required graphics.
- Casing, spacing, geometry, color, radius, or shadow still diverges from the approved mockup (see `WORKFLOW.md` §1.2 for critical zones and waiver rules).
- `validate-pixel-perfect` or `validate-figma-assets` is `fail` or not run for an applicable mockup-driven task.
