import { act, cleanup, render, RenderResult } from '@testing-library/react'
import React from 'react'
import { Styled } from './example'
import { SliderProps } from './slider'

const mockSliderOnChange = jest.fn<void, [number]>()
jest.mock('./slider.tsx', () => ({
  __esModule: true,
  Slider: ({ onChange }: SliderProps) => {
    mockSliderOnChange.mockImplementation(onChange)
    return <div id="slider" />
  },
}))

describe('Styled', () => {
  let component: RenderResult

  beforeEach(() => {
    component = render(<Styled />)
  })

  afterEach(() => {
    mockSliderOnChange.mockReset()
    cleanup()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })

  describe('when changing slider', () => {
    describe('max', () => {
      beforeEach(() => {
        act(() => {
          mockSliderOnChange(150)
        })
      })

      it('should update styles', () => {
        expect(component.container).toMatchSnapshot()
      })
    })

    describe('min', () => {
      beforeEach(() => {
        act(() => {
          mockSliderOnChange(75)
        })
      })

      it('should update styles', () => {
        expect(component.container).toMatchSnapshot()
      })
    })
  })
})
