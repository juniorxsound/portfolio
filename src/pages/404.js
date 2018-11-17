import React, { Component } from 'react'
import Section from '../components/Section'
import Button from '../components/Button'
import Helmet from 'react-helmet'
import './style.scss'

export default class NotFoundPage extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div>
        <Helmet>
          <meta http-equiv="refresh" content="2;url=https://orfleisher.com" />
        </Helmet>
        <Section>
          <h5>Oops, this page has been moved, if you are not redirected automatically</h5>
          <Button key="redirect button" text="click here" externalLink="https://orfleisher.com" mobileWidth={'8'} smallWidth={'4'} mediumWidth={'4'} />
        </Section>
      </div>
    )
  }

}