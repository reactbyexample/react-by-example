/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Node as GatsbyNode, SourceNodesArgs } from 'gatsby'
import { Plugin } from 'unified'
import { Node as UnistNode } from 'unist'

export interface GatsbyRemarkPluginArgs extends SourceNodesArgs {
  markdownAST: UnistNode
  markdownNode: GatsbyNode
  files: GatsbyNode[]
}

export type Options<T> =
  | {
      plugin: Plugin<[T?]>
      pluginOptions?: (args: GatsbyRemarkPluginArgs) => T | Promise<T>
    }
  | {
      plugin: Plugin<[T]>
      pluginOptions: (args: GatsbyRemarkPluginArgs) => T | Promise<T>
    }

const lift = async <T>(
  args: GatsbyRemarkPluginArgs,
  { plugin, pluginOptions }: Options<T>,
): Promise<void> => {
  const { markdownAST } = args
  const finalPluginOptions = pluginOptions
    ? await pluginOptions(args)
    : undefined
  try {
    const transformer = plugin.call(null!, finalPluginOptions!)
    if (transformer) {
      const transformed = await transformer(markdownAST, null!)
      if (transformed && 'type' in transformed) {
        Object.assign(markdownAST, transformed)
      }
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
  }
}

export default lift
