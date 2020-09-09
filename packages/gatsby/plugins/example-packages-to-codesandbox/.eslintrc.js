const { resolve } = require('path')

/** @type { import('eslint').Linter.Config } */
module.exports = {
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { packageDir: resolve(__dirname, '../..') },
    ],
  },
}
