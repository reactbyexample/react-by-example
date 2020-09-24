import React from 'react'

const hi = 'hi'
const canYouSeeMe = false
export default (
  <>
    string: {hi} <br />
    number: {42} <br />
    boolean: {true} {false} <br />
    short-circuit: {canYouSeeMe && <p>sure you can</p>} <br />
    nullish: {undefined} {null} <br />
  </>
)
