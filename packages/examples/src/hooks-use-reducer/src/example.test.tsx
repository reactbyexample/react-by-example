import { cleanup, render, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Counter } from './example'

describe('Counter', () => {
  let component: RenderResult
  let increment: HTMLElement
  let decrement: HTMLElement

  beforeEach(() => {
    component = render(<Counter />)
    increment = component.getByText('+')
    decrement = component.getByText('-')
  })

  afterEach(() => {
    cleanup()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })

  it('should default to 0', () => {
    expect(component.container).toHaveTextContent(/Count: 0/)
  })

  describe('when incrementing', () => {
    beforeEach(() => {
      userEvent.click(increment)
    })

    it('should increment', () => {
      expect(component.container).toHaveTextContent(/Count: 1/)
    })

    describe('when incrementing', () => {
      beforeEach(() => {
        userEvent.click(increment)
        userEvent.click(increment)
        userEvent.click(increment)
        userEvent.click(increment)
      })

      it('should increment', () => {
        expect(component.container).toHaveTextContent(/Count: 5/)
      })
    })

    describe('when decrementing', () => {
      beforeEach(() => {
        userEvent.click(decrement)
        userEvent.click(decrement)
        userEvent.click(decrement)
        userEvent.click(decrement)
      })

      it('should increment', () => {
        expect(component.container).toHaveTextContent(/Count: -3/)
      })
    })
  })
})
