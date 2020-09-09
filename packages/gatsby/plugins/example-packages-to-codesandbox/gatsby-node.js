require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-typescript'],
  extensions: ['.ts'],
})
module.exports = require('./src/gatsby-node.ts')
