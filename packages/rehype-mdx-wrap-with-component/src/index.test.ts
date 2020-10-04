import mdxHastToJsx from '@mdx-js/mdx/mdx-hast-to-jsx'
import rehype from 'rehype'
import { Processor } from 'unified'
import rehypeMdxWrapWithComponent from '.'

const fixtures = {
  simple: `
    <h1>Hello world!</h1>

    <!--component Foo-->
    <!--prop bar-->
    <a href="/bar">bar</a>
    <!--prop baz-->
    <pre>code</pre>
    <!--end-->


    <!--component Qux-->
    <!--no prop marker-->
    <p>lorem ipsum</p>
    <!--end-->

    <!--component Quux-->
    <!--prop quuz-->
    <video src="./video.mp4"></video>
    <img src="./img.jpg"></img>
    <label for="input">a label</label>
    <input id="input"></input>
    <!--literal corge="grault"-->
    <!--end-->
  `,
}
describe('rehypeMdxWrapWithComponent', () => {
  let processor: Processor

  beforeEach(() => {
    processor = rehype()
      .use(rehypeMdxWrapWithComponent)
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
    'should inject nodes "%s"',
    async (_name, html) => {
      const result = await processor.process(html)
      expect(result.toString()).toMatchSnapshot()
    },
  )
})
