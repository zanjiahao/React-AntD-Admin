// .eslintrc.cjs 配置文件
module.exports = {
  root: true,
  // 指定脚本的运行环境
  env: {
    browser: true, // 可能运行在浏览器环境中。认为一些浏览器的全局变量（如 window、document 等）是可用的
    node: true, // 可能运行在 Node.js 环境中,（如 require、module 等）是可用的
    es2020: true, // 较新的es语法特性
  },
  // 使用推荐的React规则
  extends: [
    'eslint:recommended', // 启用推荐规则
    'plugin:react/recommended', // 启用推荐的React规则
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended', // 启用推荐的React Hooks规则
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  // 指定解析器选项
  parserOptions: {
    // parser: '@typescript-eslint/parser',
    ecmaVersion: 2020, // 允许解析现代 ECMAScript 特性
    sourceType: 'module', // 允许使用模块
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true // 允许对JSX语法进行解析
    }
  },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'quotes': ['error', 'single'], // 强制使用单引号
    'semi': ['error', 'never'], // 错误提示当出现不应该有的分号
    'comma-dangle': ['error', 'never'], // 不允许尾随逗号
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'no-multiple-empty-lines': ['error', { max: 1 }], // 不允许多个空行
    'prefer-const': 'off', // 使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
    'no-use-before-define': 'off', // 禁止在 函数/类/变量 定义之前使用它们
    'no-irregular-whitespace': 'off', // 禁止不规则的空白
    'react/prop-types': 'off', // 防止在react组件定义中缺少props验证
  },
}
