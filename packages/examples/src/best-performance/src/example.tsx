import React, {
  ChangeEventHandler,
  FC,
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react'

const words = [
  'Lorem',
  'ipsum',
  'dolor',
  'sit',
  'amet',
  'consectetur',
  'adipiscing',
  'elit',
]

export const Slower: FC = () => {
  const [filter, setFilter] = useState('')

  return (
    <>
      <input
        aria-label="filter"
        placeholder="filter"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
      <ul>
        {words
          .filter((word) => word.toLowerCase().includes(filter.toLowerCase()))
          .map((word) => (
            <li key={word}>{word}</li>
          ))}
      </ul>
    </>
  )
}

export const ProbablyFaster: FC = memo(() => {
  const [filter, setFilter] = useState('')
  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => setFilter(event.target.value),
    [],
  )
  const filteredWords = useMemo(
    () =>
      words.filter((word) => word.toLowerCase().includes(filter.toLowerCase())),
    [filter],
  )

  return (
    <>
      <input
        aria-label="filter"
        placeholder="filter"
        value={filter}
        onChange={onChange}
      />
      <ul>
        {filteredWords.map((word) => (
          <li key={word}>{word}</li>
        ))}
      </ul>
    </>
  )
})

export default <ProbablyFaster />
