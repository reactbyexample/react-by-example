import React, { FC, useMemo } from 'react'

const fib = (n: number): number => {
  if (n <= 2) {
    return 1
  }

  return fib(n - 1) + fib(n - 2)
}

const Fib: FC<{ n: number }> = ({ n }) => {
  const f = useMemo(() => fib(n), [n])

  return (
    <pre>
      {10}-th fibonacci number: {f}
    </pre>
  )
}

export default <Fib n={10} />
