import React, { FC, useState } from 'react'

export const Counter: FC = () => {
  const [count, setCount] = useState(0)
  return (
    <>
      <button type="button" onClick={() => setCount(count - 1)}>
        -
      </button>
      <span> {count} </span>
      <button type="button" onClick={() => setCount(count + 1)}>
        +
      </button>
    </>
  )
}

export default <Counter />
