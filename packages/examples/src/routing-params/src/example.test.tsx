import { cleanup, render, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { FC } from 'react'
import { MemoryRouter } from 'react-router'
import { Params } from './example'

describe('Params', () => {
  let component: RenderResult

  interface TestProps {
    location: string
  }
  const Test: FC<TestProps> = ({ location }) => {
    return (
      <MemoryRouter initialEntries={[location]}>
        <Params />
      </MemoryRouter>
    )
  }

  afterEach(() => {
    cleanup()
  })

  describe('when home', () => {
    beforeEach(() => {
      component = render(<Test location="/" />)
    })

    it('should snapshot', () => {
      expect(component.container).toMatchSnapshot()
    })

    describe('when clicking a user', () => {
      beforeEach(() => {
        userEvent.click(component.getByText('Alice'))
      })

      it('should snapshot', () => {
        expect(component.container).toMatchSnapshot()
      })

      describe('when clicking an article', () => {
        beforeEach(() => {
          userEvent.click(component.getByText("Alice's second article"))
        })

        it('should snapshot', () => {
          expect(component.container).toMatchSnapshot()
        })

        describe('when clicking username', () => {
          beforeEach(() => {
            userEvent.click(component.getByText('by Alice'))
          })

          it('should go back to article listing', () => {
            expect(component.container).toHaveTextContent(/Posts from Alice/)
          })
        })
      })
    })
  })

  describe('when no articles', () => {
    beforeEach(() => {
      component = render(<Test location="/user/carol" />)
    })

    it('should snapshot', () => {
      expect(component.container).toMatchSnapshot()
    })
  })

  describe('when user not found', () => {
    beforeEach(() => {
      component = render(<Test location="/user/dave" />)
    })

    it('should snapshot', () => {
      expect(component.container).toMatchSnapshot()
    })
  })

  describe('when article not found', () => {
    beforeEach(() => {
      component = render(<Test location="/article/99" />)
    })

    it('should snapshot', () => {
      expect(component.container).toMatchSnapshot()
    })
  })

  describe('when 404', () => {
    beforeEach(() => {
      component = render(<Test location="/404" />)
    })

    it('should redirect to users list', () => {
      expect(component.getByRole('heading')).toHaveTextContent('Users')
    })
  })
})
