export interface Theme {
  breakpoints: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    xxl: string
  }
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
