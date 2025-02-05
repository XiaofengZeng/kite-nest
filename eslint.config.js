// import kiteEslint from '@kite-nest/eslint-config'
import pluginVue from 'eslint-plugin-vue' // eslint vue插件
import vueEslintParser from 'vue-eslint-parser' // vue解析器，用于解析<template>
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript' // 针对vue+ts的配置
import prettier from 'eslint-plugin-prettier' // 将prettier错误通过eslint展示
import tselint from 'typescript-eslint' // 支持TS的Eslint和prettier规则

export default [
  // ...kiteEslint.configs['flat/recommended'],
  {
    name: 'files-to-lint',
    files: ['**/*.{js,mjs,cjs}', '**/*.{ts,mts,cts}', '**/*.{jsx,tsx}', '**/*.{vue}'],
  },
  {
    name: 'files-to-ignore',
    ignores: ['**/dist/**', '**/node_modules/**'],
  },
  ...defineConfigWithVueTs(pluginVue.configs['flat/essential'], vueTsConfigs.recommended),
  {
    name: 'plugins',
    plugins: {
      vue: pluginVue,
      prettier,
    },
  },
  {
    name: 'parser-config-vue',
    files: ['**/*.{vue,jsx,tsx}'],
    languageOptions: {
      parser: vueEslintParser,
    },
  },
  {
    name: 'disable-typecheck-in-js-files',
    files: ['**/*.{js,mjs,cjs}'],
    ...tselint.configs.disableTypeChecked,
  },
  ...tselint.config({
    files: ['**/*.{ts,mts,cts}'],
    plugins: {
      '@typescript-eslint': tselint.plugin, // ts默认规则补充
    },
    languageOptions: {
      parser: tselint.parser, // ts解析器，解析ts语法
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // TS自定义规则
    },
  }),
  {
    name: 'custom-rules',
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
]
