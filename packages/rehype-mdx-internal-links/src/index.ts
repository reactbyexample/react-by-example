import { visit } from '@app/unist-util-visit-async'
import { toJSX } from '@mdx-js/mdx/mdx-hast-to-jsx'
import { Element } from 'hast'
import isAbsoluteUrl from 'is-absolute-url'
import { Plugin } from 'unified'

export interface RehypeMdxInternalLinksSettings {
  linkComponentShortcode?: string
  linkComponentHrefProp?: string
  filter?: (element: Element) => boolean
}

const rehypeMdxInternalLinks: Plugin<[
  RehypeMdxInternalLinksSettings?,
]> = function rehypeMdxInternalLinks({
  linkComponentShortcode = 'Link',
  linkComponentHrefProp = 'to',
  filter = () => true,
} = {}) {
  return (root) =>
    visit(root, (node, parents) => {
      const element = node as Element
      if (element.type !== 'element') return
      if (element.tagName !== 'a') return

      const { href, ...props } = element.properties || {}
      const hrefString = String(href)
      if (isAbsoluteUrl(hrefString)) return
      if (!filter(element)) return

      const [directParent] = parents.slice(-1)

      element.tagName = linkComponentShortcode
      element.properties = { [linkComponentHrefProp]: href, ...props }
      const jsx = toJSX(element, directParent)

      const elementIndex = directParent.children.indexOf(element)
      directParent.children.splice(elementIndex, 1, {
        type: 'jsx',
        value: jsx,
      })
    })
}

export default rehypeMdxInternalLinks
