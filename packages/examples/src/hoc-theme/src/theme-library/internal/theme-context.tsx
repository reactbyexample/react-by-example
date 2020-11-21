import { createContext } from 'react'

export interface ThemeContextType {
  color: {
    background: string
    foreground: string
  }
}

export const ThemeContext = createContext<ThemeContextType>(null!)
