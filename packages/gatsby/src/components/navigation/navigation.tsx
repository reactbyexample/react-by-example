import { Link } from 'gatsby'
import React, { ComponentProps, FC, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useNavigation } from '../../graphql'
import { MenuIcon } from '../icons'
import { LinkToSlug } from './link-to-slug'

const Container = styled.nav`
  display: grid;
  grid-template-areas:
    'title expand'
    'links links';
  grid-template-columns: 1fr auto;
  align-items: center;

  @media (min-width: ${(p) => p.theme.breakpoints.xl}) {
    grid-template-areas:
      'title'
      'links';
    grid-template-columns: unset;
  }
`

const Title = styled.h1`
  grid-area: title;
  margin: 0;

  @media (min-width: ${(p) => p.theme.breakpoints.xl}) {
    margin-bottom: 0.5em;
  }
`

const TitleLink = styled(Link)`
  text-decoration: none;
  color: var(--app-foreground);
  :visited {
    color: var(--app-foreground);
  }
`

const Expand = styled.button`
  grid-area: expand;
  color: var(--app-foreground);
  width: 50px;
  height: 50px;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  :focus,
  :active {
    color: var(--app-pink);
    outline: 2px solid var(--app-pink);
  }

  @media (min-width: ${(p) => p.theme.breakpoints.xl}) {
    display: none;
  }
`

interface LinksProps {
  expanded?: boolean
}

const Links = styled.ul<LinksProps>`
  grid-area: links;
  display: ${(p) => (p.expanded ? 'unset' : 'none')};

  @media (min-width: ${(p) => p.theme.breakpoints.xl}) {
    display: unset;
  }
`

type ContainerProps = ComponentProps<typeof Container>
export const Navigation: FC<ContainerProps> = (p) => {
  const navigation = useNavigation()
  const [isExpanded, setIsExpanded] = useState(false)
  const toggle = useCallback(() => setIsExpanded((s) => !s), [])

  return (
    <Container {...p}>
      <Title>
        <TitleLink to="/">React by Example</TitleLink>
      </Title>
      <Expand title="menu" aria-label="menu" onClick={toggle}>
        <MenuIcon $size={3} />
      </Expand>
      <Links expanded={isExpanded}>
        {navigation.map((slug) => (
          <li key={slug}>
            <LinkToSlug slug={slug} />
          </li>
        ))}
      </Links>
    </Container>
  )
}
