import { visit } from '@app/unist-util-visit-async'
import { Plugin, Transformer } from 'unified'
import { Node } from 'unist'

export type Resolved = undefined | { text: string; url: string }
export interface Options {
  resolve(node: Node): Resolved | Promise<Resolved>
}

const remarkInjectLink: Plugin<[Options]> = ({ resolve }) => {
  const transformer: Transformer = (n) => {
    return visit(n, async (node, parents) => {
      const { url, text } = (await resolve(node)) || {}
      if (url != null) {
        const parent = parents[parents.length - 1]
        const index = parent.children.indexOf(node)
        parent.children.splice(index, 0, {
          type: 'link',
          url,
          children: [{ type: 'text', value: text }],
        })
      }
    })
  }

  return transformer
}

export default remarkInjectLink
