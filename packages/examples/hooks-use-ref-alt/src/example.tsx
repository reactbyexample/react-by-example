import React, { FC, useRef, useState } from 'react'

export const SelfDestruct: FC = () => {
  const [destroyed, setDestroyed] = useState(false)
  const timeoutRef = useRef<number>()

  const cancel = () => {
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = undefined
  }
  const start = () => {
    cancel()
    timeoutRef.current = window.setTimeout(() => {
      setDestroyed(true)
    }, 2000)
  }

  return destroyed ? null : (
    <>
      <button type="button" onClick={start}>
        start self-destruct sequence
      </button>
      <button type="button" onClick={cancel}>
        cancel self-destruct sequence
      </button>
      <p>this message will destroy itself in 2 seconds</p>
    </>
  )
}

export default <SelfDestruct />
