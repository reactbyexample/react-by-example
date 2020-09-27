import React, { FC } from 'react'
import { DefaultMDXProvider } from '../components'

const BlankLayout: FC = ({ children }) => {
  return <DefaultMDXProvider>{children}</DefaultMDXProvider>
}

export default BlankLayout
