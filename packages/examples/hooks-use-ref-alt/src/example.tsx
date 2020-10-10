import React, { FC, useRef, useState } from 'react'

export const SelfDestruct: FC = () => {
  const [destroyed, setDestroyed] = useState(false)
  const timeoutRef = useRef<number>()

  const stop = () => {
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = undefined
  }
  const start = () => {
    stop()
    timeoutRef.current = window.setTimeout(() => {
      setDestroyed(true)
    }, 5000)
  }

  return destroyed ? null : (
    <>
      <button type="button" onClick={start}>
        start self-destruct sequence
      </button>
      <button type="button" onClick={stop}>
        stop self-destruct sequence
      </button>
      <p>this message will destroy itself in 5 seconds</p>
    </>
  )
}

export default <SelfDestruct />
