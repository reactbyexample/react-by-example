import { visit } from '@app/unist-util-visit-async'
import { Plugin, Transformer } from 'unified'
import { Node } from 'unist'

export type NodeOrNothing = Node | null

export interface VisitorArgs {
  node: Node
  inject: {
    nothing(): NodeOrNothing
    link(text: string, url: string): NodeOrNothing
    code(content: string, lang: string): NodeOrNothing
  }
}

type Visitor = (args: VisitorArgs) => NodeOrNothing | Promise<NodeOrNothing>
export interface Options {
  visitor: Visitor
}

type Inject = VisitorArgs['inject']
const nothing: Inject['nothing'] = () => null
const link: Inject['link'] = (text, url) => ({
  type: 'link',
  url,
  children: [{ type: 'text', value: text }],
})
const code: Inject['link'] = (content, lang) => ({
  type: 'code',
  value: content,
  lang,
})
const inject: Inject = { nothing, link, code }

const remarkInject: () => Plugin<[Options]> = () => ({ visitor }) => {
  const transformer: Transformer = (root) => {
    return visit(root, async (node, parents) => {
      const nodeToInject = await visitor({ node, inject })

      if (nodeToInject != null) {
        const parent = parents[parents.length - 1]
        const index = parent.children.indexOf(node)
        parent.children.splice(index, 0, nodeToInject)
      }
    })
  }

  return transformer
}

export default remarkInject
