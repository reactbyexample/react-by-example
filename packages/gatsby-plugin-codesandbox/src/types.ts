import { Node } from 'gatsby'

export interface CodesandboxFile {
  name: string
  value: string
}

export interface CodesandboxInput {
  name: string
  files: CodesandboxFile[]
}

export interface CodesandboxNode extends Node {
  name: string
  files: CodesandboxFile[]
  sandboxId: string
}
