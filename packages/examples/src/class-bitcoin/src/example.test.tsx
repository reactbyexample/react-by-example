import { act, cleanup, render, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { BitcoinAPI } from './bitcoin-api'
import { Bitcoin } from './example'
import { Deferred } from './testing'

jest.mock('./bitcoin-api')
const MockBitcoinAPI = BitcoinAPI as jest.Mocked<typeof BitcoinAPI>

describe('Bitcoin', () => {
  let component: RenderResult
  let getPriceDeferred: Deferred<number>

  beforeEach(() => {
    getPriceDeferred = new Deferred()
    MockBitcoinAPI.getPrice.mockReturnValue(getPriceDeferred.promise)
    component = render(<Bitcoin />)
  })

  afterEach(() => {
    cleanup()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })

  describe('when price resolves', () => {
    beforeEach(async () => {
      getPriceDeferred.resolve(12345)
      await act(async () => {
        await getPriceDeferred.promise
      })
    })

    it('should snapshot', () => {
      expect(component.container).toMatchSnapshot()
    })

    it('should show price', () => {
      expect(component.container).toHaveTextContent(/£12345/)
    })

    describe('when switching fiat', () => {
      beforeEach(async () => {
        getPriceDeferred = new Deferred()
        getPriceDeferred.resolve(23456)
        MockBitcoinAPI.getPrice.mockReturnValue(getPriceDeferred.promise)
        userEvent.click(component.getByText('$'))

        await act(async () => {
          await getPriceDeferred.promise
        })
      })

      it('should show price', () => {
        expect(component.container).toHaveTextContent(/\$23456/)
      })

      describe('when switching fiat', () => {
        beforeEach(async () => {
          getPriceDeferred = new Deferred()
          getPriceDeferred.resolve(345678)
          MockBitcoinAPI.getPrice.mockReturnValue(getPriceDeferred.promise)
          userEvent.click(component.getByText('£'))

          await act(async () => {
            await getPriceDeferred.promise
          })
        })

        it('should show price', () => {
          expect(component.container).toHaveTextContent(/£345678/)
        })
      })

      describe('when switching fiat quickly', () => {
        beforeEach(async () => {
          const previousGetPriceDeferred = new Deferred<number>()
          MockBitcoinAPI.getPrice.mockReturnValue(
            previousGetPriceDeferred.promise,
          )
          userEvent.click(component.getByText('£'))

          getPriceDeferred = new Deferred()
          getPriceDeferred.resolve(4567)
          MockBitcoinAPI.getPrice.mockReturnValue(getPriceDeferred.promise)
          userEvent.click(component.getByText('$'))

          previousGetPriceDeferred.resolve(5678)

          await act(async () => {
            await getPriceDeferred.promise
            await previousGetPriceDeferred.promise
          })
        })

        // TODO fix race-condition
        it.skip('should show price for latest fiat', () => {
          expect(component.container).toHaveTextContent(/\$4567/)
        })
      })
    })
  })

  describe('when request rejects', () => {
    beforeEach(async () => {
      getPriceDeferred.reject()
      await act(async () => {
        await getPriceDeferred.promise.catch(() => null)
      })
    })

    it('should snapshot', () => {
      expect(component.container).toMatchSnapshot()
    })

    it('should show error', () => {
      expect(component.container).toHaveTextContent(/£NaN/)
    })
  })
})
