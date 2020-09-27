import React, { FC } from 'react'
import { DefaultMDXProvider, Navigation, Next, Prev } from '../components'

const DefaultLayout: FC = ({ children }) => {
  return (
    <>
      <Navigation />
      <DefaultMDXProvider>{children}</DefaultMDXProvider>
      <Prev />
      <Next />
    </>
  )
}

export default DefaultLayout
