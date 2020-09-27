import { graphql, useStaticQuery } from 'gatsby'

interface MdxTitleQuery {
  allMdx: {
    nodes: {
      headings: {
        value: string
      }[]
      slug: string
    }[]
  }
}

export const useMdxTitle = (slug: string): string => {
  const {
    allMdx: { nodes },
  } = useStaticQuery<MdxTitleQuery>(graphql`
    query MdxTitleQuery {
      allMdx {
        nodes {
          headings(depth: h1) {
            value
          }
          slug
        }
      }
    }
  `)
  const [
    {
      headings: [{ value }],
    },
  ] = nodes.filter((node) => node.slug === slug)
  return value
}
