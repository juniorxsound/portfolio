module.exports = {
  pathPrefix: `/`,
  siteMetadata: {
    title: 'Or Fleisher',
    description: 'Creative technologist, developer and artist working at the intersection of technology and storytelling.',
    keywords: 'VR, AR, ML, AI, Virtual Reality, Augmented Reality, WebVR, WebAR, WebGL, three.js, Machine Learning, Or, Or Fleisher, Fleisher, Creative Technologist, אור, אור פליישר, פליישר',
    url: 'https://orfleisher.com',
    siteUrl: 'https://orfleisher.com'
  },
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
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-autolink-headers`],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `src`,
        path: `${__dirname}/src`,
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `black`,
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Or Fleisher',
        short_name: 'Or Fleisher',
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `src/assets/images/profile.jpg`, // This path is relative to the root of the site.
      },
    }
  ]
};
