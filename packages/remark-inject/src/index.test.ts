import { promises } from 'fs'
import { Emphasis, Image, Text } from 'mdast'
import { extname } from 'path'
import remark from 'remark'
import remarkMdx from 'remark-mdx'
import { Processor } from 'unified'
import remarkInject from '.'

const { readFile } = promises

const fixtures = {
  simple: `\
# Hello world!

## Heading _level_ 2

![](@app/example-packages/example-packages/hello-world/src/index.tsx)

hello link _injector_

![](@app/example-packages/example-packages/static-clock/public/index.html)
`,
}

describe('remarkInject', () => {
  let processor: Processor

  beforeEach(() => {
    processor = remark()
      .use(remarkMdx)
      .use(remarkInject(), {
        visitor({ node, inject }) {
          const { children, type } = node as Emphasis

          if (type !== 'emphasis') return inject.nothing()

          const [{ value }] = children as Text[]
          return inject.link(value, `https://example.com/${value}`)
        },
      })
      .use(remarkInject(), {
        async visitor({ node, inject, create }) {
          const { type, url } = node as Image

          if (type !== 'image') return inject.nothing()
          if (typeof url !== 'string') return inject.nothing()

          const path = require.resolve(url)
          const lang = extname(path).slice(1)
          const code = await readFile(path, 'utf8')

          const result = [...inject.code(code, lang)]

          if (lang === 'tsx') {
            const identifier = create.defaultImport(url)
            result.push(...inject.jsx(identifier, { some: 'props' }))
          }

          return result
        },
      })
  })

  it.each(Object.entries(fixtures))(
    'should inject nodes "%s"',
    async (_name, markdown) => {
      const result = await processor.process(markdown)
      expect(result.toString()).toMatchSnapshot()
    },
  )
})
