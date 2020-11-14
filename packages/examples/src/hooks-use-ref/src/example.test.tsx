import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react'
import React from 'react'
import { PlayPause } from './example'

describe('PlayPause', () => {
  let component: RenderResult
  let video: HTMLVideoElement
  let playSpy: jest.SpyInstance
  let pauseSpy: jest.SpyInstance
  let button: HTMLElement

  beforeEach(() => {
    component = render(<PlayPause />)
    video = component.getByLabelText('video') as HTMLVideoElement

    let paused = true
    jest.spyOn(video, 'paused', 'get').mockImplementation(() => paused)
    if (video.autoplay) {
      paused = false
    }
    playSpy = jest.spyOn(video, 'play').mockImplementation(() => {
      paused = false
      return Promise.resolve()
    })
    pauseSpy = jest.spyOn(video, 'pause').mockImplementation(() => {
      paused = true
    })

    button = component.getByRole('button')
  })

  afterEach(() => {
    cleanup()
    jest.restoreAllMocks()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })

  it('should start playing', () => {
    expect(video.paused).toBe(false)
  })

  describe('when pressing the button', () => {
    beforeEach(() => {
      fireEvent.click(button)
    })

    it('should pause', () => {
      expect(pauseSpy).toHaveBeenCalledWith()
      expect(pauseSpy).toHaveBeenCalledTimes(1)
      expect(video.paused).toBe(true)
    })

    describe('when pressing the button', () => {
      beforeEach(() => {
        fireEvent.click(button)
      })

      it('should play', () => {
        expect(playSpy).toHaveBeenCalledWith()
        expect(playSpy).toHaveBeenCalledTimes(1)
        expect(video.paused).toBe(false)
      })

      describe('when pressing the button', () => {
        beforeEach(() => {
          fireEvent.click(button)
        })

        it('should pause', () => {
          expect(pauseSpy).toHaveBeenCalledWith()
          expect(pauseSpy).toHaveBeenCalledTimes(2)
          expect(video.paused).toBe(true)
        })
      })
    })
  })
})
