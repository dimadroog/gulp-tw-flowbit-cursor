# performance-checklist

> Перевод для человека. **Enforce:** [`.cursor/commands/performance-checklist.md`](../../../.cursor/commands/performance-checklist.md).

**Blocking vs recommended:**

- **Blocking** при изменении в задаче: image delivery, srcset, мёртвый CSS/JS, DOM, шрифты, stress-test layout.
- **Recommended:** Lighthouse/PageSpeed — `not_applicable` без deploy URL; **blocking** только при документированной регрессии на стабильном preview/deploy URL.
