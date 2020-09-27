import React, { FC } from 'react'
import { useNavigation } from '../../graphql'
import { LinkToSlug } from './link-to-slug'

export const Navigation: FC = () => {
  const navigation = useNavigation()
  return (
    <ul>
      {navigation.map((slug) => (
        <li key={slug}>
          <LinkToSlug slug={slug} />
        </li>
      ))}
    </ul>
  )
}
