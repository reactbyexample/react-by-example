import {
  CreateNodeArgs,
  CreateSchemaCustomizationArgs,
  Node,
  NodeInput,
  PluginOptions,
} from 'gatsby'

declare module 'gatsby' {
  interface PluginOptions {
    name: string
  }
}

export const createSchemaCustomization = ({
  actions: { createTypes },
}: CreateSchemaCustomizationArgs): void => {
  createTypes(`
    type FileContent implements Node {
      value: String!
    }
  `)
}

export const onCreateNode = async (
  {
    node,
    loadNodeContent,
    createNodeId,
    createContentDigest,
    actions: { createNode, createParentChildLink },
  }: CreateNodeArgs,
  { name }: PluginOptions,
): Promise<void> => {
  if (node.internal.type !== 'File') return
  if (node.sourceInstanceName !== name) return

  const content = await loadNodeContent(node)
  const contentNode: NodeInput = {
    id: createNodeId(`${node.id} >>> FileContent`),
    value: content,
    parent: node.id,
    internal: {
      type: 'FileContent',
      contentDigest: createContentDigest(
        `${node.internal.contentDigest}${content}`,
      ),
    },
  }
  createNode(contentNode)
  createParentChildLink({
    parent: node,
    child: contentNode as Node,
  })
}
