import { calculateDelay } from './calculate-delay'
import { interleave } from './interleave'
import { timeout } from './timeout'
import { BackoffArgs } from './types'

const abort = Symbol('backoff.abort')
export type Abort = typeof abort

type Signal<T> =
  | { type: 'done'; value: T }
  | { type: 'abort' }
  | { type: 'continue' }

export const backoff = async <T>(
  operation: (attempt: number) => Promise<T | Abort>,
  {
    maxAttempts = 10,
    factor = 2,
    minTimeout = 100,
    maxTimeout = Infinity,
    randomize = true,
  }: BackoffArgs = {},
): Promise<T> => {
  const attempts = Array.from({ length: maxAttempts }).map(
    (_, i) => async (): Promise<Signal<T>> => {
      try {
        const result = await operation(i)
        if (result === abort) return { type: 'abort' }
        return { type: 'done', value: result }
      } catch {
        return { type: 'continue' }
      }
    },
  )
  const timeouts = Array.from({ length: maxAttempts - 1 }).map(
    (_, i) => async (): Promise<Signal<T>> => {
      const delay = calculateDelay(i, minTimeout, maxTimeout, factor, randomize)
      await timeout(delay)
      return { type: 'continue' }
    },
  )
  const plan = Array.from(interleave(attempts, timeouts))

  while (plan.length) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const task = plan.shift()!
    // eslint-disable-next-line no-await-in-loop
    const signal = await task()
    switch (signal.type) {
      case 'abort':
        throw new Error('[backoff] aborted')
      case 'done':
        return signal.value
      default:
        throw new Error('[backoff] unexpected signal')
      case 'continue':
      // continue
    }
  }

  throw new Error('[backoff] maxAttempts exceeded')
}
backoff.abort = abort
