import type { Linter } from 'eslint'

declare const conf: {
  configs: {
    'flat/recommended': Linter.Config[]
  }
}

export = conf