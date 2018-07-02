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
    'gatsby-transformer-remark'
  ],
}
