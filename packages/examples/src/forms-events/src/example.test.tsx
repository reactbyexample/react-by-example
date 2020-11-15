import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react'
import React from 'react'
import { Events } from './example'

describe('Events', () => {
  let component: RenderResult
  let input: HTMLElement

  beforeEach(() => {
    component = render(<Events />)
    input = component.getByLabelText('try copy/pasting')
  })

  afterEach(() => {
    cleanup()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })

  describe('when focus', () => {
    beforeEach(() => {
      fireEvent.focus(input)
    })

    it('should display last event', () => {
      expect(component.container).toHaveTextContent('onFocus')
    })

    describe('when blur', () => {
      beforeEach(() => {
        fireEvent.blur(input)
      })

      it('should display last event', () => {
        expect(component.container).toHaveTextContent('onBlur')
      })
    })
  })

  describe('when blur', () => {
    beforeEach(() => {
      fireEvent.blur(input)
    })

    it('should display last event', () => {
      expect(component.container).toHaveTextContent('onBlur')
    })
  })

  describe('when copy', () => {
    beforeEach(() => {
      fireEvent.copy(input)
    })

    it('should display last event', () => {
      expect(component.container).toHaveTextContent('onCopy')
    })
  })

  describe('when cut', () => {
    beforeEach(() => {
      fireEvent.cut(input)
    })

    it('should display last event', () => {
      expect(component.container).toHaveTextContent('onCut')
    })
  })

  describe('when paste', () => {
    beforeEach(() => {
      fireEvent.paste(input)
    })

    it('should display last event', () => {
      expect(component.container).toHaveTextContent('onPaste')
    })
  })

  describe('when keyDown', () => {
    beforeEach(() => {
      fireEvent.keyDown(input)
    })

    it('should display last event', () => {
      expect(component.container).toHaveTextContent('onKeyDown')
    })

    describe('when keyUp', () => {
      beforeEach(() => {
        fireEvent.keyUp(input)
      })

      it('should display last event', () => {
        expect(component.container).toHaveTextContent('onKeyUp')
      })
    })
  })

  describe('when keyUp', () => {
    beforeEach(() => {
      fireEvent.keyUp(input)
    })

    it('should display last event', () => {
      expect(component.container).toHaveTextContent('onKeyUp')
    })
  })
})
