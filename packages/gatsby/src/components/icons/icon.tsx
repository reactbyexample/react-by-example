import styled from 'styled-components'

export interface IconProps {
  $size?: 1 | 2 | 3 | 4
  $rotate?: number
  $dense?: boolean
}

const sizeToEm = [0, 1, 1.5, 2, 3]

export const Icon = styled.svg.attrs({ focusable: false })<IconProps>`
  fill: currentColor;
  height: ${(p) => sizeToEm[p.$size || 1]}em;
  margin: ${(p) => (p.$dense ? 0 : 0.25)}em;
  transform: ${(p) => (p.$rotate ? `rotate(${p.$rotate}deg)` : 'none')};
`
Icon.defaultProps = { $size: 1 }
