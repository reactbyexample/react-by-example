import React, { FC } from 'react'
import styled from 'styled-components'
import { DefaultMDXProvider, Navigation, Next, Prev } from '../components'

const Content = styled.article`
  max-width: 650px;
  margin: auto;
  padding: 0 6px;
`

const DefaultLayout: FC = ({ children }) => {
  return (
    <>
      <Navigation />
      <Content>
        <DefaultMDXProvider>{children}</DefaultMDXProvider>
      </Content>
      <Prev />
      <Next />
    </>
  )
}

export default DefaultLayout
