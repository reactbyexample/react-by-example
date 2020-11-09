import rehypeMdxInternalLinks, {
  RehypeMdxInternalLinksSettings,
} from '@app/rehype-mdx-internal-links'
import rehypeMdxWrapWithComponent from '@app/rehype-mdx-wrap-with-component'

const rehypeMdxInternalLinksSettings: RehypeMdxInternalLinksSettings = {
  filter: (el) => !String(el.properties?.href).startsWith('#'),
}

export const rehypePlugins = [
  rehypeMdxWrapWithComponent,
  [rehypeMdxInternalLinks, rehypeMdxInternalLinksSettings],
]
