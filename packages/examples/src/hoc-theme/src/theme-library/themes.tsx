import React, { FC } from 'react'
import { ThemeContext, ThemeContextType } from './internal/theme-context'

const darkTheme: ThemeContextType = {
  color: {
    background: '#282a36',
    foreground: '#f8f8f2',
  },
}
export const DarkTheme: FC = ({ children }) => (
  <ThemeContext.Provider value={darkTheme}>{children}</ThemeContext.Provider>
)

const lightTheme: ThemeContextType = {
  color: {
    background: '#f8f8f2',
    foreground: '#282a36',
  },
}
export const LightTheme: FC = ({ children }) => (
  <ThemeContext.Provider value={lightTheme}>{children}</ThemeContext.Provider>
)
