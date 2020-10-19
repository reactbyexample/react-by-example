import React, { FC, ReactNode, useCallback, useState } from 'react'
import styled from 'styled-components'
import { CodeSandboxIcon, ResetIcon } from '../icons'

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

const CodeSandboxLink = styled.a`
  display: flex;
`

const ResetButton = styled.button`
  display: flex;
  margin: 0;
  padding: 0;
  color: var(--app-foreground);
  background: none;
  border: none;
  cursor: pointer;

  :focus,
  :active {
    color: var(--app-cyan);
    outline: 2px solid var(--app-cyan);
  }
`

export interface ExampleProps {
  code?: ReactNode
  render?: ReactNode
  link?: string
}

export const Example: FC<ExampleProps> = ({ code, render, link }) => {
  const [resetKey, setResetKey] = useState(Date.now())
  const triggerReset = useCallback(() => {
    setResetKey(Date.now())
  }, [])
  return (
    <>
      {code}
      <Render key={resetKey}>
        <div>{render}</div>
      </Render>
      {link && (
        <FlexRight>
          <ResetButton
            type="button"
            title="reset example"
            onClick={triggerReset}
          >
            <ResetIcon />
          </ResetButton>
          <CodeSandboxLink
            target="_blank"
            rel="noreferrer"
            href={link}
            title="edit on CodeSandbox"
          >
            <CodeSandboxIcon />
          </CodeSandboxLink>
        </FlexRight>
      )}
    </>
  )
}
