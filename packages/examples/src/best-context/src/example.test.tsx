import { cleanup, render, RenderResult } from '@testing-library/react'
import React from 'react'
import example from './example'

describe('List', () => {
  let component: RenderResult

  beforeEach(() => {
    component = render(<>{example}</>)
  })

  afterEach(() => {
    cleanup()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })
})
