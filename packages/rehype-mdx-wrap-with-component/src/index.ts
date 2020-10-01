import { visit } from '@app/unist-util-visit-async'
import { Plugin, Processor } from 'unified'
import { Node } from 'unist'
import { getCommentValue } from './get-comment-value'

const START_MARKER = 'component'
const END_MARKER = 'end'
const PROP_MARKER = 'prop'

const matchesMarker = (marker: string) => (
  commentValue: string | null,
): boolean => commentValue?.startsWith(`${marker} `) || false
const getMarkerParam = (comment: Node, marker: string): string => {
  const commentValue = getCommentValue(comment)

  if (!commentValue) throw new Error()
  if (!matchesMarker(marker)(commentValue)) throw new Error()

  return commentValue.replace(`${marker} `, '')
}
const toFragment = (processor: Processor, children: Node[]): string =>
  processor.stringify({
    type: 'element',
    tagName: '',
    children,
  })

const rehypeMdxWrapWithComponent: Plugin = function rehypeMdxWrapWithComponent() {
  return (root) =>
    visit(root, (node, parents) => {
      const value = getCommentValue(node)
      if (value !== END_MARKER) return

      const [parent] = parents.slice(-1)

      const startIndex = parent.children
        .map(getCommentValue)
        .findIndex(matchesMarker(START_MARKER))
      const startNode = parent.children[startIndex]
      const endIndex = parent.children.indexOf(node)

      const component = getMarkerParam(startNode, START_MARKER)

      const nodesToWrap = parent.children
        .slice(startIndex + 1, endIndex)
        .reverse()

      let propsString = ''
      let done = false
      while (!done) {
        const propMarkerIndex = nodesToWrap
          .map(getCommentValue)
          .findIndex(matchesMarker(PROP_MARKER))

        if (propMarkerIndex < 0) {
          done = true
        } else {
          const propMarker = nodesToWrap[propMarkerIndex]
          const propName = getMarkerParam(propMarker, PROP_MARKER)

          const nodesInThisProp = nodesToWrap
            .splice(0, propMarkerIndex + 1)
            .reverse()

          nodesInThisProp.shift()

          propsString = `
          ${propName}={
            ${toFragment(this, nodesInThisProp)}
          }
          ${propsString}`
        }
      }

      const jsx = `
      <${component}
        ${propsString}
      />`

      parent.children.splice(startIndex, endIndex - startIndex + 1, {
        type: 'jsx',
        value: jsx,
      })
    })
}

export default rehypeMdxWrapWithComponent
