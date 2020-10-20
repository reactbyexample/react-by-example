import React, { FC, useState } from 'react'
import './global.css'
import { Slider } from './slider'

export const Global: FC = () => {
  const [value, setValue] = useState(100)

  return (
    <div className="global__wrapper">
      <Slider value={value} onChange={setValue} />
      <div className="global__circle" style={{ fontSize: `${value * 0.01}em` }}>
        awesome circle
      </div>
    </div>
  )
}

export default <Global />
