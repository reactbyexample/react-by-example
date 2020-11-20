import React, { FC } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import classes from './example.module.css'

export const NavBar: FC = () => {
  return (
    <nav>
      <NavLink to="/" exact activeClassName={classes.activeLink}>
        home
      </NavLink>
      {' '}
      <NavLink to="/pricing" activeClassName={classes.activeLink}>
        pricing
      </NavLink>
      {' '}
      <NavLink to="/about" activeClassName={classes.activeLink}>
        about
      </NavLink>
      {' '}
      <NavLink
        to="/this-page-does-not-exist"
        activeClassName={classes.activeLink}
      >
        broken link
      </NavLink>
    </nav>
  )
}

export const Example: FC = () => {
  return (
    <div>
      <NavBar />
      <article>
        <Switch>
          <Route path="/pricing">pricing page</Route>
          <Route path="/about">about page</Route>
          <Route path="/" exact>
            home page
          </Route>
          <Route path="/">404 page</Route>
        </Switch>
      </article>
    </div>
  )
}

export default <Example />
