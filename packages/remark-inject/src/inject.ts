import { Inject } from './types'

const nothing: Inject['nothing'] = () => []

const link: Inject['link'] = (text, url) => [
  {
    type: 'link',
    url,
    children: [{ type: 'text', value: text }],
  },
]

const code: Inject['link'] = (content, lang) => [
  {
    type: 'code',
    value: content,
    lang,
  },
]

const jsx: Inject['jsx'] = (identifier, props) => {
  const propsString = props ? `{...${JSON.stringify(props)}}` : ''

  return [
    {
      type: 'jsx',
      value: `<${identifier.identifier} ${propsString} />`,
    },
  ]
}

const fragment: Inject['fragment'] = (identifier) => [
  {
    type: 'jsx',
    value: `<>{${identifier.identifier}}</>`,
  },
]

const comment: Inject['comment'] = (value) => [
  {
    type: 'html',
    value: `<!--${value}-->`,
  },
]

export const inject: Inject = { nothing, link, code, jsx, fragment, comment }
