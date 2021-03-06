import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import './style.scss'

import profileImage from '../assets/images/profile.jpg'
import profileFacebookImage from '../assets/images/profile_facebook.jpg'
import favicon16 from '../assets/favicons/favicon-16x16.png'
import favicon32 from '../assets/favicons/favicon-32x32.png'

export default class TemplateWrapper extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteKeywords = get(this, 'props.data.site.siteMetadata.keywords')
    const siteURL = get(this, 'props.data.site.siteMetadata.url')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    const projects = get(this, 'props.data.allMarkdownRemark.edges')

    const { children } = this.props

    const schemaOrgJSONLD = [
      {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        url: 'https://orfleisher.com',
        name: 'Or Fleisher',
        thumbnailUrl: profileFacebookImage,
        image: profileFacebookImage,
      },
      {
        '@context': 'http://schema.org',
        '@type': 'Person',
        name: 'Or Fleisher',
        image: profileFacebookImage,
        url: 'https://orfleisher.com',
        sameAs: [
          'https://www.facebook.com/or.fleisher',
          'https://www.instagram.com/juniorxsound/',
          'https://www.linkedin.com/in/orfleisher/',
          'https://twitter.com/juniorxsound',
        ],
        alumniOf: 'New York University',
        email: 'contact@orfleisher.com',
        gender: 'Male',
      },
    ]

    for (let i = 0; i < Object.keys(projects).length; i++) {
      const singleProject = projects[Object.keys(projects)[i]]['node']

      if (singleProject.title != 'Bio') {
        schemaOrgJSONLD.push({
          '@context': 'http://schema.org',
          '@type': 'CreativeWork',
          description: singleProject.frontmatter.excerpt,
          about: singleProject.frontmatter.excerpt,
          author: 'Or Fleisher',
          creator: 'Or Fleisher',
          name: singleProject.frontmatter.title,
          keywords: 'Machine Learning, VR, AR, Volumetric, 3D, CG',
          url: 'https://orfleisher.com' + singleProject.frontmatter.path,
          image: singleProject.frontmatter.thumbnail,
        })
      } else {
        schemaOrgJSONLD.push({
          '@context': 'http://schema.org',
          '@type': 'CreativeWork',
          description: 'Learn more about me.',
          about: 'Learn more about me.',
          author: 'Or Fleisher',
          creator: 'Or Fleisher',
          name: 'Biography',
          keywords: 'Machine Learning, VR, AR, Volumetric, 3D, CG',
          url: 'https://orfleisher.com' + singleProject.frontmatter.path,
        })
      }
    }

    return (
      <div className="template-wrapper">
        <Helmet
          title={siteTitle}
          meta={[
            { name: 'description', content: siteDescription },
            { name: 'keywords', content: siteKeywords },
            { property: 'og:url', content: siteURL },
            { property: 'og:image', content: profileFacebookImage },
            { property: 'og:image:alt', content: 'Logo' },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
            { property: 'og:title', content: siteTitle },
            { property: 'og:site_name', content: siteTitle },
            { property: 'og:description', content: siteDescription },
            { property: 'og:type', content: 'website' },
            { property: 'fb:app_id', content: '511560922603823' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:site', content: '@juniorxsound' },
            { name: 'twitter:creator', content: '@juniorxsound' },
            { name: 'twitter:title', content: siteTitle },
            { name: 'twitter:description', content: siteDescription },
            {
              name: 'twitter:image',
              content: 'https://i.imgur.com/Gu2tbUp.png',
            },
          ]}
          link={[
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: favicon16 },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: favicon32 },
            { rel: 'canonical', href: 'https://orfleisher.com' },
          ]}
        >
          <html lang="en" />
          {/* Schema.org tags */}
          <script type="application/ld+json">
            {JSON.stringify(schemaOrgJSONLD)}
          </script>
        </Helmet>

        <div className="template-wrapper-children">{children()}</div>
      </div>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        description
        url
        keywords
      }
    }
    allMarkdownRemark {
      edges {
        node {
          html
          id
          frontmatter {
            path
            title
            thumbnail
            cover
            excerpt
            tags
          }
        }
      }
    }
  }
`
