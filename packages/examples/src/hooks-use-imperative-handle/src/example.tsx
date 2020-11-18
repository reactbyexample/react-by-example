import React, {
  FC,
  Ref,
  RefObject,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react'

export interface Focusable {
  focus(): void
}

export const FocusableInput: FC<{ focusable?: Ref<Focusable> }> = ({
  focusable,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const focus = useCallback(() => {
    inputRef.current?.focus()
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

export const Error: FC<{ target: RefObject<Focusable> }> = ({
  target,
  children,
}) => {
  const onClick = useCallback(() => {
    target.current?.focus()
  }, [target])
  return (
    <div>
      {children}
      <button type="button" onClick={onClick}>
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
