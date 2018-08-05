import React, { Component } from 'react'
import Link from "gatsby-link";

import './style.scss'

class Button extends Component {
  render() {
    const concatanatedClassName = `col-xs-${this.props.mobileWidth} col-sm-${this.props.smallWidth} col-md-${this.props.mediumWidth}`
    return (
      <div className={concatanatedClassName}>
        <a href={this.props.link} style={{ textDecoration: 'none' }} target="_blank">
          <div className="btn">
              {this.props.text}
          </div>
        </a>
      </div>
    )
  }
}

export default Button
