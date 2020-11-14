import React, { FC } from 'react'

export const Button: FC = ({ children }) => (
  <button type="button">{children}</button>
)

export default <Button>Hello world!</Button>
