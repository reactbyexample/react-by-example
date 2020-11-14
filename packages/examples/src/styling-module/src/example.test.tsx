import { act, render, RenderResult } from '@testing-library/react'
import React from 'react'
import { Module } from './example'
import { SliderProps } from './slider'

const mockSliderOnChange = jest.fn<void, [number]>()
jest.mock('./slider.tsx', () => ({
  __esModule: true,
  Slider: ({ onChange }: SliderProps) => {
    mockSliderOnChange.mockImplementation(onChange)
    return <div id="slider" />
  },
}))

describe('Module', () => {
  let component: RenderResult
  let circle: HTMLElement

  beforeEach(() => {
    component = render(<Module />)
    circle = component.getByText('awesome circle')
  })

  afterEach(() => {
    mockSliderOnChange.mockReset()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })

  it('should set dynamic styles', () => {
    expect(circle.style).toMatchObject({ fontSize: '1em' })
  })

  describe('when changing slider', () => {
    describe('max', () => {
      beforeEach(() => {
        act(() => {
          mockSliderOnChange(150)
        })
      })

      it('should update styles', () => {
        expect(circle.style).toMatchObject({ fontSize: '1.5em' })
      })
    })

    describe('min', () => {
      beforeEach(() => {
        act(() => {
          mockSliderOnChange(75)
        })
      })

      it('should update styles', () => {
        expect(circle.style).toMatchObject({ fontSize: '0.75em' })
      })
    })
  })
})
