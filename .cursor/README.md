# Cursor IDE-Only Infrastructure

This directory stores shared Cursor guidance for layout automation.

## Structure

- `rules/` - persistent project policies for architecture, accessibility, styling, and JS decisions.
- `skills/` - reusable workflow instructions for page scaffolding, templating, Tailwind composition, and accessibility audits.
- `commands/` - repeatable prompt templates for everyday implementation and review tasks.

## Recommended Workflow

1. Start with `commands/new-page.md` for page scaffolding.
2. Use `skills/scaffold-page-from-layout/SKILL.md` and `skills/nunjucks-loop-and-partials/SKILL.md` while implementing markup.
3. Use `commands/build-section.md` for section delivery with framework-first decision gates.
4. Run `commands/a11y-checklist.md` before finalizing.
5. Validate against `done-criteria-first-iteration.md` before closing infrastructure tasks.
