/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState } from 'react'

const SimpleForm: FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [terms, setTerms] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(true)
      }}
    >
      <div>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={terms}
            onChange={(event) => setTerms(event.target.checked)}
          />
          Read the T&amp;C
        </label>
      </div>
      <button type="submit">Submit</button>
      <pre>
        {JSON.stringify({ username, password, terms, submitted }, null, '  ')}
      </pre>
    </form>
  )
}

export default <SimpleForm />
