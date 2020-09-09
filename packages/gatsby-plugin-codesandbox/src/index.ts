import { Node, NodePluginArgs } from 'gatsby'
import { CodesandboxInput } from './types'
import { upload } from './upload'

const plugin = { name: '@app/gatsby-plugin-codesandbox' }

export const createCodesandbox = async (
  args: NodePluginArgs,
  { name, files }: CodesandboxInput,
  parent: Node,
): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    createNodeId,
    createContentDigest,
    cache,
    actions: { createNode, createParentChildLink },
    getNode,
  } = args

  const codesandbox: CodesandboxInput = { name, files: [...files] }
  codesandbox.files.sort((l, r) => r.name.localeCompare(l.name))

  const description = `${parent.internal.type} >>> Codesandbox ${name}`
  const id = createNodeId(description)
  const contentDigest = createContentDigest({ codesandbox })

  const cachedSandboxId = (await cache.get(contentDigest)) as string
  const sandboxId = cachedSandboxId ?? (await upload(codesandbox))
  await cache.set(contentDigest, sandboxId)

  createNode(
    {
      id,
      parent: parent.id,
      internal: {
        type: 'Codesandbox',
        description,
        contentDigest,
      },
      ...codesandbox,
      sandboxId,
    },
    plugin,
  )
  createParentChildLink(
    {
      parent,
      child: getNode(id),
    },
    plugin,
  )
}

export * from './types'
