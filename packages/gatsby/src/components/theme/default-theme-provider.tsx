import React, { FC } from 'react'
import { ThemeProvider } from 'styled-components'
import { Theme } from './theme'

const defaultTheme: Theme = {
  breakpoints: {
    xs: '0',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  },
}
export const DefaultThemeProvider: FC = ({ children }) => (
  <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
)
