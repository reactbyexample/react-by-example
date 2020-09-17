require('@babel/register')({
  presets: [
    [require.resolve('@babel/preset-env'), { targets: { node: 'current' } }],
    require.resolve('@babel/preset-typescript'),
  ],
  extensions: ['.ts'],
})
