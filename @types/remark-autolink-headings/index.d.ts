import { Plugin } from 'unified'
import { Node } from 'unist'

export interface Options {
  behavior?: 'prepend' | 'append' | 'wrap' | 'before' | 'after'
  linkProperties?: Record<string, unknown>
  content?: Node | Node[] | ((node: Node) => Node | Node[])
  group?: (node: Node) => Node
}
declare const remarkSlug: Plugin<[Options]>
export default remarkSlug
