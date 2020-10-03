import { MDXProvider } from '@mdx-js/react'
import { Link } from 'gatsby'
import React, { FC } from 'react'
import styled from 'styled-components'
import { Example } from './example'

const pre = styled.pre`
  max-width: 100%;
  overflow: auto;
`

const components = { Link, Example, pre }

export const DefaultMDXProvider: FC = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
)
