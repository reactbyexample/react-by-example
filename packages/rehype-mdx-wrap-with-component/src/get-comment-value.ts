import { Node } from 'unist'

const COMMENT_START = '<!--'
const COMMENT_END = '-->'

export const getCommentValue = (node: Node): string | null => {
  const value = node.value as string
  if (node.type === 'comment') {
    return value
  }
  if (node.type === 'element' && value && value.startsWith(COMMENT_START)) {
    return value.replace(COMMENT_START, '').replace(COMMENT_END, '')
  }

  return null
}
