import React, { FC, InputHTMLAttributes } from 'react'

const ClosedInput: FC<{ type?: 'text' | 'tel' }> = ({ type = 'text' }) => (
  <input type={type} />
)

export const typeText = <ClosedInput />
export const typeTel = <ClosedInput type="tel" />
// export const cannotAddEvents = <ClosedInput onKeyDown={() => {}} />

const OpenInput: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  type = 'text',
  ...props
}) => <input type={type} {...props} />

export const canAddEvents = <OpenInput onKeyDown={() => {}} />
