import { Abort, backoff } from '.'
import { calculateDelay } from './calculate-delay'
import { interleave } from './interleave'
import { timeout } from './timeout'

const tick = () => new Promise((resolve) => setImmediate(resolve))
const tries = async (n: number) => {
  const advances = Array.from({ length: n }).map(() => () =>
    jest.advanceTimersByTime(100),
  )
  const ticks = Array.from({ length: n }).map(() => () => tick())
  const plan = Array.from(interleave(advances, ticks))
  while (plan.length) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const task = plan.shift()!
    // eslint-disable-next-line no-await-in-loop
    await task()
  }
}
type Nodeify<T> = Promise<[Error, null] | [null, T]>
const nodeify = async <T>(promise: Promise<T>): Nodeify<T> => {
  try {
    const result = await promise
    return [null, result]
  } catch (e) {
    return [e, null]
  }
}

jest.mock('./calculate-delay', () => ({
  calculateDelay: jest.fn().mockReturnValue(100),
}))

describe('backoff', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.useRealTimers()
  })

  describe('default', () => {
    describe('resolves', () => {
      let promise: Promise<void>
      beforeEach(() => {
        promise = backoff(async (attempt) => {
          if (attempt < 3) throw new Error()
          await timeout(100)
        })
      })

      it('should resolve on the 4th attempt', async () => {
        await tries(4)
        await expect(promise).resolves.toBeUndefined()
      })
    })

    describe('aborts', () => {
      let operation: jest.MockedFunction<() => Promise<number | Abort>>
      let promise: Nodeify<number>
      beforeEach(() => {
        operation = jest.fn(async () => {
          await timeout(100)
          return backoff.abort
        })

        promise = nodeify(backoff(operation))
      })

      it('should not retry', async () => {
        jest.advanceTimersByTime(100)
        await tick()
        await expect(promise).resolves.toEqual([
          new Error('[backoff] aborted'),
          null,
        ])
        expect(operation).toHaveBeenCalledTimes(1)
      })
    })

    describe('never succeeds', () => {
      let promise: Nodeify<void>
      beforeEach(() => {
        promise = nodeify(backoff(() => Promise.reject()))
      })

      it('should give up after 10 tries', async () => {
        await tries(10)
        await expect(promise).resolves.toEqual([
          new Error('[backoff] maxAttempts exceeded'),
          null,
        ])
      })
    })
  })

  describe('args', () => {
    describe('forwarded to calculateDelay', () => {
      let promise: Promise<void>
      const args = {
        factor: 3,
        maxTimeout: 99,
        minTimeout: 11,
        randomize: false,
      }

      beforeEach(() => {
        promise = backoff(
          (attempt) => (attempt <= 0 ? Promise.reject() : Promise.resolve()),
          args,
        )
      })

      it('should forward args to calculateDelay', async () => {
        expect(calculateDelay).toHaveBeenLastCalledWith(
          0,
          args.minTimeout,
          args.maxTimeout,
          args.factor,
          args.randomize,
        )
        await tries(1)
        await expect(promise).resolves.toBeUndefined()
      })
    })

    describe('maxAttempts', () => {
      let operation: jest.MockedFunction<() => Promise<void>>
      let promise: Nodeify<void>
      beforeEach(() => {
        operation = jest.fn().mockRejectedValue(null)
        promise = nodeify(backoff(operation, { maxAttempts: 20 }))
      })

      it('should allow for 20 tries', async () => {
        await tries(20)
        await expect(promise).resolves.toEqual([
          new Error('[backoff] maxAttempts exceeded'),
          null,
        ])
        expect(operation).toHaveBeenCalledTimes(20)
      })
    })
  })

  describe('edges', () => {
    let operation: jest.MockedFunction<() => Promise<void>>
    let promise: Nodeify<void>
    beforeEach(() => {
      operation = jest.fn(() => Promise.reject())
      promise = nodeify(backoff(operation, { maxAttempts: 1 }))
    })

    it('should start immediately', () => {
      expect(operation).toHaveBeenCalledTimes(1)
    })

    it('should not wait after last try', async () => {
      await expect(promise).resolves.toEqual([
        new Error('[backoff] maxAttempts exceeded'),
        null,
      ])
    })
  })
})
