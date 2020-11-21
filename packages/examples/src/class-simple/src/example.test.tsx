import { cleanup, render, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  afterEach(() => {
    cleanup()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })

  describe('when decrementing', () => {
    beforeEach(() => {
      userEvent.click(decrement)
    })

    it('should show -1', () => {
      expect(component.container).toHaveTextContent(/-1/)
    })

    describe('when decrementing', () => {
      beforeEach(() => {
        userEvent.click(decrement)
        userEvent.click(decrement)
        userEvent.click(decrement)
        userEvent.click(decrement)
      })

      it('should show -5', () => {
        expect(component.container).toHaveTextContent(/-5/)
      })

      describe('when incrementing', () => {
        beforeEach(() => {
          userEvent.click(increment)
          userEvent.click(increment)
          userEvent.click(increment)
          userEvent.click(increment)
          userEvent.click(increment)
        })

        it('should show 0', () => {
          expect(component.container).toHaveTextContent(/0/)
        })
      })
    })
  })

  describe('when incrementing', () => {
    beforeEach(() => {
      userEvent.click(increment)
    })

    it('should show 1', () => {
      expect(component.container).toHaveTextContent(/1/)
    })

    describe('when incrementing', () => {
      beforeEach(() => {
        userEvent.click(increment)
        userEvent.click(increment)
        userEvent.click(increment)
        userEvent.click(increment)
      })

      it('should show 5', () => {
        expect(component.container).toHaveTextContent(/5/)
      })

      describe('when decrementing', () => {
        beforeEach(() => {
          userEvent.click(decrement)
          userEvent.click(decrement)
          userEvent.click(decrement)
          userEvent.click(decrement)
          userEvent.click(decrement)
        })

        it('should show 0', () => {
          expect(component.container).toHaveTextContent(/0/)
        })
      })
    })
  })
})
