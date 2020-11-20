import { cleanup, render, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { FC, useCallback, useState } from 'react'
import { Dropdown, useClickOut } from './example'

describe('useClickOut', () => {
  let component: RenderResult
  let list: HTMLElement
  let img: HTMLElement
  let button: HTMLElement
  let heading: HTMLElement
  let link: HTMLElement

  const ClickOutCounter: FC = () => {
    const [count, setCount] = useState(0)
    const decrement = useCallback(() => setCount((x) => x - 1), [])
    const increment = useCallback(() => setCount((x) => x + 1), [])

    return (
      <>
        <ul />
        <img alt="" />
        <button type="button" onClick={increment} {...useClickOut(decrement)}>
          click here to increment
        </button>
        <h1>click anywhere else to decrement</h1>
        <a href="/">{count}</a>
      </>
    )
  }

  beforeEach(() => {
    component = render(<ClickOutCounter />)
    list = component.getByRole('list')
    img = component.getByRole('img')
    button = component.getByRole('button')
    heading = component.getByRole('heading')
    link = component.getByRole('link')
  })

  it('should show 0', () => {
    expect(link).toHaveTextContent('0')
  })

  describe('when clicking button', () => {
    beforeEach(() => {
      userEvent.click(button)
      userEvent.click(button)
      userEvent.click(button)
      userEvent.click(button)
      userEvent.click(button)
    })

    it('should show 5', () => {
      expect(link).toHaveTextContent('5')
    })

    describe('when clicking list', () => {
      beforeEach(() => {
        userEvent.click(list)
      })

      it('should show 4', () => {
        expect(link).toHaveTextContent('4')
      })

      describe('when clicking img', () => {
        beforeEach(() => {
          userEvent.click(img)
        })

        it('should show 3', () => {
          expect(link).toHaveTextContent('3')
        })

        describe('when clicking heading', () => {
          beforeEach(() => {
            userEvent.click(heading)
          })

          it('should show 2', () => {
            expect(link).toHaveTextContent('2')
          })

          describe('when clicking link', () => {
            beforeEach(() => {
              userEvent.click(link)
            })

            it('should show 1', () => {
              expect(link).toHaveTextContent('1')
            })
          })
        })
      })
    })
  })
})

describe('Dropdown', () => {
  let component: RenderResult
  let toggle: HTMLElement

  beforeEach(() => {
    component = render(<Dropdown title="test">content</Dropdown>)
    toggle = component.getByRole('button')
  })

  afterEach(() => {
    cleanup()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })

  it('should not show content', () => {
    expect(component.container).not.toHaveTextContent(/content/)
  })

  describe('when opened', () => {
    beforeEach(() => {
      userEvent.click(toggle)
    })

    it('should snapshot', () => {
      expect(component.container).toMatchSnapshot()
    })

    it('should show content', () => {
      expect(component.container).toHaveTextContent(/content/)
    })

    describe('when closed using toggle', () => {
      beforeEach(() => {
        userEvent.click(toggle)
      })

      it('should not show content', () => {
        expect(component.container).not.toHaveTextContent(/content/)
      })
    })

    describe('when closed by clicking outside', () => {
      beforeEach(() => {
        const aside = render(<aside />).getByRole('complementary')
        userEvent.click(aside)
      })

      it('should not show content', () => {
        expect(component.container).not.toHaveTextContent(/content/)
      })
    })
  })
})
