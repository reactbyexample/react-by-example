import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react'
import React, { FC } from 'react'
import { Slider } from './slider'

describe('Slider', () => {
  let component: RenderResult

  let value: number
  let onChange: jest.Mock

  const Test: FC = () => {
    return <Slider value={value} onChange={onChange} />
  }

  beforeEach(() => {
    value = 100
    onChange = jest.fn()
    component = render(<Test />)
  })

  afterEach(() => {
    cleanup()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })

  describe('when value changes', () => {
    beforeEach(() => {
      value = 75
      component.rerender(<Test />)
    })

    it('should update value', () => {
      expect(component.container).toHaveTextContent('75')
    })
  })

  describe('when input is changed', () => {
    beforeEach(() => {
      const input = component.getByRole('slider') as HTMLInputElement
      fireEvent.change(input, { target: { value: '75' } })
    })

    it('should call onChange', () => {
      expect(onChange).toHaveBeenCalledWith(75)
      expect(onChange).toHaveBeenCalledTimes(1)
    })
  })
})
