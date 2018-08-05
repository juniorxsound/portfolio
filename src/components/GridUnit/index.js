import React, { Component } from 'react'
import Link from "gatsby-link";

import './style.scss'

class GridUnit extends Component {
  render() {
    return (
      <div className="experience-unit col-xs-12 col-sm-6 col-md-4">
        <Link to={this.props.link}>
          <img src={this.props.logo} />
        </Link>
        <div className="title bold">
          {this.props.title}
        </div>
        <div className="time-period">
          {this.props.subtag}
        </div>
        <div className="subtitle">
          {this.props.subtitle}
        </div>
      </div>
    )
  }
}

export default GridUnit
