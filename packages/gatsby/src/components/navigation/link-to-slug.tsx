import { Link } from 'gatsby'
import React, { FC, ReactNode } from 'react'
import { useMdxTitle } from '../../graphql'

export interface LinkToSlugProps {
  slug: string
  render?: (args: { title: string }) => ReactNode
}

const defaultRender: LinkToSlugProps['render'] = ({ title }) => title

export const LinkToSlug: FC<LinkToSlugProps> = ({
  slug,
  render = defaultRender,
}) => {
  const title = useMdxTitle(slug)
  return <Link to={`/${slug}`}>{render({ title })}</Link>
}
