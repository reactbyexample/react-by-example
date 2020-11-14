import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import example from './example'

ReactDOM.render(
  <BrowserRouter>{example}</BrowserRouter>,
  document.getElementById('root'),
)
