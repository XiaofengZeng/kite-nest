import kite from '@kite-nest/eslint-config'

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...kite.configs['ignore-files'],
  ...kite.configs.browser,
  ...kite.configs.js,
  ...kite.configs.ts,
  ...kite.configs.stylistic,
  ...kite.configs['ts-vue'],
]
