import React, { FC } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin: 3em 0 1em;
  text-align: center;
`

const Text = styled.span`
  color: var(--app-comment);
`

const Link = styled.a.attrs({
  target: '_blank',
  rel: 'noreferrer',
})`
  color: var(--app-comment);

  :visited {
    color: var(--app-comment);
  }
`

const Love: FC = () => (
  <span role="img" aria-label="love">
    🖤
  </span>
)

const Beer: FC = () => (
  <span role="img" aria-label="beer">
    🍺
  </span>
)

const Separator: FC = () => <Text>{' | '}</Text>

export const Footer: FC = () => {
  return (
    <Container>
      <Link href="https://github.com/SpeedoDevo">
        made by bash with <Love />
      </Link>
      <Separator />
      <Link href="https://github.com/reactbyexample/react-by-example">
        GitHub
      </Link>
      <Separator />
      <Link href="https://monzo.me/barnabasforgo/3">
        buy me a <Beer />
      </Link>
    </Container>
  )
}
