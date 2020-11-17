import React, { FC, useEffect, useState } from 'react'
import classes from './example.module.css'
import { TenorApi } from './tenor-api'

export interface GifFinderProps {
  onFound?(url: string): void
}

export const GifFinder: FC<GifFinderProps> = ({ onFound }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[] | null>(null)

  useEffect(() => {
    let shouldUpdate = true

    if (query) {
      TenorApi.search(query).then((newResults) => {
        if (!shouldUpdate) return
        setResults(newResults)
      })
    }

    return () => {
      shouldUpdate = false
    }
  }, [query])

  return (
    <section>
      <label>
        find a gif
        <input
          placeholder="query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      {results && (
        <div className={classes.grid}>
          {results.map((result) => (
            <button
              type="button"
              key={result}
              className={classes.button}
              onClick={() => onFound && onFound(result)}
              aria-label="gif"
            >
              <img className={classes.image} src={result} alt="gif" />
            </button>
          ))}
        </div>
      )}
    </section>
  )
}

export const Example: FC = () => {
  const [gif, setGif] = useState<string | null>(null)

  return gif ? (
    <div>
      <img src={gif} alt="gif" />
      <p>found gif</p>
      <button type="button" onClick={() => setGif(null)}>
        find new gif
      </button>
    </div>
  ) : (
    <GifFinder onFound={setGif} />
  )
}

export default <Example />
