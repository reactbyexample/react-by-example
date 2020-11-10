import { fireEvent, render, RenderResult } from '@testing-library/react'
import React from 'react'
import { Counter } from './example'

describe('Counter', () => {
  let component: RenderResult
  let decrement: HTMLElement
  let increment: HTMLElement

  beforeEach(() => {
    component = render(<Counter />)
    decrement = component.getByText('-')
    increment = component.getByText('+')
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })

  it('should default to 0', () => {
    expect(component.container).toHaveTextContent('0')
  })

  describe('when incrementing', () => {
    beforeEach(() => {
      fireEvent.click(increment)
    })

    it('should show 1', () => {
      expect(component.container).toHaveTextContent('1')
    })

    describe('when incrementing', () => {
      beforeEach(() => {
        fireEvent.click(increment)
      })

      it('should show 2', () => {
        expect(component.container).toHaveTextContent('2')
      })
    })

    describe('when decrementing', () => {
      beforeEach(() => {
        fireEvent.click(decrement)
      })

      it('should show 0', () => {
        expect(component.container).toHaveTextContent('0')
      })
    })
  })

  describe('when decrementing', () => {
    beforeEach(() => {
      fireEvent.click(decrement)
    })

    it('should show -1', () => {
      expect(component.container).toHaveTextContent('-1')
    })

    describe('when decrementing', () => {
      beforeEach(() => {
        fireEvent.click(decrement)
      })

      it('should show -2', () => {
        expect(component.container).toHaveTextContent('-2')
      })
    })

    describe('when incrementing', () => {
      beforeEach(() => {
        fireEvent.click(increment)
      })

      it('should show 0', () => {
        expect(component.container).toHaveTextContent('0')
      })
    })
  })
})
