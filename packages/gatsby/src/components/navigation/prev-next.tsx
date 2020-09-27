import React, { FC } from 'react'
import { useNavigation } from '../../graphql'
import { useSlug } from '../hooks'
import { LinkToSlug, LinkToSlugProps } from './link-to-slug'

const PrevNext = (
  diff: number,
  render: LinkToSlugProps['render'],
): FC => () => {
  const slug = useSlug()
  const navigation = useNavigation()
  const slugIndex = navigation.indexOf(slug)
  const nextSlug = navigation[slugIndex + diff]

  return nextSlug ? <LinkToSlug slug={nextSlug} render={render} /> : null
}

export const Prev = PrevNext(-1, ({ title }) => `Prev: ${title}`)
export const Next = PrevNext(+1, ({ title }) => `Next: ${title}`)
