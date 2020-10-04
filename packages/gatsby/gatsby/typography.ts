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
  bodyColor: 'var(--app-foreground)',
  headerColor: 'var(--app-purple)',
  overrideStyles: () => ({
    a: { color: 'inherit' },
    'a:visited': { color: 'var(--app-cyan)' },
    code: { fontFamily: `'Fira Code', monospace` },
  }),
})
