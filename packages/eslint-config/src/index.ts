import browser from './browser.js'
import js from './javascript.js'
import ts from './typescript.js'
import tsVue from './typescript-vue.js'
import stylistic from './stylistic.js'
import ignoreFiles from './ignore-files.js'

const configs = {
  browser,
  js,
  ts,
  'ignore-files': ignoreFiles,
  'ts-vue': tsVue,
  stylistic,
}

export default {
  configs,
}
