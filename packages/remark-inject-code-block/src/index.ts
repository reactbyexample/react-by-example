import { visit } from '@app/unist-util-visit-async'
import { Plugin, Transformer } from 'unified'
import { Node } from 'unist'

export type Resolved = undefined | { code: string; lang: string }
export interface Options {
  resolve(node: Node): Resolved | Promise<Resolved>
}

const remarkInjectCodeBlock: Plugin<[Options]> = ({ resolve }) => {
  const transformer: Transformer = (n) => {
    return visit(n, async (node, parents) => {
      const { code, lang } = (await resolve(node)) || {}
      if (code != null) {
        const parent = parents[parents.length - 1]
        const index = parent.children.indexOf(node)
        parent.children.splice(index, 0, {
          type: 'code',
          lang,
          value: code.trim(),
        })
      }
    })
  }

  return transformer
}

export default remarkInjectCodeBlock
