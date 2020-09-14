import { Emphasis, Text } from 'mdast'
import remark from 'remark'
import { Processor } from 'unified'
import remarkInjectLink, { Resolved } from '.'

const fixtures = {
  simple: `\
# Hello world!

## Heading _level_ 2

hello link _injector_
`,
}

describe('remarkInjectLink', () => {
  let processor: Processor

  beforeEach(() => {
    processor = remark().use(remarkInjectLink, {
      resolve({ type, children }: Emphasis): Resolved {
        if (type !== 'emphasis') return undefined

        const [{ value }] = children as Text[]
        return { text: value, url: `https://example.com/${value}` }
      },
    })
  })

  it.each(Object.entries(fixtures))(
    'should inject links "%s"',
    async (_name, markdown) => {
      const result = await processor.process(markdown)
      expect(result.toString()).toMatchSnapshot()
    },
  )
})
