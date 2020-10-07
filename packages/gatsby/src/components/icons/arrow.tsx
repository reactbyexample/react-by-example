import React, { FC } from 'react'
import { Icon, IconProps } from './icon'

export const ArrowIcon: FC<IconProps> = (p) => (
  <Icon viewBox="0 0 16 16" {...p}>
    <path
      fillRule="evenodd"
      d="M3.47 7.78a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0l4.25 4.25a.75.75 0 01-1.06 1.06L9 4.81v7.44a.75.75 0 01-1.5 0V4.81L4.53 7.78a.75.75 0 01-1.06 0z"
    />
  </Icon>
)
