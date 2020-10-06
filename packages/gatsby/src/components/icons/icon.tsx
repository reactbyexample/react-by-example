import styled from 'styled-components'
import { assertNonNull } from '../../util'

export interface IconProps {
  size?: 1 | 2 | 3 | 4
}

const sizeToEm = [0, 1, 1.5, 2, 3]

export const Icon = styled.svg<IconProps>`
  fill: currentColor;
  height: ${(p) => sizeToEm[assertNonNull(p.size)]}em;
  margin: 0.25em;
`
Icon.defaultProps = { size: 1 }
