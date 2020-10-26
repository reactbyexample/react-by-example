import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { TenorApi } from './tenor-api'

const Grid = styled.div`
  display: flex;
  width: 600px;
  flex-wrap: wrap;
`

const Button = styled.button`
  width: 200px;
  height: 200px;
`

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`

export interface GifFinderProps {
  onFound?(url: string): void
}

export const GifFinder: FC<GifFinderProps> = ({ onFound }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[] | null>(null)

  useEffect(() => {
    let mounted = true

    if (query) {
      TenorApi.search(query).then((newResults) => {
        if (mounted) {
          setResults(newResults)
        }
      })
    }

    return () => {
      mounted = false
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
        <Grid>
          {results.map((result) => (
            <Button
              type="button"
              key={result}
              onClick={() => onFound && onFound(result)}
              aria-label="gif"
            >
              <Img src={result} alt="gif" />
            </Button>
          ))}
        </Grid>
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
