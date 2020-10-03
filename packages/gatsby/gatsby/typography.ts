import Typography from 'typography'

const fontStack = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Oxygen-Sans',
  'Ubuntu',
  'Cantarell',
  'Helvetica Neue',
  'sans-serif',
]
export default new Typography({
  baseFontSize: '14px',
  baseLineHeight: 1.2,
  headerFontFamily: fontStack,
  bodyFontFamily: fontStack,
  bodyColor: '#f8f8f2',
  headerColor: '#bd93f9',
  overrideStyles: () => ({
    a: { color: 'inherit' },
    'a:visited': { color: '#8be9fd' },
    code: { fontFamily: `'Fira Code', monospace` },
  }),
})
