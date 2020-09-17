import remark from 'remark'
import { Processor } from 'unified'
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

    const plugin = () => (node: Node) =>
      visit(node, (child, parents) => {
        spy(
          child.type,
          processor.stringify(child),
          parents.map((p) => p.type),
        )

        const [lastParent] = parents.slice(-1)
        if (lastParent && lastParent.type === 'root') {
          lastParent.children.unshift({ ...child })
        }
      })

    processor = remark().use(plugin)
  })

  it.each(Object.entries(fixtures))(
    'should visit all nodes %s',
    async (_name, markdown) => {
      const result = await processor.process(markdown)
      expect(spy.mock.calls).toMatchSnapshot()
      expect(result.toString()).toMatchSnapshot()
    },
  )
})
