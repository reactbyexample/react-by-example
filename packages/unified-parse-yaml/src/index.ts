import { visit } from '@app/unist-util-visit-async'
import jsYaml from 'js-yaml'
import { Plugin, Transformer } from 'unified'
import { Node } from 'unist'

export interface Options {
  filter?(node: Node): boolean
}

const unifiedParseYaml: Plugin<[Options?]> = ({ filter } = {}) => {
  const transformer: Transformer = (n) => {
    return visit(n, (node) => {
      if (!node.value) return
      if (typeof node.value !== 'string') return
      if (filter && !filter(node)) return

      try {
        const parsed = jsYaml.safeLoad(node.value)
        // eslint-disable-next-line no-param-reassign
        node.data = { ...node.data, yaml: parsed }
      } catch {
        // noop
      }
    })
  }

  return transformer
}

export default unifiedParseYaml
