/* eslint-disable no-alert */
import React from 'react'

const propsToSpread = {
  onClick: () => alert(`please don't click me`),
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
