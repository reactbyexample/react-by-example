const { resolve } = require('path')

/** @type { import('eslint').Linter.Config } */
module.exports = {
  overrides: [
    {
      files: ['*.js'],
      extends: ['airbnb', 'prettier', 'prettier/react'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'no-restricted-syntax': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'airbnb-typescript',
        'prettier',
        'prettier/react',
        'prettier/@typescript-eslint',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: resolve(__dirname, 'tsconfig.json'),
      },
      rules: {
        'no-restricted-syntax': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',
        'jsx-a11y/media-has-caption': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/prop-types': 'off',
      },
    },
  ],
}
