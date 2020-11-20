import { cleanup, render, RenderResult } from '@testing-library/react'
import React, { FC } from 'react'
import { MemoryRouter } from 'react-router'
import { Simple } from './example'

describe('Simple', () => {
  let component: RenderResult

  interface TestProps {
    location: string
  }
  const Test: FC<TestProps> = ({ location }) => {
    return (
      <MemoryRouter initialEntries={[location]}>
        <Simple />
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
  })

  describe('when lorem', () => {
    beforeEach(() => {
      component = render(<Test location="/lorem" />)
    })

    it('should snapshot', () => {
      expect(component.container).toMatchSnapshot()
    })
  })

  describe('when ipsum', () => {
    beforeEach(() => {
      component = render(<Test location="/ipsum" />)
    })

    it('should snapshot', () => {
      expect(component.container).toMatchSnapshot()
    })
  })

  describe('when dolor', () => {
    beforeEach(() => {
      component = render(<Test location="/dolor" />)
    })

    it('should snapshot', () => {
      expect(component.container).toMatchSnapshot()
    })
  })

  describe('when 404', () => {
    beforeEach(() => {
      component = render(<Test location="/404" />)
    })

    it('should snapshot', () => {
      expect(component.container).toMatchSnapshot()
    })
  })
})
