import React, { FC, useState } from 'react'
import classes from './example.module.css'
import { Slider } from './slider'

export const Module: FC = () => {
  const [value, setValue] = useState(100)

  return (
    <div className={classes.wrapper}>
      <Slider value={value} onChange={setValue} />
      <div className={classes.circle} style={{ fontSize: `${value * 0.01}em` }}>
        awesome circle
      </div>
    </div>
  )
}

export default <Module />
