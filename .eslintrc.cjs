module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard-with-typescript', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'quotes': ['error', 'single', { avoidEscape: true }],
    'import/no-unresolved': 0,
    'indent': ['error', 2],
    'object-curly-spacing': ['error', 'always'],
    'require-jsdoc': 0,
    'max-len': ['error', { code: 120 }],
    'no-unused-vars': 0,
    'semi': [2, 'always'],
    'multiline-ternary': 'off',
    'indent': 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true }],
    '@typescript-eslint/member-delimiter-style': ['error', { multiline: { delimiter: 'semi' } }],
    '@typescript-eslint/explicit-function-return-type': 0,
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/prefer-readonly': 'off',
    '@typescript-eslint/consistent-indexed-object-style': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
