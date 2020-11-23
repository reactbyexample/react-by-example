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
 *     jest.spyOn(window, 'fetch').mockRejectedValue(new Error())
 *   })
 * })
 * ```
 */

// #endregion

//

// #region separate business logic
// #region my-api.ts
export interface Resource {
  defined: 'interface'
}
class MyAPIImpl {
  getResource(): Promise<Resource> {
    throw new Error('not implemented')
  }
}
export const MyAPI = new MyAPIImpl()

/**
 * @example tests
 * ```
 * describe('MyApi', () => {
 *   beforeEach(() => {
 *     // the only place where this has to be done
 *     jest.spyOn(window, 'fetch').mockRejectedValue(new Error())
 *   })
 * })
 * ```
 */
// #endregion

// #region use-my-resource.ts
export const useMyAPIResource = (): [null | unknown, Resource | null] => {
  const [result, setResult] = useState<Resource | null>(null) // typed
  const [error, setError] = useState<null | unknown>(null)
  useEffect(() => {
    let shouldUpdate = true
    MyAPI.getResource()
      .then((r) => shouldUpdate && setResult(r))
      .catch((e) => shouldUpdate && setError(e)) // unified error handling
    return () => {
      shouldUpdate = false
    }
  }, [])

  return [error, result] // clear interface that forces error handling
}
// #endregion

// #region my-resource.tsx
export const WithoutBusiness: FC = () => {
  const [error, resource] = useMyAPIResource()

  if (error) return <>oh no</>

  if (resource) return <>here it is {resource.defined}</>

  return <>loading</>
}

// it is much easier to mock either hook or api (don't mock both)
/**
 * @example tests
 * ```
 * jest.mock('./use-my-api-resource')
 * const useMyAPIResourceMock = useMyAPIResource as jest.MockedFunction<
 *   typeof useMyAPIResource
 * >
 * describe('WithoutBusiness', () => {
 *   beforeEach(() => {
 *     useMyAPIResourceMock.mockReturnValue([null, { defined: 'interface' }])
 *   })
 * })
 * ```
 */
// #endregion
// #endregion
