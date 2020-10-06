import React, { FC } from 'react'
import { DefaultMDXProvider, DefaultThemeProvider } from '../components'

const BlankLayout: FC = ({ children }) => {
  return (
    <DefaultThemeProvider>
      <DefaultMDXProvider>{children}</DefaultMDXProvider>
    </DefaultThemeProvider>
  )
}

export default BlankLayout
