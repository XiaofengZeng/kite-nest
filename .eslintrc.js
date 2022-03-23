module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    amd: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 关闭导入的文件后缀
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
