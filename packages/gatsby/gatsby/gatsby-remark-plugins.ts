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
    render = true,
  } = yaml as ExampleYaml
  return { project, module, code, render }
}

export const gatsbyRemarkPlugins = [
  useLift(unifiedParseYaml, () => ({
    filter: ({ type, lang, meta }) =>
      type === 'code' && lang === 'yaml' && meta === '{example}',
  })),
  useLift(remarkInject(), ({ getNodesByType }) => ({
    visitor({ node: { data }, inject }) {
      if (!(data && data.yaml)) return inject.nothing()

      const { project, module, code } = normalizeExampleYaml(data.yaml)

      if (!code) return inject.nothing()

      const codesandboxes = getNodesByType('Codesandbox') as CodesandboxNode[]
      const [codesandbox] = codesandboxes.filter(({ name }) => name === project)
      if (!codesandbox) return inject.nothing()

      const [file] = codesandbox.files.filter(({ name }) => name === module)
      if (!file) return inject.nothing()

      return inject.code(file.value, extname(file.name).slice(1))
    },
  })),
  useLift(remarkInject(), () => ({
    visitor({ node, inject, create }) {
      const { data } = node
      if (!(data && data.yaml)) return inject.nothing()

      const { project, module, render } = normalizeExampleYaml(data.yaml)

      if (!render) return inject.nothing()

      const renderedModuleOverride: string =
        typeof render === 'string' ? render : module
      const importedModule = require.resolve(
        `@app/example-packages/example-packages/${project}/${renderedModuleOverride}`,
      )
      const identifier = create.defaultImport(importedModule)

      return inject.fragment(identifier)
    },
  })),
  useLift(remarkInject(), ({ getNodesByType }) => ({
    visitor({ node: { data }, inject }) {
      if (!(data && data.yaml)) return inject.nothing()
      const { project, module } = normalizeExampleYaml(data.yaml)

      const codesandboxes = getNodesByType('Codesandbox') as CodesandboxNode[]
      const [codesandbox] = codesandboxes.filter(({ name }) => name === project)
      if (!codesandbox) return inject.nothing()

      return inject.link(
        'CodeSandbox',
        `https://codesandbox.io/s/${codesandbox.sandboxId}?module=/${module}`,
      )
    },
  })),
  useLift(unifiedFilter, () => ({
    filter: ({ data }) => !(data && data.yaml),
  })),
]
