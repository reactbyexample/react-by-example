import { Options as LiftOptions } from '@app/gatsby-remark-lift'
import unifiedFilter, { Options as FilterOptions } from '@app/unified-filter'
import unifiedParseYaml, {
  Options as ParseYamlOptions,
} from '@app/unified-parse-yaml'
import { resolve } from 'path'

const root = resolve(__dirname, '..')

const gatsbyConfig = {
  siteMetadata: {},
  plugins: [
    { resolve: 'gatsby-plugin-pnpm' },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${root}/src/content`,
      },
    },
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: `${root}/src/content`,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: '@app/gatsby-remark-lift',
            options: ((): LiftOptions<ParseYamlOptions> => ({
              plugin: unifiedParseYaml,
              pluginOptions: () => ({
                filter: ({ type, lang, meta }) => {
                  return (
                    type === 'code' && lang === 'yaml' && meta === '{example}'
                  )
                },
              }),
            }))(),
          },
          {
            resolve: '@app/gatsby-remark-lift',
            options: ((): LiftOptions<FilterOptions> => ({
              plugin: unifiedFilter,
              pluginOptions: () => ({
                filter: ({ data }) => {
                  return !(data && data.yaml)
                },
              }),
            }))(),
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${root}/node_modules/@app/example-packages/example-packages`,
      },
    },
    { resolve: 'gatsby-transformer-json' },
    { resolve: '@app/gatsby-plugin-codesandbox' },
    { resolve: 'example-packages-to-codesandbox' },
  ],
}

export default gatsbyConfig
