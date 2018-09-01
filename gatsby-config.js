module.exports = {
  pathPrefix: `/`,
  siteMetadata: {
    title: 'Or Fleisher',
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
    `gatsby-plugin-offline`,
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
  ],
  siteMetadata: {
    title: 'Or Fleisher',
    description: 'Director, developer and artist working at the intersection of technology and storytelling.',
    keywords: 'vr, ar, immersive, creative-technologist, machine-learning, developer, creative director, volumetric, virtual reality, augmented reailty, webgl, opengl, VR, AR, ML, AI, Virtual Reality, Augmented Reality, WebVR, WebAR, WebGL, three.js, Machine Learning, Or, Or Fleisher, Fleisher, Creative Technologist, אור, אור פליישר, פליישר',
    url: 'https://orfleisher.com',
    siteUrl: 'https://orfleisher.com'
  }
};
