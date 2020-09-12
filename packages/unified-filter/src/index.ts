import { Plugin, Transformer } from 'unified'
import { Node } from 'unist'
import unistUtilFilter from 'unist-util-filter'

export interface Options {
  filter(node: Node): boolean
  cascade?: boolean
}

const unifiedFilter: Plugin<[Options]> = ({ filter, cascade = true }) => {
  const transformer: Transformer = (root) => {
    const test = (node: unknown): node is Node => filter(node as Node)
    return unistUtilFilter(root, { cascade }, test) as Node
  }

  return transformer
}

export default unifiedFilter
