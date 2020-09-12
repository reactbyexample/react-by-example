import { visit } from '@app/unist-util-visit-async'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import unified, { Processor } from 'unified'
import unifiedParseYaml from '.'

const fixtures = {
  simple: `\
# Hello world!

\`\`\`yaml {parse}
is: parsed
\`\`\`

\`\`\`yaml
is-not: parsed
\`\`\`

\`\`\`js
log:
console.log(\`
- hello
- this
- is
- a
- list
\`)
\`\`\`
`,
}

describe('unifiedParseYaml', () => {
  let processor: Processor

  describe('no filter', () => {
    beforeEach(() => {
      processor = unified()
        .use(remarkParse)
        .use(unifiedParseYaml)
        .use(remarkStringify)
        .use({ settings: { position: false } })
    })

    it.each(Object.entries(fixtures))(
      'should parse all values "%s"',
      async (_name, markdown) => {
        const ast = processor.parse(markdown)
        await processor.run(ast)
        const snapshot: [string, unknown][] = []
        await visit(ast, (node) => {
          if (node.data) snapshot.push([processor.stringify(node), node.data])
        })
        expect(snapshot).toMatchSnapshot()
      },
    )
  })

  describe('with filter', () => {
    beforeEach(() => {
      processor = unified()
        .use(remarkParse)
        .use(unifiedParseYaml, {
          filter: (n) =>
            n.type === 'code' && n.lang === 'yaml' && n.meta === '{parse}',
        })
        .use(remarkStringify)
        .use({ settings: { position: false } })
    })

    it.each(Object.entries(fixtures))(
      'should parse filtered values "%s"',
      async (_name, markdown) => {
        const ast = processor.parse(markdown)
        await processor.run(ast)
        const snapshot: [string, unknown][] = []
        await visit(ast, (node) => {
          if (node.data) snapshot.push([processor.stringify(node), node.data])
        })
        expect(snapshot).toMatchSnapshot()
      },
    )
  })
})
