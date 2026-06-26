module.exports = {
  extends: ["stylelint-config-standard"],
  ignoreFiles: ["dist/**", "node_modules/**"],
  rules: {
    "at-rule-no-unknown": null,
    "import-notation": null,
    "no-invalid-position-at-import-rule": null,
    "comment-empty-line-before": null,
    "comment-whitespace-inside": null,
    "rule-empty-line-before": null,
  },
};
