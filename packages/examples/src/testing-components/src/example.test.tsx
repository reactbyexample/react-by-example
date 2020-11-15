import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react'
import React from 'react'
import { GifFinder } from './example'
import { TenorApi } from './tenor-api'
import { promiseShim } from './testing/promise-shim'

jest.mock('./tenor-api', () => ({
  TenorApi: {
    search: jest.fn(() => Promise.resolve(['gif1', 'gif2', 'gif3'])),
  },
}))

describe('GifFinder', () => {
  let component: RenderResult
  let onFound: jest.Mock

  promiseShim()

  beforeEach(() => {
    onFound = jest.fn()
    component = render(<GifFinder onFound={onFound} />)
  })

  afterEach(() => {
    cleanup()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })

  describe('when searching', () => {
    let queryInput: HTMLElement

    beforeEach(() => {
      queryInput = component.getByLabelText('find a gif')
      fireEvent.input(queryInput, { target: { value: 'react' } })
    })

    it('should start a search', () => {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(TenorApi.search).toHaveBeenCalledWith('react')

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(TenorApi.search).toHaveBeenCalledTimes(1)
    })

    it('should render the gifs', () => {
      expect(component.container).toMatchSnapshot()
    })

    describe('when clicking a gif', () => {
      beforeEach(() => {
        const [, gif2] = component.getAllByLabelText('gif')
        fireEvent.click(gif2)
      })

      it('should call onFound', () => {
        expect(onFound).toHaveBeenCalledWith('gif2')
        expect(onFound).toHaveBeenCalledTimes(1)
      })
    })
  })
})
