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
    'nav'
    'content';
  grid-template-columns: minmax(0, 1fr);
  padding: 0 0.5rem;

  @media (min-width: ${(p) => p.theme.breakpoints.xl}) {
    grid-template-areas: 'nav content void';
    grid-template-columns: 1fr 75ch 1fr;
    padding: 1rem;
  }
`

const Nav = styled.div`
  grid-area: nav;
`

const Content = styled.article`
  grid-area: content;
`

const Paging = styled.div`
  display: grid;
  grid-template-areas:
    'prev'
    'next';

  @media (min-width: ${(p) => p.theme.breakpoints.xl}) {
    grid-template-areas: 'prev void next';
    grid-template-columns: auto 1fr auto;
  }
`

const PrevSlot = styled.div`
  grid-area: prev;
`
const NextSlot = styled.div`
  grid-area: next;
  justify-self: flex-end;
`

const DefaultLayout: FC = ({ children }) => {
  return (
    <DefaultThemeProvider>
      <Grid>
        <Nav>
          <Navigation />
        </Nav>
        <Content>
          <DefaultMDXProvider>{children}</DefaultMDXProvider>
          <Paging>
            <PrevSlot>
              <Prev />
            </PrevSlot>
            <NextSlot>
              <Next />
            </NextSlot>
          </Paging>
        </Content>
      </Grid>
    </DefaultThemeProvider>
  )
}

export default DefaultLayout
