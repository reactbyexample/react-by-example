import React, { FC, useEffect, useState } from 'react'

const getTime = () => `the time is ${new Date().toLocaleTimeString()}`

export const DynamicClock: FC = () => {
  const [time, setTime] = useState<string>(getTime())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTime())
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return <div>{time}</div>
}

export default <DynamicClock />
