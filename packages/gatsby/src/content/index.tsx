import { Link } from 'gatsby'
import React, { FC } from 'react'
import styled from 'styled-components'
import {
  ArrowIcon,
  BeakerIcon,
  CodeSandboxIcon,
  DefaultThemeProvider,
  SEO,
} from '../components'
import { useSiteMetadata } from '../graphql'

const Content = styled.main`
  border-top: 1em solid var(--app-pink);
  padding: 1em;
  margin: 0 auto;
  text-align: center;

  @media (min-width: ${(p) => p.theme.breakpoints.md}) {
    padding-top: 4em;
  }

  @media (min-width: ${(p) => p.theme.breakpoints.xl}) {
    padding-top: 8em;
  }
`

const Title = styled.h1`
  font-size: 4em;
  color: var(--app-pink);
`

const Subtitle = styled.h2`
  color: var(--app-foreground);
  margin-bottom: 2em;
`

const ReactLogoSVG: FC = ({ ...props }) => (
  <svg
    aria-label="React logo"
    viewBox="-11.5 -11.5 23 23"
    focusable={false}
    {...props}
  >
    <circle cx="0" cy="0" r="2.05" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" transform="rotate(0)" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
)

const ReactLogo = styled(ReactLogoSVG)`
  margin: 1em;
  height: 150px;
  color: var(--app-cyan);
  animation: rainbow 3s ease-in-out, pulse 2s cubic-bezier(0.83, 0, 0.17, 1);
  animation-play-state: paused;
  animation-iteration-count: infinite;

  :hover {
    animation-play-state: running;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media (min-width: ${(p) => p.theme.breakpoints.md}) {
    height: 200px;
    margin: 2em;
  }

  @keyframes rainbow {
    0% {
      color: var(--app-cyan);
    }
    30% {
      color: var(--app-purple);
    }
    40% {
      color: var(--app-pink);
    }
    100% {
      color: var(--app-green);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(0.9);
    }
    75% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`

const GetStarted = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  color: var(--app-background);
  background-color: var(--app-foreground);
  padding: 1rem 2rem;
  border-radius: 999px;
  text-decoration: none;
  margin-bottom: 3em;

  :visited {
    color: var(--app-background);
  }

  :focus {
    outline: 4px solid var(--app-foreground);
  }

  @media (min-width: ${(p) => p.theme.breakpoints.md}) {
    font-size: 3em;
  }
`

const ListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
`

const Landing: FC = () => {
  const siteMetadata = useSiteMetadata()

  return (
    <>
      <SEO />
      <DefaultThemeProvider>
        <Content>
          <ReactLogo />
          <Title>{siteMetadata.title}</Title>
          <Subtitle>code-oriented React tutorial for programmers</Subtitle>
          <GetStarted to="/getting-started">
            Get Started
            <ArrowIcon $rotate={90} />
          </GetStarted>
          <ListContainer>
            <ul>
              <li>no previous React knowledge required</li>
              <li>some JavaScript knowledge is required</li>
              <li>tons of real world examples</li>
              <li>
                examples editable on CodeSandbox <CodeSandboxIcon $dense />
              </li>
              <li>
                most examples include unit tests <BeakerIcon $dense />
              </li>
              <li>links for further research</li>
            </ul>
          </ListContainer>
        </Content>
      </DefaultThemeProvider>
    </>
  )
}

export default Landing
