# Done Criteria: Cursor Infrastructure Iteration 1

Use these checks to validate the IDE-only infrastructure rollout.

## Required Outcomes

- Shared rules are present and consistently enforce stack, accessibility, styling, and JS policies.
- Shared rules and commands explicitly enforce page speed and loading-performance priorities.
- Commands exist for page scaffolding, section delivery, framework refactor, and a11y review.
- Skills exist for page generation, Nunjucks templating, Tailwind section building, and interaction audits.
- Agent topology and orchestration rules are documented and actionable.

## Verification Checklist

- [ ] New page can be scaffolded with `new-page` and aligned with baseline policy.
- [ ] Interactive section delivery includes framework-vs-custom-JS decision gate output.
- [ ] Repeated template blocks are implemented with loops/includes/macros.
- [ ] Accessibility review output explicitly covers ARIA and focus behavior.
- [ ] BEM exceptions are justified and limited.
- [ ] `performance-checklist` is applied for page/section delivery and key optimizations are documented.
- [ ] Content resilience is validated using longer text and replacement images with different aspect ratios.
- [ ] Font delivery policy is followed (`WOFF/WOFF2`, self-hosted when applicable, only used variants, `font-display: swap`).
