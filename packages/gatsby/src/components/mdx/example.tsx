import React, { FC, ReactNode, useCallback, useState } from 'react'
import styled from 'styled-components'
import { BeakerIcon, CodeSandboxIcon, ResetIcon } from '../icons'

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
  margin-top: 0.25em;
`

const CodeSandboxLink = styled.a.attrs({
  target: '_blank',
  rel: 'noreferrer',
})`
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
  testLink?: string
  style?: Record<string, string>
}

export const Example: FC<ExampleProps> = ({
  code,
  render,
  link,
  testLink,
  style,
}) => {
  const [resetKey, setResetKey] = useState(Date.now())
  const triggerReset = useCallback(() => {
    setResetKey(Date.now())
  }, [])

  const renderLink = link && (
    <CodeSandboxLink
      href={link}
      title="edit on CodeSandbox"
      aria-label="edit on CodeSandbox"
    >
      <CodeSandboxIcon />
    </CodeSandboxLink>
  )

  const renderTestLink = testLink && (
    <CodeSandboxLink
      href={testLink}
      title="test on CodeSandbox"
      aria-label="test on CodeSandbox"
    >
      <BeakerIcon />
    </CodeSandboxLink>
  )

  if (!render) {
    return (
      <>
        <div className="dense">{code}</div>
        {(renderLink || renderTestLink) && (
          <FlexRight>
            {renderLink}
            {renderTestLink}
          </FlexRight>
        )}
      </>
    )
  }

  return (
    <>
      {code}
      <Render key={resetKey}>
        <div style={style}>{render}</div>
      </Render>
      <FlexRight>
        <ResetButton
          type="button"
          title="reset example"
          aria-label="reset example"
          onClick={triggerReset}
        >
          <ResetIcon />
        </ResetButton>
        {renderLink}
        {renderTestLink}
      </FlexRight>
    </>
  )
}
