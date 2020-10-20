import { Abort, backoff } from '.'
import { calculateDelay } from './calculate-delay'
import { timeout } from './timeout'

const tick = () => new Promise((resolve) => setImmediate(resolve))
const tries = async (n: number) => {
  for (let t = 0; t < n; t += 1) {
    jest.advanceTimersByTime(100)
    // eslint-disable-next-line no-await-in-loop
    await tick()
  }
}
const rethrows = async <T>(p: Promise<T>): Promise<T> => {
  try {
    return await p
  } catch (e) {
    await tick()
    throw e
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
      let promise: Promise<number>
      let operation: jest.MockedFunction<() => Promise<number | Abort>>
      beforeEach(() => {
        operation = jest.fn(async () => {
          await timeout(100)
          return backoff.abort
        })

        promise = rethrows(backoff(operation))
      })

      it('should not retry', async () => {
        jest.advanceTimersByTime(100)
        await tick()
        await expect(promise).rejects.toThrow('[backoff] aborted')
        expect(operation).toHaveBeenCalledTimes(1)
      })
    })

    describe('never succeeds', () => {
      let promise: Promise<void>
      beforeEach(() => {
        promise = rethrows(backoff(() => Promise.reject()))
      })

      it('should give up after 10 tries', async () => {
        await tries(10)
        await expect(promise).rejects.toThrow('[backoff] maxRetries exceeded')
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

    describe('maxRetries', () => {
      let promise: Promise<void>
      let operation: jest.MockedFunction<() => Promise<void>>
      beforeEach(() => {
        operation = jest.fn().mockRejectedValue(null)
        promise = rethrows(backoff(operation, { maxRetries: 20 }))
      })

      it('should allow for 20 tries', async () => {
        await tries(20)
        await expect(promise).rejects.toThrow('[backoff] maxRetries exceeded')
        expect(operation).toHaveBeenCalledTimes(20)
      })
    })
  })
})
