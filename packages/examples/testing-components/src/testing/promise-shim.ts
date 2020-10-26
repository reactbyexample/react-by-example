import { act } from '@testing-library/react'

export const promiseShim = (): void => {
  let spy: jest.SpyInstance

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const realThen = Promise.prototype.then
    spy = jest
      .spyOn(Promise.prototype, 'then')
      .mockImplementation(function mockThen(this: Promise<unknown>, fn) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        realThen.call(this, (v) => {
          act(() => {
            if (fn) fn(v)
          })
        })
        return this
      })
  })

  afterAll(() => {
    spy.mockRestore()
  })
}
