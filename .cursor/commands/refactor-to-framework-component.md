# refactor-to-framework-component

Replace custom interaction code with framework-native component behavior when possible.

## Inputs

- Existing interactive block
- Current custom JS behavior
- Target framework component candidate

## Steps

1. Map current behavior to framework component capabilities.
2. Remove redundant custom JS where framework covers the same behavior.
3. Rewire markup and ARIA attributes to framework expectations.
4. Keep only minimal glue code if unavoidable.
5. Re-test keyboard and focus handling.

## Done

- Custom JS footprint is reduced.
- Behavior parity is preserved or improved.
- Accessibility semantics remain valid after refactor.
