import { cleanup, render, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { SimpleInput } from './example'

describe('SimpleInput', () => {
  let component: RenderResult
  let input: HTMLElement
  let button: HTMLElement
  let display: HTMLElement

  beforeEach(() => {
    component = render(<SimpleInput />)
    input = component.getByLabelText('simple input')
    button = component.getByRole('button')
    display = component.getByText('default value')
  })

  afterEach(() => {
    cleanup()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })

  it('should have default value', () => {
    expect(display).toHaveTextContent('default value')
    expect(input).toHaveValue('default value')
  })

  describe('when typing in input', () => {
    beforeEach(async () => {
      await userEvent.type(input, '{selectall}should update')
    })

    it('should update', () => {
      expect(display).toHaveTextContent('should update')
      expect(input).toHaveValue('should update')
    })

    describe('when setting value programmatically', () => {
      beforeEach(() => {
        userEvent.click(button)
      })

      it('should update', () => {
        expect(display).toHaveTextContent('new value')
        expect(input).toHaveValue('new value')
      })
    })
  })
})
