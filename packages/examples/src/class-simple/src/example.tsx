import React, { Component, ReactNode } from 'react'

export interface CounterProps {
  defaultValue: number
}

interface CounterState {
  value: number
}

export class Counter extends Component<CounterProps, CounterState> {
  static defaultProps = { defaultValue: 0 }

  state = { value: this.props.defaultValue }

  decrement = (): void => this.setState(({ value }) => ({ value: value - 1 }))

  increment = (): void => this.setState(({ value }) => ({ value: value + 1 }))

  badIncrement(): void {
    // `this` is not bound
    this.setState(({ value }) => ({ value: value + 1 }))
  }

  render = (): ReactNode => {
    const { value } = this.state

    return (
      <div>
        <button type="button" onClick={this.decrement}>
          -
        </button>
        <span> {value} </span>
        <button type="button" onClick={this.increment}>
          +
        </button>
      </div>
    )
  }
}

export default (
  <>
    <Counter />
    <Counter defaultValue={5} />
  </>
)
