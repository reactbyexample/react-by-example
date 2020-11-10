import React, { FC } from 'react'

export const BadFlexBox: FC<{
  place?: { align?: string; justify?: string }
}> = () => <></>

export const badFlexBox = (
  <BadFlexBox place={{ align: 'center' }}>children</BadFlexBox>
)

export const GoodFlexBox: FC<{
  align?: string
  justify?: string
}> = () => <></>

export const goodFlexBox = <GoodFlexBox align="center">children</GoodFlexBox>

export const Select: FC<{ options: string[] }> = () => <></>

const constantOptions = ['hello', 'world']
export const goodSelect = <Select options={constantOptions} />
export const badSelect = <Select options={['hello', 'world']} />
