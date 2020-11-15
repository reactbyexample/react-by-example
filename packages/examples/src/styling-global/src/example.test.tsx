import { act, cleanup, render, RenderResult } from '@testing-library/react'
import React from 'react'
import { Global } from './example'
import { SliderProps } from './slider'

const mockSliderOnChange = jest.fn<void, [number]>()
jest.mock('./slider.tsx', () => ({
  __esModule: true,
  Slider: ({ onChange }: SliderProps) => {
    mockSliderOnChange.mockImplementation(onChange)
    return <div id="slider" />
  },
}))

describe('Global', () => {
  let component: RenderResult
  let circle: HTMLElement

  beforeEach(() => {
    component = render(<Global />)
    circle = component.getByText('awesome circle')
  })

  afterEach(() => {
    mockSliderOnChange.mockReset()
    cleanup()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })

  it('should set dynamic styles', () => {
    expect(circle).toHaveStyle({ fontSize: '1em' })
  })

  describe('when changing slider', () => {
    describe('max', () => {
      beforeEach(() => {
        act(() => {
          mockSliderOnChange(150)
        })
      })

      it('should update styles', () => {
        expect(circle).toHaveStyle({ fontSize: '1.5em' })
      })
    })

    describe('min', () => {
      beforeEach(() => {
        act(() => {
          mockSliderOnChange(75)
        })
      })

      it('should update styles', () => {
        expect(circle).toHaveStyle({ fontSize: '0.75em' })
      })
    })
  })
})
