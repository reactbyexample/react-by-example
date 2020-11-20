import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react'
import React, {
  FC,
  MutableRefObject,
  Ref,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react'
import {
  NavigationContext,
  NavigationContextProvider,
  useNavigation,
} from './navigation'

describe('NavigationContextProvider', () => {
  let component: RenderResult
  let buttons: HTMLElement[]
  let refsSpy: jest.Mock

  interface UseNavigationTest<T extends HTMLElement> {
    ref: Ref<T>
  }

  const useNavigationTest = <T extends HTMLElement>(): UseNavigationTest<T> => {
    const { register, refs } = useContext(NavigationContext)
    const ref = useRef<T>() as MutableRefObject<T>

    useLayoutEffect(() => {
      register(ref.current)
    })

    useEffect(() => {
      refsSpy(ref, refs)
    })

    return { ref }
  }

  const TestButton: FC = ({ children }) => {
    return (
      <button type="button" {...useNavigationTest()}>
        {children}
      </button>
    )
  }

  const Test: FC = () => {
    return (
      <NavigationContextProvider>
        <TestButton>1</TestButton>
        <TestButton>2</TestButton>
        <TestButton>3</TestButton>
      </NavigationContextProvider>
    )
  }

  beforeEach(() => {
    refsSpy = jest.fn()
    component = render(<Test />)
    buttons = component.getAllByRole('button')
  })

  afterEach(() => {
    cleanup()
  })

  it('should collect buttons in the right order', () => {
    const [b1, b2, b3] = buttons
    const ref = (current: unknown) => ({ current })
    expect(refsSpy).toHaveBeenCalledWith(ref(b1), ref(buttons))
    expect(refsSpy).toHaveBeenCalledWith(ref(b2), ref(buttons))
    expect(refsSpy).toHaveBeenCalledWith(ref(b3), ref(buttons))
    expect(refsSpy).toHaveBeenCalledTimes(3)
  })
})

describe('useNavigation', () => {
  let component: RenderResult
  let b1: HTMLElement
  let b2: HTMLElement
  let b3: HTMLElement

  const TestButton: FC = ({ children }) => {
    return (
      <button type="button" {...useNavigation()}>
        {children}
      </button>
    )
  }

  const Test: FC = () => {
    return (
      <NavigationContextProvider>
        <TestButton>1</TestButton>
        <TestButton>2</TestButton>
        <TestButton>3</TestButton>
      </NavigationContextProvider>
    )
  }

  beforeEach(() => {
    component = render(<Test />)
    ;[b1, b2, b3] = component.getAllByRole('button')
  })

  it('should not have focus', () => {
    expect(document.body).toHaveFocus()
  })

  describe('when pressing up', () => {
    beforeEach(() => {
      fireEvent.keyDown(b2, { key: 'ArrowUp' })
    })

    it('should focus', () => {
      expect(b1).toHaveFocus()
    })

    describe('when pressing up', () => {
      beforeEach(() => {
        fireEvent.keyDown(b1, { key: 'ArrowUp' })
      })

      it('should round robin', () => {
        expect(b3).toHaveFocus()
      })
    })
  })

  describe('when pressing right', () => {
    beforeEach(() => {
      fireEvent.keyDown(b2, { key: 'ArrowRight' })
    })

    it('should focus', () => {
      expect(b3).toHaveFocus()
    })

    describe('when pressing right', () => {
      beforeEach(() => {
        fireEvent.keyDown(b3, { key: 'ArrowRight' })
      })

      it('should round robin', () => {
        expect(b1).toHaveFocus()
      })
    })
  })

  describe('when pressing down', () => {
    beforeEach(() => {
      fireEvent.keyDown(b2, { key: 'ArrowDown' })
    })

    it('should focus', () => {
      expect(b3).toHaveFocus()
    })

    describe('when pressing down', () => {
      beforeEach(() => {
        fireEvent.keyDown(b3, { key: 'ArrowDown' })
      })

      it('should round robin', () => {
        expect(b1).toHaveFocus()
      })
    })
  })

  describe('when pressing left', () => {
    beforeEach(() => {
      fireEvent.keyDown(b2, { key: 'ArrowLeft' })
    })

    it('should focus', () => {
      expect(b1).toHaveFocus()
    })

    describe('when pressing left', () => {
      beforeEach(() => {
        fireEvent.keyDown(b1, { key: 'ArrowLeft' })
      })

      it('should round robin', () => {
        expect(b3).toHaveFocus()
      })
    })
  })

  describe('when pressing home', () => {
    beforeEach(() => {
      fireEvent.keyDown(b3, { key: 'Home' })
    })

    it('should focus first', () => {
      expect(b1).toHaveFocus()
    })
  })

  describe('when pressing end', () => {
    beforeEach(() => {
      fireEvent.keyDown(b1, { key: 'End' })
    })

    it('should focus last', () => {
      expect(b3).toHaveFocus()
    })
  })

  describe('when pressing page up', () => {
    beforeEach(() => {
      fireEvent.keyDown(b3, { key: 'PageUp' })
    })

    it('should focus first', () => {
      expect(b1).toHaveFocus()
    })
  })

  describe('when pressing page down', () => {
    beforeEach(() => {
      fireEvent.keyDown(b1, { key: 'PageDown' })
    })

    it('should focus last', () => {
      expect(b3).toHaveFocus()
    })
  })
})
