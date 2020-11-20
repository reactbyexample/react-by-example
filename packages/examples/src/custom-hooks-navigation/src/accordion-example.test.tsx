import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { FC, useMemo } from 'react'
import { Accordion } from './accordion-example'

describe('Accordion', () => {
  let component: RenderResult

  const Test: FC = () => {
    const items = useMemo(
      () => [
        { id: 'hello', title: 'Hello', content: <p>hello content</p> },
        { id: 'world', title: 'World', content: <p>world content</p> },
        {
          id: 'accordion',
          title: 'Accordion',
          content: <p>accordion content</p>,
        },
        { id: 'example', title: 'Example', content: <p>example content</p> },
      ],
      [],
    )
    return <Accordion items={items} />
  }

  beforeEach(() => {
    component = render(<Test />)
  })

  afterEach(() => {
    cleanup()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })

  describe('when clicking item', () => {
    beforeEach(() => {
      userEvent.click(component.getByText(/Hello/))
    })

    it('should snapshot', () => {
      expect(component.container).toMatchSnapshot()
    })

    it('should activate item', () => {
      expect(component.container).toHaveTextContent(/hello content/)
    })

    describe('when clicking item', () => {
      beforeEach(() => {
        userEvent.click(component.getByText(/Hello/))
      })

      it('should hide item', () => {
        expect(component.container).not.toHaveTextContent(/hello content/)
      })
    })

    describe('when clicking other item', () => {
      beforeEach(() => {
        userEvent.click(component.getByText(/Accordion/))
      })

      it('should show both items', () => {
        expect(component.container).toHaveTextContent(/hello content/)
        expect(component.container).toHaveTextContent(/accordion content/)
      })
    })
  })

  describe('when using keyboard navigation', () => {
    let b1: HTMLElement
    let b2: HTMLElement
    let b3: HTMLElement
    let b4: HTMLElement

    beforeEach(() => {
      ;[b1, b2, b3, b4] = component.getAllByRole('button')
    })

    describe('when pressing up', () => {
      beforeEach(() => {
        fireEvent.keyDown(b1, { key: 'ArrowUp' })
      })

      it('should focus item', () => {
        expect(b4).toHaveFocus()
      })
    })

    describe('when pressing down', () => {
      beforeEach(() => {
        fireEvent.keyDown(b2, { key: 'ArrowDown' })
      })

      it('should focus item', () => {
        expect(b3).toHaveFocus()
      })
    })
  })
})
