import React, { Component, ReactNode } from 'react'
import { BitcoinAPI } from './bitcoin-api'

export interface BitcoinProps {}

interface BitcoinState {
  price: number | null
  fiat: 'gbp' | 'usd'
}

export class Bitcoin extends Component<BitcoinProps, BitcoinState> {
  state = { price: null, fiat: 'gbp' } as const

  mounted = false

  componentDidMount = (): void => {
    this.mounted = true
    this.updatePrice()
  }

  componentDidUpdate = (
    prevProps: BitcoinProps,
    prevState: BitcoinState,
  ): void => {
    const { fiat } = this.state
    if (prevState.fiat !== fiat) {
      this.updatePrice()
    }
  }

  componentWillUnmount = (): void => {
    this.mounted = false
  }

  private setGbp = () => this.setState({ fiat: 'gbp' })

  private setUsd = () => this.setState({ fiat: 'usd' })

  private getSymbol = () => ({ gbp: '£', usd: '$' }[this.state.fiat])

  private updatePrice = async () => {
    this.setState({ price: null })

    const { fiat } = this.state
    const value = await BitcoinAPI.getPrice(fiat).catch(() => NaN)

    if (this.mounted) this.setState({ fiat, price: value })
  }

  render = (): ReactNode => {
    const { price } = this.state

    return (
      <div>
        <button type="button" onClick={this.setGbp}>
          £
        </button>
        <button type="button" onClick={this.setUsd}>
          $
        </button>
        <br />
        {price == null ? (
          <span>loading price...</span>
        ) : (
          <span>
            {this.getSymbol()}
            {price}
          </span>
        )}
      </div>
    )
  }
}

export default <Bitcoin />
