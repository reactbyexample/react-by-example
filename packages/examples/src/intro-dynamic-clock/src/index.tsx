import React from 'react'
import ReactDOM from 'react-dom'

const app = () => <div>the time is {new Date().toLocaleTimeString()}</div>
setInterval(() => {
  ReactDOM.render(app(), document.getElementById('root'))
}, 1000)
