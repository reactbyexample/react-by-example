import React from 'react'

const fruits = ['apple', 'orange', 'strawberry']
export default (
  <ul>
    {fruits.map((fruit) => (
      <li key={fruit}>{fruit}</li>
    ))}
  </ul>
)
