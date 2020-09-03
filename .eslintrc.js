/** @type { import('eslint').Linter.Config } */
module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-typescript',
    'airbnb/hooks',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-restricted-syntax': 'off',
    'react/prop-types': 'off',
    'import/prefer-default-export': 'off',
  },
}
