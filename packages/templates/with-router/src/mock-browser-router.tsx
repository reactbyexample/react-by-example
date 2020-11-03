import { createMemoryHistory } from 'history'
import React, {
  ChangeEventHandler,
  FC,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Router } from 'react-router'

export const MockBrowserRouter: FC = ({ children }) => {
  const [history] = useState(() => createMemoryHistory())

  const [location, setLocation] = useState('/')
  useEffect(() => {
    return history.listen(({ pathname, search, hash }) => {
      setLocation(`${pathname}${search}${hash}`)
    })
  }, [history])

  const [pendingLocation, setPendingLocation] = useState<string | null>(null)
  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setPendingLocation(event.target.value)
    },
    [],
  )
  const onKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (event) => {
      switch (event.key) {
        case 'Escape':
          setPendingLocation(null)
          break
        case 'Enter':
          if (pendingLocation != null) history.push(pendingLocation)
          setPendingLocation(null)
          break
      }
    },
    [history, pendingLocation],
  )

  const onBack = useCallback(() => {
    history.goBack()
  }, [history])
  const onForward = useCallback(() => {
    history.goForward()
  }, [history])

  const canGoBack = 0 < history.index
  const canGoForward = history.index < history.length - 1

  return (
    <>
      <div>
        <button
          type="button"
          title="back"
          onClick={onBack}
          disabled={!canGoBack}
        >
          ←
        </button>
        <button
          type="button"
          title="forward"
          onClick={onForward}
          disabled={!canGoForward}
        >
          →
        </button>
        <input
          value={pendingLocation == null ? location : pendingLocation}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>
      <Router history={history}>{children}</Router>
    </>
  )
}
