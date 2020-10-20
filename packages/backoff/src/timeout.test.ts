import { timeout } from './timeout'

describe('timeout', () => {
  let resolved = false

  beforeEach(() => {
    jest.useFakeTimers()
    const usesTimeout = async () => {
      await timeout(500)
      resolved = true
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    usesTimeout()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should not resolve yet', () => {
    expect(resolved).toBe(false)
  })

  describe('when timeout is over', () => {
    beforeEach(() => {
      jest.advanceTimersByTime(500)
    })

    it('should resolve', () => {
      expect(resolved).toBe(true)
    })
  })
})
