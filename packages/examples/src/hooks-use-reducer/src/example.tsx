import React, { FC, Reducer, useCallback, useReducer } from 'react'

interface State {
  count: number
}
interface IncrementAction {
  type: 'increment'
}
interface DecrementAction {
  type: 'decrement'
}
type Action = IncrementAction | DecrementAction

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      throw new Error()
  }
}

export const Counter: FC = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 })
  const decrement = useCallback(() => dispatch({ type: 'decrement' }), [])
  const increment = useCallback(() => dispatch({ type: 'increment' }), [])
  return (
    <>
      Count: {state.count}
      <button type="button" onClick={decrement}>
        -
      </button>
      <button type="button" onClick={increment}>
        +
      </button>
    </>
  )
}

export default <Counter />
