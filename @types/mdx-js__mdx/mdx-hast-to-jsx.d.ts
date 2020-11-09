import { Plugin } from 'unified'
import { Node } from 'unist'

declare const mdxHastToJsx: Plugin
export default mdxHastToJsx

export declare const toJSX: (node: Node, parentNode?: Node) => string
