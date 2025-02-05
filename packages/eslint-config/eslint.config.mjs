import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import eslintVueConfig from "./eslint.vue.config.mjs"

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"], // 匹配所有文件
    ignores: [
      "**/dist/**", // 排除所有 dist 目录下的文件
    ]
  },
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintVueConfig,
]