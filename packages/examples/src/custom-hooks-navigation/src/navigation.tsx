import React, {
  createContext,
  FC,
  KeyboardEventHandler,
  MutableRefObject,
  Ref,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
} from 'react'

// #region context
type RefsType = HTMLElement[]
export interface NavigationContextType {
  refs: MutableRefObject<RefsType>
  register: (el: HTMLElement) => void
}

export const NavigationContext = createContext<NavigationContextType>(null!)

export const NavigationContextProvider: FC = ({ children }) => {
  const refs = useRef<RefsType>([])
  const next = useRef<RefsType>([])

  // collect focusable elements
  const register = useCallback((el: HTMLElement) => {
    next.current.push(el)
  }, [])

  // once all elements are collected, publish on context
  useLayoutEffect(() => {
    refs.current = next.current
    next.current = []
  })

  return (
    <NavigationContext.Provider value={{ refs, register }}>
      {children}
    </NavigationContext.Provider>
  )
}
// #endregion

//

// #region custom hook
export interface UseNavigation<T extends HTMLElement> {
  ref: Ref<T>
  onKeyDown: KeyboardEventHandler<T>
}

export const useNavigation = <T extends HTMLElement>(): UseNavigation<T> => {
  const { refs, register } = useContext(NavigationContext)
  const ref = useRef<T>() as MutableRefObject<T>

  // ON EVERY RENDER, register element as focusable
  useLayoutEffect(() => {
    register(ref.current)
  })

  const onKeyDown = useCallback<KeyboardEventHandler<T>>(
    (event) => {
      const { length } = refs.current
      const currentIndex = refs.current.indexOf(event.target as HTMLElement)

      const navigationMap = {
        ArrowLeft: currentIndex - 1,
        ArrowUp: currentIndex - 1,
        ArrowRight: currentIndex + 1,
        ArrowDown: currentIndex + 1,
        Home: 0,
        PageUp: 0,
        End: length - 1,
        PageDown: length - 1,
      } as Record<string, number>

      const nextIndexCandidate = navigationMap[event.key]

      if (nextIndexCandidate == null) return

      event.preventDefault()

      const nextIndex = (length + nextIndexCandidate) % length

      const el = refs.current[nextIndex]
      el.focus()
    },
    [refs],
  )

  return { ref, onKeyDown }
}
// #endregion
