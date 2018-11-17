import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import './style.scss'

import profileImage from '../assets/images/profile.jpg'
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
    const siteDescription = get(this, 'props.data.site.siteMetadata.description')

    const { children } = this.props

    const schemaOrgJSONLD = [
      {
        "@context": "http://schema.org",
        "@type": "WebSite",
        url: "https://orfleisher.com",
        name: "Or Fleisher"
      },
      {
        "@context": "http://schema.org",
        "@type": "CollectionPage",
        url: "https://orfleisher.com",
        name: "Works"
      },
      {
        "@context": "http://schema.org",
        "@type": "Person",
        image: "https://orfleisher.com/icons/",
        url: "https://orfleisher.com/bio",
        name: "Or Fleisher",
        alumniOf: "New York University",
        email: "contact@orfleisher.com",
        gender: "Male"
      }
    ];

    return (
      <div className="template-wrapper">
        <Helmet
          title={siteTitle}
          meta={[
            { name: 'description', content: siteDescription },
            { name: 'keywords', content: siteKeywords },
            { property: 'og:url', content: siteURL },
            { property: 'og:image', content: profileImage },
            { property: 'og:image:alt', content: 'Logo' },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
            { property: 'og:title', content: siteTitle },
            { property: 'og:description', content: siteDescription },
            { property: 'og:type', content: 'website' },
            { property: 'fb:app_id', content: '511560922603823' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:creator', content: 'juniorxsound' },
            { name: 'twitter:title', content: siteTitle },
            { name: 'twitter:description', content: siteDescription },
            { name: 'twitter:image', content: profileImage }
          ]}
          link={[
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: favicon16 },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: favicon32 }
          ]}
        >
        {/* Schema.org tags */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>
        </Helmet>

        <div className="template-wrapper-children">
          {children()}
        </div>

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
  }
`;
