import { CodesandboxNode } from '@app/gatsby-plugin-codesandbox'
import { Options as LiftOptions } from '@app/gatsby-remark-lift'
import remarkInject from '@app/remark-inject'
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

const normalizeExampleYaml = (yaml: unknown): Required<ExampleYaml> => {
  const {
    project,
    module = 'src/example.tsx',
    code = true,
  } = yaml as ExampleYaml
  return { project, module, code }
}

export const gatsbyRemarkPlugins = [
  useLift(unifiedParseYaml, () => ({
    filter: ({ type, lang, meta }) => {
      return type === 'code' && lang === 'yaml' && meta === '{example}'
    },
  })),
  useLift(remarkInject(), ({ getNodesByType }) => ({
    visitor({ node: { data }, inject }) {
      if (!(data && data.yaml)) return inject.nothing()

      const { project, module, code } = normalizeExampleYaml(data.yaml)

      if (!code) return inject.nothing()

      const codesandboxes = getNodesByType('Codesandbox') as CodesandboxNode[]
      const [codesandbox] = codesandboxes.filter(({ name }) => name === project)
      const [file] = codesandbox.files.filter(({ name }) => name === module)

      return inject.code(file.value, extname(file.name).slice(1))
    },
  })),
  useLift(remarkInject(), ({ getNodesByType }) => ({
    visitor({ node: { data }, inject }) {
      if (!(data && data.yaml)) return inject.nothing()
      const { project, module } = normalizeExampleYaml(data.yaml)

      const codesandboxes = getNodesByType('Codesandbox') as CodesandboxNode[]
      const [codesandbox] = codesandboxes.filter(({ name }) => name === project)

      return inject.link(
        'CodeSandbox',
        `https://codesandbox.io/s/${codesandbox.sandboxId}?module=/${module}`,
      )
    },
  })),
  useLift(unifiedFilter, () => ({
    filter: ({ data }) => {
      return !(data && data.yaml)
    },
  })),
]
