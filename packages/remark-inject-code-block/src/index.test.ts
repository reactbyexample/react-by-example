import { promises } from 'fs'
import { extname } from 'path'
import remark from 'remark'
import { Processor } from 'unified'
import remarkInjectCodeBlock, { Resolved } from '.'

const { readFile } = promises

const fixtures = {
  simple: `\
# Hello world!

## Heading level 2

![](@app/example-packages/example-packages/hello-world/src/index.tsx)
![](@app/example-packages/example-packages/simple-clock/public/index.html)
`,
}

describe('remarkInjectCodeBlock', () => {
  let processor: Processor

  beforeEach(() => {
    processor = remark().use(remarkInjectCodeBlock, {
      async resolve({ type, url }): Promise<Resolved> {
        if (type !== 'image') return undefined
        if (typeof url !== 'string') return undefined

        const path = require.resolve(url)
        const lang = extname(path).slice(1)
        const code = await readFile(path, 'utf8')
        return { code, lang }
      },
    })
  })

  it.each(Object.entries(fixtures))(
    'should inject code blocks "%s"',
    async (_name, markdown) => {
      const result = await processor.process(markdown)
      expect(result.toString()).toMatchSnapshot()
    },
  )
})
