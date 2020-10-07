import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'
import { CodeSandboxIcon } from '../icons'

const Code = styled.div`
  .grvsc-container {
    --grvsc-border-radius: var(--app-border-radius);
    --grvsc-padding-h: 0.5em;
    --grvsc-padding-v: 0.5em;
  }
`

const Render = styled.div`
  display: flex;
  padding: 1em;
  border: 1px solid var(--app-foreground);
  border-radius: var(--app-border-radius);
  align-items: center;
  justify-content: center;
`
const FlexRight = styled.div`
  display: flex;
  justify-content: flex-end;
`

export interface ExampleProps {
  code?: ReactNode
  render?: ReactNode
  link?: string
}

export const Example: FC<ExampleProps> = ({ code, render, link }) => {
  return (
    <>
      <Code>{code}</Code>
      <Render>
        <div>{render}</div>
      </Render>
      {link && (
        <FlexRight>
          <a
            target="_blank"
            rel="noreferrer"
            href={link}
            title="Edit on CodeSandbox"
          >
            <CodeSandboxIcon />
          </a>
        </FlexRight>
      )}
    </>
  )
}
