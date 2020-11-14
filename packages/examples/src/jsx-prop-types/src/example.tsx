import React from 'react'

export default (
  <button type="button" onClick={() => alert('clicked')} tabIndex={-1}>
    <i>the button</i>
  </button>
)
export const transpiledTo = React.createElement(
  'button',
  { type: 'button', onClick: () => alert('clicked'), tabIndex: -1 },
  // note the nested `createElement` call
  React.createElement('i', {}, 'the button'),
)
