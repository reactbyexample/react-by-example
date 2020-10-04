import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'

const Code = styled.div`
  .grvsc-container {
    --grvsc-border-radius: 4px;
    --grvsc-padding-h: 0.5rem;
    --grvsc-padding-v: 0.5rem;
  }
`

const Render = styled.div`
  display: flex;
  padding: 1rem;
  border: 1px solid #f8f8f2;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`
const FlexRight = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Icon = styled.svg`
  fill: currentColor;
  height: 1.5em;
  margin: 0.25em;
`

const CodeSandboxIcon: FC = () => (
  <Icon viewBox="0 0 32 32">
    <path d="M2.667 8l13.938-8 13.943 8 0.12 15.932-14.063 8.068-13.938-8zM5.453 11.307v6.344l4.458 2.479v4.688l5.297 3.063v-11.031zM27.771 11.307l-9.755 5.542v11.031l5.292-3.063v-4.682l4.464-2.484zM6.844 8.802l9.74 5.526 9.76-5.573-5.161-2.932-4.547 2.594-4.573-2.625z" />
  </Icon>
)

export interface ExampleProps {
  code?: ReactNode
  render?: ReactNode
  link?: string
}

export const Example: FC<ExampleProps> = ({ code, render, link }) => {
  return (
    <>
      <Code>{code}</Code>
      <Render>{render}</Render>
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
