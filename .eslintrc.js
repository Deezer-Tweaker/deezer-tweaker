/*
 * Deezer Tweaker, a tool to mod Deezer desktop app!
 * Copyright (c) 2023 Yuuto
 * Licensed under the MPL-2.0 license
 */

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['simple-header'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'quote-props': ['error', 'as-needed'],
    'no-unused-vars': ['error'],
    'spaced-comment': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'simple-header/header': ['error', {
      text: [
        'Deezer Tweaker, a tool to mod Deezer desktop app!',
        'Copyright (c) {year} {author}',
        'Licensed under the MPL-2.0 license',
      ],
      templates: { author: ['.*', 'Yuuto'] },
    }]
  }
};
