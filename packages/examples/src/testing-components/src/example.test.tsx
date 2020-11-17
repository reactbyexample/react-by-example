import {
  act,
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react'
import React from 'react'
import { GifFinder } from './example'
import { TenorApi } from './tenor-api'

describe('GifFinder', () => {
  let component: RenderResult
  let onFound: jest.Mock

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
    let searchSpy: jest.SpyInstance

    beforeEach(async () => {
      const searchPromise = Promise.resolve(['gif1', 'gif2', 'gif3'])
      searchSpy = jest.spyOn(TenorApi, 'search').mockReturnValue(searchPromise)
      queryInput = component.getByLabelText('find a gif')
      fireEvent.input(queryInput, { target: { value: 'react' } })
      await act(async () => {
        await searchPromise
      })
    })

    afterEach(() => {
      searchSpy.mockRestore()
    })

    it('should start a search', () => {
      expect(searchSpy).toHaveBeenCalledWith('react')
      expect(searchSpy).toHaveBeenCalledTimes(1)
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
