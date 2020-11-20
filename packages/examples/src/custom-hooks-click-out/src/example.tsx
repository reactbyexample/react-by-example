import React, {
  FC,
  MutableRefObject,
  Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import classes from './example.module.css'

// #region custom hook
export interface UseClickOut<T extends HTMLElement> {
  ref: Ref<T>
}

export const useClickOut = <T extends HTMLElement>(
  eventHandler: (event: MouseEvent) => void,
): UseClickOut<T> => {
  const elementRef = useRef() as MutableRefObject<T>

  // as ref to avoid spamming `useEffect`
  const handlerRef = useRef<typeof eventHandler>(eventHandler)
  handlerRef.current = eventHandler

  useEffect(() => {
    const filteredHandler = (event: MouseEvent) => {
      if (elementRef.current.contains(event.target as Node)) return

      handlerRef.current(event)
    }

    document.addEventListener('click', filteredHandler)

    return () => {
      document.removeEventListener('click', filteredHandler)
    }
  }, [])

  return { ref: elementRef }
}
// #endregion

//

// #region using custom hook
interface DropdownProps {
  title: string
}

export const Dropdown: FC<DropdownProps> = ({ children, title }) => {
  const [open, setOpen] = useState(false)
  const toggle = useCallback(() => setOpen((o) => !o), [])

  return (
    <div className={classes.container} {...useClickOut(() => setOpen(false))}>
      <button type="button" className={classes.toggle} onClick={toggle}>
        {title} {open ? '🔽' : '🔼'}
      </button>
      {open && <div className={classes.content}>{children}</div>}
    </div>
  )
}
// #endregion

//

export default (
  <div>
    before dropdown
    <Dropdown title="toggle dropdown">
      <p>try clicking outside</p>
      <button type="button">in dropdown</button>
    </Dropdown>
    after dropdown
  </div>
)
