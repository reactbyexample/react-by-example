import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react'
import React from 'react'
import { Pizza } from './example'

describe('Pizza', () => {
  let component: RenderResult

  beforeEach(() => {
    component = render(<Pizza />)
  })

  afterEach(() => {
    cleanup()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })

  it('should default to none', () => {
    expect(component.container).toHaveTextContent('Chosen topping: none')
  })

  const choices = ['tomato sauce', 'bbq sauce', 'garlic sauce']
  describe.each(choices)('when choosing %s', (choice) => {
    beforeEach(() => {
      const button = component.getByText(choice)
      fireEvent.click(button)
    })

    it('should update choice', () => {
      expect(component.container).toHaveTextContent(`Chosen topping: ${choice}`)
    })
  })
})
