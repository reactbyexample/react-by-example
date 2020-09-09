import { createCodesandbox } from '@app/gatsby-plugin-codesandbox'
import { CreateNodeArgs, Node } from 'gatsby'

interface ExamplePackagesJson extends Node {
  name: string
  files: { name: string; value: string }[]
}
export const onCreateNode = async (
  args: CreateNodeArgs<ExamplePackagesJson>,
): Promise<void> => {
  const { node } = args
  if (node.internal.type !== 'ExamplePackagesJson') return
  const { name, files } = node
  await createCodesandbox(args, { name, files }, node)
}
