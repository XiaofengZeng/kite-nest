import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

export default [
  {
    name: "files-to-lint",
    files: ["**/*.{js,mjs,cjs,ts,vue}"], // 匹配所有文件
  },
  {
    name: "files-to-ignore",
    ignores: [
      "**/dist/**", // 排除所有 dist 目录下的文件
      "**/node_modules/**",
    ],
  },
  {
    name: "browser-env",
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    name: "plugin-env",
    plugins: {
      vue: pluginVue,
    },
  },
  {
    name: "vue-env",
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    name: "custom-rules",
    rules: {},
  },
];
