import { cleanup, render, RenderResult } from '@testing-library/react'
import React, { FC, useContext } from 'react'
import { ThemeContext } from './internal/theme-context'
import { DarkTheme, LightTheme } from './themes'

describe('themes', () => {
  let component: RenderResult

  const Test: FC = () => {
    const theme = useContext(ThemeContext)

    return <pre>{JSON.stringify(theme, null, '  ')}</pre>
  }

  afterEach(() => {
    cleanup()
  })

  describe('dark', () => {
    beforeEach(() => {
      component = render(
        <DarkTheme>
          <Test />
        </DarkTheme>,
      )
    })

    it('should snapshot', () => {
      expect(component.container).toMatchSnapshot()
    })
  })

  describe('light', () => {
    beforeEach(() => {
      component = render(
        <LightTheme>
          <Test />
        </LightTheme>,
      )
    })

    it('should snapshot', () => {
      expect(component.container).toMatchSnapshot()
    })
  })
})
