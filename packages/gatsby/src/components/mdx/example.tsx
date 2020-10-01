import React, { FC, ReactNode } from 'react'

export interface ExampleProps {
  code?: ReactNode
  render?: ReactNode
  link?: ReactNode
}

export const Example: FC<ExampleProps> = ({ code, render, link }) => (
  <div className="example">
    {code}
    {render}
    {link}
  </div>
)
