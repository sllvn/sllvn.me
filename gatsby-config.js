module.exports = {
  siteMetadata: {
    title: 'Andrew Sullivan',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography.js'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/blog`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
            },
          },
        ],
      },
    },
    /* `gatsby-plugin-sharp`,
     * `gatsby-transformer-sharp`,
     * `gatsby-transformer-remark`,
     * {
     *   resolve: `gatsby-source-filesystem`,
     *   options: {
     *     path: `${__dirname}/src/pages`,
     *   },
     * }, */
  ],
}
