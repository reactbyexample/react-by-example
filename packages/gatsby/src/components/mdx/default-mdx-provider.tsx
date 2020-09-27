import { MDXProvider } from '@mdx-js/react'
import { Link } from 'gatsby'
import React, { FC } from 'react'

const components = { Link }

export const DefaultMDXProvider: FC = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
)
