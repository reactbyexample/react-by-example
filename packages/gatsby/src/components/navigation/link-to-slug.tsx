import { Link } from 'gatsby'
import React, { ComponentProps, FC, ReactNode } from 'react'
import { useMdxTitle } from '../../graphql'

type LeanLinkProps = Omit<ComponentProps<typeof Link>, 'to' | 'ref'>
export interface LinkToSlugProps extends LeanLinkProps {
  slug: string
  render?: (args: { title: string }) => ReactNode
}

const defaultRender: LinkToSlugProps['render'] = ({ title }) => title

export const LinkToSlug: FC<LinkToSlugProps> = ({
  slug,
  render = defaultRender,
  ...rest
}) => {
  const title = useMdxTitle(slug)
  return (
    <Link to={`/${slug}`} {...rest}>
      {render({ title })}
    </Link>
  )
}
