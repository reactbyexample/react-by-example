import { visit } from '@app/unist-util-visit-async'
import { Plugin, Transformer } from 'unified'
import { createFactory } from './create'
import { inject } from './inject'
import { Options } from './types'

const remarkInject: () => Plugin<[Options]> = () => ({ visitor }) => {
  const transformer: Transformer = (root) => {
    const create = createFactory(root)

    return visit(root, async (node, parents) => {
      const nodesToInject = await visitor({ node, inject, create })

      if (!nodesToInject.length) return

      const parent = parents[parents.length - 1]
      const index = parent.children.indexOf(node)

      parent.children.splice(index, 0, ...nodesToInject)
    })
  }

  return transformer
}

export default remarkInject

export * from './types'
