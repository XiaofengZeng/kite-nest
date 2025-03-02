/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      '**/node_modules',
      '**/public',
      '**/assets',
      '**/dist',
      '**/package-lock.json',
      '**/yarn.lock',
      '**/pnpm-lock.yaml',
      '**/.history',
      '**/CHANGELOG*.md',
      '**/*.min.*',
      '**/LICENSE*',
      '**/__snapshots__',
      '**/auto-import?(s).d.ts',
      '**/components.d.ts',
    ],
  },
]
