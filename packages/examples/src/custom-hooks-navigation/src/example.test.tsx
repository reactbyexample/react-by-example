import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { FC, useMemo } from 'react'
import { Tabs } from './example'

describe('Tabs', () => {
  let component: RenderResult

  const Test: FC = () => {
    const tabs = useMemo(
      () => [
        { id: 'hello', title: 'Hello', content: <aside>hello</aside> },
        { id: 'world', title: 'World', content: <aside>world</aside> },
        { id: 'tabs', title: 'Tabs', content: <aside>tabs</aside> },
        { id: 'example', title: 'Example', content: <aside>example</aside> },
      ],
      [],
    )
    return <Tabs defaultTabId="tabs" tabs={tabs} />
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

  it('should activate default tab', () => {
    expect(component.getByRole('complementary')).toHaveTextContent('tabs')
  })

  describe('when switching tabs', () => {
    beforeEach(() => {
      userEvent.click(component.getByText('Hello'))
    })

    it('should activate tab', () => {
      expect(component.getByRole('complementary')).toHaveTextContent('hello')
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

    describe('when pressing left', () => {
      beforeEach(() => {
        fireEvent.keyDown(b1, { key: 'ArrowLeft' })
      })

      it('should focus tab', () => {
        expect(b4).toHaveFocus()
      })
    })

    describe('when pressing right', () => {
      beforeEach(() => {
        fireEvent.keyDown(b2, { key: 'ArrowRight' })
      })

      it('should focus tab', () => {
        expect(b3).toHaveFocus()
      })
    })
  })
})
