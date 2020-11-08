/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { Component, ReactNode } from 'react'
import { BitcoinAPI } from './bitcoin-api'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BitcoinProps {}

interface BitcoinState {
  value: number | null
  fiat: 'gbp' | 'usd'
}

export class Bitcoin extends Component<BitcoinProps, BitcoinState> {
  state = { value: null, fiat: 'gbp' } as const

  mounted = false

  componentDidMount = (): void => {
    this.mounted = true
    this.getPrice()
  }

  componentDidUpdate = (
    prevProps: BitcoinProps,
    prevState: BitcoinState,
  ): void => {
    const { fiat } = this.state
    if (prevState.fiat !== fiat) {
      this.getPrice()
    }
  }

  componentWillUnmount = (): void => {
    this.mounted = false
  }

  setGbp = (): void => this.setState({ fiat: 'gbp' })

  setUsd = (): void => this.setState({ fiat: 'usd' })

  getSymbol = (): string => ({ gbp: '£', usd: '$' }[this.state.fiat])

  private getPrice = async () => {
    this.setState({ value: null })

    const { fiat } = this.state
    const value = await BitcoinAPI.getPrice(fiat)

    if (this.mounted) {
      this.setState({ fiat, value })
    }
  }

  render = (): ReactNode => {
    const { value } = this.state

    return (
      <div>
        <button type="button" onClick={this.setGbp}>
          £
        </button>
        <button type="button" onClick={this.setUsd}>
          $
        </button>
        <br />
        {value == null ? (
          <span>loading price...</span>
        ) : (
          <span>
            {this.getSymbol()}
            {value}
          </span>
        )}
      </div>
    )
  }
}

export default <Bitcoin />
