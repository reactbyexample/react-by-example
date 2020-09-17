import { Node } from 'unist'

export type Nodes = Node[]

export interface ImportIdentifier {
  identifier: string
}

export interface VisitorArgs {
  node: Node
  inject: {
    nothing(): Nodes
    link(text: string, url: string): Nodes
    code(content: string, lang: string): Nodes
    jsx(identifier: ImportIdentifier, props?: Record<string, unknown>): Nodes
  }
  create: {
    defaultImport(target: string): ImportIdentifier
  }
}

export type Visitor = (args: VisitorArgs) => Nodes | Promise<Nodes>
export interface Options {
  visitor: Visitor
}

export type Inject = VisitorArgs['inject']
export type Create = VisitorArgs['create']
