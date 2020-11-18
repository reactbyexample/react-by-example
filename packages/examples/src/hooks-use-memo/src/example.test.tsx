import { cleanup, render, RenderResult } from '@testing-library/react'
import React from 'react'
import { Fib } from './example'

describe('Fib', () => {
  let component: RenderResult

  describe('10', () => {
    beforeEach(() => {
      component = render(<Fib n={10} />)
    })

    afterEach(() => {
      cleanup()
    })

    it('should snapshot', () => {
      expect(component.container).toMatchSnapshot()
    })
  })

  describe('20', () => {
    beforeEach(() => {
      component = render(<Fib n={20} />)
    })

    afterEach(() => {
      cleanup()
    })

    it('should snapshot', () => {
      expect(component.container).toMatchSnapshot()
    })
  })
})
