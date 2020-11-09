import mdxHastToJsx from '@mdx-js/mdx/mdx-hast-to-jsx'
import rehype from 'rehype'
import { Processor } from 'unified'
import rehypeMdxInternalLinks from '.'

const fixtures = {
  simple: `
    <a href="/is-relative" target="_blank" class="relative">
      relative link
    </a>

    <a href="#is-anchor" id="is-anchor" class="anchor">
      anchor link
    </a>

    <a href="https://github.com/absolute/link" target="_blank" class="absolute">
      absolute link
    </a>
  `,
}
describe('rehypeMdxInternalLinks', () => {
  let processor: Processor

  beforeEach(() => {
    processor = rehype()
      .use(rehypeMdxInternalLinks, {
        linkComponentShortcode: 'TheLinkComponent',
        linkComponentHrefProp: 'theHrefProp',
        filter: (el) => !String(el.properties?.href).startsWith('#'),
      })
      .use(() => ({ children }) => {
        return {
          type: 'element',
          tagName: '',
          children,
        }
      })
      .use(mdxHastToJsx)
  })

  it.each(Object.entries(fixtures))(
    'should rewrite links "%s"',
    async (_name, html) => {
      const result = await processor.process(html)
      expect(result.toString()).toMatchSnapshot()
    },
  )
})
