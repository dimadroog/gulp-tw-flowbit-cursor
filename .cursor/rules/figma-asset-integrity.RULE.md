---
description: Figma asset import integrity policy for layout delivery.
alwaysApply: true
---

# Figma Asset Integrity Policy

- When implementing UI from Figma, preserve asset semantics exactly: icons/illustrations remain graphics and must not be replaced with text or emoji substitutes.
- For vector graphics, inline SVG markup directly in templates when the element is part of UI structure (icons, logo marks, control glyphs).
- For raster graphics, download and store assets under structured project paths (for example `app/img/<page-or-feature>/...`) and reference only local project paths.
- Do not leave direct temporary URLs in markup (including Figma MCP asset URLs) in final page templates.
- Do not distort vector assets: preserve original viewBox and path geometry; only apply non-destructive scaling through container sizing.
- Validate image paths before completion: no empty `src`, no unresolved relative paths, and no broken references in built output.
- If a required design asset is unavailable, stop and report the missing asset explicitly instead of substituting arbitrary visuals.
