import { cleanup, render, RenderResult, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { ProbablyFaster, Slower } from './example'

describe('Filter', () => {
  let slower: RenderResult
  let faster: RenderResult

  beforeEach(() => {
    slower = render(<Slower />)
    faster = render(<ProbablyFaster />)
  })

  afterEach(() => {
    cleanup()
  })

  it('should match', () => {
    expect(slower.container.innerHTML).toBe(faster.container.innerHTML)
  })

  describe('when filtering', () => {
    beforeEach(async () => {
      const [slowerInput, fasterInput] = screen.getAllByRole('textbox')
      await userEvent.type(slowerInput, 'i')
      await userEvent.type(fasterInput, 'i')
    })

    it('should match', () => {
      expect(slower.container.innerHTML).toBe(faster.container.innerHTML)
    })
  })
})
