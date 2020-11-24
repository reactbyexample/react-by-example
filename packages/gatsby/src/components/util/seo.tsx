import React, { FC } from 'react'
import { Helmet } from 'react-helmet'
import { useSiteMetadata } from '../../graphql'

export interface SEOProps {
  title?: string
  description?: string
}

export const SEO: FC<SEOProps> = ({ description, title }) => {
  const siteMetadata = useSiteMetadata()

  const finalDescription = description || siteMetadata.description
  const finalTitle = [title, siteMetadata.title].filter(Boolean).join(' | ')

  return (
    <Helmet
      htmlAttributes={{ lang: siteMetadata.lang }}
      title={finalTitle}
      meta={[
        {
          name: `description`,
          content: finalDescription,
        },
        {
          property: `og:title`,
          content: finalTitle,
        },
        {
          property: `og:description`,
          content: finalDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: finalTitle,
        },
        {
          name: `twitter:description`,
          content: finalDescription,
        },
      ]}
    />
  )
}
