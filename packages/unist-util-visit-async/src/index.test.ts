import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import unified, { Processor } from 'unified'
import { Node } from 'unist'
import { visit } from '.'

const fixtures = {
  simple: `\
# Hello world!

## Heading level 2

I really like using Markdown.

I think I'll use it to format all of my documents from now on.

<p>I really like using Markdown.</p>

<p>I think I'll use it to format all of my documents from now on.</p>

I just love **bold text**.

Italicized text is the *cat's meow*.

This text is ***really important***.

> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.
`,
}

describe('visit', () => {
  let processor: Processor
  const spy = jest.fn()

  beforeEach(() => {
    spy.mockReset()

    const plugin = () => (node: Node) => visit(node, spy)

    processor = unified().use(remarkParse).use(plugin).use(remarkStringify)
  })

  it.each(Object.entries(fixtures))(
    'should visit all nodes %s',
    async (_name, markdown) => {
      const node = processor.parse(markdown)
      await processor.run(node)
      expect(
        spy.mock.calls.map(([n, ps]: [Node, Node[]]) => [
          n.type,
          processor.stringify(n),
          ps.map((p) => p.type),
        ]),
      ).toMatchSnapshot()
    },
  )
})
