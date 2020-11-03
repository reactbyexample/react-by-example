import { CodesandboxNode } from '@app/gatsby-plugin-codesandbox'
import { Options as LiftOptions } from '@app/gatsby-remark-lift'
import remarkInject from '@app/remark-inject'
import unifiedFilter from '@app/unified-filter'
import unifiedParseYaml from '@app/unified-parse-yaml'
import { extname } from 'path'
import remarkAutolinkHeadings, { Options } from 'remark-autolink-headings'
import remarkSlug from 'remark-slug'
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
    type = 'component',
    module = type === 'component' ? 'src/example.tsx' : 'src/example.test.tsx',
    code = true,
    render = type === 'component',
    style = null,
  } = yaml as ExampleYaml
  return { project, module, code, render, type, style }
}

export const gatsbyRemarkPlugins = [
  useLift(unifiedParseYaml, () => ({
    filter: ({ type, lang, meta }) =>
      type === 'code' && lang === 'yaml' && meta === '{example}',
  })),
  useLift(remarkInject(), () => ({
    visitor({ node: { data }, inject }) {
      if (!(data && data.yaml)) return inject.nothing()

      return inject.comment('component Example')
    },
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

      return [
        ...inject.comment('prop code'),
        ...inject.code(file.value.trim(), extname(file.name).slice(1)),
      ]
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

      return [...inject.comment('prop render'), ...inject.fragment(identifier)]
    },
  })),
  useLift(remarkInject(), ({ getNodesByType }) => ({
    visitor({ node: { data }, inject }) {
      if (!(data && data.yaml)) return inject.nothing()

      const { project, module, type } = normalizeExampleYaml(data.yaml)

      const codesandboxes = getNodesByType('Codesandbox') as CodesandboxNode[]
      const [codesandbox] = codesandboxes.filter(({ name }) => name === project)
      if (!codesandbox) return inject.nothing()

      const prop = type === 'component' ? 'link' : 'testLink'
      return inject.comment(
        `literal ${prop}="https://codesandbox.io/s/${codesandbox.sandboxId}?file=/${module}"`,
      )
    },
  })),
  useLift(remarkInject(), ({ getNodesByType }) => ({
    visitor({ node: { data }, inject }) {
      if (!(data && data.yaml)) return inject.nothing()

      const { project, module } = normalizeExampleYaml(data.yaml)

      const codesandboxes = getNodesByType('Codesandbox') as CodesandboxNode[]
      const [codesandbox] = codesandboxes.filter(
        ({ name }) => name === `${project}-test`,
      )
      if (!codesandbox) return inject.nothing()

      const moduleExtName = extname(module)
      const testModule = module.replace(moduleExtName, `.test${moduleExtName}`)
      if (!codesandbox.files.some((f) => f.name === testModule))
        return inject.nothing()

      return inject.comment(
        `literal testLink="https://codesandbox.io/s/${codesandbox.sandboxId}?file=/${module}"`,
      )
    },
  })),
  useLift(remarkInject(), () => ({
    visitor({ node: { data }, inject }) {
      if (!(data && data.yaml)) return inject.nothing()

      const { style } = normalizeExampleYaml(data.yaml)

      if (!style) return inject.nothing()

      return inject.comment(`literal style={${JSON.stringify(style)}}`)
    },
  })),
  useLift(remarkInject(), () => ({
    visitor({ node: { data }, inject }) {
      if (!(data && data.yaml)) return inject.nothing()

      return inject.comment('end')
    },
  })),
  useLift(unifiedFilter, () => ({
    filter: ({ data }) => !(data && data.yaml),
  })),
  useLift(remarkSlug),
  useLift(
    remarkAutolinkHeadings,
    (): Options => ({
      behavior: 'append',
      linkProperties: { class: 'slug', ariaHidden: true, tabIndex: -1 },
      content: {
        type: 'text',
        value: '#',
      },
    }),
  ),
  { resolve: 'gatsby-remark-smartypants' },
  {
    resolve: 'gatsby-remark-external-links',
    options: {
      target: '_blank',
      rel: 'noreferrer',
    },
  },
  {
    resolve: 'gatsby-remark-vscode',
    options: {
      injectStyles: false,
      theme: 'Dracula',
      extensions: [
        require.resolve('./assets/dracula-theme.theme-dracula-2.22.1.vsix'),
        require.resolve(
          './assets/jpoissonnier.vscode-styled-components-1.2.0.vsix',
        ),
      ],
      inlineCode: {
        marker: '∫', // Option+B,
        className: 'inline',
      },
    },
  },
]
