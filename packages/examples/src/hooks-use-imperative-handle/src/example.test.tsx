import { cleanup, render, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { FC, useRef } from 'react'
import { Error, Focusable, FocusableInput } from './example'

describe('FocusableInput', () => {
  let component: RenderResult
  let input: HTMLElement
  let button: HTMLElement

  const Test: FC = () => {
    const focusableRef = useRef<Focusable>(null)

    return (
      <>
        <FocusableInput focusable={focusableRef} />
        <Error target={focusableRef}>this field is required</Error>
      </>
    )
  }

  beforeEach(() => {
    component = render(<Test />)
    input = component.getByRole('textbox')
    button = component.getByRole('button')
  })

  afterEach(() => {
    cleanup()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })

  it('should not be focused', () => {
    expect(input).not.toHaveFocus()
  })

  describe('when focusing field', () => {
    beforeEach(() => {
      userEvent.click(button)
    })

    it('should be focused', () => {
      expect(input).toHaveFocus()
    })
  })
})
