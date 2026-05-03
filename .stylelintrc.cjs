module.exports = {
  extends: ["stylelint-config-standard-scss"],
  ignoreFiles: ["dist/**", "node_modules/**"],
  overrides: [
    {
      files: ["**/*.scss"],
      customSyntax: "postcss-scss",
    },
  ],
  rules: {
    "at-rule-no-unknown": null,
    "comment-empty-line-before": null,
    "comment-whitespace-inside": null,
    "rule-empty-line-before": null,
    "scss/double-slash-comment-empty-line-before": null,
    "scss/load-no-partial-leading-underscore": null,
    "scss/at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind", "apply", "layer", "variants", "responsive", "screen"],
      },
    ],
  },
};
