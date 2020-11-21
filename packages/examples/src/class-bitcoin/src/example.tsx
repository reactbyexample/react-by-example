import React, { Component, ReactNode } from 'react'
import { BitcoinAPI } from './bitcoin-api'

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

  private setGbp = () => this.setState({ fiat: 'gbp' })

  private setUsd = () => this.setState({ fiat: 'usd' })

  private getSymbol = () => ({ gbp: '£', usd: '$' }[this.state.fiat])

  private getPrice = async () => {
    this.setState({ value: null })

    const { fiat } = this.state
    const value = await BitcoinAPI.getPrice(fiat).catch(() => NaN)

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
