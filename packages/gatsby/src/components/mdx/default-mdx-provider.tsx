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
  border-left: 2px solid #ff79c6;
  padding-left: 0.5em;
`

const components = { Link, Example, pre, blockquote }

export const DefaultMDXProvider: FC = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
)
