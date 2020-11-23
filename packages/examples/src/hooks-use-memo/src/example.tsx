import React, { FC, useMemo } from 'react'

const fib = (n: number): number => {
  if (n <= 2) return 1

  return fib(n - 1) + fib(n - 2)
}

export const Fib: FC<{ n: number }> = ({ n }) => {
  const f = useMemo(() => fib(n), [n])

  return (
    <pre>
      {n}-th fibonacci number: {f}
    </pre>
  )
}

export default <Fib n={10} />
