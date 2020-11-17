import React, { createContext, FC, useContext, useState } from 'react'
import defaultClasses from './button.default.module.css'
import greenClasses from './button.green.module.css'
import redClasses from './button.red.module.css'

export type ThemeContextType = 'default' | 'red' | 'green'
export const ThemeContext = createContext<ThemeContextType>('default')

export const Button: FC = () => {
  const theme = useContext(ThemeContext)
  const classes = {
    default: defaultClasses,
    red: redClasses,
    green: greenClasses,
  }[theme]

  return (
    <button type="button" className={classes.button}>
      themed button
    </button>
  )
}

export const ThemeSwitcher: FC = ({ children }) => {
  const [theme, setTheme] = useState('default')

  return (
    <>
      <label>
        theme
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option>default</option>
          <option>red</option>
          <option>green</option>
        </select>
      </label>
      <br />
      <ThemeContext.Provider value={theme as ThemeContextType}>
        {children}
      </ThemeContext.Provider>
    </>
  )
}

export default (
  <ThemeSwitcher>
    <Button />
  </ThemeSwitcher>
)
