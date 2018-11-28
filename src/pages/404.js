import React, { Component } from 'react'
import Section from '../components/Section'
import Button from '../components/Button'
import Helmet from 'react-helmet'
import './style.scss'

export default class NotFoundRedirect extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div>
        <Helmet>
          <html lang="en" />
          <meta http-equiv="refresh" content="2;url=https://orfleisher.com" />
        </Helmet>
        <div className="index">
          <div className="main">
            {/* Header */}
            <div className="row">
              <div className="col-xs-12 col-sm-8 col-md-9">
                <h3 className="bold">Oops, this page has been moved</h3>
                <h5 className="bold">If you are not redirected automatically</h5>
                <Button key="redirect button" text="click here" externalLink="https://orfleisher.com" mobileWidth={'8'} smallWidth={'4'} mediumWidth={'4'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}