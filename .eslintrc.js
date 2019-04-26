module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: [
    'airbnb',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  parser: 'babel-eslint',
  plugins: ['react', 'prettier'],
  rules: {
    strict: 0,
    camelcase: 0,
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true
      }
    ]
  }
};
