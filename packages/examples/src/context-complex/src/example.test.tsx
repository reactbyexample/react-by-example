import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react'
import React, { FC, useContext } from 'react'
import example, { ThemeContext, ThemeSwitcher } from './example'

describe('ThemeSwitcher', () => {
  let component: RenderResult

  afterEach(() => {
    cleanup()
  })

  describe('example', () => {
    beforeEach(() => {
      component = render(example)
    })

    it('should snapshot', () => {
      expect(component.container).toMatchSnapshot()
    })
  })

  describe('when switching themes', () => {
    let select: HTMLElement
    let debug: HTMLElement

    const DebugTheme: FC = () => {
      const theme = useContext(ThemeContext)
      return <pre>current theme: {theme}</pre>
    }

    beforeEach(() => {
      component = render(
        <ThemeSwitcher>
          <DebugTheme />
        </ThemeSwitcher>,
      )
      select = component.getByRole('combobox')
      debug = component.getByText(/current theme:/)
    })

    it('should show default', () => {
      expect(debug).toHaveTextContent('current theme: default')
    })

    describe('when using red', () => {
      beforeEach(() => {
        fireEvent.change(select, { target: { value: 'red' } })
      })

      it('should show red', () => {
        expect(debug).toHaveTextContent('current theme: red')
      })

      describe('when using green', () => {
        beforeEach(() => {
          fireEvent.change(select, { target: { value: 'green' } })
        })

        it('should show green', () => {
          expect(debug).toHaveTextContent('current theme: green')
        })
      })
    })
  })
})
