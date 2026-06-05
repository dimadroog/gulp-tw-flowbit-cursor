---
description: Figma asset import integrity policy for layout delivery.
alwaysApply: false
globs:
  - app/img/**
  - app/**/*.njk
---

# Figma Asset Integrity Policy

- When implementing UI from Figma, preserve asset semantics exactly: icons/illustrations remain graphics and must not be replaced with text or emoji substitutes.
- For vector graphics, inline SVG markup directly in templates when the element is part of UI structure (icons, logo marks, control glyphs).
- Treat SVG files under `app/img/` as **design artifacts**: after download/export from Figma (or MCP), store them **without unapproved edits** to geometry (`d`, `path`, `viewBox`, inner `transform`) or to root `<svg>` semantics before `{% include %}` pulls them into markup. The included file should match the exported source unless the task explicitly authorizes a delta.
- For raster graphics, download and store assets under structured project paths (for example `app/img/<page-or-feature>/...`) and reference only local project paths.
- After raster export, size and compress per [`image-delivery-and-optimization.RULE.md`](image-delivery-and-optimization.RULE.md).
- Do not leave direct temporary URLs in markup (including Figma MCP asset URLs) in final page templates.
- Do not distort vector assets: preserve original `viewBox` and path geometry; scale only via **outer container** (CSS/Tailwind on wrappers).
- **Do not** set `preserveAspectRatio="none"` on UI icons/glyphs unless the design **explicitly** requires non-uniform stretch and the task documents that exception. Figma often exports this flag when a frame is stretched; prefer **re-export from a square frame** or fix in the design file instead of shipping stretched icons.
- Avoid unauthorized batch tooling on SVG (SVGO, sed across all icons, automatic “normalize”) unless the user or task scope explicitly demands it; such passes must be listed in delivery notes with rationale.
- Validate image paths before completion: no empty `src`, no unresolved relative paths, and no broken references in built output.
- If a required design asset is unavailable, stop and report the missing asset explicitly instead of substituting arbitrary visuals.
