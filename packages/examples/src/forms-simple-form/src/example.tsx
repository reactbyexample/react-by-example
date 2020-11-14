import React, { FC, useState } from 'react'
import { UserAPI } from './user-api'

const SimpleForm: FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [terms, setTerms] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault()
        setSubmitted(true)
        try {
          await UserAPI.register({ username, password })
          // redirect to profile
        } catch {
          // show error
        }
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
          <span>I have read the Terms and Conditions</span>
        </label>
      </div>
      <button type="submit">Register</button>
      <pre>
        {JSON.stringify({ username, password, terms, submitted }, null, '  ')}
      </pre>
    </form>
  )
}

export default <SimpleForm />
