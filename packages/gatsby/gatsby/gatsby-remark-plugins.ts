import { CodesandboxNode } from '@app/gatsby-plugin-codesandbox'
import { Options as LiftOptions } from '@app/gatsby-remark-lift'
import remarkInjectCodeBlock from '@app/remark-inject-code-block'
import unifiedFilter from '@app/unified-filter'
import unifiedParseYaml from '@app/unified-parse-yaml'
import { extname } from 'path'
import { ExampleYaml } from './types'

const useLift = <O>(
  plugin: LiftOptions<O>['plugin'],
  pluginOptions?: LiftOptions<O>['pluginOptions'],
) => ({
  resolve: '@app/gatsby-remark-lift',
  options: {
    plugin,
    pluginOptions,
  },
})

export const gatsbyRemarkPlugins = [
  useLift(unifiedParseYaml, () => ({
    filter: ({ type, lang, meta }) => {
      return type === 'code' && lang === 'yaml' && meta === '{example}'
    },
  })),
  useLift(
    remarkInjectCodeBlock,
    ({ getNodesByType, markdownNode, actions: { createParentChildLink } }) => ({
      resolve({ data }) {
        if (!(data && data.yaml)) return undefined
        const {
          project,
          module = 'src/example.tsx',
          code = true,
        } = data.yaml as ExampleYaml

        if (!code) return undefined

        const codesandboxes = getNodesByType('Codesandbox') as CodesandboxNode[]
        const [codesandbox] = codesandboxes.filter(
          ({ name }) => name === project,
        )
        const [file] = codesandbox.files.filter(({ name }) => name === module)

        createParentChildLink({
          parent: codesandbox,
          child: markdownNode,
        })

        return { code: file.value, lang: extname(file.name).slice(1) }
      },
    }),
  ),
  useLift(unifiedFilter, () => ({
    filter: ({ data }) => {
      return !(data && data.yaml)
    },
  })),
]
