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

export default (
  <div>
    <NavBar />
    <Switch>
      <Route path="/pricing">pricing</Route>
      <Route path="/about">about</Route>
      <Route path="/" exact>
        home
      </Route>
      <Route>404</Route>
    </Switch>
  </div>
)
