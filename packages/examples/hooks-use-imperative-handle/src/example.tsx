import React, {
  FC,
  Ref,
  RefObject,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react'

interface Focusable {
  focus(): void
}

const FocusableInput: FC<{ focusable?: Ref<Focusable> }> = ({ focusable }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const focus = useCallback(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [])
  useImperativeHandle(focusable, () => ({ focus }), [focus])

  return (
    <div>
      <label>
        focusable input
        <input ref={inputRef} placeholder="required" />
      </label>
    </div>
  )
}

const Error: FC<{ target: RefObject<Focusable> }> = ({ target, children }) => {
  return (
    <div>
      {children}
      <button
        type="button"
        onClick={useCallback(() => target.current && target.current.focus(), [
          target,
        ])}
      >
        focus field
      </button>
    </div>
  )
}

const Example: FC = () => {
  const focusableRef = useRef<Focusable>(null)

  return (
    <>
      <FocusableInput focusable={focusableRef} />
      <Error target={focusableRef}>this field is required</Error>
    </>
  )
}

export default <Example />
