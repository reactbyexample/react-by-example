import React, { createContext, FC, useContext, useState } from 'react'
import defaultClasses from './button.default.module.css'
import greenClasses from './button.green.module.css'
import redClasses from './button.red.module.css'

type ThemeContextType = 'default' | 'red' | 'green'
const ThemeContext = createContext<ThemeContextType>('default')

const Button: FC = () => {
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

const ThemeSwitcher: FC = () => {
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
        <Button />
      </ThemeContext.Provider>
    </>
  )
}

export default <ThemeSwitcher />
