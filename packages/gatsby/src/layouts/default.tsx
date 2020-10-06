import React, { FC } from 'react'
import styled from 'styled-components'
import {
  DefaultMDXProvider,
  DefaultThemeProvider,
  Navigation,
  Next,
  Prev,
} from '../components'

const Content = styled.article`
  max-width: 75ch;
  margin: auto;
  padding: 0 6px;
`

const DefaultLayout: FC = ({ children }) => {
  return (
    <DefaultThemeProvider>
      <Navigation />
      <Content>
        <DefaultMDXProvider>{children}</DefaultMDXProvider>
      </Content>
      <Prev />
      <Next />
    </DefaultThemeProvider>
  )
}

export default DefaultLayout
