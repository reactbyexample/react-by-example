import React from 'react'

const propsToSpread = {
  onClick: () => document.body.append(`don't do this in prod`),
}

export default (
  <button type="button" {...propsToSpread}>
    click me
  </button>
)
export const transpiledTo = React.createElement(
  'button',
  { type: 'button', ...propsToSpread },
  'click me',
)
