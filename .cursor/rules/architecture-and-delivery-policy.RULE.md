---
description: Architecture and delivery policy for layout work using current project tooling.
alwaysApply: true
---

# Architecture And Delivery Policy

- Prioritize page load speed and runtime performance in every implementation decision.
- Use Lighthouse and PageSpeed best practices as the default reference for performance decisions.
- Work within the current project architecture and existing tooling.
- Image delivery, sizing, and PageSpeed: [`image-delivery-and-optimization.RULE.md`](image-delivery-and-optimization.RULE.md).
- Use `WOFF`/`WOFF2` as default webfont formats for modern browser support.
- Prefer self-hosted fonts and scripts served from the project server (except system-font-only projects).
- Include only the font families and weights/styles actually used in the UI.
- Set `font-display: swap` for custom webfonts to avoid render-blocking text.
- Prefer composition with partials/includes/macros over duplicated markup blocks.
- Avoid shipping unnecessary JS/CSS and large media assets when equivalent lighter options exist.
