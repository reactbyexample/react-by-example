import React, { FC, useState } from 'react'

export const Counter: FC = () => {
  const [value, setValue] = useState(0)

  return (
    <>
      <button type="button" onClick={() => setValue(value - 1)}>
        -
      </button>
      <span> {value} </span>
      <button type="button" onClick={() => setValue(value + 1)}>
        +
      </button>
    </>
  )
}

export default <Counter />
