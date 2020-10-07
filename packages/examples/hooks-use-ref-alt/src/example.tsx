import React, { FC, useRef } from 'react'

const UseRefAlt: FC = () => {
  const intervalRef = useRef<number>()

  const stop = () => {
    window.clearInterval(intervalRef.current)
    intervalRef.current = undefined
  }
  const start = () => {
    stop()
    intervalRef.current = window.setInterval(() => {
      document.title = `[${document.title}`
    }, 100)
  }

  return (
    <>
      <button type="button" onClick={start}>
        start tick
      </button>
      <button type="button" onClick={stop}>
        stop tick
      </button>
      <p>check out the title bar</p>
    </>
  )
}

export default <UseRefAlt />
