import { graphql, useStaticQuery } from 'gatsby'

interface MdxTitleQuery {
  allMdx: {
    nodes: {
      frontmatter: {
        title: string
      }
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
          frontmatter {
            title
          }
          slug
        }
      }
    }
  `)
  const [
    {
      frontmatter: { title },
    },
  ] = nodes.filter((node) => node.slug === slug)
  return title
}
