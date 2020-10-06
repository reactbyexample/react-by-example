import React, { FC } from 'react'
import { Icon, IconProps } from './icon'

export const MenuIcon: FC<IconProps> = (props) => (
  <Icon viewBox="0 0 30 30" {...props}>
    <path
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeMiterlimit="10"
      d="M4 7h22M4 15h22M4 23h22"
    />
  </Icon>
)
