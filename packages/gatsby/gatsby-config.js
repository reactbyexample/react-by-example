/** @type {import('gatsby').GatsbyConfig}  */
module.exports = {
  siteMetadata: {},
  plugins: [
    { resolve: 'gatsby-plugin-pnpm' },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: `${__dirname}/src/content`,
      },
    },
    { resolve: 'gatsby-plugin-mdx' },
  ],
}
