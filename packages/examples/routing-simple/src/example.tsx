import React, { FC } from 'react'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'

export const Simple: FC = () => {
  return (
    <Switch>
      <Route path="/lorem">lorem</Route>
      <Route path="/ipsum">ipsum</Route>
      <Route path="/dolor">dolor</Route>
      <Route path="/">
        <h1>Home</h1>
        <ul>
          <li>
            <Link to="/lorem">lorem</Link>
          </li>
          <li>
            <Link to="/ipsum">ipsum</Link>
          </li>
          <li>
            <Link to="/dolor">dolor</Link>
          </li>
        </ul>
      </Route>
    </Switch>
  )
}

export default <Simple />
