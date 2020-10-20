import { graphql, useStaticQuery } from 'gatsby'

interface SiteMetadataQuery {
  site: {
    siteMetadata: {
      title: string
      lang: string
      description: string
    }
  }
}

export const useSiteMetadata = (): SiteMetadataQuery['site']['siteMetadata'] => {
  const {
    site: { siteMetadata },
  } = useStaticQuery<SiteMetadataQuery>(
    graphql`
      query SiteMetadataQuery {
        site {
          siteMetadata {
            title
            description
            lang
          }
        }
      }
    `,
  )
  return siteMetadata
}
