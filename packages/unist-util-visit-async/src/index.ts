import { Node, Parent } from 'unist'

const hasChildren = (node: Node): node is Parent => !!node.children

const visitWithParents = async (
  node: Node,
  visitor: (node: Node, parents: Parent[]) => void | Promise<void>,
  parents: Parent[],
): Promise<void> => {
  await visitor(node, parents)
  if (!hasChildren(node)) return
  const forEachChild = async (child: Node) => {
    await visitWithParents(child, visitor, [...parents, node])
  }
  await Promise.all(node.children.map(forEachChild))
}

export const visit = (
  root: Node,
  visitor: (node: Node, parents: Parent[]) => void | Promise<void>,
): Promise<void> => {
  return visitWithParents(root, visitor, [])
}
