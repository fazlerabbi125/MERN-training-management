import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.node } },
  tseslint.configs.recommended,
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
  {
    files: ["**/*.{js,mjs,jsx,ts,tsx}"],
    ignores: ["./dist", "node_modules", "tsconfig.json"],
    rules: {
      "@typescript-eslint/no-deprecated": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "no-console": "warn",
      "no-magic-numbers": "off",
      "@typescript-eslint/no-magic-numbers": ["warn", {
        ignoreEnums: true,
        ignoreReadonlyClassProperties: true,
      }],
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": "error",
      "@typescript-eslint/no-empty-interface": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "semi": ["warn", "always"],
      "prefer-const": "warn",
      "quotes": ["error", "double", { allowTemplateLiterals: true, avoidEscape: true }],
    },
  },
  eslintConfigPrettier,
]);