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
    // 关闭 导入的文件后缀
    'import/extensions': 'off',
    // 关闭 导入无关的依赖
    'import/no-extraneous-dependencies': 'off',
    // 关闭 必须拥有函数名
    'func-names': ['error', 'never'],
    // 关闭 下划线标识符
    'no-underscore-dangle': 'off',
  },
};
