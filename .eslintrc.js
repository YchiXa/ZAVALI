/* eslint-env node */
/* global module */

module.exports = {
  extends: ["next/core-web-vitals", "plugin:readable-tailwind/recommended"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "readable-tailwind/multiline": [
      "error",
      {
        lineBreakStyle: "unix",
        maxLineLength: 80,
      },
    ],
  },
};
