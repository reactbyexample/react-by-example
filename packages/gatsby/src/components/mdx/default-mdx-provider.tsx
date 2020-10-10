import { MDXProvider } from '@mdx-js/react'
import { Link } from 'gatsby'
import React, { FC } from 'react'
import styled from 'styled-components'
import { Example } from './example'

const pre = styled.pre`
  max-width: 100%;
  overflow: auto;
`

const blockquote = styled.blockquote`
  border-left: 2px solid var(--app-pink);
  padding-left: 0.5em;
`

const a = styled.a`
  &.slug {
    font-size: 0.75em;
    margin-left: 0.5em;
    display: none;
    text-decoration: none;
  }

  *:hover > &.slug {
    display: unset;
  }
`

const inlineCode = styled.code.attrs({ className: 'inline' })``

const components = { Link, Example, pre, blockquote, a, inlineCode }

export const DefaultMDXProvider: FC = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
)
