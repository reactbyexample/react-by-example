import { cleanup, render } from '@testing-library/react'
import React, { Component } from 'react'
import { DarkTheme, LightTheme } from './themes'
import { PropsWithTheme, withTheme } from './with-theme'

describe('withTheme', () => {
  let propsSpy: jest.Mock

  const Test = withTheme(
    class extends Component<PropsWithTheme> {
      static displayName = 'Test'

      componentDidMount = () => {
        propsSpy(this.props)
      }

      render = () => {
        return null
      }
    },
  )

  beforeEach(() => {
    propsSpy = jest.fn()
  })

  afterEach(() => {
    cleanup()
  })

  describe('dark', () => {
    beforeEach(() => {
      render(
        <DarkTheme>
          <Test />
        </DarkTheme>,
      )
    })

    it('should inject theme prop', () => {
      expect(propsSpy.mock.calls).toMatchSnapshot()
    })
  })

  describe('light', () => {
    beforeEach(() => {
      render(
        <LightTheme>
          <Test />
        </LightTheme>,
      )
    })

    it('should inject theme prop', () => {
      expect(propsSpy.mock.calls).toMatchSnapshot()
    })
  })
})
