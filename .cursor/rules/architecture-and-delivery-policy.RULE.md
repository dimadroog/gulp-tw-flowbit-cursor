---
description: Architecture and delivery policy for layout work using current project tooling.
alwaysApply: true
---

# Architecture And Delivery Policy

- Prioritize page load speed and runtime performance in every implementation decision.
- Use Lighthouse and PageSpeed best practices as the default reference for performance decisions.
- Work within the current project architecture and existing tooling.
- Every image must explicitly set `loading="lazy"` or `loading="eager"` based on context.
- Optimize all images for web delivery and keep source dimensions close to rendered dimensions.
- Use `picture`/`srcset` to serve the most appropriate image per viewport and resolution.
- Use `WOFF`/`WOFF2` as default webfont formats for modern browser support.
- Prefer self-hosted fonts and scripts served from the project server (except system-font-only projects).
- Include only the font families and weights/styles actually used in the UI.
- Set `font-display: swap` for custom webfonts to avoid render-blocking text.
- Prefer composition with partials/includes/macros over duplicated markup blocks.
- Avoid shipping unnecessary JS/CSS and large media assets when equivalent lighter options exist.
- Build content-resilient layouts: verify behavior with longer text and with replacement images of different sizes/aspect ratios.
