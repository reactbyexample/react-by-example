import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { Slider } from './slider'

const Wrapper = styled.div`
  min-height: 250px;
  min-width: 250px;
`

const Circle = styled.div<{ fontSize: number }>`
  align-items: center;
  background-color: dodgerblue;
  border-radius: 99999px;
  color: aliceblue;
  display: flex;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
  font-size: ${(props) => props.fontSize}em;
  height: 10em;
  justify-content: center;
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  width: 10em;
`

export const Styled: FC = () => {
  const [value, setValue] = useState(100)

  return (
    <Wrapper>
      <Slider value={value} onChange={setValue} />
      <Circle fontSize={value * 0.01}>awesome circle</Circle>
    </Wrapper>
  )
}

export default <Styled />
