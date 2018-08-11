module.exports = {
  pathPrefix: `/portfolio`,
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `open sans\:300,600`,
        ]
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-123776962-1",
        head: true
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-remark',
    `gatsby-plugin-offline`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `src`,
        path: `${__dirname}/src`,
      },
    },
  ],
  siteMetadata: {
    title: 'Or Fleisher',
    description: 'Creative technologist and storyteller',
    keywords: 'vr, ar, immersive, creative-technologist, machine-learning, developer, creative director',
    url: 'cv.orfleisher.com'
  }
};
