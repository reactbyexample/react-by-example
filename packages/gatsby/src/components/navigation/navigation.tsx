import { Link } from 'gatsby'
import React, { FC, useCallback, useState } from 'react'
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
  padding: var(--app-content-padding);
  align-items: center;

  @media (min-width: ${(p) => p.theme.breakpoints.xl}) {
    grid-template-areas:
      'title'
      'links';
    grid-template-columns: unset;
  }
`

const Title = styled.header`
  grid-area: title;
`

const TitleH1 = styled.h1`
  margin-bottom: 0;
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

export const Navigation: FC = () => {
  const navigation = useNavigation()
  const [isExpanded, setIsExpanded] = useState(false)
  const toggle = useCallback(() => setIsExpanded((s) => !s), [])

  return (
    <Container>
      <Title>
        <TitleH1>
          <TitleLink to="/">React by Example</TitleLink>
        </TitleH1>
      </Title>
      <Expand onClick={toggle}>
        <MenuIcon size={3} />
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
