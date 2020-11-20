import React, { FC } from 'react'
import { Redirect, Route, Switch, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Database } from './database'

export const Article: FC = () => {
  const { articleId } = useParams<{ articleId: string }>()
  const article = Database.getArticleById(Number(articleId))
  const user = article && Database.getUserById(article.owner)

  return (
    <div>
      {user && article ? (
        <div>
          <h1>{article.title}</h1>
          <p>{article.content}</p>
          <Link to={`/user/${user.id}`}>
            <i>by {user.name}</i>
          </Link>
        </div>
      ) : (
        <h1>Cannot find article</h1>
      )}
    </div>
  )
}

export const User: FC = () => {
  const { userId } = useParams<{ userId: string }>()
  const user = Database.getUserById(userId)
  const articles = user ? user.articles.map(Database.getArticleById) : []

  return (
    <div>
      {user ? (
        <div>
          <h1>Posts from {user.name}</h1>
          {articles.length ? (
            <ul>
              {articles.map((article) => {
                if (!article) throw new Error()
                const { title, id } = article
                return (
                  <li key={id}>
                    <Link to={`/article/${id}`}>{title}</Link>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p>{user.name} has no articles</p>
          )}
        </div>
      ) : (
        <h1>Cannot find user with id {userId}</h1>
      )}
    </div>
  )
}

export const Users: FC = () => {
  const users = Database.getUsers()
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(({ id, name }) => (
          <li key={id}>
            <Link to={`/user/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const Params: FC = () => {
  return (
    <Switch>
      <Route path="/users">
        <Users />
      </Route>
      <Route path="/user/:userId">
        <User />
      </Route>
      <Route path="/article/:articleId">
        <Article />
      </Route>
      <Route path="/">
        <Redirect to="/users" />
      </Route>
    </Switch>
  )
}

export default <Params />
