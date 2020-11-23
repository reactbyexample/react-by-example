import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { BitcoinAPI } from './bitcoin-api'

export const Bitcoin: FC = () => {
  const [fiat, setFiat] = useState<'gbp' | 'usd'>('gbp')
  const setGbp = useCallback(() => setFiat('gbp'), [])
  const setUsd = useCallback(() => setFiat('usd'), [])

  const [price, setPrice] = useState<number | null>(null)
  useEffect(() => {
    let shouldUpdate = true

    setPrice(null)
    BitcoinAPI.getPrice(fiat)
      .then((v) => shouldUpdate && setPrice(v))
      .catch(() => shouldUpdate && setPrice(NaN))

    return () => {
      shouldUpdate = false
    }
  }, [fiat])

  const symbol = useMemo(() => ({ gbp: '£', usd: '$' }[fiat]), [fiat])

  return (
    <div>
      <button type="button" onClick={setGbp}>
        £
      </button>
      <button type="button" onClick={setUsd}>
        $
      </button>
      <br />
      {price == null ? (
        <span>loading price...</span>
      ) : (
        <span>
          {symbol}
          {price}
        </span>
      )}
    </div>
  )
}

export default <Bitcoin />
