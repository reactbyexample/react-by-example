import { cleanup, render, RenderResult } from '@testing-library/react'
import React, { FC } from 'react'
import { MemoryRouter } from 'react-router'
import { Example } from './example'

describe('Example', () => {
  let component: RenderResult

  interface TestProps {
    location: string
  }
  const Test: FC<TestProps> = ({ location }) => {
    return (
      <MemoryRouter initialEntries={[location]}>
        <Example />
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

    it('should snapshot nav', () => {
      expect(component.getAllByRole('navigation')).toMatchSnapshot()
    })

    it('should snapshot', () => {
      expect(component.getByRole('article')).toMatchSnapshot()
    })

    it('should set active class', () => {
      expect(component.getByText('home')).toHaveClass('activeLink')
    })
  })

  describe('when pricing', () => {
    beforeEach(() => {
      component = render(<Test location="/pricing" />)
    })

    it('should snapshot', () => {
      expect(component.getByRole('article')).toMatchSnapshot()
    })

    it('should set active class', () => {
      expect(component.getByText('pricing')).toHaveClass('activeLink')
    })
  })

  describe('when about', () => {
    beforeEach(() => {
      component = render(<Test location="/about" />)
    })

    it('should snapshot', () => {
      expect(component.getByRole('article')).toMatchSnapshot()
    })

    it('should set active class', () => {
      expect(component.getByText('about')).toHaveClass('activeLink')
    })
  })

  describe('when 404', () => {
    beforeEach(() => {
      component = render(<Test location="/404" />)
    })

    it('should snapshot', () => {
      expect(component.getByRole('article')).toMatchSnapshot()
    })
  })
})
