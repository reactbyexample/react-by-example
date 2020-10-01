import { MDXProvider } from '@mdx-js/react'
import { Link } from 'gatsby'
import React, { FC } from 'react'
import { Example } from './example'

const components = { Link, Example }

export const DefaultMDXProvider: FC = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
)
