import { interleave } from './interleave'

function* integers(start = 0) {
  let i = start
  while (true) {
    yield i
    i += 1
  }
}

function* fib() {
  yield 0
  yield 1
  let prev = [0, 1]
  while (true) {
    const [l, r] = prev
    const next = l + r
    prev = [r, next]
    yield next
  }
}

function* take<T>(iterable: Iterable<T>, n: number) {
  let count = 0
  for (const next of iterable) {
    if (count >= n) return
    yield next
    count += 1
  }
  if (count < n) throw new Error()
}

describe('interleave', () => {
  it.each([
    [
      ['a', 'b', 'c'],
      [0, 1],
      ['a', 0, 'b', 1, 'c'],
    ],
    [['a', 'b', 'c'], integers(), ['a', 0, 'b', 1, 'c']],
  ])('should interleave', (array, iterable, expected) => {
    expect(Array.from(interleave(array, iterable))).toEqual(expected)
  })

  it('should take infinite iterables', () => {
    expect(Array.from(take(interleave(integers(-99), fib()), 21))).toEqual([
      -99,
      0,
      -98,
      1,
      -97,
      1,
      -96,
      2,
      -95,
      3,
      -94,
      5,
      -93,
      8,
      -92,
      13,
      -91,
      21,
      -90,
      34,
      -89,
    ])
  })
})
