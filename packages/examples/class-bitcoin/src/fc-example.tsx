import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { BitcoinAPI } from './bitcoin-api'

export const Bitcoin: FC = () => {
  const [fiat, setFiat] = useState<'gbp' | 'usd'>('gbp')
  const setGbp = useCallback(() => setFiat('gbp'), [])
  const setUsd = useCallback(() => setFiat('usd'), [])

  const [value, setValue] = useState<number | null>(null)
  useEffect(() => {
    let shouldUpdate = true

    setValue(null)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    BitcoinAPI.getPrice(fiat).then((v) => shouldUpdate && setValue(v))

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
      {value == null ? (
        <span>loading price...</span>
      ) : (
        <span>
          {symbol}
          {value}
        </span>
      )}
    </div>
  )
}

export default <Bitcoin />
