import React, { FC } from 'react'
import styled from 'styled-components'
import {
  DefaultMDXProvider,
  DefaultThemeProvider,
  Navigation,
  Next,
  Prev,
} from '../components'

const Grid = styled.div`
  display: grid;
  grid-template-areas:
    'left-void nav     right-void'
    'left-void content right-void';
  grid-template-columns: 1fr minmax(0, 75ch) 1fr;
  padding: 0 0.5rem;

  @media (min-width: ${(p) => p.theme.breakpoints.xl}) {
    grid-template-areas: 'nav content void';
    grid-template-columns: 1fr 75ch 1fr;
    padding: 1rem;
    max-width: 150ch;
    margin: 0 auto;
  }
`

const NavigationSlot = styled.div`
  grid-area: nav;
`

const Content = styled.article`
  grid-area: content;
`

const Paging = styled.div`
  display: grid;
  grid-template-areas:
    'next'
    'prev';

  @media (min-width: ${(p) => p.theme.breakpoints.xl}) {
    grid-template-areas: 'prev void next';
    grid-template-columns: auto 1fr auto;
  }
`

const StyledPrev = styled(Prev)`
  grid-area: prev;
`
const StyledNext = styled(Next)`
  grid-area: next;
  justify-self: flex-end;
`

const DefaultLayout: FC = ({ children }) => {
  return (
    <DefaultThemeProvider>
      <Grid>
        <NavigationSlot>
          <Navigation />
        </NavigationSlot>
        <Content>
          <DefaultMDXProvider>{children}</DefaultMDXProvider>
          <Paging>
            <StyledPrev />
            <StyledNext />
          </Paging>
        </Content>
      </Grid>
    </DefaultThemeProvider>
  )
}

export default DefaultLayout
