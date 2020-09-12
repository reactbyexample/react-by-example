import remark from 'remark'
import { Processor } from 'unified'
import unifiedFilter from '.'

const fixtures = {
  simple: `\
# Hello world!

## Heading level 2

\`\`\`js
console.log('markdown')
\`\`\`

> blockquote

\`\`\`html
<p>The quick brown fox jumped over the fence.</p>
\`\`\`
`,
}

describe('unifiedFilter', () => {
  let processor: Processor

  beforeEach(() => {
    processor = remark().use(unifiedFilter, {
      filter: (n) => n.type !== 'code',
    })
  })

  it.each(Object.entries(fixtures))(
    'should filter nodes "%s"',
    async (_name, markdown) => {
      const result = await processor.process(markdown)
      expect(result.toString()).toMatchSnapshot()
    },
  )
})
