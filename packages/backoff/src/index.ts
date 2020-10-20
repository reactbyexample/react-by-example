/* eslint-disable no-await-in-loop */
import { calculateDelay } from './calculate-delay'
import { timeout } from './timeout'
import { BackoffArgs } from './types'

const abort = Symbol('backoff.abort')
export type Abort = typeof abort

export const backoff = async <T>(
  operation: (attempt: number) => Promise<T | Abort>,
  {
    maxRetries = 10,
    factor = 2,
    minTimeout = 100,
    maxTimeout = Infinity,
    randomize = true,
  }: BackoffArgs = {},
): Promise<T> => {
  let error = new Error('[backoff] maxRetries exceeded')

  for (let attempt = 0; attempt < maxRetries; attempt += 1) {
    try {
      const result = await operation(attempt)
      if (result === abort) {
        error = new Error('[backoff] aborted')
        break
      }
      return result
    } catch {
      const delay = calculateDelay(
        attempt,
        minTimeout,
        maxTimeout,
        factor,
        randomize,
      )
      await timeout(delay)
    }
  }

  throw error
}
backoff.abort = abort
