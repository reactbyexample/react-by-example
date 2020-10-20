export const interleave = <T, U>(
  leftIterable: Iterable<T>,
  rightIterable: Iterable<U>,
): Iterable<T | U> => {
  const rightIterator = rightIterable[Symbol.iterator]()

  return (function* interleaved() {
    let first = true
    for (const leftValue of leftIterable) {
      if (!first) {
        const rightResult = rightIterator.next()
        if (rightResult.done) throw new Error()
        yield rightResult.value
      }
      yield leftValue
      first = false
    }
  })()
}
