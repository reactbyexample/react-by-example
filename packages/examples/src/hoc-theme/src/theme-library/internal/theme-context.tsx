import { createContext } from 'react'

export interface ThemeContextType {
  color: {
    background: string
    foreground: string
  }
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const ThemeContext = createContext<ThemeContextType>(null!)
