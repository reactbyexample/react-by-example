import {
  act,
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react'
import React from 'react'
import { LocaleClock, ToggleLocale } from './example'

let time: string
const useMockTime = () => {
  const originalDate = Date
  const mockDate = class extends Date {
    constructor() {
      super(`2020-04-01 ${time}`)
    }
  }

  beforeEach(() => {
    time = '12:34:00'
    Object.assign(window, { Date: mockDate })
  })

  afterEach(() => {
    Object.assign(window, { Date: originalDate })
  })
}

describe('LocaleClock', () => {
  let component: RenderResult
  let setIntervalSpy: jest.SpyInstance
  let clearIntervalSpy: jest.SpyInstance

  useMockTime()

  beforeEach(() => {
    jest.useFakeTimers()
    setIntervalSpy = jest.spyOn(window, 'setInterval')
    clearIntervalSpy = jest.spyOn(window, 'clearInterval')
  })
  afterEach(() => {
    jest.restoreAllMocks()
    jest.useRealTimers()
  })

  describe('default locale', () => {
    beforeEach(() => {
      component = render(<LocaleClock />)
    })

    afterEach(() => {
      cleanup()
    })

    it('should snapshot', () => {
      expect(component.container).toMatchSnapshot()
    })

    it('should show time', () => {
      expect(component.container).toHaveTextContent('12:34:00')
    })

    it('should set an interval', () => {
      expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 500)
      expect(setIntervalSpy).toHaveBeenCalledTimes(1)
    })

    describe('when time has passed', () => {
      beforeEach(() => {
        time = '12:34:01'
        act(() => {
          jest.advanceTimersByTime(1000)
        })
      })

      it('should show time', () => {
        expect(component.container).toHaveTextContent('12:34:01')
      })

      describe('when time has passed', () => {
        beforeEach(() => {
          time = '12:34:02'
          act(() => {
            jest.advanceTimersByTime(1000)
          })
        })

        it('should show time', () => {
          expect(component.container).toHaveTextContent('12:34:02')
        })

        describe('when time has passed', () => {
          beforeEach(() => {
            time = '12:34:03'
            act(() => {
              jest.advanceTimersByTime(1000)
            })
          })

          it('should show time', () => {
            expect(component.container).toHaveTextContent('12:34:03')
          })
        })
      })
    })

    it('should not have cleared the interval', () => {
      expect(clearIntervalSpy).not.toHaveBeenCalled()
    })

    describe('when unmounted', () => {
      beforeEach(() => {
        cleanup()
      })

      it('should clear the interval', () => {
        expect(clearIntervalSpy).toHaveBeenCalledWith(expect.any(Number))
        expect(clearIntervalSpy).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('specific locale', () => {
    beforeEach(() => {
      component = render(<LocaleClock locale="en-US" />)
    })

    afterEach(() => {
      cleanup()
    })

    it('should show time', () => {
      expect(component.container).toHaveTextContent('12:34:00 PM')
    })
  })
})

describe('ToggleLocale', () => {
  let component: RenderResult
  let toggle: HTMLElement

  beforeEach(() => {
    jest.useFakeTimers()
    jest
      .spyOn(Date.prototype, 'toLocaleTimeString')
      .mockImplementation(
        (locale) => `current time in "${String(locale)}" locale`,
      )
    component = render(<ToggleLocale />)
    toggle = component.getByText('toggle locale')
  })

  afterEach(() => {
    cleanup()
    jest.restoreAllMocks()
    jest.useRealTimers()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })

  it('should show time', () => {
    expect(component.container).toHaveTextContent(
      'current time in "en-GB" locale',
    )
  })

  describe('when toggling', () => {
    beforeEach(() => {
      fireEvent.click(toggle)
    })

    it('should show time', () => {
      expect(component.container).toHaveTextContent(
        'current time in "th-TH-u-nu-thai" locale',
      )
    })
  })
})
