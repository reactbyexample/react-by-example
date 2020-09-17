import React, { FC, ReactElement } from 'react'

export const Button: FC = ({ children }) => (
  <button type="button">{children}</button>
)

export default (): ReactElement => <Button>Hello world!</Button>
