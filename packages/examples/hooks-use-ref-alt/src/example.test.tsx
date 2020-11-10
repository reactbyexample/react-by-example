import { act, fireEvent, render, RenderResult } from '@testing-library/react'
import React from 'react'
import { SelfDestruct } from './example'

describe('SelfDestruct', () => {
  let component: RenderResult
  let start: HTMLElement
  let cancel: HTMLElement

  beforeEach(() => {
    jest.useFakeTimers()
    component = render(<SelfDestruct />)
    start = component.getByText('start self-destruct sequence')
    cancel = component.getByText('cancel self-destruct sequence')
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })

  describe('when starting self-destruct', () => {
    beforeEach(() => {
      fireEvent.click(start)
    })

    describe('when the timer is up', () => {
      beforeEach(() => {
        act(() => {
          jest.advanceTimersByTime(2000)
        })
      })

      it('should destroy', () => {
        expect(component.container).toBeEmptyDOMElement()
      })
    })

    describe('when the timer is cancelled', () => {
      beforeEach(() => {
        act(() => {
          jest.advanceTimersByTime(1000)
          fireEvent.click(cancel)
          jest.advanceTimersByTime(1000)
        })
      })

      it('should not destroy', () => {
        expect(component.container).not.toBeEmptyDOMElement()
      })

      describe('when restarting self-destruct', () => {
        beforeEach(() => {
          fireEvent.click(start)
        })

        describe('when the timer is up', () => {
          beforeEach(() => {
            act(() => {
              jest.advanceTimersByTime(2000)
            })
          })

          it('should destroy', () => {
            expect(component.container).toBeEmptyDOMElement()
          })
        })

        describe('when the timer is cancelled', () => {
          beforeEach(() => {
            act(() => {
              jest.advanceTimersByTime(1000)
              fireEvent.click(cancel)
              jest.advanceTimersByTime(1000)
            })
          })

          it('should not destroy', () => {
            expect(component.container).not.toBeEmptyDOMElement()
          })
        })
      })
    })
  })
})
