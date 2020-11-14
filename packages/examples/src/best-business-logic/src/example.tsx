/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { FC, useEffect, useState } from 'react'

// #region tangled business logic
export const WithBusiness: FC = () => {
  const [result, setResult] = useState(null)
  useEffect(() => {
    fetch('my-business/api/resource.json', {
      headers: { that: 'a', component: 'should', not: 'worry', about: '!' },
    })
      .then((r) => r.json()) // untyped interface
      .then(setResult)
    // no error handling
  }, [])
  return <>display {result} here</>
}

/**
 * @example tests
 * ```
 * describe('WithBusiness', () => {
 *   beforeEach(() => {
 *     // no no
 *     jest.spyOn(window, 'fetch').mockRejectedValue('')
 *   })
 * })
 * ```
 */

// #endregion

// #region separate business logic
interface Resource {
  defined: 'interface'
}
class MyApiImpl {
  // eslint-disable-next-line class-methods-use-this
  getResource(): Promise<Resource> {
    throw new Error('not implemented')
  }
}
const MyApi = new MyApiImpl()

/**
 * @example tests
 * ```
 * describe('MyApi', () => {
 *   beforeEach(() => {
 *     // the only place where this has to be done
 *     jest.spyOn(window, 'fetch').mockRejectedValue('')
 *   })
 * })
 * ```
 */

const useMyApiResource = (): [null | unknown, Resource | null] => {
  const [result, setResult] = useState<Resource | null>(null) // typed
  const [error, setError] = useState<null | unknown>(null)
  useEffect(() => {
    let shouldUpdate = true
    MyApi.getResource()
      .then((r) => shouldUpdate && setResult(r))
      .catch((e) => shouldUpdate && setError(e)) // unified error handling
    return () => {
      shouldUpdate = false
    }
  }, [])

  return [error, result] // clear interface that forces error handling
}

export const WithoutBusiness: FC = () => {
  const [error, resource] = useMyApiResource()

  if (error) {
    return <>oh no</>
  }
  if (resource) {
    return <>here it is {resource.defined}</>
  }
  return <>loading</>
}

// it is much easier to mock either hook or api (don't mock both)
/**
 * @example tests
 * ```
 * jest.mock('./useMyApiResource')
 * const useMyApiResourceMock = useMyApiResource as jest.MockedFunction<
 *   typeof useMyApiResource
 * >
 * describe('WithoutBusiness', () => {
 *   beforeEach(() => {
 *     useMyApiResourceMock.mockReturnValue([null, { defined: 'interface' }])
 *   })
 * })
 * ```
 */
// #endregion
