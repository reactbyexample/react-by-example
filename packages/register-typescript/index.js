require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-typescript'].map((p) =>
    require.resolve(p),
  ),
  extensions: ['.ts'],
})
