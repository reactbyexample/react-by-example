import { cleanup, render, RenderResult } from '@testing-library/react'
import React from 'react'
import example, { ThemedCard, ThemedParagraph } from './example'
import { DarkTheme, LightTheme } from './theme-library'

const stubConsole = () => {
  let spy: jest.SpyInstance

  beforeEach(() => {
    spy = jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    spy.mockRestore()
  })
}

describe('ThemedParagraph', () => {
  let component: RenderResult

  stubConsole()

  afterEach(() => {
    cleanup()
  })

  describe('dark', () => {
    beforeEach(() => {
      component = render(
        <DarkTheme>
          <ThemedParagraph>Lorem ipsum dolor sit amet.</ThemedParagraph>
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
          <ThemedParagraph>Lorem ipsum dolor sit amet.</ThemedParagraph>
        </LightTheme>,
      )
    })

    it('should snapshot', () => {
      expect(component.container).toMatchSnapshot()
    })
  })
})

describe('ThemedCard', () => {
  let component: RenderResult

  afterEach(() => {
    cleanup()
  })

  describe('dark', () => {
    beforeEach(() => {
      component = render(
        <DarkTheme>
          <ThemedCard>Lorem ipsum dolor sit amet.</ThemedCard>
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
          <ThemedCard>Lorem ipsum dolor sit amet.</ThemedCard>
        </LightTheme>,
      )
    })

    it('should snapshot', () => {
      expect(component.container).toMatchSnapshot()
    })
  })
})

describe('example', () => {
  let component: RenderResult

  stubConsole()

  beforeEach(() => {
    component = render(example)
  })

  afterEach(() => {
    cleanup()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })
})
