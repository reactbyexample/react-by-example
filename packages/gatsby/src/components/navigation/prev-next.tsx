import React, { ComponentProps, FC } from 'react'
import styled from 'styled-components'
import { useNavigation } from '../../graphql'
import { useSlug } from '../hooks'
import { ArrowIcon } from '../icons'
import { LinkToSlug, LinkToSlugProps } from './link-to-slug'

const StyledLinkToSlug = styled(LinkToSlug)`
  display: flex;
  font-size: 1.2em;
  align-items: center;
`

type LeanLinkToSlugProps = Omit<
  ComponentProps<typeof LinkToSlug>,
  'slug' | 'render'
>
const PrevNext = (
  diff: number,
  render: LinkToSlugProps['render'],
): FC<LeanLinkToSlugProps> => (p) => {
  const slug = useSlug()
  const navigation = useNavigation()
  const slugIndex = navigation.indexOf(slug)
  const nextSlug = navigation[slugIndex + diff]

  return nextSlug ? (
    <StyledLinkToSlug slug={nextSlug} render={render} {...p} />
  ) : null
}

export const Prev = PrevNext(-1, ({ title }) => (
  <>
    <ArrowIcon rotate={-90} />
    {title}
  </>
))
export const Next = PrevNext(+1, ({ title }) => (
  <>
    {title}
    <ArrowIcon rotate={90} />
  </>
))
